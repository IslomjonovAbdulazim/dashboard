import{a6 as f,a as w,r as a,j as v,m as C,q as g}from"./index-0k3NMhGI.js";const y="https://api.zehnly.ai",i=f.create({baseURL:y,headers:{"Content-Type":"application/json"},timeout:1e4,withCredentials:!0});i.interceptors.request.use(e=>e,e=>Promise.reject(e));i.interceptors.response.use(e=>e,e=>(e.response?.status===401&&w.getState().auth.logout(),Promise.reject(e)));const S={login:async e=>(await i.post("/v1/users/login",e)).data,logout:async()=>{try{await i.post("/v1/users/logout")}catch(e){console.warn("Logout request failed:",e)}},checkAuth:async()=>{try{return await i.get("/v1/users/me"),!0}catch{return!1}}};var x=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],k=x.reduce((e,t)=>{const r=C(`Primitive.${t}`),s=a.forwardRef((n,o)=>{const{asChild:u,...c}=n,l=u?r:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),v.jsx(l,{...c,ref:o})});return s.displayName=`Primitive.${t}`,{...e,[t]:s}},{});function R(e,t){e&&g.flushSync(()=>e.dispatchEvent(t))}/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),b=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,s)=>s?s.toUpperCase():r.toLowerCase()),p=e=>{const t=b(e);return t.charAt(0).toUpperCase()+t.slice(1)},m=(...e)=>e.filter((t,r,s)=>!!t&&t.trim()!==""&&s.indexOf(t)===r).join(" ").trim(),E=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var P={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=a.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:n="",children:o,iconNode:u,...c},l)=>a.createElement("svg",{ref:l,...P,width:t,height:t,stroke:e,strokeWidth:s?Number(r)*24/Number(t):r,className:m("lucide",n),...!o&&!E(c)&&{"aria-hidden":"true"},...c},[...u.map(([d,h])=>a.createElement(d,h)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=(e,t)=>{const r=a.forwardRef(({className:s,...n},o)=>a.createElement(j,{ref:o,iconNode:t,className:m(`lucide-${A(p(e))}`,`lucide-${e}`,s),...n}));return r.displayName=p(e),r};export{k as P,S as a,i as b,$ as c,R as d};
