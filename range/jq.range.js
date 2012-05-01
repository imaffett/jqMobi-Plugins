/*
 * @author Ian Maffett
 * @copywrite AppMobi 2012
 * @desc - Range slider for jqMobi apps
 */


/**
 * 
   jq.range.js replicates the HTML5 range input for mobile apps.  
   This is based on https://github.com/ubilabs/mobile-range-slider
   but adapted for jqMobi and webkit only.
   ```
    $("#slider1").range({min:1,max:20,val:10,stepFunc(val){}});
   ```
   *@param {Object} [options]
   *@title $().range([options]);
   */
(function ($) {

    var rangeCache=[];
    /**
     * This creates a range object or retrieves it from the cache
     */
    $.fn.range = function (opts) {
        if (this.length == 0) return;
        if(opts===undefined)
            return rangeCache[this[0].jqid];
        for (var i = 0; i < this.length; i++) {
            //Assign a jqid for the cache in case they don't have an id on the elements
            if(!this[i].jqid)
                this[i].jqid=$.uuid();
            rangeCache[this[i].jqid]=new range(this[i], opts);
        }
    };
    
    var range = function (elem, opts) {
        var that=this;
        this.elem=elem;
        this.pointer=$("<div class='"+this.pointerClass+"'></div>").get(); //round pointer we drag
        this.range=$("<div class='"+this.rangeClass+"'></div>").get(); //range that we drag on
        this.rangeFill=$("<div class='"+this.rangeFillClass+"'></div>").get(); //range fill to the left
        this.bubble=$("<div class='"+this.bubbleClass+"'></div>").get(); //bubble above showing the value
        this.pointer.style.webkitTransitionDuration="0ms"
        this.elem.appendChild(this.pointer);
        this.elem.appendChild(this.range);
        this.elem.appendChild(this.rangeFill);
        this.elem.appendChild(this.bubble);
        if(this.elem.style.position==="static")
            this.elem.style.position="relative";
                
        for(var j in opts){
            this[j]=opts[j];
        }
        
        if(opts['value'])
            this.val(opts['value']);
            
        this.elem.addEventListener("touchstart",this);
    }
    
    range.prototype={
        min:1,
        max:100,
        value:0,
        rangeClass:"range",
        pointerClass:"pointer",
        sliderClass:"slider",
        rangeFillClass:"rangefill",
        bubbleClass:"rangeBubble",
        stepFunc:function(){},
        handleEvent:function(evt){
            switch(evt.type){
                case "touchstart":this.onTouchStart(evt);
                break;
                case "touchmove":this.onTouchMove(evt);
                break;
                case "touchend":this.onTouchEnd(evt);
                break;
            }
        },
        onTouchStart:function(event){
            var that=this;
            this.elem.addEventListener("touchmove",this);
            this.elem.addEventListener("touchend",this);
        
        },
        onTouchMove:function(event){
            event.preventDefault();
           
          
            var position = event.touches[0].pageX, 
              element,
              pointerW = this.pointer.offsetWidth,
              rangeW = this.range.offsetWidth,
              width = rangeW - pointerW,
              range = this.max - this.min,
              value;
              
            position-=$(this.elem).offset().left;

            position += pointerW / 2;
            position = Math.min(position, rangeW);
            position = Math.max(position - pointerW, 0);
            this.bubble.style.webkitTransform=this.pointer.style.webkitTransform="translate3d("+position+"px,0,0)";
          
            // update
            value = this.min + Math.round(position * range / width);
            this.val(value,position);
        },
        onTouchEnd:function(event){
        
            this.elem.removeEventListener("touchmove",this,true);
            this.elem.removeEventListener("touchend",this,true);
        },
        val:function(val,position){
            if (val === undefined)
                return this.value
            
            val = Math.min(val, this.max);
            val = Math.max(val, this.min);
            if(position===undefined){
                var 
                  pointerW = this.pointer.offsetWidth,
                  rangeW = this.range.offsetWidth,
                  range = this.max - this.min,
                  width = rangeW - pointerW,
                  position = Math.round((val - this.min) * width / range);
                  this.bubble.style.webkitTransform=this.pointer.style.webkitTransform="translate3d("+position+"px,0,0)";
                  
            }
            this.rangeFill.style.width=position+"px";
            
            this.bubble.innerHTML=val;
            this.value = val;
            this.stepFunc(val);
        }
    }
})(jq);