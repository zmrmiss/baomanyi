/**
 * Created by Administrator on 2016/12/29 0029.
 */
$(function(){
    d = SOHUZ.page;player = new kzPlayer($('#phone-main')[0], {

        "background":{
            "background-color":""},
        "scenes":[
            //第一屏
            {
                "title":"view1",
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"200","height":"126","left":"60","top":"13","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[],
                    "image":"mindex_files/z-01.png",
                    "link":"",
                    "_style":{"transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},	{
                    "type":"image",
                    "style":{
                        "width":"280","height":"238","left":"20","top":"240","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false
                        },"type":"lightSpeedIn"
                    }],
                    "image":"mindex_files/p1.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"text","style":{
                        "left":"44","top":"147","width":"232","height":"41","background-color":"rgba(255,255,255,0)","border-radius":"2","border-color":"rgba(255,255,255,1.00)","border-width":"2px","border-style":"none","opacity":1,"transform":"rotate(0deg)","text-shadow":"0px 0px 0px rgba(1,1,1,0.40)","box-shadow":"0px 0px 0px 0px rgba(1,1,1,0.20)","padding-top":"5","padding-left":"5","padding-right":"5","padding-bottom":"5","z-index":1
                    },
                    "_style":{
                        "transform-rotate":"0","border-width":"2","text-shadow-color":"rgba(1,1,1,0.40)","text-shadow-width":"0","text-shadow-blur":"0","text-shadow-degree":"135","box-shadow-color":"rgba(1,1,1,0.20)","box-shadow-width":"0","box-shadow-blur":"0","box-shadow-size":"0","box-shadow-degree":"135"
                    },
                    "anima":[{
                        "args":{
                            "delay":500,"duration":1000,"infinite":false
                        },
                        "type":"fadeIn"}],
                    "font-size":"22","line-height":"1.4","content":"<div style=\"text-align: center;\"><a target='_blank' href='http://a.app.qq.com/o/simple.jsp?pkgname=com.moming.baomanyi' style=\"font-size: 18px;\"><img src='mindex_files/z-02.png' style='width:100%;'/></a></div>"
                },{
                    "type":"text",
                    "style":{
                        "left":"44","top":"192","width":"232","height":"41","background-color":"rgba(255,255,255,0)","border-radius":"2","border-color":"rgba(255,255,255,1.00)","border-width":"2px","border-style":"none","opacity":1,"transform":"rotate(0deg)","text-shadow":"0px 0px 0px rgba(1,1,1,0.40)","box-shadow":"0px 0px 0px 0px rgba(1,1,1,0.20)","padding-top":"5","padding-left":"5","padding-right":"5","padding-bottom":"5","z-index":1
                    },
                    "_style":{
                        "transform-rotate":"0","border-width":"2","text-shadow-color":"rgba(1,1,1,0.40)","text-shadow-width":"0","text-shadow-blur":"0","text-shadow-degree":"135","box-shadow-color":"rgba(1,1,1,0.20)","box-shadow-width":"0","box-shadow-blur":"0","box-shadow-size":"0","box-shadow-degree":"135"
                    },
                    "anima":[{
                        "args":{
                            "delay":700,"duration":1000,"infinite":false},"type":"fadeIn"
                    }],
                    "font-size":"14","line-height":"1.2","content":"<div style=\"text-align: center;\"><a target='_blank' href='http://a.app.qq.com/o/simple.jsp?pkgname=com.moming.baomanyi' id=\"addapk\"  style=\"font-size: 18px;\"><img src='mindex_files/z-03.png' style='width:100%;'/></a></div>"
                }],
                "_id":"d636dfac-5ed6-817d-ebcd-83b556a57d22"},
            //第一屏

            //第2-7屏
            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"262","height":"54","left":"29","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":2000,"duration":600,"infinite":false
                        },
                        "type":"pulse"
                    }],
                    "image":"mindex_files/y-01.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"-10","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"280","height":"360","left":"20","top":"109","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                        ,"bottom":"0"	},
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"bounceInLeft"
                    }],
                    "image":"mindex_files/p2.png",
                    "link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"2872af69-203e-fee6-73b2-a89c3adca0eb","title":"view2"
            },

            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"262","height":"54","left":"29","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":2000,"duration":600,"infinite":false
                        },
                        "type":"pulse"
                    }],
                    "image":"mindex_files/y-02.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"-10","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"280","height":"360","left":"20","top":"111","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"bounceInRight"
                    }],
                    "image":"mindex_files/p3s.png",
                    "link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"2872af69-203e-fee6-73b2-a89c3adca1eb","title":"view2"
            },

            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"306","height":"54","left":"7","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":2000,"duration":600,"infinite":false
                        },
                        "type":"pulse"
                    }],
                    "image":"mindex_files/y-03.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"-10","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"247","height":"318.5","left":"36","top":"140","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"pulse"
                    }],
                    "image":"mindex_files/p4.png",
                    "link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"2872af69-203e-fee6-73b2-a89c3adca2eb","title":"view2"
            },

            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"307","height":"54","left":"7","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":2000,"duration":600,"infinite":false
                        },
                        "type":"pulse"
                    }],
                    "image":"mindex_files/y-04.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"-10","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"247","height":"318.5","left":"36","top":"140","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"bounceInLeft"
                    }],
                    "image":"mindex_files/p5.png",
                    "link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"2872af69-203e-fee6-73b2-a89c3adca3eb","title":"view2"
            },

            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"320","height":"54","left":"0","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":2000,"duration":600,"infinite":false
                        },
                        "type":"pulse"
                    }],
                    "image":"mindex_files/p6_2.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"-10","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"280","height":"360","left":"20","top":"109","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                        ,"bottom":"0"	},
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"bounceInLeft"
                    }],
                    "image":"mindex_files/p6_1.png",
                    "link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"2872af69-203e-fee6-73b2-a89c3adca0eb","title":"view2"
            },

            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"314","height":"54","left":"3","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":2000,"duration":600,"infinite":false
                        },
                        "type":"pulse"
                    }],
                    "image":"mindex_files/y-05.png",
                    "link":"","_style":{
                        "transform-rotate":"0","border-width":"-10","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"256","height":"306","left":"27","top":"140","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"lightSpeedIn"
                    }],
                    "image":"mindex_files/p6.png",
                    "link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"2872af69-203e-fee6-73b2-a89c3adca5eb","title":"view2"
            },
            //第2-6屏

            //第七屏（合作）
            {
                "background":{
                    "background-color":"#f2f2f2"
                },
                "items":[{
                    "type":"image","style":{
                        "width":"264","height":"54","left":"28","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":1000,"duration":600,"infinite":false
                        },"type":"pulse"
                    }],
                    "image":"mindex_files/x-01.png","link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"280","height":"289.6","left":"20","top":"140","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":0,"duration":1000,"infinite":false},"type":"zoomIn"
                    }],
                    "image":"mindex_files/p7.png","link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"591ffb76-6938-cb3e-6596-e25e14567f3b","title":"view3"
            },
            //第七屏（合作）

            //第八屏（关于我们）
            {
                "background":{
                    "background-color":"#f2f2f2","background-image":""
                },
                "items":[{
                    "type":"image",
                    "style":{
                        "width":"86","height":"20","left":"117","top":"45","z-index":0,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":1000,"duration":600,"infinite":false
                        },"type":"pulse"
                    }],
                    "image":"mindex_files/x-02.png","link":"","_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"299","height":"126","left":"10","top":"128","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":100,"duration":1000,"infinite":false
                        },
                        "type":"zoomIn"
                    }],
                    "image":"mindex_files/x-03.png","link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"51","height":"51","left":"135","top":"345","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":100,"duration":1000,"infinite":false
                        },
                        "type":"zoomIn"
                    }],
                    "image":"mindex_files/2code.png","link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }},{
                    "type":"image",
                    "style":{
                        "width":"156","height":"30","left":"82","top":"400","z-index":1,"background-color":"transparent","opacity":1,"transform":"rotate(0deg)","border-style":"none","border-color":"transparent","border-width":"0px","border-radius":"0","box-shadow":"0px 0px 0px 0px ","padding-top":"0","padding-left":"0","padding-right":"0","padding-bottom":"0"
                    },
                    "anima":[{
                        "args":{
                            "delay":100,"duration":100,"infinite":false
                        },
                        "type":"zoomIn"
                    }],
                    "image":"mindex_files/x-04.png","link":"",
                    "_style":{
                        "transform-rotate":"0","border-width":"0","box-shadow-color":"","box-shadow-width":"","box-shadow-blur":"","box-shadow-size":"","box-shadow-degree":"0"
                    }}],
                "_id":"645f34f1-c12b-d10a-c370-d3a271603179","title":"view5"}]});
    window.addEventListener("message", function (event) {
        if (event.origin !== document.origin){
            return;
        }
        if (event.data === 'prev') {
            player.kzPage.prev();
        } else if (event.data === 'next') {
            player.kzPage.next();
        }
    }, false);
});