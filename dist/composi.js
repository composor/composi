!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.composi={})}(this,function(e){"use strict";var n=function(e){return e?e.key:null};function t(e,n){var t={};for(var o in e)t[o]=e[o];for(var r in n)t[r]=n[r];return t}function o(e,n,o,r,i){var u,l,a,c;"key"!==n&&"onComponentDidMount"!==n&&"onComponentDidUpdate"!==n&&"onComponentWillUnmount"!==n&&("style"===n&&"string"!=typeof o?function(e,n,o,r){for(var i in t(r,o)){var u=null==o||null==o[i]?"":o[i];"-"===i[0]?e[n].setProperty(i,u):e[n][i]=u}}(e,n,o,r):(n=n.toLowerCase(),"classname"===(c=n)&&(c="class"),a=o,"dangerouslysetinnerhtml"===(n=c)&&(e.innerHTML=a),n in e&&"list"!==n&&!i?e[n]="no"==o?"":o:null!=o&&"null"!==o&&"false"!==o&&"no"!==o&&"off"!==o&&("xlink-href"===n?(l=o,(u=e).setAttributeNS("http://www.w3.org/1999/xlink","href",l),u.setAttribute("href",l)):("true"===o&&(o=""),"dangerouslysetinnerhtml"!==n&&e.setAttribute(n,o))),null!=o&&"null"!==o&&"undefined"!==o&&"false"!==o&&"no"!==o&&"off"!==o||e.removeAttribute(n)))}var r=function(e,n,t){e.removeChild(function e(n,t){if(t.props)for(var o=0;o<t.children.length;o++)e(n.childNodes[o],t.children[o]);return n}(n,t)),t&&t.props&&t.props.onComponentDidUnmount&&t.props.onComponentDidUnmount.call(t.props.onComponentDidUnmount,e)};function i(e,n,t,i,u){var l=function e(n,t){var r=void 0;"number"==typeof n&&(n=n.toString()),r="string"==typeof n?document.createTextNode(n):(t=t||"svg"===n.type)?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type);var i=n.props;if(i){for(var u=0;u<n.children.length;u++)r.appendChild(e(n.children[u],t));for(var l in i)o(r,l,i[l],null,t)}return r}(e,n);return t&&(t.insertBefore(l,i),null!=u&&r(t,i,u)),i=l}function u(e,l,a,c,p){if(c!==a){if(null==a||a.type!==c.type)l=i(c,p,e,l,a);else if(null==a.type)l.nodeValue=c;else{!function(e,n,r,i){for(var u in t(n,r))r[u]!==("value"===u||"checked"===u?e[u]:n[u])&&o(e,u,r[u],n[u],i);e.mounted&&r&&r.onComponentDidUpdate&&r.onComponentDidUpdate.call(r.onComponentDidUpdate,n,r,e)}(l,a.props,c.props,p=p||"svg"===c.type);var s={},d={},f=[],m=a.children,v=c.children;!function(e,t,o,r){for(var i=0;i<o.length;i++){t[i]=e.childNodes[i];var u=n(o[i]);null!=u&&(r[u]=[t[i],o[i]])}}(l,f,m,s);for(var h=0,y=0;y<v.length;){var g=n(m[h]),k=n(v[y]);if(d[g])h++;else if(null==k||k!==n(m[h+1]))if(null==k)null==g&&(u(l,f[h],m[h],v[y],p),y++),h++;else{var w=s[k]||[];g===k?(u(l,w[0],w[1],v[y],p),h++):w[0]?u(l,l.insertBefore(w[0],f[h]),w[1],v[y],p):u(l,f[h],null,v[y],p),d[k]=v[y],y++}else null==g&&r(l,f[h],m[h]),h++}!function(e,t,o,i){for(;i<t.length;)null==n(t[i])&&r(e,o[i],t[i]),i++}(l,m,f,h),function(e,n,t){for(var o in n)t[o]||r(e,n[o][0],n[o][1])}(l,s,d)}return l}}function l(e,n){return n?u(n.parentNode,n,n&&n.vnode,e):n=u(null,null,null,e),n.vnode=e,n}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=(function(){function e(e){this.value=e}function n(n){var t,o;function r(t,o){try{var u=n[t](o),l=u.value;l instanceof e?Promise.resolve(l.value).then(function(e){r("next",e)},function(e){r("throw",e)}):i(u.done?"return":"normal",u.value)}catch(e){i("throw",e)}}function i(e,n){switch(e){case"return":t.resolve({value:n,done:!0});break;case"throw":t.reject(n);break;default:t.resolve({value:n,done:!1})}(t=t.next)?r(t.key,t.arg):o=null}this._invoke=function(e,n){return new Promise(function(i,u){var l={key:e,arg:n,resolve:i,reject:u,next:null};o?o=o.next=l:(t=o=l,r(e,n))})},"function"!=typeof n.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(n.prototype[Symbol.asyncIterator]=function(){return this}),n.prototype.next=function(e){return this._invoke("next",e)},n.prototype.throw=function(e){return this._invoke("throw",e)},n.prototype.return=function(e){return this._invoke("return",e)}}(),function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}),p=function(){function e(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(n,t,o){return t&&e(n.prototype,t),o&&e(n,o),n}}();var s=window&&window.requestAnimationFrame||window&&window.msRequestAnimationFrame||function(e){return setTimeout(e,16)};function d(e){return!Array.isArray(e)&&"object"===(void 0===e?"undefined":a(e))}function f(e,n){if(n.render&&(n.componentShouldUpdate||!n.mounted)){var t=n.state;!0!==e&&e&&(t=e),n.container&&"string"==typeof n.container&&(n.selector=n.container,n.container=document.querySelector(n.container));var o=n.render(t),r=void 0;o&&o.props&&o.props.id&&n.container&&(r=n.container&&n.container.querySelector("#"+o.props.id)),r&&!n.mounted&&r.parentNode.removeChild(r);var i=n.element&&n.element.vnode;if(u=i,a=t,!(c=n)||JSON.stringify(u)!==JSON.stringify(c.render(a))){var u,a,c;if(n.element=l(n.render(t),n.element),!n.mounted)return n.componentWillMount&&n.componentWillMount(n),n.container&&1===n.container.nodeType||console.error("The container for a class component is not a valid DOM node. Check the selector provided for the class to make sure it is a valid CSS selector and that the container exists in the DOM. You might be targeting a nonexistent node."),n.container.appendChild(n.element),n.mounted=!0,void(n.componentDidMount&&n.componentDidMount(n));n.componentWillUpdate&&n.componentWillUpdate(n),n.componentDidUpdate&&n.componentDidUpdate(n)}}}var m=["change","click","dblclick","input","keydown","keypress","keyup","mousedown","mouseleave","mouseout","mouseover","mouseup","pointercancel","pointerdown","pointermove","pointerup","select","submit","touchcancel","touchend","touchmove","touchstart"];var v=(new Date).getTime(),h=function(){function e(n){c(this,e),n||(n={}),this.props=n,this.selector=n.container||"body",n.render&&(this.render=n.render),n.state&&(this.state=n.state),this.selector&&(this.container=document.querySelector(this.selector)),this.componentShouldUpdate=!0,this.mounted=!1,this.element=void 0,n.componentWillMount&&(this.componentWillMount=n.componentWillMount),n.componentDidMount&&(this.componentDidMount=n.componentDidMount),n.componentWillUpdate&&(this.componentWillUpdate=n.componentWillUpdate),n.componentDidUpdate&&(this.componentDidUpdate=n.componentDidUpdate),n.componentWillUnmount&&(this.componentWillUnmount=n.componentWillUnmount)}return p(e,[{key:"componentWillMount",value:function(e){return e}},{key:"componentDidMount",value:function(e){return e}},{key:"componentWillUpdate",value:function(e){return e}},{key:"componentDidUpdate",value:function(e){return e}},{key:"componentWillUnmount",value:function(e){return e}},{key:"render",value:function(e){return e}},{key:"setState",value:function(e){!function(e,n){if("function"==typeof e){var o=e.call(n,n.state);o&&(n.state=o)}else if(d(n.state)&&d(e)){var r=n.state;n.state=t(r,e)}else n.state=e}(e,this)}},{key:"update",value:function(e){f(e,this)}},{key:"unmount",value:function(){!function(e){if(e.element){e.componentWillUnmount&&e.componentWillUnmount(e),m.map(function(n){e.element.removeEventListener(n,e)}),e.container.removeChild(e.element),e.container=void 0;for(var n in e)delete e[n];delete e.state,e.update=void 0,e.unmount=void 0}}(this)}},{key:"state",get:function(){return this[v]},set:function(e){var n=this;this[v]=e,s(function(){return n.update()})}}]),e}();e.h=function(e,n){for(var t=[],o=[],r=arguments.length,i=Array(r>2?r-2:0),u=2;u<r;u++)i[u-2]=arguments[u];for(var l=i.length,a=void 0;l-- >0;)t.push(i[l]);for(n&&n.key&&(a=n.key,delete n.key);t.length;){var c=t.pop();if(c&&c.pop)for(l=c.length;l--;)t.push(c[l]);else null!=c&&!0!==c&&!1!==c&&o.push(c)}return"function"==typeof e?e(n||{},o):{type:e,props:n||{},children:o,key:a}},e.mount=function(e,n,t){if((n="string"==typeof n&&document.querySelector(n))||(n=document.body),Array.isArray(e))throw new function e(){c(this,e),this.message="Cannot insert Fragment tag directly into DOM.",this.toString=function(){return this.message}};var o=l(e);return e.props&&e.props.onComponentDidMount&&e.props.onComponentDidMount.call(e.props.onComponentDidMount,o),o.mounted=!0,t?("string"==typeof t&&(t=document.querySelector(t)),t.nextElementSibling?(t.parentNode.insertBefore(o,t.nextElementSibling),t.parentNode.removeChild(t),o):(t.parentNode.appendChild(o),t.parentNode.removeChild(t),o)):n.appendChild(o)},e.render=function(e,n){return l(e,n)},e.Component=h,e.Fragment=function(e,n){return n},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=composi.js.map
