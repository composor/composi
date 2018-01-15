!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.composi={})}(this,function(e){"use strict";function t(e,t){var n={};for(var o in e)n[o]=e[o];for(var r in t)n[r]=t[r];return n}function n(e,n,u,c){return function e(n,u,c,a,l,p){if(null==c)u=n.insertBefore(r(a,l),u);else if(null!=a.type&&a.type===c.type){E=u,D=c.props,O=a.props,Object.keys(t(D,O)).forEach(function(e){var t=O[e],n="value"===e||"checked"===e?E[e]:D[e];t!==n&&o(E,e,t,n)}),l=l||"svg"===a.type;for(var h=a.children.length,d=c.children.length,f={},m=[],y={},v=0;v<d;){var b=m[v]=u.childNodes[v],w=c.children[v],g=i(w);null!=g&&(f[g]=[b,w]),v++}for(var k=0,C=0;C<h;){var S=m[k],W=c.children[k],U=a.children[C],N=i(W);if(y[N])k++;else{var A=i(U),j=f[A]||[];null==A?(null==N&&(e(u,S,W,U,l),C++),k++):(N===A?e(u,j[0],j[1],U,l)&&k++:j[0]?u.insertBefore(j[0],S)&&e(u,j[0],j[1],U,l):e(u,S,null,U,l),y[A]=U,C++)}}for(;k<d;){var q=c.children[k],x=i(q);null==x&&s(u,m[k]),k++}Object.keys(f).forEach(function(e){var t=f[e],n=t[1];y[n.props.key]||s(u,t[0])})}else u&&a!==u.nodeValue&&("string"==typeof a&&"string"==typeof c?u.nodeValue=a:(u=n.insertBefore(r(a,l),p=u),s(n,p,c.data)));var E,D,O;return u}(c||document.body,u,e,n)}function o(e,n,o,r){if("key"===n);else if("style"===n&&"string"!=typeof o)for(var i in t(r,o=o||{}))e.style[i]=o[i]+""||"";else 0===o&&(o+=""),"className"===n&&(n="class"),/^on.*$/.test(n)&&(n=n.toLowerCase()),"http://www.w3.org/2000/svg"!==e.namespaceURI&&(e[n]=o),"function"!=typeof o&&(o?"xlink-href"===n?(e.setAttributeNS("http://www.w3.org/1999/xlink","href",o),e.setAttribute("href",o)):e.setAttribute(n,o):e.removeAttribute(n))}function r(e,t){return"string"==typeof e?document.createTextNode(e):(n=e,s=(i=(i=t)||"svg"===n.type)?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type),Object.keys(n.props).forEach(function(e){return o(s,e,n.props[e])}),n.children.map(function(e){return s.appendChild(r(e,i))}),s);var n,i,s}function i(e){if(e&&e.props)return e.props.key}var s=function(e,t){return e.removeChild(t)};var u=function(e,t){Object.keys(t).forEach(function(n){t.hasOwnProperty(n)&&Object.defineProperty(e,n,{value:t[n],writable:!0,enumerable:!1,configurable:!0})})},c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=(function(){function e(e){this.value=e}function t(t){var n,o;function r(n,o){try{var s=t[n](o),u=s.value;u instanceof e?Promise.resolve(u.value).then(function(e){r("next",e)},function(e){r("throw",e)}):i(s.done?"return":"normal",s.value)}catch(e){i("throw",e)}}function i(e,t){switch(e){case"return":n.resolve({value:t,done:!0});break;case"throw":n.reject(t);break;default:n.resolve({value:t,done:!1})}(n=n.next)?r(n.key,n.arg):o=null}this._invoke=function(e,t){return new Promise(function(i,s){var u={key:e,arg:t,resolve:i,reject:s,next:null};o?o=o.next=u:(n=o=u,r(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}(),function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),p=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){return setTimeout(e,16)},h=(new Date).getTime(),d=function(){function e(t){a(this,e),t||(t={}),this.selector=t.container||t.root||"body",t.render&&(this.render=t.render),t.state&&(this.state=t.state),this.oldNode=null,this.selector&&(this.container=document.querySelector(this.selector)),this.componentShouldUpdate=!0,this.mounted=!1,this.element,t.beforeCreateComponent&&(this.beforeCreateComponent=t.beforeCreateComponent),(t.componentWillMount||this.componentWillMount)&&(this.beforeCreateComponent=t.componentWillMount||this.componentWillMount),t.componentWasCreated&&(this.componentWasCreated=t.componentWasCreated),(t.componentDidMount||this.componentDidMount)&&(this.componentWasCreated=t.componentDidMount||this.componentDidMount),t.componentWillUpdate&&(this.componentWillUpdate=t.componentWillUpdate),t.componentDidUpdate&&(this.componentDidUpdate=t.componentDidUpdate),t.componentWillUnmount&&(this.componentWillUnmount=t.componentWillUnmount)}return l(e,[{key:"setState",value:function(e,t){if("function"==typeof e){var n=e.call(this,this.state);"function"!=typeof n&&n&&this.setState(n)}if(Array.isArray(this.state)){var o=this.state;t||0===t?"object"===c(o[t])?(u(o[t],e),this.state=o):(o[t]=e,this.state=o):this.state=o}else if("object"===c(this.state)){var r=this.state;u(r,e),this.state=r}else this.state=e}},{key:"update",value:function(e){if(this.render&&(this.componentShouldUpdate||!this.mounted)){var t=this.state;!0!==e&&e&&(t=e),this.container&&"string"==typeof this.container&&(this.selector=this.container,this.container=document.querySelector(this.container));var o=this.render,r=this.render(t),i=void 0;if(r&&r.props&&r.props.id)try{i=this.container.querySelector("#"+r.props.id)}catch(e){}if(i&&!this.mounted&&i.parentNode.removeChild(i),this.element=n(this.oldNode,this.oldNode=this.render(t),this.element,this.container),!(this.mounted&&this.oldNode&&s(t)))return this.beforeCreateComponent&&this.beforeCreateComponent(this),this.componentWasCreated&&this.componentWasCreated(this),void(this.mounted=!0);this.componentWillUpdate&&this.componentWillUpdate(this),this.componentDidUpdate&&s(t)&&this.componentDidUpdate(this)}function s(e){try{return JSON.stringify(this.oldNode)!==JSON.stringify(o(e))}catch(e){return!0}}}},{key:"unmount",value:function(){var e=this;if(this.element){this.componentWillUnmount&&this.componentWillUnmount(this),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mouseleave","select","input","change","keydown","keypress","keyup","submit"].map(function(t){e.element.removeEventListener(t,e)}),this.container.removeChild(this.element),this.container=void 0;for(var t in this)delete this[t];delete this.state,this.update=void 0,this.unmount=void 0}}},{key:"state",set:function(e){var t=this;this[h]=e,p(function(){return t.update()})},get:function(){return this[h]}}]),e}();window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t=(this.document||this.ownerDocument).querySelectorAll(e),n=void 0,o=this;do{for(n=t.length;--n>=0&&t.item(n)!==o;);}while(n<0&&(o=o.parentElement));return o});var f={container:void 0,element:void 0,oldNode:void 0};e.h=function(e,t){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;r<n;r++)o[r-2]=arguments[r];for(var i=void 0,s=[];o.length;)Array.isArray(i=o.shift())?i.map(function(e){return o.push(e)}):null!=i&&"boolean"!=typeof i&&("number"==typeof i&&(i+=""),s.push(i));return"string"==typeof e?{type:e,props:t||{},children:s}:e(t||{},s)},e.patch=n,e.render=function(e,t){"string"==typeof t&&(t=document.querySelector(t)),f.container!==t&&(f.container=t,f.element=void 0,f.oldNode=void 0);if(e.props&&e.props.id)try{"string"==typeof t?document.querySelector(t).querySelector("#"+e.props.id):t.querySelector("#"+e.props.id)}catch(e){}f.element=n(f.oldNode,f.oldNode=e,f.element,t)},e.Component=d,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
