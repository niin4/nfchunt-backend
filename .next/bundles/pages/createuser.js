module.exports=__NEXT_REGISTER_PAGE("/createuser",function(){var e=webpackJsonp([2],{13:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n="function"==typeof fetch?fetch.bind():function(e,t){t=t||{};return new Promise(function(r,n){var o=new XMLHttpRequest;o.open(t.method||"get",e);for(var i in t.headers)o.setRequestHeader(i,t.headers[i]);o.withCredentials="include"==t.credentials;o.onload=function(){r(u())};o.onerror=n;o.send(t.body);function u(){var e=[],t=[],r={},n;o.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm,function(o,i,u){e.push(i=i.toLowerCase());t.push([i,u]);n=r[i];r[i]=n?n+","+u:u});return{ok:1==(o.status/200|0),status:o.status,statusText:o.statusText,url:o.responseURL,clone:u,text:function(){return Promise.resolve(o.responseText)},json:function(){return Promise.resolve(o.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([o.response]))},headers:{keys:function(){return e},entries:function(){return t},get:function(e){return r[e.toLowerCase()]},has:function(e){return e.toLowerCase()in r}}}}})};t["default"]=n},186:function(e,t,r){e.exports=r(187)},187:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=r(16);var o=r.n(n);var i=r(4);var u=r.n(i);var s=r(34);var a=r.n(s);var c=r(33);var f=r(32);var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;"value"in n&&(n.writable=true);Object.defineProperty(e,n.key,n)}}return function(t,r,n){r&&e(t.prototype,r);n&&e(t,n);return t}}();function h(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(o,i){try{var u=t[o](i);var s=u.value}catch(e){r(e);return}if(!u.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}return n("next")})}}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function d(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}r(72).polyfill();var _=function(e){d(t,e);l(t,null,[{key:"getInitialProps",value:function(){var e=h(o.a.mark(function e(t){var r=t.req;var n,i,u,s;return o.a.wrap(function e(t){while(1)switch(t.prev=t.next){case 0:n=r.session.redirect.split("/");i=n[1];t.next=4;return a()("https://"+r.headers.host+"/tags/"+i);case 4:u=t.sent;t.next=7;return u.json();case 7:s=t.sent;return t.abrupt("return",{tag:s,redirect:r.session.redirect});case 9:case"end":return t.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]);function t(e){v(this,t);var r=p(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));r.createUser=function(e){if(!r.state.user.length){e.preventDefault();console.log("Missing username")}};r.handleChange=function(e){r.setState({user:event.target.value})};r.state={tag:e.tag,redirect:e.redirect,user:""};return r}l(t,[{key:"render",value:function e(){var t=this.state.tag;return u.a.createElement("div",null,u.a.createElement(c["default"],null),u.a.createElement("div",null,u.a.createElement("h3",null,"Game: ",t.game),u.a.createElement("h2",null,"Create user:"),u.a.createElement("form",{action:"/signup",method:"POST",onSubmit:this.createUser},u.a.createElement("input",{type:"text",name:"name",value:this.state.user,onChange:this.handleChange}),u.a.createElement("input",{type:"hidden",name:"game",value:t.game_id}),u.a.createElement("button",{type:"submit"},"Create user"))),u.a.createElement("p",null,this.state.user),u.a.createElement(f["default"],null))}}]);return t}(u.a.Component);t["default"]=_},34:function(e,t,r){e.exports=window.fetch||(window.fetch=r(13).default||r(13))},72:function(e,t,r){(function(t,r){(function(t,r){e.exports=r()})(this,function(){"use strict";function e(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)}function n(e){return"function"===typeof e}var o=void 0;o=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var i=o;var u=0;var s=void 0;var a=void 0;var c=function e(t,r){E[u]=t;E[u+1]=r;u+=2;2===u&&(a?a(A):j())};function f(e){a=e}function l(e){c=e}var h="undefined"!==typeof window?window:void 0;var v=h||{};var p=v.MutationObserver||v.WebKitMutationObserver;var d="undefined"===typeof self&&"undefined"!==typeof t&&"[object process]"==={}.toString.call(t);var _="undefined"!==typeof Uint8ClampedArray&&"undefined"!==typeof importScripts&&"undefined"!==typeof MessageChannel;function y(){return function(){return t.nextTick(A)}}function m(){if("undefined"!==typeof s)return function(){s(A)};return g()}function b(){var e=0;var t=new p(A);var r=document.createTextNode("");t.observe(r,{characterData:true});return function(){r.data=e=++e%2}}function w(){var e=new MessageChannel;e.port1.onmessage=A;return function(){return e.port2.postMessage(0)}}function g(){var e=setTimeout;return function(){return e(A,1)}}var E=new Array(1e3);function A(){for(var e=0;e<u;e+=2){var t=E[e];var r=E[e+1];t(r);E[e]=void 0;E[e+1]=void 0}u=0}function P(){try{var e=Function("return this")().require("vertx");s=e.runOnLoop||e.runOnContext;return m()}catch(e){return g()}}var j=void 0;j=d?y():p?b():_?w():void 0===h&&true?P():g();function x(e,t){var r=this;var n=new this.constructor(C);void 0===n[S]&&V(n);var o=r._state;if(o){var i=arguments[o-1];c(function(){return W(o,n,i,r._result)})}else X(r,n,e,t);return n}function O(e){var t=this;if(e&&"object"===typeof e&&e.constructor===t)return e;var r=new t(C);Y(r,e);return r}var S=Math.random().toString(36).substring(2);function C(){}var T=void 0;var M=1;var k=2;var R={error:null};function L(){return new TypeError("You cannot resolve a promise with itself")}function q(){return new TypeError("A promises callback cannot return that same promise.")}function U(e){try{return e.then}catch(e){R.error=e;return R}}function F(e,t,r,n){try{e.call(t,r,n)}catch(e){return e}}function G(e,t,r){c(function(e){var n=false;var o=F(r,t,function(r){if(n)return;n=true;t!==r?Y(e,r):I(e,r)},function(t){if(n)return;n=true;J(e,t)},"Settle: "+(e._label||" unknown promise"));if(!n&&o){n=true;J(e,o)}},e)}function H(e,t){t._state===M?I(e,t._result):t._state===k?J(e,t._result):X(t,void 0,function(t){return Y(e,t)},function(t){return J(e,t)})}function N(e,t,r){if(t.constructor===e.constructor&&r===x&&t.constructor.resolve===O)H(e,t);else if(r===R){J(e,R.error);R.error=null}else void 0===r?I(e,t):n(r)?G(e,t,r):I(e,t)}function Y(t,r){t===r?J(t,L()):e(r)?N(t,r,U(r)):I(t,r)}function D(e){e._onerror&&e._onerror(e._result);B(e)}function I(e,t){if(e._state!==T)return;e._result=t;e._state=M;0!==e._subscribers.length&&c(B,e)}function J(e,t){if(e._state!==T)return;e._state=k;e._result=t;c(D,e)}function X(e,t,r,n){var o=e._subscribers;var i=o.length;e._onerror=null;o[i]=t;o[i+M]=r;o[i+k]=n;0===i&&e._state&&c(B,e)}function B(e){var t=e._subscribers;var r=e._state;if(0===t.length)return;var n=void 0,o=void 0,i=e._result;for(var u=0;u<t.length;u+=3){n=t[u];o=t[u+r];n?W(r,n,o,i):o(i)}e._subscribers.length=0}function K(e,t){try{return e(t)}catch(e){R.error=e;return R}}function W(e,t,r,o){var i=n(r),u=void 0,s=void 0,a=void 0,c=void 0;if(i){u=K(r,o);if(u===R){c=true;s=u.error;u.error=null}else a=true;if(t===u){J(t,q());return}}else{u=o;a=true}t._state!==T||(i&&a?Y(t,u):c?J(t,s):e===M?I(t,u):e===k&&J(t,u))}function $(e,t){try{t(function t(r){Y(e,r)},function t(r){J(e,r)})}catch(t){J(e,t)}}var z=0;function Q(){return z++}function V(e){e[S]=z++;e._state=void 0;e._result=void 0;e._subscribers=[]}function Z(){return new Error("Array Methods must be provided an Array")}var ee=function(){function e(e,t){this._instanceConstructor=e;this.promise=new e(C);this.promise[S]||V(this.promise);if(i(t)){this.length=t.length;this._remaining=t.length;this._result=new Array(this.length);if(0===this.length)I(this.promise,this._result);else{this.length=this.length||0;this._enumerate(t);0===this._remaining&&I(this.promise,this._result)}}else J(this.promise,Z())}e.prototype._enumerate=function e(t){for(var r=0;this._state===T&&r<t.length;r++)this._eachEntry(t[r],r)};e.prototype._eachEntry=function e(t,r){var n=this._instanceConstructor;var o=n.resolve;if(o===O){var i=U(t);if(i===x&&t._state!==T)this._settledAt(t._state,r,t._result);else if("function"!==typeof i){this._remaining--;this._result[r]=t}else if(n===ue){var u=new n(C);N(u,t,i);this._willSettleAt(u,r)}else this._willSettleAt(new n(function(e){return e(t)}),r)}else this._willSettleAt(o(t),r)};e.prototype._settledAt=function e(t,r,n){var o=this.promise;if(o._state===T){this._remaining--;t===k?J(o,n):this._result[r]=n}0===this._remaining&&I(o,this._result)};e.prototype._willSettleAt=function e(t,r){var n=this;X(t,void 0,function(e){return n._settledAt(M,r,e)},function(e){return n._settledAt(k,r,e)})};return e}();function te(e){return new ee(this,e).promise}function re(e){var t=this;return i(e)?new t(function(r,n){var o=e.length;for(var i=0;i<o;i++)t.resolve(e[i]).then(r,n)}):new t(function(e,t){return t(new TypeError("You must pass an array to race."))})}function ne(e){var t=this;var r=new t(C);J(r,e);return r}function oe(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function ie(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}var ue=function(){function e(t){this[S]=Q();this._result=this._state=void 0;this._subscribers=[];if(C!==t){"function"!==typeof t&&oe();this instanceof e?$(this,t):ie()}}e.prototype.catch=function e(t){return this.then(null,t)};e.prototype.finally=function e(t){var r=this;var n=r.constructor;return r.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){throw e})})};return e}();ue.prototype.then=x;ue.all=te;ue.race=re;ue.resolve=O;ue.reject=ne;ue._setScheduler=f;ue._setAsap=l;ue._asap=c;function se(){var e=void 0;if("undefined"!==typeof r)e=r;else if("undefined"!==typeof self)e=self;else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;if(t){var n=null;try{n=Object.prototype.toString.call(t.resolve())}catch(e){}if("[object Promise]"===n&&!t.cast)return}e.Promise=ue}ue.polyfill=se;ue.Promise=ue;return ue})}).call(t,r(69),r(70))}},[186]);return{page:e.default}});