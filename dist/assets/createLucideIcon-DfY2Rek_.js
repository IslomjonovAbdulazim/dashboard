import{r as a,j as f,v as w,w as h}from"./index-DblQifBp.js";var v=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],A=v.reduce((t,e)=>{const r=w(`Primitive.${e}`),o=a.forwardRef((i,s)=>{const{asChild:c,...n}=i,l=c?r:e;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),f.jsx(l,{...n,ref:s})});return o.displayName=`Primitive.${e}`,{...t,[e]:o}},{});function P(t,e){t&&h.flushSync(()=>t.dispatchEvent(e))}/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),x=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,o)=>o?o.toUpperCase():r.toLowerCase()),u=t=>{const e=x(t);return e.charAt(0).toUpperCase()+e.slice(1)},p=(...t)=>t.filter((e,r,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===r).join(" ").trim(),g=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=a.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:r=2,absoluteStrokeWidth:o,className:i="",children:s,iconNode:c,...n},l)=>a.createElement("svg",{ref:l,...E,width:e,height:e,stroke:t,strokeWidth:o?Number(r)*24/Number(e):r,className:p("lucide",i),...!s&&!g(n)&&{"aria-hidden":"true"},...n},[...c.map(([m,d])=>a.createElement(m,d)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=(t,e)=>{const r=a.forwardRef(({className:o,...i},s)=>a.createElement(b,{ref:s,iconNode:e,className:p(`lucide-${C(u(t))}`,`lucide-${t}`,o),...i}));return r.displayName=u(t),r};export{A as P,$ as c,P as d};
