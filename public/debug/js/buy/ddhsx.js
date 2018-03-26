//********************************** 大都会超值自驾车意外险 *******************************//

//大都会自驾车意外险  详情页面js
function DetailZJC(options){
    var _default = {
        token: 0,
        userId: 0,
        enterid: 0,
        flag: 0//用来记录是否获取到返回率
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
DetailZJC.prototype = {
    init: function(){
        var _this = this;

        //如果用户是寿险经纪人
        if(this.enterid=="2"){
            var html = '<a href="javascript:;" class="to-rule">规则说明</a>\
                <div class="to-share">分享给客户<br><span>(对方看不到推广费)</span></div>\
                <div class="to-insure">立即投保</div>';
            $(".btn-insure").html(html);
            
            $(".is-spread").append('<div class="spread-block"><span class="spread-blklt">推广费</span><span class="spread-blkrt"></span></div>');

            $(".to-rule").on("tap",function(){
                var mask = $('<div class="masklayer-word"><h1>分享规则说明</h1><p>保满意的认证经纪人分享保满意提供的保险产品、资讯等内容，好友点击阅读后即成为您的归属客户。好友查看您分享的产品或资讯等内容，保满意通知中心和客户动态都会及时通知您，方便您及时跟进。客户通过您分享链接下单，您可获得产品对应的推广费。</p><i class="iconfont icon-close close-layer"></i></div>');
                $("body").append(mask);
                $(".close-layer").on("tap",function(){
                    mask.remove();
                });
            });

            $(".to-share").on("tap",function(){
                _this.sharepage();
            });
         }

        $("#city-type").on("tap",function () {
            if (_this.flag == 0)
            {
                popAlert("正在获取数据");
            }
        });

        //请先选择投保地区
        $("#coverage-price").on("tap",function () {
            if ($("#city-type").val().length == 0)
            {
                popAlert("请先选择投保地区");
            }
        });

        _this.price();

    },

    event: function () {
        var _this = this;
        //第三类城市
        var cityarr = ["唐山市","秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市", "大同市", "阳泉市", "长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州", "齐齐哈尔市", "鸡西市", "鹤岗市", "双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "济源市", "三门峡市", "南阳市", "商丘市", "信阳市", "周口市", "驻马店市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市", "永州市", "怀化市", "娄底市", "湘西土家族苗族自治州", "三亚市", "省直辖县级行政单位", "六盘水市", "遵义市", "安顺市", "铜仁地区", "黔西南布依族苗族自治州", "毕节地区","黔东南苗族侗族自治州", "黔南布依族苗族自治州", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "思茅市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州"];

        if(!_this.share) {
            //立即投保按钮点击
            $(".to-insure").on("tap", function () {
                if (!_this.test()) {return;}//检测是否选择了 投保地区和保额
                var addr = $("#city-type").val().split(" ");
                var coverageValue = $("#coverage-price").val();//保额
                var url = '/view/product_life/ddhsx/ddh_insure.html?inject=all';
                window.location.href = "bmy://app.page/life/product/judgeLogin?url=" + url + "&parameterList=proname=" + addr[0] + "||cityname=" + addr[1] + "||nt=" + coverageValue + "&isH5navBar=1";
            });
        }

        //保障范围点击展开,闭合
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
        });

        //点击投保地区弹出选择框
        $("#city-type").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">请选择投保地区</h1>\
                </header>',
            onClose : function () {
                //移除保额输入栏 在重新添加上
                var job = $("#coverage-price");
                var a = job.closest(".item-input");
                job.remove();
                a.append('<input type="text" id="coverage-price" placeholder="请选择保额 >" readonly="readonly">');
                //保障范围默认价格
                deathAndDisabled("10万","1万");
                //保费默认价格
                $(".insure-price,.product-price").html('￥5.3元');
                //显示返利
                getPromotionExpenses(5.3);
                //判断是否是三级城市
                judgeThreeCity();
            }
        });

        //保障范围价格变化
        function deathAndDisabled(deathprice,disabledprice) {
            var death = document.getElementById("death");
            var disabled = document.getElementById("disabled");
            death.innerHTML = deathprice + '元' + '<i class="iconfont icon-arrow-down"></i>';
            disabled.innerHTML = disabledprice + '元' + '<i class="iconfont icon-arrow-down"></i>';
        }

        //获得推广费
        function getPromotionExpenses(baofei) {

            if (_this.agentratio != 0){
                $(".spread-blkrt").html((_this.agentratio * baofei).toFixed(2)+'元');
            }
            if (_this.shareratio != 0){
                var f = '<span class="font-28 mrl-20">返'+(_this.shareratio * baofei).toFixed(2)+'元</span>';
                $(".product-price").html('￥'+baofei+'元'+f);
            }else {
                $(".product-price").html('￥'+baofei+'元');
            }

        }

        //判断投保地区是不是第三类城市
        function judgeThreeCity() {
            if ($("#city-type").val().length != 0){
                var addr = $("#city-type").val().split(" ");
                if (contains(cityarr, addr[1])) {
                    addCoveragePicker(["10万", "20万"]);
                } else {
                    addCoveragePicker(["10万", "20万", "50万"]);
                }
            }
        }

        //保额弹出选择框
        function addCoveragePicker(arr){
            $("#coverage-price").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">请选择保额</h1>\
                </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: arr,
                        cssClass: 'picker-items-col-normal'
                    }
                ],
                onClose : function () {
                    accordingBaoeGetBaofei();
                }
            });
        }

        //根据保额修改保费
        function accordingBaoeGetBaofei() {

            var coverageValue = $("#coverage-price").val();
            if (coverageValue === "10万"){
                deathAndDisabled(coverageValue,"1万");
                $(".insure-price,.product-price").html('￥5.3元');
                getPromotionExpenses(5.3);
            }else if (coverageValue === "20万"){
                deathAndDisabled(coverageValue,"2万");
                $(".insure-price,.product-price").html('￥10.6元');
                getPromotionExpenses(10.6);
            }else if (coverageValue === "50万"){
                deathAndDisabled(coverageValue,"5万");
                $(".insure-price,.product-price").html('￥26.5元');
                getPromotionExpenses(26.5);
            }
        }

        //判断arr 是否包含 obj
        function contains(arr,obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        }

    },
    //http://www.baomanyi.com.cn/view/product_life/ddhsx/ddh_detail.html?inject=all&share=yes&type=1&userId=32&eUid=4c60M7IjQmxN1C7iqbZicknBh0K+Nt14wH45J2ZnUA

    price: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/Rate', {id:_this.productId}, function (re) {
            _this.flag=1;
            _this.agentratio = 0;
            _this.shareratio = 0;
            if(re.code=="0001000") {
                if (re.data.share&&re.data.share != "0"){
                    var f = '<span class="font-28 mrl-20">返'+parseFloat(re.data.share) * 5.3+'元</span>';
                    _this.shareratio = parseFloat(re.data.share);//记录普通用户的返还比率
                    $(".product-price").html("￥5.3元"+f);
                }

                if (re.data.agent&&re.data.agent != "0"){
                    _this.agentratio = parseFloat(re.data.agent);//记录经纪人返还比率
                    var price = parseFloat(re.data.agent) * 5.3 +"元";
                    $(".spread-blkrt").html(price);
                }
            }
            
            _this.event();

        },'json')
    },

    //检测是否选择了 投保地区
    test: function(){
        var values = [
            {
                name:"notEmpty",
                val:$("#city-type").val(),
                msg:"请选择投保地区"
            },
            {
                name:"notEmpty",
                val:$("#coverage-price").val(),
                msg:"请选择保额"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },
    
    //拼接分享的地址
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&userId='+this.userId+'&eUid='+this.eUid):(location.href+'?type=1&userId='+this.userId+'&eUid='+this.eUid);
        ShareFun("超值自驾意外险","全年最高100万全额自驾险，驾驶乘坐均可保，自驾畅游更放心！",url,null,2);
    }
}

//大都会自驾车意外险  填写投保信息
function ProZJC(options) {
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
ProZJC.prototype = {
    init: function(){
        //初始化UI界面
        $("#page-zjc .content").html(this.dom());

        //添加响应事件
        this.event();

        //从本地获取之前填写的数据 并填充上
        this.inputInfo = localStorage.getItem("InfoZjc")?$.parseJSON(localStorage.getItem("InfoZjc")):0;
        this.inputInfo?this.fill():"";
    },

    //填充已有数据
    fill: function(){
        $("#ph-name").val(this.inputInfo.name);
        $("#papers-code").val(this.inputInfo.idno);
        $("#telephone").val(this.inputInfo.phone);
        //$("#choose-date").val(this.inputInfo.effective_date);
    },

    //初始化UI界面
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        return  hs+this.tbrTitle("icon-applicant",BW.FormTitConf.tip_1)
            +this.getDom(BW.FormTitConf.tip_4,"ph-name",BW.FormPlhldrConf.tip_1,"bod-botm")
             +this.getDom(BW.FormTitConf.tip_25,"papers-code",BW.FormPlhldrConf.tip_3,"bod-botm")
            +this.getDom(BW.FormTitConf.tip_7,"telephone",BW.FormPlhldrConf.tip_4)
            +he+hs
            +this.tbrTitle("icon-insured",BW.FormTitConf.tip_2)
            +this.getStaticDom("被保人与投保人为同一人","")
            +he+hs
            +this.tbrTitle("icon-beneficiary",BW.FormTitConf.tip_3)
            +this.getStaticDom("身故保险金受益人",BW.FormPlhldrConf.tip_12)
            +he+hs
            +this.tbrTitle("iconfont icon-calendar",BW.FormTitConf.tip_16)
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

    //添加响应事件
    event: function(){
        var _this = this;
        //生效日期
        $("#choose-date").calendar({
            maxDate: nowDate(180),
            minDate: nowDate(0)
        });

        //下一步点击
        $(".btn-insure-next").off("tap").on("tap",function(){
             if(!_this.test()){return;}
            if(!_this.check()){return;}
            
            //记录信息 保存到本地
            var record ={
                name:$("#ph-name").val(),//投保人姓名
                idno:$("#papers-code").val(),//身份证号码
                phone:$("#telephone").val(),//手机号码
                validate:$("#choose-date").val(),//生效日期
                proname:_this.proname,//省
                cityname:_this.cityname,//市
                nt:_this.nt,//保额
                userId:_this.userId,//推荐人的id
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoZjc", value);
            
            var url = '/view/product_life/ddhsx/ddh_confirm.html?inject=all';
            if(_this.share){
                window.location = "ddh_confirm.html?type=1";
            }else{
                window.location.href = "bmy://app.page/life/nextpage?url="+url+"&parameterList=proname="+_this.proname+"||cityname="+_this.cityname+"||nt="+_this.nt+"||name="+$("#ph-name").val()+"||idno="+$("#papers-code").val()+"||phone="+$("#telephone").val()+"||validate="+$("#choose-date").val()+"&isH5navBar=1";
            }
            
        })
    },

    //检验是否填写相关信息
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
                name:"notEmpty",
                val:$("#choose-date").val(),
                msg:"请选择保险生效日期"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },

    //检验是否满足投保标准
    check: function(){
        var age = calAge($("#papers-code").val(),1);
        if(age<18||age>75){
            popAlert("被保人年龄不在保障年龄范围内"); return false;
        }
        return true;
    },
    
}

//大都会自驾车意外险  确认投保信息
function ConfirmZJC(options){
    var _default = {
        enterid: 1,
        token: null,
        share: false,
        productName:"超值自驾车意外伤害保险",
        companyShortName:"大都会人寿"
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
ConfirmZJC.prototype = {
    init: function(){

        var _this = this;
        var model;
        if(_this.order_id){

            //从我的订单跳转过来 存在订单号
            $.post('//'+domain.sx+'/insurance/daduhui/Detail/zjc', {token:_this.token,order_id:_this.order_id}, function (re) {
                //console.log(">>>>>>>>>>>>>"+re.code + re.data.url + re.data.param.proname);
                if(re.code=='0001000'){
                    model = {
                        name : re.data.name,
                        idno : re.data.idno,
                        phone : re.data.phone,
                        validate : re.data.validate,
                        userId : re.data.userId,
                        proname : re.data.proname,
                        cityname : re.data.cityname,
                        nt : re.data.nt
                    }
                    _this.dom(model);
                }else{
                    popCommon("提示",re.data,"<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
                }
            },'json')
        }
        else {
            model = {
                name : _this.name,
                idno : _this.idno,
                phone : _this.phone,
                validate : _this.validate,
                userId : _this.userId,
                proname : _this.proname,
                cityname : _this.cityname,
                nt : _this.nt
            }
            _this.dom(model);
        }
    },

    //初始化UI界面
    dom: function(model){
        var _this = this;
        var hs = '<div class="card-block product-result-wrap">';
        var he = '</div>';

        var shareTitle = 'bmy://app.page/document/?docAddress=';
        var appTitle = '../../..';
        var agree = _this.share?'<a href="'+appTitle+'/public/pdf/ddh/付费险投保须知-全国-任我行自驾车.pdf" class="font-FF6900">《投保须知》</a>、<a href="'+appTitle+'/public/pdf/ddh/SPA209条款-中美联泰大都会人寿保险有限公司自驾车意外伤害保险.pdf" class="font-FF6900">《保险产品条款》</a>':'<a href="'+shareTitle+'//public/pdf/ddh/付费险投保须知-全国-任我行自驾车.pdf" class="font-FF6900">《投保须知》</a>、<a href="'+shareTitle+'/public/pdf/ddh/SPA209条款-中美联泰大都会人寿保险有限公司自驾车意外伤害保险.pdf" class="font-FF6900">《保险产品条款》</a>';

        var p = _this.order_id?"":_this.tbrTitle("",BW.FormInfo.tip_6)
        +'<div class="flex-wrap flex-wrap-static">'
        +'<i class="iconfont icon-unselected-single tb-agreement"></i>'
        +'<p class="notice-title">我已了解并接受<span>'+agree+'</span></p>'
        +'</div>'
        +he
        +'<div class="btn-insure-confirm disabled">确认提交</div>';

        var bf = "0元";
        if (model.nt/10000 == 10){
            bf = "5.3元";
        }else if(model.nt/10000 == 20){
            bf = "10.6元";
        }else if(model.nt/10000 == 50){
            bf = "26.5元";
        }else if(model.nt/10000 == 100){
            bf = "53元";
        }

         var html = hs
         +_this.getStaticDom('<h1 class="insure-title-proname">'+_this.productName+'</h1>',_this.companyShortName)
             +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_1)
            +_this.getStaticDom("保额",model.nt/10000+"万元")
            +_this.getStaticDom(BW.FormTitConf.tip_30,bf)
            +_this.getStaticDom(BW.FormTitConf.tip_22,"364天")
            +_this.getStaticDom(BW.FormTitConf.tip_29,model.validate)
            +_this.getStaticDom("投保地区",model.proname+"-"+model.cityname)
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_2)
            +_this.getStaticDom(BW.FormTitConf.tip_4,model.name)
            +_this.getStaticDom(BW.FormTitConf.tip_25,model.idno)
            +_this.getStaticDom(BW.FormTitConf.tip_7,model.phone)
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_3)
            +_this.getStaticDom("被保人与投保人为同一人","")
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_4)
            +_this.getStaticDom(BW.FormTitConf.tip_3,BW.FormPlhldrConf.tip_12)
            +he+hs+p;


        $(".content").html(html);
        _this.count = 0;
        _this.event();
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

    //添加响应事件
    event: function(){
        var _this = this;

        //点击同意声明
        $(".tb-agreement").off("tap").on("tap",function(){
            $(this).toggleClass("icon-unselected-single").toggleClass("icon-selected-single");
            _this.isAllow();
        })

        //点击确认提交
        $(".btn-insure-confirm").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            var m = $('<div class="mask-layer"></div>');
            var l = $('<div class="loading"><div class="loading-img"></div><div class="loadding-word color-fff">核保中...</div></div>');
            $("body").append(m,l);
            m.show();
            _this.confirm();
        })
    },
    //确认提交的 是否可点击的状态
    isAllow: function(){
        if($(".tb-agreement").hasClass("icon-selected-single")){
            $(".btn-insure-confirm").removeClass("disabled")
        }else{
            $(".btn-insure-confirm").addClass("disabled")
        }
    },

    //自驾车意外险投保接口
    confirm: function(){
        var _this = this;

        var url = "";
        var locurl = window.location.href.match(/type=.([^&]*)/);
        //判断type是否等于1 若等于1 则说明是分享出去的
        if(locurl&&locurl[0].substr(5)==1){
            url = "/view/pay/success.html?inject=all";
        }else {
            url = "bmy://app.page/life/jumpToMyOrder?state=1";
        }

        $.post('//'+domain.sx+'/insurance/daduhui/zjc/Accept/product', {token:_this.token,name:_this.name,idno:_this.idno,phone:_this.phone,url:url,validate:_this.validate,promotion_id:_this.userId,proname:_this.proname,cityname:_this.cityname,nt:_this.nt}, function (re) {
            $(".loading").remove();
            //console.log(">>>>>>>>>>>>>"+re.code + re.data.url + re.data.param.proname);
            if(re.code=='0001000'){
                var url = re.data.url;
                var  zjcForm = '<form action="'+url+'" method="post" id="zjc-submit">\
                    <input type="hidden" name="orderno" value="'+ re.data.param.orderno +'"/>\
                    <input type="hidden" name="name" value="'+ re.data.param.name +'"/>\
                    <input type="hidden" name="idtype" value="'+ re.data.param.idtype +'"/>\
                    <input type="hidden" name="idno" value="'+ re.data.param.idno +'"/>\
                    <input type="hidden" name="sex" value="'+ re.data.param.sex +'"/>\
                    <input type="hidden" name="birthday" value="'+ re.data.param.birthday +'"/>\
                    <input type="hidden" name="phone" value="'+ re.data.param.phone +'"/>\
                    <input type="hidden" name="proname" value="'+ re.data.param.proname +'"/>\
                    <input type="hidden" name="cityname" value="'+ re.data.param.cityname +'"/>\
                    <input type="hidden" name="plancode" value="'+ re.data.param.plancode +'"/>\
                    <input type="hidden" name="validate" value="'+ re.data.param.validate +'"/>\
                    <input type="hidden" name="planperiod" value="'+ re.data.param.planperiod +'"/>\
                    <input type="hidden" name="poltermtype" value="'+ re.data.param.poltermtype +'"/>\
                    <input type="hidden" name="planprem" value="'+ re.data.param.planprem +'"/>\
                    <input type="hidden" name="planamnt" value="'+ re.data.param.planamnt +'"/>\
                    <input type="hidden" name="sign" value="'+ re.data.param.sign +'"/>\
                    <input type="hidden" name="source" value="'+ re.data.param.source +'"/>\
                    <input type="hidden" name="backurl" value="'+ re.data.param.backurl +'"/>\
                    <input type="hidden" name="fronturl" value="'+ re.data.param.fronturl +'"/>\
                </form>'

                $("body").append(zjcForm);
                $("#zjc-submit").submit();


            }else{
                popCommon("提示",re.data,"<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
            }
        },'json')
    }
}


//********************************** 大都会人寿航空意外险 *******************************//

//大都会人寿航空意外险  详情页面js
function DetailAviation(options){
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
DetailAviation.prototype = {
    init: function(){
        var _this = this;
        //如果用户是寿险经纪人
        if(this.enterid=="2"){
            var html = '<a href="javascript:;" class="to-rule">规则说明</a>\
                <div class="to-share">分享给客户<br><span>(对方看不到推广费)</span></div>\
                <div class="to-insure">立即投保</div>';
            $(".btn-insure").html(html);
            $(".is-spread").append('<div class="spread-block"><span class="spread-blklt">推广费</span><span class="spread-blkrt"></span></div>');
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
        _this.price();

    },

    price: function(){
        var _this = this;
        $.post('//'+domain.sx+'/insurance/Rate', {id:_this.productId}, function (re) {

            _this.agentratio = 0;
            _this.shareratio = 0;
            if(re.code=="0001000") {
                if (re.data.share&&re.data.share != "0"){
                    var f = '<span class="font-28 mrl-20">返'+parseFloat(re.data.share) * 1+'元起</span>';
                    _this.shareratio = parseFloat(re.data.share);//记录普通用户的返还比率
                    $(".product-price").html("￥1元起"+f);
                }

                if (re.data.agent&&re.data.agent != "0"){
                    _this.agentratio = parseFloat(re.data.agent);//记录经纪人返还比率
                    var price = parseFloat(re.data.agent) * 1 +"元起";
                    $(".spread-blkrt").html(price);
                }
            }
            _this.event();

        },'json')
    },
    //添加响应事件
    event: function () {
        var _this = this;

        //保障范围点击展开,闭合
        $(".detail-show").on("tap",function(){
            var id = $(this).data("id");
            var sel = $(".item-detail[data-id='"+id+"']");
            if(sel.hasClass("showbox")){
                sel.removeClass("showbox");
                $(".iconfont",this).removeClass("icon-arrow-up");
            }else{
                sel.addClass("showbox");
                $(".iconfont",this).addClass("icon-arrow-up");
            }
        });

        //点击投保方案弹出选择框
        $("#insure-program").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">请选择投保方案</h1>\
                </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ["商务版", "至尊版", "尊享版"],
                    cssClass: 'picker-items-col-normal'
                }
            ],
            onClose : function () {
                 accordingInsureProgramGetDeathAndDisabled();
                 accordingInsureProgramAndsSfeguarddataGetBaoFei();
            }
        });

        //点击保障期间弹出选择框
        $("#safeguard-data").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">'+BW.FormUsConf.tip_5+'</button>\
                <h1 class="title">请选择保障期间</h1>\
                </header>',
            cols: [
                {
                    textAlign: 'center',
                    values: ["1天","7天","15天","30天","180天","364天"],
                    cssClass: 'picker-items-col-normal'
                }
            ],
            onClose : function () {
                accordingInsureProgramAndsSfeguarddataGetBaoFei();
            }
        });

        //根据投保方案 调整保障范围
        function accordingInsureProgramGetDeathAndDisabled() {
            var insureprogram = $("#insure-program").val();
            if (insureprogram === "商务版"){
                deathAndDisabled("100万","10万");
            }else if (insureprogram === "至尊版"){
                deathAndDisabled("500万","50万");
            }else if (insureprogram === "尊享版"){
                deathAndDisabled("1000万","100万");
            }
        }

        //根据投保方案和保险期间 调整保费
        function accordingInsureProgramAndsSfeguarddataGetBaoFei() {

            var insureprogram = $("#insure-program").val();
            if (insureprogram.length == 0){return;}
            if (insureprogram === "商务版"){
                getBaoFei(1);
            }else if (insureprogram === "至尊版"){
                getBaoFei(5);
            }else if (insureprogram === "尊享版"){
                getBaoFei(10);
            }
        }
        function getBaoFei(count){
            var safeguarddata = $("#safeguard-data").val();
            if (safeguarddata.length == 0){return;}
            if (safeguarddata === "1天"){
                $(".insure-price,.product-price").html('￥'+1*count+'元');
                getPromotionExpenses(1*count);
            }else if (safeguarddata === "7天"){
                $(".insure-price,.product-price").html('￥'+2*count+'元');
                getPromotionExpenses(2*count);
            }else if (safeguarddata === "15天"){
                $(".insure-price,.product-price").html('￥'+3*count+'元');
                getPromotionExpenses(3*count);
            }else if (safeguarddata === "30天"){
                $(".insure-price,.product-price").html('￥'+4*count+'元');
                getPromotionExpenses(4*count);
            }else if (safeguarddata === "180天"){
                $(".insure-price,.product-price").html('￥'+8*count+'元');
                getPromotionExpenses(8*count);
            }else if (safeguarddata === "364天"){
                $(".insure-price,.product-price").html('￥'+12*count+'元');
                getPromotionExpenses(12*count);
            }

        }

        //获得推广费
        function getPromotionExpenses(baofei) {
            if (_this.agentratio){
                $(".spread-blkrt").html((_this.agentratio * baofei).toFixed(2)+'元');
            }
            if (_this.shareratio){
                var str = (_this.shareratio * baofei).toFixed(2);
                var f = '<span class="font-28 mrl-20">返'+str+'元</span>';
                $(".product-price").html('￥'+baofei+'元'+f);
            }

        }

        //保障范围价格变化
        function deathAndDisabled(deathprice,disabledprice) {
            var death = document.getElementById("death");
            var disabled = document.getElementById("disabled");
            death.innerHTML = deathprice + '元' + '<i class="iconfont icon-arrow-down"></i>';
            disabled.innerHTML = disabledprice + '元' + '<i class="iconfont icon-arrow-down"></i>';
        }


        var type = window.location.href.match(/type=.([^&]*)/)?window.location.href.match(/type=.([^&]*)/)[0].substr(5):"0";
        //判断type是否等于1 若等于1 则说明是分享出去的
        if(type != 1) {
            //立即投保按钮点击
            $(".to-insure").on("tap", function () {
                if (!_this.test()) {
                    return;
                }//检测是否选择了 投保方案和保障期间
                var insureProgram = $("#insure-program").val();//投保方案
                var insuretype = "0";
                if (insureProgram == "商务版") {
                    insuretype = "1";
                } else if (insureProgram == "至尊版") {
                    insuretype = "2";
                } else if (insureProgram == "尊享版") {
                    insuretype = "3";
                }
                var insurerange = $("#safeguard-data").val().split("天")[0];//保障期间
                var productPrice = $(".product-price").html().split("元")[0];
                var baofei = productPrice.split("￥")[1];

                var url = '/view/product_life/ddhsx/ddh_aviation_insure.html?inject=all';
                window.location.href = "bmy://app.page/life/product/judgeLogin?url=" + url + "&parameterList=insuretype=" + insuretype + "||insurerange=" + insurerange + "||productprice=" + baofei + "&isH5navBar=1";
            });
        }

    },

    //检测是否选择了 投保方案和保障期间
    test: function(){
        var values = [
            {
                name:"notEmpty",
                val:$("#insure-program").val(),
                msg:"请选择您的投保方案"
            },
            {
                name:"notEmpty",
                val:$("#safeguard-data").val(),
                msg:"请选择您的保障期间"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },

    //拼接分享的地址
    sharepage: function(){
        var url = window.location.href.match(/html\?/);
        url = (url[0]=='html?')?(location.href+'&type=1&userId='+this.userId+'&eUid='+this.eUid):(location.href+'?type=1&userId='+this.userId+'&eUid='+this.eUid);
        ShareFun("超值性价比，为您提供全面意外保障","我在保满意中发现了一款好产品，你也看看吧",url,null,2);
    }
}

//大都会人寿航空意外险  填写投保信息
function ProAviation(options) {
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
ProAviation.prototype = {
    init: function(){
        //初始化UI界面
        $("#page-aviation .content").html(this.dom());

        //添加响应事件
        this.event();

        //从本地获取之前填写的数据 并填充上
        this.inputInfo = localStorage.getItem("InfoAviation")?$.parseJSON(localStorage.getItem("InfoAviation")):0;
        this.inputInfo?this.fill():"";
    },

    //填充已有数据
    fill: function(){
        $("#ph-name").val(this.inputInfo.name);
        $("#papers-code").val(this.inputInfo.idno);
        $("#telephone").val(this.inputInfo.phone);
        //$("#choose-date").val(this.inputInfo.effective_date);
    },

    //初始化UI界面
    dom: function(){
        var hs = '<div class="card-block product-wrap">';
        var he = '</div>';
        return  hs+this.tbrTitle("icon-applicant",BW.FormTitConf.tip_1)
            +this.getDom(BW.FormTitConf.tip_4,"ph-name",BW.FormPlhldrConf.tip_1,"bod-botm")
            +this.getDom(BW.FormTitConf.tip_25,"papers-code",BW.FormPlhldrConf.tip_3,"bod-botm")
            +this.getDom(BW.FormTitConf.tip_7,"telephone",BW.FormPlhldrConf.tip_4)
            +he+hs
            +this.tbrTitle("icon-insured",BW.FormTitConf.tip_2)
            +this.getStaticDom("被保人与投保人为同一人","")
            +he+hs
            +this.tbrTitle("icon-beneficiary",BW.FormTitConf.tip_3)
            +this.getStaticDom("身故保险金受益人",BW.FormPlhldrConf.tip_12)
            +he+hs
            +this.tbrTitle("iconfont icon-calendar",BW.FormTitConf.tip_16)
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

    //添加响应事件
    event: function(){
        var _this = this;
        //生效日期
        $("#choose-date").calendar({
            maxDate: nowDate(180),
            minDate: nowDate(0)
        });

        //下一步点击
        $(".btn-insure-next").off("tap").on("tap",function(){
            if(!_this.test()){return;}
            if(!_this.check()){return;}

            //记录信息 保存到本地
            var record ={
                name:$("#ph-name").val(),//投保人姓名
                idno:$("#papers-code").val(),//身份证号码
                phone:$("#telephone").val(),//手机号码
                validate:$("#choose-date").val(),//生效日期
                userId:_this.userId,//推荐人的id
                insuretype:_this.insuretype,//保险方案
                insurerange:_this.insurerange,//保险期限
                productprice:_this.productprice//保费
            };
            var value = value||[];
            value = JSON.stringify(record);
            localStorage.setItem("InfoAviation", value);

            var url = '/view/product_life/ddhsx/ddh_aviation_confirm.html?inject=all';
            if(_this.share){
                window.location = "ddh_aviation_confirm.html?type=1";
            }else{
                window.location.href = "bmy://app.page/life/nextpage?url="+url+"&parameterList=insuretype="+_this.insuretype+"||insurerange="+_this.insurerange+"||productprice="+_this.productprice+"||name="+$("#ph-name").val()+"||idno="+$("#papers-code").val()+"||phone="+$("#telephone").val()+"||validate="+$("#choose-date").val()+"&isH5navBar=1";
             }

        })
    },

    //检验是否填写相关信息
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
                name:"notEmpty",
                val:$("#choose-date").val(),
                msg:"请选择保险生效日期"
            }
        ];
        var mPb = new ProBox();
        return mPb.test(values);
    },

    //检验是否满足投保标准
    check: function(){
        var age = calAge($("#papers-code").val(),1);
        if(age<18||age>75){
            popAlert("被保人年龄不在保障年龄范围内"); return false;
        }
        return true;
    },

}

//大都会航空意外险  确认投保信息
function ConfirmAviation(options){
    var _default = {
        enterid: 1,
        token: null,
        share: false,
        productName:"航空意外险",
        companyShortName:"大都会人寿"
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}
ConfirmAviation.prototype = {
    init: function(){
        var _this = this;
        var model;
        if(_this.order_id){

            //从我的订单跳转过来 存在订单号
            $.post('//'+domain.sx+'/insurance/daduhui/Detail/hkyw', {token:_this.token,order_id:_this.order_id}, function (re) {
                //console.log(">>>>>>>>>>>>>"+re.code + re.data.url + re.data.param.proname);
                if(re.code=='0001000'){
                    
                    model = {
                        name : re.data.name,
                        idno : re.data.idno,
                        phone : re.data.phone,
                        validate : re.data.validate,
                        userId : re.data.userId,
                        insuretype : re.data.insuretype,
                        insurerange : re.data.insurerange,
                        productprice : re.data.productprice,
                    }
                    _this.dom(model);
                }else{
                    popCommon("提示",re.data,"<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
                }
            },'json')
        }
        else {
            model = {
                name : _this.name,
                idno : _this.idno,
                phone : _this.phone,
                validate : _this.validate,
                userId : _this.userId,
                insuretype : _this.insuretype,
                insurerange : _this.insurerange,
                productprice : _this.productprice
            }
            _this.dom(model);
        }
    },

    //初始化UI界面
    dom: function(model){
        var _this = this;
        var hs = '<div class="card-block product-result-wrap">';
        var he = '</div>';

        var shareTitle = 'bmy://app.page/document/?docAddress=';
        var appTitle = '../../..';
        var agree = _this.share?'<a href="'+appTitle+'/public/pdf/ddh/付费险投保须知-全国-航空意外.pdf" class="font-FF6900">《投保须知》</a>、<a href="'+appTitle+'/public/pdf/ddh/条款终稿-中美联泰大都会人寿保险有限公司航空意外伤害保险.pdf" class="font-FF6900">《保险产品条款》</a>':'<a href="'+shareTitle+'//public/pdf/ddh/付费险投保须知-全国-航空意外.pdf" class="font-FF6900">《投保须知》</a>、<a href="'+shareTitle+'/public/pdf/ddh/条款终稿-中美联泰大都会人寿保险有限公司航空意外伤害保险.pdf" class="font-FF6900">《保险产品条款》</a>';

        var p = _this.order_id?"":_this.tbrTitle("",BW.FormInfo.tip_6)
        +'<div class="flex-wrap flex-wrap-static">'
        +'<i class="iconfont icon-unselected-single tb-agreement"></i>'
        +'<p class="notice-title">' + '我已了解并接受<span>'+agree+'</span>等内容，理解并接受有关保险责任、承保地域限制和个人信息使用授权的内容</p>'+'</div>'
        +he
        +'<div class="btn-insure-confirm disabled">确认提交</div>';

        var baoe = "100万元";
        var insure = "商务版";
        if (model.insuretype == "1"){
            baoe = "100万元";
            insure = "商务版";
        }else if(model.insuretype == "2"){
            baoe = "500万元";
            insure = "至尊版";
        }else if(model.insuretype == "3"){
            baoe = "1000万元";
            insure = "尊享版";
        }

        var html = hs
            +_this.getStaticDom('<h1 class="insure-title-proname">'+_this.productName+'</h1>',_this.companyShortName)
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_1)
            +_this.getStaticDom("保额",baoe)
            +_this.getStaticDom("保险方案",insure)
            +_this.getStaticDom(BW.FormTitConf.tip_30,model.productprice+'元')
            +_this.getStaticDom(BW.FormTitConf.tip_22,model.insurerange+'天')
            +_this.getStaticDom(BW.FormTitConf.tip_29,model.validate)
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_2)
            +_this.getStaticDom(BW.FormTitConf.tip_4,model.name)
            +_this.getStaticDom(BW.FormTitConf.tip_25,model.idno)
            +_this.getStaticDom(BW.FormTitConf.tip_7,model.phone)
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_3)
            +_this.getStaticDom("被保人与投保人为同一人","")
            +he+hs
            +_this.tbrTitle("",BW.FormInfo.tip_4)
            +_this.getStaticDom(BW.FormTitConf.tip_3,BW.FormPlhldrConf.tip_12)
            +he+hs+p;


        $(".content").html(html);
        _this.count = 0;
        _this.event();
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

    //添加响应事件
    event: function(){
        var _this = this;

        //点击同意声明
        $(".tb-agreement").off("tap").on("tap",function(){
            $(this).toggleClass("icon-unselected-single").toggleClass("icon-selected-single");
            _this.isAllow();
        })

        //点击确认提交
        $(".btn-insure-confirm").off("tap").on("tap",function(){
            if($(this).hasClass("disabled")){return;}
            var m = $('<div class="mask-layer"></div>');
            var l = $('<div class="loading"><div class="loading-img"></div><div class="loadding-word color-fff">核保中...</div></div>');
            $("body").append(m,l);
            m.show();
            _this.confirm();
        })
    },
    //确认提交的 是否可点击的状态
    isAllow: function(){
        if($(".tb-agreement").hasClass("icon-selected-single")){
            $(".btn-insure-confirm").removeClass("disabled")
        }else{
            $(".btn-insure-confirm").addClass("disabled")
        }
    },

    //自驾车意外险投保接口
    confirm: function(){
        var _this = this;

        var url = "";
        var locurl = window.location.href.match(/type=.([^&]*)/);
        //判断type是否等于1 若等于1 则说明是分享出去的
        if(locurl&&locurl[0].substr(5)==1){
            url = "/view/pay/success.html?inject=all";
        }else {
            url = "bmy://app.page/life/jumpToMyOrder?state=1";
        }

        $.post('//'+domain.sx+'/insurance/daduhui/hkyw/Accept/product', {token:_this.token,name:_this.name,idno:_this.idno,phone:_this.phone,url:url,validate:_this.validate,promotion_id:_this.userId,insuretype:_this.insuretype,insurerange:_this.insurerange}, function (re) {
            $(".loading").remove();
            //console.log(">>>>>>>>>>>>>"+re.code + re.data.url + re.data.param.planprem);
            if(re.code=='0001000'){

                var url = re.data.url;
                var  aviationForm = '<form action="'+url+'" method="post" id="aviation-submit">\
                    <input type="hidden" name="orderno" value="'+ re.data.param.orderno +'"/>\
                    <input type="hidden" name="name" value="'+ re.data.param.name +'"/>\
                    <input type="hidden" name="idtype" value="'+ re.data.param.idtype +'"/>\
                    <input type="hidden" name="idno" value="'+ re.data.param.idno +'"/>\
                    <input type="hidden" name="sex" value="'+ re.data.param.sex +'"/>\
                    <input type="hidden" name="birthday" value="'+ re.data.param.birthday +'"/>\
                    <input type="hidden" name="phone" value="'+ re.data.param.phone +'"/>\
                    <input type="hidden" name="proname" value="'+ re.data.param.proname +'"/>\
                    <input type="hidden" name="cityname" value="'+ re.data.param.cityname +'"/>\
                    <input type="hidden" name="plancode" value="'+ re.data.param.plancode +'"/>\
                    <input type="hidden" name="validate" value="'+ re.data.param.validate +'"/>\
                    <input type="hidden" name="planperiod" value="'+ re.data.param.planperiod +'"/>\
                    <input type="hidden" name="poltermtype" value="'+ re.data.param.poltermtype +'"/>\
                    <input type="hidden" name="planprem" value="'+ re.data.param.planprem +'"/>\
                    <input type="hidden" name="planamnt" value="'+ re.data.param.planamnt +'"/>\
                    <input type="hidden" name="sign" value="'+ re.data.param.sign +'"/>\
                    <input type="hidden" name="source" value="'+ re.data.param.source +'"/>\
                    <input type="hidden" name="backurl" value="'+ re.data.param.backurl +'"/>\
                    <input type="hidden" name="fronturl" value="'+ re.data.param.fronturl +'"/>\
                </form>'

                $("body").append(aviationForm);
                $("#aviation-submit").submit();



            }else{
                popCommon("提示",re.data,"<a href='javascript:;' id='closed' class='color-fff close-know'>我知道了</a>");
            }
        },'json')


    }


}