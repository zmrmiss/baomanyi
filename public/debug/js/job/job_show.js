;+ function($) {
	var raw = $.jobData;

    var chooseHTML = function (col,code) {
    	var columnItemsHTML = '';
        var chooseHTML = '';

        for (var k = 0; k < col.sub.length; k++) {
        	var val = col.sub[k];
            columnItemsHTML += '<li data-tid="'+val.code+'"><span class="final-job"><i class="iconfont icon-unselected-single"></i>'+val.name+'</span><span>'+val.type+'类</span></li>';
        }

        chooseHTML += '<ul class="job-thd" data-sid="'+code+'">' + columnItemsHTML + '</ul>';

        return chooseHTML;
    };

    var columnHTML = function (col,code) {
        var columnItemsHTML = '';
        var columnHTML = '';

        for (var j = 0; j < col.sub.length; j++) {
        	var val = col.sub[j];
        	columnItemsHTML += '<div class="job-sed" data-id="'+code+'">\
					            <div class="flex-wrap bod-botm" data-sid="'+code+val.code+'">\
					                <div class="item-title">'+val.name+'</div>\
					                <div class="item-content"><i class="iconfont icon-arrow-down"></i></div>\
					            </div>' + chooseHTML(val,code+val.code) + '</div>'
        }

        return columnItemsHTML;
    };
    
    var layout = function () {
        var i;
        var colsHTML = '';
        for (i = 0; i < raw.length; i++) {
            var col = raw[i];
            colsHTML += '<div class="card-block product-wrap"><div class="flex-wrap job-fst" data-id="'+col.code+'">\
				            <div class="item-title">'+col.name+'</div>\
				            <div class="item-content"><i class="iconfont icon-arrow-down"></i></div>\
				        </div>' + columnHTML(col,col.code) + '</div>';
        }
        colsHTML = '<div class="page page-current" id="router-job"><header class="bar bar-nav head-bar"><i class="iconfont icon-arrow-left"></i>职业表</header><div class="job-block content">'+colsHTML+'</div></div>'

        $(".page-group").append(colsHTML);

        $(".job-block").animate({
            top:'4.4rem'
        },300)
    };

    $.fn.jobChoose = function(params) {
        return this.each(function() {
            layout();
        });
    };

}(Zepto);