//获取token
function getToken(){
    var r;
    $.ajax({
        type: "POST",
        url: '//'+domain.hr+'/user/get_token',
        data: {guid:'imei',user_id:0},
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        async: false,
        success: function(re){
            r = re.code == "0001200" ? re.data : 0;
        }
    });
    return r;
}

var recruit = function(){
    var p = 1;
    if (typeof($index) == 'undefined') {
        p = 0;
    }
    return this.init(p);
};
recruit.prototype = {
    storage: true, 
    token: null,
    position_id:null,
    init: function(p) {
        var _this = this;
        if (!window.localStorage) {
            _this.storage = false;
        }
        if (p==0) {
            _this.detectPage();
        }
    },
    redirect: function() {
        window.location.href = '/';
        return true;
    },
    detectPage: function() {
        var _this = this;
        if (_this.storage) {
            _this.token = localStorage.token;
            _this.position_id = localStorage.position_id;
            //console.log(_this.token);
            if (typeof(_this.token) == 'undefined') {
                //alert('没有登录');
                _this.redirect()
            }

        } else {
            _this.token = $.cookie('token');
            _this.position_id = $.cookie('position_id');
            if (token == '') {
                //alert('没有登录');
                _this.redirect()
            }
            
        }
        return true;
    }
    
};
var recruit = new recruit();

//    获取公司地址

$.ajax({
    type: 'post',
    url:'//'+domain.hr+'/hr/user/Company/simple/',
    data: {token:recruit.token},
    dataType: 'json',
    cache: false,
    success:function (data){
        if(data.code=='0001000'){
            var group = Handlebars.compile($("#group").html());
            var html = group(data.data);
            $('#togroup').html(html);

        }
        if (data.code=='0001002'){
            console.log(data.msg);
        }
        if (data.code=='0001101'){
            console.log(data.msg);
        }
        if (data.code=='0001001'){
            console.log(data.msg);
        }

    }
});


//    获取hr昵称以及头像

$.ajax({
    type: 'post',
    url:'//'+domain.hr+'/hr/user/Person/simple/',
    data: {token:recruit.token},
    dataType: 'json',
    cache: false,
    success:function (data){
        if(data.code=='0001000'){
            var hr = Handlebars.compile($("#hr").html());
            var html = hr(data.data);
            $('#hr_name').html(html);

            var money=data.data.money;
            $("#money").html(money);
        }
        if (data.code=='0001101'){
            console.log(data.msg);
        }

    }
});

window.matchTest={
    regular:{
        ps:/^[0-9A-Za-z]{6,16}$/,
        ph:/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/,
        yzm: /^[0-9a-zA-Z]{4}$/,
        num:/^[0-9]*$/,
        che:/^[\u4e00-\u9fa5]*$/,
        tel:/^[0-9\-]{7,12}]*$/
    }
}

//修改密码页
Reset = {
    init: function(){
        var _this = this;
        _this.test();
        $("#password1").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#password2").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#wjphone").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#code").on('input propertychange', function() {
            _this.isAllow();
        });

        $("#ture-btn").on("click",function () {
            if(matchTest.regular.ph.test($("#wjphone").val())&&matchTest.regular.yzm.test($("#code").val())){
                _this.smstrue();
                return true;
            }else{
                if($("#wjphone").val()==""){
                    $(".spa4").text('请你填写手机号')
                }
                if($("#code").val()==""){
                    $(".spa5").text('请你填写验证码')
                }
                return false;
            }

        })

        $("#Changeps").on("click",function(){
            if(matchTest.regular.ps.test($("#password1").val())){
                if ($("#password1").val()==$("#password2").val()){
                    if($(this).hasClass("disabled")){return;}
                    _this.reset();
                }else {
                    $(".spa7").text('两次输入的密码不同，请重新输入');
                }
            }else {
                $(".spa7").text('格式错误，请重新输入')
            }


        })

        $(".hq-yzm").on("click",function(){
            if ($("#wjphone").val()!=""){
                if($(this).attr("disabled")=="disabled"){return;}
                _this.sendmeng();
            }else {
                $(".spa4").text("请输入手机号");
            }

        })

        $("#back_btn").on("click",function () {
            window.location.href='../index.html';
        })
    },
    sendmeng: function(){
        var _this = this;
        if(!this.token){ this.token = getToken()}

        $.ajax({
            type:"post",
            url:'//'+domain.hr+'/sms/send',
            data:{token:_this.token,telphone:_this.mobile,smstype:'updatepass'},
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            async:false,
            dataType: 'json',
            success:function(re){
                console.log(re.code);
                if(re.code=="0002100"){
                    alert("发送短信验证码失败")
                }
                if(re.code=="0002200"){
                    alert("发送短信验证码成功。请注意查收");

                    curCount = count;
                    $("#hq-yzm").attr("disabled", "true");
                    $("#hq-yzm").css("background", "#c9c9c9");
                    $("#hq-yzm span").html( + curCount + "秒再获取");
                    InterValObj = window.setInterval(_this.SetRemainTime, 1000); //启动计时器，1秒执行一次
//向后台发送处理数据

                }
                if(re.code=="0002300"){
                    alert(re.msg);
                }else{
                    $(".spa5").text(re.msg)
                }
            }
        });

    },
    //timer处理函数
    SetRemainTime: function() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $("#hq-yzm").removeAttr("disabled");//启用按钮
            $("#hq-yzm").css("background","#ff6900");//启用按钮
            $("#hq-yzm span").html("重新发送验证码");
            code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
        }
        else {
            curCount--;
            $("#hq-yzm span").html( + curCount + "秒再获取");
        }

    },
    isAllow: function(){
        this.getdoms();
    },
    test:function () {
        window.onload=function(){
            $("#wjphone").focus()
        }
        /************************  失焦判断  **********************************/
        $("input").blur(function(){
            $("#wjphone").css("border","1px solid #fff");
            $("#code").css("border","1px solid #fff");
            $("#password1").css("border","1px solid #fff");
            $("#password2").css("border","1px solid #fff");

            //手机
            if($(this).is("#wjphone")){            //手机号判断

                if($("#wjphone").val()!=""){
                    if(!(matchTest.regular.ph.test($("#wjphone").val()))){
                        $(".spa4").text("请输入正确手机号");
                        $(this).css("border","1px solid #ff6900");
                        return false;
                    }else if(matchTest.regular.ph){
                        $(".spa4").text("");
                        return true;
                    }
                }else{
                    $(".spa4").text("");
                }
            }

            //验证码
            if($(this).is("#code")){            //验证码判断

                if($("#code").val()!=""){
                    if(!(matchTest.regular.yzm.test($("#code").val()))){
                        $(".spa5").text("验证码小于四位");
                        $(this).css("border","1px solid #fff");
                        return false;
                    }else if(matchTest.regular.yzm){
                        $(".spa5").text("");
                        return true;
                    }
                }else{
                    $(".spa5").text("");

                }
            }

            //密码1
            if($(this).is("#password1")){            //密码判断

                if($("#password1").val()!=""){
                    if(!(matchTest.regular.ps.test($("#password1").val()))){
                        $(".spa6").text("请输入正确的密码");
                        $(this).css("border","1px solid #fff");
                        return false;
                    }else if(matchTest.regular.ps){
                        $(".spa6").text("");
                        return true;
                    }
                }else{
                    $(".spa6").text("");

                }
            }

        //    密码2
            if($(this).is("#password2")){            //密码判断

                if($("#password2").val()!=""){
                    if(!(matchTest.regular.ps.test($("#password2").val()))){
                        $(".spa7").text("请输入正确的密码");
                        $(this).css("border","1px solid #fff");
                        return false;
                    }else if(matchTest.regular.ps){
                        $(".spa7").text("");
                        return true;
                    }
                }else{
                    $(".spa7").text("");

                }
            }
        })
        /********************** 聚焦提示 ************************/
        $("input").focus(function(){
            if($(this).is("#wjphone")){
//                    $(this).append()
                $(".spa4").text("11位手机号码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }
            if($(this).is("#code")){
                $(".spa5").text("请输入四位验证码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }

            if($(this).is("#password1")){
                $(".spa6").text("请输入密码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }

            if($(this).is("#password2")){
                $(".spa7").text("请再次输入密码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }
        })
    },
    getdoms: function(){
        this.mobile = $("#wjphone").val();
        this.code = $("#code").val();
        this.password = $("#password1").val();
        this.password2 = $("#password2").val();
    },
    smstrue:function () {
        var _this=this;
        $.ajax({
            type:"post",
            url:'//'+domain.hr+'/user/user/validateSms ',
            data:{token:_this.token,smsCode:_this.code},
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            async:false,
            dataType: 'json',
            success:function(re){
                if(re.code=="1301100"){
                    $(".spa5").text('短信验证失败');
                }
                if(re.code=="1301200"){
                    $("#retri_btn").hide();
                    $("#reset").show();
                    $(".reicon-l").removeClass("active");
                    $(".reicon-r").addClass("active");

                }
            }
        });
    },
    reset: function(){
        var _this = this;
        if(!this.token){ this.token = getToken()}
        this.regJson = {
            token: _this.token,
            telphone: _this.mobile,
            password: _this.password,
            tel_code: _this.code
        }
        console.log(this.regJson);
        $.post('//'+domain.hr+'/user/login/restpas',_this.regJson, function (re) {
            console.log(re);
            if(re.code=='0301200'){
                alert("密码修改成功");
//                    setTimeout(function(){
//                        window.history.go(-1)
//                    },1500)
            }else{
                alert(re.msg);
//                    setTimeout(function(){
//                        window.location.href = window.location.href
//                    },1500)
            }
        },'json');
    }
}



//选择企业页
function enter() {
    var company={id:null};
    var $search = $('#search');
    var $searchInput = $search.find('#search-text');
    $searchInput.attr('autocomplete','off');
    var $autocomplete = $('.en-bdsug ul');
    var clear = function(){
        $autocomplete.empty().hide();
        $autocomplete.parent().hide();
    };
    $searchInput.blur(function(){
        setTimeout(clear,500);
    });
    $searchInput.focus(function () {
        $autocomplete.parent().show();
    })
    var selectedItem = null;
    var timeoutid = null;
    var setSelectedItem = function(item){
        selectedItem = item ;
        if(selectedItem < 0){
            selectedItem = $autocomplete.find('li').length - 1;
        }
        else if(selectedItem > $autocomplete.find('li').length-1 ) {
            selectedItem = 0;
        }
        $autocomplete.find('li').removeClass('current')
            .eq(selectedItem).addClass('current');
    };
    var ajax_request = function(){
        $.ajax({
            'url':'//'+domain.hr+'/hr/company/Search', //服务器的地址
            'data':{token:recruit.token, wd:$searchInput.val()}, //参数
            'dataType':'json', //返回数据类型
            'type':'POST', //请求类型
            'success':function(data){
                var data=data.data;
                if(data!=""){
                    $.each(data, function(index,term) {
//                                console.log(data);
//                                console.log(term.fullname);
//                                console.log(term.id);
                        $('<li></li>').text(term.fullname).appendTo($autocomplete)
                            .addClass('clickable')
                            .hover(function(){
//下拉列表每一项的事件，鼠标移进去的操作
                                $(this).siblings().removeClass('current');
                                $(this).addClass('current');
                                selectedItem = index;
                            },function(){
//下拉列表每一项的事件，鼠标离开的操作
                                $(this).removeClass('current');
//当鼠标离开时索引置-1，当作标记
                                selectedItem = -1;
                            })
                            .click(function(){
//鼠标单击下拉列表的这一项的话，就将这一项的值添加到输入框中
                                $searchInput.val(term.fullname);
//清空并隐藏下拉列表
//                                 submit(term.id);
                                company.id=term.id;
                                $autocomplete.parent().hide();
                                $autocomplete.empty().hide();
                            });


                    });//事件注册完毕
                    setSelectedItem(0);
//显示下拉列表
                    $autocomplete.show();


                    $("#set-gs").css("display","none");
                }
                else if(data==""){
                    $("#set-gs").css("display","block");
                    $("#jump-btn").on("click",function () {
                        window.location.href = 'audit.html';
                    })
                }

            }
        });
    };

        $("#submit").on("click",function () {
            // alert($("#search-text").val());


            if($("#search-text").val()!=''){

                $.ajax({
                    type: 'post',
                    url:'//'+domain.hr+'/hr/user/Company/simple/',
                    data: {token:recruit.token},
                    dataType: 'json',
                    cache: false,
                    success:function (data){
                        if(data.code=='0001000'){
                            console.log(data.msg);
                            alert("您已选择了公司，系统将跳转到职位管理页！");
                            window.location.href='manage/position.html'
                        }
                        if (data.code=='0001002'){
                            console.log(data.msg);
                            $.post('//'+domain.hr+'/hr/user/Company/binding',{token:recruit.token,company_id:company.id},function (re) {
                                if(re.code=='0001000'){
                                    window.location.href = 'manage/position.html';
                                }else{
                                    alert(re.msg+','+'数据库不存在该公司');
                                }

                            },'json')
                        }
                        if (data.code=='0001101'){
                            console.log(data.msg);
                            //过期
                        }
                        if (data.code=='0001001'){
                            console.log(data.msg);
                        }

                    }
                });



            }else {
                alert("请输入公司名称");
            }

        })

    $searchInput
        .keyup(function(event) {
//字母数字，退格，空格
            if(event.keyCode > 40 || event.keyCode == 8 || event.keyCode ==32) {
//首先删除下拉列表中的信息
                $autocomplete.empty().hide();
                clearTimeout(timeoutid);
                timeoutid = setTimeout(ajax_request,100);
            }
            else if(event.keyCode == 38){
//上
//selectedItem = -1 代表鼠标离开
                if(selectedItem == -1){
                    setSelectedItem($autocomplete.find('li').length-1);
                }
                else {
//索引减1
                    setSelectedItem(selectedItem - 1);
                }
                event.preventDefault();
            }
            else if(event.keyCode == 40) {
//下
//selectedItem = -1 代表鼠标离开
                if(selectedItem == -1){
                    setSelectedItem(0);
                }
                else {
//索引加1
                    setSelectedItem(selectedItem + 1);
                }
                event.preventDefault();
            }
        })
        .keypress(function(event){
//enter键
//             $("#submit").onclick();
            if(event.keyCode == 13) {

//列表为空或者鼠标离开导致当前没有索引值

                if($autocomplete.find('li').length == 0) {
                    $searchInput.val($('#search-text').val());
                    $("#submit").click();
                    $autocomplete.empty().hide();
                    event.preventDefault();
                    // return;
                }else {
                    $searchInput.val($autocomplete.find('li').eq(selectedItem).text());
                    $("#submit").click();
                    $autocomplete.empty().hide();
                    event.preventDefault();
                }




            }
        })
        .keydown(function(event){
//esc键
            if(event.keyCode == 27 ) {
                $autocomplete.empty().hide();
                event.preventDefault();
            }
        });
}


//职位管理页
function HrPosition() {
    var storage = true;
    if(!window.localStorage){
        storage = false;
    }

    var token = null;
    var position_id = null;

    if (storage) {
        token = localStorage.token;
        position_id = localStorage.position_id;
        // console.log(token);

        if (token == 'undefined') {
            alert('没有登录');
        }

    } else {
        $.cookie('token', re.data.token, {expires: 360, path: '/'});
        token = $.cookie('token');
        $.cookie('position_id', re.data.position_id, {expires: 360, path: '/'});
        position_id = $.cookie('position_id');
        alert(token);
        if (token == '') {
            alert('没有登录');
        }


    }
    //页面及筛选
    $(function(){

        operationDb.init();

        $('[name="nice-select"]').click(function(e){
            $('[name="nice-select"]').find('ul').hide();
            $(this).find('ul').show();
            e.stopPropagation();
        });
        $('[name="nice-select"] li').hover(function(e){
            $(this).toggleClass('on');
            e.stopPropagation();
        });
        $('[name="nice-select"] li').click(function(e){
            var val = $(this).text();
            $(this).parents('[name="nice-select"]').find('input').val(val);
            $('[name="nice-select"] ul').hide();
            operationDb.closes=$(this).attr("data-value");
//            alert(position.close);
            operationDb.coreload();
            e.stopPropagation();
        });
        $(document).click(function(){
            $('[name="nice-select"] ul').hide();
        });
    });

    var operationDb={
        pageNow:1,
        condition:false,
        closes:0,
        closeoff:null,
        coreload:function(page){

            $.ajax({
                type: 'post',
                url: '//'+domain.zp+'/hr/company/Position/positionList',
                data: {token:recruit.token,page:page,limit:5,close:operationDb.closes},
                dataType: 'json',
                cache: false,
                success:function (data){

                    if(data.code=='0001000'){
                        operationDb.compileHandlebars(data.data);

                    }
                    if (data.code=='0001101'){
                        console.log(data.msg);
                        //过期
                        recruit.redirect();
                    }

                }
            });

        },
        compileHandlebars:function(content) {


//            页面加载
            var myTemplate = Handlebars.compile($("#db-template").html());
            Handlebars.registerHelper("dateFormat", function(value) {
                return new Date(parseInt(value) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
            });
            var html = myTemplate(content);
            $('#db_content').html(html);


//            判断是否关闭
            if(content.list!=null){
                $.each(content.list,function (index,value) {
                    if(value.is_stop==0){
                        $(".ifi-off").hide();
                    }else if(value.is_stop==1){
                        $(".zw-off").hide();
                    }
                })
            }
            // console.log(content.list);


//            关闭职位
            $(content.list).each(function (index,value) {
                $('#data_main ul #zw-off').eq(index).on("click",function () {
                    operationDb.closeoff=value.id;
                    operationDb.close();
                    $("#zw-off i").eq(index).addClass("close");
                    $("#data_main ul #zw-off").eq(index).css("color","#ff6900");
                })
                $('#data_main ul #zw-ch').eq(index).on("click",function () {
                    operationDb.closeoff=value.id;
                    localStorage.position_id = value.id;
                    console.log(localStorage.position_id);
                    window.location.href='../annou_cgg.html'
                })
            })
            // console.log(content);


            var total = Math.ceil(content.count/5);
            var pageNow = operationDb.pageNow;

            var page = operationDb.pagingBox(pageNow,total);

            var myTemplate = Handlebars.compile($("#db-page").html());
            var html = myTemplate(page);
            $('#page').html(html);


            $("#page").unbind('click').bind('click',operationDb.onClick_2);      //注册页面分页点击事件  必须先释放掉已注册事件

        },

        //页面分页规则处理
        pagingBox:function(a,b)
        {
            var page=[];
            var page1 = {};

            if(1>=b)
            {
                return page1;
            }

            a=parseInt(a);

            b<a&&(a=b);

            1>=a?a=1:page1.firstpage=true;

            var d=1,e=9>b?b:9;
            2<=a&&(page1.previous={page:a-1});

            7<=a&&(d=a-4,e=a+4,e=b<e?b:e);

            for(;d<a;d++)
            {
                page.push({ page: d, total: b, link:true});
            }

            page.push({ page: a, total: b, link:false});

            for(d=a+1;d<=e;d++)
            {
                page.push({ page: d, total: b, link:true});
            }

            if(a<b)
            {
                page1.next={page:a+1}
                page1.lastpage={total: b};
            }

            page1.pagelist=page;
            return page1;
        },

        //绑定分页点击事件
        onClick_2:function(e)
        {
            if(e.target && e.target.tagName=='A')
            {
                var value = $(e.target).attr("data");
                if(value)
                {
                    operationDb.pageNow = value;
                    operationDb.coreload(value);
                    return false;
                }
            }

            return false;
        },
        close:function () {
            $.ajax({
                type: 'post',
                url:'//'+domain.zp+'/hr/company/Position/closePosition/',
                data: {token:recruit.token,position_id:operationDb.closeoff},
                dataType: 'json',
                cache: false,
                success:function (data){
                    if(data.code=='0001000'){
                        alert(data.msg);
                    }
                    if(data.code=='0001001'){
                        alert(data.msg);
                    }
                    if (data.code=='0001101'){
                        alert(data.msg);
                        //过期
                        recruit.redirect();
                    }
                }
            });
        },
        //更新数据接口
        init:function(){
            this.pageNow = 1;   //初始化当前页面置为1
            this.coreload(1);   //开始请求数据
            $("#rele").on("click",function () {
                window.location.href='../annou.html';
            })
        },

    };




    //    跳转
    $("#hrcenctrol").on("click",function () {
        window.location.href='personal.html'
    })
    $("#hrmanagement").on("click",function () {
        window.location.href='resume.html'
    })

}


//简历管理
function HrResume() {
    screen();
    Status(0);
    var title={
        apply_id:0,
        other:2
    }

    // console.log(title.apply_id);

    $(".sme-list ul li").on("click", function (index,value) {
        $(this).addClass("current").siblings().removeClass("current");
        Status($(this).index());
    })


//    简历列表
    function Status(status,position_id) {
        $.ajax({
            type: 'post',
            url:'//'+domain.hr+'/hr/company/Resume/resumeList/',
            data: {token:recruit.token,status:status,position_id:position_id,page:1,limit:5},
            dataType: 'json',
            cache: false,
            success:function (data){
                if(data.code=='0001000'){
                    var delivery = Handlebars.compile($("#delivery").html());
                    var html = delivery(data.data);
                    $('#res-left').html(html);
                    jlbtn();
//                    默认第一个
//                     console.log(data.data.list);
                    if(data.data.list!=null){
                        $.each(data.data,function (index,value) {
                            title.apply_id=value[0].id;
                            exmple(title.apply_id);
                        })
                    }else{
                        var html='<div style="height: 200px;line-height: 200px;font-size: 24px;color: #c9c9c9">暂无该类简历！</div>';
                        $("#res-right").html(html)
                    }

                }
                if (data.code=='0001101'){
                    console.log(data.msg);
                    //过期
                    recruit.redirect();
                }
            }
        });
//    简历列表点击状态
        function jlbtn() {

            $(".res-left ul li").eq(0).addClass("active");
            $(".res-left ul li").on("click", function () {

                $(this).addClass("active").siblings().removeClass("active");
                var applyid=$(this).attr("data-id");
                exmple(applyid);
                title.apply_id = applyid;

                // console.log(title.apply_id);
            })
        }
    }

//  简历详情
    function exmple(apply_id) {
        $.ajax({
            type: 'post',
            url:'//'+domain.hr+'/hr/company/Resume/resumeDetail/',
            data: {token:recruit.token,apply_id:apply_id},
            dataType: 'json',
            cache: false,
            success:function (data){

                if(data.code=='0001000'){

                    var jlexpmaple = Handlebars.compile($("#jlexpmaple").html());
                    Handlebars.registerHelper("sex", function(value) {
                        return value==1 ? '男' : '女';
                    });
                    Handlebars.registerHelper("experience", function(experience) {
                        if(experience==1){
                            return '应届生'
                        }else if (experience==2){
                            return '1年以内'
                        }else if (experience==3){
                            return '1-3年'
                        }else if (experience==4){
                            return '3-5年'
                        }else if (experience==5){
                            return '5-10年'
                        }else if (experience==6){
                            return '10年以上'
                        }
                    });
                    Handlebars.registerHelper("educationo", function(education) {
                        if(education==1){
                            return '高中/中专'
                        }else if (education==2){
                            return '大专'
                        }else if (education==3){
                            return '本科'
                        }else if (education==4){
                            return '硕士'
                        }else if (education==5){
                            return '博士'
                        }
                    });
                    Handlebars.registerHelper("education", function(edunum) {
                        if(edunum==1){
                            return '高中/中专'
                        }else if (edunum==2){
                            return '大专'
                        }else if (edunum==3){
                            return '本科'
                        }else if (edunum==4){
                            return '硕士'
                        }else if (edunum==5){
                            return '博士'
                        }
                    });
                    Handlebars.registerHelper("jsposition", function(jsp) {
                        if(jsp==1){
                            return '离职-随时到岗'
                        }else if (jsp==2){
                            return '在职-暂不考虑'
                        }else if (jsp==3){
                            return '在职-考虑机会'
                        }
                    });
                    var html = jlexpmaple(data.data);


                    $('#res-right').html(html);

                    if (data.data.status==2){
                        $("#yueta").css("color","#ff6900");
                        $("#yueta i").addClass("iyueta");

                    }else if (data.data.status==3){
                        $("#entry").css("color","#ff6900");
                        $("#entry i").addClass("ientry");

                    }else if (data.data.status==4){
                        $("#pass").css("color","#ff6900");
                        $("#pass i").addClass("pass");

                    }


                    if(data.data.interview!=null){
                        $(".interview").show();
                    }
                    offer(apply_id);
                    pass(apply_id);
                    yueta(apply_id);
                }
                if (data.code=='0001101'){
                    console.log(data.msg);
                    //过期
                    recruit.redirect();
                }
                if (data.data.status=='2'||data.data.status=='3'||data.data.status=='4'){
                    // $("#entry").css("color","gray");
                    // $("#yueta").css("color","gray");
                    // $("#pass").css("color","gray");
                    $("#entry").unbind();
                    $("#yueta").unbind();
                    $("#pass").unbind();
                }

            }
        });

    }

//    右上角选择
    function screen() {
        $.ajax({
            type: 'post',
            url:'//'+domain.hr+'/hr/company/Position/positionSimpleList/',

            data: {token:recruit.token},
            dataType: 'json',
            cache: false,
            success:function (data){
                if(data.code=='0001000'){
                    var topagelist = Handlebars.compile($("#topagelist").html());
                    var html = topagelist(data);
                    $('#pagetop').html(html);

                }
                if (data.code=='0001101'){
                    console.log(data.msg);
                    //过期
                    recruit.redirect();
                }
                sxbtn();
            }
        });
        function sxbtn() {
            $('[name="nice-select"]').click(function(e){
                $('[name="nice-select"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select"]').find('input').val(val);
                $('[name="nice-select"] ul').hide();
                var sxlist=$(this).attr("data-value");
                Status('',sxlist)
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select"] ul').hide();
            });
        }
    }

//    已入职
    function offer(apply_id) {
        $("#entry").on("click",function () {

            $(".alecont").show();
            $(".aleentry").show();
            $("#rz-btn").on("click",function () {
                $.ajax({
                    type: 'post',
                    url:'//'+domain.hr+'/hr/company/Resume/offer/',
                    data: {token:recruit.token,apply_id:apply_id},
                    dataType: 'json',
                    cache: false,
                    success:function (data){
                        if(data.code=='0001000'){
                            console.log(data);
                            $("#entry").css("color","#ff6900");
                            $("#entry i").addClass("ientry")

                        }
                        if(data.code=='0001001'){
                            alert(data.msg);
                        }
                        if (data.code=='0001101'){
                            alert(data.msg);
                            //过期
                            recruit.redirect();
                        }
                        sxbtn();
                    }
                });
                $(".alecont").hide();
                $(".aleentry").hide();
            })
            $(".btn-offer").on("click",function () {
                $(".alecont").hide();
                $(".aleentry").hide();
            })


        })

    }

//    不合适
    function pass(apply_id) {
        $("#pass").on("click",function () {
            $(".alecont").show();
            $(".appoint").show();
            $("#bhs-btn").on("click",function () {
                $.ajax({
                    type: 'post',
                    url:'//'+domain.hr+'/hr/company/Resume/unsuitable/',
                    data: {token:recruit.token,apply_id:apply_id},
                    dataType: 'json',
                    cache: false,
                    success:function (data){
                        if(data.code=='0001000'){
                            console.log(data);
                            $("#pass").css("color","#ff6900");
                            $("#pass i").addClass("pass");
                        }
                        if(data.code=='0001001'){
                            alert(data.msg);
                        }
                        if (data.code=='0001101'){
                            alert(data.msg);
                            //过期
                            recruit.redirect();
                        }
                        sxbtn();
                    }
                });
                $(".alecont").hide();
                $(".appoint").hide();
            })
            $(".btn-offer").on("click",function () {
                $(".alecont").hide();
                $(".appoint").hide();
            })



        })

    }



    //    约面试
    function yueta(apply_id) {
        test();
        $("#yueta").on("click",function () {
            $(".alecont").show();
            $(".abint").show();


//            点击关闭
            $(".abint-off").on("click",function () {
                $(".alecont").hide();
                $(".abint").hide();
            });
            $("#abint-true").on("click",function () {
                if($("#intime").val()!=''&&$("#msadd").val()!=''&&$("#mspeople").val()!=''&&$("#mstel").val()!=''&&matchTest.regular.tel.test($("#mstel").val())){
                    $("#oral").ajaxSubmit({
                        url: '//'+domain.hr+'/hr/company/Interview/invite',
                        type: "POST",
                        data: {token:recruit.token,apply_id:apply_id},
                        success: function(data) {
                            console.log(data);
                            var data = $.parseJSON(data);
                            if(data.code=="0001000"){
                                console.log(data);
                                $(".alecont").hide();
                                $(".abint").hide();
                                alert("约面成功");
                            }
                            if(data.code=='0001001'){
                                alert(data.msg)
                            }
                            if(data.code=='80003333'){
                                alert(data.msg);
                            }
                            if(data.code=="80002222"){
                                $("#to_charge").show();
                            }
                            if(data.code=="0001101"){
                                alert(data.msg);
                                //过期
                                recruit.redirect();
                            }
                        },
                        error: function(msg) {
                            alert("出错了");
                        }
                    })
                }else if($("#intime").val()==''){
                    $(".spa32").text("请选择面试时间");
                }else if($("#msadd").val()==''){
                    $(".spa33").text("请输入面试地点");
                }else if($("#mspeople").val()==''){
                    $(".spa34").text("请输入联系人");
                }else if($("#mstel").val()==''){
                    $(".spa35").text("联系方式不能为空");
                }

            })

            $("#to_charge").on("click",function () {
                window.location.href='../manage/personal.html#chongzhi';
            })

        })
    }

//    跳转
    $("#hradmin").on("click",function () {
        window.location.href='position.html'
    })
    $("#hrcenctrol").on("click",function () {
        window.location.href='personal.html'
    })
}


//个人中心页
function HrPers() {
    $.ajax({
        type: 'post',
        url:'//'+domain.hr+'/hr/user/Company/simple/',
        data: {token:recruit.token},
        dataType: 'json',
        cache: false,
        success:function (data){
            if(data.code=='0001000'){
                var group = Handlebars.compile($("#group").html());
                var html = group(data.data);
                $('#togroup').html(html);
                parameter.company_id=data.data.id;

            }
            if (data.code=='0001002'){
                console.log(data.msg);
            }
            if (data.code=='0001101'){
                console.log(data.msg);
            }
            if (data.code=='0001001'){
                console.log(data.msg);
            }

        }
    });

    var telphone={phone:null};
    var storage = true;
    if(!window.localStorage){
        storage = false;
    }

    var token = null;

    if (storage) {
        token = localStorage.token;
        // console.log(token);

        if (token == 'undefined') {
            alert('没有登录');
        }

    } else {
        $.cookie('token', re.data.token, {expires: 360, path: '/'});
        token = $.cookie('token');
        alert(token);
        if (token == '') {
            alert('没有登录');
        }
    }



//<!--修改密码页-->

    var InterValObj; //timer变量，控制时间
    var count = 60; //间隔函数，1秒执行
    var curCount;//当前剩余秒数

//    获取token

    function getToken(){
        var r;
        $.ajax({
            type: "POST",
            url: '//'+domain.hr+'/user/get_token',
            data: {guid:'imei',user_id:0},
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            async: false,
            success: function(re){
                r = re.code == "0001200" ? re.data : 0;
            }
        });
        return r;
    }
    $(function () {
        Reset.init();
    });
    Reset = {
        init: function(){
            var _this = this;
            $("#passwords").on('input propertychange', function() {
                _this.isAllow();
            });
            $("#code").on('input propertychange', function() {
                _this.isAllow();
            });
            $("#Changeps").on("click",function(){
                if(matchTest.regular.ps.test($("#passwords").val())&&matchTest.regular.yzm.test($("#code").val())){
                    if($(this).hasClass("disabled")){return;}
                    _this.reset();
                    return true;
                }else{
                    if($("#passwords").val()==""){
                        $(".spa29").text('请你填写密码')
                    }
                    if($("#code").val()==""){
                        $(".spa30").text('请你填写验证码')
                    }
                    return false;
                }



            })

            $(".hq-yzm").on("click",function(){
                if($(this).attr("disabled")=="disabled"){return;}
                _this.sendmeng();
            })

        },
        sendmeng: function(){
            var _this = this;
            if(!this.token){ this.token = getToken()}

            $.ajax({
                type:"post",
                url:'//'+domain.hr+'/sms/send',
                data:{token:_this.token,telphone:_this.mobile,smstype:'updatepass'},
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                async:false,
                dataType: 'json',
                success:function(re){
                    console.log(re.code);
                    if(re.code=="0002100"){
                        console.log("发送短信验证码失败")
                    }
                    if(re.code=="0002200"){
                        alert("发送短信验证码成功。请注意查收");
                        curCount = count;
                        $("#hq-yzm").attr("disabled", "true");
                        $("#hq-yzm").css("background", "#c9c9c9");
                        $("#hq-yzm span").html( + curCount + "秒再获取");
                        InterValObj = window.setInterval(_this.SetRemainTime, 1000); //启动计时器，1秒执行一次
//向后台发送处理数据
                    }
                    if(re.code=="0002700"){
                        console.log(re.msg);
                    }else {
                        alert(re.msg);
                    }
                }
            });

        },
        //timer处理函数
        SetRemainTime: function() {
            if (curCount == 0) {
                window.clearInterval(InterValObj);//停止计时器
                $("#hq-yzm").removeAttr("disabled");//启用按钮
                $("#hq-yzm").css("background","#ff6900");//启用按钮
                $("#hq-yzm span").html("重新发送验证码");
                code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
            }
            else {
                curCount--;
                $("#hq-yzm span").html( + curCount + "秒再获取");
            }

        },
        isAllow: function(){
            this.getdoms();
        },
        getdoms: function(){
            this.mobile = telphone.phone;
            this.code = $("#code").val();
            this.password = $("#passwords").val();
        },
        reset: function(){
            var _this = this;
            if(!this.token){ this.token = getToken()}
            this.regJson = {
                token: _this.token,
                telphone:telphone.phone,
                password: _this.password,
                tel_code: _this.code
            }
            console.log(this.regJson);
            $.post('//'+domain.hr+'/user/login/restpas',_this.regJson, function (re) {
                console.log(re);
                if(re.code=='0301106'){
                    $(".spa30").text(re.msg+'，请输入正确的验证码')
                }
                if(re.code=='0301200'){
                    alert("密码修改成功");

                }else{
                    alert(re.msg);
//                    setTimeout(function(){
//                        window.location.href = window.location.href
//                    },1500)
                }
            },'json');
        }
    }

        $("input").blur(function(){

            $("#code").css("border","1px solid #fff");
            $("#passwords").css("border","1px solid #fff");

            //验证码
            if($(this).is("#code")){            //验证码判断

                if($("#code").val()!=""){
                    if(!(matchTest.regular.yzm.test($("#code").val()))){
                        $(".spa30").text("验证码小于4位");
                        $(this).css("border","1px solid #fff");
                        return false;
                    }else if(matchTest.regular.yzm){
                        $(".spa30").text("");
                        return true;
                    }
                }else{
                    $(".spa30").text("");

                }
            }

            //密码1
            if($(this).is("#passwords")){            //密码判断

                if($("#passwords").val()!=""){
                    if(!(matchTest.regular.ps.test($("#passwords").val()))){
                        $(".spa29").text("请输入格式正确的密码");
                        $(this).css("border","1px solid #fff");
                        return false;
                    }else if(matchTest.regular.ps){
                        $(".spa29").text("");
                        return true;
                    }
                }else{
                    $(".spa29").text("");

                }
            }

        })
        /********************** 聚焦提示 ************************/
        $("input").focus(function(){
            if($(this).is("#code")){
                $(".spa30").text("请输入4位数验证码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }

            if($(this).is("#passwords")){
                $(".spa29").text("请输入密码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }

        })
        // this.reg();
    test();
    //    下拉功能
    $.post('//'+domain.hr+'/job/Industry/items/', function (re) {
        if(re.code=="0001000"){
            var options=re.data;
            for(var i=0;i<re.data.length;i++){
                var ulist='<li data-value="' + options[i].key + '">'+options[i].value+'</li>';
                $("#wrap-list").append(ulist);
            }
        }
        option();
    },"json");


    function option() {
        $('[name="nice-select"]').click(function(e){
            $('[name="nice-select"]').find('ul').hide();
            $(this).find('ul').show();
            e.stopPropagation();
        });
        $('[name="nice-select"] li').hover(function(e){
            $(this).toggleClass('on');
            e.stopPropagation();
        });
        $('[name="nice-select"] li').click(function(e){
            var val = $(this).text();
            $(this).parents('[name="nice-select"]').find('input').val(val);
            $('[name="nice-select"] ul').hide();
            parameter.industry = $(this).attr("data-value");
            // console.log(parameter.industry);
            e.stopPropagation();
        });
        $(document).click(function(){
            $('[name="nice-select"] ul').hide();
        });
    }
    chooseHeadcount();

    function chooseHeadcount(){
        $('[name="nice-select-1"]').click(function(e){
            $('[name="nice-select-1"]').find('ul').hide();
            $(this).find('ul').show();
            e.stopPropagation();
        });
        $('[name="nice-select-1"] li').hover(function(e){
            $(this).toggleClass('on');
            e.stopPropagation();
        });
        $('[name="nice-select-1"] li').click(function(e){
            var val = $(this).text();
            $(this).parents('[name="nice-select-1"]').find('input').val(val);
            $('[name="nice-select-1"] ul').hide();
            parameter.headcount = $(this).attr("data-value");
            // console.log(parameter.headcount);
            e.stopPropagation();
        });
        $(document).click(function(){
            $('[name="nice-select-1"] ul').hide();
        });
    };



//<!--充值页面-->


    var recharge={fee:null,type:null};
    $("#cz-width input").each(function (index,value) {
        var value=$(this).attr("value");
        // console.log(index+1);
        $("#cz-width input").eq(index).click(function () {
//        alert(index+1);
            if(index==0){
                recharge.type=2;
            }else if (index==1){
                recharge.type=1;

            }
        })

    })
    $("#money_input").on('input propertychange', function() {
        recharge.fee=$("#money_input").val();
    });
    $("#rech_btn").on("click",function () {
        if($('#money_input').val()!=''&&$('#money_input').val()>=100){
            if(matchTest.regular.num.test($("#money_input").val())){
                if(recharge.type!=null){
                    if(recharge.type==1){
                        $("#recharge").attr("action", '//'+domain.hr+'/hr/pay/Alipay');
                        $("#token").val(recruit.token);
                        $("#recharge").submit();
                    }
                    if(recharge.type==2){
                        $.ajax({
                            type: 'post',
                            url: '//'+domain.hr+'/hr/pay/Alipay',
                            data: {token:recruit.token,type:recharge.type,fee:recharge.fee},
                            dataType: 'json',
                            cache: false,
                            success:function (data){
                                if(data.code=='0001000'){

                                    $('#clo-qrd').qrcode(data.data);
                                    $(".alecont").show();
                                    $(".aleclose").show();
                                    $('#clo-qrd').unbind();

                                }

                                $(".close-btn").on("click",function () {
                                    $(".alecont").hide();
                                    $(".aleclose").hide();
                                })
                                console.log(data.data);

                                if (data.code=='0001101'){
                                    recruit.redirect();
                                }

                            }
                        });

                    }
                }else{
                    $(".spa31").text('请输入不小于100元的金额')
                }

            }

        }else {
            $(".spa31").text('请输入不小于100元的金额')
        }

    })


//    跳转
    $("#hradmin").on("click",function () {
        window.location.href='position.html'
    })
    $("#hrmanagement").on("click",function () {
        window.location.href='resume.html'
    })
}



var annou={key:null,industry:null,position:null,salary:null,nature:null,experience:null,education:null,coordinate:null,county:null,city:null};

//发布职位页
HrCor = {
    init:function () {
        var _this=this;
        var changes={tip:null,county:null};
        $.ajax({
            type: 'post',
            url:'//'+domain.hr+'/hr/user/Company/simple/',
            data: {token:recruit.token},
            dataType: 'json',
            cache: false,
            success:function (data){
                if(data.code=='0001000'){
                    var group = Handlebars.compile($("#group").html());
                    var html = group(data.data);
                    $('#togroup').html(html);
                    changes.county=data.data.address;
                    if($("#tipinput").val()==''){
                        $("#tipinput").val(changes.county);

                        AMap.plugin('AMap.Geocoder',function(){
                            var geocoder = new AMap.Geocoder({
//            city: "010"//城市，默认：“全国”
                            });
                            var marker = new AMap.Marker({
                                map:map,
                                bubble:true
                            })
                            var input = document.getElementById('tipinput');
                            input.onchange = function(e){
                                var address =changes.county;
                                geocoder.getLocation(address,function(status,result){

                                    if(status=='complete'&&result.geocodes.length){

                                        var contire=result.geocodes[0].location.lng+','+result.geocodes[0].location.lat;
                                        annou.coordinate=contire;
                                        lnglatXY = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];
                                        regeocoder();
                                        marker.setPosition(result.geocodes[0].location);
                                        map.setCenter(marker.getPosition());

                                    }else{
                                    }
                                })
                            }
                            input.onchange();



                        });

                        if($("#tipinput").val()!=''){
                            AMap.plugin('AMap.Geocoder',function(){
                                var geocoder = new AMap.Geocoder({
//            city: "010"//城市，默认：“全国”
                                });
                                var marker = new AMap.Marker({
                                    map:map,
                                    bubble:true
                                })

                                var input = document.getElementById('tipinput');
                                input.onchange = function(e){
                                    var address = $("#tipinput").val();

                                    geocoder.getLocation(address,function(status,result){

                                        if(status=='complete'&&result.geocodes.length){

                                            var contire=result.geocodes[0].location.lng+','+result.geocodes[0].location.lat;
                                            annou.coordinate=contire;
                                            lnglatXY = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];

                                            regeocoder();

                                            marker.setPosition(result.geocodes[0].location);
                                            map.setCenter(marker.getPosition());
                                        }else{}
                                    })
                                }
                                input.onchange();



                            });
                        }
                    }

                }
                if (data.code=='0001002'){
                    console.log(data.msg);
                }
                if (data.code=='0001101'){
                    console.log(data.msg);
//                  token无效添加
                    recruit.redirect();

                }
                if (data.code=='0001001'){
                    console.log(data.msg);
                }

            }
        });
        var placeSearchOptions = { //构造地点查询类
            pageSize: 5,
            pageIndex: 1,
            city: "021" //城市
        };
        var placeSearch = new AMap.PlaceSearch(placeSearchOptions);
        //关键字查询，您如果想修改结果展现效果，请参考页面：http://lbs.amap.com/fn/css-style/
        $("#tipinput").on("input propertychange",function () {
//        alert("111");
            changes.tip=$("#tipinput").val();
            $("#cx_btn").click();
        })
        $("#cx_btn").on("click",function () {
            placeSearch.search(changes.tip, callback);
        })
        var placeSearchRender=new Lib.AMap.PlaceSearchRender();
        function callback(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                placeSearchRender.autoRender({
                    placeSearchInstance: placeSearch,
                    methodName: "search",
                    methodArgumments: ["", callback],
                    data: result,
                    map: map
//                panel: "panel"
                });
            }
        }
        AMap.plugin('AMap.Geocoder',function(){
            var geocoder = new AMap.Geocoder({
//            city: "010"//城市，默认：“全国”
            });
            var marker = new AMap.Marker({
                map:map,
                bubble:true
            })

            var input = document.getElementById('tipinput');
            input.onchange = function(e){
                var address = $("#tipinput").val();
                geocoder.getLocation(address,function(status,result){
                    if(status=='complete'&&result.geocodes.length){
                        var contire=result.geocodes[0].location.lng+','+result.geocodes[0].location.lat;
                        annou.coordinate=contire;
                        lnglatXY = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];
                        console.log(lnglatXY);
                        regeocoder();
                        marker.setPosition(result.geocodes[0].location);
                        map.setCenter(marker.getPosition());
                    }else{}
                })
            }
            input.onchange();



        });


        //已知点坐标返回市区县省
        function regeocoder() {  //逆地理编码
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });
            var marker = new AMap.Marker({  //加点
                map: map,
                position: lnglatXY
            });
            map.setFitView();
        }
        function geocoder_CallBack(data) {
            var province = data.regeocode.addressComponent.province; //返回地址描述省
            var county = data.regeocode.addressComponent.district; //返回地址描述区
            var city = data.regeocode.addressComponent.city; //返回地址描述市
            console.log(county);
            if (data.regeocode.addressComponent.city==''){
                $("#city").val(province);
                annou.city=province;
            }else {
                $("#city").val(city);
                annou.city=city;
            }
            $("#county").val(county);
            // document.getElementById("result").innerHTML = address;

        }


        $("#annou").on("click",function () {
            test2();
            if($("#industry").val()!=""&&$("#position").val()!=""&&$("#title").val()!=""&&$("#salary").val()!=""&&$("#reward").val()!=""&&$("#nature").val()!=""&&$("#city").val()!=""&&$("#tipinput").val()!=""&&$("#experience").val()!=""&&$("#education").val()!=""&&matchTest.regular.che.test($("#city").val())){
                if($('#tipinput').val().length>5){
                    $("#releases").ajaxSubmit({
                        url: '//'+domain.hr+'/hr/company/Position/add',
                        type: "POST",
                        data:{token:recruit.token,industry:annou.industry,position:annou.position,salary:annou.salary,nature:annou.nature,experience:annou.experience,education:annou.education,coordinate:annou.coordinate,city:annou.city},
                        success: function(msg) {
                            console.log(msg);

                            var data = $.parseJSON(msg);
                            console.log(data.data);
                            if(data.code=="0001000"){
                                alert('发布成功')
                            }
                            if(data.code=="0001001"){
                                console.log("上传错误");

                            }

                        },
                        error: function(msg) {
                            console.log("出错了");
                        }
                    });
                }else {
                    $(".spa24").text("请输入办公地址,不能少于5个字符");
                }


            }

        });


        $("#co-img").on("click",function () {
            $.ajax({
                type: 'post',
                url:'//'+domain.hr+'/user/login/loginout',
                data: {token:recruit.token},
                dataType: 'json',
                cache: false,
                success:function (data){
                    console.log(data)
                    if(data.code=='0301200'){
                        window.location.href='/index.html'
                    }
                    if(data.code=='0301100'){
                        alert(data.msg)
                    }
                    if(data.code=='0001101'){
                        alert(data.msg)
                    }
                }
            });
        })

        $("#hradmin").on("click",function () {
            window.location.href='manage/position.html'
        })
        $("#hrcenctrol").on("click",function () {
            window.location.href='manage/personal.html'
        })
        $("#hrmanagement").on("click",function () {
            window.location.href='manage/resume.html'
        })


        _this.HrAnnou();
    },
    HrAnnou:function() {
        test();
        $("#go_home").on("click",function () {
            window.location.href='manage/position.html'
        })


//行业列表
        $.post('//'+domain.hr+'/job/Industry/items/', function (re) {
            if(re.code=="0001000"){
                var options=re.data;
                for(var i=0;i<re.data.length;i++){
                    var ulist='<li data-value="'+options[i].key+'">'+options[i].value+'</li>';
                    $("#wrap-list").append(ulist);

                }
                option();
            }
        },"json");

//职位列表

        function position() {
            $.post('//'+domain.hr+'/job/Position/items/',{industry:annou.key}, function (re) {
                if(re.code=="0001000"){
                    var options=re.data;
                    // console.log(re);
                    for(var s=0;s<re.data.length;s++){
                        var ulist='<li data-value="'+options[s].key+'">'+options[s].value+'</li>';
//                $("#wrap-position").empty("li");
                        $("#wrap-position").append(ulist);
                    }
                }
                category();
            },"json");
        }

//  显示列表
        function option() {
            $('[name="nice-select"]').click(function(e){
                $('[name="nice-select"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select"]').find('input').val(val);
                $('[name="nice-select"] ul').hide();
                annou.key=$(this).attr("data-value");
                annou.industry=$(this).attr("data-value");
                position();
                if($("#industry").val()!=""){
                    $(".spa17").text("");
                }
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select"] ul').hide();
            });

        }

//  职位类别
        function category() {
            $('[name="nice-select-2"]').click(function(e){
                $('[name="nice-select-2"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-2"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-2"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-2"]').find('input').val(val);
                $('[name="nice-select-2"] ul').hide();
                annou.position=$(this).attr("data-value");
                if($("#position").val()!=""){
                    $(".spa18").text("");
                }
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-2"] ul').hide();
            });
        }
        //  薪资要求
        salary();
        function salary() {
            $('[name="nice-select-3"]').click(function(e){
                $('[name="nice-select-3"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-3"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-3"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-3"]').find('input').val(val);
                $('[name="nice-select-3"] ul').hide();
                annou.salary=$(this).attr("data-value");
                if($("#salary").val()!=""){
                    $(".spa20").text("");
                }
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-3"] ul').hide();
            });
        }

//    兼职全职
        nature();
        function nature() {
            $('[name="nice-select-4"]').click(function(e){
                $('[name="nice-select-4"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-4"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-4"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-4"]').find('input').val(val);
                $('[name="nice-select-4"] ul').hide();
                annou.nature=$(this).attr("data-value");
                if($("#nature").val()!=""){
                    $(".spa22").text("");
                }
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-4"] ul').hide();
            });
        }

//    经验要求
        experience();
        function experience() {
            $('[name="nice-select-5"]').click(function(e){
                $('[name="nice-select-5"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-5"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-5"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-5"]').find('input').val(val);
                $('[name="nice-select-5"] ul').hide();
                annou.experience=$(this).attr("data-value");
                if($("#experience").val()!=""){
                    $(".spa25").text("");
                }
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-5"] ul').hide();
            });
        }

//  学历要求
        education();
        function education() {
            $('[name="nice-select-6"]').click(function(e){
                $('[name="nice-select-6"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-6"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-6"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-6"]').find('input').val(val);
                $('[name="nice-select-6"] ul').hide();
                annou.education=$(this).attr("data-value");
                if($("#education").val()!=""){
                    $(".spa26").text("");
                }
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-6"] ul').hide();
            });
        }
    }
}

//修改职位页

Hrexp = {
    init:function(){
        var _this=this;


        var storage = true;
        if(!window.localStorage){
            storage = false;
        }

        var token = null;
        var position_id = null;

        if (storage) {
            token = localStorage.token;
            position_id = localStorage.position_id;

            if (token == 'undefined') {
                alert('没有登录');
            }

        } else {
            $.cookie('token', re.data.token, {expires: 360, path: '/'});
            token = $.cookie('token');
            $.cookie('position_id', re.data.position_id, {expires: 360, path: '/'});
            position_id = $.cookie('position_id');
            alert(token);
            if (token == '') {
                alert('没有登录');
            }


        }


        test();

//    获取hr昵称以及头像
        $.ajax({
            type: 'post',
            url:'//'+domain.hr+'/hr/user/Person/simple/',
            data: {token:token},
            dataType: 'json',
            cache: false,
            success:function (data){
                if(data.code=='0001000'){
//                    console.log(data.data.money);
                    var tel=data.data.telephone;
                    var hr = Handlebars.compile($("#hr").html());
                    var html = hr(data.data);
                    $('#hr_name').html(html);
                    var money=data.data.money;
                    $("#money").html(money);
//                    Reset.getdoms(tel);


                }
                if (data.code=='0001101'){
                    console.log(data.msg);
                }

            }
        });
        var changes={tip:null};
        function center(center) {
            var map = new AMap.Map("container", {
                resizeEnable: true,
                zoom:11,
                center:JSON.parse('['+center+']')
            });
            var placeSearchOptions = { //构造地点查询类
                pageSize: 5,
                pageIndex: 1,
                city: "021" //城市
            };
            var placeSearch = new AMap.PlaceSearch(placeSearchOptions);
            //关键字查询，您如果想修改结果展现效果，请参考页面：http://lbs.amap.com/fn/css-style/
            $("#tipinput").on("input propertychange",function () {
//        alert("111");
                changes.tip=$("#tipinput").val();
                $("#cx_btn").click();
            })
            $("#cx_btn").on("click",function () {
                placeSearch.search(changes.tip, callback);
            })
            var placeSearchRender=new Lib.AMap.PlaceSearchRender();
            function callback(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    placeSearchRender.autoRender({
                        placeSearchInstance: placeSearch,
                        methodName: "search",
                        methodArgumments: ["安徽莫名集团", callback],
                        data: result,
                        map: map
//                panel: "panel"
                    });
                }
            }

            AMap.plugin('AMap.Geocoder',function(){
                var geocoder = new AMap.Geocoder({
//            city: "010"//城市，默认：“全国”
                });
                var marker = new AMap.Marker({
                    map:map,
                    bubble:true
                })
                var input = document.getElementById('tipinput');
                input.onchange = function(e){
                    var address = input.value;
                    geocoder.getLocation(address,function(status,result){
                        if(status=='complete'&&result.geocodes.length){
//                    alert(result.geocodes[0].location);
                            var contire=result.geocodes[0].location.lng+','+result.geocodes[0].location.lat;
                            console.log(contire);
                            annou.coordinate=contire;

                            lnglatXY = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];
                            console.log(lnglatXY);
                            regeocoder();


                            console.log(result.geocodes[0].location.lat);
                            marker.setPosition(result.geocodes[0].location);
                            map.setCenter(marker.getPosition());
//                    document.getElementById('message').innerHTML = ''
                        }else{
//                    document.getElementById('message').innerHTML = '获取位置失败'
                        }
                    })
                }
                input.onchange();

            });
        }

        //地图加载

        //已知点坐标
        //console.log(lnglatXY);
        function regeocoder() {  //逆地理编码
            var geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress(lnglatXY, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });
            var marker = new AMap.Marker({  //加点
                map: map,
                position: lnglatXY
            });
            map.setFitView();
        }
        function geocoder_CallBack(data) {
            var province = data.regeocode.addressComponent.province; //返回地址描述省
            var county = data.regeocode.addressComponent.district; //返回地址描述区
            var city = data.regeocode.addressComponent.city; //返回地址描述市
            console.log(county);
            if (data.regeocode.addressComponent.city==''){
                $("#city").val(province);
                annou.city=province;
                annou.county=county
            }else {
                $("#city").val(city);
                annou.city=city;
                annou.county=county
            }
            $("#county").val(county);
            // document.getElementById("result").innerHTML = address;

        }



        //获取职业信息
        $.ajax({
            type: 'post',
            url:'//'+domain.hr+'/hr/company/Position/detail',
            data: {token:recruit.token,position_id:recruit.position_id},
            dataType: 'json',
            cache: false,
            success:function (data){

                if(data.code=='0001000'){
//                行业
                    $.post('//'+domain.hr+'/job/Industry/items/', function (re) {
                        if(re.code=="0001000"){
                            $.each(re.data,function (index,value) {
                                if(value.key==data.data.industry){
                                    $("#industry").val(value.value);
                                    annou.industry=value.key;
                                }
                            })

                        }
                    },"json");
//                职位
                    $.post('//'+domain.hr+'/job/Position/items/',{industry:data.data.industry}, function (re) {
                        if(re.code=="0001000"){
                            $.each(re.data,function (index,value) {
                                if(value.key==data.data.position){
                                    $("#position").val(value.value);
                                    annou.position=value.key;
                                }
                            })
                        }
                        category();
                    },"json");

                    $("#title").val(data.data.title);
                    if(data.data.coordinate!=''){
                        center(data.data.coordinate);
                    }else {
                        center("117.150446,31.86698")
                    }

//                加载参数
                    annou.salary=data.data.salary;
                    annou.nature=data.data.nature;
                    annou.experience=data.data.experience;
                    annou.education=data.data.education;
                    annou.coordinate=data.data.coordinate;
                    annou.county=data.data.county;
                    annou.city=data.data.city;

//                工资
                    if(data.data.salary==0){
                        $("#salary").val('薪资面议')
                    }else if(data.data.salary==1){$("#salary").val('3k以下')}else if(data.data.salary==2){
                        $("#salary").val('3k-5k')
                    }else if(data.data.salary==3){
                        $("#salary").val('5k-10k')
                    }else if(data.data.salary==4){
                        $("#salary").val('10k-20k')
                    }else if(data.data.salary==5){
                        $("#salary").val('20k-50k')
                    }else if(data.data.salary==6){
                        $("#salary").val('50k以上')
                    }

//                悬赏
                    $("#reward").val(data.data.reward);

//                全职/兼职
                    if(data.data.nature==0){
                        $("#nature").val('全职')
                    }else if(data.data.nature==1){$("#nature").val('兼职')}

//                城市
                    $("#city").val(data.data.city);

//                工做地点
                    $("#tipinput").val(data.data.address);

                    //                经验要求
                    if(data.data.experience==0){
                        $("#experience").val('经验不限')
                    }else if(data.data.experience==1){
                        $("#experience").val('应届生')
                    }else if(data.data.experience==2){
                        $("#experience").val('1年以内')
                    }else if(data.data.experience==3){
                        $("#experience").val('1-3年')
                    }else if(data.data.experience==4){
                        $("#experience").val('3-5年')
                    }else if(data.data.experience==5){
                        $("#experience").val('5-10年')
                    }else if(data.data.experience==6){
                        $("#experience").val('10年以上')
                    }

//                学历要求
                    if(data.data.education==0){
                        $("#education").val('学历不限')
                    }else if(data.data.education==1){
                        $("#education").val('高中/中专')
                    }else if(data.data.education==2){
                        $("#education").val('大专')
                    }else if(data.data.education==3){
                        $("#education").val('本科')
                    }else if(data.data.education==4){
                        $("#education").val('硕士')
                    }else if(data.data.education==5){
                        $("#education").val('博士')
                    }

//                职位描述
                    $("#description").val(data.data.description)


                }
                if(data.code=='0001001'){
                    alert(data.msg);
                }
                if (data.code=='0001101'){
                    alert(data.msg);
                    //过期
                    recruit.redirect();
                }
            }
        });


        //    修改

        $("#annou2").on("click",function () {
            test2();
            if($("#industry").val()!=""&&$("#position").val()!=""&&$("#title").val()!=""&&$("#salary").val()!=""&&$("#reward").val()!=""&&$("#nature").val()!=""&&$("#city").val()!=""&&$("#tipinput").val()!=""&&$("#experience").val()!=""&&$("#education").val()!=""&&matchTest.regular.che.test($("#city").val())){
                if($('#tipinput').val().length>5){
                    $("#releases").ajaxSubmit({
                        url:'//'+domain.hr+'/hr/company/Position/edit',
                        type: "POST",
                        data:{token:recruit.token,position_id:recruit.position_id,industry:annou.industry,position:annou.position,salary:annou.salary,nature:annou.nature,experience:annou.experience,education:annou.education,coordinate:annou.coordinate,county:annou.county,city:annou.city},
                        success: function(msg) {

                            var data = $.parseJSON(msg);
                            if(data.code=="0001000"){

                                alert("修改成功")
                            }
                            if(data.code=="0001001"){
                                console.log("上传错误");

                            }

                        },
                        error: function(msg) {
                            console.log("出错了");
                        }
                    });
                }else {
                    $(".spa24").text("请输入办公地址,不能少于5个字符");
                }


            }
        });


        //  职位类别
        function category() {

        }


        $("#co-img").on("click",function () {
            $.ajax({
                type: 'post',
                url:'//'+domain.hr+'/user/login/loginout',
                data: {token:recruit.token},
                dataType: 'json',
                cache: false,
                success:function (data){
                    console.log(data)
                    if(data.code=='0301200'){
                        window.location.href='/index.html'
                    }
                    if(data.code=='0301100'){
                        alert(data.msg)
                    }
                    if(data.code=='0001101'){
                        alert(data.msg)
                    }
                }
            });
        })


        $("#hradmin").on("click",function () {
            window.location.href='manage/position.html'
        })
        $("#hrcenctrol").on("click",function () {
            window.location.href='manage/personal.html'
        })
        $("#hrmanagement").on("click",function () {
            window.location.href='manage/resume.html'
        })


        _this.HrAngg();


    },
    category:function () {
        $('[name="nice-select-2"]').click(function(e){
            $('[name="nice-select-2"]').find('ul').hide();
            $(this).find('ul').show();
            e.stopPropagation();
        });
        $('[name="nice-select-2"] li').hover(function(e){
            $(this).toggleClass('on');
            e.stopPropagation();
        });
        $('[name="nice-select-2"] li').click(function(e){
            var val = $(this).text();
            $(this).parents('[name="nice-select-2"]').find('input').val(val);
            $('[name="nice-select-2"] ul').hide();
            annou.position=$(this).attr("data-value");
            e.stopPropagation();
        });
        $(document).click(function(){
            $('[name="nice-select-2"] ul').hide();
        });
    },
    HrAngg:function() {
        var _this=this;
        $("#go_home").on("click",function () {
            window.location.href='manage/position.html'
        })

//行业列表
        $.post('//'+domain.hr+'/job/Industry/items/', function (re) {
            if(re.code=="0001000"){
                var options=re.data;
                for(var i=0;i<re.data.length;i++){
                    var ulist='<li data-value="'+options[i].key+'">'+options[i].value+'</li>';
                    $("#wrap-list").append(ulist);

                }
                option();
            }
        },"json");

//职位列表

        function position() {
            $.post('//'+domain.hr+'/job/Position/items/',{industry:annou.key}, function (re) {
                if(re.code=="0001000"){
                    var options=re.data;
                    for(var s=0;s<re.data.length;s++){
                        var ulist='<li data-value="'+options[s].key+'">'+options[s].value+'</li>';
//                $("#wrap-position").empty("li");
                        $("#wrap-position").append(ulist);
                    }
                }
                _this.category();
            },"json");
        }

//  显示列表
        function option() {
            $('[name="nice-select"]').click(function(e){
                $('[name="nice-select"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select"]').find('input').val(val);
                $('[name="nice-select"] ul').hide();
                annou.key=$(this).attr("data-value");
                annou.industry=$(this).attr("data-value");
                position();
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select"] ul').hide();
            });

        }


        //  薪资要求
        salary();
        function salary() {
            $('[name="nice-select-3"]').click(function(e){
                $('[name="nice-select-3"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-3"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-3"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-3"]').find('input').val(val);
                $('[name="nice-select-3"] ul').hide();
                annou.salary=$(this).attr("data-value");
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-3"] ul').hide();
            });
        }

//    兼职全职
        nature();
        function nature() {
            $('[name="nice-select-4"]').click(function(e){
                $('[name="nice-select-4"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-4"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-4"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-4"]').find('input').val(val);
                $('[name="nice-select-4"] ul').hide();
                annou.nature=$(this).attr("data-value");
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-4"] ul').hide();
            });
        }

//    经验要求
        experience();
        function experience() {
            $('[name="nice-select-5"]').click(function(e){
                $('[name="nice-select-5"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-5"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-5"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-5"]').find('input').val(val);
                $('[name="nice-select-5"] ul').hide();
                annou.experience=$(this).attr("data-value");
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-5"] ul').hide();
            });
        }

//  学历要求
        education();
        function education() {
            $('[name="nice-select-6"]').click(function(e){
                $('[name="nice-select-6"]').find('ul').hide();
                $(this).find('ul').show();
                e.stopPropagation();
            });
            $('[name="nice-select-6"] li').hover(function(e){
                $(this).toggleClass('on');
                e.stopPropagation();
            });
            $('[name="nice-select-6"] li').click(function(e){
                var val = $(this).text();
                $(this).parents('[name="nice-select-6"]').find('input').val(val);
                $('[name="nice-select-6"] ul').hide();
                annou.education=$(this).attr("data-value");
                e.stopPropagation();
            });
            $(document).click(function(){
                $('[name="nice-select-6"] ul').hide();
            });
        }
    }
}



//公用
function test() {
    $("textarea").blur(function(){
        if($(this).is("#description")){
                $(".spa27").text("");
        }

        if($(this).is("#introduction")){
            if($("#introduction").val()==""){
                if(!$("#introduction").val()){
                    $(".spa16").text("请填写公司简介");
                    return false;
                }
            }else{
                $(".spa16").text("");
            }
        }
    })
    $("textarea").focus(function(){
        if($(this).is("#description")){
            $(".spa27").text("请填写职位描述").css("color","#ff6900");
        }

        if($(this).is("#introduction")){
            $(".spa16").text("请填写公司简介").css("color","#ff6900");
        }
    })
    /************************  失焦判断  **********************************/
    $("input").blur(function(){
        //    约面试
        $("#mstel").css("border","1px solid #fff");

        if($(this).is("#intime")){
            if($("#intime").val()==""){
                if(!$("#intime").val()){
                    $(".spa32").text("请选择面试时间");
                    return false;
                }
            }else{
                $(".spa32").text("");
            }
        }

        if($(this).is("#msadd")){

            if($("#msadd").val()==""){
                if(!$("#msadd").val()){
                    $(".spa33").text("请输入面试地点");
                    return false;
                }
            }else{
                $(".spa33").text("");
            }
        }

        if($(this).is("#mspeople")){

            if($("#mspeople").val()==""){
                if(!$("#mspeople").val()){
                    $(".spa34").text("请输入联系人");
                    return false;
                }
            }else{
                $(".spa34").text("");
            }
        }

        if($(this).is("#mstel")){            //手机号判断
            if($("#mstel").val()!=""){
                if(!(matchTest.regular.tel.test($("#mstel").val()))){
                    $(".spa35").text("联系方式输入有误");
                    $(this).css("border","1px solid #ff6900");
                    return false;
                }else if(matchTest.regular.tel){
                    $(".spa35").text("");
                    return true;
                }
            }else{
                $(".spa35").text("");
            }
        }



        //企业信息业
        $("#fullname").css("border","1px solid #fff");
        $("#shortname").css("border","1px solid #fff");
        $("#address").css("border","1px solid #fff");

        if($(this).is("#fullname")){            //公司判断

            if($("#fullname").val()==""){
                if(!$("#fullname").val()){
                    $(".spa11").text("请输入公司全称");
                    return false;
                }
            }else{
                $(".spa11").text("");
            }
        }

        if($(this).is("#shortname")){            //公司简称判断
            if($("#shortname").val()==""){
                if(!$("#shortname").val()){
                    $(".spa12").text("请输入公司简称");
                    return false;
                }
            }else{
                $(".spa12").text("");
            }
        }

        if($(this).is("#headcount_other")){            //公司规模判断
            if($("#headcount_other").val()==""){
                if(!$("#headcount_other").val()){
                    $(".spa13").text("请选择公司规模");
                    return false;
                }
            }else{
                $(".spa13").text("");
            }
        }

        if($(this).is("#industry_other")){            //从事行业判断
            if($("#industry_other").val()==""){
                if(!$("#industry_other").val()){
                    $(".spa14").text("请选择从事行业");
                    return false;
                }
            }else{
                $(".spa14").text("");
            }
        }

        if($(this).is("#address")){            //公司判断
            if($("#address").val()==""){
                if(!$("#address").val()){
                    $(".spa15").text("请输入公司地址");
                    return false;
                }
            }else{
                $(".spa15").text("");
            }
        }

        //个人中心页

        if($(this).is("#money_input")){

            if($("#money_input").val()!=""){
                if(!(matchTest.regular.num.test($("#money_input").val()))){
                    $(".spa31").text("请输入数字");
                    return false;
                }else if(matchTest.regular.num){
                    $(".spa31").text("");
                    return true;
                }
            }else{
                $(".spa31").text("");
            }
        }




        //发布/修改页
        $("#title").css("border","1px solid #fff");
        $("#reward").css("border","1px solid #fff");
        $("#city").css("border","1px solid #fff");
        $("#tipinput").css("border","1px solid #fff");

        //1
        if($(this).is("#industry")){
            if($("#industry").val()==""){
                if(!$("#industry").val()){
                    $(".spa17").text("请选择行业名称");
                    return false;
                }
            }else{
                $(".spa17").text("");
            }
        }

        //2
        if($(this).is("#position")){
            if($("#position").val()==""){
                if(!$("#position").val()){
                    $(".spa18").text("请选择职位类别");
                    return false;
                }
            }else{
                $(".spa18").text("");
            }
        }

        //3
        if($(this).is("#title")){

            if($("#title").val()==""){
                if(!$("#title").val()){
                    $(".spa19").text("请输入职位");
                    return false;
                }
            }else{
                $(".spa19").text("");
            }
        }

        //4
        if($(this).is("#salary")){
            if($("#salary").val()==""){
                if(!$("#salary").val()){
                    $(".spa20").text("请选择薪资");
                    return false;
                }
            }else{
                $(".spa20").text("");
            }
        }

        //5
        if($(this).is("#reward")){

            if($("#reward").val()==""){
                if(!$("#reward").val()){
                    $(".spa21").text("请填写悬赏内容");
                    return false;
                }
            }else{
                $(".spa21").text("");
            }
        }

        //6
        if($(this).is("#nature")){
            if($("#nature").val()==""){
                if(!$("#nature").val()){
                    $(".spa22").text("请选择工作性质");
                    return false;
                }
            }else{
                $(".spa22").text("");
            }
        }

        //7
        if($(this).is("#city")){

            if($("#city").val()!=""){
                if(!(matchTest.regular.che.test($("#city").val()))){
                    $(".spa23").text("请输入工作城市,不能包含英文、空格或特殊字符");
                    return false;
                }else if(matchTest.regular.che){
                    $(".spa23").text("");
                    return true;
                }
            }else{
                $(".spa23").text("");
            }
        }

        //8
        if($(this).is("#tipinput")){

            if($("#tipinput").val()==""){
                if(!$("#tipinput").val()){
                    $(".spa24").text("请输入办公地址,不能少于5个字符");
                    return false;
                }
            }else{
                $(".spa24").text("");
            }
        }

        //9
        if($(this).is("#experience")){
            if($("#experience").val()==""){
                if(!$("#experience").val()){
                    $(".spa25").text("请选择工作年限");
                    return false;
                }
            }else{
                $(".spa25").text("");
            }
        }

        //10
        if($(this).is("#education")){
            if($("#education").val()==""){
                if(!$("#education").val()){
                    $(".spa26").text("请选择学历");
                    return false;
                }
            }else{
                $(".spa26").text("");
            }
        }
    })
    /********************** 聚焦提示 ************************/
    $("input").focus(function(){
        //    约面试
        if($(this).is("#intime")){
            $(".spa32").text("请选择面试时间").css("color","#ff6900");

        }
        if($(this).is("#msadd")){
            $(".spa33").text("请输入面试地点").css("color","#ff6900");

        }
        if($(this).is("#mspeople")){
            $(".spa34").text("请输入联系人").css("color","#ff6900");

        }
        if($(this).is("#mstel")){
            $(".spa35").text("请输入联系方式").css("color","#ff6900");

        }




        //企业信息页
        if($(this).is("#fullname")){
            $(".spa11").text("请填写公司全称").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }

        if($(this).is("#shortname")){
            $(".spa12").text("请填写公司简称").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }

        if($(this).is("#headcount_other")){
            $(".spa13").text("请选择公司规模").css("color","#ff6900");

        }

        if($(this).is("#industry_other")){
            $(".spa14").text("请选择从事行业").css("color","#ff6900");

        }

        if($(this).is("#address")){
            $(".spa15").text("请填写公司地址").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }





        //发布/修改页
        if($(this).is("#industry")){
            $(".spa17").text("请选择行业名称").css("color","#ff6900");

        }
        if($(this).is("#position")){
            $(".spa18").text("请选择职位类别").css("color","#ff6900");

        }

        if($(this).is("#title")){
            $(".spa19").text("请输入职位").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }

        if($(this).is("#salary")){
            $(".spa20").text("请选择薪资").css("color","#ff6900");

        }

        if($(this).is("#reward")){
            $(".spa21").text("请输入悬赏内容").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }

        if($(this).is("#nature")){
            $(".spa22").text("请选择工作性质").css("color","#ff6900");
        }

        if($(this).is("#city")){
            $(".spa23").text("请输入工作城市,不能包含英文、空格或特殊字符").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }

        if($(this).is("#tipinput")){
            $(".spa24").text("请输入办公地址,不能少于5个字符").css("color","#ff6900");
            $(this).css("border","1px solid #ff6900")
        }

        if($(this).is("#experience")){
            $(".spa25").text("请选择工作年限").css("color","#ff6900");
        }

        if($(this).is("#education")){
            $(".spa26").text("请选择学历").css("color","#ff6900");
        }

    //个人中心页

        if($(this).is("#money_input")){
            $(".spa31").text("请输入充值金额").css("color","#ff6900");
            // $(this).css("border","1px solid #ff6900")
        }




    })
}
function test2() {
    //企业页
    if($("#fullname").val()==""){
        $(".spa11").text("请输入公司全称");
    }

    if($("#shortname").val()==""){
        $(".spa12").text("请输入公司简称");
    }

    if($("#headcount_other").val()==""){
        $(".spa13").text("请选择公司规模");
    }

    if($("#industry_other").val()==""){
        $(".spa14").text("请选择从事行业");
    }

    if($("#address").val()==""){
        $(".spa15").text("请输入公司地址");
    }

    if($("#introduction").val()==""){
        $(".spa16").text("请输入公司简介");
    }







    //发布/修改页
    if($("#industry").val()==""){
        $(".spa17").text("请选择行业名称");
    }

    if($("#position").val()==""){
        $(".spa18").text("请选择职位类别");
    }

    if($("#title").val()==""){
        $(".spa19").text("请输入职位");
    }

    if($("#salary").val()==""){
        $(".spa20").text("请选择薪资");
    }
    if($("#reward").val()==""){
        $(".spa21").text("请输入悬赏内容");
    }
    if($("#nature").val()==""){
        $(".spa22").text("请选择工作性质");
    }

    if($("#city").val()==""){
        $(".spa23").text("请输入工作城市,不能包含英文、空格或特殊字符");
    }
    if($("#tipinput").val()==""){
        $(".spa24").text("请输入办公地址,不能少于5个字符");
    }
    if($("#experience").val()==""){
        $(".spa25").text("请选择工作年限");
    }
    if($("#education").val()==""){
        $(".spa26").text("请选择学历");
    }


}







