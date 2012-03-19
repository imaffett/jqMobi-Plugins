# Google Maps plugin using jqMobi

This plugin helps you create a google maps object on your page.  You can include the google maps script tag, or we can create it asyncronously.

```html
<script src="http://maps.google.com/maps/api/js?sensor=true"></script>
```

# Using

To use this, call .gmaps on a jqMobi collection and pass in options from the google maps API.  If you have not included the google maps script tag from above, we will add it for you.
https://developers.google.com/maps/documentation/javascript/

```js
$(document).ready(function(){
   $("#maps").gmaps({options});
});
```

#Retreiving the Google maps object

To get a google maps object that you can interact with, call the gmaps function with no parameters.  You must create the map before hand.

```js
var myMap=$("#maps").gmaps();
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