# Filter list plugin using jqMobi

This plugin allows you to filter an unordered list or ordered list.  It will create an input box above the list for you to filter.

# Using

To use this, call .filterlist on a jqMobi collection

```js
$(document).ready(function(){
   $("#list").filterList({revealElements:false,perPage:3,caseInsensitive:true});
});
```

When you create the list, we cache the items in the list for performance.  If you update them, you must call refresh

```js
$("#list").filterList("refresh");
```

# List Options

The idea is that we are filtering <li> elements, but more often then not, the <li> will have child items.  We only go to the child though to check against that, for anchors and such.

```html
<li><a href="#test">Test</a>
<li>Test</a>
```

We allow two data attributes to be set

1) data-filter="foo" //We will filter against that value instead

2) data-ignore="true" //Ignore this item when filtering


#Options

```js
var opts {
    caseInsensitive: false, //Fasle = case sensitive search.  true = case insensitive
    perPage: null, //Setting this will allow you to page the options
    revealElements:false, //Setting this to true will hide all elements and only show the matching ones
    cbFunc:function(){}  //Comparison function to use.  We have a built in one, so it's best to leave this blank
}
```

#Sample 

```html
<html>
<head>
    <link rel="stylesheet" type="text/css" href="jq.filterlist.css">
    <script src="http://www.jqmobi.com/testdrive/jq.mobi.min.js"></script>
    <script src="jq.filterlist.js"></script>
    <script>
    $(document).ready(function(){
        $("#list").filterList({revealElements:false,perPage:3,caseInsensitive:true});
    });
    </script>
</head>
    <body>
        <div style='width:200px;border:1px solid black;'>
            <ul id='list'>
                <li><a href="#foo" data-filter="foo">One - data-filter="foo"</a></li>
                <li><a href="#foo">Two</a></li>
                <li><a href="#foo">Three</a></li>
                <li><a href="#foo">Four</a></li>
                <li><a href="#foo">Five</a></li>
                <li><a href="#foo" data-ignore="true">Six (we ignore this one)</a></li>
                <li>Seven</li>
            </ul>
        </div>
    </body>
</html>
```

# Bugs

Please use github to report any bugs found.  Please provide the following

1. Any error messages from the console

2. Line numbers of offending code

3. Test cases

4. Description of the Error

5. Expected result

6. Browser/Device you are testing on


# License

This plugin is licensed under the terms of the MIT License, see the included license.txt file.