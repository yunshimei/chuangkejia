/**
* Created by Administrator on 2015/11/29.
*/
//页面加载完成之后初始化;
$(function(){
    $(".navIcon").bind("click",function(){
        if(parseInt($(".m_nav").attr("data-state")) == 0){
            $(".m_nav").addClass("navanimate");
            $(".m_nav").attr("data-state","1");
        }else{
            $(".m_nav").removeClass("navanimate");
            $(".m_nav").attr("data-state","0");
        }
    });
    //document.addEventListener("touchstart",function(e){
    //    $(".m_nav").removeClass("navanimate");
    //})
    $(".styleNav li").hover(
        function(){
            $(".styleNav li").css("background-color","rgba(255, 95, 37, 0)");
            $(".styleNav li a").css("color","rgb(159, 159, 159)")
            $(this).css("background-color","rgba(255, 95, 37, 1)");
            $(this).find("a").css("color","#fff");
        },
        function(){
            $(".styleNav li").removeAttr("style");
            $(".styleNav li a").removeAttr("style");
        }
    )
})

//创空间文字;
function textHover(){
    $(".jqhdListBox li").hover(
        function(){
            $(this).find(".jqhdList").addClass("active");
        },
        function(){
            $(this).find(".jqhdList").removeClass("active");
        }
    )
}



//banner插件;
var Banner = function(box,state){ //调用banner功能。参数：banner框，是否有左右控制，是否有下面状态（小点）;
    this.box=$(box);
    this.state=state;
    this.init=function(){
        this.addEv();
    }
    this.addEv=function(){
        var p = this.box;
        var l = this.state?this.box.find(".ctrl").children("span").length:0;
        var i = 0;
        var w = this.box.find("ul").outerWidth();
        var ev = true;
        this.box.find(".prev").bind("click",function(){
            if(!ev){
                return;
            }
            ev=false;
            p.find("li").last().insertBefore(p.find("li").first());
            p.find("ul").css("margin-left",-w+"px");
            if(l>0){
                if(i>0){
                    i--;
                }else{
                    i=l-1;
                }
                p.find(".ctrl").children("span").removeClass("active");
                p.find(".ctrl").children("span").eq(i).addClass("active");
            }
            p.find("ul").animate({
                'margin-left':'0px'
            },1000,function(){
                ev=true;
            });
        });
        this.box.find(".next").bind("click",function(){
            if(!ev){
                return;
            }
            ev=false;
            if(l>0){
                if(i<l-1){
                    i++;
                }else{
                    i=0;
                }
                p.find(".ctrl").children("span").removeClass("active");
                p.find(".ctrl").children("span").eq(i).addClass("active");
            }
            p.find("ul").animate({
                'margin-left':-w+'px'
            },1000,function(){
                p.find("li").first().insertAfter(p.find("li").last());
                p.find("ul").css("margin-left","0px");
                ev=true;
            });
        });
    }
}
var SwitchBigPic=function(box){
    this.box=$(box);
    this.ulBoxWidth = this.box.find("ul").parent().outerWidth();
    this.ul = this.box.find("ul");
    this.w = this.box.find("ul").find("li").first().outerWidth();
    this.l = this.box.find("ul").find("li").length*this.w;
    this.left = 0;
    this.init=function(){
        this.addEv();
    }
    this.addEv=function(){
        var ulBoxWidth = this.ulBoxWidth;
        var ul = this.ul;
        var w = this.w;
        var l = this.l;
        var left = this.left;
        this.box.find(".prev").bind("click",function(){
            if(left<0){
                left+=w;
            }
            ul.css("margin-left",left+"px");
        });
        this.box.find(".next").bind("click",function(){
            if(left>ulBoxWidth-l){
                left-=w;
            }
            ul.css("margin-left",left+"px");
        });
    }
};
//房屋详情页图片切换;
function showPic(obj,BigPicNode,cla){ //obj当前点击的node（节点）对象;BigPicNode为大图的node（节点）对象;cla为1表示房屋主图;为2表示详情里面的图;
    var imgUrl = $(obj).find("img").attr("src");
    console.log(imgUrl);
    if(cla==1){
        $("#"+BigPicNode).css({
            "background":"url("+imgUrl+") no-repeat",
            "background-size":"100% auto",
            "background-position":"center"
        });
    }else{
        $("#"+BigPicNode).attr("src",imgUrl);
    }
    $(obj).siblings().removeClass("active");
    $(obj).addClass("active");
}