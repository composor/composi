!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.composi={})}(this,function(t){"use strict";var e=function(t){return t&&t.props&&t.props.key};function n(t,e){var n={};for(var o in t)n[o]=t[o];for(var i in e)n[i]=e[i];return n}function o(t,e,o,i,r){if("key"===e);else if("style"===e&&"string"!=typeof o)for(var s in n(i,o))t[e][s]=null==o||null==o[s]?"":o[s];else{if("dangerouslySetInnerHTML"===e)return void(t.innerHTML=o);"function"==typeof o||e in t&&"list"!==e&&!r?t[e]=null==o?"":o:null!=o&&!1!==o&&("xlink-href"===e?(t.setAttributeNS("http://www.w3.org/1999/xlink","href",o),t.setAttribute("href",o)):t.setAttribute(e,o)),null!=o&&!1!==o||t.removeAttribute(e)}}var i=function(t,e){return t.removeChild(e)};function r(t,s,u,l,c,a){if(l===u);else if(null==u||u.type!==l.type){var h=function t(e,n){var i="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.type)?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type),r=e.props;if(r){for(var s=0;s<e.children.length;s++)i.appendChild(t(e.children[s],n));for(var u in r)o(i,u,r[u],null,n)}return i}(l,a);t&&(t.insertBefore(h,s),null!=u&&i(t,s,u)),s=h}else if(null==u.type)s.nodeValue=l;else{!function(t,e,i,r){for(var s in n(e,i))i[s]!==("value"===s||"checked"===s?t[s]:e[s])&&o(t,s,i[s],e[s],r)}(s,u.props,l.props,a=a||"svg"===l.type);for(var p={},f={},d=[],m=u.children,y=l.children,v=0;v<m.length;v++){d[v]=s.childNodes[v];var w=e(m[v]);null!=w&&(p[w]=[d[v],m[v]])}for(var g=0,b=0;b<y.length;){var k=e(m[g]),S=e(y[b]=y[b]);if(f[k])g++;else if(null==S||c)null==k&&(r(s,d[g],m[g],y[b],c,a),b++),g++;else{var U=p[S]||[];k===S?(r(s,U[0],U[1],y[b],c,a),g++):U[0]?r(s,s.insertBefore(U[0],d[g]),U[1],y[b],c,a):r(s,d[g],null,y[b],c,a),f[S]=y[b],b++}}for(;g<m.length;)null==e(m[g])&&i(s,d[g],m[g]),g++;for(var N in p)f[N]||i(s,p[N][0],p[N][1])}return s}function s(t,e){return(e=r(e&&e.parentNode,e,e&&null==e.node?function t(e){if(e&&e.nodeName)return{type:e.nodeName.toLowerCase(),props:{},children:Array.prototype.map.call(e.children,function(e){return 3===e.nodeType?e.nodeValue:t(e)})}}(e):e&&e.node,t,e&&null==e.node)).node=t,e}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l=(function(){function t(t){this.value=t}function e(e){var n,o;function i(n,o){try{var s=e[n](o),u=s.value;u instanceof t?Promise.resolve(u.value).then(function(t){i("next",t)},function(t){i("throw",t)}):r(s.done?"return":"normal",s.value)}catch(t){r("throw",t)}}function r(t,e){switch(t){case"return":n.resolve({value:e,done:!0});break;case"throw":n.reject(e);break;default:n.resolve({value:e,done:!1})}(n=n.next)?i(n.key,n.arg):o=null}this._invoke=function(t,e){return new Promise(function(r,s){var u={key:t,arg:e,resolve:r,reject:s,next:null};o?o=o.next=u:(n=o=u,i(t,e))})},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}),c=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,16)},h=(new Date).getTime(),p=function(){function t(e){l(this,t),e||(e={}),this.selector=e.container||"body",e.render&&(this.render=e.render),e.state&&(this.state=e.state),this.oldNode=null,this.selector&&(this.container=document.querySelector(this.selector)),this.componentShouldUpdate=!0,this.mounted=!1,this.element,e.componentWillMount&&(this.componentWillMount=e.componentWillMount),e.componentDidMount&&(this.componentDidMount=e.componentDidMount),e.componentWillUpdate&&(this.componentWillUpdate=e.componentWillUpdate),e.componentDidUpdate&&(this.componentDidUpdate=e.componentDidUpdate),e.componentWillUnmount&&(this.componentWillUnmount=e.componentWillUnmount)}return c(t,[{key:"setState",value:function(t,e){if("function"==typeof t){var o=t.call(this,this.state);"function"!=typeof o&&o&&this.setState(o)}else if(Array.isArray(this.state)){var i=this.state;e||0===e?"object"===u(i[e])?this.state=n(i[e],t):(i[e]=t,this.state=i):this.state=i}else if("object"===u(this.state)){var r=this.state;this.state=n(r,t)}else this.state=t}},{key:"update",value:function(t){if(this.render&&(this.componentShouldUpdate||!this.mounted)){var e=this.state;!0!==t&&t&&(e=t),this.container&&"string"==typeof this.container&&(this.selector=this.container,this.container=document.querySelector(this.container));var n=this.oldNode,o=this.render,i=this.render(e),r=void 0;if(i&&i.props&&i.props.id&&this.container&&(r=this.container&&this.container.querySelector("#"+i.props.id)),r&&!this.mounted&&r.parentNode.removeChild(r),this.oldNode=this.render(e),this.element=s(this.oldNode,this.element),!this.mounted)return this.componentWillMount&&this.componentWillMount(this),this.container.appendChild(this.element),this.mounted=!0,void(this.componentDidMount&&this.componentDidMount(this));this.mounted&&this.oldNode&&u(n,e)&&this.componentWillUpdate&&this.componentWillUpdate(this),this.componentDidUpdate&&u(n,e)&&this.componentDidUpdate(this)}function u(t,e){return!this||JSON.stringify(t)!==JSON.stringify(o(e))}}},{key:"unmount",value:function(){var t=this;if(this.element){this.componentWillUnmount&&this.componentWillUnmount(this),["change","click","dblclick","input","keydown","keypress","keyup","mousedown","mouseleave","mouseout","mouseover","mouseup","select","submit","touchcancel","touchend","touchmove","touchstart"].map(function(e){t.element.removeEventListener(e,t)}),this.container.removeChild(this.element),this.container=void 0;for(var e in this)delete this[e];delete this.state,this.update=void 0,this.unmount=void 0}}},{key:"state",get:function(){return this[h]},set:function(t){var e=this;this[h]=t,a(function(){return e.update()})}}]),t}();t.h=function(t,e){for(var n=[],o=[],i=arguments.length,r=Array(i>2?i-2:0),s=2;s<i;s++)r[s-2]=arguments[s];for(var u=r.length;u-- >0;)n.push(r[u]);for(;n.length;){var l=n.pop();if(l&&l.pop)for(u=l.length;u--;)n.push(l[u]);else null!=l&&!0!==l&&!1!==l&&o.push(l)}return"function"==typeof t?t(e||{},r):{type:t,props:e||{},children:o}},t.mount=function(t,e){if((e="string"==typeof e&&document.querySelector(e))||(e=document.body),Array.isArray(t))throw new function(){this.message="Cannot insert Fragment directly into DOM.",this.toString=function(){return this.message}};var n=s(t);return e.appendChild(n)},t.render=function(t,e){return s(t,e)},t.Component=p,t.Fragment=function(t,e){return e},Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
