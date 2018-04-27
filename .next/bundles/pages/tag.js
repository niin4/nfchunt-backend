module.exports=__NEXT_REGISTER_PAGE("/tag",function(){var t=webpackJsonp([1],{234:function(t,e,n){t.exports=n(235)},235:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var r=n(8);var a=n.n(r);var o=n(1);var u=n.n(o);var s=n(236);var i=n.n(s);var c=n(26);var l=n.n(c);var f=n(17);var p=n(16);var h=n(25);var g=n(81);var d=n.n(g);var m=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;"value"in r&&(r.writable=true);Object.defineProperty(t,r.key,r)}}return function(e,n,r){n&&t(e.prototype,n);r&&t(e,r);return e}}();function v(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function r(a,o){try{var u=e[a](o);var s=u.value}catch(t){n(t);return}if(!u.done)return Promise.resolve(s).then(function(t){r("next",t)},function(t){r("throw",t)});t(s)}return r("next")})}}function w(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==typeof e&&"function"!==typeof e?t:e}function y(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:false,writable:true,configurable:true}});e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}n(27).polyfill();var b=n(28);var E={host:"localhost",port:"8080",path:"/",rejectUnauthorized:false};var P=new b.Agent(E);var j=function(t){y(e,t);m(e,null,[{key:"getInitialProps",value:function(){var t=v(a.a.mark(function t(e){var n=e.req,r=e.res;var o,u,s,i;return a.a.wrap(function t(e){while(1)switch(e.prev=e.next){case 0:o=n.originalUrl.split("/");u=o[2];n.session.redirect="tag/"+u;n.session.redirecttype="tag";n.user||r.redirect("../createuser");e.next=7;return l()("https://"+n.headers.host+"/tags/"+u,{agent:P});case 7:s=e.sent;e.next=10;return s.json();case 10:i=e.sent;return e.abrupt("return",{id:u,tag:i,user:n.user});case 12:case"end":return e.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}()}]);function e(t){w(this,e);var n=_(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));n.componentDidMount=function(){if(!window.localStorage.getItem("NFCHUNT_USER")){window.localStorage.setItem("NFCHUNT_USER",n.state.user.p_id);window.localStorage.setItem("NFCHUNT_GAME",n.state.user.p_game)}n.state.user.p_game==n.state.tag.game_id?g["postFoundTag"](n.state.user,n.state.tag).then(function(t){console.log(t.status);if(201==t.status||200==t.status||304==t.status){console.log("getting hint");g["getHint"](n.state.user.p_id).then(function(t){return n.setState({hint:t.hint})})}else 303==t.status&&n.setState({gamestatus:"won"})}):g["getHint"](n.state.user.p_id).then(function(t){return n.setState({hint:t.hint})})};n.state={id:t.id,tag:t.tag,user:t.user,gamestatus:"tagfound"};return n}m(e,[{key:"render",value:function t(){var e=this.state.tag;return u.a.createElement("div",{className:"container"},u.a.createElement(f["default"],null),e.status?u.a.createElement("div",{className:"box"},e.status):u.a.createElement("div",{className:"box"},u.a.createElement("h2",null,"You found tag ",e.tag,"!"),u.a.createElement("p",null,"from ",e.game),"tagfound"==this.state.gamestatus?u.a.createElement("div",null,u.a.createElement("div",{className:"hint"},this.state.hint)):u.a.createElement("div",null,u.a.createElement("h2",null,"Grats! You won!"))),u.a.createElement(h["default"],{user:this.props.user}),u.a.createElement(p["default"],null))}}]);return e}(u.a.Component);e["default"]=j},236:function(t,e,n){t.exports=n(49)},81:function(t,e,n){"use strict";e.getTag=function(t){return new Promise(function(e,n){fetch("https://"+window.location.host+"/tags/"+t).then(function(t){return t.json()}).then(function(t){return e(t)}).catch(function(t){return n(t)})})};e.getHint=function(t){return new Promise(function(e,n){fetch("https://"+window.location.host+"/hint/"+t).then(function(t){return t.json()}).then(function(t){return e(t)}).catch(function(t){return n(t)})})};e.postFoundTag=function(t,e){return new Promise(function(n,r){fetch("https://"+window.location.host+"/tagsfound",{body:JSON.stringify({tag:e.tag_id,player:t.p_id,game:e.game_id,current:t.p_current}),method:"POST",headers:{"Content-Type":"application/json"}}).then(function(t){return n(t)}).catch(function(t){return r(t)})})}}},[234]);return{page:t.default}});