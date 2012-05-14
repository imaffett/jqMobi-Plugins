# ntoice window plugin for jqUi

This plugin gives "facebook" style notice windows (clicking on messages, notices, etc).

# Using the notice window plugin

1) Call $(container).noticeWindow({opts})



```js
 $(document.body).noticeWindow({
       title:'Notifications', //string
       content:'This is a sample', //string of thml
       arrowLeft:'middle' //left,middle,right or pixels from the left
   });

 ```
 
There are different configuration options you can pass in.  Please note, if jq.scroller.js is included, we will add a scroller to the content area

```js
containerCss:'' //CSS for the container class
title:'' //Title at the top
content:'' //Html content to show
arrowLeft:"5px"// Position from the left for the arrow.  Can also be left/middle/right
arrowDirection:"up" //Is the arrow at the top or bottom
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