//阳光健康随e保
function DetailYgjk(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

DetailYgjk.prototype = {
    init: function(){
        var _this = this;
        if(this.enterid=="2"){
            var html = '<a href="javascript:;" class="to-rule">规则说明</a>\
                <div class="to-share">分享给客户<br><span>(对方看不到推广费)</span></div>\
                <div class="to-insure">立即投保</div>';
            $(".btn-insure").html(html);
            $(".is-spread").append('<div class="spread-block"><span class="spread-blklt">推广费</span><span class="spread-blkrt">50%</span></div>');
            $(".to-rule").on("tap",function(){
                var mask = $('<div class="masklayer-word"><h1>分享规则说明</h1><p>保满意的认证经纪人分享保满意提供的保险产品、资讯等内容，好友点击阅读后即成为您的归属客户。好友查看您分享的产品或资讯等内容，保满意通知中心和客户动态都会及时通知您，方便您及时跟进。客户通过您分享链接下单，您可获得产品对应的推广费。</p><i class="iconfont icon-close close-layer"></i></div>');
                $("body").append(mask);
                $(".close-layer").on("tap",function(){
                    mask.remove();
                });
            });
            $(".to-share").on("tap",function(){
                _this.sharepage();
            })
        }
        var url = '/view/product_life/ygsx/ygjk_concept.html?inject=all';
        $(".to-insure").on("tap",function(){
            window.location.href = "bmy://app.page/life/product/judgeLogin?url="+url+"&isH5navBar=1";
        })
        _this.price();
    },
    price: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/client/Product/reward', {config_id:_this.productId}, function (re) {
            if(re.code=="0001000"){
                if(re.data.same=='1'){
                    var f = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    $(".insure-price").html('￥'+re.data.price.man+'/份');
                    $(".spread-blkrt").html(re.data.agent.man);
                    $(".is-spread").html('<span class="price-sex"><em class="product-price price-male">'+re.data.price.man+f+'</em></span>');
                }else{
                    var ff = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    var fm = re.data.reward.woman?'<span class="font-28 mrl-20">返'+re.data.reward.woman+'</span>':'';
                    var pricemale,pricemale2,pricefemale,pricefemale2;
                    if(re.data.price.man){
                        pricemale = '男性￥'+re.data.price.man+'/份<br>';
                        pricemale2 = '男性<em class="product-price price-male">'+re.data.price.man+ff+'</em><br>'
                    }else {
                        pricemale = ''
                        pricemale2 = ''
                    }

                    if(re.data.price.woman){
                        pricefemale = '女性￥'+re.data.price.woman+'/份'
                        pricefemale2 = '女性<em class="product-price price-female">'+re.data.price.woman+fm+'</em>'
                    }else {
                        pricefemale = ''
                        pricefemale2 = ''
                    }

                    $(".insure-price").html(pricemale+pricefemale);
                    $(".is-spread").html('<span class="price-sex">'+pricemale2+pricefemale2+'</span>');
                    $(".spread-blkrt").html(re.data.agent.man); 
                }
            }
        },'json')
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&userId='+this.userId+'&eUid='+this.eUid):(location.href+'?type=1&userId='+this.userId+'&eUid='+this.eUid);
        ShareFun("超值性价比，为您提供全面意外保障","我在保满意中发现了一款好产品，你也看看吧",url,null,2);
    }
}

//保障方案
function JkCpt(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

JkCpt.prototype = {
    init: function(){
        $(".content").html(this.dom());
        this.event();
        this.inputInfo = localStorage.getItem("InfoYgjk")?$.parseJSON(localStorage.getItem("InfoYgjk")):0;
        this.inputInfo?this.fill():"";
    },
    fill: function(){
        $(".item-tab").removeClass('choose-on');
        $(".item-tab[data-id='"+this.inputInfo.serie_id+"']").addClass('choose-on');
        $("#insured-sex").val(this.inputInfo.sex);
        $("#insured-birth").val(this.inputInfo.birth);
        $("#premium").val(this.inputInfo.premium);
        $("#insure-period").val(this.inputInfo.insure_period);
        $("#payment-period").val(this.inputInfo.payment_period);
    },
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        return  hs+this.getDom("产品选择","","","")
                +'<div class="flex-wrap bod-botm" id="js-choose"><div class="item-tab choose-on" data-id="0">癌症保障</div><div class="item-tab" data-id="1">25种重疾保障</div><div class="item-tab" data-id="2">42种重疾保障</div></div>'
                +this.getDom(BW.FormTitConf.tip_2+BW.FormTitConf.tip_17,"insured-sex",BW.FormPlhldrConf.tip_14+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_2+BW.FormTitConf.tip_18,"insured-birth",BW.FormPlhldrConf.tip_15+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_21+"(万元)","premium",BW.FormPlhldrConf.tip_18,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_22,"insure-period",BW.FormPlhldrConf.tip_19+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_23,"payment-period",BW.FormPlhldrConf.tip_20+' >',"bod-botm")
                +this.getStaticDom(BW.FormTitConf.tip_24,"年交","")
                +he+hs
                +this.getStaticDom("产品报价",'<em class="product-price"></em>',"")
                +he
                +'<div class="btn-insure-next">保费测算</div>'
    },
    getDom: function(name,idName,placeholder,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            idName:idName,
            placeholder:placeholder,
            className:cname?cname:""
        }
        return pb.dom.call(this.values);
    },
    getStaticDom: function(name,val,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            val:val,
            className:cname?cname:""
        }
        return pb.staticDom.call(this.values);
    },
    changeItem: function(){
        $(".btn-insure-next").html("保费测算");
    },
    event: function(){
        var _this = this;
        $("#js-choose .item-tab").on("tap",function(){
            $(".item-tab").removeClass("choose-on");
            $(this).addClass("choose-on");
            _this.changeItem();
        });
        $("#premium").on("blur",function(){
            _this.changeItem();
        });

        $("#insured-sex").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormUsConf.tip_18+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_16, BW.FormUsConf.tip_17],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                _this.changeItem();
            }
        });

        var MaxBirth = birtday(50,"year").split("-");
        var MinBirth = birtday(30,"day").split("-");

        $("#insured-birth").dtCtrlPicker({
            onChange: function (picker, values, displayValues) {
                if(picker.cols[0].value==MaxBirth[0]&&picker.cols[1].value < MaxBirth[1]){
                    picker.cols[1].setValue(MaxBirth[1]);
                    popAlert("年龄为30天~50周岁");
                }
                if(picker.cols[0].value==MaxBirth[0]&&picker.cols[1].value==MaxBirth[1]&&picker.cols[2].value < MaxBirth[2]){
                    picker.cols[2].setValue(MaxBirth[2]);
                    popAlert("年龄为30天~50周岁");
                }
                if(picker.cols[0].value==MinBirth[0]&&picker.cols[1].value > MinBirth[1]){
                    picker.cols[1].setValue(MinBirth[1]);
                    popAlert("年龄为30天~50周岁");
                }
                if(picker.cols[0].value==MinBirth[0]&&picker.cols[1].value==MinBirth[1]&&picker.cols[2].value > MinBirth[2]){
                    picker.cols[2].setValue(MinBirth[2]);
                    popAlert("年龄为30天~50周岁");
                }
                var days = ctrlDate.getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
                var currentValue = picker.cols[2].value;
                if(currentValue > days.length) currentValue = days.length;
                picker.cols[2].setValue(currentValue);
            },
            cols: [
            {
                values: ctrlDate.initYears(MaxBirth[0],MinBirth[0]),
                cssClass: 'text-center col-3'
            },
            {
                values: ctrlDate.initMonthes,
                cssClass: 'text-center col-2'
            },
            {
                values: ctrlDate.getDays(),
                cssClass: 'text-center col-2'
            }
            ],
            onClose: function(){
                var l = calAge($("#insured-birth").val(),2)<18?1:(calAge($("#insured-birth").val(),2)>41?3:2);
                var w = l==1?"1~15":(l==2?"1~25":"1~15");
                if($("#tip-wrap").length<1){
                    $("#premium").closest(".flex-wrap").after('<div class="flex-wrap bg-grey" id="tip-wrap">\
                        <div class="item-tips">*请在'+w+'之间整数填写</div>\
                    </div>');
                }else{
                    $("#tip-wrap .item-tips").html('*请在'+w+'之间整数填写');
                }
                _this.changeItem();
            }
        });

        $("#insure-period").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormTitConf.tip_22+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: ['10年','20年','25年','30年','至70周岁','至100周岁'],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                _this.changeItem();
            }
        });

        $("#payment-period").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormTitConf.tip_23+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: ['一次交清','3年','5年','10年','20年'],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                _this.changeItem();
            }
        });


        $(".btn-insure-next").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            if(!_this.check()){return;}

            var record ={
                serie_id:$(".item-tab.choose-on").attr("data-id"),
                sex:$("#insured-sex").val(),
                birth:$("#insured-birth").val(),
                premium:$("#premium").val(),
                insure_period:$("#insure-period").val(),
                payment_period:$("#payment-period").val()
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoYgjk", value);

            var i = new YgCpt({
                token:_this.token,
                product_id:161219001,
                serie_id:$(".item-tab.choose-on").attr("data-id"),
                sex:_this.id($("#insured-sex").val()),
                birth:$("#insured-birth").val(),
                premium:$("#premium").val(),
                insure_period:$("#insure-period").val(),
                payment_period:$("#payment-period").val(),
                share:_this.share,
                name:"ygjk",
                userId:_this.userId
            })
            $(".btn-insure-next").addClass("disabled");
            i.init();
        })
    },
    test: function(){
        var values = [
            {
                name:"notEmpty",
                val:$("#insured-sex").val(),
                msg:"被保人性别不能为空"
            },
            {
                name:"notEmpty",
                val:$("#insured-birth").val(),
                msg:"出生日期不能为空"
            },
            {
                name:"notEmpty",
                val:$("#premium").val(),
                msg:"基本保额不能为空"
            },
            {
                name:"notEmpty",
                val:$("#insure-period").val(),
                msg:"保险期间不能为空"
            },
            {
                name:"notEmpty",
                val:$("#payment-period").val(),
                msg:"交费期间不能为空"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    check: function(){
        var l = calAge($("#insured-birth").val(),2)<18?1:(calAge($("#insured-birth").val(),2)>41?3:2);
        var premium = $("#premium").val();
        if(!matchTest.regularList["positiveNum"].test(premium)){
           popAlert("保额为正整数！");
           return false;
        }

        if($("#insure-period").val()=="10年"&&$("#payment-period").val()=="20年"){
            popAlert("交费期间不能超过保险期间！");return false;
        }
        

        if(l==1){
            return premium>15||premium<1?(false,popAlert("请正确填写保额")):true;
        }else if(l==2){
            return premium>25||premium<1?(false,popAlert("请正确填写保额")):true;
        }else if(l==3){
            return premium>15||premium<1?(false,popAlert("请正确填写保额")):true;
        }
        
        return true;
    },
    id: function(v){
        var list ={
            "男":1,
            "女":2
        }
        return list[v]
    }
}

//阳光健康保障方案提交
function YgCpt(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

YgCpt.prototype = {
    init: function(){
        if($(".btn-insure-next").html()=="下一步"){
            $(".btn-insure-next").removeClass("disabled");
            var url = "/view/product_life/ygsx/yg_notice.html?inject=all";
            window.location.href = this.share?url+"?type=1&name="+this.name+"&userId="+this.userId:"bmy://app.page/life/nextpage?url="+url+"&parameterList=name="+this.name+"&isH5navBar=1";
            return;
        }
        this.name == "ygjk"?this.getData():this.getData2();
    },
    getData: function(){
        var _this = this;
        this.value = {
            token:this.token,
            product_id:this.product_id,
            serie_id:this.serie_id,
            sex:this.sex,
            birth:this.birth,
            premium:this.premium,
            insure_period:toNumber(this.insure_period),
            insure_period_type:this.type(this.insure_period),
            payment_period:this.payment_period=="一次交清"?1:toNumber(this.payment_period)
        };
        $(".product-price").addClass("price-tips").html('正在计算保费<span class="dotting"></span>');
        $.post('//'+domain.sx+'/insurance/sinosig/healthOne/Quotation/quote', _this.value, function (re) {
            if(re.code=="0001000"){
                $(".product-price").removeClass("price-tips").html(re.data.quotation+"元/年");
                $(".btn-insure-next").removeClass("disabled").html("下一步");
            }else{
                popAlert(re.data.reason?re.data.reason:re.msg);
                $(".btn-insure-next").removeClass("disabled");
            }
        },'json')
    },
    getData2: function(){
        var _this = this;
        this.value = {
            token:this.token,
            product_id:this.product_id,
            sex:this.sex,
            birth:this.birth,
            premium:this.premium,
            insure_period:toNumber(this.insure_period),
            insure_period_type:this.type(this.insure_period),
            payment_period:this.payment_period=="一次交清"?1:toNumber(this.payment_period),
            province:this.province,
            city:this.city
        };
        $(".product-price").addClass("price-tips").html('正在计算保费<span class="dotting"></span>');
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/Quotation/quote', _this.value, function (re) {
            if(re.code=="0001000"){
                $(".product-price").removeClass("price-tips").html(re.data.quotation+"元/年");
                $(".btn-insure-next").removeClass("disabled").html("下一步");
            }else{
                popAlert(re.data.reason?re.data.reason:re.msg);
                $(".btn-insure-next").removeClass("disabled");
            }
        },'json')
    },
    type: function(n){
        return n.match(/周岁/)?"A":"Y"; //Y:年, A:至N周岁
    }
}


//投保填写页
function ProYgjk(options){
    var _default = {
        token: 0,
        proName: "保满意",
        share:false,
        userId: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

ProYgjk.prototype = {
    init: function(){
        $("#page-ygjk .content").html(this.dom());
        this.event();
        this.inputInfo = localStorage.getItem("InfoYgjkPro")?$.parseJSON(localStorage.getItem("InfoYgjkPro")):0;
        this.inputInfo?this.fill():"";
        if(this.inputInfo.relations=="本人"){
            $("#insured-name").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#papers-insured-type").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#papers-insured-code").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#city-type2").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#address2").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#zip-code2").closest(".flex-wrap").addClass("flex-wrap-hide");
        }else{
            if($("#tip-wrap").length<1){
                $("#relationship").closest(".flex-wrap").after('<div class="flex-wrap bg-grey" id="tip-wrap">\
                    <div class="item-tips">*指定被保人必须为未成年人</div>\
                </div>');
            }
            var job = $("#insurer-job");
            var a = job.closest(".item-input");
            job.remove();
            a.append('<input type="text" id="insurer-job" placeholder="'+BW.FormPlhldrConf.tip_11+' >">');
            $("#insurer-job").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormPlhldrConf.tip_11+'</h1>\
                </header>',
                cols: [
                    {
                      textAlign: 'center',
                      values: [BW.FormUsConf.tip_30,BW.FormUsConf.tip_31,BW.FormUsConf.tip_29],
                      cssClass: 'picker-items-col-normal'
                    }
                ]
            });
            $("#insurer-job").val(this.inputInfo.insured_vocational);
        }
        if(this.inputInfo.insured_card_type=="身份证"){
            $("#insured-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
        }
    },
    fill: function(){
        $("#ph-name").val(this.inputInfo.holder_name);
        $("#papers-code").val(this.inputInfo.holder_card_id);
        $("#telephone").val(this.inputInfo.holder_telephone);
        $("#email").val(this.inputInfo.holder_email);
        $("#city-type").val(this.inputInfo.holder_province);
        $("#address").val(this.inputInfo.holder_address);
        $("#zip-code").val(this.inputInfo.holder_zip_code);
        $("#relationship").val(this.inputInfo.relations);
        $("#insured-name").val(this.inputInfo.insured_name);
        $("#papers-insured-type").val(this.inputInfo.insured_card_type);
        $("#papers-insured-code").val(this.inputInfo.insured_card_id);
        $("#city-type2").val(this.inputInfo.insured_province);
        $("#address2").val(this.inputInfo.insured_address);
        $("#zip-code2").val(this.inputInfo.insured_zip_code);
        $("#insured-birth").val(this.inputInfo.insured_birth);
        $("#insurer-job").val(this.inputInfo.insured_vocational);
        $("#stature").val(this.inputInfo.insured_height);
        $("#weight").val(this.inputInfo.insured_weight);
    },
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        return  hs+this.tbrTitle("icon-applicant",BW.FormTitConf.tip_1)
                +this.getDom(BW.FormTitConf.tip_4,"ph-name",BW.FormPlhldrConf.tip_1,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_25,"papers-code",BW.FormPlhldrConf.tip_21,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_7,"telephone",BW.FormPlhldrConf.tip_4,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_8,"email",BW.FormPlhldrConf.tip_5,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_9,"city-type",BW.FormPlhldrConf.tip_6+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_10,"address",BW.FormPlhldrConf.tip_7,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_26,"zip-code",BW.FormPlhldrConf.tip_22,"")
                +he+hs
                +this.tbrTitle("icon-insured",BW.FormTitConf.tip_2)
                +this.getDom(BW.FormTitConf.tip_11,"relationship",BW.FormPlhldrConf.tip_8+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_12,"insured-name",BW.FormPlhldrConf.tip_9,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_5,"papers-insured-type",BW.FormPlhldrConf.tip_2+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_6,"papers-insured-code",BW.FormPlhldrConf.tip_10,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18,"insured-birth",BW.FormPlhldrConf.tip_15+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_9,"city-type2",BW.FormPlhldrConf.tip_6+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_10,"address2",BW.FormPlhldrConf.tip_7,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_26,"zip-code2",BW.FormPlhldrConf.tip_22,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_13,"insurer-job",BW.FormPlhldrConf.tip_11+' >',"bod-botm")            
                +this.getDom(BW.FormTitConf.tip_27+"(厘米)","stature",BW.FormPlhldrConf.tip_23,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_28+"(公斤)","weight",BW.FormPlhldrConf.tip_24,"")          
                +he+hs
                +this.tbrTitle("icon-beneficiary",BW.FormTitConf.tip_3)
                +this.getStaticDom("癌症／重疾保险金受益人","<span>被保人本人</span>")
                +this.getStaticDom("身故保险金受益人","<span>法定</span>")
                +he+hs
                +this.tbrTitle("icon-calendar",BW.FormTitConf.tip_29)
                +this.getStaticDom("投保成功后次日零时生效","","bod-botm")
                +he
                +'<div class="btn-insure-next">下一步</div>'
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    },
    getDom: function(name,idName,placeholder,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            idName:idName,
            placeholder:placeholder,
            className:cname?cname:""
        }
        return pb.dom.call(this.values);
    },
    getStaticDom: function(name,val,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            val:val,
            className:cname?cname:""
        }
        return pb.staticDom.call(this.values);
    },
    event: function(){
        var _this = this;

        $("#address2").on("tap",function(){
            $(this).val($("#address").val());
        });

        $("#zip-code2").on("tap",function(){
            $(this).val($("#zip-code").val());
        });

        $("#papers-insured-type").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormUsConf.tip_4+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_1, BW.FormUsConf.tip_2, BW.FormUsConf.tip_3],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                var v2 = $("#papers-insured-type").val();
                var b3 = $("#insured-sex").closest(".flex-wrap");
                var b4 = $("#insured-birth").closest(".flex-wrap");
                if( v2== BW.FormUsConf.tip_2|| v2== BW.FormUsConf.tip_3){
                    b3.removeClass("flex-wrap-hide");
                    b4.removeClass("flex-wrap-hide");
                }else{
                    b3.addClass("flex-wrap-hide");
                    b4.addClass("flex-wrap-hide");
                }
            }
        });

        var MaxBirth = birtday(18,"year").split("-");
        var MinBirth = birtday(0,"day").split("-");

        $("#insured-birth").dtCtrlPicker({
            onChange: function (picker, values, displayValues) {
                if(picker.cols[0].value==MaxBirth[0]&&picker.cols[1].value < MaxBirth[1]){
                    picker.cols[1].setValue(MaxBirth[1]);
                    popAlert("年龄为18周岁以下");
                }
                if(picker.cols[0].value==MaxBirth[0]&&picker.cols[1].value==MaxBirth[1]&&picker.cols[2].value < MaxBirth[2]){
                    picker.cols[2].setValue(MaxBirth[2]);
                    popAlert("年龄为18周岁以下");
                }
                if(picker.cols[0].value==MinBirth[0]&&picker.cols[1].value > MinBirth[1]){
                    picker.cols[1].setValue(MinBirth[1]);
                    popAlert("年龄为18周岁以下");
                }
                if(picker.cols[0].value==MinBirth[0]&&picker.cols[1].value==MinBirth[1]&&picker.cols[2].value > MinBirth[2]){
                    picker.cols[2].setValue(MinBirth[2]);
                    popAlert("年龄为18周岁以下");
                }
                var days = ctrlDate.getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
                var currentValue = picker.cols[2].value;
                if(currentValue > days.length) currentValue = days.length;
                picker.cols[2].setValue(currentValue);
            },
            cols: [
            {
                values: ctrlDate.initYears(MaxBirth[0],MinBirth[0]),
                cssClass: 'text-center col-3'
            },
            {
                values: ctrlDate.initMonthes,
                cssClass: 'text-center col-2'
            },
            {
                values: ctrlDate.getDays(),
                cssClass: 'text-center col-2'
            }
            ],
            onClose: function(){
            }
        });

        $("#relationship").picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormUsConf.tip_14+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_6, BW.FormUsConf.tip_32, BW.FormUsConf.tip_33, BW.FormUsConf.tip_34, BW.FormUsConf.tip_35],
                  cssClass: 'picker-items-col-normal'
                }
              ],
            onClose: function(){
                var v3 = $("#relationship").val();
                var block = $("#insured-name,#papers-insured-type,#papers-insured-code,#zip-code2,#insured-birth,#city-type2,#address2").closest(".flex-wrap");
                if( v3== BW.FormUsConf.tip_6){
                    block.addClass("flex-wrap-hide");
                }else{
                    block.removeClass("flex-wrap-hide");
                }

                var catg;

                if(v3 != BW.FormUsConf.tip_6){
                    if($("#tip-wrap").length<1){
                        $("#relationship").closest(".flex-wrap").after('<div class="flex-wrap bg-grey" id="tip-wrap">\
                            <div class="item-tips">*指定被保人必须为未成年人</div>\
                        </div>');
                    }
                    
                    catg = [BW.FormUsConf.tip_30,BW.FormUsConf.tip_31,BW.FormUsConf.tip_29];
                    
                }else if(v3 == BW.FormUsConf.tip_6){
                    if($("#tip-wrap").length>0){
                        $("#tip-wrap .item-tips").html('');
                    }
                    
                    catg = [BW.FormUsConf.tip_20, BW.FormUsConf.tip_21,BW.FormUsConf.tip_22,BW.FormUsConf.tip_23,BW.FormUsConf.tip_24,BW.FormUsConf.tip_25,BW.FormUsConf.tip_26,BW.FormUsConf.tip_27,BW.FormUsConf.tip_28,BW.FormUsConf.tip_29];
                }

                var job = $("#insurer-job");
                var a = job.closest(".item-input");
                job.remove();
                a.append('<input type="text" id="insurer-job" placeholder="'+BW.FormPlhldrConf.tip_11+' >">');
                $("#insurer-job").picker({
                    toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                    <h1 class="title">'+BW.FormPlhldrConf.tip_11+'</h1>\
                    </header>',
                    cols: [
                        {
                          textAlign: 'center',
                          values: catg,
                          cssClass: 'picker-items-col-normal'
                        }
                    ]
                });
            }
        });

        $("#city-type").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>'
        });

        $("#city-type2").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>'
        });

        if(this.inputInfo&&this.inputInfo.relations&&this.inputInfo.relations!=0){
            var catg = [BW.FormUsConf.tip_30,BW.FormUsConf.tip_31,BW.FormUsConf.tip_29];
        }else{
            var catg = [BW.FormUsConf.tip_20, BW.FormUsConf.tip_21,BW.FormUsConf.tip_22,BW.FormUsConf.tip_23,BW.FormUsConf.tip_24,BW.FormUsConf.tip_25,BW.FormUsConf.tip_26,BW.FormUsConf.tip_27,BW.FormUsConf.tip_28,BW.FormUsConf.tip_29];
        }

        $("#insurer-job").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormPlhldrConf.tip_11+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: catg,
                  cssClass: 'picker-items-col-normal'
                }
            ]
        });

        $(".btn-insure-next").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            if(!_this.check()){return;}


            var addr = $("#city-type").val().split(" ");
            _this.province = addr[0];
            _this.city = addr[1];
            _this.county = addr[2];


            var addr2 = $("#city-type").val().split(" ");
            _this.province2 = addr2[0];
            _this.city2 = addr2[1];
            _this.county2 = addr2[2];

            var record ={
                holder_name:$("#ph-name").val(),
                holder_card_id:$("#papers-code").val(),
                holder_telephone:$("#telephone").val(),
                holder_email:$("#email").val(),
                holder_province:$("#city-type").val(),
                holder_city:$("#city-type").val(),
                holder_county:$("#city-type").val(),
                holder_address:$("#address").val(),
                holder_zip_code:$("#zip-code").val(),
                relations:$("#relationship").val(),
                insured_name:$("#insured-name").val(),
                insured_card_type:$("#papers-insured-type").val(),
                insured_card_id:$("#papers-insured-code").val(),
                insured_birth:$("#insured-birth").val(),
                insured_province:$("#city-type2").val(),
                insured_city:$("#city-type2").val(),
                insured_county:$("#city-type2").val(),
                insured_address:$("#address2").val(),
                insured_zip_code:$("#zip-code2").val(),
                insured_vocational:$("#insurer-job").val(),
                insured_height:$("#stature").val(),
                insured_weight:$("#weight").val()
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoYgjkPro", value);
            _this.submit();
            
        })

    },
    submit: function(){
        var v = {
            token:this.token,
            product_id:161219001,
            holder_name:$("#ph-name").val(),
            holder_card_id:$("#papers-code").val(),
            holder_telephone:$("#telephone").val(),
            holder_email:$("#email").val(),
            holder_province:this.province,
            holder_city:this.city,
            holder_county:this.county,
            holder_address:$("#address").val(),
            holder_zip_code:$("#zip-code").val(),
            relations:this.id($("#relationship").val()),
            insured_name:$("#insured-name").val(),
            insured_card_type:this.id($("#papers-insured-type").val()),
            insured_card_id:$("#papers-insured-code").val(),
            insured_birth:$("#insured-birth").val(),
            insured_province:this.province2,
            insured_city:this.city2,
            insured_county:this.county2,
            insured_address:$("#address2").val(),
            insured_zip_code:$("#zip-code2").val(),
            insured_vocational:this.id($("#insurer-job").val()),
            insured_height:$("#stature").val(),
            insured_weight:$("#weight").val(),
            promotion_id:this.userId
        };
        $(".btn-insure-next").addClass("disabled");
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/healthOne/insure/sendPersonDetails', v, function (re) {
            if(re.code=="0001000"){
                window.location.href = _this.share?"ygjk_confirm.html?type=1&userId="+_this.userId+"&orderId="+re.data.order_code:"bmy://app.page/life/nextpage?parameterList=orderId="+re.data.order_code+"&url="+"/view/product_life/ygsx/ygjk_confirm.html?inject=all&isH5navBar=1";
            }else if(re.code=="0008004"){
                re.data.reason?popUp({
                    btnLeft:"btn-grey js-close",
                    btnRight:"btn-orange js-back",
                    leftWord:"取消",
                    rightWord:"确定",
                    msgText:re.data.reason,
                    msgAlign:"text-center"
                }):popAlert("操作失败，请稍后再试！");
                $(".js-back").off("tap").on("tap",function(){
                    window.location =_this.share? window.history.go(-2):"bmy://app.page/pageTwoReturn"
                });
            }else{
                re.data.reason?popAlert(re.data.reason):re.msg?popAlert(re.msg):popAlert("操作失败");
            }
            $(".btn-insure-next").removeClass("disabled");
        },'json')
    },
    test: function(){
        var insuredtype = $("#papers-insured-type").val();
        var relationship = $("#relationship").val();
        var values = [
            {
                name:"username",
                val:$("#ph-name").val()
            },
            {
                name:"ID",
                val:$("#papers-code").val()
            },
            {
                name:"mobile",
                val:$("#telephone").val()
            },
            {
                name:"email",
                val:$("#email").val()
            },
            {
                name:"notEmpty",
                val:$("#city-type").val(),
                msg:"所在省市不能为空"
            },
            {
                name:"address",
                val:$("#address").val()
            },
            {
                name:"zipcode",
                val:$("#zip-code").val()
            },
            {
                name:"notEmpty",
                val:$("#relationship").val(),
                msg:"与投保人关系不能为空"
            },
            {
                name:relationship=="本人"?"":"username",
                val:$("#insured-name").val()
            },
            {
                name:relationship=="本人"?"":"notEmpty",
                val:$("#papers-insured-type").val()
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"ID":"oID"),
                val:$("#papers-insured-code").val()
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"":"notEmpty"),
                val:$("#insured-birth").val(),
                msg:"出生日期不能为空"
            },
            {
                name:relationship=="本人"?"":"notEmpty",
                val:$("#city-type2").val(),
                msg:"所在省市不能为空"
            },
            {
                name:relationship=="本人"?"":"address",
                val:$("#address2").val()
            },
            {
                name:relationship=="本人"?"":"zipcode",
                val:$("#zip-code2").val()
            },
            {
                name:"notEmpty",
                val:$("#insurer-job").val(),
                msg:"职业不能为空"
            },
            {
                name:"positiveNum",
                val:$("#stature").val(),
                msg:"身高输入正整数"
            },
            {
                name:"positiveNum",
                val:$("#weight").val(),
                msg:"体重输入正整数"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    check: function(){
        if(calAge($("#insured-birth").val(),2)=="18"){
            popAlert("被保人已满18周岁！");return false;
        }
        var h = $("#stature").val();
        var w = $("#weight").val();
        if(h<20||h>250||w<2||w>150){
            popAlert("身高或体重不符合要求");return false;
        }
        return true;
    },
    id: function(v){
        var list ={
            "身份证":0,
            "护照":2,
            "户口本":1,
            "本人":0,
            "父子":1,
            "父女":2,
            "母子":3,
            "母女":4,
            "男":1,
            "女":2,
            "行政业务办公人员（内勤）":5010101,
            "工厂、企业负责人":3050104,
            "企业经理":3050102,
            "一般学生":4099907,
            "家庭主妇":6071203,
            "营业员":14010101,
            "阳光保险代理人":4070207,
            "杂货商":1501006,
            "农夫":101002,
            "其他":0,
            "学龄前儿童（小学前）":4099908,
            "学生（18周岁以下）":4099907,
            "父子":1,
            "父女":2,
            "母子":3,
            "母女":4
        }
        return list[v]
    }
}

//确认订单
function ConfirmYgjk(options){
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

ConfirmYgjk.prototype = {
    init: function(){
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/healthOne/insure/getNotSubmitOrderInfo/', {token:_this.token,order_code:_this.order_id}, function (re) { 
            if(re.code=='0001000'){
                var hs = '<div class="card-block product-result-wrap">';
                var he = '</div>';

                var insured_card_type = _this.idtype(re.data.insured.insured_card_type);
                var pdf = re.data.base.serie_id==0?"02阳光人寿关爱e生癌症疾病保险A款条款.pdf":(re.data.base.serie_id==1?"02阳光人寿关爱e生重大疾病保险C款条款.pdf":"02阳光人寿关爱e生重大疾病保险D款条款.pdf");
                var shareTitle = _this.share?'':'bmy://app.page/document/?docAddress=';
                var agree = '<a href="'+shareTitle+'/public/pdf/ygjk/投保须知.docx" class="font-FF6900">《投保须知》</a>、<a href="'+shareTitle+'/public/pdf/ygjk/人身保险投保提示书--网络投保模板20150416.doc" class="font-FF6900">《投保提示书》</a>、<a href="'+shareTitle+'/public/pdf/ygjk/'+pdf+'" class="font-FF6900">《保险产品条款》</a>、<a href="'+shareTitle+'/public/pdf/ygjk/投保人声明-传统产品完整版.doc" class="font-FF6900">《投保人声明》</a>';

                var insured,holder;
                if(re.data.insured.relations!=0){
                    insured = _this.getStaticDom(BW.FormTitConf.tip_11,re.data.insured.relations_title)
                    +_this.getStaticDom(BW.FormTitConf.tip_12,re.data.insured.insured_name)
                    +_this.getStaticDom(BW.FormTitConf.tip_5,insured_card_type)
                    +_this.getStaticDom(BW.FormTitConf.tip_6,re.data.insured.insured_card_id)
                    +_this.getStaticDom(BW.FormTitConf.tip_18,re.data.base.birth)
                    +_this.getStaticDom(BW.FormTitConf.tip_9,re.data.insured.insured_province+" "+re.data.insured.insured_city+" "+re.data.insured.insured_county)
                    +_this.getStaticDom(BW.FormTitConf.tip_10,re.data.insured.insured_address)
                    +_this.getStaticDom(BW.FormTitConf.tip_26,re.data.insured.insured_zip_code)
                    +_this.getStaticDom(BW.FormTitConf.tip_27,re.data.insured.insured_height+"cm")
                    +_this.getStaticDom(BW.FormTitConf.tip_28,re.data.insured.insured_weight+"kg")
                    +_this.getStaticDom(BW.FormTitConf.tip_13,re.data.insured.insured_vocational_title);
                    holder = "";
                }else{
                    insured = _this.getStaticDom("被保险人与投保人为同一人","");
                    holder = _this.getStaticDom(BW.FormTitConf.tip_27,re.data.insured.insured_height+"cm")
                    +_this.getStaticDom(BW.FormTitConf.tip_28,re.data.insured.insured_weight+"kg")
                    +_this.getStaticDom(BW.FormTitConf.tip_13,re.data.insured.insured_vocational_title);
                }

                var p = _this.entryID?"":_this.tbrTitle("",BW.FormInfo.tip_6)
                                        +'<div class="flex-wrap flex-wrap-static">'
                                        +'<i class="iconfont icon-unselected-single tb-agreement"></i>'
                                        +'<p class="notice-title">我已了解并接受<span>'+agree+'</span></p>'
                                        +'</div>'
                                        +he
                                        +'<div class="btn-insure-confirm disabled">确认提交</div>';

                var payment = re.data.base.payment_period=="1"?"一次付清":re.data.base.payment_period+"年";
                var insure_period = re.data.base.insure_period=="70"||re.data.base.insure_period=="100"?"至"+re.data.base.insure_period+"周岁":re.data.base.insure_period+"年";

                var html = hs+_this.getStaticDom('<h1 class="insure-title-proname">'+re.data.product.product_name+'</h1>',re.data.product.company_name)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_1)
                        +_this.getStaticDom(BW.FormTitConf.tip_21,re.data.base.premium+"万元")
                        +_this.getStaticDom(BW.FormTitConf.tip_30,re.data.base.quotation+"元/年")
                        +_this.getStaticDom(BW.FormTitConf.tip_22,insure_period)
                        +_this.getStaticDom(BW.FormTitConf.tip_23,payment)
                        +_this.getStaticDom(BW.FormTitConf.tip_24,"年交")
                        +_this.getStaticDom(BW.FormTitConf.tip_29,re.data.base.effective_date)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_2)
                        +_this.getStaticDom(BW.FormTitConf.tip_4,re.data.holder.holder_name)
                        +_this.getStaticDom(BW.FormTitConf.tip_25,re.data.holder.holder_card_id)
                        +_this.getStaticDom(BW.FormTitConf.tip_7,re.data.holder.holder_telephone)
                        +_this.getStaticDom(BW.FormTitConf.tip_8,re.data.holder.holder_email)
                        +_this.getStaticDom(BW.FormTitConf.tip_9,re.data.holder.holder_province+" "+re.data.holder.holder_city+" "+re.data.holder.holder_county)
                        +_this.getStaticDom(BW.FormTitConf.tip_10,re.data.holder.holder_address)
                        +_this.getStaticDom(BW.FormTitConf.tip_26,re.data.holder.holder_zip_code)
                        +holder
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_3)
                        +insured
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_4)
                        +_this.getStaticDom(re.data.benefit[0].name,re.data.benefit[0].value)
                        +_this.getStaticDom(re.data.benefit[1].name,re.data.benefit[1].value)
                        +he+hs+p
                        ;
                $(".content").html(html);
                _this.count = 0;
                _this.event();
            }
        },'json');
    },
    event: function(){
        var _this = this;
        $(".tb-agreement").off("tap").on("tap",function(){
            $(this).toggleClass("icon-unselected-single").toggleClass("icon-selected-single");
            _this.isAllow();
        })

        $(".btn-insure-confirm").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            var m = $('<div class="mask-layer"></div>');
            var l = $('<div class="loading"><div class="loading-img"></div><div class="loadding-word color-fff">核保中...</div></div>');
            $("body").append(m,l);
            m.show();
            _this.confirm();
        })
    },
    isAllow: function(){
        if($(".tb-agreement").hasClass("icon-selected-single")){
            $(".btn-insure-confirm").removeClass("disabled")
        }else{
            $(".btn-insure-confirm").addClass("disabled")
        }
    },
    getStaticDom: function(name,val){
        var pb = new ProBox();
        this.values = {
            name:name,
            val:val
        }
        return pb.staticDom.call(this.values);
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    },
    idtype: function(n){
        switch(n){
            case "0":
                return "身份证";break;
            case "1":
                return "户口本";break;
            case "2":
                return "护照"; break;
            default:
                return "身份证";break;
        }
    },
    confirm: function(){
        var _this = this;

        $.post('//'+domain.sx+'/insurance/sinosig/healthOne/InsureSingsig/send', {token:_this.token,order_code:_this.order_id}, function (re) {
            $(".loading").remove();
            if(re.code=='0001000'){
                if(re.data.code=="2"){
                    localStorage.removeItem("InfoYgjk");
                    localStorage.removeItem("InfoYgjkPro");
                    $(".mask-layer").remove();
                    if(_this.share){
                        window.location.href = "/view/pay/bank.html?type=1&pay=bank&orderId="+_this.order_id;
                    }else{
                        window.location.href = "bmy://app.page/life/nextpage?parameterList=orderId="+_this.order_id+"||pay=bank&url="+"/view/pay/bank.html?inject=all&isH5navBar=1";
                    }
                }else {
                    popCommon("投保失败",re.data.msg,"<a href='javascript:;' id='failed' class='color-fff close-know'>我知道了</a>");
                    $("#failed").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/ygsx/ygjk_insure.html?type=1&userId="+_this.userId:"bmy://app.page/pageReturn";
                    })
                }
            }else{
                popCommon("提示","错误","<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
            }
        },'json')
    }
}


//阳光人生随e保
function DetailYgrs(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

DetailYgrs.prototype = {
    init: function(){
        var _this = this;
        if(this.enterid=="2"){
            var html = '<a href="javascript:;" class="to-rule">规则说明</a>\
                <div class="to-share">分享给客户<br><span>(对方看不到推广费)</span></div>\
                <div class="to-insure">立即投保</div>';
            $(".btn-insure").html(html);
            $(".is-spread").append('<div class="spread-block"><span class="spread-blklt">推广费</span><span class="spread-blkrt">50%</span></div>');
            $(".to-rule").on("tap",function(){
                var mask = $('<div class="masklayer-word"><h1>分享规则说明</h1><p>保满意的认证经纪人分享保满意提供的保险产品、资讯等内容，好友点击阅读后即成为您的归属客户。好友查看您分享的产品或资讯等内容，保满意通知中心和客户动态都会及时通知您，方便您及时跟进。客户通过您分享链接下单，您可获得产品对应的推广费。</p><i class="iconfont icon-close close-layer"></i></div>');
                $("body").append(mask);
                $(".close-layer").on("tap",function(){
                    mask.remove();
                });
            });
            $(".to-share").on("tap",function(){
                _this.sharepage();
            })
        }
        var url = '/view/product_life/ygsx/ygrs_concept.html?inject=all';
        $(".to-insure").on("tap",function(){
            window.location.href = "bmy://app.page/life/product/judgeLogin?url="+url+"&isH5navBar=1";
        })
        _this.price();
    },
    price: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/client/Product/reward', {config_id:_this.productId}, function (re) {
            if(re.code=="0001000"){
                if(re.data.same=='1'){
                    var f = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    $(".insure-price").html('￥'+re.data.price.man+'/份');
                    $(".spread-blkrt").html(re.data.agent.man);
                    $(".is-spread").html('<span class="price-sex"><em class="product-price price-male">'+re.data.price.man+f+'</em></span>');
                }else{
                    var ff = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    var fm = re.data.reward.woman?'<span class="font-28 mrl-20">返'+re.data.reward.woman+'</span>':'';
                    var pricemale,pricemale2,pricefemale,pricefemale2;
                    if(re.data.price.man){
                        pricemale = '男性￥'+re.data.price.man+'/份<br>';
                        pricemale2 = '男性<em class="product-price price-male">'+re.data.price.man+ff+'</em><br>'
                    }else {
                        pricemale = ''
                        pricemale2 = ''
                    }

                    if(re.data.price.woman){
                        pricefemale = '女性￥'+re.data.price.woman+'/份'
                        pricefemale2 = '女性<em class="product-price price-female">'+re.data.price.woman+fm+'</em>'
                    }else {
                        pricefemale = ''
                        pricefemale2 = ''
                    }

                    $(".insure-price").html(pricemale+pricefemale);
                    $(".is-spread").html('<span class="price-sex">'+pricemale2+pricefemale2+'</span>');
                    $(".spread-blkrt").html(re.data.agent.man);
                }
            }
        },'json')
    },
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&userId='+this.userId+'&eUid='+this.eUid):(location.href+'?type=1&userId='+this.userId+'&eUid='+this.eUid);
        ShareFun("超值性价比，为您提供全面意外保障","我在保满意中发现了一款好产品，你也看看吧",url,null,2);
    }
}


function RsCpt(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

RsCpt.prototype = {
    init: function(){
        $(".content").html(this.dom());
        this.event();
        this.inputInfo = localStorage.getItem("InfoYgrs")?$.parseJSON(localStorage.getItem("InfoYgrs")):0;
        this.inputInfo?this.fill():"";
    },
    fill: function(){
        $("#insured-sex").val(this.inputInfo.sex);
        $("#insured-birth").val(this.inputInfo.birth);
        $("#premium").val(this.inputInfo.premium);
        $("#insure-period").val(this.inputInfo.insure_period);
        $("#payment-period").val(this.inputInfo.payment_period);
        $("#city-type").val(this.inputInfo.city_type);
        this.calBaoe();
    },
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        return  hs+this.tbrTitle("",BW.FormInfo.tip_3)
                +this.getDom(BW.FormTitConf.tip_9,"city-type",BW.FormPlhldrConf.tip_25+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_2+BW.FormTitConf.tip_17,"insured-sex",BW.FormPlhldrConf.tip_14+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18+'<span class="title-tips">(被保人年龄需在18~50周岁)</span>',"insured-birth",BW.FormPlhldrConf.tip_15+' >',"bod-botm")               
                +he+hs
                +this.tbrTitle("",BW.FormInfo.tip_10)
                +this.getDom(BW.FormTitConf.tip_21+'(万元)<span class="title-tips">(50万以上需要公司邮箱验证)</span>',"premium",BW.FormPlhldrConf.tip_18,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_22,"insure-period",BW.FormPlhldrConf.tip_19+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_23,"payment-period",BW.FormPlhldrConf.tip_20+' >',"bod-botm")
                +this.getStaticDom(BW.FormTitConf.tip_24,"年交","")
                +he+hs
                +this.getStaticDom("产品报价",'<em class="product-price"></em>',"")
                +he
                +'<div class="btn-insure-next">保费测算</div>'
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    },
    getDom: function(name,idName,placeholder,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            idName:idName,
            placeholder:placeholder,
            className:cname?cname:""
        }
        return pb.dom.call(this.values);
    },
    getStaticDom: function(name,val,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            val:val,
            className:cname?cname:""
        }
        return pb.staticDom.call(this.values);
    },
    changeItem: function(){
        $(".btn-insure-next").html("保费测算");
    },
    calBaoe: function(){
        if($("#city-type").val()&&$("#insured-birth").val()){
            var age = calAge($("#insured-birth").val(),2);
            var cityCat = this.cityType($("#city-type").val());
            if($("#tip-wrap").length<1){
                $("#premium").closest(".flex-wrap").after('<div class="flex-wrap bg-grey" id="tip-wrap">\
                            <div class="item-tips"></div>\
                        </div>');
            }
            var tips = $(".item-tips");
            if(cityCat=="A"&&age>=18&&age<41){
                tips.html("*请填写1-100之间整数。如填写保额在51万元-100万元之间，后续会请您进行邮箱验证。");
            }
            if(cityCat=="A"&&age>=41&&age<=50){
                tips.html("*请填写1-50之间整数。如填写保额在31万元-50万元之间，后续会请您进行邮箱验证。");
            }

            if(cityCat=="B"&&age>=18&&age<41){
                tips.html("*请填写1-50之间整数。");
            }
            if(cityCat=="B"&&age>=41&&age<=50){
                tips.html("*请填写1-30之间整数。");
            }

            if(cityCat=="C"&&age>=18&&age<41){
                tips.html("*请填写1-30之间整数。");
            }
            if(cityCat=="C"&&age>=41&&age<=50){
                tips.html("*请填写1-20之间整数。");
            }
        }
    },
    cityType:function(city){
        var arrA = ["北京","上海","广州","深圳","天津","南京","杭州"]; //A类城市
        var arrB = ["包头","长沙","成都","重庆","东莞","佛山","福州","合肥","呼和浩特","济南","昆明","兰州","南昌","宁波","南宁","泉州","青岛","苏州","石家庄","太原","唐山","武汉","乌鲁木齐","无锡","西安","厦门","烟台","郑州"]; //B类城市
        for(var i=0;i<arrA.length;i++){
            if(arrA[i].indexOf(city)>=0||city.indexOf(arrA[i])>=0){
                return "A"
            }
        }

        for(var i=0;i<arrB.length;i++){
            if(arrB[i].indexOf(city)>=0||city.indexOf(arrB[i])>=0){
                return "B"
            }
        }

        return "C";
    },
    event: function(){
        var _this = this;
        $("#js-choose .item-tab").on("tap",function(){
            $(".item-tab").removeClass("choose-on");
            $(this).addClass("choose-on");
            _this.changeItem();
        });
        $("#premium").on("blur",function(){
            _this.changeItem();
        });

        $("#city-type").noDistrictsPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>',
            onClose: function(){
                _this.calBaoe();
                _this.changeItem();
            }
        });

        $("#insured-sex").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormUsConf.tip_18+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_16, BW.FormUsConf.tip_17],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                _this.changeItem();
            }
        });

        var MaxBirth = birtday(50,"year").split("-");
        var MinBirth = birtday(18,"year").split("-");

        $("#insured-birth").dtCtrlPicker({
            onChange: function (picker, values, displayValues) {
                if(picker.cols[0].value==MaxBirth[0]&&picker.cols[1].value < MaxBirth[1]){
                    picker.cols[1].setValue(MaxBirth[1]);
                    popAlert("年龄为18~50周岁");
                }
                if(picker.cols[0].value==MaxBirth[0]&&picker.cols[1].value==MaxBirth[1]&&picker.cols[2].value < MaxBirth[2]){
                    picker.cols[2].setValue(MaxBirth[2]);
                    popAlert("年龄为18~50周岁");
                }
                if(picker.cols[0].value==MinBirth[0]&&picker.cols[1].value > MinBirth[1]){
                    picker.cols[1].setValue(MinBirth[1]);
                    popAlert("年龄为18~50周岁");
                }
                if(picker.cols[0].value==MinBirth[0]&&picker.cols[1].value==MinBirth[1]&&picker.cols[2].value > MinBirth[2]){
                    picker.cols[2].setValue(MinBirth[2]);
                    popAlert("年龄为18~50周岁");
                }
                var days = ctrlDate.getDaysByMonthAndYear(picker.cols[1].value, picker.cols[0].value);
                var currentValue = picker.cols[2].value;
                if(currentValue > days.length) currentValue = days.length;
                picker.cols[2].setValue(currentValue);
            },
            cols: [
            {
                values: ctrlDate.initYears(MaxBirth[0],MinBirth[0]),
                cssClass: 'text-center col-3'
            },
            {
                values: ctrlDate.initMonthes,
                cssClass: 'text-center col-2'
            },
            {
                values: ctrlDate.getDays(),
                cssClass: 'text-center col-2'
            }
            ],
            onClose: function(){
                _this.calBaoe();
                _this.changeItem();
            }
        });

        $("#insure-period").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormTitConf.tip_22+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: ['10年','15年','20年','25年','30年','至70周岁','至80周岁','至100周岁'],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                _this.changeItem();
            }
        });

        $("#payment-period").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormTitConf.tip_23+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: ['一次交清','3年','5年','10年','20年','至60周岁'],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                _this.changeItem();
            }
        });


        $(".btn-insure-next").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            if(!_this.check()){return;}

            var addr = $("#city-type").val().split(" ");
            _this.province = addr[0];
            _this.city = addr[1];

            var record ={
                serie_id:$(".item-tab.choose-on").attr("data-id"),
                sex:$("#insured-sex").val(),
                birth:$("#insured-birth").val(),
                premium:$("#premium").val(),
                insure_period:$("#insure-period").val(),
                payment_period:$("#payment-period").val(),
                city_type:$("#city-type").val()
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoYgrs", value);

            var i = new YgCpt({
                token:_this.token,
                product_id:161219002,
                serie_id:$(".item-tab.choose-on").attr("data-id"),
                sex:_this.id($("#insured-sex").val()),
                birth:$("#insured-birth").val(),
                premium:$("#premium").val(),
                insure_period:$("#insure-period").val(),
                payment_period:$("#payment-period").val(),
                province:_this.province,
                city:_this.city,
                share:_this.share,
                name:"ygrs",
                userId:_this.userId
            })
            $(".btn-insure-next").addClass("disabled");
            i.init();
        })
    },
    test: function(){
        var values = [
            {
                name:"notEmpty",
                val:$("#city-type").val(),
                msg:"所在省市不能为空"
            },
            {
                name:"notEmpty",
                val:$("#insured-sex").val(),
                msg:"被保人性别不能为空"
            },
            {
                name:"notEmpty",
                val:$("#insured-birth").val(),
                msg:"出生日期不能为空"
            },
            {
                name:"notEmpty",
                val:$("#premium").val(),
                msg:"基本保额不能为空"
            },
            {
                name:"notEmpty",
                val:$("#insure-period").val(),
                msg:"保险期间不能为空"
            },
            {
                name:"notEmpty",
                val:$("#payment-period").val(),
                msg:"交费期间不能为空"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    check: function(){
        var premium = $("#premium").val();
        if(!matchTest.regularList["positiveNum"].test(premium)){
           popAlert("保额为正整数！");
           return false;
        }
        return true;
    },
    id: function(v){
        var list ={
            "男":1,
            "女":2
        }
        return list[v]
    }
}

function ProYgrs(options){
    var _default = {
        token: 0,
        proName: "保满意",
        share:false,
        userId: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

ProYgrs.prototype = {
    init: function(){
        var inputInfo2 = localStorage.getItem("InfoYgrs")?$.parseJSON(localStorage.getItem("InfoYgrs")):0;
        if(inputInfo2){
            var age = calAge(inputInfo2.birth,"2");
            var type = this.cityType(inputInfo2.city_type);
            var premium = inputInfo2.premium;
            this.isEmail = (age>=18&&age<=40&&type=="A"&&premium>=51&&premium<=100)||(age>=41&&age<=50&&type=="A"&&premium>=31&&premium<=50)?true:false
            $("#page-ygrs .content").html(this.dom());
            this.event();
            this.beneficiaryEvent(1);
            this.inputInfo = localStorage.getItem("InfoYgrsPro")?$.parseJSON(localStorage.getItem("InfoYgrsPro")):0;
            this.inputInfo?this.fill():"";
        }else{
            this.getInfo();
        }
    },
    fill: function(){
        if(this.inputInfo.checked==2){
            var l1 = $("input[name='beneficiary'][value='1']").closest("label");
            var l2 = $("input[name='beneficiary'][value='2']").closest("label");
            l1.removeClass("checked");
            l1.find(".iconfont").removeClass("icon-selected-single").addClass("icon-unselected-single");
            l2.addClass("checked");
            l2.find(".iconfont").addClass("icon-selected-single").removeClass("icon-unselected-single");
            $(".assignBen").show();
        }

        $("#ph-name").val(this.inputInfo.ph_name);
        $("#papers-code").val(this.inputInfo.papers_code);
        $("#telephone").val(this.inputInfo.telephone);
        $("#email").val(this.inputInfo.email);
        $("#city-type").val(this.inputInfo.pcc);
        $("#address").val(this.inputInfo.address);
        $("#insurer-job").val(this.inputInfo.vocational);
        $("#zip-code").val(this.inputInfo.zip_code);
        $("#stature").val(this.inputInfo.stature);
        $("#weight").val(this.inputInfo.weight);
        
        $("#relation1").val(this.inputInfo.relation1);
        $("#name1").val(this.inputInfo.name1);
        $("#card-type1").val(this.inputInfo.card_type1);
        $("#card-id1").val(this.inputInfo.card_id1);
        $("#sex1").val(this.inputInfo.sex1);
        $("#birth1").val(this.inputInfo.birth1);
        $("#scale1").val(this.inputInfo.scale1);

        if(this.inputInfo.card_type1=="身份证"){
            $("#birth1").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#sex1").closest(".flex-wrap").addClass("flex-wrap-hide");
        }
        if(this.inputInfo.relation2){
            $("#assign_1").after('<div class="assignblock" id="assign_2">'+this.beneficiaryDom(2)+'</div>');
            this.beneficiaryEvent(2);
            $("#relation2").val(this.inputInfo.relation2);
            $("#name2").val(this.inputInfo.name2);
            $("#card-type2").val(this.inputInfo.card_type2);
            $("#card-id2").val(this.inputInfo.card_id2);
            $("#sex2").val(this.inputInfo.sex2);
            $("#birth2").val(this.inputInfo.birth2);
            $("#scale2").val(this.inputInfo.scale2);
            if(this.inputInfo.card_type2=="身份证"){
                $("#birth2").closest(".flex-wrap").addClass("flex-wrap-hide");
                $("#sex2").closest(".flex-wrap").addClass("flex-wrap-hide");
            }
        }
        if(this.inputInfo.relation3){
            $("#assign_2").after('<div class="assignblock" id="assign_3">'+this.beneficiaryDom(3)+'</div>');
            this.beneficiaryEvent(3);
            $("#relation3").val(this.inputInfo.relation3);
            $("#name3").val(this.inputInfo.name3);
            $("#card-type3").val(this.inputInfo.card_type3);
            $("#card-id3").val(this.inputInfo.card_id3);
            $("#sex3").val(this.inputInfo.sex3);
            $("#birth3").val(this.inputInfo.birth3);
            $("#scale3").val(this.inputInfo.scale3);
            if(this.inputInfo.card_type3=="身份证"){
                $("#birth3").closest(".flex-wrap").addClass("flex-wrap-hide");
                $("#sex3").closest(".flex-wrap").addClass("flex-wrap-hide");
            }
        }
    },
    getInfo: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/Scheme/detail/', {token:_this.token,product_id:161219002}, function (re) {
            if(re.code=="0001000"){
                var age = calAge(re.data.birth,"2");
                var type = _this.cityType(re.data.province+re.data.city);
                var premium = re.data.premium;
                _this.isEmail = (age>=18&&age<=40&&type=="A"&&premium>=51&&premium<=100)||(age>=41&&age<=50&&type=="A"&&premium>=31&&premium<=50)?true:false;
                $("#page-ygrs .content").html(_this.dom());
                _this.event();
                _this.beneficiaryEvent(1);
                _this.inputInfo = localStorage.getItem("InfoYgrsPro")?$.parseJSON(localStorage.getItem("InfoYgrsPro")):0;
                _this.inputInfo?_this.fill():"";
            }
        },'json')
    },
    cityType: function(city){
        var arrA = ["北京","上海","广州","深圳","天津","南京","杭州"]; //A类城市
        for(var i=0;i<arrA.length;i++){
            if(arrA[i].indexOf(city)>=0||city.indexOf(arrA[i])>=0){
                return "A"
            }
        }
        return "O";
    },
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        var e = this.isEmail?'<div class="getcode code2" id="get-email">验证邮箱</div>':'';
        return  hs+this.tbrTitle("icon-applicant",BW.FormTitConf.tip_1)
                +this.getDom(BW.FormTitConf.tip_4,"ph-name",BW.FormPlhldrConf.tip_1,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_25,"papers-code",BW.FormPlhldrConf.tip_21,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_7,"telephone",BW.FormPlhldrConf.tip_4,"bod-botm")
                +'<div class="flex-wrap bod-botm"><div class="item-title">'+BW.FormTitConf.tip_8+'</div><div class="item-input flex-wrap" style=" padding:0;">\
                        <input type="email" id="email" placeholder="'+BW.FormPlhldrConf.tip_5+'">'+e
                +'</div></div>'
                +this.getDom(BW.FormTitConf.tip_13,"insurer-job",BW.FormPlhldrConf.tip_11+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_9,"city-type",BW.FormPlhldrConf.tip_6+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_10,"address",BW.FormPlhldrConf.tip_7,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_26,"zip-code",BW.FormPlhldrConf.tip_22,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_27+"(厘米)","stature",BW.FormPlhldrConf.tip_23,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_28+"(公斤)","weight",BW.FormPlhldrConf.tip_24,"")
                +he+hs
                +this.tbrTitle("icon-insured",BW.FormTitConf.tip_2)
                +this.getStaticDom(BW.FormInfo.tip_13,"","")
                +he+hs
                +this.tbrTitle("icon-beneficiary",BW.FormTitConf.tip_3)
                +this.beneficiary({
                    bLeft:BW.FormInfo.tip_11,
                    bRight:BW.FormInfo.tip_12,
                    bNum:3,
                    name:"beneficiary",
                    className:"choose-ben"
                })
                +he+hs
                +'<div class="wrapable bg-grey">'
                +'<p class="notice-tips" id="tips-Ben">法定受益人的第一顺序是配偶/父母/子女，第二顺序是祖父母/外祖父母/兄弟姐妹</p>'
                +'<div class="assignBen">'
                +'<div class="assignblock" id="assign_1">'
                +this.beneficiaryDom(1)
                +'</div>'
                +'<div class="item-btn"><a href="javascript:;" class="addBen">添加受益人</a></div>'
                +'</div></div>'
                +he+hs
                +this.tbrTitle("icon-calendar",BW.FormTitConf.tip_29)
                +this.getStaticDom(BW.FormInfo.tip_14,"","bod-botm")
                +he
                +'<div class="btn-insure-next">下一步</div>'
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    },
    getDom: function(name,idName,placeholder,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            idName:idName,
            placeholder:placeholder,
            className:cname?cname:""
        }
        return pb.dom.call(this.values);
    },
    getStaticDom: function(name,val,cname){
        var pb = new ProBox();
        this.values = {
            name:name,
            val:val,
            className:cname?cname:""
        }
        return pb.staticDom.call(this.values);
    },
    choose: function(sel){
        var _this = this;
        var icon = $(".iconfont",sel);
        $(sel).off("tap").on("tap",function(){
            if($("input",this).val()==1){
                $("#tips-Ben").removeClass("bod-botm").html('法定受益人的第一顺序是配偶/父母/子女，第二顺序是祖父母/外祖父母/兄弟姐妹');
                $(".assignBen").hide();
            }else if($("input",this).val()==2){
                $("#tips-Ben").addClass("bod-botm").html('a、3岁以内儿童允许使用"出生医学证明"作为有效证件。<br>b、 线上只能指定最多3名第一顺序受益人。如您需要指定更多受益人，请携带被保险人和指定受益人的有效证件至阳光人寿各地机构柜面办理。<br>c、各受益人的受益比例之和必须为100%。');
                $(".assignBen").show();
            }

            if(!$(this).hasClass("checked")){
                icon.each(function(){
                    $(this).addClass("icon-unselected-single").removeClass("icon-selected-single");
                })
                $(".iconfont",this).removeClass("icon-unselected-single").addClass("icon-selected-single");
                $("input[type='radio']",sel).removeAttr("checked");
                $("input[type='radio']",this).prop("checked","checked");
                $(sel).removeClass("checked");
                $(this).addClass("checked");
            }
        })
    },
    beneficiary: function(v){
        if(typeof(v)=="undefind"){return;}
        var b = new ProBox();
        return b.beneficiary.call(v);
    },
    beneficiaryDom: function(n){
        var num,del;
        if(n==1){
            num = "一"; del = ""
        }else if(n==2){
            num = "二"; del = "<em class='color-FF6900 delBen'>删除</em>"
        }else if(n==3){
            num = "三"; del = "<em class='color-FF6900 delBen'>删除</em>"
        }
        return this.getStaticDom("第"+num+"受益人",del ,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_31,"relation"+n,BW.FormPlhldrConf.tip_8+" >","bod-botm")
                +this.getDom(BW.FormTitConf.tip_32,"name"+n,BW.FormPlhldrConf.tip_26,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_5,"card-type"+n,BW.FormPlhldrConf.tip_2+" >","bod-botm")
                +this.getDom(BW.FormTitConf.tip_6,"card-id"+n,BW.FormPlhldrConf.tip_27,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18,"birth"+n,BW.FormPlhldrConf.tip_15+" >","bod-botm")
                +this.getDom(BW.FormTitConf.tip_17,"sex"+n,BW.FormPlhldrConf.tip_14+" >","bod-botm")
                +this.getDom(BW.FormTitConf.tip_33+"(%)","scale"+n,BW.FormPlhldrConf.tip_28,"bod-botm")
    },
    beneficiaryEvent: function(n){
        $("#relation"+n).picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormPlhldrConf.tip_8+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_32, BW.FormUsConf.tip_33, BW.FormUsConf.tip_34, BW.FormUsConf.tip_35, BW.FormUsConf.tip_36],
                  cssClass: 'picker-items-col-normal'
                }
              ]
        });

        $("#card-type"+n).picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormPlhldrConf.tip_2+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_1, BW.FormUsConf.tip_37],
                  cssClass: 'picker-items-col-normal'
                }
              ],
            onClose: function(){
                if($("#card-type"+n).val()=="身份证"){
                    $("#birth"+n).closest(".flex-wrap").addClass("flex-wrap-hide");
                    $("#sex"+n).closest(".flex-wrap").addClass("flex-wrap-hide");
                }else{
                    $("#birth"+n).closest(".flex-wrap").removeClass("flex-wrap-hide");
                    $("#sex"+n).closest(".flex-wrap").removeClass("flex-wrap-hide");
                }
            }
        });

        $("#birth"+n).datetimePicker({});

        $("#sex"+n).picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormPlhldrConf.tip_14+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_16, BW.FormUsConf.tip_17],
                  cssClass: 'picker-items-col-normal'
                }
              ]
        });

        $(".delBen").off("tap").on("tap",function(){
            if($(this).closest(".assignblock").attr("id")=="assign_2"&&$("#assign_3").length>0){
                var relation = $("#relation3").val();
                var name = $("#name3").val();
                var cardtype = $("#card-type3").val();
                var cardid = $("#card-id3").val();
                var birth = $("#birth3").val();
                var sex = $("#sex3").val();
                var scale = $("#scale3").val();

                $("#assign_3").closest(".assignblock").remove();

                $("#relation2").val(relation);
                $("#name2").val(name);
                $("#card-type2").val(cardtype);
                $("#card-id2").val(cardid);
                $("#birth2").val(birth);
                $("#sex2").val(sex);
                $("#scale2").val(scale);  
                return;
            }

            $(this).closest(".assignblock").remove();
         
        });
    },
    emailEvent: function(){
        var _this = this;
        var url = '/view/product_life/ygsx/ygrs_email.html?inject=all';
        $(".js-gotest").on("tap",function(){
            window.location.href = _this.share?url+"&type=1":"bmy://app.page/life/product/judgeLogin?insureInfo="+url+"&isH5navBar=1";
        });

        $(".js-sure").on("tap",function(){
            if(!$("#code").val()){popAlert("请填写验证码");return;}
            if(!$("#ph-name").val()){popAlert("请填写投保人姓名");return;}
            if(!$("#papers-code").val()){popAlert("请填写投保人身份证号");return;}
            _this.codeSubmit();
        });
    },
    sendCode: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/SendMail', {token:_this.token,holder_email:$("#email").val(),holder_name:$("#ph-name").val(),holder_card_id:$("#papers-code").val()}, function (re) {
            $(".loading").remove();
            if(re.code=="0001000"){
                popUp({
                    btnLeft:"btn-grey js-close",
                    btnRight:"btn-orange js-sure",
                    leftWord:"返回",
                    rightWord:"确定",
                    msgText:"验证码已发送至该邮箱，请输入您收到的验证码，以便完成验证",
                    msgAlign:"text-left",
                    otherContent:'<input type="number" class="pop-input" id="code" placeholder="请输入验证码">'
                });
            }else{
                popUp({
                    btnLeft:"",
                    btnRight:"btn-orange js-close",
                    rightWord:"我知道了",
                    msgText:"真不好意思，系统打了个盹<br>一会再来验证吧~",
                    msgAlign:"text-center"
                });
            }
            $("#get-email").removeClass("disabled")
        },'json')
    },
    codeSubmit: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/MailCode', {token:_this.token,holder_email:$("#email").val()}, function (re) {
            if(re.code=="0001000"){
                popAlert(re.data);
                $(".pop-modal").remove();
                $(".mask-layer").remove();
            }else{
                popAlert(re.data||"操作失败，请稍后再试！");
            }
        },'json')
    },
    event: function(){
        var _this = this;
        this.choose(".beneficiary");
        $("#get-email").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;};
            if(!$("#email").val()){ popAlert("请输入邮箱");return;}
            if(!$("#ph-name").val()){popAlert("请填写投保人姓名");return;}
            if(!$("#papers-code").val()){popAlert("请填写投保人身份证号");return;}
            $(this).addClass("disabled");
            $("body").append(LoadAnimate);
            $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/IsWhite', {token:_this.token,holder_email:$("#email").val()}, function (re) {
                if(re.code=="0001000"){
                    _this.sendCode();
                }else if(re.code=="0008004"){
                    $(".loading").remove();
                    popUp({
                        title:"邮箱验证失败",
                        btnLeft:"btn-grey js-close",
                        btnRight:"btn-orange js-gotest",
                        leftWord:"返回",
                        rightWord:"申请邮箱审核",
                        msgText:"您输入的邮箱不在保险公司工作邮箱名单内，请重新输入工作邮箱，或提交工作邮箱审核。<p class='color-808080'>(请勿输入163、qq、sina、foxmail等公共邮箱)</p>",
                        msgAlign:"text-left"
                    });
                    $("#get-email").removeClass("disabled")
                }else{
                    $(".loading").remove();
                    popUp({
                        btnLeft:"",
                        btnRight:"btn-orange js-close",
                        rightWord:"我知道了",
                        msgText:"真不好意思，系统打了个盹<br>一会再来验证吧~",
                        msgAlign:"text-center"
                    });
                    $("#get-email").removeClass("disabled")
                }
                _this.emailEvent(); 
            },'json')
        });

        $("#papers-insurer-type").picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormUsConf.tip_4+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_1, BW.FormUsConf.tip_2, BW.FormUsConf.tip_3],
                  cssClass: 'picker-items-col-normal'
                }
              ],
            onClose: function(){
                var v = $("#papers-insurer-type").val();
                var b1 = $("#ph-sex").closest(".flex-wrap");
                var b2 = $("#ph-birth").closest(".flex-wrap");
                if( v== BW.FormUsConf.tip_2|| v== BW.FormUsConf.tip_3){
                    b1.removeClass("flex-wrap-hide");
                    b2.removeClass("flex-wrap-hide");
                }else{
                    b1.addClass("flex-wrap-hide");
                    b2.addClass("flex-wrap-hide");
                }
            }
        });

        $("#papers-insured-type").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormUsConf.tip_4+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_1, BW.FormUsConf.tip_2, BW.FormUsConf.tip_3],
                  cssClass: 'picker-items-col-normal'
                }
            ],
            onClose: function(){
                var v2 = $("#papers-insured-type").val();
                var b3 = $("#insured-sex").closest(".flex-wrap");
                var b4 = $("#insured-birth").closest(".flex-wrap");
                if( v2== BW.FormUsConf.tip_2|| v2== BW.FormUsConf.tip_3){
                    b3.removeClass("flex-wrap-hide");
                    b4.removeClass("flex-wrap-hide");
                }else{
                    b3.addClass("flex-wrap-hide");
                    b4.addClass("flex-wrap-hide");
                }
            }
        });

        $("#ph-sex").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormUsConf.tip_18+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_16, BW.FormUsConf.tip_17],
                  cssClass: 'picker-items-col-normal'
                }
            ]
        });

        $("#ph-birth").datetimePicker({});

        $("#insured-sex").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormUsConf.tip_18+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_16, BW.FormUsConf.tip_17],
                  cssClass: 'picker-items-col-normal'
                }
            ]
        });

        $("#insured-birth").datetimePicker({});

        $("#relationship").picker({
              toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormUsConf.tip_14+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_6, BW.FormUsConf.tip_11, BW.FormUsConf.tip_12, BW.FormUsConf.tip_19],
                  cssClass: 'picker-items-col-normal'
                }
              ],
            onClose: function(){
                var v3 = $("#relationship").val();
                var block = $("#insured-name,#papers-insured-type,#papers-insured-code,#zip-code,#insured-birth,#city-type,#address").closest(".flex-wrap");
                if( v3== BW.FormUsConf.tip_6){
                    block.addClass("flex-wrap-hide");
                }else{
                    block.removeClass("flex-wrap-hide");
                }


                if(v3 != BW.FormUsConf.tip_6 && $("#tip-wrap").length<1){
                    $("#relationship").closest(".flex-wrap").after('<div class="flex-wrap bg-grey" id="tip-wrap">\
                        <div class="item-tips">*指定被保人必须为未成年人</div>\
                    </div>');
                    $("#insurer-job").picker({
                        toolbarTemplate: '<header class="bar bar-nav">\
                        <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                        <h1 class="title">'+BW.FormPlhldrConf.tip_11+'</h1>\
                        </header>',
                        cols: [
                            {
                              textAlign: 'center',
                              values: [BW.FormUsConf.tip_30, BW.FormUsConf.tip_31,BW.FormUsConf.tip_29],
                              cssClass: 'picker-items-col-normal'
                            }
                        ]
                    });
                }else if(v3 == BW.FormUsConf.tip_6 && $("#tip-wrap").length>0){
                    $("#tip-wrap .item-tips").html('');
                }
            }
        });


        $("#city-type").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>'
        });

        $("#insurer-job").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">'+BW.FormPlhldrConf.tip_11+'</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: [BW.FormUsConf.tip_20, BW.FormUsConf.tip_21,BW.FormUsConf.tip_22,BW.FormUsConf.tip_23,BW.FormUsConf.tip_24,BW.FormUsConf.tip_25,BW.FormUsConf.tip_26,BW.FormUsConf.tip_27,BW.FormUsConf.tip_28,BW.FormUsConf.tip_29],
                  cssClass: 'picker-items-col-normal'
                }
            ]
        });

        

        $(".addBen").off("tap").on("tap",function(){
            var id = $(".assignblock").length;
            if(id==3){ popAlert("最多只能添加3名受益人");return;}

            var syr = _this.beneficiaryDom(id+1);
            $("#assign_"+id).after('<div class="assignblock" id="assign_'+(id+1)+'">'+syr+'</div>');
            _this.beneficiaryEvent(id+1);
        })


        $(".btn-insure-next").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            if($(".choose-ben label.checked input").val()=="2"&&!_this.test2()){return;}
            if($(".choose-ben label.checked input").val()=="2"&&!_this.check()){return;}


            var addr = $("#city-type").val().split(" ");

            _this.province = addr[0];
            _this.city = addr[1];
            _this.county = addr[2];


            var record ={
                ph_name:$("#ph-name").val(),
                papers_code:$("#papers-code").val(),
                telephone:$("#telephone").val(),
                email:$("#email").val(),
                pcc:$("#city-type").val(),
                address:$("#address").val(),
                zip_code:$("#zip-code").val(),
                vocational:$("#insurer-job").val(),
                stature:$("#stature").val(),
                weight:$("#weight").val(),
                relation1:$("#relation1").val(),
                name1:$("#name1").val(),
                card_type1:$("#card-type1").val(),
                card_id1:$("#card-id1").val(),
                sex1:$("#sex1").val(),
                birth1:$("#birth1").val(),
                scale1:$("#scale1").val(),
                relation2:$("#relation2").val(),
                name2:$("#name2").val(),
                card_type2:$("#card-type2").val(),
                card_id2:$("#card-id2").val(),
                sex2:$("#sex2").val(),
                birth2:$("#birth2").val(),
                scale2:$("#scale2").val(),
                relation3:$("#relation3").val(),
                name3:$("#name3").val(),
                card_type3:$("#card-type3").val(),
                card_id3:$("#card-id3").val(),
                sex3:$("#sex3").val(),
                birth3:$("#birth3").val(),
                scale3:$("#scale3").val(),
                checked:$(".choose-ben label.checked input").val()
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoYgrsPro", value);
            _this.submit();
        })

    },
    submit: function(){
        var ben = $(".choose-ben label.checked input").val()=="1"?"":[{
            relation:this.id($("#relation1").val()),
            name:$("#name1").val(),
            card_type:this.id($("#card-type1").val()),
            card_id:$("#card-id1").val(),
            sex:this.id($("#sex1").val()),
            birth:$("#birth1").val(),
            scale:$("#scale1").val()
        },{
            relation:this.id($("#relation2").val()),
            name:$("#name2").val(),
            card_type:this.id($("#card-type2").val()),
            card_id:$("#card-id2").val(),
            sex:this.id($("#sex2").val()),
            birth:$("#birth2").val(),
            scale:$("#scale2").val()
        },{
            relation:this.id($("#relation3").val()),
            name:$("#name3").val(),
            card_type:this.id($("#card-type3").val()),
            card_id:$("#card-id3").val(),
            sex:this.id($("#sex3").val()),
            birth:$("#birth3").val(),
            scale:$("#scale3").val()
        }];
        var v = {
            token:this.token,
            product_id:161219002,
            holder_name:$("#ph-name").val(),
            holder_card_id:$("#papers-code").val(),
            holder_telephone:$("#telephone").val(),
            holder_email:$("#email").val(),
            holder_province:this.province,
            holder_city:this.city,
            holder_county:this.county,
            holder_address:$("#address").val(),
            holder_zip_code:$("#zip-code").val(),
            holder_vocational:this.id($("#insurer-job").val()),
            holder_height:$("#stature").val(),
            holder_weight:$("#weight").val(),
            beneficiary:JSON.stringify(ben),
            promotion_id:this.userId
        };
        $(".btn-insure-next").addClass("disabled");
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/insure/sendPersonDetails/', v, function (re) {
            if(re.code=="0001000"){
                window.location.href = _this.share?"ygrs_confirm.html?type=1&userId="+_this.userId+"&orderId="+re.data.order_code:"bmy://app.page/life/nextpage?parameterList=orderId="+re.data.order_code+"&url="+"/view/product_life/ygsx/ygrs_confirm.html?inject=all&isH5navBar=1";
            }else if(re.code=="0008004"){ //code0008004为弹窗形式提醒
                re.data.reason?popUp({
                    btnLeft:"btn-grey js-close",
                    btnRight:"btn-orange js-back",
                    leftWord:"取消",
                    rightWord:"确定",
                    msgText:re.data.reason,
                    msgAlign:"text-center"
                }):popAlert("操作失败，请稍后再试！");
                $(".js-back").off("tap").on("tap",function(){
                    window.location =_this.share? window.history.go(-2):"bmy://app.page/pageTwoReturn"
                });
            }else{
                re.data.reason?popAlert(re.data.reason):re.msg?popAlert(re.msg):popAlert("操作失败");
            }
            $(".btn-insure-next").removeClass("disabled");
        },'json')
    },
    test: function(){
        var values = [
            {
                name:"username",
                val:$("#ph-name").val()
            },
            {
                name:"ID",
                val:$("#papers-code").val()
            },
            {
                name:"mobile",
                val:$("#telephone").val()
            },
            {
                name:"email",
                val:$("#email").val()
            },
            {
                name:"notEmpty",
                val:$("#insurer-job").val(),
                msg:"职业不能为空"
            },     
            {
                name:"notEmpty",
                val:$("#city-type").val(),
                msg:"所在省市区不能为空"
            },
            {
                name:"address",
                val:$("#address").val()
            },
            {
                name:"zipcode",
                val:$("#zip-code").val()
            },
            {
                name:"positiveNum",
                val:$("#stature").val(),
                msg:"身高输入正整数"
            },
            {
                name:"positiveNum",
                val:$("#weight").val(),
                msg:"体重输入正整数"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    test2: function(){
        var len = $(".assignBen .assignblock").length;
        var values = [];
        for (var n = 1; n <= len; n++) {
            values.push(
                {
                    name:"notEmpty",
                    val:$("#relation"+n).val(),
                    msg:"与被保人关系不能为空"
                },
                {
                    name:"username",
                    val:$("#name"+n).val()
                },
                {
                    name:"notEmpty",
                    val:$("#card-type"+n).val(),
                    msg:"证件类型不能为空"
                },
                {
                    name:"notEmpty",
                    val:$("#card-id"+n).val(),
                    msg:"证件号码不能为空"
                },
                {
                    name:$("#card-type"+n).val()=="身份证"?"":"notEmpty",
                    val:$("#birth"+n).val(),
                    msg:"出生日期不能为空"
                },
                {
                    name:$("#card-type"+n).val()=="身份证"?"":"notEmpty",
                    val:$("#sex"+n).val(),
                    msg:"性别不能为空"
                },
                {
                    name:"positiveNum",
                    val:$("#scale"+n).val(),
                    msg:"受益比例为正整数"
                }
            )
        }
        var mPb = new ProBox();
        return mPb.test(values);
    },
    check: function(){
        var v1 = $("#scale1").val()?parseInt($("#scale1").val()):0;
        var v2 = $("#scale2").val()?parseInt($("#scale2").val()):0;
        var v3 = $("#scale3").val()?parseInt($("#scale3").val()):0;
        if(v1+v2+v3!=100){
            popAlert("受益比例之和应为100%！");return false;
        };
        return true;
    },
    id: function(v){
        var list ={
            "身份证":0,
            "出生证明":8,
            "父子":"01",
            "父女":"02",
            "母子":"03",
            "母女":"04",
            "夫妻":"07",
            "男":1,
            "女":2,
            "行政业务办公人员（内勤）":5010101,
            "工厂、企业负责人":3050104,
            "企业经理":3050102,
            "一般学生":4099907,
            "家庭主妇":6071203,
            "营业员":14010101,
            "阳光保险代理人":4070207,
            "杂货商":1501006,
            "农夫":101002,
            "其他":0,
            "":""
        }
        return list[v]
    }
}


//确认订单
function ConfirmYgrs(options){
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

ConfirmYgrs.prototype = {
    init: function(){
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/insure/getNotSubmitOrderInfo', {token:_this.token,order_code:_this.order_id}, function (re) { 
            if(re.code=='0001000'){
                var hs = '<div class="card-block product-result-wrap">';
                var he = '</div>';

                var benefit;
                if(re.data.benefit){
                    benefit = _this.getStaticDom(BW.FormInfo.tip_12,"");
                    for (var i = 0; i < re.data.benefit.length; i++) {
                        var num = i==0?"一":i==1?"二":"三";
                        benefit += _this.getStaticDom("第"+num+"受益人","")
                                 + _this.getStaticDom(BW.FormTitConf.tip_31,re.data.benefit[i].relation_title)
                                 + _this.getStaticDom(BW.FormTitConf.tip_32,re.data.benefit[i].name)
                                 + _this.getStaticDom(BW.FormTitConf.tip_5,re.data.benefit[i].card_type_title)
                                 + _this.getStaticDom(BW.FormTitConf.tip_6,re.data.benefit[i].card_id)
                                 + _this.getStaticDom(BW.FormTitConf.tip_18,re.data.benefit[i].birth)
                                 + _this.getStaticDom(BW.FormTitConf.tip_17,re.data.benefit[i].sex_title)
                                 + _this.getStaticDom(BW.FormTitConf.tip_33,re.data.benefit[i].scale+"%")
                    }
                }else{
                    benefit = _this.getStaticDom(BW.FormInfo.tip_11,"");
                }

                var shareTitle = _this.share?'':'bmy://app.page/document/?docAddress=';
                var agree = '<a href="'+shareTitle+'/public/pdf/ygrs/投保须知.docx" class="font-FF6900">《投保须知》</a>、<a href="'+shareTitle+'/public/pdf/ygrs/人身保险投保提示书--网络投保模板20150416.doc" class="font-FF6900">《投保提示书》</a>、<a href="'+shareTitle+'/public/pdf/ygrs/02阳光人寿关爱e生定期寿险条款.pdf" class="font-FF6900">《保险产品条款》</a>、<a href="'+shareTitle+'/public/pdf/ygrs/投保人声明-传统产品完整版.doc" class="font-FF6900">《投保人声明》</a>';

                var p = _this.entryID?"":_this.tbrTitle("",BW.FormInfo.tip_6)
                                        +'<div class="flex-wrap flex-wrap-static">'
                                        +'<i class="iconfont icon-unselected-single tb-agreement"></i>'
                                        +'<p class="notice-title">我已了解并接受<span>'+agree+'</span></p>'
                                        +'</div>'
                                        +he
                                        +'<div class="btn-insure-confirm disabled">确认提交</div>';

                var payment = re.data.base.payment_period=="1"?"一次付清":re.data.base.payment_period+"年";
                var insure_period = re.data.base.insure_period=="70"||re.data.base.insure_period=="100"?"至"+re.data.base.insure_period+"周岁":re.data.base.insure_period+"年";

                var html = hs+_this.getStaticDom('<h1 class="insure-title-proname">'+re.data.product.product_name+'</h1>',re.data.product.company_name)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_1)
                        +_this.getStaticDom(BW.FormTitConf.tip_34,re.data.base.premium+"万元")
                        +_this.getStaticDom(BW.FormTitConf.tip_30,re.data.base.quotation+"元/年")
                        +_this.getStaticDom(BW.FormTitConf.tip_22,insure_period)
                        +_this.getStaticDom(BW.FormTitConf.tip_23,payment)
                        +_this.getStaticDom(BW.FormTitConf.tip_24,"年交")
                        +_this.getStaticDom(BW.FormTitConf.tip_29,re.data.base.effective_date)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_2)
                        +_this.getStaticDom(BW.FormTitConf.tip_4,re.data.holder.holder_name)
                        +_this.getStaticDom(BW.FormTitConf.tip_25,re.data.holder.holder_card_id)
                        +_this.getStaticDom(BW.FormTitConf.tip_7,re.data.holder.holder_telephone)
                        +_this.getStaticDom(BW.FormTitConf.tip_8,re.data.holder.holder_email)
                        +_this.getStaticDom(BW.FormTitConf.tip_8,re.data.holder.holder_vocational_title)
                        +_this.getStaticDom(BW.FormTitConf.tip_9,re.data.holder.holder_province+" "+re.data.holder.holder_city+" "+re.data.holder.holder_county)
                        +_this.getStaticDom(BW.FormTitConf.tip_10,re.data.holder.holder_address)
                        +_this.getStaticDom(BW.FormTitConf.tip_27,re.data.holder.holder_height+"cm")
                        +_this.getStaticDom(BW.FormTitConf.tip_28,re.data.holder.holder_weight+"kg")
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_3)
                        +_this.getStaticDom(BW.FormInfo.tip_13,"")
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_4)
                        +benefit
                        +he+hs+p
                        ;
                $(".content").html(html);
                _this.count = 0;
                _this.event();
            }
        },'json');
    },
    event: function(){
        var _this = this;
        $(".tb-agreement").off("tap").on("tap",function(){
            $(this).toggleClass("icon-unselected-single").toggleClass("icon-selected-single");
            _this.isAllow();
        })

        $(".btn-insure-confirm").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            var m = $('<div class="mask-layer"></div>');
            var l = $('<div class="loading"><div class="loading-img"></div><div class="loadding-word color-fff">核保中...</div></div>');
            $("body").append(m,l);
            m.show();
            _this.confirm();
        })
    },
    isAllow: function(){
        if($(".tb-agreement").hasClass("icon-selected-single")){
            $(".btn-insure-confirm").removeClass("disabled")
        }else{
            $(".btn-insure-confirm").addClass("disabled")
        }
    },
    getStaticDom: function(name,val){
        var pb = new ProBox();
        this.values = {
            name:name,
            val:val,
            className:""
        }
        return pb.staticDom.call(this.values);
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    },
    idtype: function(n){
        switch(n){
            case "0":
                return "身份证";break;
            case "8":
                return "出生证明";break;
            default:
                return "身份证";break;
        }
    },
    confirm: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/insureSingsig/send', {token:_this.token,order_code:_this.order_id}, function (re) {
            $(".loading").remove();
            if(re.code=='0001000'){
                if(re.data.code=="2"){
                    localStorage.removeItem("InfoYgrs");
                    localStorage.removeItem("InfoYgrsPro");
                    $(".mask-layer").remove();
                    if(_this.share){
                        window.location.href = "/view/pay/bank.html?type=1&pay=bank&orderId="+_this.order_id;
                    }else{
                        window.location.href = "bmy://app.page/life/nextpage?parameterList=orderId="+_this.order_id+"||pay=bank&url="+"/view/pay/bank.html?inject=all&isH5navBar=1";
                    }
                }else {
                    popCommon("投保失败",re.data.msg,"<a href='javascript:;' id='failed' class='color-fff close-know'>我知道了</a>");
                    $("#failed").off("tap").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/ygsx/ygrs_insure.html?type=1&userId="+_this.userId:"bmy://app.page/pageReturn";
                    })
                }
            }else{
                popCommon("提示","操作失败，请稍后再试！","<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
            }
        },'json')
    }
}

/* 邮箱验证 */
function JgEmail(options){
    var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
JgEmail.prototype = {
    init: function(){
        this.event();
    },
    event: function(){
        var _this = this;
        $("#city").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
            <h1 class="title">请选择工作城市</h1>\
            </header>',
            cols: [
                {
                  textAlign: 'center',
                  values: ["北京","上海","深圳","天津","南京","杭州"],
                  cssClass: 'picker-items-col-normal'
                }
            ]
        });
        $(".email-sure").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            $(this).addClass("disabled");
            $.showIndicator();
            _this.submit();
        });
        $(".get-back").on("tap",function(){
            $.router.back()
        })
    },
    submit: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/sinosig/lifeOne/UploadMail', {token:_this.token,email:$("#email").val(),city_id:_this.id($("#city").val()),telephone:$("#mobile").val(),company_name:$("#company").val()}, function (re) {
            $.hideIndicator();
            $(".email-sure").removeClass("disabled");
            if(re.code=='0001000'){
                popAlert("提交成功！");
                setTimeout(function(){
                    $.router.back()
                },1500);
            }else{
                popAlert("系统繁忙，请稍后再试！");
            }
        },'json')
    },
    test: function(){
        var values = [
            {
                name:"email",
                val:$("#email").val()
            },
            {
                name:"notEmpty",
                val:$("#company").val(),
                msg:"工作单位不能为空"
            },
            {
                name:"notEmpty",
                val:$("#city").val(),
                msg:"工作城市不能为空"
            },
            {
                name:"mobile",
                val:$("#mobile").val()
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    id: function(v){
        var list ={
            "北京":"101",
            "上海":"201",
            "广州":"701",
            "深圳":"702",
            "天津":"301",
            "南京":"1401",
            "杭州":"1001"
        }
        return list[v]
    }
}