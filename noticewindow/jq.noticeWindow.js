/**
 * jq.noticeWindow.js
 * @copy 2012 AppMobi
 * Facebook style notification/modal window
   ```
   $("#container").noticeWindow({
       title:'Notifications', //string
       content:__html__, //string of thml
       arrowLeft:'60px' //left,middle,right or pixels from the left
   });
   ```
   * @title $().noticeWindow({})
   */
   
(function($){
    var create=true;
    var noticeObj;
    $.fn.noticeWindow=function(opts){
        if(this.length==0) return noticeObj;
        if(create)
            noticeObj=new noticeWindow(this[0],opts,create);
        else{
           //noticeObj.destroy();
           noticeObj.update(opts);
        }
        create=false;
        return this;
    }
    
    var noticeWindow=function(element,opts,create){
    
        this.container=$(element);
        for(var j in opts){
            this[j]=opts[j];
        }
        switch(this['arrowLeft']){
            case "left":this.arrowLeft='5px';
            break;
            case "middle":this.arrowLeft="120px";
            break;
            case "right":this.arrowLeft="230px";
            break;
        }
        if(parseInt(this.arrowLeft)<=0||isNaN(parseInt(this.arrowLeft)))
            this.arrowLeft='5px';
        
        if(create)
            this.show();
        else
            this.update();
    }
    
    noticeWindow.prototype={
        container:'',
        containerCss:'',
        title:'',
        content:'',
        arrowLeft:"5px",
        mask:null,
        arrowDirection:"up",
        _contentDiv:null,
        _scroller:null,
        show:function(){
            this.container.append('<div id="noticeWindow" class="noticeWindow" style="'+this.containerCss+'"><div class="noticeArrow '+this.arrowDirection+'" style="left:'+this.arrowLeft+'"></div><div class="noticeTitle">'+this.title+'</div><div class="noticeContent" id="noticeContent">'+this.content+'</div></div>');
            this.mask=$('<div id="noticeMask" style="width:100%;height:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px;background:transparent;z-index:9998"/>');
            if(this.mask.__proto__["scroller"])
            {
                //Setup a scroller
                 this._scroller=this.container.find("#noticeContent").scroller({
                    scrollBars: true,
                    verticalScroll: true,
                    horizontalScroll: false,
                    vScrollCSS: "jqmScrollbar",
                    refresh: false
                });
                this._contentDiv=this.container.find("#noticeContent").children().get(0);
            }
            else
                this._contentDiv=this.container.find("#noticeContent");
            var that=this;
            this.container.append(this.mask);
            this.mask.bind("click",function(){
                that.destroy();
            });
        },
        update:function(opts){
            this.title=opts['title']||"";
            this.content=opts["content"]||"";
            this.arrowLeft=opts["arrowLeft"]||"";
            this.arrowDirection=opts["arrowDirection"]=="down"?"down":"up";
            this.containerCss=opts["containerCss"]||"";
            switch(this['arrowLeft']){
                case "left":this.arrowLeft='5px';
                break;
                case "middle":this.arrowLeft="120px";
                break;
                case "right":this.arrowLeft="230px";
                break;
            }
            this.container.find(".noticeTitle").html(this.title);
            this.updateContent(this.content);
            this.container.get().style.cssText=this.containerCss;
            this.container.find(".noticeArrow").css("left",this.arrowLeft).get(0).className="noticeArrow "+this.arrowDirection;
        },
        updateContent:function(html){
            this._contentDiv.html(html);
        },
        destroy:function(){
            if(this._scroller)
                this._scroller.removeEvents();
            create=true;
            this.container.find("#noticeWindow").remove();
            this.mask.remove();
        }
    };

})(jq);

