!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(n=n||self).PseudoWindow=e()}(this,(function(){"use strict";var n=Object.prototype.hasOwnProperty,e=function(n,e,o){var t="&"===e[0],r="~"===(e=t?e.slice(1):e)[0],u="!"===(e=r?e.slice(1):e)[0];return{o:n,t:e=u?e.slice(1):e,u:o,i:{once:r,capture:u,passive:t}}},o=function(o,t){var r,u,f=[];for(var i in t)if(r=t,u=i,n.call(r,u)){var d=t[i],c=e(o,i,d);c.o.addEventListener(c.t,c.u,c.i),f.push(c)}return function(){return function(n){for(var e;e=n.shift();)e.o.removeEventListener(e.t,e.u,e.i)}(f)}},t=function(n){var e=o(n.props.document?window.document:window,n.listeners);n.parent.$once("hook:beforeUpdate",e),n.parent.$once("hook:destroyed",e)};return{name:"pseudo-window",functional:!0,props:{document:Boolean},render:function(n,e){return e.parent._isMounted?t(e):e.parent.$once("hook:mounted",(function(){t(e)})),e.slots().default}}}));
