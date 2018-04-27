module.exports=__NEXT_REGISTER_PAGE("/hints",function(){var e=webpackJsonp([3],{225:function(e,t,n){e.exports=n(226)},226:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n(8);var o=n.n(r);var a=n(1);var u=n.n(a);var i=n(26);var s=n.n(i);var c=n(17);var l=n(25);var f=n(16);var p=n(81);var h=n.n(p);var d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;"value"in r&&(r.writable=true);Object.defineProperty(e,r.key,r)}}return function(t,n,r){n&&e(t.prototype,n);r&&e(t,r);return t}}();function m(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(o,a){try{var u=t[o](a);var i=u.value}catch(e){n(e);return}if(!u.done)return Promise.resolve(i).then(function(e){r("next",e)},function(e){r("throw",e)});e(i)}return r("next")})}}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function w(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n(27).polyfill();var _=n(28);var y={host:"localhost",port:"8080",path:"/",rejectUnauthorized:false};var E=new _.Agent(y);var b=function(e){w(t,e);d(t,null,[{key:"getInitialProps",value:function(){var e=m(o.a.mark(function e(t){var n=t.req,r=t.res;var a,u,i,c;return o.a.wrap(function e(t){while(1)switch(t.prev=t.next){case 0:console.log(n.user);a=1;u=1;if(n.user){a=n.user.p_id;u=n.user.p_game}else{n.session.redirect="game";r.redirect("../createuser")}t.next=6;return s()("https://"+n.headers.host+"/tagsfound?player="+a+"&game="+u,{agent:E});case 6:i=t.sent;t.next=9;return i.json();case 9:c=t.sent;return t.abrupt("return",{user:n.user,hints:c});case 11:case"end":return t.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}]);function t(e){v(this,t);var n=g(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));n.componentDidMount=function(){console.log("user:");if(!window.localStorage.getItem("NFCHUNT_USER")||window.localStorage.getItem("NFCHUNT_USER")!==n.state.user.p_id){window.localStorage.setItem("NFCHUNT_USER",n.state.user.p_id);window.localStorage.setItem("NFCHUNT_GAME",n.state.user.p_game)}p["getHint"](n.state.user.p_id).then(function(e){return n.setState({hint:e.hint})})};n.state={user:e.user};return n}d(t,[{key:"render",value:function e(){var t=this.props.hints;console.log(t);return u.a.createElement("div",{className:"container"},u.a.createElement(c["default"],null),u.a.createElement("div",{className:"box"},u.a.createElement("h2",null,"Current hint:"),this.state.hint,t.status?null:u.a.createElement("div",null,u.a.createElement("h3",null,"Found tags:"),u.a.createElement("ul",null,t.map(function(e){return u.a.createElement("li",{key:e.id},u.a.createElement("h4",null,e.tag),e.hint)})))),u.a.createElement(l["default"],{user:this.props.user}),u.a.createElement(f["default"],null))}}]);return t}(u.a.Component);t["default"]=b},81:function(e,t,n){"use strict";t.getTag=function(e){return new Promise(function(t,n){fetch("https://"+window.location.host+"/tags/"+e).then(function(e){return e.json()}).then(function(e){return t(e)}).catch(function(e){return n(e)})})};t.getHint=function(e){return new Promise(function(t,n){fetch("https://"+window.location.host+"/hint/"+e).then(function(e){return e.json()}).then(function(e){return t(e)}).catch(function(e){return n(e)})})};t.postFoundTag=function(e,t){return new Promise(function(n,r){fetch("https://"+window.location.host+"/tagsfound",{body:JSON.stringify({tag:t.tag_id,player:e.p_id,game:t.game_id,current:e.p_current}),method:"POST",headers:{"Content-Type":"application/json"}}).then(function(e){return n(e)}).catch(function(e){return r(e)})})}}},[225]);return{page:e.default}});