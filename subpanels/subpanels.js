/**
 * This plugin lets users create sub panels that can be animated by users in jqUi
 * @Author Ian Maffett
 * @Copyright appMobi
   Example below.  
   
   1) Create your container div and put the 'sub panel's indside of it.  You can disable scrolling by setting scrolling="no"
   2) Create your nav div with class 'subpanelNav'
   3) on document read, call .subpanel()
   
   You must create your jqUi panel and set scrolling = "no" on it
    <div id="mynewdiv" title="My New Div" class="panel" scrolling="no">  <!-- jqUi panel -->
        <script type="text/javascript">
            $(document).ready(function(){
                $("#subPanel").subpanel();
            });
        </script>

        <!-- now we start the sub panels -->
        <div id='subPanel' style="position:absolute;top:0px;bottom:40px;width:100%"> 
            <div class="insetPanel default" id='page1' style='background:green !important;height:999px'>Page 1</div>
            <div class="insetPanel" id='page2' style='background:red !important'>Page 2</div>
            <div class="insetPanel" id='page3' style='background:blue !important' scrolling="no">Page 3</div>
        </div>
        <!-- this is nav.  If must have class "subpanelNav" -->
        <div class="subpanelNav" style="position:absolute;bottom:0px;height:40px;width:100%;line-height:24px;font-size:14px;text-align:center;background:black;color:white;">
            <a class='icon headset' href="#page1" ></a> | 
            <a class='icon wifi' href="#page2"> </a> | 
            <a class='icon html5' href="#page3"></a> 
        </div>
    </div>
 */

(function($) {
  if (!$.ui) {
    return alert("This library requires jqUi");
  }
  var scrollers = [];
  $.fn.subpanel = function() {
    if (this.length == 0) return;

    for (var i = 0; i < this.length; i++) {
      new subpanel(this[i]);
    }
    return this;
  }

  var subpanel = function(item) {
      this.container = $(item);

      //let's delegate the clicks to handle routing
      var self = this;
      this.container.parent().find(".subpanelNav").on("click", "a", function(e) {
        self.loadNewDiv($(this.hash).get(), $(this).data("transition"), false);
        e.preventDefault();
      });
      this.container.css("overflow", "hidden");
      this.container.parent().find(".subpanelNav a").data("ignore", "true"); //Set data ignore so the main click handler doesn't process it
      this.container.find("div.insetPanel").forEach(function(obj) {
        if ($(obj).attr("scrolling") == "no") return;
        scrollers[obj.id] = $(obj).scroller({
          scrollBars: true,
          verticalScroll: true,
          vScrollCSS: "jqmScrollbar",
          useJsScroll: !$.feat.nativeTouchScroll,
          noParent:$.feat.nativeTouchScroll
        });
        scrollers[obj.id].disable();
      });
      this.loadCurrent();
      this.container.bind("destroy", function() {
        this.container.find("div.insetPanel").forEach(function(obj) {
          if ($(obj).attr("scrolling") == "no") return;
          scrollers[obj.id].disable();
          delete scrollers[obj.id];
        });
      })
      var that = this;
      this.container.parent().find(".backButton").bind("click", function() {
        if (that.history.length > 0) {
          var el = that.history.pop();
          that.loadNewDiv(el.old, el.trans, true, el.new);
        }
      })
    };

  subpanel.prototype = {
    container: null,
    currentDiv: null,
    history: [],
    loadCurrent: function() {
      var div = this.container.find(".default");
      div.css("-webkit-transform", "none");
      div.show();
      this.currentDiv = div.get();
      if (scrollers[this.currentDiv.id]) scrollers[this.currentDiv.id].enable();
    },
    loadNewDiv: function(newDiv, trans, back, prevDiv) {
      if (newDiv == this.currentDiv) return;
      back = back || false;
      var oldDiv = prevDiv || this.currentDiv;
      $.ui.doingTransition = true;
      $.ui.runTransition(trans, oldDiv, newDiv, back);
      if (scrollers[this.currentDiv.id]) scrollers[this.currentDiv.id].disable();
      this.currentDiv = newDiv;
      if (scrollers[this.currentDiv.id]) scrollers[this.currentDiv.id].enable();
      if (back) return;
      this.history.push({
        'old': oldDiv,
        'new': newDiv,
        'trans': trans
      });
    }

  };

})(jq)