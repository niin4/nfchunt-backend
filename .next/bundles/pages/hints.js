module.exports=__NEXT_REGISTER_PAGE("/hints",function(){var e=webpackJsonp([2],{14:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(0);var a=n.n(r);var o=function e(t){return a.a.createElement("div",{className:"labelbox"},a.a.createElement("div",{className:"labelbox__title"},t.title),a.a.createElement("div",{className:"labelbox__body"},t.children))};t["default"]=o},227:function(e,t,n){e.exports=n(228)},228:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(8);var a=n.n(r);var o=n(0);var u=n.n(o);var i=n(27);var c=n.n(i);var s=n(18);var l=n(26);var f=n(17);var p=n(14);var h=n(82);var d=n.n(h);var v=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;"value"in r&&(r.writable=true);Object.defineProperty(e,r.key,r)}}return function(t,n,r){n&&e(t.prototype,n);r&&e(t,r);return t}}();function m(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var u=t[a](o);var i=u.value}catch(e){n(e);return}if(!u.done)return Promise.resolve(i).then(function(e){r("next",e)},function(e){r("throw",e)});e(i)}return r("next")})}}function _(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function w(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n(28).polyfill();var b=n(29);var y={host:"localhost",port:"8080",path:"/",rejectUnauthorized:false};var E=new b.Agent(y);var N=function(e){w(t,e);v(t,null,[{key:"getInitialProps",value:function(){var e=m(a.a.mark(function e(t){var n=t.req,r=t.res;var o,u,i,s;return a.a.wrap(function e(t){while(1)switch(t.prev=t.next){case 0:o=1;u=1;if(n.user){o=n.user.p_id;u=n.user.p_game}else{n.session.redirect="game";r.redirect("../createuser")}t.next=5;return c()("https://"+n.headers.host+"/tagsfound?player="+o+"&game="+u,{agent:E});case 5:i=t.sent;t.next=8;return i.json();case 8:s=t.sent;return t.abrupt("return",{user:n.user,hints:s});case 10:case"end":return t.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]);function t(e){_(this,t);var n=g(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.componentDidMount=function(){if(!window.localStorage.getItem("NFCHUNT_USER")||window.localStorage.getItem("NFCHUNT_USER")!==n.state.user.p_id){window.localStorage.setItem("NFCHUNT_USER",n.state.user.p_id);window.localStorage.setItem("NFCHUNT_GAME",n.state.user.p_game)}h["getHint"](n.state.user.p_id).then(function(e){return n.setState({hint:e.hint})})};n.state={user:e.user};return n}v(t,[{key:"render",value:function e(){var t=this.props.hints;return u.a.createElement("div",{className:"container"},u.a.createElement(s["default"],null),u.a.createElement("div",{className:"box"},u.a.createElement("h2",null,"Current hint:"),u.a.createElement("p",null,this.state.hint)),t.status?null:u.a.createElement(p["default"],{title:"Found tags"},u.a.createElement("ul",null,t.map(function(e){return u.a.createElement("li",{key:e.id},u.a.createElement("h4",null,e.tag),e.hint)}))),u.a.createElement(l["default"],{user:this.props.user}),u.a.createElement(f["default"],null))}}]);return t}(u.a.Component);t["default"]=N},82:function(e,t,n){"use strict";t.getTag=function(e){return new Promise(function(t,n){fetch("https://"+window.location.host+"/tags/"+e).then(function(e){return e.json()}).then(function(e){return t(e)}).catch(function(e){return n(e)})})};t.getHint=function(e){return new Promise(function(t,n){fetch("https://"+window.location.host+"/hint/"+e).then(function(e){return e.json()}).then(function(e){return t(e)}).catch(function(e){return n(e)})})};t.postFoundTag=function(e,t){return new Promise(function(n,r){fetch("https://"+window.location.host+"/tagsfound",{body:JSON.stringify({tag:t.tag_id,player:e.p_id,game:t.game_id,current:e.p_current}),method:"POST",headers:{"Content-Type":"application/json"}}).then(function(e){return n(e)}).catch(function(e){return r(e)})})}}},[227]);return{page:e.default}});