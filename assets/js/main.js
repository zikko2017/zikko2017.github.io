

$(document).ready(function(){

   initViewText();

    /*Carousel view scripts*/
    $("#testimonial").owlCarousel({
        items: 1,
        loop:true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"],
        center: true,
        margin: 10,
        nav: true,
        autoHeight: true
    });

    /*Menu bar background color change script*/
    $("#menu-click").click(function(event){
            event.preventDefault();
        });
    $(window).scroll(function(){
       var scrollTop = $(window).scrollTop();
        if(scrollTop>100){
             $("#nav").css("background-color", "black");
         }
        else{
        $("#nav").css("background-color", "transparent");
    }
    });

    /*Smoth transition script*/
     // This is a functions that scrolls to #{blah}link
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    setTimeout(function () {
        // tryOpenApp();
    }, 1000);
});

if(typeof DEVICE_TYPE == "undefined") {
    var DEVICE_TYPE = {};
    DEVICE_TYPE.PC = 0;
    DEVICE_TYPE.ANROID = 1;
    DEVICE_TYPE.IOS = 2;
    DEVICE_TYPE.UNKNOWN = -1;
};

if (typeof LANG_TYPE == "undefined"){
    var LANG_TYPE = {};
    LANG_TYPE.SIMPLE_CHINESE = 0;
    LANG_TYPE.TAIWAN = 1;
    LANG_TYPE.ENGLISH = 2;
    LANG_TYPE.UNKNOWN = -1;
}

var config = {
    /*scheme:必须 etworld
    * https://github.com/zikko2017/zikko2017.github.io/blob/master == http://apk.zikkotech.com
    *ios: ZikkoUORemote ; android: uoremote
     *  */
    scheme_IOS: 'etworld://',
    scheme_Adr: 'etworld://',
    ios_download_url: 'https://itunes.apple.com/us/app/et-world-download-all-watch-all/id1059227278?mt=8',
    android_download_url:'http://apk.zikkotech.com/AppUpdate/apk/etworld.apk?raw=true',
    timeout: 800
};

var browser = {

    versions: function() {

        var u = navigator.userAgent,
            app = navigator.appVersion;

        return {

            trident: u.indexOf('Trident') > -1,                        /*IE内核*/

            presto: u.indexOf('Presto') > -1,          /*opera内核*/

            webKit: u.indexOf('AppleWebKit') > -1, /*苹果、谷歌内核*/

            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,        /*火狐内核*/

            mobile: !!u.match(/AppleWebKit.*Mobile.*/),        /*是否为移动终端*/

            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/

            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/

            iPhone: u.indexOf('iPhone') > -1,          /*是否为iPhone或者QQHD浏览器*/

            iPad: u.indexOf('iPad') > -1,      /*是否iPad*/

            webApp: u.indexOf('Safari') == -1,          /*是否web应该程序，没有头部与底部*/

            souyue: u.indexOf('souyue') > -1,

            superapp: u.indexOf('superapp') > -1,

            weixin:u.toLowerCase().indexOf('micromessenger') > -1,

            Safari:u.indexOf('Safari') > -1

        };

    }(),

    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function initViewText() {
    var langType = getBrowserLanguage();

    var connectContent = document.getElementsByTagName("h4")[0];
    var downloadIOS = document.getElementsByTagName("h6")[0];
    var downloadAndroid = document.getElementsByTagName("h6")[1];
    var connect_div = document.getElementsByClassName('connect-div')[0];
    var et_phone_logo = document.getElementById('img_phone');
    if (langType == LANG_TYPE.SIMPLE_CHINESE || langType == LANG_TYPE.TAIWAN){
        downloadIOS.style.fontSize = '40px';
        downloadIOS.style.paddingTop = '4px';
        downloadAndroid.style.fontSize = '40px';
        downloadAndroid.style.paddingTop = '5px';
        connect_div.style.marginLeft = '0';
        et_phone_logo.src="assets/img/et_phone_zh.png";

        if (langType == LANG_TYPE.TAIWAN){
            connectContent.innerHTML = "連 接 您 所 想";
            downloadIOS.innerHTML = "IOS版下載";
            downloadAndroid.innerHTML = "安卓版下載";
        }else {
            connectContent.innerHTML = "连 接 您 所 想";
            downloadIOS.innerHTML = "IOS版下载";
            downloadAndroid.innerHTML = "安卓版下载";
        }
    }else{
        downloadIOS.style.fontSize = '30px';
        downloadIOS.style.paddingTop = '8px';
        downloadAndroid.style.fontSize = '30px';
        downloadAndroid.style.paddingTop = '8px';
        connect_div.style.marginLeft = '-10px';
        et_phone_logo.src="assets/img/et_phone_en.png";

        downloadIOS.innerHTML = "IOS Download";
        downloadAndroid.innerHTML = "Android Download";
        connectContent.innerHTML = "Connect Smart";
    }
}

function tryOpenApp(){

    var deviceType = getDeviceType();
    var isEnglish = getBrowserLanguage() == LANG_TYPE.ENGLISH;

    if (deviceType == DEVICE_TYPE.PC){
        if (isEnglish){
            window.location.href = 'http://www.zikko-store.com/';  // 公司主页
        }else{
            window.location.href = 'http://www.zikko.cn/';  // 公司主页
        }

        return;
    }
    if (DEVICE_TYPE.UNKNOWN == deviceType){
        window.close();
        return;
    }

    openApp(deviceType);

    /**
	 * 微信拦截，进行提示用户在浏览器进行查看
     */
    /*if (isWeixinBrowser()){
    	if (isChinese)
			alert('请点击右上角按钮，点击在浏览器中打开');
    	else{
            alert('Please click the button in the upper right corner, click open in the browser');
		}
	}else {
        openApp(deviceType);
    }*/
}

/**
 * 打开App
 * @param platType 平台类型 ios / android / pc
 */
function openApp(platType) {
    var ifr = document.createElement('iframe');
    ifr.src = platType == DEVICE_TYPE.IOS ? config.scheme_IOS : config.scheme_Adr;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);

    var etworld_url = config.scheme_Adr;
    if (platType == DEVICE_TYPE.IOS) {
        etworld_url = config.scheme_IOS;
    }

    window.location.href = etworld_url;
}

/**
 * 下载App
 */
function downloadApp() {

	var deviceType = getDeviceType();
    if (DEVICE_TYPE.PC == deviceType ) { // 是PC端
        if (isChineseLang()){
            window.location.href = 'http://www.zikko.cn/';  // 公司主页
        }else{
            window.location.href = 'http://www.zikko-store.com/';  // 公司主页
        }

        return;
    }

    if (DEVICE_TYPE.UNKNOWN == deviceType){
    	window.close();
    	return;
	}

    var download_url = config.android_download_url;
    if (deviceType == DEVICE_TYPE.IOS) {
        download_url = config.ios_download_url;
    }
    window.location = download_url;
    // window.location.replace(download_url);

   /* window.addEventListener("DOMContentLoaded", function(){
        document.getElementById("J-call-app").addEventListener('click',openclient,false);

    }, false);*/
}

// 是微信浏览器
function isWeixinBrowser(){

	var ua = navigator.userAgent.toLowerCase();

	if(ua.match(/MicroMessenger/i)=="micromessenger") {

		return true;

	} else {
		return false;
	}
}

function getBrowserLanguage()
{
	if (navigator.appName == 'Netscape')
		var language = navigator.language.toLocaleLowerCase();
	else
		var language = navigator.browserLanguage.toLocaleLowerCase();

	if (language.indexOf('zh') > -1){
	    if (language.indexOf('zh-tw') > -1){
	        return LANG_TYPE.TAIWAN;
        }

        return LANG_TYPE.SIMPLE_CHINESE;
    }

    return LANG_TYPE.ENGLISH;
	
	//if (language.indexOf('en') > -1) document.write('english');
	//else if (language.indexOf('nl') > -1) document.write('dutch');
	//else if (language.indexOf('fr') > -1) document.write('french');
	//else if (language.indexOf('de') > -1) document.write('german');
	//else if (language.indexOf('ja') > -1) document.write('japanese');
	//else if (language.indexOf('it') > -1) document.write('italian');
	//else if (language.indexOf('pt') > -1) document.write('portuguese');
	//else if (language.indexOf('es') > -1) document.write('Spanish');
	//else if (language.indexOf('sv') > -1) document.write('swedish');
	//else if (language.indexOf('zh') > -1) document.write('chinese');
	//else
	//document.location.href = 'english';
}

/**
 * 获取设备类型
 * -1 unknown; 0 pc, 1 android; 2 ios
 */
function getDeviceType() {

    var userAgentInfo = navigator.userAgent;//, app = navigator.appVersion;

    var isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1;
    if (isAndroid) return 1;

    var isIOS = !!userAgentInfo.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) return 2;

    var flag = 0;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    for (var v = 0; v < Agents.length; v++) {

        if (userAgentInfo.indexOf(Agents[v]) > 0) {

            flag = -1;

            break;
        }
    }

    return flag;
}

