﻿(window.webpackJsonp=window.webpackJsonp||[]).push([["b-82d9927df0978c64fbba746460792e53"],{Bj12:function(t,e,n){"use strict";n.r(e);var r=n("mMuO");n.d(e,"saveJsErrorLogs",(function(){return r.saveJsErrorLogs})),n.d(e,"saveStatlogEvents",(function(){return r.saveStatlogEvents})),n.d(e,"saveNetworkStats",(function(){return r.saveNetworkStats})),n.d(e,"saveCustomStats",(function(){return r.saveCustomStats})),n.d(e,"saveProductionStats",(function(){return r.saveProductionStats}))},DM2o:function(t,e,n){"use strict";n.r(e),n.d(e,"statlogsValueEvent",(function(){return u}));var r,o,a=n("J8bf"),s=n("jE6c"),i=n("Xrg9");function u(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];var u;void 0!==t&&void 0!==e&&c((function(){try{u=(u=JSON.parse(Object(a.getCookie)(o))).data}catch(t){u=[]}u.push([Math.round(Date.now()/1e3),t,e].concat(r)),u=u.slice(u.length-100);var n=Math.round(Object(s.rand)(0,1e9));Object(a.setCookie)(o,JSON.stringify({data:u,uniqueId:n}),.01)}))}function c(t,e){if(i.default.checkVersion()){if(!0!==i.default.get(r)){i.default.set(r,!0);try{t()}catch(t){}return void i.default.set(r,!1)}e||setTimeout((function(){return c(t,!0)}),100)}else t()}r="lock_m_stats_cookie_lock",o="remixmsts"},HLtZ:function(t,e,n){"use strict";n.r(e),n.d(e,"RavenErrorData",(function(){return r.RavenErrorData})),n.d(e,"RavenStacktrace",(function(){return r.RavenStacktrace})),n.d(e,"PreparedErrorMessage",(function(){return r.PreparedErrorMessage})),n.d(e,"prepareError",(function(){return o})),n.d(e,"getRavenXhrTransport",(function(){return c})),n.d(e,"logError",(function(){return f})),n.d(e,"debugBufferLog",(function(){return l})),n.d(e,"logEvalError",(function(){return d}));var r=n("mXS3");function o(t,e){var n=t.exception&&t.exception.values[0]||{type:"Message",value:t.message+a(t),stacktrace:t.stacktrace||{frames:[]}};"Error"===n.type&&n.value.startsWith("Non-Error exception captured with keys:")&&(n.value+=a(t)),!n.value&&t.message&&(n.value=t.message);var r=n.type,o=n.value,u=n.stacktrace,c=window.location,f=c.origin,d=c.protocol,l=c.hostname,v=c.port,g=c.href;v=v?":"+v:"",f=f||d+"//"+l+v;var p=t.environment,w=t.transaction,m=t.breadcrumbs;return{id:t.event_id,module:p||e(w,u,o),type:r,value:o,file:w,breadcrumbs:s(m),stacktrace:i(u,f),page:g,release:window.vk.rv,time:window.vk.ts+Math.floor(((new Date).getTime()-window.vk.started)/1e3)}}function a(t){return t.extra&&t.extra.__serialized__?"\n"+JSON.stringify(t.extra.__serialized__).slice(0,500):""}function s(t){if(!t||!t.values||0===t.values.length)return"";var e=t.values[0],n=e.data,r=e.category,o=e.message;return"xhr"===r?n.method+":"+n.status_code+":"+n.url:"custom"===r?o+":"+JSON.stringify(n):""}function i(t,e){var n=[];return t.frames.forEach((function(t,r){0===r&&(t.filename.includes("raven_logger.js")||t.filename.includes("raven.js"))||n.push(t.filename.replace(e,"")+":"+t.lineno+":"+t.colno+":"+t.function)})),n}var u=n("Bj12"),c=function(t){return function(e){var n=e.data,r=e.onSuccess,o=t(n);Object(u.saveJsErrorLogs)(o),r()}};function f(t,e){if(void 0===e&&(e={}),window.Raven){var n=e.breadcrumb,r=e.environment;n&&window.Raven.captureBreadcrumb({message:n.message,category:"custom",data:n.data}),r?window.Raven.captureException(t,{environment:r}):window.Raven.captureException(t)}}function d(t,e){window.Raven&&(e&&e.length>2e3&&(e=e.slice(0,1e3)+"..."+e.slice(-1e3)),t.message+=": "+e,f(t))}function l(t){return f(t,{environment:"debugLog"})}},J8bf:function(t,e,n){"use strict";n.r(e),n.d(e,"getCookie",(function(){return a})),n.d(e,"setCookie",(function(){return s})),n.d(e,"initCookies",(function(){return i}));var r=n("W9Tc"),o=n("DM2o");function a(t){return function(){window._cookies={};for(var t=document.cookie.split(";"),e=/^[\s]*([^\s]+?)$/i,n=0,r=t.length;n<r;n++){var o=t[n].split("=");2===o.length&&(_cookies[o[0].match(e)[1]]=unescape(o[1].match(e)?o[1].match(e)[1]:""))}}(),"https:"!==location.protocol&&Object(o.statlogsValueEvent)("read_unsecure_cookie",t,location.href),_cookies[t]}function s(t,e,n,o,a,s){void 0===a&&(a="None"),void 0===s&&(s=window.locDomain);var i=t+"="+escape(e),u="; path=/"+(s?"; domain=."+s:""),c="https:"===location.protocol,f=!!o;Object(r.partConfigEnabled)("cookie_secure_default_true")&&(f=!1!==o);var d=c&&f?"; secure":"",l=f&&browser.chrome&&parseInt(browser.version)>=71&&Object(r.partConfigEnabled)("cookie_class_samesite")?"; SameSite="+a:"",v="";if(n){var g=new Date;g.setTime(g.getTime()+24*n*60*60*1e3),v="; expires="+g.toGMTString()}document.cookie=i+v+u+l+d}function i(){window._cookies={}}},W9Tc:function(t,e,n){"use strict";n.r(e),n.d(e,"partConfigEnabled",(function(){return o})),n.d(e,"getTestGroup",(function(){return a})),n.d(e,"calculateTimeOffsets",(function(){return s}));var r=n("J8bf");function o(t){var e=(window.vk||{}).pe;return!!(void 0===e?{}:e)[t]}function a(t){var e=(window.vk||{}).ex;return(void 0===e?{}:e)[t]||null}function s(){var t=window.vk.ts;if(t&&!window.browser.opera_mobile){var e=new Date,n=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds())/1e3-t;n-=10800,n=(n/=60).toFixed(0),(n*=60)<-55800?n+=86400:n>37800&&(n-=86400);var o=0,a=Math.abs(n);[-12,-11,-10,-9.5,-9,-8,-7,-6,-5,-4.5,-4,-3.5,-3,-2,-1,0,1,2,3,3.5,4,4.5,5,5.5,5.75,6,6.5,7,8,8.75,9,9.5,10,10.5,11,12,12.75,13,14].forEach((function(t){var e=Math.round(3600*(t-3)),r=Math.abs(n-e);r<a&&(a=r,o=e)}));var s=Object(r.getCookie)("remixdt");return void 0!==s&&intval(s)===o||Object(r.setCookie)("remixdt",o,365),o}return 0}},Xrg9:function(t,e,n){"use strict";n.r(e);var r=n("tGJf");function o(t){try{r.vkLocalStorage.removeItem(t)}catch(t){}}e.default={checkVersion:function(){try{return void 0!==window.localStorage&&null!==window.localStorage&&void 0!==window.JSON}catch(t){return!1}},remove:o,get:function(t){try{return JSON.parse(r.vkLocalStorage.getItem(t))}catch(t){return!1}},set:function(t,e){o(t);try{return r.vkLocalStorage.setItem(t,JSON.stringify(e))}catch(t){return!1}}}},jE6c:function(t,e,n){"use strict";n.r(e),n.d(e,"rand",(function(){return o})),n.d(e,"replaceEntities",(function(){return m})),n.d(e,"isArray",(function(){return c})),n.d(e,"isEmpty",(function(){return d})),n.d(e,"isFunction",(function(){return s})),n.d(e,"isFormData",(function(){return i})),n.d(e,"isHttpHref",(function(){return E})),n.d(e,"isNumeric",(function(){return l})),n.d(e,"isObject",(function(){return f})),n.d(e,"isString",(function(){return u})),n.d(e,"isUndefined",(function(){return a})),n.d(e,"irand",(function(){return k})),n.d(e,"escapeAttr",(function(){return p})),n.d(e,"escapeRE",(function(){return v})),n.d(e,"escapeStr",(function(){return S})),n.d(e,"each",(function(){return j})),n.d(e,"htsc",(function(){return g})),n.d(e,"copy",(function(){return T})),n.d(e,"vkNow",(function(){return O})),n.d(e,"locBase",(function(){return r})),n.d(e,"unescapeAttr",(function(){return w})),n.d(e,"utf2win",(function(){return b})),n.d(e,"srand",(function(){return y})),n.d(e,"stripTags",(function(){return h})),n.d(e,"defaults",(function(){return I})),n.d(e,"intval",(function(){return _})),n.d(e,"vkImage",(function(){return A})),n.d(e,"isElement",(function(){return D}));var r=function(){return location.toString().replace(/#.+$/,"")},o=function(t,e){return Math.random()*(e-t+1)+t},a=function(t){return void 0===t},s=function(t){return t&&"[object Function]"===Object.prototype.toString.call(t)},i=function(t){return t&&"[object FormData]"===Object.prototype.toString.call(t)},u=function(t){return"string"==typeof t},c=function(t){return"[object Array]"===Object.prototype.toString.call(t)},f=function(t){return"[object Object]"===Object.prototype.toString.call(t)},d=function(t){if(!f(t))return!1;for(var e in t)if(t.hasOwnProperty(e))return!1;return!0},l=function(t){return!isNaN(parseFloat(t))&&isFinite(t)&&!Array.isArray(t)},v=function(t){return t?t.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1"):""},g=function(t){return t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\'/g,"&#39;").replace(/%/g,"&#37;")},p=function(t){return t.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/\'/g,"&#39;")},w=function(t){return t.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")},m=function(t){return ce("textarea",{innerHTML:(t||"").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}).value},S=function(t){return t.replace(/\'/g,"\\'")},h=function(t){return t.replace(/<[^>]+>/g,"")},y=function(){return Math.random().toString(36).substr(2)},k=function(t,e){return Math.floor(o(t,e))},b=function(t){return unescape(encodeURIComponent(t))};function E(t){var e=(t+"").split(":"),n=e[1]&&e[0]?e[0]+":":location.protocol;return"http:"===n||"https:"===n}var O=function(){return+new Date};function _(t){return!0===t?1:parseInt(t)||0}function j(t,e){if(!t)return t;if(f(t)||void 0===t.length){for(var n in t)if(t.hasOwnProperty(n)&&!1===e.call(t[n],n,t[n]))break}else for(var r=0,o=t.length;r<o;r++){var a=t[r];if(!1===e.call(a,r,a))break}return t}function T(t){return c(t)?t.concat([]):f(t)?extend({},t):t}var I=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return Object.assign.apply(Object,[{},t].concat(n.reverse(),[t]))},A=function(){return window.Image?new Image:ce("img")},D=function(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName}},mMuO:function(t,e,n){"use strict";n.r(e),n.d(e,"saveJsErrorLogs",(function(){return b})),n.d(e,"saveStatlogEvents",(function(){return E})),n.d(e,"saveProductionStats",(function(){return O})),n.d(e,"saveNetworkStats",(function(){return _})),n.d(e,"saveCustomStats",(function(){return j})),n.d(e,"saveStoryViewStats",(function(){return T}));var r=n("tGJf"),o=n("W9Tc");function a(t,e){Object(o.partConfigEnabled)("web_stats_transport_debugger")&&console.log("[new transport debug] "+t,e)}var s="XHR_STATS_TRANSPORT_DATA_mvk",i="XHR_STATS_TRANSPORT_META_mvk",u="XHR_STATS_TRANSPORT_DATA_LOCK_mvk";function c(t){if("locked"!==r.vkSessionStorage.getItem(u)){a("writeLocked","lock"),r.vkSessionStorage.setItem(u,"locked");try{t()}catch(t){}return a("writeLocked","free"),void r.vkSessionStorage.setItem(u,"free")}setTimeout((function(){return c(t)}),100)}function f(t){r.vkLocalStorage.setItem(s,JSON.stringify(t))}function d(){var t,e=!0;try{var n=r.vkLocalStorage.getItem(s);if(!n)throw new Error("empty data");t={jsErrorLogs:[],statlogEvents:[],productionStats:[],storyViewStats:[],networkStats:[],customStats:[]};var o=JSON.parse(n);Array.isArray(o.jsErrorLogs)&&(e=!1,t.jsErrorLogs=o.jsErrorLogs),Array.isArray(o.statlogEvents)&&(e=!1,t.statlogEvents=o.statlogEvents),Array.isArray(o.productionStats)&&(e=!1,t.productionStats=o.productionStats),Array.isArray(o.storyViewStats)&&(e=!1,t.storyViewStats=o.storyViewStats),Array.isArray(o.networkStats)&&(e=!1,t.networkStats=o.networkStats),Array.isArray(o.customStats)&&(e=!1,t.customStats=o.customStats)}catch(e){t={jsErrorLogs:[],statlogEvents:[],productionStats:[],storyViewStats:[],networkStats:[],customStats:[]}}return{webStatsData:t,isEmpty:e}}function l(){r.vkLocalStorage.setItem(s,"")}function v(t){r.vkSessionStorage.setItem(i,t.toString())}var g,p=function(){return(p=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},w=1;function m(t){return!!Object(o.partConfigEnabled)("web_stats_send_on_events_limit")&&(1===w&&(e=t).customStats.length+e.jsErrorLogs.length+e.networkStats.length+e.productionStats.length+e.statlogEvents.length+e.storyViewStats.length>300);var e}function S(t){var e,n=+new Date,s=(e=r.vkSessionStorage.getItem(i))?parseInt(e):0;0===s&&v(s=n);var u,p=n-s,w=p/1e3,S=m(t);a("saveStats",{nowMs:n,lastTransferTimeMs:s,timePassed:w+"s",statsData:t}),Object(o.partConfigEnabled)("web_stats_debounce")?(f(t),u=function(t,e){return e?0:0===t||t>6e4?3e3:12e4}(p,S),window.clearTimeout(g),g=window.setTimeout((function(){return c((function(){var t=d().webStatsData,e=+new Date;y(t),l(),v(e)}))}),u)):p>6e4||S?(y(t),l(),v(n)):(f(t),window.setTimeout(h,12e4))}function h(){c((function(){var t=d(),e=t.webStatsData;t.isEmpty||S(e)}))}function y(t){a("send",t);var e,n,r,o,s=window.vk,i=s.id,u=s.wsTransport,f=s.statsMeta,d=u+(window.vk&&window.vk.statsMeta&&window.vk.statsMeta.st?"/web-stats/s":"/web-stats/p"),l=p(p({},t),{id:i,st:f.st,platform:f.platform,signTime:f.time,sign:f.hash,attempt:w});(e="POST",n=d,r=l,new Promise((function(t,a){var s=new XMLHttpRequest;s.open(e,n),n.includes("tau.vk.com")&&(s.withCredentials=!0),s.onload=function(){this.status>=200&&this.status<300?t(s.response):a({status:this.status,statusText:s.statusText})},s.onerror=function(){a({status:this.status,statusText:s.statusText})},s.setRequestHeader("Content-Type","application/json;charset=UTF-8"),o&&o.headers&&Object.keys(o.headers).forEach((function(t){s.setRequestHeader(t,o.headers[t])})),s.send(JSON.stringify(r))}))).then((function(t){a("sendStats success",t),w=1})).catch((function(e){return w++,c((function(){a("sendStats try",w),S(t)})),a("sendStats error",e),!0})),v(+new Date)}var k=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var a=arguments[e],s=0,i=a.length;s<i;s++,o++)r[o]=a[s];return r};function b(t){c((function(){var e=d().webStatsData;e.jsErrorLogs.push(t),a("saveJsErrorLogs",t),S(e)}))}function E(t){c((function(){var e=d().webStatsData,n=Math.round(Date.now()/1e3),r=t.name,o=t.value,s=t.keys;e.statlogEvents.push(k([n,r,o],s)),a("saveStatlogEvents",t),S(e)}))}function O(t){c((function(){var e=d().webStatsData;e.productionStats.push(t),a("saveProductionStats",t),S(e)}))}function _(t){c((function(){var e=d().webStatsData;e.networkStats.push(t),a("saveNetworkStats",t),S(e)}))}function j(t){c((function(){var e=d().webStatsData;e.customStats.push(t),a("saveCustomStats",t),S(e)}))}function T(t){c((function(){var e=d().webStatsData;e.storyViewStats.push(t),a("saveStoryViewStats",t),S(e)}))}},mXS3:function(t,e){},tGJf:function(t,e,n){"use strict";n.r(e),n.d(e,"vkLocalStorage",(function(){return u})),n.d(e,"vkSessionStorage",(function(){return f}));var r,o=function(){function t(){var t=this;this.data={},this.getItem=function(e){return t.data.hasOwnProperty(e)?t.data[e]:null},this.keys=function(){return Object.keys(t.data)}}return t.prototype.setItem=function(t,e){this.data[t]=String(e)},t.prototype.removeItem=function(t){delete this.data[t]},t.prototype.clear=function(){this.data={}},Object.defineProperty(t.prototype,"length",{get:function(){return Object.keys(this.data).length},enumerable:!0,configurable:!0}),t.prototype.key=function(t){return Object.keys(this.data)[t]},t}(),a="vk-ls-dummy";function s(){if(r)return r;try{if(window.localStorage.setItem(a,"test"),"test"!==window.localStorage.getItem(a))throw new Error("localStorage is broken");window.localStorage.removeItem(a),r=window.localStorage}catch(t){r=new o}return r}var i,u={setItem:function(t,e){return s().setItem(t,e)},getItem:function(t){return s().getItem(t)},removeItem:function(t){return s().removeItem(t)},clear:function(){return s().clear()},length:function(){return s().length},key:function(t){return s().key(t)},keys:function(){var t=s();return t instanceof o?t.keys():Object.keys(t)},getPrefixedKeys:function(t){return u.keys().filter((function(e){return e.startsWith(t)}))}};function c(){if(i)return i;try{if(window.sessionStorage.setItem(a,"test"),"test"!==window.sessionStorage.getItem(a))throw new Error("sessionStorage is broken");window.sessionStorage.removeItem(a),i=window.sessionStorage}catch(t){i=new o}return i}var f={setItem:function(t,e){return c().setItem(t,e)},getItem:function(t){return c().getItem(t)},removeItem:function(t){return c().removeItem(t)},clear:function(){return c().clear()},length:function(){return c().length},key:function(t){return c().key(t)},keys:function(){var t=c();return t instanceof o?t.keys():Object.keys(t)},getPrefixedKeys:function(t){return f.keys().filter((function(e){return e.startsWith(t)}))}}}}]);