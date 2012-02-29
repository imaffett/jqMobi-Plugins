/**
 * jq.filterlist.js - Filter list plugin for jqMobi applications
 * This expects a list and will allow you to filter/page the results.
 * @Author Ian Maffett
 * @Copyright AppMobi
 */
(function($) {
    
    var compareFunc = function(elem, val, caseInsensitive) 
    {
        return caseInsensitive ? elem.toLowerCase().indexOf(val.toLowerCase()) !== -1 : elem.indexOf(val) !== -1;
    }
    
    
    var filterCache = [];
    $.fn.filterList = function(opts) {
        if (opts == "refresh") 
        {
            for (var i = 0; i < this.length; i++) 
            {
                filterCache[this[i].id] && filterCache[this[i].id].refresh();
            }
            return this;
        }
        for (var i = 0; i < this.length; i++) 
        {
            filterCache[this[i].id] = new filterList(this[i], opts);
        }
    };
    
    
    var filterList = function(elem, opts) {
        this.options = [];
        this.ele = ele = $(elem);
        if (ele.parent().find(".filterList").length > 0)
            return;
        
        if (this instanceof filterList) {
            for (var j in opts) {
                if (opts.hasOwnProperty(j)) {
                    this[j] = opts[j];
                }
            }
        } else {
            
            return new filterList(elem, opts);
        }
        var input = $("<input class='filterInput' type='text' placeholder='Search...' style='width:100%'/>");
        var wrapper = $("<div class='filterList' style='width:100%;height:24px;position:relative;'/>");
        var closer = $("<div class='filterClose' style='position:absolute;top:0px;right:0px;display:none'>[x]</div>");
        wrapper.append(input).append(closer).insertBefore(ele);
        
        
        this.refresh();
        if (this.perPage > 0) 
        {
            this.prevPage = $("<div class='filterPreviousPage' style='visibility:hidden;position:absolute;left:0px;width:20px;height:20px;border:1px solid #333333;border-radius:20px;background:red;'><div style='position:absolute;top:5px;left:6px;width: 0;height: 0;border-top: 6px solid transparent;border-bottom: 5px solid transparent; 	border-right:5px solid white;'></div>");
            this.pageTitle = $("<div class='filterTitle' style='display:none;position:absolute;left:21px;right:21px;text-align:center;'></div>");
            this.nextPage = $("<div class='filterNextPage 'style='visibility:hidden;position:absolute;right:0px;width:20px;height:20px;border:1px solid #333333;border-radius:20px;background:red;'><div style='position:absolute;top:5px;right:6px;width: 0;height: 0;border-top: 6px solid transparent;border-bottom: 5px solid transparent; 	border-left:5px solid white;'></div>");
            var pageWrapper = $("<div class='filterPager' style='width:100%;clear:both;position:relative;float:left;'/>")
            
            pageWrapper.append(this.prevPage).append(this.pageTitle).append(this.nextPage).insertAfter(ele);
            this.prevPage.bind("click", function() {
                that.pageData(-1);
            });
            this.nextPage.bind("click", function() {
                that.pageData(1);
            });
        }
         
        var that = this;
        closer.bind("click", function() {
            input.val('');
            that.filterData('');
            closer.hide();
        });
        input.bind("keyup", function() {
            that.filterData(this.value)
        }).bind("focus", function() {
            closer.show();
        
        }).bind("blur", function() {
            closer.show();
        });
        this.filterData('');
    };
    
    filterList.prototype = {
        caseInsensitive: false,
        perPage: null,
        ele: null,
        options: [],
        revealElements: false,
        totalPages: null,
        currentPage: null,
        prevPager: null,
        nextPager: null,
        pageTitle: null,
        cbFunc: compareFunc,
        currentPage: 0,
        availableElements: [],
        refresh: function() {
            var that = this;
            this.ele.children().forEach(function(elem) {
                var eachEle = {};
                eachEle.target = elem.childNodes[0].tagName !== undefined ? elem.childNodes[0] : elem
                eachEle.parent = elem;
                that.options.push(eachEle);
            });
            return this;
        },
        filterData: function(val) {
            var that = this;
            that.availableElements = [];
            if (val == '' && this.revealElements)
                return that.options.forEach(function(elem) {
                    if ((elem.target.getAttribute("data-ignore") + "").toLowerCase() != "true") {
                        $(elem.parent).hide();
                    } else {
                        that.availableElements.push(elem.parent);
                    }
                }), that.pageData();
            
            that.options.forEach(function(elem) {
                var toCompare = elem.target.getAttribute("data-filter") ? elem.target.getAttribute("data-filter") : elem.target.innerHTML;
                if ((elem.target.getAttribute("data-ignore") + "").toLowerCase() == "true")
                    return that.availableElements.push(elem.parent);

                that.cbFunc(toCompare, val, that.caseInsensitive) ? (that.availableElements.push(elem.parent), $(elem.parent).show()) : $(elem.parent).hide();
            });
            if(this.perPage)
                this.pageData();
        },
        pageData: function(ind) {
            ind = parseInt(ind);
            if (isNaN(ind))
                ind = 0;
            this.currentPage += ind;
            var totalPages = Math.ceil((this.availableElements.length / this.perPage));
            if(totalPages==0)
               totalPages=1;
            for (var i = 0; i < this.availableElements.length; i++) 
            {
                if (i >= (this.perPage * this.currentPage) && i < (this.perPage * (this.currentPage + 1)))
                    $(this.availableElements[i]).show();
                else
                    $(this.availableElements[i]).hide();
            }
            var dispPage = this.currentPage + 1;
            if (dispPage > totalPages)
                dispPage = totalPages;
            if (dispPage <= 0)
                dispPage = 1;
            if (this.currentPage > 0)
                this.prevPage.css("visibility", "visible")
            else
                this.prevPage.css("visibility", "hidden");
            if (this.currentPage < (totalPages - 1))
                this.nextPage.css("visibility", "visible")
            else
                this.nextPage.css("visibility", "hidden");
            
            this.pageTitle.html("Page " + (dispPage) + "/" + totalPages).show();
        }
    
    }

})(jq);
