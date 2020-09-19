/* @package Frame */

/* Picora :: Javascript :: Core
 * Version 0.7.0
 * Copyright 2005 Praxion Systems LLC
 * http://picora.org/
 * http://praxion.net/
 */

/* Set the variables OS and browser via
 * browser detection from quirksmode.org */
var detect = navigator.userAgent.toLowerCase();
var OS,browser,total,thestring,place;
var version = 0;
if(checkIt('konqueror')){
	browser = "Konqueror";
	OS = "Linux";
}
else if (checkIt('safari')) browser = "safari";
else if (checkIt('omniweb')) browser = "omniweb";
else if (checkIt('opera')) browser = "opera";
else if (checkIt('webtv')) browser = "webtv";
else if (checkIt('icab')) browser = "icab";
else if (checkIt('msie')) browser = "ie";
else if (!checkIt('compatible')){
	browser = "netscape";
	version = detect.charAt(8);
} else browser = "unknown";
if(!version) version = detect.charAt(place + thestring.length);
if(!OS){
	if (checkIt('linux')) OS = "linux";
	else if (checkIt('x11')) OS = "unix";
	else if (checkIt('mac')) OS = "mac";
	else if (checkIt('win')) OS = "windows";
	else OS = "an unknown operating system";
}

function checkIt(str){
	p = detect.indexOf(str) + 1;
	thestring = str;
	return p;
}


/* Provide a way to alert_once() so we don't annoy people with the same message. */
var _debug = true;
var _always_alert = true;
var _alerts = new Array;
function alert_once(message){
	if(_always_alert && _debug){
		alert(message);
		return;
	}
	
	if(!_debug)
		return;
	alerted = false;
	for(key in _alerts)
		if(key == message)
			alerted = true;
	if(!alerted){
		_alerts[message] = true;
		alert(message);
	}
}

/* Get the absolute position of an element */
function getPos(obj){
	var curleft = 0;
	var curtop = 0;
	if(obj.offsetParent){
		while(obj.offsetParent){
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}else if(obj.x && obj.y){
		curleft += obj.x;
		curtop += obj.y;
	}
	return {'x':curleft,'y':curtop};
}


/* strpos() because javascript lacks it! */
function strpos(haystack,needle){
	for(i=0; i<haystack.length; i++)
		if(haystack.substring(i,i + 1) == needle)
			return true;
	return false;
}

/* Basic DOM functions to manipulate web elements. */
function getRef(elementName){
	if(!document.getElementById(elementName))
		return false;
	return (typeof elementName == "string")
		? document.getElementById(elementName)
		: elementName
	;
}

function addEvent(element,type,func){
	if(typeof(element) == "string")
		element = getRef(element);
	if(element.addEventListener){		element.addEventListener(type,func,false);		return true;	} else if(element.attachEvent)		return element.attachEvent("on" + type,func);	return false;}

function setStyle(elementName,styleName,newValue){
	if(!getRef(elementName)){
		alert_once("setStyle() could not find the element " + elementName);
		return false;
	}
	getRef(elementName).style[styleName] = newValue;
	return true;
}

function swapStyle(elementName,styleName,defaultStyleName,alternateStyleName){
	if(!getRef(elementName)){
		alert_once("swapStyle() could not find the element " + elementName);
		return false;
	}
	getRef(elementName).style[styleName] = (getRef(elementName).style[styleName] == defaultStyleName.toLowerCase())
		? alternateStyleName
		: defaultStyleName
	;
	return true;
}

function setClass(elementName,newClassName){
	if(!getRef(elementName)){
		alert_once("setClass() could not find the element " + elementName);
		return false;
	}
	getRef(elementName).className = newClassName;
	return true;
}

function swapClass(elementName,defaultClassName,alternateClassName){
	if(!swapClass(elementName)){
		alert_once("setClass() could not find the element " + elementName);
		return false;
	}
	getRef(elementName).className = (getRef(elementName).className == defaultClassName.toLowerCase())
		? alternateClassName
		: defaultClassName
	;
	return true;
}

function showElement(elementName,displayStyle){
	if(typeof(displayStyle == "undefined"))
		displayStyle = "block";
	if(!setStyle(elementName,"display",displayStyle)){
		alert_once("showElement() could not find the element " + elementName);
		return false;
	} else
		return true;
}

function hideElement(elementName){
	if(!setStyle(elementName,"display","none")){
		alert_once("hideElement() could not find the element " + elementName);
		return false;
	} else
		return true;
}

function testElement(formName,elementName,testVal){
	if(!document[formName][elementName])
		alert_once("The form " + formName + " has no element named " + elementName);
	else if(document[formName][elementName]["value"] == null)
		alert_once("The element " + elementName + " has no " + testVal + ".");
	else
		return true;
	return false;
}

function getFormElementValue(formName,elementName){
	if(testElement(formName,elementName,"value"))
		return document[formName][elementName]["value"];
}

function setFormElementValue(formName,elementName,newValue){
	if(testElement(formName,elementName,"value"))
		document[formName][elementName]["value"] = newValue;
}

function getSelectValue(formName,elementName){
	if(testElement(formName,elementName,"options"))
		return document[formName][elementName]["options"][document[formName][elementName]["options"].selectedIndex].value;
}

function getSelectValueById(elementId){
	return getRef(elementId)['options'][getRef(elementId)['options'].selectedIndex].value;
}

function setSelectValue(formName,elementName,newSelectedValue){
	if(testElement(formName,elementName,"options")){
		for(i=0; i<document[formName][elementName].length; i++){
			if(document[formName][elementName].options[i].value == newSelectedValue)
				document[formName][elementName].selectedIndex = i;
		}
	}
}

function setSelectValueById(elementId,newSelectedValue){
	for(i=0; i<getRef(elementId).length; i++){
		if(getRef(elementId).options[i].value == newSelectedValue)
			getRef(elementId).selectedIndex = i;
	}
}

function setContent(elementName,newHtmlValue){
	if(!getRef(elementName)){
		alert_once("setContent() could not find the element " + elementName)
		return false;
	}
	getRef(elementName).innerHTML = newHtmlValue;
	return true;
}


/* Simple string cleaning function for url and filename friendly names. */
function normalizeString(str){
	s = new String(str);
	s = s.replace(new RegExp('[\\s]+','g'), '_');
	s = s.replace(new RegExp('[^a-zA-Z\\s\\d\\-\\.\\_]+','g'), '');
	return s.toLowerCase();
}


/* Simple cookie functions. */
function setCookie(cookieName,cookieValue,expires,path,domain,secure){
	document.cookie = cookieName + "=" + escape(cookieValue) + ";" +
		((typeof(expires) != "undefined" && expires != false) ? "; expires=" + expires.toGMTString() : "") +
		((typeof(path) != "undefined" && path != false) ? "; path=" + path : "path=/;") +
		((typeof(domain) != "undefined" && domain != false) ? "; domain=" + domain : "") +
		((typeof(secure) != "undefined" && secure != false) ? "; secure" : "");
	;
}

function getCookie(cookieName){
	re = new RegExp(cookieName + "=([^;]+)");
	value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : false;
}

function deleteCookie(cookieName){
	if(getCookie(cookieName))
          document.cookie = cookieName + "=; expires=Thu, 01-Jan-70 00:00:01 GMT";
}


/* State Swapping function, which holds across page views. */
var _toggleStates = {};
function toggle_state_init(name,defaultStateFunc,altStateFunc){
	_toggleStates[name] = [defaultStateFunc,altStateFunc];
	if(!getCookie(name))
		setCookie(name,altStateFunc.toString().match(/function[\s]+([^\)]*)/)[1]);
	toggle_state(name,true);
}

var _beenClicked = {};
function toggle_state(name,dontSetCookie){
	defaultStateFunc = _toggleStates[name][0];
	altStateFunc = _toggleStates[name][1];
	
	//if this is the first click from the user, invert the alt/default
	//calling and don't set a cookie
	if(typeof(dontSetCookie) != "undefined" && !_beenClicked[name]){
		//mark as clicked
		_beenClicked[name] = true;
		if(getCookie(name) == defaultStateFunc.toString().match(/function[\s]+([^\)]*)/)[1])
			altStateFunc();
		else
			defaultStateFunc();
		return;
	}
	
	//normal state swap
	if(getCookie(name) == defaultStateFunc.toString().match(/function[\s]+([^\)]*)/)[1]){
		defaultStateFunc();
		if(typeof(dontSetCookie) == "undefined"){
			deleteCookie(name);
			setCookie(name,altStateFunc.toString().match(/function[\s]+([^\)]*)/)[1]);
		}
	}else{
		altStateFunc();
		if(typeof(dontSetCookie) == "undefined"){
			deleteCookie(name);
			setCookie(name,defaultStateFunc.toString().match(/function[\s]+([^\)]*)/)[1]);
		}
	}
}

/* A way to tell a script to do something, but not right away.
 * This is perfect for events like onkeydown where you would
 * want to proccess text only if the user has stopped typing
 * for a second or two (your computer may be fast enough to
 * do something on every keystroke, but your users' might not!)
 */
var waitForThenContainer = {};

function waitForThen(timeoutLength,funcPointer){
	if(waitForThenContainer[funcPointer.name])
		window.clearTimeout(waitForThenContainer[funcPointer.name]);
	waitForThenContainer[funcPointer.name] = window.setTimeout(funcPointer,timeoutLength);
}

//pops up an editor window (which will wait for the parent window to change)
function editorPopup(libraryUrl){
	handle = window.open('picora_editor','width=520,height=600,scrollbars=yes,address=no,status=no');
	handle.document.write("<html><head><title>Please Wait</title><link rel=\"stylesheet\" href=\"" + libraryUrl + "style/picora/picora.css\"/></head><body><h3>Processing your request<span id=\"ticker\">.</span></h3><script type=\"text/javascript\"> var oldUrl = '" + window.location + "'; function refresh(){ if(opener.location != oldUrl) window.location = '" + libraryUrl + "util/Editor.php?redirect&' + '&url=' + escape(opener.location.href); else document.getElementById('ticker').innerHTML += '.'; } window.setInterval('refresh();',500);</script></body>");
}


//in_array, ala PHP
String.prototype.in_array = function(arr){
	val = false;
	for(a in arr)
		if(arr[a] == this.toString())
			val = true;
	return val;
} 

//safari doesn't properly reload it's DOM when modifying innerHTML
//but this does
function repaint(){
	try{ //this is only nessecary in safari
		document.getElementsByTagName('body').item(0).innerHTML += '';
	}catch(e){}
}