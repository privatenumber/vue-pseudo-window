!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n=n||self).PseudoWindow=t()}(this,(function(){"use strict";var n=Object.prototype.hasOwnProperty,t=function(n,t,e){var o="&"===t[0],i="~"===(t=o?t.slice(1):t)[0],r="!"===(t=i?t.slice(1):t)[0];return{t:n,o:t=r?t.slice(1):t,i:e,u:{once:i,capture:r,passive:o}}},e=function(e,o,i){for(var r in e)if(d=e,c=r,n.call(d,c)){var u=e[r],f=t(o,r,u);f.t.addEventListener(f.o,f.i,f.u),i.push(f)}var d,c},o=function(n,t){return n.filter((function(n){if(t===n.t)return!0;n.t.removeEventListener(n.o,n.i,n.u)}))};return{name:"pseudo-window",props:{document:Boolean,body:Boolean},render:function(){var n=this.$slots.default;return n&&1===n.length?n[0]:n},data:function(){return{s:[]}},computed:{target:function(){return this.body?window.document.body:this.document?window.document:window}},mounted:function(){var n=this;e(this.$listeners,this.target,this.s),this.$watch((function(){return n.target}),(function(t){n.s=o(n.s,t),e(n.$listeners,t,n.s)}))},destroyed:function(){o(this.s)}}}));
