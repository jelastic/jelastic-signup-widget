# Signup Widget

<img align="right" width="200" height="300" src="images/get_started.png">

Following this guide you can create a one-click signup widget for your Jelastic PaaS platform and easily add it to any website.<br/>
      
The widget is based on the standard HTML, JS, and CSS (available by default in all modern browsers), so it does not require any additional dependencies. Moreover, to avoid impacting the performance (i.e. page load speed), the initialization of the widget is performed in the background.   

In the image, you can check the default view of the widget during all of the stages: email address provisioning by a user, request processing, and operation success. The look and texts can be fully customized.   


## Integrate Widget

1. To add signup widget to the website you require ***jlcwidget.css*** and ***jlcwidget.js*** files, which allows you to customize your widget. However, if you don’t need to change the default styles, they can be downloaded (or linked to via code) directly from the repository:   
  * [*https://raw.githubusercontent.com/jelastic/jelastic-widget/master/dist/jlcwidget.css*](https://raw.githubusercontent.com/jelastic/jelastic-widget/master/dist/jlcwidget.css)
  * [*https://raw.githubusercontent.com/jelastic/jelastic-widget/master/dist/jlcwidget.js*](https://raw.githubusercontent.com/jelastic/jelastic-widget/master/dist/jlcwidget.js)

2. Once you have the files, add the appropriate templates to your webpage code (anywhere within the ***header*** or ***body*** sections).

```javascript
<script async src="{path}/jlcwidget.js"></script>
<link rel="stylesheet" href="{path}/jlcwidget.css" media="none" onload="if(media!='all')media='all'">
```
Don’t forget to substitute the ***{path}*** placeholder with the correct path.

3. Now, you can include widget anywhere within the page via the next code block:

```javascript
<div class="jlc-wrapper" data-text="{button-label}" data-tx-success="{success-text}" data-tx-error="{error-text}" data-key="{hoster-domain}"></div>
```
Here, you should define your platform and, if needed, can apply texts localization:  
  * ***{button-label}*** - the main button label (default value is “GET STARTED FOR FREE”)  
  * ***{success-text}*** - text displayed upon success (default value is “CHECK YOUR EMAIL”)  
  * ***{error-text}*** - text displayed upon error (default value is “An error has occurred, please try again later”)  
  * ***{hoster-domain}*** - [domain name of the platform](https://docs.jelastic.com/jelastic-hoster-info) (without ***app.*** at the beginning), where a customer should be registered  
   
   
```Note
Tip: The default texts (localization) can be redefined via widget customization, described in the section below.
```
   
That’s it! The signup widget is already added to your website.

## Customize and Build Widget

To customize the provided signup widget, you’ll require **Node.js** server of the *6th* or later version with the [*Gulp*](https://gulpjs.com/) building tool installed. 

1. If you don’t have *Gulp* on your server, get it with a single command:

*npm install gulp --global*

<p align="left"> 
<img src="images/npm_install.png" width="700">
</p>

2. Clone the signup widget repository locally.
   
*git clone https://github.com/jelastic/jelastic-widget.git*

<p align="left"> 
<img src="images/git_clone.png" width="700">
</p>

3. Go to the ***jelastic-widget*** folder and install all of the project’s dependencies.

*cd jelastic-widget   
npm install -d*

<p align="left"> 
<img src="images/npm_install1.png" width="700">
</p>

4. Now, customize the widget by adjusting the following files:
  * ***../jelastic-widget/assets/scss/jlcwidget.scss*** - defines the widget visual; some simple adjustments are described below:
    * **$color-default** - sets the color of the widget (*$color-blue : #0088fb;* is set by default, *$color-green : #00bea7;* is additional default option)
    * **$color-red** - defines the color of the error text
    * **$bdrs** - customizes border radius of the button
    * **$width** - sets a button size (pay attention to font-size of the **.jlc-btn** and **.jlc-input** selectors)
    * **$font-family** - provides a font for the texts
  * ***../jelastic-widget/assets/js/jlcwidget.js*** - adjusts the behavior of the widget
    * **main variables** section - allows setting the default texts for the widget
    * apply other changes only in case you know what you are doing
  * ***../jelastic-widget/assets/img*** - stores default images for the widget. Be aware, uploading new images to the folder won’t apply any changes, you need to adjust the **background-image**: parameter(s) within the ***jlcwidget.scss*** file. For the best performance, we recommend using optimized images in the SVG format (e.g. with the [svgomg](https://jakearchibald.github.io/svgomg/) svgomg service) and add them with the BASE64 technology (e.g. via base64encode.org[base64encode.org](https://www.base64encode.org/) ).
    * **check-icon.svg** - a white tick icon
    * **loader.svg** - loading (request processing) animation
    * **mail-black.svg** - a black envelope icon
    * **mail-grey.svg** - a gray envelope icon
    * **right-arrow.svg** - a white arrow icon

```
Tip: You can run the gulp serve command to start a test server with the real-time synchronization of the applied changes for the comfortable preview and troubleshooting.
```
		
5. Build the ***jlcwidget.css*** and ***jlcwidget.js*** files for your customized widget, which will be added to the **../jelastic-widget/dist/** folder.

*gulp default*

<p align="left"> 
<img src="images/gulp.png" width="700">
</p>
   
   Now, you can use these new files to place the customized widget on your website as described in the **Integrate Widget** block.
