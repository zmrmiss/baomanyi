//需求对接页
function Demand(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Demand.prototype = {
    initloginSuccess:function (json) {
        this.userId = json.userId;
        this.token = json.token;
    },
    init: function() {
        this.dom();
    },
    service:function (id) {
        var _this = this;
        $.post('//'+domain.xq+'/service/services/serviceInfo/',{token:_this.token,id:id,servicer_id:_this.servicer_id,lat:_this.lat,lon:_this.lon}, function (re) {

            var damacha= $("#damacha").html();
            re = $.parseJSON(re);
            var template = Handlebars.compile(damacha);
            var conlists=re.data;
            var result = template(conlists);
            $("#damachacon").html(result);
            $("#fw-distance").text(re.data.services.distance+'km');
            if(re.data.services.price_phone==null){
                $("#tel_money").hide();
            }
            if(re.data.services.price_offline==null){
                $("#cor_money").hide();
            }

            var strArray=re.data.services.servicetype;
            var strRAY=strArray.join('/');
            $('.dema-style').html(strRAY);
            //底部按钮
            var buttontap= $("#buttontap").html();
            var template3 = Handlebars.compile(buttontap);
            var result3 = template3(conlists);
            //判断是不是本人，0为不是本人
            if(re.data.isself==0){
                $("#btnhold").html(result3);
            }
            var yueta;
            yueta=re.data.yuyue;
            // 约TA
            $(".her-an").on("tap",function () {
                    if (_this.userId==0){
                        window.location.href ="bmy://app.page/service/aboutHer/judgeLogin";
                    }else {
                        _this.appointment();
                    }
            })

            //点赞待完善
            $(".her-fab").on("tap",function () {
                if(_this.userId==0){
                    window.location.href ="bmy://app.page/service/aboutHer/judgeLogin";
                }else {
                    $(this).unbind();
                    _this.fabulous();
                }
            });

            //是否点赞  待完善
            if (re.data.islike==1){
                $(".her-fab").children("i").addClass("icon-good-selected");
                $(".her-fab").children("div").css("color","#ff6900");
                $(".her-fab").unbind();
            }

            //约TA+评论点击判断

            if(yueta==1){
                $(".her-an").html("已约TA");
                $(".her-an").css("background",'#c9c9c9');

                $(".her-com").off("tap").on("tap",function () {
                    _this.showBox();
                })
            }else if(yueta==0){
                $(".her-an").html("约TA");
                $(".her-com").off("tap").on("tap",function () {
                    popAlert("你还没有预约，不能发表评论~")
                })
            }



            //服务评价
            var commentlink= $("#commentlink").html();
            var template4 = Handlebars.compile(commentlink);
            var result4 = template4(conlists);
            $("#comment").html(result4);
            if (re.data.comment==false||re.data.comment==undefined){
                $(".rcode-pub").hide()
            }

            //评论性别判断
            if(re.data.comment.sex!=1){
                $(".rcode-padd i.iconfont").removeClass("icon-xingbienan").addClass("icon-xingbienv")
            }
            if(re.data.comment.sex==undefined||re.data.comment.age==undefined){
                $(".rcode-padd").hide();
            }

            //播放音频
            if(re.data.services.sound==null||re.data.services.sound==undefined){
                $(".scroll-btn").hide();
            }
            var duration = $("#beep-one")[0].duration;


            setTimeout(function (){
                var myaudio=document.getElementById("beep-one");
                // console.log(parseInt(myaudio.duration));
                //音频之后调整
                // $(".scr-min #mins").text(parseInt(myaudio.duration))
            },1000);


            $(".scroll-btn").on("tap",function () {
                $("#beep-one")[0].play();
            })
            // console.log(JSON.stringify(re.data.comment.sex));
            _this.event();
        })
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.xq+'/service/services/servicerBaseInfo/',{cate_id:_this.cate_id,id:_this.id,servicer_id:_this.servicer_id,lat:_this.lat,lon:_this.lon}, function (re) {
            if(re.code=='0001000'){
                for (var i in re.data.ser_list) {
                    if (re.data.ser_list[i].id == _this.id){
                        var middle = re.data.ser_list[i];
                        re.data.ser_list[i] = re.data.ser_list[0];
                        re.data.ser_list[0] = middle;
                    }
                }

                var tpl=  $("#tpl").html();
                var template = Handlebars.compile(tpl);
                var conlist=re.data;
                _this.service(_this.id);
                $('#serveridv').attr('data-value',_this.id);

                var result = template(conlist);
                $(".content").html(result);
                $(".buttons-tab a").eq(0).addClass("active");
                //资质认证
                if (re.data.zizhi.occupation_img_thumb_url==undefined||re.data.zizhi=="false") {
                    $("#zizhi").hide();
                }

                //切换列表
                $.each(re.data.ser_list,function (index,value) {
                    $(".buttons-tab a").eq(index).on("tap",function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        _this.service(value.id);
                        $('#serveridv').attr('data-value',value.id);
                    });
                })

                //照片
                var photosc= $("#photosc").html();
                var template10 = Handlebars.compile(photosc);
                var result10 = template10(conlist);
                if(re.data.photos!=undefined){
                    $("#photos").html(result10);

                }

                //教育经历
                var eduisur= $("#eduisur").html();
                var template4 = Handlebars.compile(eduisur);
                var result4 = template4(conlist);
                if (re.data.edu!=false) {
                    $("#edufor").html(result4);
                }

                //资质判断
                if(re.data.servicer.auth_phone!=0){
                    $(".authen span").eq(0).css("color","#ff6900");
                    $(".authen i.iconfont").eq(0).css("color","#ff6900")
                }else {

                }
                if(re.data.servicer.auth_idcard!=0){
                    $(".authen span").eq(1).css("color","#ff6900");
                    $(".authen i.iconfont").eq(1).css("color","#ff6900")
                }else {

                }
                if(re.data.servicer.auth_credent!=0){
                    $(".authen span").eq(2).css("color","#ff6900");
                    $(".authen i.iconfont").eq(2).css("color","#ff6900")
                }else {}

                //top性别判断
                if(re.data.servicer.sex!=1){
                    $(".dema1 i.iconfont").removeClass("icon-xingbienan").addClass("icon-xingbienv")
                }
                _this.event();
            }
        },'json');//第一个接口


    },
    event: function(){
        var _this = this;
        //显示更多评价
        $(".eval-btn").on("tap",function () {
            $(".rcote-li").hide();
            $(".eval-btn").hide();
            _this.commentlist();
        })

        //    点击图片跳转
        $("#img-tz").on("tap",function () {
            window.location.href ="bmy://app.page/service/pushAlbum";
        })
    },
    showBox: function(){
        var _this = this;
        var mask = $('.mask-layer');
        var box = $('.answer-box');
        var textarea = $("#question-con");
        // if(!_this.user_id||_this.user_id==0){
        //     _this.hideBox();
        //     popAlert("请登录后再回答吧~");
        //     return;
        // }
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
        var id=$('#serveridv').attr('data-value');
        $.post('//'+domain.xq+'/service/comment/addComment/',{token:_this.token,id:id,content:$('#question-con').val()}, function (re) {
            if(re.code=='0001000'){
                $('.mask-layer').hide();
                $('.answer-box').hide();
                // _this.getAnswerData();
            }
            popAlert(re.msg);
        },'json');
    },
    appointment: function(){
        var _this = this;
        var id=$('#serveridv').attr('data-value');
        $.post('//'+domain.xq+'/yuyue/addYuyue/',{token:_this.token,id:id,distance:_this.distance,lon:_this.lon,lat:_this.lon}, function (re) {
            if(re.code=='0001000'){
                var alertfouse= $("#alertfouse").html();
                var template6 = Handlebars.compile(alertfouse);
                var conlists=re.data;
                var result6 = template6(conlists);
                $("#alertenf").html(result6);
                $(".dema-alert").show();
                if (conlists==null){
                    $('.dema-foss').css("display","none")
                }

                $("#alertenf").on("tap",function () {
                    $("#alertenf").css("display","none")
                })


                $(".her-an").html("已约TA");
                $(".her-an").css("background",'#c9c9c9');

                yueta=1;
                if(yueta==1){
                    $(".her-com").off("tap").on("tap",function () {
                        _this.showBox();
                    })
                }
            }else{
                popAlert(re.msg)
            }

        },'json');
    },
    fabulous: function(){
        var _this = this;
        var id=$('#serveridv').attr('data-value');
        $.post('//'+domain.xq+'/service/services/addLikes/',{token:_this.token,id:id}, function (re) {
            if(re.code=='0001000'){
                $(".her-fab").children("i").addClass("icon-good-selected");
                $(".her-fab").children("div").css("color","#ff6900");
                $.extend($.fn,{
                    tipsBox: function (options) {
                        options = $.extend({
                            obj: null,  //jq对象，要在那个html标签上显示
                            str: "+1",  //字符串，要显示的内容"
                            startSize: "1.4rem",  //动画开始的文字大小
                            endSize: "1.4rem",    //动画结束的文字大小
                            interval: 800,  //动画时间间隔
                            color: "#ff6900",    //文字颜色
                            callback: function () { }    //回调函数
                        }, options);
                        $("body").append("<span class='num'>" + options.str + "</span>");
                        var box = $(".num");
                        var left = options.obj.offset().left + options.obj.width()/2 - 7;
                        var top = options.obj.offset().top-10;
                        box.css({
                            "position": "absolute",
                            "left": left + "px",
                            "top": top + "px",
                            "z-index": 9999,
                            "font-size": options.startSize,
                            "line-height": options.endSize,
                            "color": options.color
                        }).animate({
                            "font-size": options.endSize,
                            "opacity": "0",
                            "top": top - 22
                        }, options.interval, function () {
                            box.remove();
                            options.callback();
                        });
                    }
                });
                $.fn.tipsBox({
                    obj: $(".her-fab"),
                    str: "+1",
                    callback: function (){
                    }
                });
                var oldValue=parseInt($(".her-num").html());//取出现在的值，并使用parseInt转为int类型数据
                oldValue++;//自加1
                $(".her-num").html(oldValue);
            }
            if(re.code=='0005005'){
                $(".her-fab").children("i").addClass("icon-good-selected");
                $(".her-fab").children("div").css("color","#ff6900");
            }
        },'json');
    },
    commentlist: function(){
        var _this = this;
        var id=$('#serveridv').attr('data-value');
        $.post('//'+domain.xq+'/service/comment/commentList/',{token:_this.token,id:id,page:_this.page,limit:500}, function (re) {
            if(re.code=='0001000'){
                var concealre= $("#concealre").html();
                var template7 = Handlebars.compile(concealre);
                var conlists=re;
                var result7 = template7(conlists);
                $("#conceal").html(result7);

                $.each(re.data,function (index,value) {
                    //判断是否为空，为空时隐藏
                    if(value.sex==undefined){
                        $(".rcode-padd").hide();
                    }
                    //判断性别
                    if(value.sex!=1){
                        $(".rcode-padd i.iconfont").removeClass("icon-xingbienan").addClass("icon-xingbienv")
                    }
                })
                _this.event();
            }
        },'json');
    }
}


//支付宝跳转
function Jumps(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Jumps.prototype = {
    init: function() {
        this.dom();
    },
    dom: function(){
        var _this=this;
        $.post('//'+domain.xq+'/service/bill/pay',{token:_this.token,pay_methods:_this.pay_methods,type:_this.type,tvalue:_this.tvalue}, function (re) {

            if(re.code=="0001000"){
                var html='<div id="dis"></div>';
                var data=re.data;
                $("body").html(html);
                $("#dis").html(data);
            }

        },"json")
    }


}



//短信支付宝跳转
function MeJumps(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

MeJumps.prototype = {
    init: function() {
        this.dom();
    },
    dom: function(){
        var _this=this;
        $.post('//'+domain.lb+'/bill/pay',{token:_this.token,pay_methods:_this.pay_methods,type:_this.type,tvalue:_this.tvalue}, function (re) {
            if(re.code=="0001000"){
                var html='<div id="dis"></div>';
                var data=re.data;
                $("body").html(html);
                $("#dis").html(data);
            }

        },"json")
    }


}


//分割合并




//招聘详情页
function ZpXqy(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
ZpXqy.prototype = {
    init: function() {
        this.dom();

    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.zp+'/job/Detail/show/',{token:_this.token,position_id:_this.position_id,distance:_this.distance}, function (re) {
            if(re.code=='0001000') {

                var zptpl=  $("#zptpl").html();
                var template = Handlebars.compile(zptpl);
                var conlist=re.data;
                var result = template(conlist);
                $(".content").html(result);
                $("#description").append(re.data.position.description.replace(/\n/g,'<br>'));
                $("#distance").append(_this.distance);

                if(re.data.status=='-1'){
                    $(".cat-btn").on("tap",function () {
                            window.location.href ="bmy://app.page/job/applyPosition";
                    })
                }else {
                    $(".cat-btn").attr('disabled',true);
                    $(".cat-btn a").text("已申请该职位");
                    $(".Application .cat-btn").css("background","#c9c9c9")
                }


                //没有logo时
                if(re.data.company.logo==''){
                    $("#bjl").attr('src','../../public/images/images/jobo_tupianbujianle@3x.png');
                }


                //悬赏不存在时
                if(re.data.position.reward==null){
                    $("#reward").hide();
                }
                _this.event();
            }
        },'json');//第一个接口


    },
    event: function(){
        var _this = this;
        $(".mation-t").on("tap",function () {
            window.location.href ="bmy://app.page/job/companydetail";
        })
    }


}

//公司详情页
function GsXqy(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
GsXqy.prototype = {
    init: function() {
        this.dom();

    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.zp+'/job/Company/show/',{token:_this.token,company_id:_this.company_id}, function (re) {
            if(re.code=='0001000') {
                var gstpl=  $("#gstpl").html();
                var template7= Handlebars.compile(gstpl);
                var conlist=re.data;
                var result = template7(conlist);
                $(".content").html(result);

                var gsimg=  $("#gsimg").html();
                var template8= Handlebars.compile(gsimg);
                var result2 = template8(conlist);
                $("#imglb").html(result2);

                //没有logo时
                if(re.data.logo==''){
                    $("#bjl").attr('src','../../public/images/images/jobo_tupianbujianle@3x.png');
                }

                //没有轮播图时
                if(re.data.picture==null){
                    $("#imglb").hide();
                }


                _this.event();
            }
        },'json');


    },
    event: function(){
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 3000,
            autoplayDisableOnInteraction: false
        });
    }
}



//会员福利
function HyMem(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

HyMem.prototype = {
    init: function() {
        this.dom();
        this.event();
        this.isAllow();
        this.inputInfo = localStorage.getItem("InfoFl")?$.parseJSON(localStorage.getItem("InfoFl")):0;
        this.inputInfo?this.fill():"";

    },
    fill:function () {},
    dom: function(){
        var _this = this;

        //加载页面
        $.post('//'+domain.jc+'/fuli/more/detail/',{token:_this.token,fuli_id:_this.fuliId}, function (re) {
            if(re.code=='0001000') {
                var member = Handlebars.compile($("#member").html());
                var html = member(re.data);
                $('.content').html(html);
                $('#fl_exp').html(re.data.detail);
                //判断是否有缓存
                var inId=_this.inputInfo.fuliId;
                var flId=_this.fuliId;
                if(inId==flId){
                    $("#telephone").val(_this.inputInfo.phone);//手机号码
                    $("#isName").val(_this.inputInfo.name);//咨询人姓名
                }else {
                    $("#telephone").val();//手机号码
                    $("#isName").val();//咨询人姓名
                }

                //判断类型：推荐或咨询
                if(re.data.type=='1'){
                    $("#mber_exp").html('<div class="mber-groom">已推荐 <span class="groom_num">'+re.data.record+'</span> 人，立即推荐拿丰厚奖金！</div>')
                    $('#btn').text('立即推荐');
                    $("#btn").on('touchend',function (event) {
                        event.preventDefault();
                        _this.test();
                        if(_this.test()){
                            // _this.ytelphone();//等会
                            if(_this.userId==0){
                                //是否登录弹框显示
                                $("#go_login").show();
                            //    后续事件

                            }else {
                                _this.ytelphone();
                            }
                        }
                    })

                }else if(re.data.type=='2'){
                    //咨询开始
                    $("#mber_exp").html('<div class="mber-groom">已有 <span class="groom_num">'+re.data.record+'</span> 人参与，实惠福利等你咨询！</div>')
                    $('#btn').text('立即咨询');
                    $("#btn").on("touchend",function (event) {
                        event.preventDefault();
                        _this.test();
                        if(_this.test()){
                            _this.ytelphoneYz();
                        }

                    })

                }
                $('b').css('font-weight',700);
            }

            _this.event();
        },'json');
    },
    event: function(){
        var _this=this;
        $("#telephone").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#isName").on('input propertychange', function() {
            _this.isAllow();
        });


        //    去登录
        $("#login_btn").on("touchend",function () {
            var record ={
                name:$("#isName").val(),//咨询人姓名
                phone:$("#telephone").val(),//手机号码
                fuliId:_this.fuliId,//福利id
                token:_this.token,//token
                userId:_this.userId,//推荐人的id
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoFl", value);
            $("#go_login").hide();

            window.location.href='bmy://app.page/memberShip/jumpLogin';
        });

        //    直接推荐
        $("#tj_btn").on("touchend",function () {
            $("#go_login").hide();
            //验证手机号
            _this.ytelphone();
        })

        $("#go_login").on("touchend",function () {
            $("#go_login").hide();
        })

    },
    isAllow: function(){
        this.mobile = $("#telephone").val();
        this.username = $("#isName").val();
    },
    test: function(){
        var values = [
            {
                name:"username",
                val:$("#isName").val(),
                msg:matchTest.errorMsg.username
            },
            {
                name:"mobile",
                val:$("#telephone").val(),
                msg:matchTest.errorMsg.mobile
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);

        // var _this=this;// if(!_this.isName(this.username)||$("#username").val()==''){//     popAlert(matchTest.errorMsg.username);//     return false;// }// if(!_this.isMobileNum(this.mobile)||$("#isName").val()==''){//     popAlert(matchTest.errorMsg.mobile);//     return false;// }// // return _this.ytelphone();// return true;
    },
    //验证手机号
    ytelphone:function () {
        var _this = this;

        $.post('//'+domain.jc+'/fuli/user/isRepeat/',{token:_this.token,fuli_id:_this.fuliId,telephone:$("#telephone").val()}, function (re) {

            if(re.code=='0001000') {
                if(re.data=='0'){
                    popAlert('该手机号已被推荐，请输入其他号码')
                }else if(re.data=='1'){
                    _this.submitTj();
                }
            }else {
                popAlert(re.msg);
            }
        },'json');
    },

    //咨询时手机号验证
    ytelphoneYz:function () {
        var _this = this;

        $.post('//'+domain.jc+'/fuli/user/isRepeat/',{token:_this.token,fuli_id:_this.fuliId,telephone:$("#telephone").val()}, function (re) {

            if(re.code=='0001000') {
                if(re.data=='0'){
                    popAlert('该手机号已咨询，请输入其他号码')
                }else if(re.data=='1'){
                    _this.submit();
                }
            }else {
                popAlert(re.msg);
            }
        },'json');
    },
    submit:function () {
        // 提交数据
        var _this = this;
        $.post('//'+domain.jc+'/fuli/user/info/',{token:_this.token,fuli_id:_this.fuliId,telephone:$("#telephone").val(),name:$("#isName").val()}, function (re) {
            if(re.code=='0001000') {
                $("#mber-titsl").text('客服人员稍后将与您联系');
                $("#mber-show").show();
                $("#mber-clo").on("touchend",function () {
                    $("#mber-show").hide();
                })
            }else {
                popAlert(re.msg)
            }
        },'json');
    },
    submitTj:function () {
        // 推荐提交数据
        var _this = this;
        $.post('//'+domain.jc+'/fuli/user/info/',{token:_this.token,fuli_id:_this.fuliId,telephone:$("#telephone").val(),name:$("#isName").val()}, function (re) {
            if(re.code=='0001000') {
                $("#mber-titsl").text('稍后工作人员将联系您推荐的人');
                $("#mber-show").show();
                $("#mber-clo").on("touchend",function () {
                    $("#mber-show").hide();
                })
                localStorage.clear();
            }else {
                popAlert(re.msg)
            }
        },'json');
    }
}


//我的会员福利
function HyMine(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

HyMine.prototype = {
    init: function() {
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.jc+'/fuli/user/detail/',{token:_this.token,fuli_id:_this.fuliId,limit:500}, function (re) {
            if(re.code=='0001000') {
                var mine = Handlebars.compile($("#mine").html());
                var html = mine(re.data);
                $('.content').html(html);
                $('b').css('font-weight',700);

            }else {
                popAlert(re.msg)
            }
        },'json');
    }

}




//积分商城
function JfInt(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    // this.dom();

    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

JfInt.prototype = {
    init: function() {
        var _this=this;
        _this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sc+'/goods/goodsInfo/',{token:_this.token,id:_this.id,ht:_this.ht}, function (re) {
            if(re.code=='0001000') {
                var text=  $("#text").html();
                var template2= Handlebars.compile(text);
                var result2 = template2();
                $("#forbtn").html(result2);


                _this.title=re.data.name;
                _this.img=re.data.picture[0];
                $("#jf-num").text(re.data.buy_scores);
                var shopping=  $("#shopping").html();
                var template= Handlebars.compile(shopping);
                var conlist=re.data;
                var result = template(conlist);
                $(".content").html(result);

                var jfimg=  $("#jfimg").html();
                var template= Handlebars.compile(jfimg);
                var result2 = template(conlist);
                $("#cn_img").html(result2);


                var stwidth=$(".swiper-slide").width();
                $(".swiper-container").css('height',stwidth);


                //判断限时次数
                if(re.data.num_limit==null){
                    $("#purchase").hide();
                }

                //判断限时时间
                if(re.data.start==null){
                    $("#pur_time").hide();
                }

                //判断是否限时
                if(re.data.status_time=='0'){
                    $("#pur_time").hide();
                    $("#purchase").hide();
                };

                if(conlist.picture.length==1){
                    $("#Img_height").html('<img src='+conlist.picture+' alt=""><div class="jf-yiny"></div>')
                }else if(conlist.picture.length>1){
                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false,
                        loop:true
                    });
                }

                _this.addressxp();
                _this.event();

                //判断按钮显示
                if(re.data.can_buy==0){
                    $(".intsure_btn").css('background-color','#c9c9c9');
                    $(".intsure_btn").html('积分不足');
                    $("#intsure_btn").unbind();
                }

                var url = window.location.href.match(/type=.([^&]*)/);

                if(url&&url[0].substr(5)==4){
                    $(".int-change").show();
                    $(".btn-insure").hide();
                    var referrer_id = window.location.href.match(/referrer_id=.([^&]*)/)[0].substr(12);
                    var title = window.location.href.match(/title=.([^&]*)/)[0].substr(6);
                    $('title').html(decodeURI(title));
                    // var id = window.location.href.match(/id=.([^&]*)/)[0].substr(3);
                    $(".insure_btn").on("tap",function(){
                        window.location.href = "/view/share/reg.html?inject=all&referrer_id="+referrer_id;
                    });
                }

                $('b').css('font-weight',700);
            }
        },'json');
    },
    addressxp: function () {
        var _this=this;
        $.post('//'+domain.jc+'/user/address/getlist/',{token:_this.token}, function (re) {

            if(re.code=='0001000') {
                for (var i in re.data) {

                    if (re.data[i].is_default ==1){
                        $("#linkman").val(re.data[i].username);
                        $("#telephone").val(re.data[i].telphone);
                        $("#city-type").val(re.data[i].province+' '+re.data[i].city+' '+re.data[i].area);
                        $("#address").val(re.data[i].address);
                    }else  {
                        $("#linkman").val(re.data[0].username);
                        $("#telephone").val(re.data[0].telphone);
                        $("#city-type").val(re.data[0].province+' '+re.data[0].city+' '+re.data[0].area);
                        $("#address").val(re.data[0].address);
                    }
                }

            }
        },'json');
    },
    event: function(){
        var _this=this;
        $("#linkman").on('input propertychange', function() {
            _this.getdata();
        });
        $("#telephone").on('input propertychange', function() {
            _this.getdata();
        });
        $("#city-type").on('input propertychange', function() {
            _this.getdata();
        });
        $("#add_exp").on('input propertychange', function() {
            _this.getdata();
        });


        $(".icon-close1").on('tap',function () {
            $(".int-alert").hide();
        })
        
        $("#city-type").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>'
        });

        //点击显示收货地址
        $("#intsure_btn").on("touchend",function () {
            _this.getdata();
            _this.checked();

        })

        //点击兑换
        $("#exc_btn").off('touchend').on('touchend',function () {
            _this.test();
            //验证通过执行的任务
            if(_this.test()){
                var addr = $("#city-type").val().split(" ");
                _this.province = addr[0];
                _this.city = addr[1];
                _this.county = addr[2];

                _this.exchange();
            }
        })
    },
    exchange: function () {
        var _this=this;
        var exp={
            token:_this.token,
            id:_this.id,
            username:$("#linkman").val(),
            telphone:$("#telephone").val(),
            province:_this.province,
            city:_this.city,
            area:_this.county,
            address:$("#address").val()
        };
        $.post('//'+domain.sc+'/goods/goodsBuy/',exp, function (re) {

            if(re.code=='0001000') {
                var integral=$('#jf-num').html();
                $(".int-alert").hide();
                if(re.data.remain_score<integral){
                    $(".intsure_btn").css('background-color','#c9c9c9');
                    $(".intsure_btn").html('积分不足');
                    $("#intsure_btn").unbind();
                }
                window.location.href="bmy://app.page/scoreMall/exchange?integral="+integral+"&score="+re.data.remain_score;
            }else {
                popAlert(re.msg)
            }
        },'json');
    },
    getdata : function () {
        this.linkman=$("#linkman").val();
        this.telephone=$("#telephone").val();
        this.citytype=$("#city-type").val();
        this.addexp=$("#address").val();
    },
    test : function () {
        var values = [
            {
                name:"username",
                val:$("#linkman").val(),
                msg:'请填写联系人'
            },
            {
                name:"notEmpty",
                val:$("#telephone").val(),
                msg:'请填写联系方式'
            },
            {
                name:"telmobile",
                val:$("#telephone").val(),
                msg:'联系方式格式不正确'
            },
            {
                name:"notEmpty",
                val:$("#city-type").val(),
                msg:'请选择地区'
            },
            {
                name:"notEmpty",
                val:$("#address").val(),
                msg:'请输入收件地址'
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    checked: function () {
        var _this=this;
        $.post('//'+domain.sc+'/goods/goodsBuyBefore/',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000') {
                $('.int-alert').show();
            }else {
                popAlert(re.msg)
            }
        },'json');
    },
    sharepage: function(){
        var _this = this;
        $.post('//'+domain.sc+'/goods/goodsInfo/',{token:_this.token,id:_this.id}, function (re) {
            if(re.code=='0001000') {
                _this.name = re.data.name;
                _this.picture = re.data.picture[0];
                _this.getUser();
            }
        },'json');
    },
    getUser : function () {
        var _this=this;
        $.post('//'+domain.jc+'/user/user/userinfo',{token:_this.token}, function (re) {
            if(re.code=='0001000') {
                var referrer_id=re.data.encrypt_uid;
                var url = window.location.href.match(/html\?/);
                url = (url[0]=='html?')?(location.href+'&type=4&Id='+_this.id+'&referrer_id='+referrer_id+'&title='+encodeURI(_this.name)):(location.href+'?type=1&Id='+_this.id+'&referrer_id='+referrer_id+'&title='+encodeURI(_this.name));

                ShareFun(_this.name,"仅需一步，就能攒积分免费换！快来参与吧",url,_this.picture,4);
            }
        },'json');


    }
}




//流量充值
function Flow(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    // this.dom();

    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    // this.getdata();
}

Flow.prototype = {
    init: function() {
        this.dom();
        this.inputInfo = localStorage.getItem("InfoLlb")?$.parseJSON(localStorage.getItem("InfoLlb")):0;
        this.inputInfo?this.fill():"";
    },
    fill:function () {

    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.jc+'/fuli/DataPlan/packages/',{token:_this.token}, function (re) {
            var liuliang = Handlebars.compile($("#liuliang").html());
            var html = liuliang();
            $('#content').html(html);

            _this.liulist();
            _this.event();
            _this.checked();

            if(_this.inputInfo.phone!=undefined){
                $("#telephone").val(_this.inputInfo.phone);
                _this.checkedtel();
            }
        },'json');
    },
    event: function(){
        var _this=this;
        $("#telephone").on('input propertychange', function(e) {
            _this.getdata();
            _this.checked();
        });

        //清除文本框
        $('#flow-clear').on("touchend",function () {
            _this.type=undefined;
            _this.liulist();
            $('.flow-exp').unbind().removeClass('flow-border').removeClass('current');
            $("#telephone").val('');
            $('.flow-cp').hide();
            $('.flow-flux').removeClass('flow-FF6900');
            $('.flow-qian').removeClass('flow-575757');
            $('.flow-add').hide();
            //选择流量
            $('.lb-bd').unbind().css('color','#a5a5a5');
            $('.lb-change').css('border-color','#c9c9c9');
            $('.lb-change .current').css({'background-color':'#c9c9c9','color':'#fff'});
        })








    },
    getdata : function () {
        // var value=$("#telephone").val().replace(/[^\d\s]/g,'');//匹配数字
        // this.telephone=value.replace(/(^\s*)(\s*$)/g,'');//去除前后空格
        this.telephone=$("#telephone").val().replace(/(^\s*)(\s*$)/g,'');//去除前后空格
        // this.telephone=$("#telephone").val().replace(/[^\d\s]/g,'');
        // this.type=this.type;
    },
    test : function () {
        var values = [
            {
                name:"mobile",
                val:$("#telephone").val().replace(/\s/g,''),
                msg:'联系方式格式不正确'
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    checked: function () {
        var _this=this;
        if(matchTest.regularList["mobile"].test($("#telephone").val().replace(/\s/g,''))){
            _this.checkedtel();
        }else {
            $('.flow-exp').unbind().removeClass('flow-border').removeClass('current');
            $('.flow-flux').removeClass('flow-FF6900');
            $('.flow-qian').removeClass('flow-575757');
            $('.flow-add').hide();
            //选择流量
            $('.lb-bd').unbind().css('color','#a5a5a5');
            $('.lb-change').css('border-color','#c9c9c9');
            $('.lb-change .current').css({'background-color':'#c9c9c9','color':'#fff'});
        }
        if($("#telephone").val()!=''){
            $('.flow-cp').show();
        }else {
            $('.flow-cp').hide();
            $('.flow-add').hide();
        }
    },
    change: function () {
        var _this=this;
        _this.datatype=1;

        $('.flow-exp').addClass('flow-border');
        $('.flow-flux').addClass('flow-FF6900');
        $('.lb-change').css('border-color','#ff6900');
        $('.lb-bd').css('color','#ff6900');
        $('.lb-change .current').css({'background-color':'#ff6900','color':'#fff'});
        $('.flow-qian').addClass('flow-575757');
        $('.lb-bd').each(function (index,value) {
                $('.lb-bd').eq(index).on("touchend",function () {
                    $(this).addClass('current').css({'background-color':'#ff6900','color':'#fff'}).siblings().removeClass("current").css({'background-color':'#fff','color':'#ff6900'});
                    $(".flow-list").eq(index).addClass("active").siblings().removeClass("active");
                    if(index==0){
                        _this.datatype=1;
                        $('#selty').html('全国');
                        var html='<div style="text-align: center;color: #808080">暂无全国流量包</div>'
                        if($('#qg_list').html()==html){
                            $('#flow-none').hide();
                        }else {
                            $('#flow-none').show();
                        }
                    }else if(index==1){
                        _this.datatype=2;
                        $('#selty').html('省内');
                        var html='<div style="text-align: center;color: #808080">暂无省内流量包</div>' ;
                        if($('#sn_list').html()==html){
                            $('#flow-none').hide();
                        }else {
                            $('#flow-none').show();
                        }
                    }
                })
            }
        )
        $('.flow-exp').each(function (index,value) {
                $('.flow-exp').eq(index).on("touchend",function () {
                    $(this).addClass("current").siblings().removeClass("current");
                    _this.data =$(this).attr("data-value");
                    je=$('.flow-qian').eq(index).html();
                    _this.llm=$('.flow-flux').eq(index).html();
                    _this.money=je.substring(0,je.length-1);
                    var tel=$('#telephone').val().replace(/\s/g,'');
                    var record ={
                        phone:$('#telephone').val(),//手机号码
                        stoken:_this.token//token
                    };
                    var value = value||[];
                    value = JSON.stringify(record);
                    localStorage.setItem("InfoLlb", value);
                    window.location.href='/view/flow/flow_insure.html?tap='+1+'&money='+_this.money+'&llm='+_this.llm+'&tel='+tel+'&carrier='+_this.type+'&province='+_this.province+'&data='+_this.data+'&datatype='+_this.datatype;
                })
            }
        )

        if($("#telephone").val()!=''){

            $('.flow-cp').show();
        }else {

            $('.flow-cp').hide();
            $('.flow-add').hide();
        }
    },
    checkedtel:function () {
        var _this=this;
        var html='<div style="text-align: center;color: #808080">正在获取流量数据,请稍等...</div>';
        $("#qg_list").html(html);

        var tel=$('#telephone').val().replace(/\s/g,'');
        $.post('//'+domain.jc+'/fuli/user/telephoneLocation/',{token:_this.token,tel:tel}, function (re) {
            if(re.code=='0001000') {
                $('.flow-add').show();
                $('#attribution').html(re.data.carrier);
                var catName=re.data.catName.substr(2);

                if(catName=='移动'){
                    _this.type=1;
                    _this.province=re.data.carrier;
                    _this.liulist();
                }else if(catName=='联通'){
                    _this.type=2;
                    _this.province=re.data.carrier;
                    _this.liulist();
                }else if(catName=='电信'){
                    _this.type=3;
                    _this.province=re.data.carrier;
                    _this.liulist();
                }
            }else {
                popAlert(re.msg);
            }
        },'json');
    },
    liulist : function () {
        var _this=this;
        var type=_this.type;
        $.post('//'+domain.jc+'/fuli/DataPlan/packages/',{token:_this.token}, function (re) {
            var qg=re.data.qg;
            var sn=re.data.sn;


            var result='';
            var result2='';
            var urlqg=[];
            var urlsn=[];

            if(re.code=='0001000') {
                var html='<div style="text-align: center;color: #808080">正在获取流量数据,请稍等...</div>';
                $("#qg_list").html(html);

                var llblistqg=  $("#llblistqg").html();
                var template= Handlebars.compile(llblistqg);
                var llblistsn=  $("#llblistsn").html();
                var template2= Handlebars.compile(llblistsn);


                if(type!=undefined){
                    for (var i in qg) {
                        if(qg!=''){
                            if (qg[i].Type ==type){
                                var middle = qg[i];
                                urlqg.push(middle);
                            }
                        }

                        if(sn!=''){
                            if (sn[i].Type ==type){
                                var middlesn = sn[i];
                                urlsn.push(middlesn);
                            }
                        };

                    }

                    var conlist=urlqg;
                    result = template(conlist);
                    if(conlist==''){
                        var html='<div style="text-align: center;color: #808080">暂无全国流量包</div>'
                        $("#qg_list").html(html);
                        $('#flow-none').hide();
                    }else {
                        $('#qg_list').html(result);
                    }



                    var conlist2=urlsn;
                    result2 = template2(conlist2);
                    if(conlist2==''){
                        var html='<div style="text-align: center;color: #808080">暂无省内流量包</div>'
                        $("#sn_list").html(html);
                    }else {
                        $('.lb-bd').eq(1).addClass('current').css({'background-color':'#ff6900','color':'#fff'}).siblings().removeClass("current").css({'background-color':'#fff','color':'#ff6900'});
                        $(".flow-list").eq(1).addClass("active").siblings().removeClass("active");
                        $("#sn_list").html(result2);
                        $('#selty').html('省内');


                    }
                    _this.change();

                }else {
                    var conlist=qg;
                    var conlist2=sn;
                    var result = template(conlist);

                    if(qg!=''){
                        $("#qg_list").html(result);
                    }else {
                        var html='<div style="text-align: center;color: #808080">暂无全国流量包</div>';
                        $("#qg_list").html(html);
                    }

                    var result2 = template2(conlist2);
                    if(sn!=''){
                        $("#sn_list").html(result2);
                    }else {
                        var html='<div style="text-align: center;color: #808080">暂无省内流量包</div>';
                        $("#sn_list").html(html);
                    }
                }

                if(qg==''){
                    popAlert('暂无可选流量包')
                }

            }else {
                popAlert(re.msg);
            }
        },'json');
    }
}


//确认支付
function CzYm(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    // this.dom();

    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

CzYm.prototype = {
    init: function() {
        this.dom();
        this.inputInfo = localStorage.getItem("InfoLlb")?$.parseJSON(localStorage.getItem("InfoLlb")):0;
        this.inputInfo?this.fill():"";
    },
    fill : function () {

    },
    dom: function(){
        var _this = this;
        $(function () {
            // var sure={money:_this.money,tel:_this.tel,carrier:_this.carrier,province:_this.province,data:_this.data,datatype:_this.datatype,llm:_this.llm};
            var sure={money:money,tel:tel,carrier:carrier,province:province,data:data,datatype:datatype,llm:llm};
            Handlebars.registerHelper("carrier", function(carrier) {
                if(carrier==1){
                    return '../../public/images/images/nana_yidong.png'
                }else if (carrier==2){
                    return '../../public/images/images/nana_liantong.png'
                }else if (carrier==3){
                    return '../../public/images/images/nana_dianxin.png'
                }
            });
            Handlebars.registerHelper("datatype", function(datatype) {
                if(datatype==1){
                    return '全国'
                }else if (datatype==2){
                    return '省内'
                }
            });
            var insure=  $("#insure").html();
            var template= Handlebars.compile(insure);
            var result = template(sure);
            $(".content").html(result);

            //返回上一级
            $("#iconleft").on('touchend',function () {
                window.location.href='/view/flow/flow_detail.html?type='+1;
            })


            $("#to_bill").on('touchend',function () {
                window.location.href ='bmy://app.page/flow/lookBillLogin';
            })
            $(".xzbtn").on('touchend',function () {
                $(".xzbtn").toggleClass('icon-selected-single').toggleClass('icon-success').toggleClass('di-color')
            })

            $('.suer_btn').on('touchend',function () {
                if($('.xzbtn').hasClass('icon-selected-single')){
                    window.location.href ='bmy://app.page/flow/judgeLogin?parameterList=money='+_this.money+'||llm='+_this.llm+'||tel='+_this.tel+'||carrier='+_this.carrier+'||province='+_this.province+'||data='+_this.data+'||datatype='+_this.datatype+'||type='+1;
                }else {
                    popAlert('请选择支付方式')
                }
            })
            //<!--支付方式二选一时用的方法-->
//    $(".xzbtn").each(function (index,value) {
////        var value=$(this).attr("value");
//        $(".xzbtn").eq(index).click(function () {
//            $(this).removeClass('icon-success').addClass('icon-selected-single').css('color',"#c2844d").siblings().removeClass("icon-selected-single").addClass('icon-success').css('color',"#aaa");
//        })
//
//    })
        })
    }
}


//流量支付宝跳转
function FjumPs(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

FjumPs.prototype = {
    init: function() {
        this.dom();
    },
    dom: function(){
        var _this=this;
        if(_this.type=='1'){
            $.post('//'+domain.jc+'/fuli/DataPlan/buy/',{token:_this.token,carrier:_this.carrier,pay_type:1,telephone :_this.telephone,province :_this.province,data_type:_this.data_type , data :_this.data}, function (re) {
                if(re.code=='0001000') {
                    var html='<div id="dis"></div>';
                    var data=re.data;
                    $("body").html(html);
                    $("#dis").html(data);
                }
            },'json');
        } else if(_this.type=='2'){
            var v={
                token:_this.token,
                id:_this.id,
                pay_type:1
            };
            $.post('//'+domain.jc+'/fuli/DataPlan/pay/',v, function (re) {
                if(re.code=='0001000') {
                    $('body').html(re.data);
                }else {
                    popAlert(re.msg);
                }
            },'json');
        }

    }


}


//账单
function BiLl(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    // this.dom();

    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

BiLl.prototype = {
    init: function() {
        var _this=this;
        _this.dom();
    },
    fill : function () {

    },
    dom: function(){
        var _this = this;
        var v={token:_this.token};
        $.post('//'+domain.jc+'/fuli/DataPlan/history/',v, function (re) {
            Handlebars.registerHelper("create", function(create_time) {
                var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                var dateStr = create_time;
                var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
                return weekDay[myDate.getDay()];
            });
            Handlebars.registerHelper("create_time", function(create_time) {
                return create_time.substr(5,5);
            });
            Handlebars.registerHelper("type", function(type) {
                if(type==1){
                    return '全国'
                }else if (type==2){
                    return '省内'
                }
            });
            Handlebars.registerHelper("province", function(province) {
                if(province.substr(2)=='移动'){
                    return '../../public/images/images/nana_yidong.png';

                }else if (province.substr(2)=='联通'){
                    return '../../public/images/images/nana_liantong.png'
                }else if (province.substr(2)=='电信'){
                    return '../../public/images/images/nana_dianxin.png'
                }
            });

            Handlebars.registerHelper("status", function(status) {
                if(status=='0'){
                    return 0;

                }else if (status=='-1'){
                    return -1;

                }else if (status=='1'){
                    return 1;

                }else if (status=='2'){
                    return 2;

                }
            });

            Handlebars.registerHelper("package", function(package) {
                if(package=='1000'||package=='1024'){
                    return '1G';

                }else if (package=='2000'||package=='2048'){
                    return '2G'
                }else if (package=='3000'||package=='3072'){
                    return '3G'
                } if (package=='4000'||package=='4069'){
                    return '4G'
                }else {
                    return package+'M';
                }
            });
                var bill=  $("#bill").html();
                var template = Handlebars.compile(bill);
                var result = template(re.data);
                $(".content").html(result);


            $('.zd-list').each(function (index,value) {
                $('.zd-list').eq(index).on('tap',function () {
                    //id
                    _this.id = $(this).attr("data-value");

                    window.location.href='/view/flow/flow_bidet.html?tap='+1+'&id='+_this.id;
                })
            })

            if(re.data==''){
                $('.content').html('<div style="text-align: center;padding-top: 50%;font-size: 1.8rem;color: #a39999;">暂无充值记录</div>')
            }

                _this.event();

        },'json');


    },
    event: function(){
        var _this=this;
        $('.status').each(function (index) {
           var s=$('.status').eq(index).html();
            if(s==0){
                $(".zd-tj").eq(index).css('color','#ff6900');
                $(".zd-tj").eq(index).html('等待付款');
            }
            if(s==-1){
                $(".zd-tj").eq(index).html('订单失效');
            }
            if(s==1){
                $(".zd-tj").eq(index).html('交易成功');
            }
            if(s==2){
                $(".zd-tj").eq(index).html('退款成功');
            }
        })
        $("#iconleft").on('touchend',function () {
            window.location.href='bmy://app.page/pageReturn';
        })

    }
}


//账单详情
function BiDet(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    // this.dom();

    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

BiDet.prototype = {
    init: function() {
        this.dom();
    },
    fill : function () {},
    dom: function(){
        var _this = this;
        _this.inputInfo = localStorage.getItem("InfoLlb")?$.parseJSON(localStorage.getItem("InfoLlb")):0;
        _this.inputInfo?this.fill():"";
        $.post('//'+domain.jc+'/fuli/DataPlan/orderInfo/',{token:_this.inputInfo.stoken,id:_this.id}, function (re) {
            if(re.code=='0001000') {
                Handlebars.registerHelper("province", function(province) {
                    if(province.substr(2)=='移动'){
                        return '../../public/images/images/nana_yidong.png'
                    }else if (province.substr(2)=='联通'){
                        return '../../public/images/images/nana_liantong.png'
                    }else if (province.substr(2)=='电信'){
                        return '../../public/images/images/nana_dianxin.png'
                    }
                });

                Handlebars.registerHelper("package", function(package) {
                    if(package=='1000'||package=='1024'){
                        return '1G';
                    }else if (package=='2000'||package=='2048'){
                        return '2G';
                    }else if (package=='3000'||package=='3072'){
                        return '3G';
                    }else if (package=='4000'||package=='4096'){
                        return '4G';
                    }else {
                        return package+'M';
                    }
                });
                Handlebars.registerHelper("type", function(type) {
                    if(type==1){
                        return '全国流量'
                    }else if (type==2){
                        return '省内流量'
                    }
                });

                Handlebars.registerHelper("api_status", function(api_status) {
                    var api=api_status;
                    if(api==0){
                        return '受理中'
                    }else if (api==1){
                        return '流量充值成功'
                    }else if (api=='-1'){
                        return '流量充值失败'
                    }else if (api==null){
                        return ''
                    }
                });
                var bidet=  $("#bidet").html();
                var template= Handlebars.compile(bidet);
                var result = template(re.data);
                $(".content").html(result);

                //判断交易状态
                if(re.data.status=='0'){
                    $(".zd-success").html('等待付款');
                    $(".zd-success").css('color','#ff6900');
                    $('.jy-zf').css('display','block');
                    $('.suer_btn').css('display','block');
                    $('#LlCzzt').hide();
                }else if(re.data.status=='-1'){
                    $(".zd-success").html('订单失效');
                }else if(re.data.status=='1'){
                    $(".zd-success").html('交易成功');
                }else if(re.data.status=='2'){
                    $(".zd-success").html('退款成功');
                }
                $('.province').html(re.data.province);

                $("#iconleft").on('touchend',function () {
                    // window.history.go(-1);
                    window.location.href='/view/flow/flow_bill.html?type='+2;
                })

                $(".xzbtn").on('touchend',function () {
                    $(".xzbtn").toggleClass('icon-selected-single').toggleClass('icon-success').toggleClass('di-color')
                })

                $('.suer_btn').on('touchend',function () {
                    if($('.xzbtn').hasClass('icon-selected-single')){
                        // _this.submit();


                        window.location.href ='bmy://app.page/flow/judgeLogin?parameterList=id='+_this.id+'||type='+2
                    }else {
                        popAlert('请选择支付方式')
                    }
                })
            }else {
                popAlert(re.msg);
            }
        },'json');
    }

}




//微信审核页
function Auditd(options){
    var _default = {
        token: 0,
        share:false,
        entryID:0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Auditd.prototype = {
    init: function() {
        var _this=this;
        _this.dom();
        _this.event();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.lb+'/template/getlbtemplate/',{id:_this.id}, function (re) {
            if(re.code=='0001002'){
                $('body').html('<div style="text-align: center;border-top: 1px solid #fff;margin-top: 50px">提示</div><div class="audit-block" style="line-height: 2.4rem;padding:0 1.6rem;margin: 0 auto "> <div id="audit_none" style="background-color: #f7f7f7;color: #808080;width:14rem;">审核已完成，已执行过操作</div> </div>');
            }

            if(re.code=='0001004'){
                $('body').html('<div style="text-align: center;border-top: 1px solid #fff;margin-top: 50px">提示</div><div class="audit-block" style="line-height: 2.4rem;padding:0 1.6rem;margin: 0 auto "> <div id="audit_none" style="background-color: #f7f7f7;color: #808080;width:14rem;">审核已完成，已执行过操作</div> </div>');
            }


            if(re.code=='0001000'){
                console.log(re.data.user_id);//user_id
                _this.user_id=re.data.user_id;
                $('#audit_id').html(re.data.id);
                $('#audit_time').html(re.data.datetime);
                $('#audit_detail').html(re.data.content_template);
                $('#audit_ip').html(re.data.verifier_ip);
                $('#audit_addres').html(re.data.verifier_ip_address);
                $('#audit_name').html(re.data.real_name);
                $('#img').attr('src',re.data.avator);
            }


        },'json');//第一个接口
    },
    event: function(){
        var _this = this;
        //审核通过选项
        var catg=[];
        $.post('//'+domain.lb+'/template/getChgroup/',{}, function (re) {
            _this.data=re.data;
            $.each(re.data,function (index,value) {
                // console.log(value.name);
                catg.push(value.name)
            })
        },'json');
        $("#insured-col").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right audclose_btn close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <button class="button button-link pull-left close-picker">取消</button>\
            \
            </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: catg,
                    cssClass: 'picker-items-col-normal'
                }
            ],
            onOpen : function () {
                $('.audclose_btn').on('tap',function () {
                    var atts= $('#insured-col').val();
                        _this.onTap(atts);
                })
            }
        });

        //    审核驳回回复
        $('#shoubox').on('tap',function () {
            _this.showBox()
        })


    },
    onTap : function (atts) {
        var _this=this;
       for(var k in _this.data){
           if (_this.data[k].name==atts){
               _this.g_id=_this.data[k].id;
               _this.answer();
           }
       }
    },
    showBox: function(){
        var _this = this;
        var mask = $('.mask-layer');
        var box = $('.answer-box');
        var textarea = $("#question-con");
        // if(!_this.user_id||_this.user_id==0){
        //     _this.hideBox();
        //     popAlert("请登录后再回答吧~");
        //     return;
        // }
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
                _this.reason=$('#question-con').val();
                mask.hide();
                box.hide();
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
        // if(_this.g_id==undefined){
        //     $('#de_resultbh').show();
        //     $('#audit_btns').hide();
        // }
        // if(_this.reason==undefined){
        //     $('#de_result').show();
        //     $('#audit_btns').hide();
        // }
        var v={
            id:_this.id,
            user_id:_this.user_id,
            g_id:_this.g_id,
            reason:_this.reason
        }
        console.log(v)

        $.post('//'+domain.lb+'/template/review/',v, function (re) {
            if(re.code=='0001000'){
                $('#audit_btns').html('<div style="text-align: center;border-top: 1px solid #f7f7f7;">操作成功</div><div class="audit-block" style="line-height: 2.4rem;padding:0 1.6rem;margin: 0 auto "> <div id="audit_none">关闭</div> </div>');

                $('#audit_none').on('tap',function () {
                    window.history.go(-1);
                })
                // _this.getAnswerData();
            }
            // popAlert(re.msg);
        },'json');
    }
}