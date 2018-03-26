//表单共用
function ProBox() {}

ProBox.prototype = {
    dom: function(){
        switch(this.idName){
            case "telephone":
                this.type = "tel"; break;
            case "email":
                this.type = "email"; break;
            case "stature":
                this.type = "number"; break;
            case "weight":
                this.type = "number"; break;
            default:
                this.type = "text"; break;
        }
        var input = this.idName||this.placeholder?'<div class="item-input">\
                        <input type="'+this.type+'" id="'+this.idName+'" placeholder="'+this.placeholder+'">\
                    </div>':'';
        return '<div class="flex-wrap '+this.className+'">\
                    <div class="item-title">'+this.name+'</div>'
                    +input+
                '</div>'
    },
    staticDom: function(){
        return '<div class="flex-wrap '+this.className+'">\
                    <div class="item-title">'+this.name+'</div>\
                    <div class="item-input">\
                        <span>'+this.val+'</span>\
                    </div>\
                </div>'
    },
    test: function(values){
        var f = 0;
        for(var i=0; i<values.length; i++){
            values[i].name?(matchTest.regularList[values[i].name].test(values[i].val)?"":(values[i].msg?popAlert(values[i].msg):popAlert(matchTest.errorMsg[values[i].name]),f++)):"";
            if(f>0){return 0;}
        }
        return f?0:1;
    },
    answer: function(){
        return '<div class="flex-wrap wrapable flex-wrap-static '+this.className+'">\
                    <p class="notice-title">'+this.title+'</p>\
                    <label class="notice-choose '+this.sel+'"><input type="radio" name="'+this.sel+'" value="1"><i class="iconfont icon-unselected-single"></i>是</label>\
                    <label class="notice-choose '+this.sel+'"><input type="radio" name="'+this.sel+'" value="0"><i class="iconfont icon-unselected-single"></i>否</label>\
                </div>'
    },
    beneficiary: function(){
        return '<div class="flex-wrap wrapable flex-wrap-static '+this.className+'">\
                    <label class="notice-choose '+this.name+' checked"><input type="radio" name="'+this.name+'" value="1"><i class="iconfont icon-selected-single"></i>'+this.bLeft+'</label>\
                    <label class="notice-choose '+this.name+'"><input type="radio" name="'+this.name+'" value="2"><i class="iconfont icon-unselected-single"></i>'+this.bRight+'</label>\
                </div>'
    }
}


//咨询类产品详情
function DetailCommon(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

DetailCommon.prototype = {
    init: function(){
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/client/Product/detail', {product_id:_this.productId}, function (re) {
            if(re.code=='0001000'){
                document.title=re.data.name;
                var arange = "";
                var l = re.data.ranges?re.data.ranges.length:0;
                for (var i = 0; i < l; i++) {
                    arange += '<div class="flex-wrap bod-botm detail-show" data-id="'+i+'">\
                        <div class="item-title">'+re.data.ranges[i].name+'</div>\
                        <div class="item-content">'+re.data.ranges[i].price+'<i class="iconfont icon-arrow-down"></i></div>\
                    </div>\
                    <div class="item-detail" data-id="'+i+'">'+re.data.ranges[i].detail+'</div>'
                }
                var pdf = "";
                var m = re.data.files?re.data.files.length:0;
                for (var j = 0; j < m; j++) {
                    pdf += '<a href="bmy://app.page/document/?docAddress='+re.data.files[j].file+'" target="_blank" id="js-zygz">\
                        <div class="flex-wrap bod-botm">\
                            <div class="item-title">'+re.data.files[j].name+'</div>\
                            <div class="item-content"><i class="iconfont icon-arrow-right"></i></div>\
                        </div>\
                    </a>'
                }
                var job = "";
                if(re.data.job){
                    job = '<div class="flex-wrap">\
                        <div class="item-title">承保职业：'+re.data.job.name+'<a href="bmy://app.page/document/?docAddress='+re.data.job.file+'" id="job-show" target="_blank"><i class="iconfont icon-date font-28 color-FF6900"></i></a></div>\
                    </div>'
                }
                var img = re.data.desImg?'<img src="'+re.data.desImg+'">':'';
                var html = '<div class="card-block product-card">\
                                <div class="banner-common" style="background:url('+re.data.adImg+') no-repeat top center;background-size: 100% 100%;"></div>\
                                <h1>'+re.data.name+'</h1>\
                                <p>'+re.data.highlight+'</p>\
                            </div>\
                            <div class="card-block product-wrap">\
                                <div class="flex-wrap bod-botm">\
                                    <div class="item-title">承保年龄：'+re.data.age+'</div>\
                                </div>\
                                <div class="flex-wrap bod-botm">\
                                    <div class="item-title">保险期间：'+re.data.date+'</div>\
                                </div>\
                                '+job+'\
                            </div>\
                            <div class="card-block product-wrap"><h1 class="insure-title bod-botm"><i class="iconfont icon-coverage"></i>保障范围</h1>'+arange+'</div>\
                            <div class="card-block product-wrap">'+pdf+'</div>\
                            <div class="card-block product-wrap card-prodimg">'+img+'\
                            </div>';
                $(".content").html(html);
                $(".detail-show").off("tap").on("tap",function(){
                    var id = $(this).data("id");
                    var sel = $(".item-detail[data-id='"+id+"']");
                    if(sel.hasClass("showbox")){
                        sel.removeClass("showbox");
                        $(".iconfont",this).removeClass("icon-arrow-up");
                    }else{
                        sel.addClass("showbox");
                        $(".iconfont",this).addClass("icon-arrow-up");
                    }
                })
                if(re.data.is_equal_price=="1"){
                    $(".insure-price").html("￥"+re.data.man_price);
                }else{                 
                    var man = re.data.man_price?"男性 ￥"+re.data.man_price:"";
                    var woman = re.data.women_price?"女性 ￥"+re.data.women_price:"";
                    $(".insure-price").html(man+"<br>"+woman);
                }
                $(".to-insure").off("tap").on("tap",function(){
                    window.location.href = _this.share?"/view/product_life/common_consult.html?type=1&pname="+re.data.name+"&company="+re.data.company_name+"&productId="+_this.productId+"&userId="+_this.userId+"&ctype="+_this.ctype+"&isH5navBar=1":"bmy://app.page/life/product/ask";
                })
            }
        },'json');
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&productId='+this.productId+'&userId='+this.userId+'&ctype='+this.ctype):(location.href+'?type=1&productId='+this.productId+'&userId='+this.userId+'&ctype='+this.ctype);

        ShareFun("超值性价比，为您提供全面意外保障","我在保满意中发现了一款好产品，你也看看吧",url,null,2);
    }
}

//咨询类产品||战略合作投保咨询
function ConsultCommon(options){
    var _default = {
        token: 0,
        share:false
    }

    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    // var _this = this;
    if(this.userName){
        if(this.userName.length!=11){
            $("#username").val(this.userName);
        }

    }
    if(this.mobile){$("#userphone").val(this.mobile);}
}

ConsultCommon.prototype = {
    init: function(){
        var _this = this;
        _this.token = getToken();
        $(".getcode").on("tap",function(){
            if($(this).attr("disabled")=="disabled"){return;}
            new sendMessage({
                mobliephone:$("#userphone"),
                btnSendCode:$(".getcode"),
                type:"consult",
                token:_this.token
            })
        });
        $(".consult-btn").on("tap",function(){
            _this.submit();
        })
    },
    submit: function(){
        var _this = this;
        if(!$("#username").val()||!$("#userphone").val()||!$("#usercode").val()){
            popAlert("请填写完整！");
            return;
        }
        _this.values = {
            token:_this.token,
            username:$("#username").val(),
            telphone:$("#userphone").val(),
            product_name:_this.pname,
            type:_this.ctype,
            company:_this.company,
            tel_code:$("#usercode").val(),
            product_id:_this.product_id
        };
        $.post('//'+domain.cp+'/custenquiry/Custenquiry/addenquiry', _this.values , function (re) {
            if(re.code=='0001000'){
                popSuccess(3);
            } else if(re.code=='0001009'){
                popAlert(re.msg);
            } // else {
            //     popAlert("操作失败！");
            // }
        },"json");
    },
    test: function(){
        if(!this.isPassWord(this.password)){
            return false;
        }
        return true;
    }
}

//支付宝支付
function PayIndex(options){
    var _default = {
       enterid: 1,
       token: null,
       share: false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

PayIndex.prototype = {
    init: function(){
        if(isWeiXin()){
            this.wechat = 1;
        }else{
            this.wechat = 0;
        }
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/kunlun/Insure/getPaymentAmount', {token:_this.token,order:_this.order}, function (re) { 
            if(re.code=='0001000'){
                $(".content").html('<div class="card-block product-wrap">\
                    <div class="flex-wrap bod-botm">\
                        <h1>'+re.data.product.ProductName+'</h1>\
                    </div>\
                    <div class="flex-wrap">\
                        <em class="font-32 color-FF6900">'+re.data.payment.quantity+'份</em>\
                        <em class="font-32 color-FF6900">'+re.data.payment.price_total+'元</em>\
                    </div>\
                </div>\
                <div class="card-block product-wrap">\
                    <div class="flex-wrap bod-botm">\
                        <h1>选择支付方式</h1>\
                    </div>\
                    <div class="flex-wrap">\
                        <ul class="pay-list">\
                        <form action="//'+domain.sx+'/insurance/kunlun/Pay/goPay/" name="alipay" method="post">\
                            <input type="hidden" name="token" value="'+_this.token+'">\
                            <input type="hidden" name="order" value="'+_this.order+'">\
                            <input type="hidden" name="share" value="'+_this.share+'">\
                            <input type="hidden" name="wechat" value="'+_this.wechat+'">\
                            <li class="ali-pay">\
                                <em class="img-alipay"></em>\
                                <div class="pay-way"><h2>支付宝<span>安全便捷</span></h2><i class="iconfont icon-arrow-right"></i></div>\
                            </li>\
                        </form>\
                        </ul>\
                    </div>\
                </div>');
                $(".ali-pay").on("tap",function(){
                    $("form[name='alipay']").submit();
                });
            }
        },"json");
    }
}

//银行支付
function PayBank(options){
    var _default = {
       enterid: 1,
       token: null,
       share: false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

PayBank.prototype = {
    init: function(){
        this.wechat = isWeiXin()?1:0;
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/common/PreparePayment/getPaymentAmount', {token:_this.token,order_code:_this.order}, function (re) { 
            if(re.code=='0001000'){
                var fee = re.data.payment.payment_period=="1"?"/趸交":"/年"
                var url = _this.share?"":"bmy://app.page/document/?docAddress=";

                $(".content").html('<div class="card-block product-wrap">\
                    <div class="flex-wrap bod-botm">\
                        <h1>'+re.data.product.product_name+'</h1>\
                    </div>\
                    <div class="flex-wrap">\
                        <em class="font-28">支付金额</em>\
                        <em class="font-28 color-FF6900">'+re.data.payment.premium_total+'元'+fee+'</em>\
                    </div>\
                </div>\
                <div class="card-block product-wrap">\
                    <div class="flex-wrap bod-botm">\
                        <h1>请输入支付银行信息</h1>\
                    </div>\
                    <div class="flex-wrap bod-botm">\
                        <div class="item-title">开户人姓名</div>\
                        <div class="item-input">\
                            <input type="text" id="payer-name" placeholder="请填写开户人姓名">\
                        </div>\
                    </div>\
                    <div class="flex-wrap bod-botm">\
                        <div class="item-title">选择银行</div>\
                        <div class="item-input">\
                            <input type="text" id="pay-bank" placeholder="请选择支付银行 >" readonly="">\
                        </div>\
                    </div>\
                    <div class="flex-wrap bod-botm">\
                        <div class="item-title">银行卡号</div>\
                        <div class="item-input">\
                            <input type="number" id="pay-bankId" placeholder="请输入银行卡号">\
                        </div>\
                    </div>\
                </div>\
                <div class="card-block product-wrap">\
                    <div class="flex-wrap bod-botm">\
                        <h1>请填写银行预留的手机号</h1>\
                    </div>\
                    <div class="flex-wrap bod-botm">\
                        <div class="item-title">手机号码</div>\
                        <div class="item-input">\
                            <input type="tel" id="telephone" placeholder="银行卡绑定的手机号">\
                        </div>\
                    </div>\
                    <div class="flex-wrap bod-botm">\
                        <div class="item-title">验证码</div>\
                        <div class="item-input flex-wrap" style=" padding:0;">\
                            <input type="number" id="tel-code" placeholder="请输入验证码">\
                            <div class="getcode code2">获取验证码</div>\
                        </div>\
                    </div>\
                </div>'
                +'<div class="card-block product-wrap">'
                +'<div class="flex-wrap flex-wrap-static">'
                +'<i class="iconfont icon-unselected-single tb-agreement"><span>同意</span></i>'
                +'<p class="notice-title"><a href="'+url+'/public/pdf/ygjk/自动转账授权声明.docx" class="color-FF6900">《保险费自动转账授权声明》</a></p>'
                +'</div></div>'
                +'<div class="btn-insure-confirm disabled">确认提交</div>'
                );
                _this.event();
                $(".ali-pay").on("tap",function(){
                    $("form[name='alipay']").submit();
                });
            }
        },"json");
    },
    getBank: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/common/BankList', {token:_this.token,order:_this.order}, function (re) { 
            if(re.code=='0001000'){
                _this.bank = [];
                for(var i=0; i<re.data.length; i++){
                    _this.bank.push(re.data[i].name);
                }
                $("#pay-bank").picker({
                    toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                    <h1 class="title">'+BW.FormUsConf.tip_18+'</h1>\
                    </header>',
                    cols: [
                        {
                          textAlign: 'center',
                          values: _this.bank,
                          cssClass: 'picker-items-col-normal'
                        }
                    ]
                })
            }
        },'json');
    },
    event: function(){
        var _this = this;
        this.getBank();

        $(".tb-agreement").off("tap").on("tap",function(){
            $(this).toggleClass("icon-unselected-single").toggleClass("icon-selected-single");
            if($(".tb-agreement").hasClass("icon-selected-single")){
                $(".btn-insure-confirm").removeClass("disabled")
            }else{
                $(".btn-insure-confirm").addClass("disabled")
            }
        })

        $(".btn-insure-confirm").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            $(".content").append('<div class="loading fixed">'+
                                    '<div class="loading-img"></div>'+
                                    '<div class="loadding-word">加载中...</div>'+
                                '</div>');
            _this.submit();
        });

        $(".getcode").off("tap").on("tap",function(){
            if($(this).attr("disabled")=="disabled"){return;}
            $(this).attr("disabled", "disabled")
            _this.send();
        });
    },
    test: function(){
        var values = [
            {
                name:"username",
                val:$("#payer-name").val()
            },
            {
                name:"notEmpty",
                val:$("#pay-bank").val(),
                msg:"开户银行不能为空"
            },
            {
                name:"notEmpty",
                val:$("#pay-bankId").val(),
                msg:"银行卡号不能为空"
            },
            {
                name:"notEmpty",
                val:$("#telephone").val(),
                msg:"手机号码不能为空"
            },
            {
                name:"notEmpty",
                val:$("#tel-code").val(),
                msg:"验证码不能为空"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    submit: function(){
        var _this = this;
        var v ={
            token:_this.token,
            order_code:_this.order,
            bank_code:_this.id($("#pay-bank").val()),
            payer_name:$("#payer-name").val(),
            card_no:$("#pay-bankId").val(),
            telephone:$("#telephone").val(),
            security_code:$("#tel-code").val()
        }
        $.post('//'+domain.sx+'/insurance/sinosig/common/Payment/goPay', v, function (re) {
            if(re.code=='0001000'){
                if(re.data.code=="4"){
                    $(".loading").remove();
                    popUp({
                        btnLeft:"",
                        btnRight:"btn-orange js-list",
                        leftWord:"",
                        rightWord:"我知道了",
                        msgText:"已完成支付！",
                        msgAlign:"text-center"
                    });
                    setTimeout(function(){
                        $(".js-list").on("tap",function(){
                            window.location.href = _this.share?"/view/pay/success.html":"bmy://app.page/life/jumpToMyOrder?state=1"
                        }); 
                    },0)
                }else{
                    $(".loading").remove();
                    popAlert(re.data.msg);
                }
            }
        },'json');    
    },
    send: function(){
        //阳光发短信
        var _this = this;
        this.codebtn = $(".getcode");
        var flag=1;
        this.count = '60',
        this.curCount = -1,
        this.telephone = $("#telephone").val();

        if(!matchTest.regularList['mobile'].test(this.telephone)){
            popAlert(matchTest.errorMsg['mobile']);
            this.codebtn.removeAttr("disabled");
            return;
        }

        if(flag){
            flag=0;
            $.post('//'+domain.sx+'/insurance/sinosig/common/SecurityCode', {token:_this.token,order_code:_this.order,telephone:_this.telephone}, function (re) { 
                if(re.code=='0001000'){
                    popAlert(re.data);
                    _this.curCount = parseInt(_this.count);
                    _this.codebtn.attr("disabled", "disabled").css("background","#adb5c1");
                    _this.codebtn.html( _this.curCount + "s");
                    _this.InterValObj = window.setInterval(function(){
                        _this.setRemainTime.call(_this)
                    }, 1000);
                }else{
                    _this.codebtn.removeAttr("disabled");
                    popAlert(re.msg);
                }
                flag=1;
            },'json');
        }
    },
    setRemainTime:function() {
        if (this.count == 0) {
            window.clearInterval(this.InterValObj);//停止计时器
            this.codebtn.removeAttr("disabled").removeAttr("style");//启用按钮
            this.codebtn.html("重发");
        }
        else if(this.count>0){
            this.count--;
            this.codebtn.html(this.count + "s");
        }
    },
    id: function(v){
        var list ={
            "建设银行":"0101041",
            "农业银行":"0101014",
            "中国银行":"0101015",
            "招商银行":"0101017",
            "工商银行":"0101013",
            "浦发银行":"0101141",
            "光大银行":"0101071",
            "广发银行":"0101121"
        }
        return list[v]
    }
}

$(function(){
    $.init()
})