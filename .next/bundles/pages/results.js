module.exports=__NEXT_REGISTER_PAGE("/results",function(){var e=webpackJsonp([7],{232:function(e,t,r){e.exports=r(233)},233:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});var n=r(8);var a=r.n(n);var o=r(0);var u=r.n(o);var l=r(27);var s=r.n(l);var c=r(18);var i=r(26);var f=r(17);var p=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||false;n.configurable=true;"value"in n&&(n.writable=true);Object.defineProperty(e,n.key,n)}}return function(t,r,n){r&&e(t.prototype,r);n&&e(t,n);return t}}();function d(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){function n(a,o){try{var u=t[a](o);var l=u.value}catch(e){r(e);return}if(!u.done)return Promise.resolve(l).then(function(e){n("next",e)},function(e){n("throw",e)});e(l)}return n("next")})}}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function h(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}r(28).polyfill();var b=r(29);var y={host:"localhost",port:"8080",path:"/",rejectUnauthorized:false};var w=new b.Agent(y);var _=function e(t){return t.map(function(e){u.a.createElement("li",null,e.player," ",e.count)})};var E=function(e){h(t,e);p(t,null,[{key:"getInitialProps",value:function(){var e=d(a.a.mark(function e(t){var r=t.req,n=t.res;var o,u,l;return a.a.wrap(function e(t){while(1)switch(t.prev=t.next){case 0:o=1;if(r.user)o=r.user.p_game;else{r.session.redirect="game";n.redirect("../createuser")}t.next=4;return s()("https://"+r.headers.host+"/leaderboard/"+o+"}",{agent:w});case 4:u=t.sent;t.next=7;return u.json();case 7:l=t.sent;return t.abrupt("return",{user:r.user,leaderboard:l});case 9:case"end":return t.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]);function t(e){v(this,t);var r=m(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));r.componentDidMount=function(){console.log("user:");if(!window.localStorage.getItem("NFCHUNT_USER")||window.localStorage.getItem("NFCHUNT_USER")!==r.state.user.p_id){window.localStorage.setItem("NFCHUNT_USER",r.state.user.p_id);window.localStorage.setItem("NFCHUNT_GAME",r.state.user.p_game)}};r.state={user:e.user,leaderboard:e.leaderboard};return r}p(t,[{key:"render",value:function e(){var t=this.props.leaderboard;return u.a.createElement("div",{className:"container"},u.a.createElement(c["default"],null),u.a.createElement("div",{className:"box"},u.a.createElement("h2",null,"Leaderboard"),u.a.createElement("ul",null,t.map(function(e){return u.a.createElement("li",{key:e.player},e.player," ",e.count)}))),u.a.createElement(i["default"],{user:this.props.user}),u.a.createElement(f["default"],null))}}]);return t}(u.a.Component);t["default"]=E}},[232]);return{page:e.default}});