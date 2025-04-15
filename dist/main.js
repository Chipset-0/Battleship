(()=>{var t={56:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},72:t=>{"use strict";var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var s={},a=[],o=0;o<t.length;o++){var c=t[o],h=r.base?c[0]+r.base:c[0],l=s[h]||0,u="".concat(h," ").concat(l);s[h]=l+1;var d=n(u),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==d)e[d].references++,e[d].updater(p);else{var A=i(p,r);r.byIndex=o,e.splice(o,0,{identifier:u,updater:A,references:1})}a.push(u)}return a}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var s=r(t=t||[],i=i||{});return function(t){t=t||[];for(var a=0;a<s.length;a++){var o=n(s[a]);e[o].references--}for(var c=r(t,i),h=0;h<s.length;h++){var l=n(s[h]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}s=c}}},113:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}},213:(t,e,n)=>{const{Ship:r}=n(357);class i{#t=null;#e=!1;#n=-1;constructor(t=null,e=!1,n=-1){this.#t=t,this.#e=e,this.#n=n}updateWithShip(t,e){this.#t=t,this.#n=e}isHit(){return this.#e}hasShip(){return!(null==this.#t)}hitTile(){return this.#e=!0,this.hasShip()?(this.#t.hit(this.#n),this.#t.isSunk()?2:1):0}getShip(){return this.#t}}t.exports={Gameboard:class{#r=[];#i=[];#s=9;#a={ship:null,hit:!1,index:-1};constructor(t=9){if(t<2)throw new Error("Invalid Size. Size cannot be less than 2");for(let e=0;e<t;e++){let e=[];for(let n=0;n<t;n++)e[n]=new i;this.#i.push(e)}this.#s=t}placeShip(t,e,n=!1){let i;try{i=new r(t)}catch(t){return"Could not create ship with invalid ship type. "+t}if(!i.isValidLocation(e,this.#s,n))return"Could not create ship at invalid location";i.setLocation(e,n);for(let t=0;t<i.getLength();t++)n?this.#i[e[0]][e[1]+t].updateWithShip(i,t):this.#i[e[0]+t][e[1]].updateWithShip(i,t);return this.#r.push(i),""}receiveAttack(t){return this.#i[t[0]][t[1]].hitTile()}allShipsSunk(){for(let t=0;t<this.#r.length;t++)if(!this.#r[t].isSunk())return!1;return!0}getPlayerBoard(){let t=[];for(let e=0;e<this.#s;e++){let n=[];for(let t=0;t<this.#s;t++){let r=this.#i[e][t];r.isHit()?r.hasShip()?r.getShip().isSunk()?n.push(2):n.push(1):n.push(0):r.hasShip()?n.push(3):n.push(-1)}t.push(n)}return t}getEnemyBoard(){let t=[];for(let e=0;e<this.#s;e++){let n=[];for(let t=0;t<this.#s;t++){let r=this.#i[e][t];r.isHit()?r.hasShip()?r.getShip().isSunk()?n.push(2):n.push(1):n.push(0):n.push(-1)}t.push(n)}return t}reset(){for(let t=0;t<size;t++){let t=[];for(let e=0;e<size;e++)t[e]=new i;this.#i.push(t)}}getSize(){return this.#s}getShips(){return this.#r}getBoard(){return this.#i}}}},310:(t,e,n)=>{const{Gameboard:r}=n(213);t.exports={Player:class{#o=null;#c=1;#h=!1;constructor(t=1,e=!1,n=9){this.#c=t,this.#h=e,this.createGameBoard(n)}createGameBoard(t=9){this.#o=new r(t)}receiveAttack(t){2==t.length&&this.#o.length>t[0]&&t[0]>0&&this.#o.length>t[1]&&t[1]>0?this.#o.receiveAttack(t):console.log("Invalid location received: "+t)}placeShip(t,e,n){let r=this.#o.placeShip(t,e,n);""!=r&&console.log(r)}getPlayerNumber(){return this.#c}getIsComputer(){return this.#h}getOwnGameboard(){return this.#o.getPlayerBoard()}getEnemyGameboard(){return this.#o.getEnemyBoard()}}}},314:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,i,s){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(r)for(var o=0;o<this.length;o++){var c=this[o][0];null!=c&&(a[c]=!0)}for(var h=0;h<t.length;h++){var l=[].concat(t[h]);r&&a[l[0]]||(void 0!==s&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=s),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),i&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=i):l[4]="".concat(i)),e.push(l))}},e}},354:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var r=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r),s="/*# ".concat(i," */");return[e].concat([s]).join("\n")}return[e].join("\n")}},357:t=>{t.exports={Ship:class{#l;#u;#d;#p;#A;constructor(t){switch(t.toUpperCase()){case"TUG":this.#l="Tug",this.#u=2;break;case"SUB":this.#l="Submarine",this.#u=3;break;case"DESTROYER":this.#l="Destroyer",this.#u=4;break;case"CARRIER":this.#l="Carrier",this.#u=5;break;default:throw new Error("Incorrect ship type, expect 'Tug', 'Sub', 'Destroyer' or 'Carrier'. Got "+t+" instead.")}this.#A=Array(this.#u).fill(!1),this.#d=!1}isValidLocation(t,e,n=!1){let r=t[0],i=t[1];if(n){if(i+this.#u>=e||i<0||r>=e||r<0)return!1}else if(r+this.#u>=e||r<0||i>=e||i<0)return!1;return!0}isSunk(){for(let t=0;t<this.#A.length;t++)if(1!=this.#A[t])return!1;return!0}hit(t){t>=0&&t<this.#A.length&&(this.#A[t]=!0)}setLocation(t,e){this.#p=t,this.#d=e}clear(){this.#A=Array(this.#u).fill(!1),this.#d=!1,this.#p=null}getName(){return this.#l}getLength(){return this.#u}getIsVertical(){return this.#d}getHitSections(){return this.#A}getLocation(){return this.#p}}}},512:t=>{t.exports={createTileButton:function(t,e,n=-1){let r=document.createElement("button");switch(r.classList.add("tile"),r.style.gridArea=`${e[0]+1} / ${e[1]+1} / span 1 / span 1`,n){case-1:r.classList.add("empty-tile");break;case 0:r.classList.add("miss");break;case 1:r.classList.add("hit");break;case 2:r.classList.add("sunk");break;case 3:r.classList.add("ship-exists")}return r.addEventListener("click",(()=>{t.receiveAttack(e)})),r}}},540:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},621:(t,e,n)=>{"use strict";n.d(e,{A:()=>o});var r=n(354),i=n.n(r),s=n(314),a=n.n(s)()(i());a.push([t.id,"body\n{\n    display: grid;\n    align-content: center;\n    height:100vh;\n    width:100vw;\n    margin:0;\n}\n\n.battleship-container\n{\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;\n    width: 100%;\n    height: 100%;\n}\n\n\n.board-container\n{\n    display: grid;\n    grid-template-rows: 1fr 9fr;\n    align-content: center;\n    width: 100%;\n    height: 100%\n}\n\n.board\n{\n    background-color: navy;\n    height:100%;\n    aspect-ratio: 1 / 1;\n    min-width: 300px;\n    min-height: 300px;\n    justify-self: center;\n    border-radius: 16px;\n    padding:4px;\n    display:grid;  \n    grid-template-columns: repeat(9 , 1fr);\n    grid-template-rows: repeat(9,1fr);\n\n}\n\n.tile\n{\n    border-radius: 8px;\n    border: 2px white solid;\n    background-color: transparent;\n}\n\n.tile:hover\n{\n    cursor: pointer;\n}\n\n.empty-tile\n{\n    /*Normal Tile*/\n}\n\n.miss\n{\n    background-color: white;\n}\n\n.hit\n{\n    background-color: red;\n}\n\n.sunk\n{\n    background-color: purple;\n}\n\n.ship-exists\n{\n    background-color: orange;\n}","",{version:3,sources:["webpack://./src/css/styles.css"],names:[],mappings:"AAAA;;IAEI,aAAa;IACb,qBAAqB;IACrB,YAAY;IACZ,WAAW;IACX,QAAQ;AACZ;;AAEA;;IAEI,aAAa;IACb,kCAAkC;IAClC,WAAW;IACX,YAAY;AAChB;;;AAGA;;IAEI,aAAa;IACb,2BAA2B;IAC3B,qBAAqB;IACrB,WAAW;IACX;AACJ;;AAEA;;IAEI,sBAAsB;IACtB,WAAW;IACX,mBAAmB;IACnB,gBAAgB;IAChB,iBAAiB;IACjB,oBAAoB;IACpB,mBAAmB;IACnB,WAAW;IACX,YAAY;IACZ,sCAAsC;IACtC,iCAAiC;;AAErC;;AAEA;;IAEI,kBAAkB;IAClB,uBAAuB;IACvB,6BAA6B;AACjC;;AAEA;;IAEI,eAAe;AACnB;;AAEA;;IAEI,cAAc;AAClB;;AAEA;;IAEI,uBAAuB;AAC3B;;AAEA;;IAEI,qBAAqB;AACzB;;AAEA;;IAEI,wBAAwB;AAC5B;;AAEA;;IAEI,wBAAwB;AAC5B",sourcesContent:["body\n{\n    display: grid;\n    align-content: center;\n    height:100vh;\n    width:100vw;\n    margin:0;\n}\n\n.battleship-container\n{\n    display: grid;\n    grid-template-columns: 1fr 2fr 1fr;\n    width: 100%;\n    height: 100%;\n}\n\n\n.board-container\n{\n    display: grid;\n    grid-template-rows: 1fr 9fr;\n    align-content: center;\n    width: 100%;\n    height: 100%\n}\n\n.board\n{\n    background-color: navy;\n    height:100%;\n    aspect-ratio: 1 / 1;\n    min-width: 300px;\n    min-height: 300px;\n    justify-self: center;\n    border-radius: 16px;\n    padding:4px;\n    display:grid;  \n    grid-template-columns: repeat(9 , 1fr);\n    grid-template-rows: repeat(9,1fr);\n\n}\n\n.tile\n{\n    border-radius: 8px;\n    border: 2px white solid;\n    background-color: transparent;\n}\n\n.tile:hover\n{\n    cursor: pointer;\n}\n\n.empty-tile\n{\n    /*Normal Tile*/\n}\n\n.miss\n{\n    background-color: white;\n}\n\n.hit\n{\n    background-color: red;\n}\n\n.sunk\n{\n    background-color: purple;\n}\n\n.ship-exists\n{\n    background-color: orange;\n}"],sourceRoot:""}]);const o=a},659:t=>{"use strict";var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},825:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,i&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var s=n.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}}},e={};function n(r){var i=e[r];if(void 0!==i)return i.exports;var s=e[r]={id:r,exports:{}};return t[r](s,s.exports,n),s.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(72),e=n.n(t),r=n(825),i=n.n(r),s=n(659),a=n.n(s),o=n(56),c=n.n(o),h=n(540),l=n.n(h),u=n(113),d=n.n(u),p=n(621),A={};A.styleTagTransform=d(),A.setAttributes=c(),A.insert=a().bind(null,"head"),A.domAPI=i(),A.insertStyleElement=l(),e()(p.A,A),p.A&&p.A.locals&&p.A.locals;const{createTileButton:g}=n(512),{Player:f}=n(310);let m=new f(3),b=document.getElementsByClassName("board")[0];m.receiveAttack([2,1]);let v=m.getOwnGameboard();for(let t=0;t<9;t++)for(let e=0;e<9;e++)b.appendChild(g(m,[t,e],v[t][e]));console.log(m.getPlayerNumber())})()})();
//# sourceMappingURL=main.js.map