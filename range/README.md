# range slider plugin for jqMobi apps

This plugin is similar to the HTML5 range input, but works great on mobile devices

# Using the range slider plugin

1) Call $(container).range({opts})



```html
 <div id="slider2" class="slider"></div>
```

```js
$("#slider2").range({value:15});
```
 
There are different configuration options you can pass in.  Please note, if jq.scroller.js is included, we will add a scroller to the content area

```js
min:1, //Minimum value for the range slider
max:100, //Maximum value for the range slider
value:0, //initial starting value
rangeClass:"range", //CSS class for range div
pointerClass:"pointer", //CSS class for the bubble/circle on the range
sliderClass:"slider",//CSS class for the slider in general
rangeFillClass:"rangefill", //CSS class for the range as it gets filled
bubbleClass:"rangeBubble", //CSS class for the bubble that appears on top with the value  in it
stepFunc:function(){},//Function that gets executed every step when the range gets moved
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

All plugins are licensed under the terms of the MIT License, see the included license.txt file.