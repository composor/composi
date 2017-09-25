!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.composi={})}(this,function(t){"use strict";function e(t,e,n,o){return n=a(o||document.body,n,t,e)}function n(t,e,n,o){if("key"===e);else if("style"===e){var r=!0,i=!1,s=void 0;try{for(var a,c=u(o,n=n||{})[Symbol.iterator]();!(r=(a=c.next()).done);r=!0){var l=a.value;t.style[l]=n[l]||""}}catch(t){i=!0,s=t}finally{try{!r&&c.return&&c.return()}finally{if(i)throw s}}}else{try{t[e]=n}catch(t){}"function"!=typeof n&&n?t.setAttribute(e,n):t.removeAttribute(e)}}function o(t,e){var o=(e=e||"svg"===t.type)?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type);for(var i in t.props)n(o,i,t.props[i]);return t.children.map(function(t){return o.appendChild(r(t,e))}),o}function r(t,e){return"string"==typeof t?document.createTextNode(t):o(t,e)}function i(t){if(t&&t.props)return t.key}function s(t,e,o){for(var r in u(e,o)){var i=o[r],s="value"===r||"checked"===r?t[r]:e[r];i!==s&&n(t,r,i,s)}}function a(t,e,n,o,u,l){if(null==n)e=t.insertBefore(r(o,u),e);else if(null!=o.type&&o.type===n.type){s(e,n.props,o.props),u=u||"svg"===o.type;for(var h=o.children.length,p=n.children.length,f={},d=[],m={},y=0;y<p;){var v=d[y]=e.childNodes[y],b=n.children[y],w=i(b);null!=w&&(f[w]=[v,b]),y++}for(var g=0,A=0;A<h;){var S=d[g],k=n.children[g],x=o.children[A],E=i(k);if(m[E])g++;else{var C=i(x),W=f[C]||[];null==C?(null==E&&(a(e,S,k,x,u),A++),g++):(E===C?a(e,W[0],W[1],x,u)&&g++:W[0]?e.insertBefore(W[0],S)&&a(e,W[0],W[1],x,u):a(e,S,null,x,u),m[C]=x,A++)}}for(;g<p;)null==i(n.children[g])&&c(e,d[g]),g++;for(var U in f){var j=f[U];m[j[1].props.key]||c(e,j[0])}}else e&&o!==e.nodeValue&&(e=t.insertBefore(r(o,u),l=e),c(t,l));return e}var u=function(t,e){for(var n in e)t[n]=n;return t},c=function(t,e){return t.removeChild(e)},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h=(function(){function t(t){this.value=t}function e(e){function n(r,i){try{var s=e[r](i),a=s.value;a instanceof t?Promise.resolve(a.value).then(function(t){n("next",t)},function(t){n("throw",t)}):o(s.done?"return":"normal",s.value)}catch(t){o("throw",t)}}function o(t,e){switch(t){case"return":r.resolve({value:e,done:!0});break;case"throw":r.reject(e);break;default:r.resolve({value:e,done:!1})}(r=r.next)?n(r.key,r.arg):i=null}var r,i;this._invoke=function(t,e){return new Promise(function(o,s){var a={key:t,arg:e,resolve:o,reject:s,next:null};i?i=i.next=a:(r=i=a,n(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),p=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,16)},d=(new Date).getTime(),m=function(){function t(e){if(h(this,t),e||(e={}),this.props=e,this.selector=this.props.element||this.props.root||"body",this.props.render&&(this.render=this.props.render),this[d]=this.props.state,this.oldNode=null,this.styles=this.props.styles,this.selector&&(this.root=document.querySelector(this.selector)),this.scopedStylesheet=!1,this.mounted=!1,this.element,this.interactionsAreRegistered=!1,this.createComponentStyles=function(){function t(t){for(var e=Array.prototype.concat(t),n=0;n<e.length;n++)Array.isArray(e[n])&&e.splice(n,1,e[n--]);return e}function e(t){if(!(this instanceof e))return new e(t);t||(t={}),t.prefix=!t.hasOwnProperty("prefix")||!!t.prefix,t.unit=t.hasOwnProperty("unit")?t.unit:"px",this._sheet=null,this._prefix=null,this.css=function(e,i,a){if(null==i)return"";null==this._sheet&&(this._sheet=u=u||n());var c=o(a=e,i);(t.prefix||""!==t.unit)&&c.forEach(function(e){""!==t.unit&&s(e[1],t.unit)}),r(c,this._sheet)}}function n(){if(null==document.head)throw new Error("Can't add stylesheet before <head> is available. Make sure your document has a head element.");var t=document.createElement("style");return t.id="styles_"+Math.random().toString(16).slice(2,8),document.head.appendChild(t),t.sheet}function o(e,n){Array.isArray(n)||(n=[n]);var r={},s=[];return(n=t(n)).forEach(function(t){for(var n in t){var u=t[n];a(u)||Array.isArray(u)?s=s.concat(o(i(e,n),u)):("content"===n&&(u="'"+u+"'"),r[n]=u)}}),s.push([e,r]),s}function r(t,e){function n(t){return t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})}window.sheet=e,t.forEach(function(t){var o=[];for(var r in t[1])o.push(n(r)+":"+t[1][r]);if(o.length>0){var i=t[0]?t[0]:"";e.insertRule(i+"{"+o.join(";")+"}",0)}})}function i(t,e){var n=/^[:\[]/,o=t.split(","),r=e.split(",");return o.map(function(t){return r.map(function(e){var o=n.test(e)?"":" ";return t+o+e}).join(",")}).join(",")}function s(t,e){for(var n in t){var o=t[n]+"";isNaN(o)||c[n]||(o+=e),t[n]=o}return t}function a(t){return t===Object(t)&&Object.prototype.toString===t.toString}var u=null,c={columnCount:!0,fillOpacity:!0,flex:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},l={};return l.css=e().css,l},this.handleEvents=function(){if(this.interactions){var t=this,e=!1;if(!this.mounted&&Array.isArray(this.interactions)){if(!this.interactions.length||this.interactionsAreRegistered)return;this.interactions.forEach(function(n){e=n.bubble,n&&"self"===n.element||n&&!n.element?t.root.addEventListener(n.event,n.callback,e):t.root.addEventListener(n.event,function(e){for(var o=[].slice.call(t.element.querySelectorAll(n.element)),r=o.length,i=0;i<r;){if(e.target.closest(n.element)===o[i]){n.callback.call(o[i],e);break}i++}}),t.interactionsAreRegistered=!0})}}},this.props.interactions&&(this.interactions=this.props.interactions),this.interactions&&this.handleEvents(),this.props.methods){var n=this;for(var o in this.props.methods)n[o]=this.props.methods[o]}this.props.componentWasCreated&&(this.componentWasCreated=this.props.componentWasCreated),this.props.componentWillUpdate&&(this.componentWillUpdate=this.props.componentWillUpdate),this.props.componentDidUpdate&&(this.componentDidUpdate=this.props.componentDidUpdate),this.props.componentWillUnmount&&(this.componentWillUnmount=this.props.componentWillUnmount)}return p(t,[{key:"setState",value:function(t,e){if("function"==typeof t){var n=t.call(this,this.state);"function"!=typeof n&&n&&this.setState(n)}if(Array.isArray(this.state)){var o=this.state;e||0===e?"object"===l(o[e])?(u(o[e],t),this.state=o):(o[e]=t,this.state=o):this.state=o}else if("object"===l(this.state)){var r=this.state;u(r,t),this.state=r}else this.state=t}},{key:"update",value:function(t){if(this.render){var n=t||this.state;if(this.componentWillUpdate&&this.componentWillUpdate(this),this.root&&"string"==typeof this.root&&(this.selector=this.root,this.root=document.querySelector(this.root)),this.element=e(this.oldNode,this.oldNode=this.render(n),this.element,this.root),!this.mounted){if(this.styles&&this.root&&this.root.nodeName){var o=this.createComponentStyles();if("object"!==l(this.styles))return;o.css(this.selector,this.styles)}this.handleEvents(),this.componentWasCreated&&this.componentWasCreated(this),this.mounted=!0}this.componentDidUpdate&&this.componentDidUpdate(this)}}},{key:"unmount",value:function(){var t=this;this.componentWillUnmount&&this.componentWillUnmount(this),this.interactions&&this.interactions.length&&this.interactions.forEach(function(e){t.root.removeEvent(e.event,e.callback)}),this.root.removeChild(this.element),this.root=void 0;for(var e in this)delete this[e];delete this.state,this.update=void 0,this.unmount=void 0}},{key:"state",set:function(t){var e=this;this[d]=t,f(function(){e.update()})},get:function(){return this[d]}}]),t}();window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(t){var e=(this.document||this.ownerDocument).querySelectorAll(t),n=void 0,o=this;do{for(n=e.length;--n>=0&&e.item(n)!==o;);}while(n<0&&(o=o.parentElement));return o});var y={},v=y.hasOwnProperty;t.h=function(t,e){for(var n=[],o=void 0,r=[],i=arguments.length,s=Array(i>2?i-2:0),a=2;a<i;a++)s[a-2]=arguments[a];for(n=n.concat(s.reverse());n.length;)Array.isArray(o=n.pop())?o.map(function(t){return n.unshift(t)}):null!=o&&!0!==o&&!1!==o&&("number"==typeof o&&(o+=""),r.push(o));return"string"==typeof t?{type:t,props:e||{},children:r}:t(e,r)},t.patch=e,t.createElement=r,t.injectElement=function(t,e,n){"string"==typeof e&&(e=document.querySelector(e)),e&&"boolean"!=typeof e||(n=e,e=document.body);var o=r(t);n&&(e.textContent=""),e.append(o)},t.Component=m,t.dispatch=function(t,e){v.call(y,t)&&y[t].map(function(t){return t(void 0!=e?e:{})})},t.subscribe=function(t,e){v.call(y,t)||(y[t]=[]);y[t].push(e)},t.unsubscribe=function(t){return delete y[t]},t.uuid=function(t){var e=t?""+1e7+-1e3+-4e3+-1e3+-1e11:"10000000100040008000"+1e11,n=Date.now();return n+=performance.now(),e.replace(/1|0/g,function(){return(0|(n+16*Math.random())%16).toString(16)})},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
