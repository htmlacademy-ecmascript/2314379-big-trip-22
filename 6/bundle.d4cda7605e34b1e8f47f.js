(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var s=n(537),i=n.n(s),r=n(645),a=n.n(r)()(i());a.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const o=a},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",s=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),s&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),s&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,s,i,r){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(s)for(var o=0;o<this.length;o++){var l=this[o][0];null!=l&&(a[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);s&&a[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,a=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var g="$isDayjsObject",$=function(e){return e instanceof E||!(!e||!e[g])},M=function e(t,n,s){var i;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(i=r),n&&(b[r]=n,i=r);var a=t.split("-");if(!i&&a.length>1)return e(a[0])}else{var o=t.name;b[o]=t,i=o}return!s&&i&&(y=i),i||!s&&y},w=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new E(n)},k=_;k.l=M,k.i=$,k.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var E=function(){function h(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(k.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(f);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return k},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return w(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<w(e)},m.$g=function(e,t,n){return k.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!k.u(t)||t,p=k.p(e),f=function(e,t){var s=k.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(a)},v=function(e,t){return k.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?f(1,0):f(31,11);case l:return c?f(1,m):f(0,m+1);case o:var b=this.$locale().weekStart||0,g=(h<b?h+7:h)-b;return f(c?_-g:_+(6-g),m);case a:case d:return v(y+"Hours",0);case r:return v(y+"Minutes",1);case i:return v(y+"Seconds",2);case s:return v(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=k.p(e),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[u]=p+"FullYear",o[r]=p+"Hours",o[i]=p+"Minutes",o[s]=p+"Seconds",o[n]=p+"Milliseconds",o)[c],v=c===a?this.$D+(t-this.$W):t;if(c===l||c===u){var h=this.clone().set(d,1);h.$d[f](v),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[k.p(e)]()},m.add=function(n,c){var d,p=this;n=Number(n);var f=k.p(c),v=function(e){var t=w(p);return k.w(t.date(t.date()+Math.round(e*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===a)return v(1);if(f===o)return v(7);var h=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[f]||1,m=this.$d.getTime()+n*h;return k.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=k.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},f=function(e){return k.s(r%12||12,e,"0")},h=u||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(v,(function(e,s){return s||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return k.s(t.$y,4,"0");case"M":return o+1;case"MM":return k.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,c,3);case"MMMM":return d(c,o);case"D":return t.$D;case"DD":return k.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return k.s(r,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return h(r,a,!0);case"A":return h(r,a,!1);case"m":return String(a);case"mm":return k.s(a,2,"0");case"s":return String(t.$s);case"ss":return k.s(t.$s,2,"0");case"SSS":return k.s(t.$ms,3,"0");case"Z":return i}return null}(e)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var f,v=this,h=k.p(d),m=w(n),_=(m.utcOffset()-this.utcOffset())*e,y=this-m,b=function(){return k.m(v,m)};switch(h){case u:f=b()/12;break;case l:f=b();break;case c:f=b()/3;break;case o:f=(y-_)/6048e5;break;case a:f=(y-_)/864e5;break;case r:f=y/t;break;case i:f=y/e;break;case s:f=y/1e3;break;default:f=y}return p?f:k.a(f)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return b[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=M(e,t,!0);return s&&(n.$L=s),n},m.clone=function(){return k.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),x=E.prototype;return w.prototype=x,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(e){x[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,E,w),e.$i=!0),w},w.locale=M,w.isDayjs=$,w.unix=function(e){return w(1e3*e)},w.en=b[y],w.Ls=b,w.p={},w}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,s=0;s<t.length;s++)if(t[s].identifier===e){n=s;break}return n}function s(e,s){for(var r={},a=[],o=0;o<e.length;o++){var l=e[o],c=s.base?l[0]+s.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var p=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)t[p].references++,t[p].updater(f);else{var v=i(f,s);s.byIndex=o,t.splice(o,0,{identifier:d,updater:v,references:1})}a.push(d)}return a}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var r=s(e=e||[],i=i||{});return function(e){e=e||[];for(var a=0;a<r.length;a++){var o=n(r[a]);t[o].references--}for(var l=s(e,i),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var s=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={id:s,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";const e="afterbegin";function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.element)}function s(e,t){if(!(e instanceof b&&t instanceof b))throw new Error("Can replace only components");const n=e.element,s=t.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}var i=n(379),r=n.n(i),a=n(795),o=n.n(a),l=n(569),c=n.n(l),u=n(565),d=n.n(u),p=n(216),f=n.n(p),v=n(589),h=n.n(v),m=n(10),_={};_.styleTagTransform=h(),_.setAttributes=d(),_.insert=c().bind(null,"head"),_.domAPI=o(),_.insertStyleElement=f(),r()(m.Z,_),m.Z&&m.Z.locals&&m.Z.locals;const y="shake";class b{#e=null;constructor(){if(new.target===b)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),e?.()}),600)}}const g=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],$="YYYY-MM-DD HH:MM",M="HH:mm",w=[{type:"day",state:"checked",label:"Day"},{type:"event",state:"disabled",label:"Event"},{type:"time",state:null,label:"Time"},{type:"price",state:null,label:"Price"},{type:"offer",state:"disabled",label:"Offers"}],k="everything",E="future",x="present",S="past",T=[{type:k,state:"checked",label:"Everything"},{type:E,state:null,label:"Future"},{type:x,state:null,label:"Present"},{type:S,state:null,label:"Past"}],A=[{type:"luggage",price:"30",label:"Add luggage",state:"checked"},{type:"comfort",price:"100",label:"Switch to comfort class",state:"checked"},{type:"meal",price:"15",label:"Add meal",state:null},{type:"seats",price:"5",label:"Choose seats",state:null},{type:"train",price:"40",label:"Travel by train",state:null}],C={[k]:"Click New Event to create your first point",[E]:"There are no future events now",[x]:"There are no present events now",[S]:"There are no past events now"};class D extends b{get template(){return'\n    <section class="trip-main__trip-info  trip-info">\n        <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n        </div>\n\n        <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n        </p>\n    </section>\n  '}}class U extends b{get template(){return`\n    <form class="trip-filters" action="#" method="get">\n      ${T.map((e=>`\n    <div class="trip-filters__filter">\n      <input id="filter-${e.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e.type}" ${e.state}>\n      <label class="trip-filters__filter-label" for="filter-${e.type}">${e.label}</label>\n    </div>\n  `)).join("")}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>\n  `}}class L extends b{get template(){return`\n    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      ${w.map((e=>`\n    <div class="trip-sort__item  trip-sort__item--${e.type}">\n      <input id="sort-${e.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e.type}" ${e.state}>\n      <label class="trip-sort__btn" for="sort-${e.type}">${e.label}</label>\n    </div>\n  `)).join("")}\n    </form>\n  `}}var O=n(484),F=n.n(O);function j(e){return e[Math.floor(Math.random()*e.length)]}function P(e){return e[0].toUpperCase()+e.slice(1)}function H(e,t){return F()(e).format(t)}class B extends b{#t=null;#n=null;constructor({trip:e,onEditClick:t}){super(),this.#t=e,this.#n=t,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#n)}get template(){return function(e){const{type:t,destination:n,dateFrom:s,dateTo:i,basePrice:r,offers:a}=e,o=`${H(s,"MMM").toUpperCase()} ${H(s,"D")}`,l=`${P(t)} ${n.name}`,c=H(s,M),u=H(i,M),d=a.map((e=>`\n    <li class="event__offer">\n      <span class="event__offer-title">${e.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${e.price}</span>\n    </li>`)).join("");return`\n    <li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="2019-03-18">${o}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${t}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${l}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${s}>${c}</time>\n            &mdash;\n            <time class="event__end-time" datetime=${i}>${u}</time>\n          </p>\n          <p class="event__duration">${function(e,t){const n=F()(t).diff(e,"m");if(n<60)return`${n}M`;const s=Math.floor(n/60),i=n-60*s;return i?`${s}H ${i}M`:`${s}H`}(s,i)}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${r}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${d}\n        </ul>\n        <button class="event__favorite-btn event__favorite-btn--active" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>\n  `}(this.#t)}}class I extends b{get template(){return'<ul class="trip-events__list"></ul>'}}class Y extends b{get template(){return`\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${g.map((e=>`\n    <div class="event__type-item">\n      <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${P(e)}</label>\n    </div>\n  `)).join("")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            Flight\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Cancel</button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n            ${A.map((e=>`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e.type}-1" type="checkbox" name="event-offer-${e.type}" ${e.state}>\n      <label class="event__offer-label" for="event-offer-${e.type}-1">\n        <span class="event__offer-title">${e.label}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${e.price}</span>\n      </label>\n    </div>\n  `)).join("")}\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>\n\n          <div class="event__photos-container">\n            <div class="event__photos-tape">\n              <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">\n              <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">\n            </div>\n          </div>\n        </section>\n      </section>\n    </form>\n  `}}class Z extends b{#s=null;#i=null;#r=null;#a=null;#o=null;constructor({editingTrip:e,destinations:t,offers:n,onCloseClick:s,onFormSubmit:i}){super(),this.#s=e,this.#i=t,this.#r=n,this.#a=s,this.#o=i,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#a),this.element.querySelector(".event__save-btn").addEventListener("click",this.#o)}get template(){return function({editingTrip:e,destinations:t,offers:n}){const s=g.map((e=>`\n    <div class="event__type-item">\n      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${e}>\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${P(e)}</label>\n    </div>\n  `)).join(""),i=P(e.type),r=t.map((e=>`\n    <option value=${e.name}></option>\n  `)).join(""),a=H(e.dateFrom,$),o=H(e.dateTo,$),l=n.map((t=>{const n=t.title.toLowerCase();return`\n      <div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-${n}" ${e.offers.find((e=>e.id===t.id))?"checked":""}>\n        <label class="event__offer-label" for="event-offer-${n}-1">\n          <span class="event__offer-title">${n}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${t.price}</span>\n        </label>\n      </div>\n    `})).join("");return`\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${e.type}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${s}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${i}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${e.destination.name} list="destination-list-1">\n          <datalist id="destination-list-1">\n            ${r}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${a}>\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${o}>\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${e.basePrice}>\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n            ${l}\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${e.destination.description}</p>\n        </section>\n      </section>\n    </form>\n  `}({editingTrip:this.#s,destinations:this.#i,offers:this.#r})}}class q extends b{get template(){const e=T.find((e=>"checked"===e.state));return`<p class="trip-events__msg">${C[e.type]}</p>`}}const N=[{id:"1",description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",name:"Moscow",pictures:[{src:"https://loremflickr.com/248/152?random=1",description:"Moscow parliament building"}]},{id:"2",description:"Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.",name:"London",pictures:[{src:"https://loremflickr.com/248/152?random=2",description:"London parliament building"}]},{id:"3",description:"Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.",name:"Dubai",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Dubai parliament building"}]},{id:"4",description:"Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.",name:"Seul",pictures:[{src:"https://loremflickr.com/248/152?random=4",description:"Seul parliament building"}]},{id:"5",description:"In rutrum ac purus sit amet tempus.",name:"Tver",pictures:[{src:"https://loremflickr.com/248/152?random=5",description:"Tver parliament building"}]}],W=[{type:"taxi",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"bus",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"train",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"ship",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"drive",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"flight",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"check-in",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"sightseeing",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]},{type:"restaurant",offers:[{id:"1",title:"Upgrade to a business class",price:20},{id:"2",title:"Upgrade to a business class",price:30},{id:"3",title:"Upgrade to a business class",price:40}]}],R=[{id:"1",type:j(g),destination:"3",dateFrom:"2023-04-04T20:00:00.845Z",dateTo:"2023-04-04T23:30:00.845Z",basePrice:"1000",isFavorite:!0,offers:["1"]},{id:"2",type:j(g),destination:"3",dateFrom:"2023-04-05T03:00:00.845Z",dateTo:"2023-04-05T03:30:00.845Z",basePrice:"700",isFavorite:!0,offers:["1","2"]},{id:"3",type:j(g),destination:"3",dateFrom:"2023-04-10T13:00:00.845Z",dateTo:"2023-04-10T13:30:00.845Z",basePrice:"200",isFavorite:!1,offers:["2"]},{id:"4",type:j(g),destination:"3",dateFrom:"2023-04-20T20:00:00.845Z",dateTo:"2023-04-20T22:00:00.845Z",basePrice:"300",isFavorite:!0,offers:["1","3"]}];function z(){return j(R)}const J=document.querySelector(".trip-main"),X=document.querySelector(".trip-controls__filters"),G=document.querySelector(".trip-events"),V=new class{destinations=[];offers=[];trips=[];constructor(){this.destinations=N,this.offers=W,this.trips=this.getRandomTrips()}getRandomTrips(){const e=Array.from({length:4},z),t=this.destinations.reduce(((e,t)=>(e[t.id]=t,e)),{}),n=this.offers.reduce(((e,t)=>(e[t.type]=[...t.offers],e)),{});return e.reduce(((e,s)=>{const i={...s},r=s.destination;return i.destination=t[r],i.offers=n[s.type].filter((e=>s.offers.includes(e.id))),e.push(i),e}),[])}},K=new class{constructor(e){this.destinations=e.destinations}}(V),Q=new class{constructor(e){this.offers=e.offers}getOffersByType(e){return this.offers.find((t=>t.type===e)).offers}}(V),ee=new class{constructor(e){this.trips=e.trips}getRandomTrip(){return j(this.trips)}}(V),te=new class{#l=new D;#c=e;#u=null;constructor(e){this.#u=e}init(){t(this.#l,this.#u,this.#c)}}(J),ne=new class{#d=new U;#c=e;#u=null;constructor(e){this.#u=e}init(){t(this.#d,this.#u,this.#c)}}(X),se=new class{#p=new L;#u=null;constructor(e){this.#u=e}init(){t(this.#p,this.#u)}}(G),ie=new class{#f=new I;#v=new Y;#u=null;#h=null;#m=null;#_=null;constructor({container:e,destinationsModel:t,offersModel:n,tripsModel:s}){this.#u=e,this.#h=t,this.#m=n,this.#_=s}init(){const e=this.#_.trips;t(this.#f,this.#u),0!==e.length?e.forEach((e=>{this.#y(e)})):this.#b()}#b(){t(new q,this.#f.element)}#y(e){const n=this.#_.getRandomTrip(),i=this.#h.destinations,r=this.#m.getOffersByType(n.type),a=new B({trip:e,onEditClick:()=>{s(o,a),document.addEventListener("keydown",c)}}),o=new Z({editingTrip:n,destinations:i,offers:r,onCloseClick:function(){l()},onFormSubmit:()=>{l(),document.removeEventListener("keydown",c)}});function l(){s(a,o)}function c(){l()}t(a,this.#f.element)}}({container:G,destinationsModel:K,offersModel:Q,tripsModel:ee});te.init(),ne.init(),ee.trips.length>0&&se.init(),ie.init()})()})();
//# sourceMappingURL=bundle.d4cda7605e34b1e8f47f.js.map