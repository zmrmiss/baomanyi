//常见问题
function FaqContent(options) {
    var _default = {
       type: 0,
       token: null
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    if(this.type){
        this.getData();  
    }
}

FaqContent.prototype = {
    getData: function(){
        var _this = this;
        var url = this.type==1?'getfaq':(this.type==2?'getbillfaq':'null')
        $.post('//'+domain.jc+'/user/setting/'+url+'/',{token:_this.token}, function (re) { 
            if(re.code=='0001000'){
                for(var i in re.data){
                    _this.dom(re.data[i]);
                }
                _this.control();
            }
        },'json');
    },
    dom: function(data){
        this.panel = $(".faq-list");
        this.htmlLi = $("<li></li>");
        this.htmlHead = $("<div class='faq-head'></div>");
        this.htmlMain = $("<div class='faq-main'></div>");
        this.htmlHead.html(data.title+'<i class="iconfont icon-arrow-up"></i>');
        this.htmlMain.html(this.type==1?data.answer:(this.type==2?data.content:'null'));
        this.htmlLi.append(this.htmlHead);
        this.htmlLi.append(this.htmlMain);
        this.panel.append(this.htmlLi);
        return this.panel;
    },
    control: function(){
        $(".faq-head").on("tap",function () {
            if($(this).parent().children(".faq-main").hasClass("show-up")){
                $(this).parent().children(".faq-main").removeClass("show-up");
                $(this).children(".iconfont").toggleClass("icon-arrow-down").toggleClass("icon-arrow-up");
            }else{
                $(this).parent().children(".faq-main").addClass("show-up");                   
                $(this).children(".iconfont").toggleClass("icon-arrow-down").toggleClass("icon-arrow-up");
            }
        })
    }
}


//问答详情
function QusAnswer(options) {
    var _default = {
       token: 0,
       id: 20,
       share: false,
       user_id: 0,
       reply_id: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }

    var _this = this;
    $('#getReply').off("tap").on("tap",function() {
         _this.showBox();
    });
    this.getData();  
}

QusAnswer.prototype = {
    showBox: function(){
        var _this = this;
        var mask = $('.mask-layer');
        var box = $('.answer-box');
        var textarea = $("#question-con");
        if(!_this.user_id||_this.user_id==0){
            _this.hideBox();
            popAlert("请登录后再回答吧~");
            return;
        }
        mask.show();
        box.show();
        if (navigator.userAgent.match(/android/i)) {
            textarea.on('focus',function(){  
                box.height($(window).height()+'px');
            }).on('blur',function(){  
                box.height('auto');
            });
        }
        
        $('.btn-issue').off("tap").on("tap",function(){
            if(!textarea.val()){
                popAlert("内容不能为空！");
            }else{
                _this.answer();
            }
        })
        mask.off("tap").on("tap",function(){
            _this.hideBox();
        });
        $('.btn-cancle').off("tap").on("tap",function(){
            _this.hideBox();
        });
    },
    hideBox: function(){
        var mask = $('.mask-layer');
        var box = $('.answer-box');
        var textarea = $("#question-con");
        mask.hide();
        box.hide();
        textarea.val("");
    },
    getData: function(){
        var _this = this;
        $.post('//'+domain.wd+'/subject/index/subject_detail',{token:_this.token,subject_id:_this.id}, function (re) { 
            if(re.code=='0001000'){
                _this.uuser_id = re.data.author_id;
                _this.problem = re.data.status;
                var img="";
                for(var i in re.data.img_list){
                    img += "<img src='"+re.data.img_list[i].img_source+"'>";
                }
                $(".news-content").html(re.data.body+img);
                _this.author = $("<h1>"+re.data.author+"</h1>");
                _this.time = $("<em>"+re.data.create_time+"</em><em>"+re.data.city_name+"</em>");
                $(".question-detail").append(_this.author).append(_this.time);
                $(".question-money").html("<i class='iconfont icon-coin coin-i'></i>"+re.data.score);
                $(".answer-type").html("<i class='iconfont icon-tag tag-i'></i>"+re.data.type_name);
                if (re.data.status==0) {
                    $(".answer-info-help").html("<i class='iconfont icon-unsolved'></i>未解决");
                }else if(re.data.status==1){
                    $(".answer-info-help").html("<i class='iconfont icon-solved'></i>已解决");
                }
                $(".answer-info-comment").html("<i class='iconfont icon-reply'></i>"+re.data.answers);
                $(".answer-info-scan").html("<i class='iconfont icon-scan'></i>"+re.data.views);
                $(".question-photo").attr("src",re.data.avator);
                defaultAvator(".question-photo");
                _this.getAnswerData();
            }
        },'json');
    },
    getAnswerData: function(){
        var _this = this;
        $.post('//'+domain.wd+'/answer/comment/commentList',{token:_this.token,id:_this.id,page:1,limit:1000}, function (re) { 
            if(re.code=='0001000'){
                var html = '';
                var len = re.data?re.data.commentIds.length:0;
                for (var i = 0; i < len; i++) {     
                    var follow = re.data.commentIds[i];
                    if(follow.indexOf(",")>0){
                        follow = follow.split(",");
                        var lastFollow = follow[follow.length-1];
                    }else{
                        var ar = [];
                        ar[0] = follow;
                        follow = ar;
                        var lastFollow = follow[0];
                    }

                    html += '<li class="answer-list-li">\
                                    <div class="question-left">\
                                        <img src="'+re.data.comments[lastFollow].avator+'" class="anwser-photo">\
                                    </div>\
                                    <div class="anwser-block">\
                                        <div class="anwser-detail">\
                                            <h1 class="anwser-name">'+re.data.comments[lastFollow].user_name+'</h1>\
                                            <em>'+getLocalTime(re.data.comments[lastFollow].create_time)+'</em>\
                                        </div>';

                    if(follow.length>1){                        

                        html += '<div class="toanwser-content"><ul class="toanwser-list">';

                        for (var j = 0; j < follow.length - 1;  j++) {

                            var index = follow[j];
                            
                            var bestStatus = re.data.comments[index].is_best==1?'<em class="anwser-best">最佳</em>':'';

                            html += '<li>\
                                        <h3 class="anwser-name">'+re.data.comments[index].user_name+'</h3>\
                                        <em class="anwser-time">'+getLocalTime(re.data.comments[index].create_time)+'</em>\
                                        <p class="anwser-thing">'+re.data.comments[index].content+'</p>\
                                        <div class="anwser-good-bar" data-id="'+re.data.comments[index].id+'">'+bestStatus+'\
                                            <div class="anwser-op">\
                                                <a href="javascript:;" class="anwser-replay">回复</a>\
                                            </div>\
                                        </div>\
                                        <em class="anwser-num">'+(j+1)+'</em>\
                                    </li>';

                        }
                        html += '</ul></div>';

                    }

                    var status = '';

                    if(re.data.comments[lastFollow].is_best==1){
                        status = re.data.comments[lastFollow].is_best?'<em class="anwser-best">最佳</em>':'';
                    }else if(re.data.comments[lastFollow].is_best!=1&&_this.uuser_id==_this.user_id&&_this.problem==0&&follow.length==1){
                        status = '<em class="set-best" data-uid="'+re.data.comments[lastFollow].user_id+'">采纳</em>';
                    }

                    html += '<div class="anwser-content">'+re.data.comments[lastFollow].content+'</div>\
                                <div class="anwser-good-bar" data-id="'+re.data.comments[lastFollow].id+'">'+status+'\
                                    <div class="anwser-op">\
                                        <a href="javascript:;" class="anwser-replay">回复</a>\
                                        <div class="anwser-good">\
                                            <i class="iconfont icon-good"></i>\
                                            <em>'+re.data.comments[lastFollow].good_click+'</em>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>';
                }
                $('.answer-list').html("").html(html);
                $(".set-best").off("tap").on("tap",function(){
                    var uid = $(this).data("uid");
                    var id = $(this).closest(".anwser-good-bar").data("id");
                    _this.setBest(id,uid);
                });
                $(".anwser-replay").off("tap").on("tap",function(){
                    _this.reply_id = $(this).closest(".anwser-good-bar").data("id");
                    _this.showBox();
                })
                defaultAvator(".anwser-photo");
                _this.goodsStatus();
                _this.likeStatus();
            }
            
        },'json');
    },
    setBest: function(sid,suid){
        var _this = this;
        $.post('//'+domain.wd+'/user/user/chooseBestAnswer',{token:_this.token,subject_id:_this.id,answer_id:sid}, function (re) {
            if(re.code=='0001000'){
                $(".answer-info-help").html("").html("<i class='iconfont icon-solved'></i>已解决");
                $('.mask-layer').hide();
                $('.answer-box').hide();
                _this.getAnswerData();
                _this.problem = 1;
            }
            popAlert(re.msg);
        },'json');
    },
    goodsStatus: function(){
        var _this = this;
        var a;

        if (localStorage.getItem("gooda")) {

            a = localStorage.getItem("gooda");
            var b = a.split(",");
            for(var i=0; i<b.length; i++){
                $(".anwser-good-bar[data-id='"+b[i]+"']").find(".icon-good").addClass("icon-good-selected");
            };
        }

        var arry = arry||[];
        var flag=1;
        $(".anwser-good").off("tap").on("tap",function(){
            var that = this;
            var answer_id = $(this).closest(".anwser-good-bar").data("id").toString();
            if(flag==1){
                flag=0;
                if($(this).children("i").hasClass("icon-good-selected")){
                    $.post('//'+domain.wd+'/praise/praise/remove',{token:_this.token,answer_id:answer_id}, function (re) {
                        if(re.code=='0001000'){
                            var good_num = $(that).children('em');
                            good_num.html(parseInt(good_num.html())-1);
                            $(that).children("i").removeClass("icon-good-selected");
                            
                            if(a){arry = a.split(",");}
                            for (var i = 0; i < arry.length; i++) {
                                if (arry[i] == answer_id) {
                                    var index = arry.indexOf(answer_id);
                                    if (index > -1) {
                                        arry.splice(index, 1);
                                    }
                                }
                            }
                            
                            localStorage.setItem("gooda", arry);
                        }
                        flag=1;
                    },'json');
                }else{
                    $.post('//'+domain.wd+'/praise/praise/add',{token:_this.token,answer_id:answer_id}, function (re) { 
                        if(re.code=='0001000'){
                            $.fn.tipsBox({
                                obj: $(that),
                                str: "+1",
                                callback: function (){
                                }
                            });
                            var good_num = $(that).children('em');
                            good_num.html(parseInt(good_num.html())+1);
                            $(that).children("i").addClass("icon-good-selected");
                            if(!a){
                                arry = answer_id;
                                a = answer_id;
                            }else{
                                a = a+","+answer_id;
                                arry = a; 
                            }
                            localStorage.setItem("gooda", arry);
                        }
                        flag=1;
                    },'json');
                }  
            }
            
        })
    },
    answer: function(){
        var _this = this;
        $.post('//'+domain.wd+'/answer/comment/publish',{token:_this.token,subject_id:_this.id,content:$('#question-con').val(),reply_id:_this.reply_id}, function (re) {
            if(re.code=='0001000'){
                $('.mask-layer').hide();
                $('.answer-box').hide();
                _this.getAnswerData();
            }
            popAlert(re.msg);
        },'json');
        _this.reply_id = 0;
    },
    likeStatus: function(){
        var _this = this;
        $.post('//'+domain.wd+'/user/favorite/check/',{token:_this.token,subject_id:_this.id}, function (re) { 
            if(re.code=='0001000'){
                if(re.data==1){$('.collect-i').addClass("icon-collected").removeClass("icon-uncollect");}
            }
        },'json');

        $(".collect-i").off("tap").on("tap",function(){
            var that = this;

            if($(this).hasClass("icon-collected")){
                $.post('//'+domain.wd+'/user/favorite/deleteFavorite/',{token:_this.token,subject_id:_this.id}, function (re) { 
                    if(re.code=='0001000'){
                        $(that).removeClass("icon-collected").addClass("icon-uncollect");
                    }
                    popAlert(re.msg);
                },'json');
            }else{
                $.post('//'+domain.wd+'/user/favorite/addFavorite/',{token:_this.token,subject_id:_this.id}, function (re) {
                    if(re.code=='0001000'){
                        $(that).addClass("icon-collected").removeClass("icon-uncollect");
                    }
                    popAlert(re.msg);
                },'json');
            } 
        })
    }
}


//资讯详情
function NewsContent(options) {
    var _default = {
       token: 0,
       id: 0,
       share: false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }

    if(this.typeId==2){document.title = "培训"}
    var _this = this;
    $('#getReply').off("tap").on("tap",function() {
         _this.showBox();
    });
    this.getData();
    if(this.enterId==2){
        $(".btn-getCustomer").show().on("tap",function(){
            _this.sharepage();
        });
        $(".comment-block").hide();
    }
}

NewsContent.prototype = {
    showBox: function(){
        var _this = this;
        var mask = $('.mask-layer');
        var box = $('.answer-box');
        var textarea = $("#question-con");
        if(!_this.userId||_this.userId==0){
            _this.hideBox();
            popAlert("请登录后再回答吧~");
            return;
        }
        mask.show();
        box.show();
        if (navigator.userAgent.match(/android/i)) {
            textarea.on('focus',function(){  
                box.height($(window).height()+'px');
            }).on('blur',function(){  
                box.height('auto');
            });
        }
        
        $('.btn-issue').off("tap").on("tap",function(){
            if(!textarea.val()){
                popAlert("内容不能为空！");
            }else{
                _this.answer();
            }
        })

        mask.off("tap").on("tap",function(){
            _this.hideBox();
        });
        $('.btn-cancle').off("tap").on("tap",function(){
            _this.hideBox();
        });
    },
    hideBox: function(){
        var mask = $('.mask-layer');
        var box = $('.answer-box');
        var textarea = $("#question-con");
        mask.hide();
        box.hide();
        textarea.val("");
    },
    answer: function(){
        var _this = this;
        $.post('//'+domain.gc+'/comment/Comment/publish',{token:_this.token,type_id:_this.typeId,subject_id:_this.id,content:$('#question-con').val(),reply_id:_this.reply_id}, function (re) {
            if(re.code=='0001000'){
                $('.mask-layer').hide();
                $('.answer-box').hide();
                _this.getAnswerData();
            }
            popAlert(re.msg);
        },'json');
    },
    getAnswerData: function(){
        var _this = this;
        $.post('//'+domain.gc+'/comment/comment/commentList',{token:_this.token,id:_this.id,page:1,limit:1000}, function (re) { 
            if(re.code=='0001000'){
                var html = '';
                var len = re.data?re.data.commentIds.length:0;
                for (var i = 0; i < len; i++) {     
                    var follow = re.data.commentIds[i];
                    if(follow.indexOf(",")>0){
                        follow = follow.split(",");
                        var lastFollow = follow[follow.length-1];
                    }else{
                        var ar = [];
                        ar[0] = follow;
                        follow = ar;
                        var lastFollow = follow[0];
                    }

                    html += '<li class="answer-list-li">\
                                    <div class="question-left">\
                                        <img src="'+re.data.comments[lastFollow].avator+'" class="anwser-photo">\
                                    </div>\
                                    <div class="anwser-block">\
                                        <div class="anwser-detail">\
                                            <h1 class="anwser-name">'+re.data.comments[lastFollow].user_name+'</h1>\
                                            <em>'+getLocalTime(re.data.comments[lastFollow].create_time)+'</em>\
                                        </div>';

                    if(follow.length>1){                        

                        html += '<div class="toanwser-content"><ul class="toanwser-list">';

                        for (var j = 0; j < follow.length - 1;  j++) {

                            var index = follow[j];

                            html += '<li>\
                                        <h3 class="anwser-name">'+re.data.comments[index].user_name+'</h3>\
                                        <em class="anwser-time">'+getLocalTime(re.data.comments[index].create_time)+'</em>\
                                        <p class="anwser-thing">'+re.data.comments[index].content+'</p>\
                                        <div class="anwser-good-bar" data-id="'+re.data.comments[index].id+'">\
                                            <div class="anwser-op">\
                                                <a href="javascript:;" class="anwser-replay">回复</a>\
                                            </div>\
                                        </div>\
                                        <em class="anwser-num">'+(j+1)+'</em>\
                                    </li>';

                        }
                        html += '</ul></div>';

                    }

                    html += '<div class="anwser-content">'+re.data.comments[lastFollow].content+'</div>\
                                <div class="anwser-good-bar" data-id="'+re.data.comments[lastFollow].id+'">\
                                    <div class="anwser-op">\
                                        <a href="javascript:;" class="anwser-replay">回复</a>\
                                        <div class="anwser-good">\
                                            <i class="iconfont icon-good"></i>\
                                            <em>'+re.data.comments[lastFollow].good_click+'</em>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>';
                }
                $('.answer-list').html("").html(html);
                $(".set-best").off("tap").on("tap",function(){
                    var uid = $(this).data("uid");
                    var id = $(this).closest(".anwser-good-bar").data("id");
                    _this.setBest(id,uid);
                });
                $(".anwser-replay").off("tap").on("tap",function(){
                    _this.reply_id = $(this).closest(".anwser-good-bar").data("id");
                    _this.showBox();
                })
                defaultAvator(".anwser-photo");
                _this.cGoodsStatus();
            }
            
        },'json');
    },
    getData: function(){
        var _this = this;
        $.post('//'+domain.gc+'/article/article/detail/',{token:_this.token,article_id:_this.id}, function (re) {
            if(re.code=='0001000'){
                _this.newstitle = re.data[0].title;
                _this.share?_this.huoke():"";
                _this.newscontent = re.data[0].short_content;
                _this.newsimg = re.data[0].share_picture;
                $(".news-content").html(re.data[0].body);
                $(".news-title").html(_this.newstitle);
                $(".news-time").html(re.data[0].create_time);
                $(".news-good").html('<i class="iconfont icon-good"></i><em>'+re.data[0].goods_click+'</em>');
                $(".news-scan").html('<i class="iconfont icon-scan"></i>'+re.data[0].views);
                _this.goodsStatus();
                _this.likeStatus();
                _this.getAnswerData();
                if(!_this.userId||_this.userId==0){
                    $(".answer-list").after('<p class="logintip">登录并分享文章，阅读者将成为您的客户，他买保险，您获保满意奖励。</p>');
                }
            }
        },'json');
    },
    huoke: function(){
        var arry = arry||[];
        var flag = 0;

        if(this.code&&this.typeId==1){
            arry = localStorage.getItem("hkgczx");
            if(arry){
                var b = arry.split(",");
                for(var i=0; i<b.length; i++){
                    flag = b[i] == this.id ? 1 : 0 ;
                };
            }


            if(!flag){
                var myoc = new ObtainClient({
                    user_id: this.userId,
                    code: this.code,
                    share_title: this.newstitle,
                    share_id: this.id,
                    share_type: 1
                });
                myoc.init();

                arry = arry?(arry+","+this.id):this.id;
                localStorage.setItem("hkgczx",arry)
            }
            
        }

        if(this.code&&this.typeId==2){
            arry = localStorage.getItem("hkgcpx");
            if(arry){
                var b = arry.split(",");
                for(var i=0; i<b.length; i++){
                    flag = b[i] == this.id ? 1 : 0 ;
                };
            }


            if(!flag){
                var myoc = new ObtainClient({
                    user_id: this.userId,
                    code: this.code,
                    share_title: this.newstitle,
                    share_id: this.id,
                    share_type: -1
                });
                myoc.init();

                arry = arry?(arry+","+this.id):this.id;
                localStorage.setItem("hkgcpx",arry)
            }
        }
    },
    cGoodsStatus: function(){
        var _this = this;
        var a;

        if (localStorage.getItem("cgooda")) {

            a = localStorage.getItem("cgooda");
            var b = a.split(",");
            for(var i=0; i<b.length; i++){
                $(".anwser-good-bar[data-id='"+b[i]+"']").find(".icon-good").addClass("icon-good-selected");
            };
        }

        var arry = arry||[];
        var flag=1;
        $(".anwser-good").off("tap").on("tap",function(){
            var that = this;
            var answer_id = $(this).closest(".anwser-good-bar").data("id").toString();
            if(flag==1){
                flag=0;
                if($(this).children("i").hasClass("icon-good-selected")){

                    $.post('//'+domain.gc+'/praise/Praise/remove',{token:_this.token,comment_id:answer_id}, function (re) {
                        if(re.code=='0001000'){
                            var good_num = $(that).children('em');
                            good_num.html(parseInt(good_num.html())-1);
                            $(that).children("i").removeClass("icon-good-selected");

                            if(a){arry = a.split(",");}

                            for (var i = 0; i < arry.length; i++) {
                                if (arry[i] == answer_id) {
                                    var index = arry.indexOf(answer_id);
                                    if (index > -1) {
                                        arry.splice(index, 1);
                                    }
                                }
                            }
                            localStorage.setItem("cgooda", arry);
                        }
                        flag=1;
                    },'json');
                }else{
                    $.post('//'+domain.gc+'/praise/Praise/add',{token:_this.token,comment_id:answer_id}, function (re) { 
                        if(re.code=='0001000'){
                            $.fn.tipsBox({
                                obj: $(that),
                                str: "+1",
                                callback: function (){
                                }
                            });
                            var good_num = $(that).children('em');
                            good_num.html(parseInt(good_num.html())+1);
                            $(that).children("i").addClass("icon-good-selected");
                            if(!a){
                                arry = answer_id;
                                a = answer_id;
                            }else{
                                a = a+","+answer_id;
                                arry = a;
                            }
                            localStorage.setItem("cgooda", arry);
                        }
                        flag=1;
                    },'json');
                }  
            }
            
        })
    },
    goodsStatus: function(){
        var _this = this;
        if(localStorage.good == _this.id){
            $('.goodnews-i').addClass("icon-good-border").removeClass("icon-ungood-border");
        }
        $(".goodnews-i").off("tap").on("tap",function(){
            var that = this;
            if($(this).hasClass("icon-good-border")){
                $.post('//'+domain.gc+'/article/praise/remove',{token:_this.token,id:_this.id}, function (re) { 
                    if(re.code=='0001000'){
                        var good_num = $('.news-good').children('em');
                        good_num.html(parseInt(good_num.html())-1);
                        $(that).removeClass("icon-good-border").addClass("icon-ungood-border");
                        localStorage.good = 0;
                    }
                    popAlert(re.msg);
                },'json');
            }else{
                $.post('//'+domain.gc+'/article/praise/add',{token:_this.token,id:_this.id}, function (re) { 
                    if(re.code=='0001000'){
                        $.fn.tipsBox({
                            obj: $(that),
                            str: "+1",
                            callback: function (){
                            }
                        });
                        var good_num = $('.news-good').children('em');
                        good_num.html(parseInt(good_num.html())+1);
                        $(that).addClass("icon-good-border").removeClass("icon-ungood-border");
                        localStorage.good = _this.id;
                    }
                    popAlert(re.msg);                   
                },'json');
            } 
        })
    },
    likeStatus: function(){
        var _this = this;
        $.post('//'+domain.gc+'/user/favorite/check/',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000'){
                if(re.data==1){$('.collect-i').addClass("icon-collected-border").removeClass("icon-uncollect-border");}
            }
        },'json');
        $(".collect-i").off("tap").on("tap",function(){
            var that = this;

            if($(this).hasClass("icon-collected-border")){
                $.post('//'+domain.gc+'/user/favorite/remove/',{token:_this.token,id:_this.id}, function (re) {
                    if(re.code=='0001000'){
                        $(that).removeClass("icon-collected-border").addClass("icon-uncollect-border");
                    }
                    popAlert(re.msg);
                },'json');
            }else{
                $.post('//'+domain.gc+'/user/favorite/add/',{token:_this.token,id:_this.id}, function (re) {
                    if(re.code=='0001000'){
                        $(that).addClass("icon-collected-border").removeClass("icon-uncollect-border");
                    }
                    popAlert(re.msg);
                },'json');
            }
        })
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&id='+this.id+'&userId='+this.userId+'&typeId='+this.typeId):(location.href+'?type=1&id='+this.id+'&userId='+this.userId+'&typeId='+this.typeId);

        var json = {
            "title":this.newstitle,
            "content":this.newscontent,  
            "linkUrl":url,
            "img":this.newsimg
        };
        this.typeId==1?json.type = 1:"";
        var share = JSON.stringify(json);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            window.webkit.messageHandlers.share.postMessage(share)
        } else if (navigator.userAgent.match(/android/i)) {
            window.bmy.share(share)
        }
    }
}


//经纪人详情
function Agent(options){
    var _default = {
        token: 0,
        agent_id: 0,
        type: null,
        user_id:0,
        share:false,
        loading: false,
        maxItems: 100, // 最多可加载的条目 
        itemsPerLoad: 8, // 每次加载添加多少条目 
        lastIndex: 8 // 上次加载的序号
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Agent.prototype = {
    init: function(){
        if(this.type=="life"){
            this.lifeData();
        }else if(this.type=="car"){
            this.carData();
        }
    },
    scrollevent: function(){
        var _this = this;
        // 注册'infinite'事件处理函数
        $(document).on('infinite', '.infinite-scroll-bottom',function() {

          // 如果正在加载，则退出
          if (_this.loading) return;

          // 设置flag
          _this.loading = true;

          // 模拟1s的加载过程
          setTimeout(function() {
              // 重置加载flag
              _this.loading = false;

              if (_this.lastIndex >= _this.maxItems||_this.lastIndex%_this.itemsPerLoad!=0) {
                    
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));

                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    $(".get-nomore").length<1?$('.list-block').after('<div class="get-nomore">没有更多了</div>'):"";
                    return;
              }

              // 添加新条目
              _this.addItems(_this.itemsPerLoad, _this.lastIndex);
              
              //容器发生改变,如果是js滚动，需要刷新滚动
              $.refreshScroller();
          }, 1000);
        });

        $(document).on('refresh', '.pull-to-refresh-content',function(e) {
            // 模拟2s的加载过程
            setTimeout(function() {
                // 加载完毕需要重置
                $.pullToRefreshDone('.pull-to-refresh-content');
            }, 2000);
        });
    },
    huoke: function(){
        var arry = arry||[];
        var flag = 0;

        if(this.code&&this.type=='life'){
            arry = localStorage.getItem("hksxxq");
            if(arry){
                var b = arry.split(",");
                for(var i=0; i<b.length; i++){
                    flag = b[i] == this.agent_id ? 1 : 0 ;
                };
            }

            if(!flag){
                var myoc = new ObtainClient({
                    user_id: this.user_id,
                    code: this.code,
                    share_title: "向亲们推荐一位保险大牛"+this.shareName,
                    share_id: this.agent_id,
                    share_type: -1
                });
                myoc.init();

                arry = arry?(arry+","+this.agent_id):this.agent_id;
                localStorage.setItem("hksxxq",arry)
            }
        }

        if(this.code&&this.type=="car"){
            arry = localStorage.getItem("hkcxxq");
            if(arry){
                var b = arry.split(",");
                for(var i=0; i<b.length; i++){
                    flag = b[i] == this.agent_id ? 1 : 0 ;
                };
            }

            if(!flag){
                var myoc = new ObtainClient({
                    user_id: this.user_id,
                    code: this.code,
                    share_title: "向亲们推荐一位保险大牛"+this.shareName,
                    share_id: this.agent_id,
                    share_type: -1
                });
                myoc.init();

                arry = arry?(arry+","+this.agent_id):this.agent_id;
                localStorage.setItem("hkcxxq",arry)
            }
        }
    },
    lifeData: function(){
        var _this = this;
        $.post('//'+domain.sx+'/agent/Agent/getAgentInfo',{user_id:_this.user_id,agent_id:_this.agent_id}, function (re) {
            if(re.code=='0001000'){
                var value = {
                    avator: re.data.avator,
                    name: re.data.real_name,
                    level: re.data.level,
                    branch: re.data.branch_name,
                    city: re.data.city_name,
                    region: re.data.region_name,
                    telphone: re.data.telphone,
                    intro: re.data.intro,
                    islike: re.data.is_like,
                    likenum: re.data.like_num,
                    company: re.data.company_name,
                    companytel: re.data.company_telphone,
                    companylogo: re.data.company_logo,
                    share: _this.share
                }
                _this.shareName = re.data.real_name;
                localStorage.setItem("agentName",_this.shareName)
                _this.shareIntro = re.data.intro
                _this.shareLogo = re.data.company_logo;
                _this.huoke();
                _this.dom.call(value);

                _this.goodsLife();
            }
        },'json');
        $.post('//'+domain.sx+'/agent/Journal/index',{token:_this.token,user_id:_this.agent_id,limit:1,page:1}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list.length){
                _this.lifedv = {
                    time: re.data.list[0].create_dt,
                    num: re.data.num,
                    imgNum: re.data.list[0].imgNum,
                    content: re.data.list[0].content.substring(0, 40),
                    pic: re.data.list[0].img_list,
                    share: _this.share,
                    type: _this.type,
                    agent_id: _this.agent_id
                }
                _this.dynamic.call(_this.lifedv);
            }
        },'json');
        $.post('//'+domain.sx+'/agent/honor',{token:_this.token,user_id:_this.agent_id,limit:3,page:1,words_num:40}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list.length){
                _this.lifehv = {
                    num: re.data.num,
                    list: re.data.list,
                    share: _this.share,
                    type: _this.type,
                    agent_id: _this.agent_id
                }
                _this.honour.call(_this.lifehv);
            }
        },'json');  
    },
    lifeDynamicList: function(l,p){
        var _this = this;
        $.post('//'+domain.sx+'/agent/Journal/index',{token:_this.token,user_id:_this.agent_id,limit:l,page:p}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list){
                var length = re.data.list.length>l?l:re.data.list.length;
                var html = "";
                for(var i=0; i<length; i++){
                    var img = "";
                    var clname = re.data.list[i].imgNum<=2?"box-less":"";
                    for(var j=0; j<re.data.list[i].imgNum; j++){
                        img += '<a rel="gallery-'+re.data.list[i].id+'" href="'+re.data.list[i].img_list[j].img_source+'" class="swipebox external '+clname+'" target="_blank"><img src="'+re.data.list[i].img_list[j].img_thumb+'" alt="image"></a>';
                    }
                    html += '<li data-id='+re.data.list[i].id+' class="dym-li">\
                                <em class="dynamic-time">'+re.data.list[i].create_dt+'</em>\
                                <p class="font-28 color-575757 dym-content" data-content="'+re.data.list[i].content+'"></p>\
                                <div class="dynamic-imglist clearfix">'+img+'</div>\
                            </li>';
                }               
                $('.dym-list').append(html);
                _this.lastIndex = $('.dym-list li').length;
                if(_this.lastIndex<l){
                    $('.infinite-scroll-preloader').remove();
                    $('.list-block').after('<div class="get-nomore">没有更多了</div>');
                }
                _this.showAll();
                $( '.swipebox' ).swipebox();               
            }
        },'json');
    },
    lifeHonourList: function(l,p){
        var _this = this;
        $.post('//'+domain.sx+'/agent/honor',{token:_this.token,user_id:_this.agent_id,limit:l,page:p,words_num:40}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list){
                var length = re.data.list.length>l?l:re.data.list.length;
                var html = "";
                for(var i=0; i<length; i++){
                    html += '<li data-id="'+re.data.list[i].id+'" class="go-hopage">\
                                <div class="dynamic-time">'+re.data.list[i].create_dt+'</div>\
                                <div class="honor-div"><img src="'+re.data.list[i].picture_thumb+'">\
                                <div class="honor-div-info"><h2>'+re.data.list[i].title+'</h2><p>'+re.data.list[i].intro+'</p></div></div>\
                            </li> ';
                }
                $(".list-hnr").append(html);
                _this.lastIndex = $('.list-hnr li').length;
                if(_this.lastIndex<l){
                    $('.infinite-scroll-preloader').remove();
                    $('.list-block').after('<div class="get-nomore">没有更多了</div>');
                }
                $(".go-hopage").on("tap",function(){
                    var id = $(this).data("id");
                    window.location.href = _this.share?"honour_page.html?type=1&id="+id+"&mtype="+_this.type+"&userId="+_this.agent_id:"bmy://app.page/agent/detail/honorDetail?honor_id="+id
                });
            }
        },'json');
    },
    carData: function(){
        var _this = this;
        $.post('//'+domain.cx+'/agent/getAgentInfo',{user_id:_this.user_id,agent_id:_this.agent_id}, function (re) {
            if(re.code=='0001000'){
                var value = {
                    avator: re.data.avator,
                    name: re.data.real_name,
                    level: re.data.level,
                    branch: re.data.branch,
                    city: re.data.city_name,
                    region: re.data.region_name,
                    telphone: re.data.telphone,
                    intro: re.data.intro,
                    islike: re.data.is_zan,
                    likenum: re.data.like_num,
                    company: re.data.company_name,
                    companytel: re.data.company_tel,
                    companylogo: re.data.company_logo,
                    share: _this.share
                }
                _this.shareName = re.data.real_name;
                localStorage.setItem("agentName",_this.shareName)
                _this.shareIntro = re.data.intro
                _this.shareLogo = re.data.company_logo;
                _this.huoke();
                _this.dom.call(value);
    
                _this.goodsCar();
            }
        },'json');
        $.post('//'+domain.cx+'/agent/find_dynamic',{token:_this.token,user_id:_this.agent_id,limit:1,page:1}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list){
                _this.cardv = {
                    time: re.data.list[0].create_dt,
                    num: re.data.num,
                    imgNum: re.data.list[0].imgNum,
                    content: re.data.list[0].content.substring(0, 40),
                    pic: re.data.list[0].img_list,
                    share: _this.share,
                    type: _this.type,
                    agent_id: _this.agent_id
                }
                _this.dynamic.call(_this.cardv);    
            }
        },'json');
        $.post('//'+domain.cx+'/agent/find_honor',{token:_this.token,user_id:_this.agent_id,limit:3,page:1,words_num:40}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list){
                _this.carhv = {
                    num: re.data.num,
                    list: re.data.list,
                    share: _this.share,
                    type: _this.type,
                    agent_id: _this.agent_id
                }
                _this.honour.call(_this.carhv);
            }
        },'json');
    },
    carDynamicList: function(l,p){
        var _this = this;
        $.post('//'+domain.cx+'/agent/find_dynamic',{token:_this.token,user_id:_this.agent_id,limit:l,page:p}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list){
                var length = re.data.list.length>l?l:re.data.list.length;
                var html = "";
                for(var i=0; i<length; i++){
                    var img = "";
                    var clname = re.data.list[i].imgNum<=2?"box-less":"";
                    for(var j=0; j<re.data.list[i].imgNum; j++){
                        img += '<a rel="gallery-'+re.data.list[i].id+'" href="'+re.data.list[i].img_list[j].img_source+'" class="swipebox external '+clname+'" target="_blank"><img src="'+re.data.list[i].img_list[j].img_thumb+'" alt="image"></a>';
                    }
                    html += '<li data-id='+re.data.list[i].id+' class="dym-li">\
                                <em class="dynamic-time">'+re.data.list[i].create_dt+'</em>\
                                <p class="font-28 color-575757 dym-content" data-content="'+re.data.list[i].content+'"></p>\
                                <div class="dynamic-imglist clearfix">'+img+'</div>\
                            </li>';
                }    
                $('.dym-list').append(html);
                _this.lastIndex = $('.dym-list li').length;
                if(_this.lastIndex<l){
                    $('.infinite-scroll-preloader').remove();
                    $('.list-block').after('<div class="get-nomore">没有更多了</div>');
                }
                _this.showAll();
                $( '.swipebox' ).swipebox();
            }
        },'json');
    },
    carHonourList: function(l,p){
        var _this = this;
        $.post('//'+domain.cx+'/agent/find_honor',{token:_this.token,user_id:_this.agent_id,limit:l,page:p,words_num:40}, function (re) {
            if(re.code=='0001000'&&re.data&&re.data.list){
                var length = re.data.list.length>l?l:re.data.list.length;
                var html = "";
                for(var i=0; i<length; i++){
                    html += '<li data-id="'+re.data.list[i].id+'" class="go-hopage">\
                                <div class="dynamic-time">'+re.data.list[i].create_dt+'</div>\
                                <div class="honor-div"><img src="'+re.data.list[i].picture_thumb+'">\
                                <div class="honor-div-info"><h2>'+re.data.list[i].title+'</h2><p>'+re.data.list[i].intro+'</p></div></div>\
                            </li> ';
                }    
                $(".list-hnr").append(html);
                _this.lastIndex = $('.list-hnr li').length;
                if(_this.lastIndex<l){
                    $('.infinite-scroll-preloader').remove();
                    $('.list-block').after('<div class="get-nomore">没有更多了</div>');
                }
                $(".go-hopage").on("tap",function(){
                    var id = $(this).data("id");
                    window.location.href = _this.share?"honour_page.html?type=1&id="+id+"&mtype="+_this.type+"&userId="+_this.agent_id:"bmy://app.page/agent/detail/honorDetail?honor_id="+id
                });
            }
        },'json');
    },
    dynamic: function(){
        this.time = this.time.split(" ");
        var title = '<em><i class="iconfont icon-dynamic dynamic-i"></i>最新动态<span class="dynamic-time mrl-20">'+this.time[0]+'</span></em>           <em class="dynamic-all">全部动态('+this.num+')</em>';
        var p="";
        var l = this.pic.length>4?4:this.pic.length;
        var cname = l<=2?"col-6":"col-3";
        for(var i=0; i<l; i++){
            p+='<div class="'+cname+' lf"><img src="'+this.pic[i].img_thumb+'"></div>'
        }
        var wrap = '<p class="font-28 color-575757">'+this.content+'</p>\
                    <div class="dynamic-img clearfix">'+p+'</div>';

        $("#mcompany").after('<div class="manager-bottom">\
                            <div class="manager-title">'+title+'</div>\
                            <div class="manager-wrap">'+wrap+'</div>\
                        </div>');
        var _this = this;
        var href = _this.share?"dynamic.html?type=1&mtype="+this.type+"&id="+this.agent_id:"bmy://app.page/agent/detail/dynamicList";
        $(".dynamic-all").on("tap",function(){
            window.location.href = href
        });
        $(".dynamic-img").on("tap",function(){
            window.location.href = href
        });
    },
    honour: function(){
        var title = '<em><i class="iconfont icon-honour honour-i"></i>我的荣誉</em><em class="honour-all">全部荣誉('+this.num+')</em>';
        var li="";
        for(var i=0; i<this.list.length; i++){
            li+='<li class="honour-list-li" data-id="'+this.list[i].id+'">\
                        <img src="'+this.list[i].picture_thumb+'" class="honour-list-img">\
                        <div class="honour-list-info">\
                            <h3>'+this.list[i].title+'</h3>\
                            <p>'+this.list[i].intro+'</p>\
                        </div>\
                    </li>';
        }

        $(".manager-btn").before('<div class="manager-bottom">\
                                <div class="manager-title">'+title+'</div>\
                                <div class="manager-wrap">\
                                    <div class="honour-list">\
                                        <ul>'+li+'</ul>\
                                    </div>\
                                </div>\
                            </div>');
        var _this = this;
        $(".honour-all").on("tap",function(){
            window.location.href = _this.share?"honour.html?type=1&mtype="+_this.type+"&id="+_this.agent_id:"bmy://app.page/agent/detail/honorList"
        });
        $(".honour-list-li").on("tap",function(){
            var id = $(this).data("id");
            window.location.href = _this.share?"honour_page.html?type=1&id="+id+"&mtype="+_this.type+"&userId="+_this.agent_id:"bmy://app.page/agent/detail/honorDetail?honor_id="+id
        });
    },
    dom: function(){
        $(".manager-photo").attr("src",this.avator)
        $(".manager-name").html(this.name);
        var level = parseInt(this.level);
        if(level==0){
            $(".manager-level").addClass('manager-level-lv0');
        }else if(level>0&&level<=6){
            $(".manager-level").addClass('manager-level-lv1');
        }else if(level>=7&&level<=12){
            $(".manager-level").addClass('manager-level-lv2');
        }
        else if(level>=13&&level<=18){
            $(".manager-level").addClass('manager-level-lv3');
        }
        else if(level>=19&&level<=24){
            $(".manager-level").addClass('manager-level-lv4');
        }
        else if(level>=25&&level<=30){
            $(".manager-level").addClass('manager-level-lv5');
        }
        $(".manager-level").html("LV."+this.level);
        $(".manager-detail").html('<em class="manager-company">分支机构：'+this.branch+'</em><em class="manager-location">业务区域：'+this.city+this.region+'</em><em class="manager-tel">业务电话：'+this.telphone+'<a href="bmy://app.call/phone?phone='+this.telphone+'" id="call-yw"><i class="iconfont icon-phone phone-manager-i"></i></a></em>');
        this.share?$("#call-yw").attr("href","tel:"+this.telphone):"";

        $(".manager-description").html(this.intro);
        if(this.islike&&this.share==false){
            $(".manager-good").html('<i class="iconfont icon-good icon-good-selected"></i><em>'+this.likenum+'</em>');
        }else if(!this.islike&&this.share==false){
            $(".manager-good").html('<i class="iconfont icon-good"></i><em>'+this.likenum+'</em>');
        }   
        $(".manager-company-info").html('<h3>'+this.company+'</h3><p>服务电话：'+this.companytel+'</p>');
        $(".manager-company-photo").attr("src",this.companylogo);
    },
    honourCarPage: function(){
        var _this = this;
        $.post('//'+domain.cx+'/agent/info_honor',{token:_this.token,honor_id:_this.nid}, function (re) {
            if(re.code=='0001000'){
                $(".honour-page").html('<div class="dynamic-time">'+re.data.create_dt+'</div>\
                            <img src="'+re.data.picture+'">\
                            <h1>'+re.data.title+'</h1>\
                            <p>'+re.data.intro+'</p>');
            }
        },'json');
    },
    honourLifePage: function(){
        var _this = this;
        $.post('//'+domain.sx+'/agent/honor/info_honor',{token:_this.token,honor_id:_this.nid}, function (re) {
            if(re.code=='0001000'){
                $(".honour-page").html('<div class="dynamic-time">'+re.data.create_dt+'</div>\
                            <img src="'+re.data.picture+'">\
                            <h1>'+re.data.title+'</h1>\
                            <p>'+re.data.intro+'</p>');
            }
        },'json');
    },
    goodsStatus: function(a,b,c,d){
        var _this = this;
        var flag = 1;
        $(".manager-good").on("tap",function(){
            var that = this;
            if(flag==1){
                flag=0;
                if($(this).children(".icon-good").hasClass("icon-good-selected")){
                    $.post('//'+a,{token:_this.token,agent_id:_this.agent_id}, function (re) { 
                        if(re.code==c){
                            var good_num = $(that).children('em');
                            good_num.html(parseInt(good_num.html())-1);
                            $(that).children(".icon-good").removeClass("icon-good-selected");  
                        }
                        flag=1;
                        popAlert(re.msg);
                    },'json');
                }else{
                    $.post('//'+b,{token:_this.token,agent_id:_this.agent_id}, function (re) { 
                        if(re.code==d){
                            $.fn.tipsBox({
                                obj: $(that),
                                str: "+1",
                                callback: function (){
                                }
                            });
                            var good_num = $(that).children('em');
                            good_num.html(parseInt(good_num.html())+1);
                            $(that).children(".icon-good").addClass("icon-good-selected");  
                        }
                        flag=1;
                        popAlert(re.msg);
                    },'json');
                }
            }
        })
    },
    goodsLife: function(){
        this.goodsStatus(domain.sx+"/artificial/agent/like",domain.sx+"/artificial/agent/like","2101302","2101302");
    },
    goodsCar: function(){
        this.goodsStatus(domain.cx+"/agent/cancle_zan",domain.cx+"/agent/zan","0001000","0001000");
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&id='+this.agent_id+'&user_id='+this.user_id):(location.href+'?type=1&id='+this.agent_id+'&user_id='+this.user_id);

        ShareFun("向亲们推荐一位保险大牛"+this.shareName,this.shareIntro,url,this.shareLogo);

    },
    sharehList: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&id='+this.agent_id+'&userId='+this.user_id+'&mtype='+this.type):(location.href+'?type=1&id='+this.agent_id+'&userId='+this.user_id+'&mtype='+this.type);

        ShareFun("保满意认证经纪人"+localStorage.getItem("agentName"),"点击查看"+localStorage.getItem("agentName")+"的荣誉",url,null);

    },
    sharedList: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&id='+this.agent_id+'&userId='+this.user_id+'&mtype='+this.type):(location.href+'?type=1&id='+this.agent_id+'&userId='+this.user_id+'&mtype='+this.type);

        ShareFun("保满意认证经纪人"+localStorage.getItem("agentName"),"点击查看"+localStorage.getItem("agentName")+"的动态",url,null);

    },
    sharehpage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&id='+this.agent_id+'&userId='+this.user_id+'&mtype='+this.type):(location.href+'?type=1&id='+this.agent_id+'&userId='+this.user_id+'&mtype='+this.type);

        ShareFun("保满意认证经纪人"+localStorage.getItem("agentName"),"点击查看"+localStorage.getItem("agentName")+"的荣誉详情",url,null);
    },
    addItems: function(number, lstIndex){
        var page = lstIndex/this.itemsPerLoad+1;
        if(this.type=="car"&&this.menu=="d"){
            this.carDynamicList(this.itemsPerLoad,page);
        }else if(this.type=="life"&&this.menu=="d"){
            this.lifeDynamicList(this.itemsPerLoad,page);
        }

        if(this.type=="car"&&this.menu=="h"){
            this.carHonourList(this.itemsPerLoad,page);
        }else if(this.type=="life"&&this.menu=="h"){
            this.lifeHonourList(this.itemsPerLoad,page);
        }
    },
    showAll: function(){
        $(".dym-content").each(function(){
            $(this).overTexts({
                texts: $(this).data("content"),
                textLength: "65",
                overText: "...全文",
                openText: "收起",
                ooType: "2"
            });
        }) 
    }
}



//产品详情
function ProCompare(options){
    var _default = {
        product_ida: 0,
        product_idb: 0,
        ill_id: 0,
        type: null,
        sex: null,
        age: null,
        fee: null,
        range: null,
        user_id: 0,
        product_id: 0,
        cp_product_id:"0,0",
        cp_sex:0,
        cp_age:0,
        cp_fee:0,
        cp_range:0,
        share: false,
        quota:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    if(this.type=='result'){
        this.result();
    }else if(this.type=='detail'){
        this.detail();
    }else if(this.type=='compare'){
        this.compare();
    }
}

ProCompare.prototype = {
    result: function(){
        var _this = this;
        $.post('//'+domain.sx+'/online/product/product_ill',{product_id:_this.product_ida+','+_this.product_idb,ill_id:_this.ill_id}, function (re) { 
            if(re.code=='2001402'){
                var html="";
                for(var i in re.data.ill){
                    html+='<div class="product-block">'
                        +    '<table class="product-table">'
                        +        '<tr>'
                        +            '<th class="product-list col-1">'+i+'</th>'
                        +            '<th class="product-list col-2">承保率</th>'
                        +            '<th class="product-list col-3">'+re.data.name[0].product_name+'</th>'
                        +            '<th class="product-list col-4">'+re.data.name[1].product_name+'</th>'
                        +        '</tr>';

                    for(var j in re.data.ill[i]){
                        html+=  '<tr>'
                        +            '<td class="product-list col-1">'+re.data.ill[i][j].name+'</td>'
                        +            '<td class="product-list col-2">'+re.data.ill[i][j].rate+'%</td>';
                        if(re.data.ill[i][j]["product_id_"+_this.product_ida]==1){
                            html+=   '<td class="product-list col-3"><i class="icon-choose"></i></td>'
                        }else if(re.data.ill[i][j]["product_id_"+_this.product_ida]==0){
                            html+=   '<td class="product-list col-3"><i class="icon-choose-no"></i></td>'
                        }
                        if(re.data.ill[i][j]["product_id_"+_this.product_idb]==1){
                            html+=   '<td class="product-list col-4"><i class="icon-choose"></i></td>'
                        }else if(re.data.ill[i][j]["product_id_"+_this.product_idb]==0){
                            html+=   '<td class="product-list col-4"><i class="icon-choose-no"></i></td>'
                        }
                        
                        html+=  '</tr>';
                    }
                    html+=   '</table>'
                        +'</div>';
                    
                }
                $(".product-wrap").html(html);
            }
        },'json');       
    },
    detail: function(){
        var _this = this;
        $.post('//'+domain.sx+'/online/product/product_project',{product_id:_this.product_id,sex:_this.sex,age:_this.age,fee:_this.fee,user_id:_this.user_id,range:_this.range,quota:_this.quota}, function (re) {
            if(re.code=='2001302'){
                if(!re.data){return;}
                _this.detail_light = re.data.product_light;
                var html =  '<li>性别：'+re.data.sex+'</li>'
                         +  '<li>年龄：'+re.data.age+'</li>'
                         +  '<li>交费方式：'+re.data.fee+'</li>'
                         +  '<li>保险期间：'+re.data.range+'</li>'
                         +  '<li>保额：'+re.data.quota+'元</li>'
                         +  '<li>保费：'+re.data.product_price+'元/年</li>';
                $(".pro-block-list").html(html);
                var html2 = '<li class="clearfix">'
                          +    '<em>重疾保障：'+re.data.seriously_num+'种</em>'
                          +    '<em>保额：2年后'+parseInt(re.data.quota)*3+'元</em>'
                          +    '<em class="last-col"><a href="javascript:;" class="exp-detail" _info="seriously_intro">条款注解</a></em>'
                          +'</li>'
                          +'<li class="clearfix">'
                          +    '<em>身故赔偿：'+parseInt(re.data.product_price)*parseInt(re.data.fee_year)+'元</em>'
                          +    '<em class="last-col"><a href="javascript:;" class="exp-detail" _info="dead_intro">条款注解</a></em>'
                          +'</li>';
                          /*+'<li class="clearfix">'
                          +    '<em>轻疾保障：'+re.data.light_num+'种</em>'
                          +    '<em>保额：'+re.data.light_fee+'元</em>'
                          +    '<em class="last-col"><a href="javascript:;" class="exp-detail" _info="light_intro">条款注解</a></em>'
                          +'</li>'
                          +'<li class="clearfix">'
                          +    '<em>满期保障：'+re.data.return_fee+'种</em>'
                          +    '<em class="last-col"><a href="javascript:;" class="exp-detail" _info="return_intro">条款注解</a></em>'
                          +'</li>'
                          +'<li class="clearfix">'
                          +    '<em>全残保障：'+re.data.disabled_fee+'种</em>'
                          +    '<em class="last-col"><a href="javascript:;" class="exp-detail" _info="disabled_intro">条款注解</a></em>'
                          +'</li>'
                          +'<li class="clearfix">'
                          +    '<em>疾病终末期保障：'+re.data.late_fee+'种</em>'
                          +    '<em class="last-col"><a href="javascript:;" class="exp-detail" _info="late_intro">条款注解</a></em>'
                          +'</li>'*/
                          
                $(".pro-block-list2").html(html2);
                $(".pro-title").html(re.data.product_name);

                if(_this.share==false){
                    if(re.data.user_id){
                        var agent = $('<div class="pro-block"></div>');
                        var agentInfo ='<div class="pro-manager-info">'
                            +    '<img src="'+re.data.avator+'" class="manager-photo">'
                            +    '<h1 class="manager-name">'+re.data.real_name+'</h1>'
                            +    '<div class="manager-detail detail-block">'
                            +        '<em class="manager-level">LV.'+re.data.star+'</em>'
                            +        '<em class="manager-year">'
                            +            '<i class="icon-year"></i>从业 '+re.data.practise+'年'
                            +        '</em>'
                            +    '</div>'
                            +    '<div class="manager-detail detail-block">'
                            +        '<em class="manager-location">'
                            +            '<i class="iconfont icon-location"></i>'+re.data.city+' '+re.data.region
                            +        '</em>'
                            +        '<em class="manager-consult">'
                            +            '<i class="icon-consult"></i>咨询数 '+re.data.advice_num+''
                            +        '</em>'
                            +    '</div>'
                            +'</div>'
                        agent.html(agentInfo);
                        $('.pro-wrap').append(agent);
                        /*var level = parseInt(re.data.level);
                        if(level>=0&&level<=6){
                            $(".manager-level").addClass('manager-level-lv1');
                        }else if(level>=7&&level<=12){
                            $(".manager-level").addClass('manager-level-lv2');
                        }
                        else if(level>=13&&level<=18){
                            $(".manager-level").addClass('manager-level-lv3');
                        }
                        else if(level>=19&&level<=24){
                            $(".manager-level").addClass('manager-level-lv4');
                        }
                        else if(level>=25&&level<=30){
                            $(".manager-level").addClass('manager-level-lv5');
                        }*/

                    }else{
                        var agent = $('<a class="pro-btn" href="javascript:;">投保咨询(选择保险经纪人)</a>');
                        $('.pro-wrap').append(agent);
                        $('.pro-btn').on("tap",function(){
                            if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                                window.webkit.messageHandlers.lifePost.postMessage(null)
                            } else if (navigator.userAgent.match(/android/i)) {
                                window.bmy.lifePost()
                            }
                        });
                    }
                }
                
                $(".pro-item").on('tap',function(){
                    window.location = re.data.product_clause;
                })
                $(".exp-detail").on('tap',function(){
                    var info = $(this).attr("_info");     
                    //popUp(re.data[info]);
                })
            }
        },'json');
    },
    compare: function(){
        var _this = this;
        var p_id = this.cp_product_id.split(",");
        var p_namea,p_nameb;
        this.cp_pro_id = p_id[0]+','+p_id[1];
        $.post('//'+domain.sx+'/online/product/product_info',{product_id:_this.cp_pro_id,sex:_this.cp_sex,age:_this.cp_age,fee:_this.cp_fee,range:_this.cp_range,quota:_this.quota}, function (re) { 
            if(re.code=='2001302'){
                p_namea=re.data.product_info[0].product_name;
                p_nameb=re.data.product_info[1].product_name;
                _this.namea=p_namea;
                _this.nameb=p_nameb;
                $(".product-compare-title").html('<em>'+p_namea+' VS</em><em>'+p_nameb+'</em>');
                var kong = '--';
                var table1 = '<tr>'
                        +    '<td class="product-list-comp col-1">年交保费</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].product_price+'元('+re.data.search.sex+'，'+re.data.search.age+'，'+re.data.search.range+'，保额'+re.data.search.quota+')</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].product_price+'元('+re.data.search.sex+'，'+re.data.search.age+'，'+re.data.search.range+'，保额'+re.data.search.quota+')</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">总保费</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].all_price+'元</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].all_price+'元</td>'
                        +'</tr>';
                $(".table1-comp").html(table1);
                var table2 = '<tr>'
                        +    '<td class="product-list-comp col-1">保险公司</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].company_short+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].company_short+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">产品亮点</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].product_light+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].product_light+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">被保险人年龄</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].product_age_start+'-'+re.data.product_info[0].product_age_end+'岁</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].product_age_start+'-'+re.data.product_info[0].product_age_end+'岁</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">交费方式</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].product_fee+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].product_fee+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">保险金额</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].all_price+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].all_price+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">保险期间</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].product_range+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].product_range+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">等待期</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].product_wait+'天</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].product_wait+'天</td>'
                        +'</tr>';
                $(".table2-comp").html(table2);
                var table3 = '<tr>'
                        +    '<td class="product-list-comp col-1">重疾数量</td>'
                        +    '<td class="product-list-comp col-2"><a href="/view/compare/pro_result.html?product_id='+p_id[0]+','+p_id[1]+'&ill_id=1">'+re.data.product_info[0].seriously_num+'种 (点击查看)</a></td>'
                        +    '<td class="product-list-comp col-3"><a href="/view/compare/pro_result.html?product_id='+p_id[0]+','+p_id[1]+'&ill_id=1">'+re.data.product_info[1].seriously_num+'种 (点击查看)</a></td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">轻疾数量</td>'
                        +    '<td class="product-list-comp col-2"><a href="/view/compare/pro_result.html?product_id='+p_id[0]+','+p_id[1]+'&ill_id=2">'+re.data.product_info[0].light_num+'种 (点击查看)</a></td>'
                        +    '<td class="product-list-comp col-3"><a href="/view/compare/pro_result.html?product_id='+p_id[0]+','+p_id[1]+'&ill_id=2">'+re.data.product_info[1].light_num+'种 (点击查看)</a></td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">满期返还</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].return_fee+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].return_fee+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">身故保障</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].dead_fee+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].dead_fee+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">全残保障</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].disabled_fee+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].disabled_fee+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">疾病终期保障</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].late_fee+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].late_fee+'</td>'
                        +'</tr>'
                        +'<tr>'
                        +    '<td class="product-list-comp col-1">保障豁免</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].remitted_intro+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].remitted_intro+'</td>'
                        +'</tr>';
                $(".table3-comp").html(table3);
                var table4 = '<tr>'
                        +    '<td class="product-list-comp col-1">重要提示</td>'
                        +    '<td class="product-list-comp col-2">'+re.data.product_info[0].important_intro+'</td>'
                        +    '<td class="product-list-comp col-3">'+re.data.product_info[1].important_intro+'</td>'
                        +'</tr>';
                $(".table4-comp").html(table4);
                
                $(".product-list-comp").each(function(){    
                    if(!$(this).html().replace(/(^\s*)|(\s*$)/g, "")){
                       $(this).html("--");
                    }
                });
            }      
        },'json');
    },
    sharepage: function(type){
        var url = window.location.href.match(/html\?/);

        var content;
        if(type=="detail"){
            content = this.detail_light;
            url = (url[0]=='html?')?(location.href+'&'):(location.href+'?');
            url += 'type=1&sex='+this.sex+'&age='+this.age+'&fee='+this.fee+'&range='+this.range+'&user_id='+this.user_id+'&product_id='+this.product_id+'&quota='+this.quota;
            /*(location.href+'?type=1&sex='+this.sex+'&age='+this.age+'&fee='+this.fee+'&range='+this.range+'&user_id='+this.user_id+'&product_id='+this.product_id+'&quota='+this.quota);*/
        }else{
            content = "("+this.namea+") & ("+this.nameb+") 对比详情";
            url = (url[0]=='html?')?(location.href+'&'):(location.href+'?');
            url += 'type=1&cp_sex='+this.cp_sex+'&cp_age='+this.cp_age+'&cp_fee='+this.cp_fee+'&cp_range='+this.cp_range+'&cp_pro_id='+this.cp_pro_id+'&quota='+this.quota;
            /*:(location.href+'?type=1&cp_sex='+this.cp_sex+'&cp_age='+this.cp_age+'&cp_fee='+this.cp_fee+'&cp_range='+this.cp_range+'&cp_pro_id='+this.cp_pro_id+'&quota='+this.quota)*/
        }
        var json = {
            "title":document.title, 
            "content":content,  
            "linkUrl":url,
            "img":null
        };
        var share = JSON.stringify(json);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            window.webkit.messageHandlers.share.postMessage(share)
        } else if (navigator.userAgent.match(/android/i)) {
            window.bmy.share(share)
        }
    }
}



//经销商详情
function Distributor(options) {
    var _default = {
       order:0,
       token: 0,
       agency_id:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    this.getData();
    this.getAgentList();
    this.choose();
}

Distributor.prototype = {
    getData: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/agency/getInfo',{token:_this.token,id:_this.agency_id}, function (re) { 
            if(re.code=='0001000'){
                document.title=re.data.short_name;
                var province = (re.data.province=="北京市"||re.data.province=="天津市"||re.data.province=="上海市"||re.data.province=="重庆市")?"":re.data.province;
                var html = '<div class="distributor-into-title">'+re.data.name+'</div>'
                         +  '<ul class="distributor-into-body">'
                         +       '<li><i class="iconfont icon-location"></i>'+province+re.data.city+re.data.address+'</li>'
                         +       '<li><i class="iconfont icon-phone"></i>'+re.data.telephone+'</li>'
                         +       '<li><i class="iconfont icon-cars"></i>'+re.data.sale+'</li>'
                         +   '</ul>';
                $(".distributor-into").html(html);
            }
        },'json');
    },
    getAgentList:function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/agent/getAgentList',{token:_this.token,id:_this.agency_id,limit:0,page:1}, function (re) { 
            if(re.code=='0001000'){
                var html="";
                for (var i = 0; i < re.data.length; i++) {
                    _this.choosen = re.data[i].is_select?"has-choosen":"no-choosen";
                    html += '<li _id="'+re.data[i].user_id+'" class="'+_this.choosen+'">'
                         +     '<img src="'+re.data[i].avator+'" class="img-agent">'
                         +     '<span>'+re.data[i].name+'</span>'
                         +     '<i class="icon-duigou"></i>'
                         + '</li>';
                }
                $(".agent-list").html(html);
                defaultAvator(".img-agent");
                _this.choose();
                $(".js-free").on("tap",function(){
                    _this.agent_id = "";
                    $(".agent-list li").not(".agent-list li.has-choosen").not(".agent-list li.no-choosen").each(function(){
                        _this.agent_id += $(this).attr("_id")+","
                    });
                    _this.agent_id=_this.agent_id.substring(0,_this.agent_id.length-1);
                    if(_this.agent_id){
                       _this.inquiry();
                    }
                })
            }
        },'json');
    },
    choose:function(){    
        $(".agent-list li.no-choosen").not(".agent-list li.has-choosen").on("tap",function(){
            $(this).toggleClass("no-choosen");
            var flag=0;
            $(".agent-list li").each(function(){
                if($(this).attr("class")==""){
                    flag=1;
                }
            })
            if(flag){
                $(".btn-org").addClass("active");
            }else{
                $(".btn-org").removeClass("active");
            }
        });
    },
    inquiry: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/inquiry/inquireChooseAgents',{token:_this.token,order:_this.order,agency_id:_this.agency_id,agent_id:_this.agent_id}, function (re) {
            if(re.code=='0001000'){
                popSuccess(1);
            }else{
                if(re.data.code=='-2'){
                   popAlert("您今天已向该经销商询价！"); 
                }else{
                   popAlert("系统繁忙！");
                }
            }
        },'json');
    }
}


//经销商详情
function DistributorShow(options) {
    var _default = {
       orderid:0,
       token: 0,
       agency_id:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    this.getData();
    this.getUserInfo();
}

DistributorShow.prototype = {
    getData: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/agency/getInfo',{token:_this.token,id:_this.agency_id}, function (re) { 
            if(re.code=='0001000'){
                document.title=re.data.short_name;
                var province = (re.data.province=="北京市"||re.data.province=="天津市"||re.data.province=="上海市"||re.data.province=="重庆市")?"":re.data.province;
                var html = '<div class="distributor-into-title2">'+re.data.name+'</div>'
                         +  '<ul class="distributor-into-body distributor-into-body2">'
                         +       '<li><i class="iconfont icon-location"></i>'+province+re.data.city+re.data.address+'</li>'
                         +       '<li><i class="iconfont icon-phone"></i>'+re.data.telephone+'</li>'
                         +       '<li><i class="iconfont icon-cars"></i>'+re.data.sale+'</li>'
                         +   '</ul>';
                $(".distributor-into2").html(html);
            }
        },'json');
    },
    getUserInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/Inquiry/getUserInfo',{token:_this.token,id:_this.orderid,type:2}, function (re) {
            if(re.code=='0001000'){
                $("#user-name em").html(re.data.name);
                $("#user-phone").html(re.data.telephone);
                var html="";
                for (var i = 0; i < re.data.agent_list.length; i++) {
                    html += '<li class="no-choosen">'
                         +     '<img src="'+re.data.agent_list[i].avator+'" class="img-agent">'
                         +     '<span>'+re.data.agent_list[i].name+'</span>'
                         +     '<i class="icon-duigou"></i>'
                         + '</li>';
                }
                $(".agent-list").html(html);
                defaultAvator(".img-agent");
            }
        },'json');
    }
}


//免费询价
function Inquiry(options) {
    var _default = {
       id: 0,
       type:1,
       limit:0,
       city:null,
       page:1,
       token: 0,
       user_id:0,
       stype:0,
       mobile:null
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    var _this = this;
    if(this.mobile){$("#contact-phone").val(this.mobile);}
    if(this.name){$("#contact-username").val(this.name);}
    this.getData();
    this.getCarInfo();
    this.iscollectCar();
    this.event();
    if(this.city){$(".city-location em").html(this.city);}
    $(".add-garage").off("tap").on("tap",function(){
        _this.collectCar();
    })
}

Inquiry.prototype = {
    getData: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/agency/agencyList',{token:_this.token,id:_this.id,city:_this.city,limit:_this.limit,page:_this.page}, function (re) {
            var html="";
            if(re.code=='0001000'){
                for (var i = 0; i < re.data.length; i++) {
                    _this.htmltype = re.data[i].type==1?'4s店':(re.data[i].type==2?'3S店':(re.data[i].type==3?'综合性经销商':''));
                    _this.htmlstatus = re.data[i].status?'<em class="item-green">已认证</em>':'';
                    _this.htmlclass = re.data[i].status?(re.data[i].is_select?"to-select":"to-select"):"selected-none";
                    _this.htmli =  re.data[i].status?(re.data[i].is_select?"icon-unselected-single":"icon-unselected-single"):"icon-blank";
                    var price = re.data[i].price==0?'暂无报价':re.data[i].price/10000+'万';

                    html += '<li class="'+_this.htmlclass+'">'
                          +  '<i class="iconfont '+_this.htmli+'" _id="'+re.data[i].id+'"></i>'
                          +  '<div class="inquiry-distributor-info">'
                          +      '<div class="inquiry-main">'
                          +          '<h2>'+re.data[i].name+'</h2>'
                          +          '<em class="item-blue">'+_this.htmltype+'</em>'+_this.htmlstatus
                          +          '<p>'+re.data[i].address+'</p>'
                          +      '</div>'
                          +      '<div class="inquiry-price">'+price+'</div>'
                          +  '</div>'
                          + '</li>';
                }
                $(".inquiry-distributor-list").html(html);
                _this.choose();
                $(".selected-none").off("tap").on("tap",function(){
                    _this.agencyid = $("i",this).attr("_id");
                    _this.toNextPage();
                })
                $(".free-btn").off("tap").on("tap",function(){
                    if(!_this.hasInfo()){return;}

                    _this.agency_id="";
                    $(".to-select .icon-selected-single").each(function(){
                        _this.agency_id+=$(this).attr("_id")+",";
                    })

                    _this.agency_id=_this.agency_id.substring(0,_this.agency_id.length-1)

                    if(!_this.agency_id){popAlert("请选择经销商");}else{
                       _this.freeinquiry();
                    }
                });
            }
        },'json');
    },
    getCarInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/car/serie/getCarStyleInfo',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000'){
                _this.description = re.data.year+' '+re.data.name+' '+re.data.trans+' '+re.data.emissions;
                $(".intention-main").html('<div class="intention-photo">'
                    +'<img src="'+re.data.picture+'">'
                +'</div>'
                +'<div class="intention-info">'
                    +'<h2 class="title-info">'+re.data.brand_name+'</h2>'
                    +'<p class="title-secinfo">'+_this.description+'</p>'
                +'</div>');
            }
        },'json');
    },
    hasInfo: function(){
        this.name = $("#contact-username").val();
        if(!matchTest.regularList['realname'].test(this.name)){
            popAlert(matchTest.errorMsg['realname']);
            return false;
        }
        this.telephone = $("#contact-phone").val();
        if(!matchTest.regularList['mobile'].test(this.telephone)){
            popAlert(matchTest.errorMsg['mobile']);
            return false;
        }
        this.tele_code = $("#phone-code").val();
        if(!matchTest.regularList['notEmpty'].test(this.tele_code)){
            popAlert("验证码"+matchTest.errorMsg['notEmpty']);
            return false;
        }
        return true;
    },
    toNextPage: function(){
        var _this = this;
        if(!_this.hasInfo()){return;}
        var flag = 1;
        if(flag){
            flag=0;
            $.post('//'+domain.xc+'/agency/inquiry/agentsInquire',{token:_this.token,style_id:_this.id,city_id:_this.city,name:_this.name,telephone:_this.telephone,tele_code:_this.tele_code,user_id:_this.user_id,agency_id:_this.agencyid}, function (re) {
                flag=1;
                if(re.code=='0001000'){
                    if(_this.stype==1){
                        window.location = "/view/newcars/distributor.html?inject=all&orderid="+re.data.order+"&agencyid="+_this.agencyid+"&stype=1"; 
                    }else{
                        window.location = "bmy://app.page/dealer/detail?dealerId="+_this.agencyid+"&orderId="+re.data.order;
                    }
                }else if(re.code=='0001001'){
                    re.data.code==-2?popAlert("您今天已向该经销商询价！"):popAlert("系统繁忙！")
                }else if(re.code=='0001004'){
                    re.data.code==-1?popAlert("验证码过期"):popAlert("验证码错误或不存在")
                }
            },'json');
        }
    },
    choose: function(){
        $(".inquiry-distributor-list li.to-select").off("tap").on("tap",function(){
            $("i",this).toggleClass("icon-unselected-single");
            $("i",this).toggleClass("icon-selected-single");
        })
    },
    freeinquiry: function(){
        var _this = this;
        var flag=1;
        if(flag){
            flag=0;
            $.post('//'+domain.xc+'/agency/inquiry/inquire',{token:_this.token,style_id:_this.id,city_id:_this.city,name:_this.name,telephone:_this.telephone,agency_id:_this.agency_id,type:_this.type,tele_code:_this.tele_code,user_id:_this.user_id}, function (re) {
                flag=1;
                if(re.code=='0001000'){
                   re.data.code==1?popSuccess(1):popAlert("没有经纪人可以询价");
                }else if(re.code=='0001001'){
                    re.data.code==-2?popAlert("您今天已向该经销商询价！"):popAlert("系统繁忙！")
                }else if(re.code=='0001004'){
                    re.data.code==-1?popAlert("验证码过期"):popAlert("验证码错误或不存在")
                }else{
                    popAlert("询价失败");
                }
            },'json');
        }      
    },
    collectCar:function(){
        var flag = 1,_this=this;
        if(flag){
            flag=0;
            if($(".add-garage").hasClass("my-garage")){
                $.post('//'+domain.xc+'/car/car/delCar',{token:_this.token,style_id:_this.id,city:_this.city}, function (re) {
                    if(re.code=='0001000'){
                        flag=1;
                        $(".add-garage").removeClass("my-garage");
                        $(".icon-unfavorite").removeClass("icon-favorite");
                    }
                    popAlert(re.msg);
                },'json');
                return;
            }
            $.post('//'+domain.xc+'/car/car/favor',{token:_this.token,style_id:_this.id,city:_this.city}, function (re) {
                if(re.code=='0001000'){
                    flag=1;
                    $(".add-garage").addClass("my-garage");
                    $(".icon-unfavorite").addClass("icon-favorite");
                }
                popAlert(re.msg);
            },'json');
        }
    },
    iscollectCar: function(){
        var _this = this;
        $.post('//'+domain.xc+'/user/user/isSelect',{token:_this.token,style_id:_this.id}, function (re) {
            if(re.code=='0001000'&&re.data==1){
                $(".add-garage").addClass("my-garage");
                $(".icon-unfavorite").addClass("icon-favorite");
            }
        },'json');
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&stype=1&id='+this.id+'&userId='+this.user_id):(location.href+'?stype=1&id='+this.id+'&userId='+this.user_id);

        var json = {
            "title":"保满意-好车询底价",
            "content":this.description,
            "linkUrl":url,
            "img":""
        };

        var share = JSON.stringify(json);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            window.webkit.messageHandlers.share.postMessage(share)
        } else if (navigator.userAgent.match(/android/i)) {
            window.bmy.share(share)
        }
    },
    event : function () {
        var _this=this;
        $("#send-code").off("tap").on("tap",function(){
            if($(this).attr("disabled")=="disabled"){
                return;
            };
            $(this).attr("disabled","disabled");
            new sendMessage({
                mobliephone: $("#contact-phone"),
                type: "order",
                token: _this.token
            })
        });
    }
}


//免费询价展示
function InquiryShow(options) {
    var _default = {
       id: 0,
       orderid:0,
       limit:0,
       city:null,
       page:1,
       token: 0,
       user_id:0,
       stype:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    var _this = this;
   
    this.getCarInfo();
    this.getUserInfo();
}

InquiryShow.prototype = {
    getCarInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/car/serie/getCarStyleInfo',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000'){
                _this.description = re.data.year+' '+re.data.name+' '+re.data.trans+' '+re.data.emissions;
                $(".intention-main").html('<div class="intention-photo">'
                    +'<img src="'+re.data.picture+'">'
                +'</div>'
                +'<div class="intention-info">'
                    +'<h2 class="title-info">'+re.data.brand_name+'</h2>'
                    +'<p class="title-secinfo">'+_this.description+'</p>'
                +'</div>');
            }
        },'json');
    },
    getUserInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/Inquiry/getUserInfo',{token:_this.token,id:_this.orderid,type:1}, function (re) {
            if(re.code=='0001000'){
                $("#contact-username").html(re.data.name);
                $("#contact-phone").html(re.data.telephone);
                $(".city-location em").html(re.data.city);
                var html = "";
                for (var i = 0; i < re.data.agency_list.length; i++) {
                   _this.htmltype = re.data.agency_list[i].type==1?'4s店':(re.data.agency_list[i].type==2?'3S店':(re.data.agency_list[i].type==3?'综合性经销商':''));
                    _this.htmlstatus = re.data.agency_list[i].status?'<em class="item-green">已认证</em>':'';
                    var price = re.data.agency_list[i].price==0?'暂无报价':re.data.agency_list[i].price/10000+'万';

                    html += '<li>'
                          +  '<i class="icon-selected"></i>'
                          +  '<div class="inquiry-distributor-info">'
                          +      '<div class="inquiry-main">'
                          +          '<h2>'+re.data.agency_list[i].name+'</h2>'
                          +          '<em class="item-blue">'+_this.htmltype+'</em>'+_this.htmlstatus
                          +          '<p>'+re.data.agency_list[i].address+'</p>'
                          +      '</div>'
                          +      '<div class="inquiry-price">'+price+'</div>'
                          +  '</div>'
                          +'</li>';
                }
                $(".inquiry-distributor-list").html(html);
            }
        },'json');
    }
}

//免费试驾
function Drive(options) {
    var _default = {
       id: 0,
       type:2,
       limit:0,
       city:null,
       page:1,
       token: 0,
       user_id:0,
       stype:0,
       mobile:null
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    var _this = this;
    if(this.mobile){$("#contact-phone").val(this.mobile);}
    if(this.name){$("#contact-username").val(this.name);}
    this.getData();
    this.iscollectCar();
    if(this.city){$(".city-location em").html(this.city);}
    $(".add-garage").off("tap").on("tap",function(){
        _this.collectCar();
    })
    this.getCarInfo();
}

Drive.prototype = {
    getData: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/agency/agencyList',{token:_this.token,id:_this.id,city:_this.city,limit:_this.limit,page:_this.page}, function (re) {
            var html="";
            if(re.code=='0001000'){
                for (var i = 0; i < re.data.length; i++) {
                    _this.htmltype = re.data[i].type==1?'4s店':(re.data[i].type==2?'3S店':(re.data[i].type==3?'综合性经销商':''));
                    _this.htmlstatus = re.data[i].status?'<em class="item-green">已认证</em>':'';
                    _this.htmlclass = re.data[i].status?(re.data[i].is_select?"to-select":"to-select"):"selected-none";
                    _this.htmli =  re.data[i].status?(re.data[i].is_select?"icon-unselected-single":"icon-unselected-single"):"icon-blank";
                    var price = re.data[i].price==0?'暂无报价':re.data[i].price/10000+'万';
                    html += '<li class="'+_this.htmlclass+'">'
                          +  '<i class="iconfont '+_this.htmli+'" _id="'+re.data[i].id+'"></i>'
                          +  '<div class="inquiry-distributor-info">'
                          +      '<div class="inquiry-main">'
                          +          '<h2>'+re.data[i].name+'</h2>'
                          +          '<em class="item-blue">'+_this.htmltype+'</em>'+_this.htmlstatus
                          +          '<p>'+re.data[i].address+'</p>'
                          +      '</div>'
                          +      '<div class="inquiry-price">'+price+'</div>'
                          +  '</div>'
                          +'</li>';
                }
                $(".inquiry-distributor-list").html(html);
                _this.choose();
                $(".selected-none").off("tap").on("tap",function(){
                    _this.agencyid = $("i",this).attr("_id");
                    _this.toNextPage();
                })
                $(".free-btn").off("tap").on("tap",function(){
                    if(!_this.hasInfo()){return;}
                    _this.agency_id="";
                    $(".to-select .icon-selected-single").each(function(){
                        _this.agency_id+=$(this).attr("_id")+",";
                    })

                    _this.agency_id=_this.agency_id.substring(0,_this.agency_id.length-1)

                    if(!_this.agency_id){popAlert("请选择经销商");}else{
                        _this.freedrive();
                    }
                });
            }
        },'json');
    },
    getCarInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/car/serie/getCarStyleInfo',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000'){
                _this.description = re.data.year+' '+re.data.name+' '+re.data.trans+' '+re.data.emissions;
                $(".intention-main").html('<div class="intention-photo">'
                    +'<img src="'+re.data.picture+'">'
                +'</div>'
                +'<div class="intention-info">'
                    +'<h2 class="title-info">'+re.data.brand_name+'</h2>'
                    +'<p class="title-secinfo">'+_this.description+'</p>'
                +'</div>');
            }
        },'json');
    },
    hasInfo: function(){
        this.name = $("#contact-username").val();
        if(!matchTest.regularList['realname'].test(this.name)){
            popAlert(matchTest.errorMsg['realname']);
            return false;
        }
        this.telephone = $("#contact-phone").val();
        if(!matchTest.regularList['mobile'].test(this.telephone)){
            popAlert(matchTest.errorMsg['mobile']);
            return false;
        }
        this.tele_code = $("#phone-code").val();
        if(!matchTest.regularList['notEmpty'].test(this.tele_code)){
            popAlert("验证码"+matchTest.errorMsg['notEmpty']);
            return false;
        }
        return true;
    },
    toNextPage:function(){
        var _this = this;
        if(!_this.hasInfo()){return;}
        var flag = 1;
        if(flag){
            flag=0;
            $.post('//'+domain.xc+'/agency/inquiry/agentsInquire',{token:_this.token,style_id:_this.id,city_id:_this.city,name:_this.name,telephone:_this.telephone,tele_code:_this.tele_code,user_id:_this.user_id,agency_id:_this.agencyid}, function (re) {
                flag=1;
                if(re.code=='0001000'){
                    if(_this.stype==1){
                        window.location = "/view/newcars/distributor.html?inject=all&orderid="+re.data.order+"&agencyid="+_this.agencyid+"&stype=1";
                    }else{
                        window.location = "bmy://app.page/dealer/detail?dealerId="+_this.agencyid+"&orderId="+re.data.order;
                    }
                }else if(re.code=='0001001'){
                    re.data.code==-2?popAlert("您今天已向该经销商询价！"):popAlert("系统繁忙！")
                }else if(re.code=='0001004'){
                    re.data.code==-1?popAlert("验证码过期"):popAlert("验证码错误或不存在")
                }
            },'json');
        }    
    },
    choose: function(){
        $(".inquiry-distributor-list li.to-select").off("tap").on("tap",function(){
            $("i",this).toggleClass("icon-selected-single");
            $("i",this).toggleClass("icon-unselected-single");
        })
    },
    freedrive: function(){
        var _this = this;
        var flag=1;
        if (flag) {
            flag = 0;
            $.post('//'+domain.xc+'/agency/inquiry/inquire',{token:_this.token,style_id:_this.id,city_id:_this.city,name:_this.name,telephone:_this.telephone,agency_id:_this.agency_id,type:_this.type,tele_code:_this.tele_code,user_id:_this.user_id}, function (re) {
                flag=1;
                if(re.code=='0001000'){
                   re.data.code==1?popSuccess(2):popAlert("没有经纪人可以询价");
                }else if(re.code=='0001001'){
                    re.data.code==-2?popAlert("您今天已向该经销商询价！"):popAlert("系统繁忙！")
                }else if(re.code=='0001004'){
                    re.data.code==-1?popAlert("验证码过期"):popAlert("验证码错误或不存在")
                }else{
                    popAlert("试驾失败");
                }
            },'json');
        }       
    },
    collectCar:function(){
        var flag = 1,_this=this;
        if(flag){
            flag=0;
            if($(".add-garage").hasClass("my-garage")){
                $.post('//'+domain.xc+'/car/car/delCar',{token:_this.token,style_id:_this.id,city:_this.city}, function (re) {
                    if(re.code=='0001000'){
                        flag=1;
                        $(".add-garage").removeClass("my-garage");
                        $(".icon-unfavorite").removeClass("icon-favorite");
                    }
                    popAlert(re.msg);
                },'json');
                return;
            }
            $.post('//'+domain.xc+'/car/car/favor',{token:_this.token,style_id:_this.id,city:_this.city}, function (re) {
                if(re.code=='0001000'){
                    flag=1;
                    $(".add-garage").addClass("my-garage");
                    $(".icon-unfavorite").addClass("icon-favorite");
                }
                popAlert(re.msg);
            },'json');
        }
    },
    iscollectCar: function(){
        var _this = this;
        $.post('//'+domain.xc+'/user/user/isSelect',{token:_this.token,style_id:_this.id}, function (re) {
            if(re.code=='0001000'&&re.data==1){
                $(".add-garage").addClass("my-garage");
                $(".icon-unfavorite").addClass("icon-favorite");
            }
        },'json');
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&stype=1&id='+this.id+'&userId='+this.user_id):(location.href+'?stype=1&id='+this.id+'&userId='+this.user_id);

        var json = {
            "title":"保满意-好车试驾", 
            "content":this.description,  
            "linkUrl":url,
            "img":""
        };

        var share = JSON.stringify(json);
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            window.webkit.messageHandlers.share.postMessage(share)
        } else if (navigator.userAgent.match(/android/i)) {
            window.bmy.share(share)
        }
    }
}


//免费试驾展示
function DriveShow(options) {
    var _default = {
       id: 0,
       type:2,
       limit:0,
       city:null,
       page:1,
       token: 0,
       user_id:0,
       stype:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    var _this = this;

    this.getCarInfo();
    this.getUserInfo();
}

DriveShow.prototype = {
    getCarInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/car/serie/getCarStyleInfo',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000'){
                _this.description = re.data.year+' '+re.data.name+' '+re.data.trans+' '+re.data.emissions;
                $(".intention-main").html('<div class="intention-photo">'
                    +'<img src="'+re.data.picture+'">'
                +'</div>'
                +'<div class="intention-info">'
                    +'<h2 class="title-info">'+re.data.brand_name+'</h2>'
                    +'<p class="title-secinfo">'+_this.description+'</p>'
                +'</div>');
            }
        },'json');
    },
    getUserInfo: function(){
        var _this = this;
        $.post('//'+domain.xc+'/agency/Inquiry/getUserInfo',{token:_this.token,id:_this.orderid,type:1}, function (re) {
            if(re.code=='0001000'){
                $("#contact-username").html(re.data.name);
                $("#contact-phone").html(re.data.telephone);
                $(".city-location em").html(re.data.city);
                var html = "";
                for (var i = 0; i < re.data.agency_list.length; i++) {
                   _this.htmltype = re.data.agency_list[i].type==1?'4s店':(re.data.agency_list[i].type==2?'3S店':(re.data.agency_list[i].type==3?'综合性经销商':''));
                    _this.htmlstatus = re.data.agency_list[i].status?'<em class="item-green">已认证</em>':'';
                    var price = re.data.agency_list[i].price==0?'暂无报价':re.data.agency_list[i].price/10000+'万';
                    html += '<li>'
                          +  '<i class="icon-selected"></i>'
                          +  '<div class="inquiry-distributor-info">'
                          +      '<div class="inquiry-main">'
                          +          '<h2>'+re.data.agency_list[i].name+'</h2>'
                          +          '<em class="item-blue">'+_this.htmltype+'</em>'+_this.htmlstatus
                          +          '<p>'+re.data.agency_list[i].address+'</p>'
                          +      '</div>'
                          +      '<div class="inquiry-price">'+price+'</div>'
                          +  '</div>'
                          +'</li>';
                }
                $(".inquiry-distributor-list").html(html);
            }
        },'json');
    }
}

