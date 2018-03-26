//买保险
function buyInsurance(options){
    var _default = {
        token: 0,
        search:"",
        loading: false,
        page: 1,
        maxItems: 100, // 最多可加载的条目 
        itemsPerLoad: 7, // 每次加载添加多少条目 
        lastIndex: 7, // 上次加载的序号
        isNomore: false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

buyInsurance.prototype= {
	init: function(){
		var _this = this;
		this.dom();
		this.sid = 0;
		this.getList(this.itemsPerLoad,this.page);
	},
	dom: function(){
		this.navlist = $('<ul class="secondary-list"></ul>');
		this.nav = $('<div class="header-secondary-left"></div>');
		this.filter = $('<a href="javascript:;" class="head-tool">筛选<i class="iconfont icon-filter"></i></a>');

		this.tab = $('<div class="tabs"></div>');
		this.pull = '<div class="pull-to-refresh-layer"><div class="preloader"></div><div class="pull-to-refresh-arrow"></div></div>';
		this.scroll = '<div class="infinite-scroll-preloader"><div class="preloader"></div></div>';
	},
	getList: function(lim,pg,ismore){
		var _this = this;
		ismore = ismore?1:0;
		if(!_this.token){ _this.token = getToken()}
        $.post('//'+domain.sx+'/insurance/client/Product/products',{token:_this.token,section_id:_this.sid,search:_this.search,limit:lim,page:pg}, function (re) {
            if(re.code=="0001000"){
            	var l="",t="",u="";
            	if(_this.sid==0&&pg==1){
            		for(var i = 0; i <re.data.title.length; i++){
	                	var classname = _this.sid==0?(i==0?"active":""):(_this.sid==re.data.title[i].id?"active":"");
	                	l += '<li><a href="#tab'+i+'" class="tab-link tab-item '+classname+'" data-id="'+re.data.title[i].id+'">'+re.data.title[i].name+'</a></li>';
	                	t +='<div id="tab'+i+'" class="tab infinite-scroll '+classname+'"></div>';
	                }
	                _this.navlist.html(l);
	                _this.nav.append(_this.navlist);
	                $(".bar-header-secondary").append(_this.nav,_this.filter);
	                scrollTab(".secondary-list");
	                _this.tab.html(t);
	                $(".content").html("").append(_this.tab);
            	}
                
                for(var i = 0; i <re.data.products.length; i++){
                	u += '<li data-id="'+re.data.products[i].product_id+'">\
	                        <div class="card-block buy-card">\
	                        	<a href="'+re.data.products[i].url+'&type=1&productId='+re.data.products[i].product_id+'&userId=0&ctype=1&eUid=0" external><div class="buy-card-img">'+
	                                (re.data.products[i].reward?'<span>'+re.data.products[i].reward+'</span>':'')+
	                                '<img src="'+re.data.products[i].img_url+'" class="thumbnail">\
	                            </div>\
	                            <div class="buy-card-title">\
	                                <h1 class="font-32">'+re.data.products[i].name+'</h1>\
	                                <em class="color-FF6900 font-32">'+re.data.products[i].price+'</em>\
	                            </div>\
	                            <div class="buy-card-info">\
	                                <p>承保年龄:'+re.data.products[i].age+'</p>\
	                                <p>保险期限:'+re.data.products[i].range+'</p>\
	                            </div></a>\
	                        </div>\
	                    </li>'
                }
                if(re.data.products.length==0){_this.isNomore = true}

                var nl = ismore?($(".tab.active ul li").length>0?$(".tab.active ul").html():""):"";
                $(".tab.active").html(_this.pull+'<ul>'+nl+u+'</ul>'+_this.scroll);

                _this.lastIndex = $('.tab.active ul li').length;
                if(_this.lastIndex<lim){
                    $('.tab.active .infinite-scroll-preloader').remove();
                    $('.tab.active ul').after('<div class="get-nomore">没有更多了</div>');
                }

                _this.event();
            }
        },'json');
	},
	event: function(){
		var _this = this;
		$(".tab-item").off("tap").on("tap",function(){
			if(_this.sid!=$(this).data("id")){
				_this.sid=$(this).data("id");
				_this.lastIndex = _this.itemsPerLoad;
				_this.search = [];
				_this.getList(_this.itemsPerLoad,_this.page);
			}
		});

		$(".head-tool").off("tap").on("tap",function(){
			_this.search = "";
            _this.filterDom();
        });

        $(document).off('refresh').on('refresh', '.pull-to-refresh-content',function(e) {
            setTimeout(function() {
                _this.getList(_this.itemsPerLoad,_this.page);
                $.pullToRefreshDone('.pull-to-refresh-content');
            }, 2000);
        });
        //this.scrollevent();
	},
	scrollevent: function(){
        var _this = this;
 		$(document).off("pageInit").on("pageInit", "#page-fixed-tab-infinite-scroll", function(e, id, page) {

		    $(".page").off('infinite').on('infinite',function() {

		          // 如果正在加载，则退出
		          if (_this.loading) return;

		          // 设置flag
		          _this.loading = true;

		          _this.lastIndex = $('.tab.active ul li').length;

		          // 模拟1s的加载过程
		          setTimeout(function() {
		              // 重置加载flag
		              _this.loading = false;

		              if (_this.lastIndex >= _this.maxItems||_this.lastIndex%_this.itemsPerLoad!=0||_this.isNomore==true) {
		                    
		                    // 加载完毕，则注销无限加载事件，以防不必要的加载
		                    //$.detachInfiniteScroll($('.infinite-scroll'));

		                    // 删除加载提示符
		                    $('.active .infinite-scroll-preloader').remove();
		                    $(".active .get-nomore").length<1?$('.tab.active ul').after('<div class="get-nomore">没有更多了</div>'):"";
		                    return;
		              }

		              // 添加新条目
		              _this.getList(_this.itemsPerLoad, _this.lastIndex/_this.itemsPerLoad+1, 1);
		              
		              //容器发生改变,如果是js滚动，需要刷新滚动
		              $.refreshScroller();
		          }, 1000);
		    });
	    });
    },
	filterDom: function(){
		var _this = this;
		if(!_this.token){ _this.token = getToken()}
        $.post('//'+domain.sx+'/insurance/client/Product/sectionFilter',{token:_this.token,section_id:_this.sid}, function (re) {
        	if(re.code == "0001000"){
        		var html = "";
        		for(var i=0; i<re.data.length; i++){
        			html += '<div class="filter-cat">'+re.data[i].condition+'</div><div class="filter-tag" data-cat="'+re.data[i].condition_id+'">'
        			for (var j = 0; j < re.data[i].option.length; j++) {
        				html += '<span data-id="'+re.data[i].option[j].id+'" class="'+(re.data[i].option[j].is_default?'on':'')+'">'+re.data[i].option[j].name+'</span>'
        			}
	                html += '</div>'
        		}

        		var sname = $(".tab-link.active").html();
        		$("body").append('<div class="pop-filter"><div class="pop-filter-title bod-botm">'+sname+'</div><div class="pop-filter-content">'+html+'</div><div class="btn-sure">确定</div></div><div class="mask-layer" style="display:block"></div>');
        		_this.filterEvent();
        	}
        },"json");
	},
	filterEvent: function(){
		var $mask = $(".mask-layer");
		var $filter = $(".pop-filter");
		var _this = this;
		this.search = [];

		$(".filter-tag span").off("tap").on("tap",function(){
			$(this).closest(".filter-tag").find("span").removeClass("on");
			$(this).addClass("on");
		});

		$(".btn-sure").off("tap").on("tap",function(){
			$(".filter-tag").each(function(){
				_this.search.push({
					"condition_id":$(this).data("cat"),
					"id":$(".on",this).data("id")
				});
			});
			_this.search = JSON.stringify(_this.search);
			_this.getList(_this.itemsPerLoad,_this.page);
			$mask.remove();
			$filter.remove();
		});
		
		
		$mask.off("tap").on("tap",function(){
			$mask.remove();
			$filter.remove();
		});
	}
}

//我的订单
function myOrder(options){
    var _default = {
        token: 0,
        search:"",
        loading: false,
        page: 1,
        maxItems: 100, // 最多可加载的条目 
        itemsPerLoad: 8, // 每次加载添加多少条目 
        lastIndex: 8, // 上次加载的序号
        isNomore: false,
        pay_status: null,
        type: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

myOrder.prototype= {
	init: function(){
		var _this = this;
		this.gologin();
		this.dom();
	},
	gologin: function(){
		var _this = this;
		this.userInfo = localStorage.getItem("userInfo")?localStorage.getItem("userInfo"):0;
		if(!this.userInfo){
			localStorage.setItem("lastUrl", window.location.href);
			window.location.href = "/view/user/login.html";
		}else{
			_this.userInfo = _this.userInfo.split(",");
			$.post('//'+domain.jc+'/user/get_token/check_token',{token:_this.userInfo[0]}, function (re) {
                if(re.code == '0001000'){
					_this.token = _this.userInfo[0];
					_this.userId = _this.userInfo[1]
					_this.getList(_this.itemsPerLoad,_this.page);
                }else{
                	localStorage.setItem("lastUrl", window.location.href);
                    window.location.href = "/view/user/login.html";
                }
            },'json');
		}
	},
	dom: function(){
		this.pull = '<div class="pull-to-refresh-layer"><div class="preloader"></div><div class="pull-to-refresh-arrow"></div></div>';
		this.scroll = '<div class="infinite-scroll-preloader"><div class="preloader"></div></div>';
	},
	getList: function(lim,pg,ismore){
		var _this = this;
		ismore = ismore?1:0;
        $.post('//'+domain.jc+'/user/order/getOrderLists',{token:_this.token,pay_status:_this.pay_status,type:_this.type,limit:lim,page:pg}, function (re) {
            if(re.code=="0001000"){  
                var u = "";            
                for(var i = 0; i <re.data.length; i++){
                	var word,status;
                	switch(re.data[i].pay_status){
                		case "1":
                			word = "重新投保"; status = "btn-reinsure"; break;
                		case "2":
                			word = "付款"; status = "btn-order-pay"; break;
                		case "3":
                			word = "查看"; status = "btn-scan"; break;
                		case "4":
                			word = "查看"; status = "btn-scan"; break;
                		case "5":
                			word = "重新投保"; status = "btn-reinsure"; break;
                		default:
                			word = "查看"; status = "btn-scan"; break;
                	}
                	u += '<li>'
                            +'<div class="card-block order-card">'
                                +'<div class="order-card-title bod-botm">'
                                    +'<h1>'+re.data[i].content+'</h1>'
                                    +'<em class="color-FF6900">'+re.data[i].pay_msg+'</em>'
                                +'</div>'
                                +'<div class="order-card-info bod-botm" data-t="'+re.data[i].module+'" data-s="'+re.data[i].pay_status+'" data-oid="'+re.data[i].order_id+'" data-syid="'+re.data[i].synchid+'">'
                                    +'<div class="order-card-infoitem">'
                                       +'<em class="order-name">'+re.data[i].company_name+'</em>'
                                        +'<em>￥'+re.data[i].preminum+'</em>'
                                    +'</div>'
                                    +'<div class="order-card-infoitem">'
                                        +'<em>投保人：'+re.data[i].applicant+'</em>'
                                        +(re.data[i].personal_commission&&re.data[i].personal_commission!='0'?('<em class="color-FF6900">返￥'+re.data[i].personal_commission+'</em>'):'')
                                    +'</div>'
                                    +(re.data[i].module==2?'<div class="order-card-infoitem">'
                                        +'<em>被保人：'+re.data[i].recognizee+'</em>'
                                    +'</div>':'')
                                    +'<div class="order-card-infoitem">'
                                        +'<em class="color-808080">'+re.data[i].datetime+'</em>'
                                        +(re.data[i].several&&re.data[i].several!='0'?'<em class="color-808080">'+re.data[i].several+'份</em>':'')
                                    +'</div>'
                                +'</div>'
                                +'<div class="order-card-foot">'
                                    +(re.data[i].module=='1'&&(re.data[i].pay_status=='1'||re.data[i].pay_status=='2'||re.data[i].pay_status=='5')?'':'<span class="'+status+'" data-t="'+re.data[i].module+'" data-s="'+re.data[i].pay_status+'" data-oid="'+re.data[i].order_id+'" data-syid="'+re.data[i].synchid+'" data-pid="'+re.data[i].product_id+'">'+word+'</span>')
                                +'</div>'
                            +'</div>'
                        +'</li>';
                }
                if(!re.data){_this.isNomore = true}

                var nl = ismore?($(".tab.active ul li").length>0?$(".tab.active ul").html():""):"";
                $(".tab.active").html(_this.pull+'<ul>'+nl+u+'</ul>'+_this.scroll);

                _this.lastIndex = $('.tab.active ul li').length;
                if(_this.lastIndex<lim){
                    $('.tab.active .infinite-scroll-preloader').remove();
                    $('.tab.active ul').after('<div class="get-nomore">没有更多了</div>');
                }

                _this.event();
            }
        },'json');
	},
	event: function(){
		var _this = this;
		$(".tab-link").off("tap").on("tap",function(){
			if(_this.pay_status!=$(this).data("id")){
				_this.pay_status=$(this).data("id");
				_this.lastIndex = _this.itemsPerLoad;
				_this.type = "";
				_this.getList(_this.itemsPerLoad,_this.page);
			}
		});

		$(".head-tool").off("tap").on("tap",function(){
            _this.filterDom();
        });

        $(".btn-reinsure").off("tap").on("tap",function(){
        	_this.orderId = $(this).data("oid");
        	_this.productId = $(this).data("pid");
        	_this.getProInfo(1);//重新投保
        });

        $(".btn-order-pay").off("tap").on("tap",function(){
        	_this.orderId = $(this).data("oid");
        	_this.productId = $(this).data("pid");
        	_this.getProInfo(2);//去付款
        });

        $(".btn-scan").off("tap").on("tap",function(){
        	var s = $(this).data("s");
        	var oid = $(this).data("oid");
        	var syId = $(this).data("syid");
        	if($(this).data("t")==2){
        		window.location.href = "/view/myorder/info_life.html?type=1&status="+s+"&orderId="+oid+"&syId="+syId;
        	}else{
        		window.location.href = "/view/myorder/info_car.html?type=1&status="+s+"&orderId="+oid+"&syId="+syId;
        	}
        });

        $(".order-card-info").off("tap").on("tap",function(){
        	var s = $(this).data("s");
        	var oid = $(this).data("oid");
        	var syId = $(this).data("syid");
        	if($(this).data("t")==2){
        		window.location.href = "/view/myorder/info_life.html?type=1&status="+s+"&orderId="+oid+"&syId="+syId;
        	}else{
        		window.location.href = "/view/myorder/info_car.html?type=1&status="+s+"&orderId="+oid+"&syId="+syId;
        	}	
        });

        $(document).off('refresh').on('refresh', '.pull-to-refresh-content',function(e) {
            setTimeout(function() {
                _this.getList(_this.itemsPerLoad,_this.page);
                $.pullToRefreshDone('.pull-to-refresh-content');
            }, 2000);
        });
	},
	getProInfo: function(type){
		var _this = this;
        $.post('//'+domain.sx+'/insurance/client/link/getLink',{token:_this.token,product_id:_this.productId,order_id:_this.orderId}, function (re) {
        	if(re.code == "0001000"){
        		window.location.href = type==1?re.data.insure+"&type=1&userId="+_this.userId+"&eUid=0":(type==2?re.data.pay+'?type=1&pay=bank&orderId='+re.data.order:"");
        	}
        },"json");
	},
	scrollevent: function(){
        var _this = this;
 		$(document).off("pageInit").on("pageInit", "#page-fixed-tab-infinite-scroll", function(e, id, page) {

		    $(".page").off('infinite').on('infinite',function() {

		        if (_this.loading) return;
		        _this.loading = true;

		        _this.lastIndex = $('.tab.active ul li').length;

		        setTimeout(function() {
		            _this.loading = false;

		            if (_this.lastIndex >= _this.maxItems||_this.lastIndex%_this.itemsPerLoad!=0||_this.isNomore==true) {

		                $('.active .infinite-scroll-preloader').remove();
		                $(".active .get-nomore").length<1?$('.tab.active ul').after('<div class="get-nomore">没有更多了</div>'):"";
		                return;
		            }

		            // 添加新条目
		            _this.getList(_this.itemsPerLoad, _this.lastIndex/_this.itemsPerLoad+1, 1);
		              
		            $.refreshScroller();
		        }, 1000);
		    });
	    });
    },
	filterDom: function(){
		var _this = this;
		if(!_this.token){ _this.token = getToken()}
        $.post('//'+domain.jc+'/user/order/getRenderConfig',{token:_this.token}, function (re) {
        	if(re.code == "0001000"){
        		var html = "";
        		for(var i=0; i<re.data.length; i++){
        			html += '<div class="filter-single" data-id="'+re.data[i].id+'">'+re.data[i].title+'</div>'
        		}

        		var sname = $(".tab-link.active").html();
        		$("body").append('<div class="pop-filter"><div class="pop-filter-title color-FF6900">'+sname+'</div><div class="pop-filter-content2">'+html+'</div></div><div class="mask-layer" style="display:block"></div>');
        		_this.filterEvent();
        	}
        },"json");
	},
	filterEvent: function(){
		var $mask = $(".mask-layer");
		var $filter = $(".pop-filter");
		var _this = this;

		$(".filter-single").off("tap").on("tap",function(){
			_this.type = $(this).data("id");
			_this.getList(_this.itemsPerLoad,_this.page);
			$mask.remove();
			$filter.remove();
		});		
		
		$mask.off("tap").on("tap",function(){
			$mask.remove();
			$filter.remove();
		});
	}
}

//寿险订单详情
function OrderInfoLife(options){
	var _default = {
        token: 0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

OrderInfoLife.prototype = {
	init: function(){
		this.dom();
	},
	statusWord: function(){
		var s;
		switch(this.status){
			case "1":
				s = "核保失败，建议重新投保";break;
			case "2":
				s = "请尽快完成付款，以免订单失效";break;
			case "3":
				s = "该订单进入人工核保环节，请等待核保结果";break;
			case "4":
				s = "";break;
			case "5":
				s = "该订单已过期，建议重新投保";break;
			default:
				s = "";break;
		}
		return s;
	},
	dom: function(){
		var _this = this;
		this.hd = '<div class="card-block product-wrap">';
		this.ed = '</div>';
		this.del = (this.status=="3"||this.status=="4")?'':'<div class="text-center"><div class="btn-delorder">删除订单</div></div>';
		this.opBtnWd = this.status=="2"?'<div class="btn-opNext" data-status="2">付款</div>':((this.status=="1"||this.status=="5")?'<div class="btn-opNext" data-status="1">重新投保</div>':"");
		this.opBtn = (this.status=="3"||this.status=="4")?'':this.opBtnWd;
        $.post('//'+domain.sx+'/user/order/getOrderInfo', {token:_this.token,order_id:_this.orderId}, function (re) { 
            if(re.code=='0001000'){
            	_this.productId = re.data.res_order.product_id;
				_this.html = '<p class="product-tips">'+_this.statusWord()+'</p>' + _this.hd
							+_this.staticDom.call({name:"保费合计"+"<span class='total-price'>￥"+re.data.res_order.premium+(re.data.res_order.premium_return?"<em class='total-return'>返￥"+re.data.res_order.premium_return:"")+"</em></span>",val:"",className:""})
							+_this.ed
							+ _this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_18)
							+_this.staticDom.call({name:"订单号",val:re.data.res_order.order_num,className:""})
							+_this.staticDom.call({name:"订单状态",val:re.data.res_order.pay_msg,className:""})
							+(_this.status=="1"&&re.data.res_order.remark?_this.staticDom.call({name:"失败原因",val:re.data.res_order.remark,className:""}):"")
							+_this.staticDom.call({name:"产品名称",val:'<a href="#" class="link-pro" external>'+re.data.res_order.product_name+'</a>',className:""})
							+(_this.status=="4"?_this.staticDom.call({name:"保单号",val:re.data.res_order.insuranceApplicantNo,className:""}):"")
							+_this.staticDom.call({name:"保险公司",val:re.data.res_order.companyname,className:""})
							+(re.data.res_order.insured_year?_this.staticDom.call({name:"保险年限",val:re.data.res_order.insured_year,className:""}):"")
							+_this.staticDom.call({name:"生效日期",val:getLocalTime(re.data.res_order.insurance_dt),className:""})
							+_this.ed
							+_this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_19)
							+_this.staticDom.call({name:"姓名",val:re.data.res_beibaoren.insured_name,className:""})
							+_this.staticDom.call({name:"证件类型",val:re.data.res_beibaoren.insured_card_name,className:""})
							+_this.staticDom.call({name:"证件号码",val:re.data.res_beibaoren.insured_card_id,className:""})
							+_this.ed
							+_this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_20)
							+_this.staticDom.call({name:"姓名",val:re.data.res_toubaoren.ph_name,className:""})
							+_this.staticDom.call({name:"证件类型",val:re.data.res_toubaoren.ph_card_name,className:""})
							+_this.staticDom.call({name:"证件号码",val:re.data.res_toubaoren.ph_card_id,className:""})
							+_this.staticDom.call({name:"手机号码",val:re.data.res_toubaoren.telephone,className:""})
							+(re.data.res_toubaoren.email?_this.staticDom.call({name:"电子邮箱",val:re.data.res_toubaoren.email,className:""}):"")
							+_this.ed
							+_this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_21)
							+_this.staticDom.call({name:re.data.res_benfit?re.data.res_benfit:"法定受益人",val:"",className:""})
							+_this.ed
							+'<div class="text-right"><a href="#" class="more-info" external>查看更多信息</a></div>'
							+_this.del;
				$(".content").html(_this.html);
				$("body").append(_this.opBtn);
				_this.event();
            }
        },'json');
	},
	event: function(){
		var _this = this;
		_this.getProInfo();

		$(".btn-delorder").off("tap").on("tap",function(){
			popUp({
				btnLeft:"btn-grey js-close",
                btnRight:"btn-orange js-sure",
                leftWord:"返回",
                rightWord:"确定",
                msgText:"您确定要删除这条订单吗？",
                msgAlign:"text-center"
			})
			setTimeout(function(){
				$(".js-sure").off("tap").on("tap",function(){
					_this.delOrder();
				});
			},0)
		});

		$(".btn-opNext").off("tap").on("tap",function(){
			_this.getProInfo($(this).data("status"));
		});
	},
	delOrder: function(){
		var _this = this;
        $.post('//'+domain.jc+'/user/order/delete',{token:_this.token,synchid:_this.syId}, function (re) {
        	if(re.code == "0001000"){
        		popAlert("删除成功");
        		setTimeout(function(){
        			if(_this.share){
                        window.history.go(-1) 
                    }else{
                        window.location.href = 'bmy://app.page/backRefreshPage?synchId='+_this.syId;
                    }
        		},1500);
        	}
        },"json");
	},
	getProInfo: function(type){
		var _this = this;
        $.post('//'+domain.sx+'/insurance/client/link/getLink',{token:_this.token,product_id:_this.productId,order_id:_this.orderId}, function (re) {
        	if(re.code == "0001000"){
        		if(type){
                    var type1,type2;
                    if(_this.share){
                        type1 = re.data.insure+"&type=1&userId="+_this.userId+"&eUid=0";
                        type2 = re.data.pay+'?type=1&pay=bank&orderId='+re.data.order;
                    }else{
                        type1 = "bmy://app.page/life/nextpage?url="+re.data.insure+"&isH5navBar=0";
                        type2 = "bmy://app.page/life/nextpage?parameterList=orderId="+re.data.order+"||pay=bank&url="+re.data.pay+'&isH5navBar=1';
                    }
					window.location.href = type==1?type1:(type==2?type2:"")
        		}else{
                    var insure,confirm;
                    if(_this.share){
                        insure = re.data.insure+"&type=1&userId="+_this.userId+"&eUid=0";
                        confirm = re.data.confirm+"&type=1&userId="+_this.userId+"&orderId="+re.data.order+"&entryID=1"; 
                    }else{
                        insure = "bmy://app.page/life/nextpage?url="+re.data.insure+"&isH5navBar=0";
                        confirm = "bmy://app.page/life/nextpage?parameterList=orderId="+re.data.order+"||entryID=1&url="+re.data.confirm+"&isH5navBar=1"; 
                    }

                    $(".link-pro").attr("href",insure);
                    $(".more-info").attr("href",confirm); 
        			
        		}
        	}
        },"json");
	},
	staticDom: function(){
        return '<div class="flex-wrap '+this.className+'">\
                    <div class="item-title">'+this.name+'</div>\
                    <div class="item-input">\
                        <span>'+this.val+'</span>\
                    </div>\
                </div>'
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    }
}


//车险订单详情
function OrderInfoCar(options){
	var _default = {
        token: 0,
        userType:0,
        share:false
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
}

OrderInfoCar.prototype = {
	init: function(){
		this.dom();
	},
	statusWord: function(){
		var s;
		switch(this.status){
			case "1":
				s = "核保失败，建议重新投保";break;
			case "2":
				s = "请尽快完成付款，以免订单失效";break;
			case "3":
				s = "该订单进入人工核保环节，请等待核保结果";break;
			case "4":
				s = "";break;
			case "5":
				s = "该订单已过期，建议重新投保";break;
			default:
				s = "";break;
		}
		return s;
	},
	dom: function(){
		var _this = this;
		this.hd = '<div class="card-block product-wrap">';
		this.ed = '</div>';
        this.del = (this.status=="3"||this.status=="4"||this.status=="6")?'':'<div class="text-center"><div class="btn-delorder">删除订单</div></div>';
		this.opBtnWd = this.status=="2"?'<div class="btn-opNext" data-status="2">付款</div>':((this.status=="1"||this.status=="5")?'<div class="btn-opNext" data-status="1">重新投保</div>':"");
		this.opBtn = (this.status=="3"||this.status=="4")?'':this.opBtnWd;
        $.post('//'+domain.cx+'/user/order/user_orderinfo', {token:_this.token,order_id:_this.orderId}, function (re) { 
            if(re.code=='0001000'){
                _this.productId = re.data.res_order.product_id;
                var bdh = "";
                for(var i=0; i<re.data.policy_no.length; i++){
                    bdh += _this.staticDom.call({name:re.data.policy_no[i].name,val:re.data.policy_no[i].no,className:""})
                }
				_this.html = '<p class="product-tips">'+_this.statusWord()+'</p>' + _this.hd
							+_this.staticDom.call({name:"保费合计"+"<span class='total-price'>￥"+re.data.res_order.premium+(re.data.res_order.premium_return?"<em class='total-return'>返￥"+re.data.res_order.premium_return:"")+"</em></span>",val:"<em class='more-info2'>详情 ></em>",className:""})
							+_this.ed
							+ _this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_15)
							+_this.staticDom.call({name:"订单号",val:re.data.res_order.order_num,className:""})
							+_this.staticDom.call({name:"订单状态",val:re.data.res_order.pay_msg,className:""})
                            +bdh
							+_this.staticDom.call({name:"投保公司",val:re.data.res_order.companyname,className:""})

							+_this.staticDom.call({name:"投保车辆",val:re.data.res_order.car_number,className:""})
							+_this.staticDom.call({name:"投保城市",val:re.data.res_order.city_name,className:""})
							+_this.staticDom.call({name:"保险起期",val:(re.data.res_order.cinsurance_dt?"商业险"+re.data.res_order.cinsurance_dt:"")+(re.data.res_order.qinsurance_dt?"<span class='"+(re.data.res_order.cinsurance_dt?"min-height":"")+"'>交强险"+re.data.res_order.qinsurance_dt+"</span>":""),className:""})
							+_this.ed
							+_this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_16)
							+_this.staticDom.call({name:"姓名",val:re.data.res_car.owner_name,className:""})
							+_this.staticDom.call({name:"手机号码",val:re.data.res_car.owner_phone,className:""})
							+_this.staticDom.call({name:"身份证",val:re.data.res_car.post_card,className:""})
							+_this.ed
							+_this.hd
							+_this.tbrTitle("",BW.FormInfo.tip_17)
							+_this.staticDom.call({name:"收单人",val:re.data.res_shop.receiver_name,className:""})
							+_this.staticDom.call({name:"手机号码",val:re.data.res_shop.receiver_tel,className:""})
							+_this.staticDom.call({name:"收单地址",val:re.data.res_shop.province+re.data.res_shop.city+re.data.res_shop.area+re.data.res_shop.adressdetails,className:""})
							+_this.ed
                            +_this.del;
				$(".content").html(_this.html);
				if(!_this.share){$("body").append(_this.opBtn)};

				_this.listInfo = '<ul class="info-list">';
				for (var i = 0; i < re.data.res_insure.length; i++) {
        			_this.listInfo += '<li><h2 class="bod-botm">'+(re.data.res_insure[i].insurance_catid=="3"?"强制险":"商业险")+'</h2><ul class="bod-botm">';
        			for (var j = 0; j < re.data.res_insure[i].insurance.length; j++) {
        				_this.listInfo += '<li><span>'+re.data.res_insure[i].insurance[j].insurance_name+'</span><span>'+(re.data.res_insure[i].insurance[j].insucrance_content&&!isNaN(re.data.res_insure[i].insurance[j].insucrance_content)?re.data.res_insure[i].insurance[j].insucrance_content/10000+'万':re.data.res_insure[i].insurance[j].insucrance_content)+'</span><span>￥'+re.data.res_insure[i].insurance[j].insurance_fee+'</span></li>'
        			}
        			_this.listInfo += '</ul><em class="info-cal">合计：￥'+re.data.res_insure[i].premium_cat+'</em><em class="info-cal bod-botm">'+(re.data.res_insure[i].premium_catreturn?'返：￥'+re.data.res_insure[i].premium_catreturn:'')+'</em></li>'
        		}
        		_this.listInfo += '<li><h2 class="bod-botm">投保城市<span>'+re.data.res_order.city_name+'</span></h2><em class="info-cal">总计：￥'+re.data.res_order.premium+'</em></li></ul>'
				_this.event();
            }
        },'json');
	},
	event: function(){
		var _this = this;
		$(".btn-delorder").off("tap").on("tap",function(){
			popUp({
				btnLeft:"btn-grey js-close",
                btnRight:"btn-orange js-sure",
                leftWord:"返回",
                rightWord:"确定",
                msgText:"您确定要删除这条订单吗？",
                msgAlign:"text-center"
			})
			setTimeout(function(){
				$(".js-sure").off("tap").on("tap",function(){
					_this.delOrder();
				});
			},0)
		});

		$(".more-info2").off("tap").on("tap",function(){
			_this.popInfo();
		});

		$(".btn-opNext").off("tap").on("tap",function(){
			_this.getProInfo($(this).data("status"));
		});
	},
	popInfo: function(){
		var content = '<h1 class="pop-infotitle bod-botm">投保方案</h1>'+this.listInfo;
		var container = $('<div class="pop-block" id="pop-info">'+content+'<div class="pop-close-icon"><i class="iconfont icon-close"></i></div></div>');
		var mask = $('<div class="mask-layer"></div>');
        mask.css("display","block");
        if($(".pop-block").length<=0){
            $("body").append(container,mask);
        }
        $(".pop-close-icon").on("tap",function(){
            $(".mask-layer").remove();
            $(".pop-block").remove();
        })
	},
	delOrder: function(){
		var _this = this;
        $.post('//'+domain.jc+'/user/order/delete',{token:_this.token,synchid:_this.syId}, function (re) {
        	if(re.code == "0001000"){
        		popAlert("删除成功");
        		setTimeout(function(){
        			if(_this.share){
                       window.history.go(-1) 
                    }else{
                        window.location.href = 'bmy://app.page/backRefreshPage?synchId='+_this.syId;
                    }
        		},1500);
        	}
        },"json");
	},
	getProInfo: function(type){
		var _this = this;
        $.post('//'+domain.sx+'/insurance/client/link/getLink',{token:_this.token,product_id:_this.productId,order_id:_this.orderId}, function (re) {
        	if(re.code == "0001000"){
                var type1 = 'bmy://app.page/jumpToApp?type=insuredAgain'
                    ,type2 = 'bmy://app.page/jumpToApp?type=pay';

                window.location.href = type==1?type1:(type==2?type2:"")

        	}
        },"json");
	},
	staticDom: function(){
        return '<div class="flex-wrap '+this.className+'">\
                    <div class="item-title">'+this.name+'</div>\
                    <div class="item-input">\
                        <span>'+this.val+'</span>\
                    </div>\
                </div>'
    },
    tbrTitle: function(i,t){
        i = (i=='')?t:('<i class="iconfont '+i+'"></i>'+t)
        return '<h1 class="insure-title bod-botm">'+i+'</h1>';
    }
}


//车险比价
function CarCompare(options){
    var _default = {
        token: 0
    }
    var setting = $.extend({}, _default, options);
    for (var name in setting){
        this[name] = setting[name];
    }
    this.init();
}

CarCompare.prototype= {
	init: function(){
		var _this = this;
		this.list();
		$(".btn-baojia").on("tap",function(){
			$.showIndicator();
            _this.gologin();
			setTimeout(function(){
                _this.baojia();
            },0)
		})
	},
	list: function(){
		var _this = this;
		if(!_this.token){ _this.token = getToken()}
        $.post('//'+domain.cx+'/company/listzhixiao',{token:_this.token}, function (re) {
        	if(re.code == "0001000"){
        		re.data.usernum_bj?$("#people span").html(re.data.usernum_bj):"";
        		var list = "";
        		for (var i = 0; i < re.data.companies.length; i++) {
        			if(re.data.companies[i].type=="zhonghua"){continue;}
        			list += '<li'+(i%2==0?' class=""':'')+'><a href="javascript:;" class="link-page" data-type="'+re.data.companies[i].type+'"><img src="'+re.data.companies[i].log_url+'" class="brand-logo"><div class="brand-name left-bod">'+re.data.companies[i].keywords+'<br><em>'+re.data.companies[i].rebate+'</em></div></a></li>'
        		}
        		$(".brand-list").html(list);
        		$(".link-page").off("tap").on("tap",function(){
        			$.showIndicator();
                    _this.gologin();
        			setTimeout(function(){
                        _this.dadi();
                    },0)
        		});
        	}
        },"json");
	},
	baojia: function(){
		var _this = this;
        $.post('//'+domain.cx+'/online/Zhitong/get_zhitongurl',{token:_this.userInfo[0]}, function (re) {
        	if(re.code == "0001000"){
        		window.location.href = re.data
        	}
        },"json");
	},
	dadi: function(){
		var _this = this;
		$.post('//'+domain.cx+'/online/dadi/get_dadiurl',{token:_this.userInfo[0]}, function (re) {
        	if(re.code == "0001000"){
        		window.location.href = re.data;
        	}
        },"json");
	},
    gologin: function(){
        var _this = this;
        this.userInfo = localStorage.getItem("userInfo")?localStorage.getItem("userInfo"):0;
        if(!this.userInfo){
            localStorage.setItem("lastUrl", window.location.href);
            window.location.href = "/view/user/login.html";
        }else{
            _this.userInfo = _this.userInfo.split(",");
            $.post('//'+domain.jc+'/user/get_token/check_token',{token:_this.userInfo[0]}, function (re) {
                if(re.code == '0001000'){
                    _this.token = _this.userInfo[0];
                    _this.userId = _this.userInfo[1]
                }else{
                    localStorage.setItem("lastUrl", window.location.href);
                    window.location.href = "/view/user/login.html";
                }
            },'json');
        }
    }
}

$(function(){
    setTimeout(function(){$.init()},500)
})