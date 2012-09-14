/**
 * jq.pathmenu.js
 * @author appMobi
 * @copyright appMobi

 * @desc a jqMobi plugin for creating path style menu's.
  Your HTML needs to be a <ul> with <li> as the items (up to 5)
 
  <ul id='pathmenu'>
    <li><a href='#'>Like</a></li>
    <li><a href='#'>+1</a></li>
    <li><a href='#'>Tweet</a></li>
    <li><a href='#'>Email</a></li>
    <li><a href='#'>&hearts;</a></li>
  </ul>
 
 * Then you simply call $("#pathmenu").pathmenu(opts) to enable it
 * 
 * opts
      btnclass - button class for the popup links
      menubtnclass - class for the menu button
      button - text to show in the button
 */

;
(function($){

	$.fn.pathmenu=function(opts){
		if(this.length==0) return;
		 new pathmenu(this[0],opts);
		 return this;
	}

	var pathmenu=function(el,opts){
		this.container=$(el);
		opts.btnclass=opts.btnclass||"pathbtn";
		opts.menubtnclass=opts.menubtnclass||"pathmenubutton";
		opts.button=opts.button||"!"
        var self=this;
        
       
        //subscribe for the destroy event to prevent memory leaks
        this.container.bind('destroy', function(){
			self.container.off("click");
		});
        //Add the button class to the <li's>
		this.container.find("li").addClass(opts.btnclass);
        //Add the actual button
        this.container.addClass("pathcircle");
		this.container.append("<li class='"+opts.menubtnclass+"'><div><a>"+opts.button+"</a></div></li>")

        //Handle clicking the links
        this.container.on("click","."+opts.btnclass,function(){
            //Wait 50ms to close
            setTimeout(function(){
                self.container.find("."+opts.btnclass).removeClass("open");
                self.container.find("."+opts.menubtnclass).removeClass("open");
            },50);
        });
        //Toggle clicking the menu
        this.container.find("."+opts.menubtnclass).bind("click",function(){
            var btns=self.container.find("."+opts.btnclass);
            if(btns.hasClass("open"))
                btns.removeClass("open"),$(this).removeClass("open");
            else
                btns.addClass("open"),$(this).addClass("open");
        });
	};
})(jq)