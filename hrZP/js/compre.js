/**
 * Created by Administrator on 2017/4/6 0006.
 */
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

//登录页

Login = {
    init: function(){

        var _this = this;
        _this.test();
        $("#username").on('input propertychange', function() {
            _this.isAllow();

        });
        $("#password").on('input propertychange', function() {
            _this.isAllow();
        });
//            提交验证
        $("#js-login").click(function(){
            if(matchTest.regular.ph.test($("#username").val())&&matchTest.regular.ps.test($("#password").val())){
                _this.goLogin();
                return true;
            }else{
                if($("#username").val()==""){
                    $(".spa2").text('请你填写手机号')
                }
                if($("#password").val()==""){
                    $(".spa3").text('请你填写密码')
                }
                return false;
            }
        })


        $("#to_register").on("click",function () {
            window.location.href = 'pages/register.html'
        })

        $("#to_retrieve").on("click",function () {
            window.location.href = 'pages/retrieve.html'
        })
//            $("#js-login").on("click",function(){
//                if($(this).hasClass("disabled")){return;}
////                _this.test();
//
//            })
    },

    isAllow: function(){
        this.getdom();

    },
    goLogin: function(){
        var _this = this;
        if(!this.token){ this.token = getToken()}
        $.ajax({
            type:"post",
            url:'//'+domain.hr+'/user/login/telpas',
            data:{'token':_this.token,'telphone':_this.mobile,'password':_this.password},
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            async:false,
            dataType: 'json',
            success:function(re){
                if(re.code=="0301200"){

                    if (recruit.storage) {
                        localStorage.token = re.data.token;
                        // console.log(localStorage.token);
                    } else {
                        $.cookie('token', re.data.token, {expires: 360, path: '/'});
                        alert($.cookie('token'));
                    }

                    _this.checkIdentity(re.data.token);

                    var arry = arry||[];
                    arry = [re.data.token,re.data.user_id,re.data.is_login];
                    // console.log(arry);
                    localStorage.setItem("userInfo", arry);
                    localStorage.setItem("eUid", re.data.encrypt_uid);
//                    setTimeout(function(){
//                        if(window.history.length>1){
//                            window.history.go(-1)
//                        }else{
//                            window.location.href = localStorage.getItem("lastUrl");
//                        }
//                    },1500)
                }
                if (re.code='0301108'){
                    $(".spa3").text(re.msg);
                }
            }
        });

    },
    getdom: function(){
        this.mobile = $("#username").val();
        this.password = $("#password").val();
    },
    test: function(){

        window.onload=function(){
            $("#username").focus()
        }
        /************************  失焦判断  **********************************/
        $("input").blur(function(){
            $("#username").css("border","1px solid #fff");
            $("#password").css("border","1px solid #fff");

            if($(this).is("#username")){            //手机号判断

                if($("#username").val()!=""){
                    if(!(matchTest.regular.ph.test($("#username").val()))){
                        $(".spa2").text("请输入正确手机号");
                        $(this).css("border","1px solid #ff6900");
                        return false;
                    }else if(matchTest.regular.ph){
                        $(".spa2").text("");
                        return true;
                    }
                }else{
                    $(".spa2").text("");
                }
            }

            if($(this).is("#password")){            //密码判断

                if($("#password").val()!=""){
                    if(!(matchTest.regular.ps.test($("#password").val()))){
                        $(".spa3").text("请输入正确的密码");
                        $(this).css("border","1px solid #fff");
                        return false;
                    }else if(matchTest.regular.ps){
                        $(".spa3").text("");
                        return true;
                    }
                }else{
                    $(".spa3").text("");

                }
            }
        })
        /********************** 聚焦提示 ************************/
        $("input").focus(function(){
            if($(this).is("#username")){
                $(this).append()
                $(".spa2").text("11位手机号码").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }
            if($(this).is("#password")){
                $(".spa3").text("最少6个字符（字母或数字）").css("color","#ff6900");
                $(this).css("border","1px solid #ff6900")
            }
        })


    },
    checkIdentity: function(token) {
        var _this = this;
        _this.result(token);
        //return

        return true;
    },


    result: function(token) {
        var _this = this;
        $.ajax({
            type:"post",
            url:'//'+domain.hr+'/hr/company/Review/status',
            data:{'token':token},
            dataType: 'json',
            success:function(re){

                if(re.data == null){
                    _this.redirect(0);
                }
                if(re.data.status == '1'){
                    _this.simple(token);
                }else if(re.data.status == '-1'){
                    _this.redirect(-2);
                    return;
                }else if(re.data.status == '2'){
                    _this.redirect(2);
                }else if(re.data.status == '3'){
                    _this.redirect(1)
                }else {
                    _this.redirect(0)
                }
            }
        });
        return true;
    },

    simple: function(token) {
        var _this=this;
        $.ajax({
            type:"post",
            url:'//'+domain.hr+'/hr/user/Company/simple',
            data:{'token':token},
            dataType: 'json',
            success:function(re){
                switch(re.code)
                {
                    case '0001000':
                        _this.redirect(1);
                        break;
                    case '0001002':
                        _this.redirect(0);
                        break;
                    default:
                        _this.redirect(-1);
                }
            }
        });
    },

    redirect: function(condition) {
        switch(condition)
        {
            case 1:
                window.location.href = '/pages/manage/resume.html';
                break;
            case -2:
                window.location.href = 'pages/result.html';
                break;
            case 2:
                window.location.href = 'pages/review.html';
                break;
            case 0:
                window.location.href = '/pages/enter.html';
                break;
            default:
                window.location.href = '/index.html';
        }
        return true;
    }
}

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

//企业信息页   待修改
HrAudit = {
    init:function () {

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







