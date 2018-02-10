!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.composi={})}(this,function(t){"use strict";function e(t){if(t&&t.props)return t.props.key}function n(t,e){var n={};for(var o in t)n[o]=t[o];for(var i in e)n[i]=e[i];return n}function o(t,e,o,i){if("key"===e);else if("style"===e&&"string"!=typeof o)for(var r in n(i,o=o||{}))t.style[r]=o[r]+""||"";else{if(0===o&&(o+=""),"className"===e&&(e="class"),"o"==e[0]&&"n"==e[1]&&(e=e.toLowerCase()),"dangerouslySetInnerHTML"===e)return void(t.innerHTML=o);"http://www.w3.org/2000/svg"!==t.namespaceURI&&(t[e]=o),"function"!=typeof o&&(o?"xlink-href"===e?(t.setAttributeNS("http://www.w3.org/1999/xlink","href",o),t.setAttribute("href",o)):t.setAttribute(e,o):t.removeAttribute(e))}}function i(t,e){return"string"==typeof t?document.createTextNode(t):(n=t,s=void 0,s=(r=(r=e)||"svg"===n.type)?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type),Object.keys(n.props).forEach(function(t){return o(s,t,n.props[t])}),n.children.map(function(t){return s.appendChild(i(t,r))}),s);var n,r,s}var r=function(t,e){return t.removeChild(e)};function s(t,s,u,c){return function t(s,u,c,a,l,h){if(null==c)u=s.insertBefore(i(a,l),u);else if(null!=a.type&&a.type===c.type){j=u,q=c.props,E=a.props,Object.keys(n(q,E)).forEach(function(t){var e=E[t],n="value"===t||"checked"===t?j[t]:q[t];e!==n&&o(j,t,e,n)}),l=l||"svg"===a.type;for(var p=a.children.length,d=c.children.length,f={},m=[],y={},v=0;v<d;){var b=m[v]=u.childNodes[v],w=c.children[v],g=e(w);null!=g&&(f[g]=[b,w]),v++}for(var k=0,S=0;S<p;){var W=m[k],C=c.children[k],U=a.children[S],N=e(C);if(y[N])k++;else{var M=e(U),A=f[M]||[];null==M?(null==N&&(t(u,W,C,U,l),S++),k++):(N===M?t(u,A[0],A[1],U,l)&&k++:A[0]?u.insertBefore(A[0],W)&&t(u,A[0],A[1],U,l):t(u,W,null,U,l),y[M]=U,S++)}}for(;k<d;){var x=c.children[k],D=e(x);null==D&&r(u,m[k]),k++}Object.keys(f).forEach(function(t){var e=f[t],n=e[1];y[n.props.key]||r(u,e[0])})}else u&&a!==u.nodeValue&&("string"==typeof a&&"string"==typeof c?u.nodeValue=a:(u=s.insertBefore(i(a,l),h=u),r(s,h,c.data)));var j,q,E;return u}(c||document.body,u,t,s)}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=(function(){function t(t){this.value=t}function e(e){var n,o;function i(n,o){try{var s=e[n](o),u=s.value;u instanceof t?Promise.resolve(u.value).then(function(t){i("next",t)},function(t){i("throw",t)}):r(s.done?"return":"normal",s.value)}catch(t){r("throw",t)}}function r(t,e){switch(t){case"return":n.resolve({value:e,done:!0});break;case"throw":n.reject(e);break;default:n.resolve({value:e,done:!1})}(n=n.next)?i(n.key,n.arg):o=null}this._invoke=function(t,e){return new Promise(function(r,s){var u={key:t,arg:e,resolve:r,reject:s,next:null};o?o=o.next=u:(n=o=u,i(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),l=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,16)},h=(new Date).getTime(),p=function(){function t(e){c(this,t),e||(e={}),this.selector=e.container||e.root||"body",e.render&&(this.render=e.render),e.state&&(this.state=e.state),this.oldNode=null,this.selector&&(this.container=document.querySelector(this.selector)),this.componentShouldUpdate=!0,this.mounted=!1,this.element,(e.componentWillMount||e.beforeCreateComponent)&&(this.componentWillMount=e.componentWillMount||e.beforeCreateComponent),this.beforeCreateComponent&&(this.componentWillMount=this.beforeCreateComponent),(e.componentDidMount||e.componentWasCreated)&&(this.componentDidMount=e.componentDidMount||e.componentWasCreated),this.componentWasCreated&&(this.componentDidMount=this.componentWasCreated),e.componentWillUpdate&&(this.componentWillUpdate=e.componentWillUpdate),e.componentDidUpdate&&(this.componentDidUpdate=e.componentDidUpdate),e.componentWillUnmount&&(this.componentWillUnmount=e.componentWillUnmount)}return a(t,[{key:"setState",value:function(t,e){if("function"==typeof t){var o=t.call(this,this.state);"function"!=typeof o&&o&&this.setState(o)}else if(Array.isArray(this.state)){var i=this.state;e||0===e?"object"===u(i[e])?this.state=n(i[e],t):(i[e]=t,this.state=i):this.state=i}else if("object"===u(this.state)){var r=this.state;this.state=n(r,t)}else this.state=t}},{key:"update",value:function(t){if(this.render&&(this.componentShouldUpdate||!this.mounted)){var e=this.state;!0!==t&&t&&(e=t),this.container&&"string"==typeof this.container&&(this.selector=this.container,this.container=document.querySelector(this.container));var n=this.render,o=this.render(e),i=void 0;if(o&&o.props&&o.props.id&&(i=this.container&&this.container.querySelector("#"+o.props.id)),i&&!this.mounted&&i.parentNode.removeChild(i),this.element=s(this.oldNode,this.oldNode=this.render(e),this.element,this.container),!(this.mounted&&this.oldNode&&r(e)))return this.componentWillMount&&this.componentWillMount(this),this.componentDidMount&&this.componentDidMount(this),void(this.mounted=!0);this.componentWillUpdate&&this.componentWillUpdate(this),this.componentDidUpdate&&r(e)&&this.componentDidUpdate(this)}function r(t){return!this||JSON.stringify(this.oldNode)!==JSON.stringify(n(t))}}},{key:"unmount",value:function(){var t=this;if(this.element){this.componentWillUnmount&&this.componentWillUnmount(this),["click","dblclick","mousedown","mouseup","mouseover","mouseout","mouseleave","select","input","change","keydown","keypress","keyup","submit"].map(function(e){t.element.removeEventListener(e,t)}),this.container.removeChild(this.element),this.container=void 0;for(var e in this)delete this[e];delete this.state,this.update=void 0,this.unmount=void 0}}},{key:"state",get:function(){return this[h]},set:function(t){var e=this;this[h]=t,l(function(){return e.update()})}}]),t}(),d={container:void 0,element:void 0,oldNode:void 0};t.h=function(t,e){for(var n=arguments.length,o=Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];for(var r=void 0,s=[];o.length;)Array.isArray(r=o.shift())?r.map(function(t){return o.push(t)}):null!=r&&"boolean"!=typeof r&&("number"==typeof r&&(r+=""),s.push(r));return"string"==typeof t?{type:t,props:e||{},children:s}:t(e||{},s)},t.patch=s,t.render=function(t,e){"string"==typeof e&&(e=document.querySelector(e)),d.container!==e&&(d.container=e,d.element=void 0,d.oldNode=void 0),d.element=s(d.oldNode,d.oldNode=t,d.element,e)},t.Component=p,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
