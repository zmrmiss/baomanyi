//初始化
$(function(){

    $(".share-close").on("tap",function(){
        $(this).parents('.share-bar').hide();
    })
    $(".manager-photo").error(function(){
        $(this).attr('src',"../../public/images/public/default_avator_img.png");
    });
    $(".honour-list-img").error(function(){
        $(this).attr('src',"../../public/images/public/img_load.png");
    });
    $(".input-reset").on("tap",function(){
        $(this).closest(".control-input").find("input").val("")
    });

    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)&&typeof(bmy)!='undefined') {
        window.webkit.messageHandlers.bmy.postMessage(null)
    } else if (navigator.userAgent.match(/android/i)&&typeof(bmy)!='undefined') {
        window.bmy.postMessage();
    }
})

;(function ($) {
    var a = 'var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");';
    var b = "%3Cspan id='cnzz_stat_icon_1260920083'%3E%3C/span%3E%3Cscript src='"
    var c = "+ cnzz_protocol +";
    var d = "s4.cnzz.com/z_stat.php%3Fid%3D1260920083' type='text/javascript'%3E%3C/script%3E"
    window.CNZZ = '<div class="cnzz"><script type="text/javascript">'+a+'document.write(unescape("'+b+'" '+c+' "'+d+'"));'+'</script></div>';

    window.LoadAnimate = '<div class="loading"><div class="loading-img"></div><div class="loadding-word">加载中...</div></div>';
})(Zepto);

//点赞动效
;(function ($) {
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
})(Zepto);


//分享注册
function Register(options){
    var _default = {
        token: 0,
        referrer_id: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }

    var _this = this;
    $("#register").on("tap",function(){
        _this.getdom();
        _this.test();
    })
    $(".get-code").on("tap",function(){
        if($(this).attr("disabled")=="disabled"){return;}
        $(this).attr("disabled","disabled");
        $.showIndicator();
        _this.sendmsg();
    })
}

Register.prototype = {
    sendmsg: function(){
        var _this = this;
        if(!matchTest.regularList['mobile'].test($("#phone-num").val())){
            $.hideIndicator();
            popAlert(matchTest.errorMsg['mobile']);
            $(".get-code").removeAttr("disabled");
            return;
        }
        console.log(_this.adurl);
        $.post('//'+domain.cp+'/sms/send',{token:_this.token,telphone:$("#phone-num").val(),smstype:'reg',referrer_id:_this.referrer_id}, function (re) {
            $.hideIndicator();

            $(".get-code").removeAttr("disabled");
            // popAlert(re.msg);
            //写入弹框
            if(re.code=="0002100"){
                popAlert("发送短信验证码失败")
            }
            if(re.code=="0002200"){
                popAlert("发送短信验证码成功。请注意查收")
            }
            if(re.code=="0002700"){
                $(".reg-aler").show();
                $(".ret-tap-colse").on("tap",function () {
                    $(".reg-aler").hide();
                })
                $(".ret-tap-down").on("tap",function () {
                    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.moming.baomanyi";
                    } else if (navigator.userAgent.match(/android/i)) {
                        window.location.href = _this.adurl
                    }
                })
                console.log("已注册");
            }

        },'json');
    },
    getdom: function(){
        this.mobile = $("#phone-num").val();
        this.code = $("#yzm").val();
        this.password = $("#password").val();
    },
    test: function(){
        if(!this.isMobileNum(this.mobile)){
            popAlert("请输入正确的手机号");
            return;
        }
        if(!this.isSmsCode(this.code)){
            popAlert("请输入正确的验证码");
            return;
        }
        if(!this.isPassWord(this.password)){
            popAlert("请输入6-16位密码");
            return;
        }
        this.reg();
    },
    isMobileNum: function(n){
        return /^\d{11}$/.test(n) && parseInt(n)>0;
    },
    isSmsCode: function(n){
        return /^\d{4}$/.test(n);
    },
    isPassWord: function(n){
        return /^[^\s]{6,16}$/.test(n);
    },
    reg: function(){
        var _this = this;
        this.regJson = {
            token: _this.token,
            telphone: this.mobile,
            password: $("#password").val(),
            tel_code: $("#yzm").val(),
            referrer_id: this.referrer_id,
            source:1,
            share_type: 3,
            openid:_this.openid
        }
        $.post('//'+domain.jc+'/user/login/register',_this.regJson, function (re) {
            if(re.code=='0301102'){
                popAlert(re.msg);
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.moming.baomanyi"
            }else{
                popAlert(re.msg);
                $("#yzm").val("");
                $("#password").val("");
            }
        },'json');
    }
}


//分享之后下载应用
function OpenApp(options) {
    var _default = {
        token: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    this.getData();
}

OpenApp.prototype = {
    getType: function(){
        if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            return "1";
        } else if (navigator.userAgent.match(/android/i)) {
            return "2";
        }
    },
    getData: function(){
        var _this = this;
        $.post('//'+domain.jc+'/user/setting/geth5register/', function (re) {
            if(re.code=='0001000'){
                if(_this.getType()==1){
                    window.location = re.data.ios_url
                }else if(_this.getType()==2){
                    window.location = re.data.apk_url
                }
            }
        },'json');
    }
}

//发送短信
function sendMessage(opt){
    var _defaults = {
        mobliephone: $("#reg-phone"),
        btnSendCode: $("#send-code"),
        count: '60',
        curCount: -1,
        InterValObj: null,
        type:'reg',
        token:null,
        div:false
    }
    var options = $.extend({}, _defaults, opt);
    for (var name in options){
        this[name] = options[name];
    }
    this.btnSendCode.attr("disabled", "disabled");
    this.getData();
}

sendMessage.prototype = {
    getData:function(){
        var _this = this;
        //发送手机验证码
        if(!matchTest.regularList['mobile'].test(this.mobliephone.val())){
            popAlert(matchTest.errorMsg['mobile']);
            this.btnSendCode.removeAttr("disabled");
            return;
        }
        var flag=1;
        //验证成功
        if(flag){
            flag=0;
            $.post('//'+domain.cp+'/sms/send',{token:_this.token,telphone:_this.mobliephone.val(),smstype:_this.type},function(re){
                if(re.code=='0002200')
                {
                    flag=1;
                    popAlert(re.msg);
                    _this.curCount = parseInt(_this.count);
                    _this.btnSendCode.attr("disabled", "disabled").css("background","#adb5c1");
                    _this.type=='consult'||_this.div?_this.btnSendCode.html( _this.curCount + "s"):_this.btnSendCode.val( _this.curCount + "s");
                    _this.InterValObj = window.setInterval(function(){
                        _this.setRemainTime.call(_this)
                    }, 1000); //启动计时器，1秒执行一次

                }else{
                    _this.btnSendCode.removeAttr("disabled");
                    popAlert(re.msg);
                }
            },'json');
        }
    },
    setRemainTime:function() {
        if (this.count == 0) {
            window.clearInterval(this.InterValObj);//停止计时器
            this.btnSendCode.removeAttr("disabled").removeAttr("style");//启用按钮
            this.type=='consult'||this.div?this.btnSendCode.html("重发"):this.btnSendCode.val("重发");
        }
        else if(this.count>0){
            this.count--;
            this.type=='consult'||this.div?this.btnSendCode.html(this.count + "s"):this.btnSendCode.val(this.count + "s");
        }
    }
}


//提示tips
function popAlert(msg){
    if($(".pop-tips").length>0){
        $(".pop-tips").remove();
    }
    var popPanel = $('<div class="pop-tips">'+msg+'</div>');

    if($(".pop-tips").length<=0){
        $("body").append(popPanel);
    }
    var wth = parseInt($(".pop-tips").width()+40);
    var clientW = $(window).width()*0.9;
    wth = wth>clientW?clientW:wth;
    popPanel.css({
        width:wth,
        marginLeft:wth/(-2),
        left: '50%'
    });
    setTimeout(function(){
        popPanel.remove();
    },2000);
}

//弹窗（功能不全可用popUp）
function popCommon(title,msg,sure){
    var s = sure||"我知道了";
    var popPanel = $('<div class="pop-modal2"><p>'+msg+'</p><div class="pop-close">'+s+'</div></div>');
    var mask = $('<div class="mask-layer"></div>');
    if($(".pop-modal2").length<=0){
        if($(".mask-layer").length>0){mask=""}
        $("body").append(popPanel,mask);
    }
    $(".mask-layer").css("display","block")
    $("#closed").on("tap",function(){
        $(".pop-modal2").remove();
        $(".mask-layer").remove();
    })
}

//新车询价成功提示
function popSuccess(type){
    var popPanel;
    var title = type==1?"询价成功！":"申请试驾成功！";

    if(type==1||type==2){
        popPanel = $('<div class="pop-modal2"><div class="pop-status-pass"></div><h2>'+title+'</h2><p>恭喜您，申请成功！稍后将有专业的汽车顾问为您服务，请保持手机畅通。</p><div class="pop-close2"></div></div>');
    }

    if(type==3){
        popPanel = $('<div class="pop-modal2"><div class="pop-status-pass"></div><div class="passage text-left"><span class="color-FF6900">'+$("#username").val()+'</span>您好！<br>您已向保满意平台成功发送免费投保咨询</div><div class="passage text-left">感谢您使用保满意，稍后将有专业的客服人员为您服务，请保持手机畅通！</div><div class="pop-close2"></div></div>');
    }

    var mask = $('<div class="mask-layer"></div>');
    if($(".pop-modal2").length<=0){
        $("body").append(popPanel,mask);
    }
    $(".mask-layer").css("display","block")
    $(".pop-close2").on("tap",function(){
        $(".pop-modal2").remove();
        $(".mask-layer").remove();
    })
}

//通用弹窗方法
function popUp(options){
    var _p = new _popUp(options);
    return _p.init();
}

function _popUp(options){
    var _default = {
        title:null,
        isClose:false,
        btnLeft:"btn-grey js-close",//js-close用于关闭窗口钩子
        btnRight:"btn-orange",
        leftWord:"取消",
        rightWord:"确定",
        msgText:"服务器繁忙，请稍后再试！",
        msgAlign:"text-center",
        otherContent:""
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

_popUp.prototype = {
    init: function(){
        this.dom();
        this.event();
    },
    dom: function(){
        this.head = this.title?$('<div class="pop-title">'+this.title+'</div>'):'';
        this.close = this.isClose?$('<div class="pop-close-icon"><i class="iconfont icon-close"></i></div>'):'';
        this.left = this.btnLeft?$('<div class="'+this.btnLeft+'">'+this.leftWord+'</div>'):'';
        this.right = this.btnRight?$('<div class="'+this.btnRight+'">'+this.rightWord+'</div>'):'';
        this.btn = $('<div class="flex-wrap completion"></div>');
        this.btn.append(this.left,this.right);
        this.msg = $('<div class="passage '+this.msgAlign+'">'+this.msgText+'</div>');
        this.container = $('<div class="pop-modal"></div>');
        this.container.append(this.head,this.close,this.msg,this.otherContent,this.btn);
        this.mask = $('<div class="mask-layer"></div>');
        this.mask.css("display","block");
        if($(".pop-modal").length<=0){
            $("body").append(this.container,this.mask);
        }
    },
    event: function(){
        $(".pop-close-icon,.js-close").on("tap",function(){
            $(".mask-layer").remove();
            $(".pop-modal").remove();
        })
    }
}


//判断是否为微信浏览器
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

//显示默认头像
function defaultAvator(selector){
    $(selector).error(function(){
        $(this).attr('src',"../../public/images/public/default_avator_img.png");
    });
}

//输入字数限制
function countChar(textareaName,spanName){
    if(parseInt($(textareaName).val().length)<=150){
        $(spanName).html(150-parseInt($(textareaName).val().length));
    }else{
        $(spanName).html("0");
    }
}

//时间戳转换成日期
function getLocalTime(unix) {
    var date = new Date(parseInt(unix)*1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return(Y+M+D+h+m);
}


//获取日期
function nowDate(i) {
    var date = new Date();
    date = new Date(date.valueOf() + i*24*60*60*1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return(Y+M+D);
}

//可控日期选择
var ctrlDate = {
    getDays: function(max) {
        var days = [];
        for(var i=1; i<= (max||31);i++) {
            days.push(i < 10 ? "0"+i : i);
        }
        return days;
    },
    initMonthes: ('01 02 03 04 05 06 07 08 09 10 11 12').split(' '),
    getDaysByMonthAndYear: function(month, year) {
        var int_d = new Date(year, parseInt(month)+1-1, 1);
        var d = new Date(int_d - 1);
        return ctrlDate.getDays(d.getDate());
    },
    initYears: function (min,max) {
        var arr = [];
        for (var i = min; i <= max; i++) { arr.push(i); }
        return arr;
    }
}

//出生日期计算
function birtday(age,unit){
    var date = new Date();
    if(unit=="year"){
        var Y = date.getFullYear() - age + "-";
        var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
    }else if(unit=="day"){
        date = new Date(date.valueOf()-age*24*60*60*1000);
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate()<10 ? '0'+date.getDate() : date.getDate();
    }

    return(Y+M+D);
}

//获取token
function getToken(){
    var r;
    $.ajax({
        type: "POST",
        url: '//'+domain.jc+'/user/get_token',
        data: {guid:'imei',user_id:0},
        dataType: "json",
        async: false,
        success: function(re){
            r = re.code == "0001200"?re.data:0
        }
    })
    return r;
}

//获取openid
function getOpenid(code){
    var id;
    $.ajax({
        type: "POST",
        url: '//'+domain.jc+'/user/Getclient/getwechatInfo',
        data: {code:code},
        dataType: "json",
        async: false,
        success: function(re){
            id = re.code == "0001000"?re.data.wechat_openid:0
        }
    })
    return id;
}


//计算当前年龄
function calAge(num,type){
    if(type=="1"){//身份证
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - num.substring(6, 10) - 1;
        if (num.substring(10, 12) < month || num.substring(10, 12) == month && num.substring(12, 14) <= day) {
            age++;
        }
        return age;
    }else if(type=="2"){//时间
        var date = num.split("-");
        var myDate = new Date();
        var month = myDate.getMonth() + 1;
        var day = myDate.getDate();
        var age = myDate.getFullYear() - date[0] - 1;
        if (date[1] < month || date[1] == month && date[2] <= day) {
            age++;
        }
        return age;
    }
}


//加减数
function Calnum(sel,min,max){
    $(".icon-plus",sel).on("tap",function(){
        var num = $("em",sel).html();
        num==max?"":num++;
        $("em",sel).html(num);
    })
    $(".icon-minus",sel).on("tap",function(){
        var num = $("em",sel).html();
        num==min?"":num--;
        $("em",sel).html(num);
    })
}


//去除汉字留数字
function toNumber(n){
    return n.match(/(\d+)/)[0];
}


//文字配置
window.BW={
    FormTitConf: {
        tip_1: "投保人",
        tip_2: "被保人",
        tip_3: "受益人", //title
        tip_4: "投保人姓名",
        tip_5: "证件类型",
        tip_6: "证件号码",
        tip_7: "手机号码",
        tip_8: "电子邮箱",
        tip_9: "所在省市",
        tip_10: "详细地址",
        tip_11: "与投保人关系",
        tip_12: "被保人姓名",
        tip_13: "职业",
        tip_14: "受益人", //法定受益人
        tip_15: "保险份数",
        tip_16: "生效日期",
        tip_17: "性别",
        tip_18: "出生日期",
        tip_19: "缴费银行",
        tip_20: "缴费账号",
        tip_21: "基本保额",
        tip_22: "保险期间",
        tip_23: "交费期间",
        tip_24: "交费方式",
        tip_25: "身份证号码",
        tip_26: "邮编",
        tip_27: "身高",
        tip_28: "体重",
        tip_29: "生效日期",
        tip_30: "保费",
        tip_31: "与被保人关系",
        tip_32: "姓名",
        tip_33: "受益比例",
        tip_34: "保额"
    },
    FormPlhldrConf:{
        tip_1: "请输入投保人姓名",
        tip_2: "请选择证件类型",
        tip_3: "请输入投保人的证件号码",
        tip_4: "请输入投保人的手机号码",
        tip_5: "用于接受电子保单",
        tip_6: "请选择省市区",
        tip_7: "6-15个字",
        tip_8: "请选择关系",
        tip_9: "请输入被保人姓名",
        tip_10: "请输入被保人的证件号码",
        tip_11: "请选择职业类型",
        tip_12: "法定受益人",
        tip_13: "请选择保险生效日期",
        tip_14: "请选择性别",
        tip_15: "请选择出生日期",
        tip_16: "请选择缴费银行",
        tip_17: "请输入缴费银行账号",
        tip_18: "请填写基本保额",
        tip_19: "请选择保险期间",
        tip_20: "请选择交费期间",
        tip_21: "请输入身份证号码",
        tip_22: "请输入邮编",
        tip_23: "请输入身高",
        tip_24: "请输入体重",
        tip_25: "请选择省市",
        tip_26: "请输入姓名",
        tip_27: "请输入证件号码",
        tip_28: "请输入1-100的整数"
    },
    FormUsConf:{
        tip_1: "身份证",
        tip_2: "护照",
        tip_3: "户口本",
        tip_4: "选择证件类型",
        tip_5: "确定",
        tip_6: "本人",
        tip_7: "父亲",
        tip_8: "母亲",
        tip_9: "妻子",
        tip_10: "丈夫",
        tip_11: "儿子",
        tip_12: "女儿",
        tip_13: "雇员",
        tip_14: "选择关系",
        tip_15: "选择省市区",
        tip_16: "男",
        tip_17: "女",
        tip_18: "选择性别",
        tip_19: "其他亲属",
        tip_20: "行政业务办公人员（内勤）",
        tip_21: "工厂、企业负责人",
        tip_22: "企业经理",
        tip_23: "一般学生",
        tip_24: "家庭主妇",
        tip_25: "营业员",
        tip_26: "阳光保险代理人",
        tip_27: "杂货商",
        tip_28: "农夫",
        tip_29: "其他",
        tip_30: "学龄前儿童（小学前）",
        tip_31: "学生（18周岁以下）",
        tip_32: "父子",
        tip_33: "父女",
        tip_34: "母子",
        tip_35: "母女",
        tip_36: "夫妻",
        tip_37: "出生证明"
    },
    FormInfo:{
        tip_1: "基本信息",
        tip_2: "投保人信息",
        tip_3: "被保人信息",
        tip_4: "受益人信息",
        tip_5: "投保告知",
        tip_6: "投保申明",
        tip_7: "保障期限",
        tip_8: "合计保费",
        tip_9: "投保份数",
        tip_10: "选择投保方案",
        tip_11: "法定受益人",
        tip_12: "指定受益人",
        tip_13: "被保人与投保人为同一人",
        tip_14: "投保成功后次日零时生效",
        tip_15: "订单信息",
        tip_16: "车主信息",
        tip_17: "配送信息",
        tip_18: "投保方案",
        tip_19: "被保人信息",
        tip_20: "投保人信息",
        tip_21: "受益人"
    }
};


//正则匹配
window.matchTest = {
    regularList: {
        notEmpty: /^.+$/,
        username: /^[\u4E00-\u9FA5]{2,6}$/,
        passWord2: /^[^\s]{6,16}$/,
        passWord: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
        mobile: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/,
        yzm: /^[0-9a-zA-Z]{4}$/,
        ID: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        realname: /^[\u4E00-\u9FA5]{2,6}$/,
        companyname: /^[0-9A-Za-z\u4e00-\u9fa5]{1,50}$/,
        companyID: /^[0-9A-Za-z]{5,50}$/,
        address: /^[0-9A-Za-z\u4E00-\u9FA5^\s]{6,15}$/,
        accountMoney: /^([5-9][0-9])|([1-9]\d{2,})$/,
        IP: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
        email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
        oID: /^[0-9A-Za-z]{3,}$/,
        zipcode: /^[1-9]\d{5}(?!\d)$/,
        positiveNum: /^[1-9]\d*$/,
        telmobile:/^(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[358]\d{9})$)$/
    },
    errorMsg: {
        notEmpty: "不能为空",
        username: "姓名为2~6个字",
        passWord2: "密码为6-16位",
        passWord: "密码为6-16位数字英文组合",
        mobile: "请输入正确的手机号",
        yzm: "验证码错误",
        ID: "请输入正确的身份证号",
        realname: "请填写姓名（2-6个汉字）",
        companyname: "请正确填写公司名称",
        companyID: "请正确填写证件号",
        address: "地址为6~15个字",
        accountMoney: "请正确输入金额",
        IP: "请输入正确的IP地址",
        email: "请输入正确的邮箱地址",
        oID: "证件号不低于3位",
        zipcode: "请输入正确的邮编",
        positiveNum: "请输入正整数"
    }
}



//注册(以及重置密码)
function Reg(options){
    var _default = {
        token: 0,
        type: "reg"
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Reg.prototype = {
    init: function(){
        var _this = this;
        $("#username").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#password").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#code").on('input propertychange', function() {
            _this.isAllow();
        });
        _this.flag=0;
        $("#js-login").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            _this.type=="reg"?_this.reg():(_this.type=="updatepass"?_this.reset():"");
        })

        $(".code-btn").off("tap").on("tap",function(){
            if($(this).attr("disabled")=="disabled"){return;}
            if(!_this.token){ _this.token = getToken()}
            new sendMessage({
                token:_this.token,
                mobliephone: $("#username"),
                btnSendCode: $(".code-btn"),
                type:_this.type,
                div:true,
                count: '120'
            })
        })

        $(".user-rules .iconfont").off("tap").on("tap",function(){
            $(this).toggleClass("icon-selected");
            $(this).toggleClass("icon-unselected");
            if($(this).hasClass("icon-unselected")){
                $("#js-login").addClass("disabled")
            }else{
                $("#js-login").removeClass("disabled")
            }
            _this.isAllow();
        })
    },
    isAllow: function(){
        this.getdom();
        var value;
        if(this.type=="reg"){
            value = this.test()&&$(".user-rules .iconfont").hasClass("icon-selected")
        }else if(this.type=="updatepass"){
            value = this.test()
        }
        if(value){
            $("#js-login").removeClass("disabled");
        }else{
            $("#js-login").addClass("disabled");
        }
    },
    getdom: function(){
        this.mobile = $("#username").val();
        this.code = $("#code").val();
        this.password = $("#password").val();
    },
    test: function(){
        if(!this.isMobileNum(this.mobile)){
            return false;
        }
        if(!this.isSmsCode(this.code)){
            return false;
        }
        if(!this.isPassWord(this.password)){
            return false;
        }
        return true;
    },
    isMobileNum: function(n){
        return matchTest.regularList['mobile'].test(n);
    },
    isSmsCode: function(n){
        return matchTest.regularList['yzm'].test(n);
    },
    isPassWord: function(n){
        return matchTest.regularList['passWord2'].test(n);
    },
    reg: function(){
        var _this = this;
        if(!this.token){ this.token = getToken()}
        this.regJson = {
            token: _this.token,
            telphone: _this.mobile,
            password: _this.password,
            tel_code: _this.code,
            referrer_id: localStorage.getItem("eUid")?localStorage.getItem("eUid"):0,//推荐人用户ID
            source: localStorage.getItem("openId")?1:2,//来源
            share_type: localStorage.getItem("shareType")?localStorage.getItem("shareType"):2,//获客类型
            openid:localStorage.getItem("openId")?localStorage.getItem("openId"):""
        }
        if(!_this.flag){
            _this.flag=1;
            $.post('//'+domain.jc+'/user/login/register',_this.regJson, function (re) {
                if(re.code=='0301102'){
                    popAlert("注册成功");
                    setTimeout(function(){
                        window.history.go(-1)
                    },1500)
                }else{
                    popAlert(re.msg);
                }
                _this.flag=0;
            },'json');
        }
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
        $.post('//'+domain.jc+'/user/login/restpas',_this.regJson, function (re) {
            if(re.code=='0301200'){
                popAlert("密码修改成功");
                setTimeout(function(){
                    window.history.go(-1)
                },1500)
            }else{
                popAlert(re.msg);
                setTimeout(function(){
                    window.location.href = window.location.href
                },1500)
            }
        },'json');
    }
}

//登录
function Login(options){
    var _default = {
        token: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Login.prototype = {
    init: function(){
        var _this = this;
        $("#username").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#password").on('input propertychange', function() {
            _this.isAllow();
        });
        $("#js-login").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            _this.goLogin();
        })
    },

    isAllow: function(){
        this.getdom();
        if(this.test()){
            $("#js-login").removeClass("disabled");
        }else{
            $("#js-login").addClass("disabled");
        }
    },
    goLogin: function(){
        var _this = this;
        if(!this.token){ this.token = getToken()}
        $.post('//'+domain.jc+'/user/login/telpas',{token:_this.token,telphone:_this.mobile,password:_this.password}, function (re) {
            if(re.code=="0301200"){
                popAlert("登录成功！");
                var arry = arry||[];
                arry = [re.data.token,re.data.user_id,re.data.is_login];
                localStorage.setItem("userInfo", arry);
                localStorage.setItem("eUid", re.data.encrypt_uid);
                setTimeout(function(){
                    if(window.history.length>1){
                        window.history.go(-1)
                    }else{
                        window.location.href = localStorage.getItem("lastUrl");
                    }
                },1500)
            }else{
                popAlert(re.msg);
            }
        },'json');
    },
    getdom: function(){
        this.mobile = $("#username").val();
        this.password = $("#password").val();
    },
    test: function(){
        if(!this.isMobileNum(this.mobile)){
            return false;
        }
        if(!this.isPassWord(this.password)){
            return false;
        }
        return true;
    },
    isMobileNum: function(n){
        return matchTest.regularList['mobile'].test(n);
    },
    isPassWord: function(n){
        return matchTest.regularList['passWord2'].test(n);
    }
}

;(function ($){
    $.fn.overTexts = function(options) {
        var ooText,t1;
        var dft = {
            //初始化的参数配置
            texts: "展开和收缩的类型， 0 不显示展开和收缩，仅为省略号 || 1 显示展开，不显示收缩 ||2 显示展开和收缩",
            textLength: "2",
            overText: "...全文",
            openText: "收起",
            ooType: "2" //展开和收缩的类型， 0 不显示展开和收缩，仅为省略号 || 1 显示展开，不显示收缩 ||2 显示展开和收缩 || 3显示省略号
        }
        var opt = $.extend(dft, options);
        ooText = opt.texts;         //临时装载 数据 用于填充到data-text内的

        if (options.ooType == '2') {
            if (opt.texts.length > opt.textLength) {
                t1 = opt.texts.substring(0, opt.textLength) ;
                t2 = "<a class='moreoh' >"+opt.overText+"</a>"
            }else{
                t1 = opt.texts;
                t2 = '';
            }
        }

        //无论何种结果，均执行此
        $(this).html("<div class='moreText'>" + t1 + t2 +"</div>");
        //此处判断 就是 已经有展开或者收起了


        $("a.moreoh",this).off("tap").on("tap",function(){
            //更多或者收起的点击事件
            var moreoh = $(this);//我是更多或者收起的dom
            if(moreoh.html() == opt.overText){//如果我此时是展开
                moreoh.html(opt.openText);
                moreoh.closest(".moreText").html(opt.texts).append(moreoh);

            }else if(moreoh.html() == opt.openText){//如果我此时是收起
                moreoh.html(opt.overText);
                moreoh.closest(".moreText").html(opt.texts.substring(0, opt.textLength)).append(moreoh);
            }
        });

    }
})(Zepto);


//公共分享方法
function ShareFun(title,content,linkUrl,img,type){
    //type为友盟添加区分字段
    var json = {
        "title":title,
        "content":content,
        "linkUrl":linkUrl,
        "img":img
    };
    type?(json.type=type):"";

    var share = JSON.stringify(json);
    if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
        window.webkit.messageHandlers.share.postMessage(share)
    } else if (navigator.userAgent.match(/android/i)) {
        window.bmy.share(share)
    }
}

//获客
function ObtainClient(options){
    var _default = {
        token: 0,
        code: 0,
        user_id: 0,
        share_title: null,
        share_id: 0,
        share_type: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
ObtainClient.prototype = {
    init: function(){
        this.token = this.token?this.token:getToken();
        this.code = this.code?this.code:getOpenid();
        this.info();
    },
    info: function(){
        this.value ={
            token: this.token,
            code: this.code,
            user_id: this.user_id,
            share_title: this.share_title,
            share_id: this.share_id,
            share_type: this.share_type
        }

        this.user_id?this.getClient():"";
    },
    getClient: function(){
        var _this = this;
        $.post('//'+domain.jc+'/user/Getclient/huoke',_this.value, function (re) {
            if(re.code=="0001000"){
                localStorage.setItem("openId",re.data.wechat_openid);
            }
        },'json');
    }
}

//横向可滑动超长tab
function scrollTab(_self){
    var startX,startY;
    var translate = 0;
    var newtranslate = 0;
    var pageWidth = parseInt($(".header-secondary-left").css("width"));
    var lastItem = 0;

    var len = $("li",_self).length,allLen = 0;
    for (var i = 0; i < len; i++) {
        allLen += parseInt($($("li",_self)[i]).css("width"))+4;
    }

    $(_self).css({
        width:allLen
    });

    $(_self).off("touchstart").on("touchstart",function(e){
        var touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        lastItem = newtranslate;
    });

    $(_self).off("touchmove").on("touchmove",function(e){
        var touch = e.touches[0];
        var deltaX = touch.clientX - startX;
        var deltaY = touch.clientY - startY;

        if (Math.abs(deltaX) > Math.abs(deltaY)){
            translate = deltaX ;

        }
        $(this).css({
            transform: "translate3d("+(lastItem + translate)+"px,0px,0px)",
            transition: "-webkit-transform .5s cubic-bezier(0.333333, 0.666667, 0.666667, 1)"
        })
        e.preventDefault();
    });

    $(_self).off("touchend").on("touchend",function(e){

        newtranslate = newtranslate + translate;

        if(newtranslate>0){
            newtranslate = 0;
        }else if(allLen-pageWidth < Math.abs(newtranslate)){
            newtranslate = pageWidth - allLen
        }

        var _this = this;
        setTimeout(function(){
            $(_this).css({
                transform: "translate3d("+newtranslate+"px,0px,0px)",
                transition: "-webkit-transform .5s cubic-bezier(0.333333, 0.666667, 0.666667, 1)"
            })
        },50)
    });
}



//客服号码修改
var telrs;
var kf_phone;
var kf_qq;
function GetTel() {
    $.ajax({
        type: "POST",
        url: '//'+domain.jc+'/user/setting/getWechats/',
        data: {},
        dataType: "json",
        async: false,
        success: function(re){
            // kf_qq=378220059;
            kf_qq=re.data.serviceqq.data;
            kf_phone='tel:'+re.data.servicetel.data;
            telrs=re.data.servicetel.data;
            $('.js-kefu').attr('href',"bmy://app.call/phone?phone="+re.data.servicetel.data)
        }
    })
}


