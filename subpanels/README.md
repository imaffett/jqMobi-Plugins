# Subpanel plugin for jqUi
###Author: Ian Maffett (appMobi)

This plugin allows users to create "subpanels" that can be navigated in a panel.

# Using subpanel plugin

1) Create your container div and put the 'sub panel's indside of it.  You can disable scrolling by setting scrolling="no"

2) Create your nav div with class 'subpanelNav'

3) on document read, call .subpanel()

We automagically wire in the scrollers for you.  If you do not want scrolling, set "scrolling='no'" on that sub panel

You must lay out your HTML accordingly

```html
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
        <!-- this is the footer.  If must have class "subpanelNav" -->
        <div class="subpanelNav" style="position:absolute;bottom:0px;height:40px;width:100%;line-height:24px;font-size:14px;text-align:center;background:black;color:white;">
            <a class='icon headset' href="#page1"></a> | 
            <a class='icon wifi' href="#page2"></a> | 
            <a class='icon html5' href="#page3"></a> 
        </div>
    </div>
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