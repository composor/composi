!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.composi={})}(this,function(e){"use strict";function t(e,t){var n={};for(var o in e)n[o]=e[o];for(var r in t)n[r]=t[r];return n}function n(e,t,n,o){return c(o||document.body,n,e,t)}function o(e,n,o,r){if("key"===n);else if("style"===n)for(var i in t(r,o=o||{}))e.style[i]=String(o[i])||"";else 0===o&&(o=String(o)),"className"===n&&(n="class"),"http://www.w3.org/2000/svg"!==e.namespaceURI&&(e[n]=o),"function"!=typeof o&&(o?"xlink-href"===n?(e.setAttributeNS("http://www.w3.org/1999/xlink","href",o),e.setAttribute("href",o)):e.setAttribute(n,o):e.removeAttribute(n))}function r(e,t){var n=(t=t||"svg"===e.type)?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type);return Object.keys(e.props).forEach(function(t){return o(n,t,e.props[t])}),e.children.map(function(e){return n.appendChild(i(e,t))}),n}function i(e,t){return"string"==typeof e?document.createTextNode(e):r(e,t)}function s(e){if(e&&e.props)return e.props.key}function u(e,n,r){Object.keys(t(n,r)).forEach(function(t){var i=r[t],s="value"===t||"checked"===t?e[t]:n[t];i!==s&&o(e,t,i,s)})}function c(e,t,n,o,r,l){if(null==n)t=e.insertBefore(i(o,r),t);else if(null!=o.type&&o.type===n.type){u(t,n.props,o.props),r=r||"svg"===o.type;for(var p=o.children.length,h=n.children.length,d={},f=[],m={},y=0;y<h;){var v=f[y]=t.childNodes[y],b=n.children[y],w=s(b);null!=w&&(d[w]=[v,b]),y++}for(var g=0,k=0;k<p;){var S=f[g],C=n.children[g],W=o.children[k],U=s(C);if(m[U])g++;else{var N=s(W),A=d[N]||[];null==N?(null==U&&(c(t,S,C,W,r),k++),g++):(U===N?c(t,A[0],A[1],W,r)&&g++:A[0]?t.insertBefore(A[0],S)&&c(t,A[0],A[1],W,r):c(t,S,null,W,r),m[N]=W,k++)}}for(;g<h;)null==s(n.children[g])&&a(t,f[g]),g++;Object.keys(d).forEach(function(e){var n=d[e],o=n[1];m[o.props.key]||a(t,n[0])})}else t&&o!==t.nodeValue&&("string"==typeof o&&"string"==typeof n?t.nodeValue=o:(t=e.insertBefore(i(o,r),l=t),a(e,l,n.data)));return t}var a=function(e,t){return e.removeChild(t)},l=function(e,t){Object.keys(t).forEach(function(n){t.hasOwnProperty(n)&&Object.defineProperty(e,n,{value:t[n],writable:!0,enumerable:!1,configurable:!0})})},p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=(function(){function e(e){this.value=e}function t(t){function n(r,i){try{var s=t[r](i),u=s.value;u instanceof e?Promise.resolve(u.value).then(function(e){n("next",e)},function(e){n("throw",e)}):o(s.done?"return":"normal",s.value)}catch(e){o("throw",e)}}function o(e,t){switch(e){case"return":r.resolve({value:t,done:!0});break;case"throw":r.reject(t);break;default:r.resolve({value:t,done:!1})}(r=r.next)?n(r.key,r.arg):i=null}var r,i;this._invoke=function(e,t){return new Promise(function(o,s){var u={key:e,arg:t,resolve:o,reject:s,next:null};i?i=i.next=u:(r=i=u,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}(),function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,16)},m=(new Date).getTime(),y=function(){function e(t){h(this,e),t||(t={}),this.selector=t.container||t.root||"body",t.render&&(this.render=t.render),t.state&&(this.state=t.state),this.oldNode=null,this.selector&&(this.container=document.querySelector(this.selector)),this.componentShouldUpdate=!0,this.mounted=!1,this.element,t.beforeCreateComponent&&(this.beforeCreateComponent=t.beforeCreateComponent),(t.componentWillMount||this.componentWillMount)&&(this.beforeCreateComponent=t.componentWillMount||this.componentWillMount),t.componentWasCreated&&(this.componentWasCreated=t.componentWasCreated),(t.componentDidMount||this.componentDidMount)&&(this.componentWasCreated=t.componentDidMount||this.componentDidMount),t.componentWillUpdate&&(this.componentWillUpdate=t.componentWillUpdate),t.componentDidUpdate&&(this.componentDidUpdate=t.componentDidUpdate),t.componentWillUnmount&&(this.componentWillUnmount=t.componentWillUnmount)}return d(e,[{key:"setState",value:function(e,t){if("function"==typeof e){var n=e.call(this,this.state);"function"!=typeof n&&n&&this.setState(n)}if(Array.isArray(this.state)){var o=this.state;t||0===t?"object"===p(o[t])?(l(o[t],e),this.state=o):(o[t]=e,this.state=o):this.state=o}else if("object"===p(this.state)){var r=this.state;l(r,e),this.state=r}else this.state=e}},{key:"update",value:function(e){function t(e){try{return JSON.stringify(this.oldNode)!==JSON.stringify(r(e))}catch(e){return!0}}if(this.render&&(this.componentShouldUpdate||!this.mounted)){var o=this.state;!0!==e&&e&&(o=e),this.container&&"string"==typeof this.container&&(this.selector=this.container,this.container=document.querySelector(this.container));var r=this.render,i=this.render(o),s=void 0;if(i&&i.props&&i.props.id)try{s=this.container.querySelector("#"+i.props.id)}catch(e){}if(s&&!this.mounted&&s.parentNode.removeChild(s),this.element=n(this.oldNode,this.oldNode=this.render(o),this.element,this.container),!(this.mounted&&this.oldNode&&t(o)))return this.beforeCreateComponent&&this.beforeCreateComponent(this),this.componentWasCreated&&this.componentWasCreated(this),void(this.mounted=!0);this.componentWillUpdate&&this.componentWillUpdate(this),this.componentDidUpdate&&t(o)&&this.componentDidUpdate(this)}}},{key:"unmount",value:function(){var e=this;if(this.element){this.componentWillUnmount&&this.componentWillUnmount(this),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mouseleave","select","input","change","keydown","keypress","keyup","submit"].map(function(t){e.element.removeEventListener(t,e)}),this.container.removeChild(this.element),this.container=void 0;for(var t in this)delete this[t];delete this.state,this.update=void 0,this.unmount=void 0}}},{key:"state",set:function(e){var t=this;this[m]=e,f(function(){return t.update()})},get:function(){return this[m]}}]),e}();window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t=(this.document||this.ownerDocument).querySelectorAll(e),n=void 0,o=this;do{for(n=t.length;--n>=0&&t.item(n)!==o;);}while(n<0&&(o=o.parentElement));return o});var v={container:void 0,element:void 0,oldNode:void 0};e.h=function(e,t){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];for(var i=void 0,s=[];o.length;)Array.isArray(i=o.shift())?i.map(function(e){return o.push(e)}):null!=i&&"boolean"!=typeof i&&("number"==typeof i&&(i+=""),s.push(i));return"string"==typeof e?{type:e,props:t||{},children:s}:e(t||{},s)},e.patch=n,e.render=function(e,t){"string"==typeof t&&(t=document.querySelector(t)),v.container!==t&&(v.container=t,v.element=void 0,v.oldNode=void 0);if(e.props&&e.props.id)try{"string"==typeof t?document.querySelector(t).querySelector("#"+e.props.id):t.querySelector("#"+e.props.id)}catch(e){}v.element=n(v.oldNode,v.oldNode=e,v.element,t)},e.Component=y,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
