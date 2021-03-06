


// $(document).ready(function(){
function docInit() {

    var langType = getBrowserLanguage();
   initViewText(langType);

    /*Carousel view scripts*/
   /* $("#testimonial").owlCarousel({
        items: 1,
        loop:true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-right'></i>","<i class='fa fa-angle-left'></i>"],
        center: true,
        margin: 10,
        nav: true,
        autoHeight: true
    });

    /!*Menu bar background color change script*!/
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

    /!*Smoth transition script*!/
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
*/
    setTimeout(function () {
        tryOpenApp(langType);
    }, 1000);
}

if(typeof DEVICE_TYPE === "undefined") {
    var DEVICE_TYPE = {};
    DEVICE_TYPE.PC = 0;
    DEVICE_TYPE.ANROID = 1;
    DEVICE_TYPE.IOS = 2;
    DEVICE_TYPE.UNKNOWN = -1;
};

if (typeof LANG_TYPE === "undefined"){
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
    ios_download_url: 'itms-apps://itunes.apple.com/us/app/et-world-download-all-watch-all/id1059227278?mt=8',
    android_download_url:'http://etdownload.zikkotech.com/apps/etworld.apk',
    // android_download_url:'http://apk.zikkotech.com/AppUpdate/apk/etworld.apk?raw=true',
    timeout: 800,
    zikko_offical_website: "https://www.zikko.cn",//即刻官网
    zikko_jd_website: "https://zikko.jd.com",//京东即刻店
    zikko_account_website: "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI5NTkzNTIxMg==&scene=126#wechat_redirect",//即刻公众号
};

var browser = {

    versions: function() {

        var u = navigator.userAgent,
            app = navigator.appVersion;

        return {

            trident: u.indexOf('Trident') > -1,                        /*IE内核*/

            presto: u.indexOf('Presto') > -1,          /*opera内核*/

            webKit: u.indexOf('AppleWebKit') > -1, /*苹果、谷歌内核*/

            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,        /*火狐内核*/

            mobile: !!u.match(/AppleWebKit.*Mobile.*/),        /*是否为移动终端*/

            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/

            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/

            iPhone: u.indexOf('iPhone') > -1,          /*是否为iPhone或者QQHD浏览器*/

            iPad: u.indexOf('iPad') > -1,      /*是否iPad*/

            webApp: u.indexOf('Safari') === -1,          /*是否web应该程序，没有头部与底部*/

            souyue: u.indexOf('souyue') > -1,

            superapp: u.indexOf('superapp') > -1,

            weixin:u.toLowerCase().indexOf('micromessenger') > -1,

            Safari:u.indexOf('Safari') > -1
        };

    }(),

    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

function initViewText(langType) {
    var connectContent = document.getElementsByTagName("h4")[0];
    var downloadIOS = document.getElementsByTagName("h6")[0];
    var downloadAndroid = document.getElementsByTagName("h6")[1];
    var zikkoWebsite = document.getElementsByTagName("h6")[2];
    var connect_div = document.getElementsByClassName('connect-div')[0];
    var et_phone_logo = document.getElementById('img_phone');

    var textZikkoWebSite = document.getElementById("zikko-account-bottom-container");
    var textJdWebSite = document.getElementById("jd-bottom-container");
    if (langType === 2) {
        textZikkoWebSite.style.display = "none";
        textJdWebSite.style.display = "none";

        downloadIOS.style.fontSize = '30px';
        downloadIOS.style.paddingTop = '10px';
        downloadAndroid.style.fontSize = '30px';
        downloadAndroid.style.paddingTop = '10px';
        zikkoWebsite.style.fontSize = '30px';
        zikkoWebsite.style.paddingTop = '10px';
        connect_div.style.marginLeft = '-10px';
        et_phone_logo.src="assets/img/et_phone_en.png";

        downloadIOS.innerHTML = "IOS Download";
        downloadAndroid.innerHTML = "Android Download";
        zikkoWebsite.innerHTML = "Zikko OfficalSite";
        connectContent.innerHTML = "Connect Smart";
    }else{
        downloadIOS.style.fontSize = '40px';
        downloadAndroid.style.fontSize = '40px';
        zikkoWebsite.style.fontSize = '40px';
        connect_div.style.marginLeft = '0';
        et_phone_logo.src="assets/img/et_phone_zh.png";

        if (langType === 1){//繁体
            textZikkoWebSite.style.display = "none";
            textJdWebSite.style.display = "none";

            connectContent.innerHTML = "連 接 您 所 想";
            downloadIOS.innerHTML = "IOS版下載";
            downloadAndroid.innerHTML = "安卓版下載";
            zikkoWebsite.innerHTML = "Zikko官網";
        }else {
            textZikkoWebSite.style.display = '';
            textJdWebSite.style.display = '';

            connectContent.innerHTML = "连 接 您 所 想";
            downloadIOS.innerHTML = "IOS版下载";
            downloadAndroid.innerHTML = "安卓版下载";
            zikkoWebsite.innerHTML = "Zikko官网";
        }
    }
}

function tryOpenApp(langType){

    var deviceType = getDeviceType();

    if (deviceType === 0){//pc端直接跳转到官网
        window.location.href = config.zikko_offical_website;

        return;
    }
    if (-1 === deviceType){
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
    ifr.src = platType === 2 ? config.scheme_IOS : config.scheme_Adr;
    ifr.style.display = 'none';
    document.body.appendChild(ifr);

    var etworld_url = config.scheme_Adr;
    if (platType === 2) {
        etworld_url = config.scheme_IOS;
        if (getOs().indexOf("Safari") > -1){
            //alert("open safari");
            window.location = etworld_url;
        }else{
            window.location.href = etworld_url;
            window.location = etworld_url;
        }
    }

    // alert(etworld_url)

    // document.body.removeChild(ifr);
}

/**
 * 下载App
 */
function downloadApp() {
	var deviceType = getDeviceType();
    if (0 === deviceType ) { // 是PC端
        // var isEnglish = getBrowserLanguage() === 2;
        window.location.href = config.zikko_offical_website;  // 公司主页

        return;
    }

    if (-1 === deviceType){
    	window.close();
    	return;
	}

    // alert("您的浏览器类型为1:" + getOs());

    var download_url = config.android_download_url;
    if (deviceType === 2) {
        download_url = config.ios_download_url;

        // alert("open safari");
        window.open(download_url);
        // if (getOs().indexOf("Safari") > -1){
        //     //alert("open safari");
        //     window.open(download_url);
        // }else{
        //     var ifr = document.createElement('iframe');
        //     ifr.src = download_url;
        //     ifr.style.display = 'none';
        //     document.body.appendChild(ifr);
        //     // window.open(download_url);
        //     // alert(download_url);
        //
        //     window.location = download_url;
        // }
        // window.location.href = download_url;
    }else{
        window.location.href = download_url;
    }

    // window.open(download_url);

     // window.location.replace(download_url);

   /* window.addEventListener("DOMContentLoaded", function(){
        document.getElementById("J-call-app").addEventListener('click',openclient,false);

    }, false);*/
}

/**
 * 进入即刻官网
 */
function onToZikkoWebsite(webType) {
    if (webType == "jd"){//即刻京东店
        window.location.href = config.zikko_jd_website;
    }else if(webType == "zikko_account"){//公众号
        window.location.href = config.zikko_account_website;
    }else//官网
        window.location.href = config.zikko_offical_website;
}

function getOs()
{
    if(navigator.userAgent.indexOf("MSIE")>0) {
        return "MSIE";
    }
    if(navigator.userAgent.indexOf("Firefox")>0){
        return "Firefox";
    }
    if(navigator.userAgent.indexOf("Safari")>0) {
        return "Safari";
    }
    if(navigator.userAgent.indexOf("Camino")>0){
        return "Camino";
    }
    if(navigator.userAgent.indexOf("Gecko/")>0){
        return "Gecko";
    }
}

// 是微信浏览器
function isWeixinBrowser(){

	var ua = navigator.userAgent.toLowerCase();

	if (ua === null) return false;

	if(ua.match(/MicroMessenger/i)==="micromessenger") {

		return true;

	} else {
		return false;
	}
}

function getBrowserLanguage()
{
    var language = browser.language;
    // if (navigator.appName.toLocaleLowerCase().indexOf('netscape') > -1)// == 'Netscape'
		// language = navigator.language.toLocaleLowerCase();
    // else {
	 //    try{
    //         language = browser.language;
    //     }catch(err){
    //         language = null;
    //     }
    // }

    // alert(language);

    if (language != null){
        if (language.indexOf('zh') > -1){
            if (language.indexOf('zh-tw') > -1){
                return 1;// LANG_TYPE.TAIWAN;
            }

            return 0;//LANG_TYPE.SIMPLE_CHINESE;
        }
    }

    return 2;// LANG_TYPE.ENGLISH;
	
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

