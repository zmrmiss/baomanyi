//昆仑吉祥年意外伤害保险20161116
/*function DetailJxn(options){
    var _default = {
        token: 0,
        userId: 0,
        enterid: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

DetailJxn.prototype = {
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
        var url = '/view/product_life/jxn_insure.html?inject=all';
        $(".to-insure").on("tap",function(){
            window.location.href = "bmy://app.page/life/product/judgeLogin?insureInfo="+url;
        });
        _this.price();
    },
    price: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/client/Product/reward', {config_id:_this.productId}, function (re) {
            if(re.code=="0001000"){
                if(re.data.same=='1'){
                    var f = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    $(".insure-price").html('￥'+re.data.price.man+'/份');
                    $(".product-price").html(re.data.price.man+f);
                    $(".spread-blkrt").html(re.data.agent.man);
                }else{
                    var ff = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    var fm = re.data.reward.woman?'<span class="font-28 mrl-20">返'+re.data.reward.woman+'</span>':'';
                    $(".insure-price").html('男性￥'+re.data.price.man+'/份<br>女性￥'+re.data.price.woman+'/份');
                    $(".price-sex").html('男性<em class="product-price price-male">'+re.data.price.man+ff+'</em><br>女性<em class="product-price price-female">'+re.data.price.woman+fm+'</em>');
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


function ProJxn(options) {
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

ProJxn.prototype = {
    init: function(){
        $("#page-jxn .content").html(this.dom());
        this.event();
        this.inputInfo = localStorage.getItem("InfoJxn")?$.parseJSON(localStorage.getItem("InfoJxn")):0;
        this.inputInfo?this.fill():"";
        if(this.inputInfo.ph_card_type=="身份证"){
            $("#ph-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#ph-sex").closest(".flex-wrap").addClass("flex-wrap-hide");
        }
        if(this.inputInfo.relations=="本人"){
            $("#insured-name").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#papers-insured-type").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#papers-insured-code").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-sex").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
        }else if(this.inputInfo.relations!="本人"&&this.inputInfo.insured_card_type=="身份证"){
            $("#insured-sex").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
        }
    },
    fill: function(){
        $("#ph-name").val(this.inputInfo.ph_name);
        $("#papers-insurer-type").val(this.inputInfo.ph_card_type);
        $("#papers-code").val(this.inputInfo.ph_card_id);
        $("#ph-sex").val(this.inputInfo.ph_sex);
        $("#ph-birth").val(this.inputInfo.ph_birth);
        $("#telephone").val(this.inputInfo.telephone);
        $("#email").val(this.inputInfo.email);
        $("#city-type").val(this.inputInfo.pcc);
        $("#address").val(this.inputInfo.address);
        $("#relationship").val(this.inputInfo.relations);
        $("#insured-name").val(this.inputInfo.insured_name);
        $("#papers-insured-type").val(this.inputInfo.insured_card_type);
        $("#papers-insured-code").val(this.inputInfo.insured_card_id);
        $("#insured-sex").val(this.inputInfo.insured_sex);
        $("#insured-birth").val(this.inputInfo.insured_birth);
        $("#insurer-job").val(this.inputInfo.vocational);
        $("#choose-date").val(this.inputInfo.effective_date);
        this.jid = this.inputInfo.jid
    },
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        return  hs+this.tbrTitle("icon-applicant",BW.FormTitConf.tip_1)
                +this.getDom(BW.FormTitConf.tip_4,"ph-name",BW.FormPlhldrConf.tip_1,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_5,"papers-insurer-type",BW.FormPlhldrConf.tip_2+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_6,"papers-code",BW.FormPlhldrConf.tip_3,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_17,"ph-sex",BW.FormPlhldrConf.tip_14+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18,"ph-birth",BW.FormPlhldrConf.tip_15+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_7,"telephone",BW.FormPlhldrConf.tip_4,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_8,"email",BW.FormPlhldrConf.tip_5,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_9,"city-type",BW.FormPlhldrConf.tip_6+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_10,"address",BW.FormPlhldrConf.tip_7)
                +he+hs
                +this.tbrTitle("icon-insured",BW.FormTitConf.tip_2)
                +this.getDom(BW.FormTitConf.tip_11,"relationship",BW.FormPlhldrConf.tip_8+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_12,"insured-name",BW.FormPlhldrConf.tip_9,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_5,"papers-insured-type",BW.FormPlhldrConf.tip_2+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_6,"papers-insured-code",BW.FormPlhldrConf.tip_3,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_17,"insured-sex",BW.FormPlhldrConf.tip_14+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18,"insured-birth",BW.FormPlhldrConf.tip_15+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_13,"insurer-job",BW.FormPlhldrConf.tip_11+' >')
                +he+hs
                +this.tbrTitle("icon-beneficiary",BW.FormTitConf.tip_3)
                +this.getStaticDom(BW.FormTitConf.tip_14,BW.FormPlhldrConf.tip_12)
                +he+hs
                +this.tbrTitle("",this.proName)
                +this.getStaticDom(BW.FormTitConf.tip_15+'(最多可投保一份)','1份',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_16,"choose-date",BW.FormPlhldrConf.tip_13+' >')
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
        $("#insurer-job").prop("readonly","true");
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
                  values: [BW.FormUsConf.tip_6, BW.FormUsConf.tip_7, BW.FormUsConf.tip_8, BW.FormUsConf.tip_9, BW.FormUsConf.tip_10, BW.FormUsConf.tip_11, BW.FormUsConf.tip_12,BW.FormUsConf.tip_19, BW.FormUsConf.tip_13],
                  cssClass: 'picker-items-col-normal'
                }
              ],
            onClose: function(){
                var v3 = $("#relationship").val();
                var block = $("#insured-name,#papers-insured-type,#papers-insured-code,#insured-sex,#insured-birth").closest(".flex-wrap");
                if( v3== BW.FormUsConf.tip_6){
                    block.addClass("flex-wrap-hide");
                }else{
                    block.removeClass("flex-wrap-hide");
                }
            }
        });

        $("#choose-date").calendar({
            maxDate: nowDate(180),
            minDate: nowDate(0)
        });

        $("#city-type").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>'
        });

        $("#insurer-job").on("tap",function(){
            $("body").jobChoose({});
            _this.jobEvent();
        })

        $(".btn-insure-next").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            if(!_this.check()){return;}


            var addr = $("#city-type").val().split(" ");
            if(addr[0]=="北京"||addr[0]=="天津"||addr[0]=="重庆"||addr[0]=="上海"){
                addr[2] = addr[1];
                addr[1] = addr[0]
            }
            var province = addr[0];
            var city = addr[1];
            var county = addr[2];

            var record ={
                ph_name:$("#ph-name").val(),
                ph_card_type:$("#papers-insurer-type").val(),
                ph_card_id:$("#papers-code").val(),
                ph_sex:$("#ph-sex").val(),
                ph_birth:$("#ph-birth").val(),
                telephone:$("#telephone").val(),
                email:$("#email").val(),
                pcc:$("#city-type").val(),
                address:$("#address").val(),
                relations:$("#relationship").val(),
                insured_name:$("#insured-name").val(),
                insured_card_type:$("#papers-insured-type").val(),
                insured_card_id:$("#papers-insured-code").val(),
                insured_sex:$("#insured-sex").val(),
                insured_birth:$("#insured-birth").val(),
                vocational:$("#insurer-job").val(),
                effective_date:$("#choose-date").val(),
                jid:_this.jid
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoJxn", value);

            var i = new Insure({
                token:_this.token,
                product_id:161116001,
                ph_name:$("#ph-name").val(),
                ph_card_type:_this.id($("#papers-insurer-type").val()),
                ph_card_id:$("#papers-code").val(),
                ph_sex:_this.id($("#ph-sex").val()),
                ph_birth:$("#ph-birth").val(),
                telephone:$("#telephone").val(),
                email:$("#email").val(),
                province:province,
                city:city,
                county:county,
                address:$("#address").val(),
                relations:_this.id($("#relationship").val()),
                insured_name:$("#insured-name").val(),
                insured_card_type:_this.id($("#papers-insured-type").val()),
                insured_card_id:$("#papers-insured-code").val(),
                insured_sex:_this.id($("#insured-sex").val()),
                insured_birth:$("#insured-birth").val(),
                vocational:_this.jid,
                quantity:1,
                effective_date:$("#choose-date").val(),
                share:_this.share,
                filename: "jxn_confirm",
                renew: 0,
                userId:_this.userId
            })
            $(".btn-insure-next").addClass("disabled");
            i.init();
        })

    },
    jobEvent: function(){
        var _this = this;
        $(".job-fst").off("tap").on("tap",function(){
            var id = $(this).attr("data-id");
            var sel = $(".job-sed[data-id='"+id+"']");
            if(sel.hasClass("showbox")){
                sel.removeClass("showbox");
                $(".iconfont",this).removeClass("icon-arrow-up");
            }else{
                sel.addClass("showbox");
                $(".iconfont",this).addClass("icon-arrow-up");
            }
        })

        $(".job-sed .flex-wrap").off("tap").on("tap",function(){
            var sid = $(this).attr("data-sid");
            var sel = $(".job-thd[data-sid='"+sid+"']");
            if(sel.hasClass("showbox")){
                sel.removeClass("showbox");
                $(".iconfont",this).removeClass("icon-arrow-up");
            }else{
                sel.addClass("showbox");
                $(".iconfont",this).addClass("icon-arrow-up");
            }
        })

        $(".job-thd li").off("tap").on("tap",function(){
            $(".iconfont",this).addClass("icon-selected-single");
            $("#router-job").remove();
            $("#insurer-job").val($(".final-job",this).text());
            _this.jid = $(this).attr("data-tid");
        })

        $(".head-bar i").on("tap",function(){
            $("#router-job").remove();
        });
    },
    test: function(){
        var insurertype = $("#papers-insurer-type").val();
        var insuredtype = $("#papers-insured-type").val();
        var relationship = $("#relationship").val();
        var values = [
            {
                name:"username",
                val:$("#ph-name").val()
            },
            {
                name:"notEmpty",
                val:insurertype,
                msg:"证件类型不能为空"
            },
            {
                name:insurertype=="身份证"?"ID":"oID",
                val:$("#papers-code").val()
            },
            {
                name:insurertype=="身份证"?"":"notEmpty",
                val:$("#ph-sex").val(),
                msg:"性别不能为空"
            },
            {
                name:insurertype=="身份证"?"":"notEmpty",
                val:$("#ph-birth").val(),
                msg:"出生日期不能为空"
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
                msg:"所在省市区不能为空"
            },
            {
                name:"address",
                val:$("#address").val()
            },
            {
                name:"notEmpty",
                val:relationship,
                msg:"与投保人关系不能为空"
            },
            {
                name:relationship=="本人"?"":"username",
                val:$("#insured-name").val()
            },
            {
                name:relationship=="本人"?"":"notEmpty",
                val:insuredtype,
                msg:"证件类型不能为空"
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"ID":"oID"),
                val:$("#papers-insured-code").val()
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"":"notEmpty"),
                val:$("#insured-sex").val(),
                msg:"性别不能为空"
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"":"notEmpty"),
                val:$("#insured-birth").val(),
                msg:"出生日期不能为空"
            },
            {
                name:"notEmpty",
                val:$("#insurer-job").val(),
                msg:"职业不能为空"
            },
            {
                name:"notEmpty",
                val:$("#choose-date").val(),
                msg:"保险生效日期不能为空"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    check: function(){
        var insurertype = $("#papers-insurer-type").val();
        var insuredtype = $("#papers-insured-type").val();
        var relationship = $("#relationship").val();
        if(insurertype=="身份证"){
            if(calAge($("#papers-code").val(),1)<18){
                popAlert("投保人年龄不能低于18周岁"); return false;
            }
        }else{
            if(calAge($("#ph-birth").val(),2)<18){
                popAlert("投保人年龄不能低于18周岁"); return false;
            }
        }
        if(relationship!="本人"&&insuredtype=="身份证"){
            var age = calAge($("#papers-insured-code").val(),1);
            if(age<18||age>60){
                popAlert("被保人年龄不再保障年龄范围内"); return false;
            }
        }else if(relationship!="本人"&&insuredtype!="身份证"){
            var age = calAge($("#insured-birth").val(),2);
            if(age<18||age>60){
                popAlert("被保人年龄不再保障年龄范围内"); return false;
            }
        }
        return true;
    },
    id: function(v){
        var list ={
            "身份证":0,
            "护照":2,
            "户口本":1,
            "本人":1,
            "父亲":2,
            "母亲":3,
            "妻子":4,
            "丈夫":5,
            "儿子":6,
            "女儿":7,
            "其他亲属":8,
            "雇员":9,
            "男":1,
            "女":2
        }
        return list[v]
    }
}


function ConfirmJxn(options){
    var _default = {
       enterid: 1,
       token: null,
       share: false,
       order_id: null
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

ConfirmJxn.prototype = {
    init: function(){
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/kunlun/insure/getNotSubmitOrderInfo', {token:_this.token,order:_this.order_id}, function (re) { 
            if(re.code=='0001000'){
                var hs = '<div class="card-block product-result-wrap">';
                var he = '</div>';

                var ph_card_type = _this.idtype(re.data.person.ph_card_type);
                var relations = _this.relationtype(re.data.person.relations);
                var insured_card_type = _this.idtype(re.data.person.insured_card_type);

                var shareTitle = 'bmy://app.page/document/?docAddress=';
                var appTitle = '../..';
                var agree = _this.share?'<a href="'+appTitle+'/public/pdf/jxn/吉祥年——重要告知.doc" class="font-FF6900">《重要告知》</a>、<a href="'+appTitle+'/public/pdf/jxn/吉祥年——投保申明.doc" class="font-FF6900">《投保申明》</a>、<a href="'+appTitle+'/public/pdf/jxn/附件5-2吉祥年综合意外伤害保险（2015）条款.pdf" class="font-FF6900">《保险条款》</a>':'<a href="'+shareTitle+'/public/pdf/jxn/吉祥年——重要告知.doc" class="font-FF6900">《重要告知》</a>、<a href="'+shareTitle+'/public/pdf/jxn/吉祥年——投保申明.doc" class="font-FF6900">《投保申明》</a>、<a href="'+shareTitle+'/public/pdf/jxn/附件5-2吉祥年综合意外伤害保险（2015）条款.pdf" class="font-FF6900">《保险条款》</a>';

                var html = hs+_this.getStaticDom('<h1 class="insure-title-proname">'+re.data.product.ProductName+'</h1>',re.data.product.CompanyShortName)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_1)
                        +_this.getStaticDom(BW.FormInfo.tip_7,re.data.product.InsuYear+"年")
                        +_this.getStaticDom(BW.FormTitConf.tip_16,re.data.person.effective_date)
                        +_this.getStaticDom(BW.FormInfo.tip_9,re.data.person.quantity+"份")
                        +_this.getStaticDom(BW.FormInfo.tip_8,re.data.person.price_total+"元")
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_2)
                        +_this.getStaticDom(BW.FormTitConf.tip_4,re.data.person.ph_name)
                        +_this.getStaticDom(BW.FormTitConf.tip_5,ph_card_type)
                        +_this.getStaticDom(BW.FormTitConf.tip_6,re.data.person.ph_card_id)
                        +_this.getStaticDom(BW.FormTitConf.tip_7,re.data.person.telephone)
                        +_this.getStaticDom(BW.FormTitConf.tip_8,re.data.person.email)
                        +_this.getStaticDom(BW.FormTitConf.tip_9,re.data.person.province+" "+re.data.person.city+" "+re.data.person.county)
                        +_this.getStaticDom(BW.FormTitConf.tip_10,re.data.person.address)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_3)
                        +_this.getStaticDom(BW.FormTitConf.tip_11,relations)
                        +_this.getStaticDom(BW.FormTitConf.tip_12,re.data.person.insured_name)
                        +_this.getStaticDom(BW.FormTitConf.tip_5,insured_card_type)
                        +_this.getStaticDom(BW.FormTitConf.tip_6,re.data.person.insured_card_id)
                        +_this.getStaticDom(BW.FormTitConf.tip_13,re.data.person.vocational_name)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_4)
                        +_this.getStaticDom(BW.FormTitConf.tip_3,BW.FormPlhldrConf.tip_12)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_5)
                        +'<div class="flex-wrap wrapable flex-wrap-static">'
                        +'<p class="notice-title">被保险人目前已投保并仍在生效的或正在投保的其他意外险累计保额是否已达到200万元及以上？</p>'
                        +'<label class="notice-choose choose-one"><i class="iconfont icon-unselected-single"></i>是</label>'
                        +'<label class="notice-choose choose-one"><i class="iconfont icon-unselected-single"></i>否</label>'
                        +'</div>'
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_6)
                        +'<div class="flex-wrap flex-wrap-static">'
                        +'<i class="iconfont icon-unselected-single tb-agreement"></i>'
                        +'<p class="notice-title">我已了解并接受<span>'+agree+'</span></p>'
                        +'</div>'
                        +he
                        +'<div class="btn-insure-confirm disabled">确认提交</div>';
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

        var icon = $(".choose-one .iconfont");

        $(".choose-one").off("tap").on("tap",function(){
            
            if($(".iconfont",this).hasClass("icon-selected-single")){
                icon.addClass("icon-unselected-single").removeClass("icon-selected-single");
                $(".iconfont",this).addClass("icon-unselected-single").removeClass("icon-selected-single");
            }else{
                icon.addClass("icon-unselected-single").removeClass("icon-selected-single");
                $(".iconfont",this).removeClass("icon-unselected-single").addClass("icon-selected-single");
            }
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
        if($(".choose-one .iconfont").hasClass("icon-selected-single")&&$(".tb-agreement").hasClass("icon-selected-single")){
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
    relationtype: function(n){
        switch(n){
            case "1":
                return "本人";break;
            case "2":
                return "父亲";break;
            case "3":
                return "母亲"; break;
            case "4":
                return "妻子"; break;
            case "5":
                return "丈夫"; break;
            case "6":
                return "儿子"; break;
            case "7":
                return "女儿"; break;
            case "8":
                return "其他亲属"; break;
            case "9":
                return "雇员"; break;
            default:
                return "本人";break;
        }
    },
    confirm: function(){
        var _this = this;
        $(".choose-one").each(function(){
            if($(".iconfont",this).hasClass("icon-selected-single")){
               _this.qn = $(this).index()==1?1:0;
            }
        });
        $.post('//'+domain.sx+'/insurance/kunlun/WebService/send', {token:_this.token,order:_this.order_id,questionnaire:_this.qn}, function (re) {
            $(".loading").remove();
            if(re.code=='0001000'){
                if(re.data.code=="0"){
                    popCommon("投保失败","服务器异常!","<a href='javascript:;' id='failed' class='color-fff close-know'>我知道了</a>");
                    $("#failed").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/jxn_insure.html?type=1&userId="+_this.userId+"&eUid="+_this.eUid:"bmy://app.page/order/failure";
                    })
                }else if(re.data.code=="1"){
                    popCommon("投保失败",re.data.msg+"！","<a href='javascript:;' id='failed' class='color-fff close-know'>我知道了</a>");
                    $("#failed").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/jxn_insure.html?type=1&userId="+_this.userId+"&eUid="+_this.eUid:"bmy://app.page/order/failure";
                    })
                }else if(re.data.code=="2"){
                    localStorage.removeItem("InfoJxn");
                    $(".mask-layer").remove();
                    if(_this.share){
                        window.location.href = "../pay/index.html?type=1&orderId="+_this.order_id;
                    }else{
                        window.location.href = "bmy://app.page/order/success?orderId="+_this.order_id+"&insureConfirm="+"/view/pay/index.html?inject=all";
                    } 
                }else if(re.data.code=="3"){
                    localStorage.removeItem("InfoJxn");
                    popCommon("投保成功","您提交的订单进入人工核保环节，请耐心等待，您可以在订单管理中查看核保结果","<a href='javascript:;' id='artificial' class='color-fff close-know'>我知道了</a>");
                    $("#artificial").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/jxn_detail.html?type=1&userId="+_this.userId:"bmy://app.page/order/artificialVerification";
                    })
                }
            }else{
                popCommon("提示",re.data.msg,"<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
            }
        },'json')
    }
}


//保单提交
function Insure(options) {
    var _default = {
       enterid: 1,
       token: null,
       share: false,
       bank: null,
       bank_account: null
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

Insure.prototype = {
    init: function(){
        this.commit();
    },
    commit: function(){
        var _this = this;
        this.value = {
            token:this.token,
            product_id:this.product_id,
            ph_name:this.ph_name,
            ph_card_type:this.ph_card_type,
            ph_card_id:this.ph_card_id,
            ph_sex:this.ph_sex,
            ph_birth:this.ph_birth,
            telephone:this.telephone,
            email:this.email,
            province:this.province,
            city:this.city,
            county:this.county,
            address:this.address,
            relations:this.relations,
            insured_name:this.insured_name,
            insured_card_type:this.insured_card_type,
            insured_card_id:this.insured_card_id,
            insured_sex:this.insured_sex,
            insured_birth:this.insured_birth,
            vocational:this.vocational,
            quantity:this.quantity,
            effective_date:this.effective_date,
            is_renew:this.renew,
            bank:this.bank,
            bank_account:this.bank_account,
            promotion_id:this.userId
        };

        $.post('//'+domain.sx+'/insurance/kunlun/insure/sendPersonDetails', _this.value, function (re) {
            $(".btn-insure-next").removeClass("disabled");
            if(re.code=='0001000'){
                if(_this.share){
                    window.location = _this.filename+".html?type=1&orderId="+re.data.order+"&userId="+_this.userId+"&eUid=0";
                }else{
                    window.location = "bmy://app.page/life/doneOrder?orderId="+re.data.order+"&insureConfirm="+"/view/product_life/"+_this.filename+".html?inject=all";
                }
            }else{
                popAlert(re.data.parameter);
            }
        },'json');
    }
}

//昆仑健康宝肝疾病保险20161121
function DetailJkb(options){
    var _default = {
        token: 0,
        userId: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

DetailJkb.prototype = {
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
        var url = '/view/product_life/jkb_insure.html?inject=all';
        $(".to-insure").on("tap",function(){
            window.location.href = "bmy://app.page/life/product/judgeLogin?insureInfo="+url;
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
                    $(".product-price").html(re.data.price.man+f);
                    $(".spread-blkrt").html(re.data.agent.man);
                }else{
                    var ff = re.data.reward.man?'<span class="font-28 mrl-20">返'+re.data.reward.man+'</span>':'';
                    var fm = re.data.reward.woman?'<span class="font-28 mrl-20">返'+re.data.reward.woman+'</span>':'';
                    $(".insure-price").html('男性￥'+re.data.price.man+'/份<br>女性￥'+re.data.price.woman+'/份');
                    $(".price-sex").html('男性<em class="product-price price-male">'+re.data.price.man+ff+'</em><br>女性<em class="product-price price-female">'+re.data.price.woman+fm+'</em>');
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


function ProJkb(options) {
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

ProJkb.prototype = {
    init: function(){
        $("#page-jkb .content").html(this.dom());
        this.event();
        this.inputInfo = localStorage.getItem("InfoJkb")?$.parseJSON(localStorage.getItem("InfoJkb")):0;
        this.inputInfo?this.fill():"";
        if(this.inputInfo.ph_card_type=="身份证"){
            $("#ph-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#ph-sex").closest(".flex-wrap").addClass("flex-wrap-hide");
        }
        if(this.inputInfo.relations=="本人"){
            $("#insured-name").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#papers-insured-type").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#papers-insured-code").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-sex").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
        }else if(this.inputInfo.relations!="本人"&&this.inputInfo.insured_card_type=="身份证"){
            $("#insured-sex").closest(".flex-wrap").addClass("flex-wrap-hide");
            $("#insured-birth").closest(".flex-wrap").addClass("flex-wrap-hide");
        }
    },
    fill: function(){
        $("#ph-name").val(this.inputInfo.ph_name);
        $("#papers-insurer-type").val(this.inputInfo.ph_card_type);
        $("#papers-code").val(this.inputInfo.ph_card_id);
        $("#ph-sex").val(this.inputInfo.ph_sex);
        $("#ph-birth").val(this.inputInfo.ph_birth);
        $("#telephone").val(this.inputInfo.telephone);
        $("#email").val(this.inputInfo.email);
        $("#city-type").val(this.inputInfo.pcc);
        $("#address").val(this.inputInfo.address);
        $("#relationship").val(this.inputInfo.relations);
        $("#insured-name").val(this.inputInfo.insured_name);
        $("#papers-insured-type").val(this.inputInfo.insured_card_type);
        $("#papers-insured-code").val(this.inputInfo.insured_card_id);
        $("#insured-sex").val(this.inputInfo.insured_sex);
        $("#insured-birth").val(this.inputInfo.insured_birth);
        $(".num-buy em").html(this.inputInfo.num);
    },
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        var shareTitle = this.share?'../..':'bmy://app.page/document/?docAddress=';

        return  hs+this.tbrTitle("icon-applicant",BW.FormTitConf.tip_1)
                +this.getDom(BW.FormTitConf.tip_4,"ph-name",BW.FormPlhldrConf.tip_1,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_5,"papers-insurer-type",BW.FormPlhldrConf.tip_2+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_6,"papers-code",BW.FormPlhldrConf.tip_3,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_17,"ph-sex",BW.FormPlhldrConf.tip_14+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18,"ph-birth",BW.FormPlhldrConf.tip_15+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_7,"telephone",BW.FormPlhldrConf.tip_4,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_8,"email",BW.FormPlhldrConf.tip_5,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_9,"city-type",BW.FormPlhldrConf.tip_6+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_10,"address",BW.FormPlhldrConf.tip_7)
                +he+hs
                +this.tbrTitle("icon-insured",BW.FormTitConf.tip_2)
                +this.getDom(BW.FormTitConf.tip_11,"relationship",BW.FormPlhldrConf.tip_8+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_12,"insured-name",BW.FormPlhldrConf.tip_9,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_5,"papers-insured-type",BW.FormPlhldrConf.tip_2+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_6,"papers-insured-code",BW.FormPlhldrConf.tip_3,"bod-botm")
                +this.getDom(BW.FormTitConf.tip_17,"insured-sex",BW.FormPlhldrConf.tip_14+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_18,"insured-birth",BW.FormPlhldrConf.tip_15+' >')
                +he+hs
                +this.tbrTitle("icon-beneficiary",BW.FormTitConf.tip_3)
                +this.getStaticDom(BW.FormTitConf.tip_14,BW.FormPlhldrConf.tip_12)
                +he+hs
                +this.tbrTitle("",this.proName)
                +this.getStaticDom(BW.FormTitConf.tip_15,'最多可投保30份')
                +'<div class="flex-wrap bod-botm"><div class="num-buy"><i class="iconfont icon-minus"></i><em>1</em><i class="iconfont icon-plus"></i></div></div>'
                +this.getStaticDom(BW.FormTitConf.tip_16,"投保成功后次日零时生效","bod-botm")
                +he+hs
                +'<div class="flex-wrap bod-botm"><div class="item-title"><i class="iconfont icon-unselected-single renew-i"></i>我要自动续保</div><div class="item-input text-right">第二年保费自动缴纳，无观察期</div></div>'
                +'<div class="renew-block">'
                +this.getDom(BW.FormTitConf.tip_19,"bank",BW.FormPlhldrConf.tip_16+' >',"bod-botm")
                +this.getDom(BW.FormTitConf.tip_20,"bank_account",BW.FormPlhldrConf.tip_17,"bod-botm")
                +'<div class="flex-wrap flex-wrap-static">'
                +'<i class="iconfont icon-unselected-single auto-transfer"></i>'
                +'<p class="notice-title">我已阅读并同意<span><a href="'+shareTitle+'/public/pdf/jkb/昆仑——扣款授权声明.docx" class="color-FF6900">《保险费自动转账授权声明》</a></span></p>'
                +'</div>'
                +'</div>'
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
        Calnum(".num-buy",1,30);

        $(".renew-i").on("tap",function(){
            $(this).toggleClass("icon-unselected-single").toggleClass("icon-selected-single");
            $(this).closest(".card-block").children(".renew-block").toggle();
        });

        $(".auto-transfer").on("tap",function(){
            $(this).toggleClass("icon-selected-single").toggleClass("icon-unselected-single");
        });

        $("#bank").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
              <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
              <h1 class="title">'+BW.FormUsConf.tip_4+'</h1>\
              </header>',
              cols: [
                {
                  textAlign: 'center',
                  values: ["工商银行","中国银行","建设银行","招商银行","广发银行","光大银行","民生银行","兴业银行","平安银行"],
                  cssClass: 'picker-items-col-normal'
                }
              ]
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
                  values: [BW.FormUsConf.tip_6, BW.FormUsConf.tip_7, BW.FormUsConf.tip_8, BW.FormUsConf.tip_9, BW.FormUsConf.tip_10, BW.FormUsConf.tip_11, BW.FormUsConf.tip_12,BW.FormUsConf.tip_19, BW.FormUsConf.tip_13],
                  cssClass: 'picker-items-col-normal'
                }
              ],
            onClose: function(){
                var v3 = $("#relationship").val();
                var block = $("#insured-name,#papers-insured-type,#papers-insured-code,#insured-sex,#insured-birth").closest(".flex-wrap");
                if( v3== BW.FormUsConf.tip_6){
                    block.addClass("flex-wrap-hide");
                }else{
                    block.removeClass("flex-wrap-hide");
                }
            }
        });

        $("#city-type").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">'+BW.FormUsConf.tip_15+'</h1>\
                </header>'
        });

        $(".btn-insure-next").off("tap").on("tap",function(){
            _this.isrenew = $(".renew-i").hasClass("icon-selected-single")?1:0
            if($(this).hasClass("disabled")){return;}
            if(!_this.test()){return;}
            if(!_this.check()){return;} 
            if($(".renew-i").hasClass("icon-selected-single")&&!$(".auto-transfer").hasClass("icon-selected-single")){popAlert("请同意《保险费自动转账授权声明》");return;}  


            var addr = $("#city-type").val().split(" ");
            if(addr[0]=="北京"||addr[0]=="天津"||addr[0]=="重庆"||addr[0]=="上海"){
                addr[2] = addr[1];
                addr[1] = addr[0]
            }
            var province = addr[0];
            var city = addr[1];
            var county = addr[2];

            var record ={
                ph_name:$("#ph-name").val(),
                ph_card_type:$("#papers-insurer-type").val(),
                ph_card_id:$("#papers-code").val(),
                ph_sex:$("#ph-sex").val(),
                ph_birth:$("#ph-birth").val(),
                telephone:$("#telephone").val(),
                email:$("#email").val(),
                pcc:$("#city-type").val(),
                address:$("#address").val(),
                relations:$("#relationship").val(),
                insured_name:$("#insured-name").val(),
                insured_card_type:$("#papers-insured-type").val(),
                insured_card_id:$("#papers-insured-code").val(),
                insured_sex:$("#insured-sex").val(),
                insured_birth:$("#insured-birth").val(),
                num:$(".num-buy em").html()
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoJkb", value);
            

            var i = new Insure({
                token:_this.token,
                product_id:161116002,
                ph_name:$("#ph-name").val(),
                ph_card_type:_this.id($("#papers-insurer-type").val()),
                ph_card_id:$("#papers-code").val(),
                ph_sex:_this.id($("#ph-sex").val()),
                ph_birth:$("#ph-birth").val(),
                telephone:$("#telephone").val(),
                email:$("#email").val(),
                province:province,
                city:city,
                county:county,
                address:$("#address").val(),
                relations:_this.id($("#relationship").val()),
                insured_name:$("#insured-name").val(),
                insured_card_type:_this.id($("#papers-insured-type").val()),
                insured_card_id:$("#papers-insured-code").val(),
                insured_sex:_this.id($("#insured-sex").val()),
                insured_birth:$("#insured-birth").val(),
                vocational:_this.jid,
                quantity:$(".num-buy em").html(),
                effective_date:"",
                share:_this.share,
                filename: "jkb_confirm",
                renew:_this.isrenew,
                bank:_this.isrenew?_this.id($("#bank").val()):null,
                bank_account:_this.isrenew?$("#bank_account").val():null,
                userId:_this.userId
            })
            $(".btn-insure-next").addClass("disabled");
            i.init();
        })
    },
    test: function(){
        var insurertype = $("#papers-insurer-type").val();
        var insuredtype = $("#papers-insured-type").val();
        var relationship = $("#relationship").val();

        var values = [
            {
                name:"username",
                val:$("#ph-name").val()
            },
            {
                name:"notEmpty",
                val:insurertype,
                msg:"证件类型不能为空"
            },
            {
                name:insurertype=="身份证"?"ID":"oID",
                val:$("#papers-code").val()
            },
            {
                name:insurertype=="身份证"?"":"notEmpty",
                val:$("#ph-sex").val(),
                msg:"性别不能为空"
            },
            {
                name:insurertype=="身份证"?"":"notEmpty",
                val:$("#ph-birth").val(),
                msg:"出生日期不能为空"
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
                msg:"所在省市区不能为空"
            },
            {
                name:"address",
                val:$("#address").val()
            },
            {
                name:"notEmpty",
                val:relationship,
                msg:"与投保人关系不能为空"
            },
            {
                name:relationship=="本人"?"":"username",
                val:$("#insured-name").val()
            },
            {
                name:relationship=="本人"?"":"notEmpty",
                val:insuredtype,
                msg:"证件类型不能为空"
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"ID":"oID"),
                val:$("#papers-insured-code").val()
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"":"notEmpty"),
                val:$("#insured-sex").val(),
                msg:"性别不能为空"
            },
            {
                name:relationship=="本人"?"":(insuredtype=="身份证"?"":"notEmpty"),
                val:$("#insured-birth").val(),
                msg:"出生日期不能为空"
            },
            {
                name:this.isrenew?"notEmpty":"",
                val:$("#bank").val(),
                msg:"缴费银行不能为空"
            },
            {
                name:this.isrenew?"notEmpty":"",
                val:$("#bank_account").val(),
                msg:"缴费账号不能为空"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    check: function(){
        var insurertype = $("#papers-insurer-type").val();
        var insuredtype = $("#papers-insured-type").val();
        var relationship = $("#relationship").val();
        if(insurertype=="身份证"){
            if(calAge($("#papers-code").val(),1)<18){
                popAlert("投保人年龄不能低于18周岁"); return false;
            }
        }else{
            if(calAge($("#ph-birth").val(),2)<18){
                popAlert("投保人年龄不能低于18周岁"); return false;
            }
        }
        if(relationship!="本人"&&insuredtype=="身份证"){
            var age = calAge($("#papers-insured-code").val(),1);
            if(age<18||age>60){
                popAlert("被保人年龄不再保障年龄范围内"); return false;
            }
        }else if(relationship!="本人"&&insuredtype!="身份证"){
            var age = calAge($("#insured-birth").val(),2);
            if(age<18||age>60){
                popAlert("被保人年龄不再保障年龄范围内"); return false;
            }
        }
        return true;
    },
    id: function(v){
        var list ={
            "身份证":0,
            "护照":2,
            "户口本":1,
            "本人":1,
            "父亲":2,
            "母亲":3,
            "妻子":4,
            "丈夫":5,
            "儿子":6,
            "女儿":7,
            "其他亲属":8,
            "雇员":9,
            "男":1,
            "女":2,
            "工商银行":02,
            "中国银行":04,
            "建设银行":05,
            "招商银行":09,
            "广发银行":10,
            "光大银行":11,
            "民生银行":15,
            "兴业银行":19,
            "平安银行":32
        }
        return list[v]
    }
}


function ConfirmJkb(options){
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

ConfirmJkb.prototype = {
    init: function(){
        this.dom();
    },
    dom: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/kunlun/insure/getNotSubmitOrderInfo', {token:_this.token,order:_this.order_id}, function (re) { 
            if(re.code=='0001000'){
                var hs = '<div class="card-block product-result-wrap">';
                var he = '</div>';

                var ph_card_type = _this.idtype(re.data.person.ph_card_type);
                var relations = _this.relationtype(re.data.person.relations);
                var insured_card_type = _this.idtype(re.data.person.insured_card_type);

                var renew = re.data.person.is_renew==1?'icon-selected-single':'icon-select-disabled';
                var shareTitle = _this.share?'../..':'bmy://app.page/document/?docAddress=';

                var agree = '<a href="'+shareTitle+'/public/pdf/jkb/附件4、短期健康险重要告知.doc" class="font-FF6900">《重要告知》</a>、<a href="'+shareTitle+'/public/pdf/jkb/附件5、短期险投保申明.doc" class="font-FF6900">《投保申明》</a>、<a href="'+shareTitle+'/public/pdf/jkb/健康宝肝疾病保险条款[2009].pdf" class="font-FF6900">《保险条款》</a>';

                var html = hs+_this.getStaticDom('<h1 class="insure-title-proname">'+re.data.product.ProductName+'</h1>',re.data.product.CompanyShortName)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_1)
                        +_this.getStaticDom(BW.FormInfo.tip_7,re.data.product.InsuYear+"年")
                        +_this.getStaticDom(BW.FormTitConf.tip_16,re.data.person.effective_date)
                        +_this.getStaticDom(BW.FormInfo.tip_9,re.data.person.quantity+"份")
                        +_this.getStaticDom(BW.FormInfo.tip_8,re.data.person.price_total+"元")
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_2)
                        +_this.getStaticDom(BW.FormTitConf.tip_4,re.data.person.ph_name)
                        +_this.getStaticDom(BW.FormTitConf.tip_5,ph_card_type)
                        +_this.getStaticDom(BW.FormTitConf.tip_6,re.data.person.ph_card_id)
                        +_this.getStaticDom(BW.FormTitConf.tip_7,re.data.person.telephone)
                        +_this.getStaticDom(BW.FormTitConf.tip_8,re.data.person.email)
                        +_this.getStaticDom(BW.FormTitConf.tip_9,re.data.person.province+" "+re.data.person.city+" "+re.data.person.county)
                        +_this.getStaticDom(BW.FormTitConf.tip_10,re.data.person.address)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_3)
                        +_this.getStaticDom(BW.FormTitConf.tip_11,relations)
                        +_this.getStaticDom(BW.FormTitConf.tip_12,re.data.person.insured_name)
                        +_this.getStaticDom(BW.FormTitConf.tip_5,insured_card_type)
                        +_this.getStaticDom(BW.FormTitConf.tip_6,re.data.person.insured_card_id)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_4)
                        +_this.getStaticDom(BW.FormTitConf.tip_3,BW.FormPlhldrConf.tip_12)
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_5)
                        +_this.getAnswer("choose-one","1、您是否患有或曾经患有肝硬化或肝癌？","bod-botm")
                        +_this.getAnswer("choose-two","2、您近5年是否因肝脏疾病门诊检查或住院治疗（包括入住疗养院、康复医院等医疗机构）？","bod-botm")
                        +_this.getAnswer("choose-three","3、您是否目前或过去一年曾有过下列情况？<br>持续存在上腹或肝区不适或隐痛、腹胀、乏力、消瘦、食欲差、面色灰暗等；反复出现低热、黄疸、腹泻、齿龈出血、鼻出血、上消化道出血等；经医院检查有肝脏肿大、脾大、腹水、肝肾衰竭、肝掌、蜘蛛痣、男性乳腺增大、下肢水肿、肝功能异常等。","bod-botm")
                        +_this.getAnswer("choose-four","4、您是否在投保其他保险公司人身保险产品或保单复时被拒保、延期、附加条件或加费承保、提出或已经得到理赔？")
                        +he+hs
                        +_this.tbrTitle("",BW.FormInfo.tip_6)
                        +'<div class="flex-wrap flex-wrap-static">'
                        +'<i class="iconfont icon-unselected-single tb-agreement"></i>'
                        +'<p class="notice-title">我已了解并接受<span>'+agree+'</span></p>'
                        +'</div>'
                        +he+hs
                        +'<div class="flex-wrap"><div class="item-title is-renew"><i class="iconfont '+renew+'"></i>我要自动续保</div></div>'
                        +he
                        +'<div class="btn-insure-confirm disabled">确认提交</div>';
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

        _this.choose(".choose-one");
        _this.choose(".choose-two");
        _this.choose(".choose-three");
        _this.choose(".choose-four");

        $(".btn-insure-confirm").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            _this.confirm();
        })
    },
    choose: function(sel){
        var _this = this;
        var icon = $(".iconfont",sel);
        $(sel).off("tap").on("tap",function(){
            
            if($(this).hasClass("checked")){
                $(".iconfont",this).addClass("icon-unselected-single").removeClass("icon-selected-single");
                $("input[type='radio']",this).removeAttr("checked");
                $(this).removeClass("checked");
            }else{
                icon.addClass("icon-unselected-single").removeClass("icon-selected-single");
                $(".iconfont",this).removeClass("icon-unselected-single").addClass("icon-selected-single");
                $("input[type='radio']",sel).removeAttr("checked");
                $("input[type='radio']",this).prop("checked","checked");
                $(sel).removeClass("checked");
                $(this).addClass("checked");
            }
            _this.isAllow(sel);
        })
    },
    isAllow: function(sel){
        if($(".choose-one").hasClass("checked")&&$(".choose-two").hasClass("checked")&&$(".choose-three").hasClass("checked")&&$(".choose-four").hasClass("checked")&&$(".tb-agreement").hasClass("icon-selected-single")){
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
    getAnswer: function(sel,title,cname){
        var an = new ProBox();
        this.values2 = {
            sel:sel,
            title:title,
            className:cname?cname:""
        }
        return an.answer.call(this.values2);
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
    relationtype: function(n){
        switch(n){
            case "1":
                return "本人";break;
            case "2":
                return "父亲";break;
            case "3":
                return "母亲"; break;
            case "4":
                return "妻子"; break;
            case "5":
                return "丈夫"; break;
            case "6":
                return "儿子"; break;
            case "7":
                return "女儿"; break;
            case "8":
                return "其他亲属"; break;
            case "9":
                return "雇员"; break;
            default:
                return "本人";break;
        }
    },
    confirm: function(){
        var _this = this;
        _this.qn = $(".choose-one.checked input").val()+","+$(".choose-two.checked input").val()+","+$(".choose-three.checked input").val()+","+$(".choose-four.checked input").val();

        $.post('//'+domain.sx+'/insurance/kunlun/WebService/send', {token:_this.token,order:_this.order_id,questionnaire:_this.qn}, function (re) {
            $(".loading").remove();
            if(re.code=='0001000'){
                if(re.data.code=="0"){
                    popCommon("投保失败","很遗憾，您提交的订单核保失败，原因是：服务器异常!","<a href='javascript:;' id='failed' class='color-fff close-know'>我知道了</a>");
                    $("#failed").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/jkb_insure.html?type=1":"bmy://app.page/order/failure";
                    })
                }else if(re.data.code=="1"){
                    popCommon("投保失败","很遗憾，您提交的订单核保失败，原因是："+re.data.msg+"！","<a href='javascript:;' id='failed' class='color-fff close-know'>我知道了</a>");
                    $("#failed").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/jkb_insure.html?type=1":"bmy://app.page/order/failure";
                    })
                }else if(re.data.code=="2"){
                    localStorage.removeItem("InfoJkb");
                    $(".mask-layer").remove();
                    if(_this.share){
                        window.location.href = "../pay/index.html?type=1&orderId="+_this.order_id;
                    }else{
                        window.location.href = "bmy://app.page/order/success?orderId="+_this.order_id+"&insureConfirm="+"/view/pay/index.html?inject=all";
                    } 
                }else if(re.data.code=="3"){
                    localStorage.removeItem("InfoJkb");
                    popCommon("投保成功","您提交的订单进入人工核保环节，请耐心等待，您可以在订单管理中查看核保结果","<a href='javascript:;' id='artificial' class='color-fff close-know'>我知道了</a>");
                    $("#artificial").on("tap",function(){
                        window.location.href =_this.share?"/view/product_life/jkb_detail.html?type=1":"bmy://app.page/order/artificialVerification";
                    })
                }
            }else{
                popCommon("提示",re.data.msg,"<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
            }
        },'json')
    }
}
*/

