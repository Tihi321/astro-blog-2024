const r={context:void 0,registry:void 0};function q(e){r.context=e}function V(){return{...r.context,id:`${r.context.id}${r.context.count++}-`,count:0}}const W=(e,t)=>e===t,I={equals:W};let G=F;const w=1,S=2,Y={owned:null,cleanups:null,context:null,owner:null};var p=null;let v=null,c=null,d=null,y=null,T=0;function K(e,t){const s=c,n=p,i=e.length===0,o=t===void 0?n:t,f=i?Y:{owned:null,cleanups:null,context:o?o.context:null,owner:o},l=i?e:()=>e(()=>b(()=>N(f)));p=f,c=null;try{return A(l,!0)}finally{c=s,p=n}}function le(e,t){t=t?Object.assign({},I,t):I;const s={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.value)),_(s,i));return[Q.bind(s),n]}function $(e,t,s){const n=X(e,t,!1,w);B(n)}function b(e){if(c===null)return e();const t=c;c=null;try{return e()}finally{c=t}}function Q(){if(this.sources&&this.state)if(this.state===w)B(this);else{const e=d;d=null,A(()=>C(this),!1),d=e}if(c){const e=this.observers?this.observers.length:0;c.sources?(c.sources.push(this),c.sourceSlots.push(e)):(c.sources=[this],c.sourceSlots=[e]),this.observers?(this.observers.push(c),this.observerSlots.push(c.sources.length-1)):(this.observers=[c],this.observerSlots=[c.sources.length-1])}return this.value}function _(e,t,s){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&A(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],f=v&&v.running;f&&v.disposed.has(o),(f?!o.tState:!o.state)&&(o.pure?d.push(o):y.push(o),o.observers&&O(o)),f||(o.state=w)}if(d.length>1e6)throw d=[],new Error},!1)),t}function B(e){if(!e.fn)return;N(e);const t=T;J(e,e.value,t)}function J(e,t,s){let n;const i=p,o=c;c=p=e;try{n=e.fn(t)}catch(f){return e.pure&&(e.state=w,e.owned&&e.owned.forEach(N),e.owned=null),e.updatedAt=s+1,R(f)}finally{c=o,p=i}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?_(e,n):e.value=n,e.updatedAt=s)}function X(e,t,s,n=w,i){const o={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:p,context:p?p.context:null,pure:s};return p===null||p!==Y&&(p.owned?p.owned.push(o):p.owned=[o]),o}function D(e){if(e.state===0)return;if(e.state===S)return C(e);if(e.suspense&&b(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<T);)e.state&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===w)B(e);else if(e.state===S){const n=d;d=null,A(()=>C(e,t[0]),!1),d=n}}function A(e,t){if(d)return e();let s=!1;t||(d=[]),y?s=!0:y=[],T++;try{const n=e();return Z(s),n}catch(n){s||(y=null),d=null,R(n)}}function Z(e){if(d&&(F(d),d=null),e)return;const t=y;y=null,t.length&&A(()=>G(t),!1)}function F(e){for(let t=0;t<e.length;t++)D(e[t])}function C(e,t){e.state=0;for(let s=0;s<e.sources.length;s+=1){const n=e.sources[s];if(n.sources){const i=n.state;i===w?n!==t&&(!n.updatedAt||n.updatedAt<T)&&D(n):i===S&&C(n,t)}}}function O(e){for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];s.state||(s.state=S,s.pure?d.push(s):y.push(s),s.observers&&O(s))}}function N(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),i=s.observers;if(i&&i.length){const o=i.pop(),f=s.observerSlots.pop();n<i.length&&(o.sourceSlots[f]=n,i[n]=o,s.observerSlots[n]=f)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)N(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function k(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function R(e,t=p){throw k(e)}let j=!1;function z(){j=!0}function oe(e,t){if(j&&r.context){const s=r.context;q(V());const n=b(()=>e(t||{}));return q(s),n}return b(()=>e(t||{}))}function ee(e,t,s){let n=s.length,i=t.length,o=n,f=0,l=0,h=t[i-1].nextSibling,u=null;for(;f<i||l<o;){if(t[f]===s[l]){f++,l++;continue}for(;t[i-1]===s[o-1];)i--,o--;if(i===f){const a=o<n?l?s[l-1].nextSibling:s[o-l]:h;for(;l<o;)e.insertBefore(s[l++],a)}else if(o===l)for(;f<i;)(!u||!u.has(t[f]))&&t[f].remove(),f++;else if(t[f]===s[o-1]&&s[l]===t[i-1]){const a=t[--i].nextSibling;e.insertBefore(s[l++],t[f++].nextSibling),e.insertBefore(s[--o],a),t[i]=s[o]}else{if(!u){u=new Map;let g=l;for(;g<o;)u.set(s[g],g++)}const a=u.get(t[f]);if(a!=null)if(l<a&&a<o){let g=f,m=1,U;for(;++g<i&&g<o&&!((U=u.get(t[g]))==null||U!==a+m);)m++;if(m>a-l){const P=t[f];for(;l<a;)e.insertBefore(s[l++],P)}else e.replaceChild(s[l++],t[f++])}else f++;else t[f++].remove()}}}function te(e,t,s,n={}){let i;return K(o=>{i=o,t===document?e():se(t,e(),t.firstChild?null:void 0,s)},n.owner),()=>{i(),t.textContent=""}}function fe(e,t,s){let n;const i=()=>{const f=document.createElement("template");return f.innerHTML=e,s?f.content.firstChild.firstChild:f.content.firstChild},o=t?()=>b(()=>document.importNode(n||(n=i()),!0)):()=>(n||(n=i())).cloneNode(!0);return o.cloneNode=o,o}function se(e,t,s,n){if(s!==void 0&&!n&&(n=[]),typeof t!="function")return E(e,t,n,s);$(i=>E(e,t(),i,s),n)}function ne(e,t,s={}){r.completed=globalThis._$HY.completed,r.events=globalThis._$HY.events,r.load=i=>globalThis._$HY.r[i],r.has=i=>i in globalThis._$HY.r,r.gather=i=>M(t,i),r.registry=new Map,r.context={id:s.renderId||"",count:0},M(t,s.renderId);const n=te(e,t,[...t.childNodes],s);return r.context=null,n}function re(e){let t,s;return!r.context||!(t=r.registry.get(s=ie()))?e():(r.completed&&r.completed.add(t),r.registry.delete(s),t)}function ue(e){let t=e,s=0,n=[];if(r.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="$")s++;else if(i==="/"){if(s===0)return[t,n];s--}}n.push(t),t=t.nextSibling}return[t,n]}function E(e,t,s,n,i){if(r.context){!s&&(s=[...e.childNodes]);let l=[];for(let h=0;h<s.length;h++){const u=s[h];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():l.push(u)}s=l}for(;typeof s=="function";)s=s();if(t===s)return s;const o=typeof t,f=n!==void 0;if(e=f&&s[0]&&s[0].parentNode||e,o==="string"||o==="number"){if(r.context)return s;if(o==="number"&&(t=t.toString()),f){let l=s[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),s=x(e,s,n,l)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t}else if(t==null||o==="boolean"){if(r.context)return s;s=x(e,s,n)}else{if(o==="function")return $(()=>{let l=t();for(;typeof l=="function";)l=l();s=E(e,l,s,n)}),()=>s;if(Array.isArray(t)){const l=[],h=s&&Array.isArray(s);if(H(l,t,s,i))return $(()=>s=E(e,l,s,n,!0)),()=>s;if(r.context){if(!l.length)return s;if(n===void 0)return[...e.childNodes];let u=l[0],a=[u];for(;(u=u.nextSibling)!==n;)a.push(u);return s=a}if(l.length===0){if(s=x(e,s,n),f)return s}else h?s.length===0?L(e,l,n):ee(e,s,l):(s&&x(e),L(e,l));s=l}else if(t.nodeType){if(r.context&&t.parentNode)return s=f?[t]:t;if(Array.isArray(s)){if(f)return s=x(e,s,n,t);x(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function H(e,t,s,n){let i=!1;for(let o=0,f=t.length;o<f;o++){let l=t[o],h=s&&s[o],u;if(!(l==null||l===!0||l===!1))if((u=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))i=H(e,l,h)||i;else if(u==="function")if(n){for(;typeof l=="function";)l=l();i=H(e,Array.isArray(l)?l:[l],Array.isArray(h)?h:[h])||i}else e.push(l),i=!0;else{const a=String(l);h&&h.nodeType===3&&h.data===a?e.push(h):e.push(document.createTextNode(a))}}return i}function L(e,t,s=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],s)}function x(e,t,s,n){if(s===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let o=!1;for(let f=t.length-1;f>=0;f--){const l=t[f];if(i!==l){const h=l.parentNode===e;!o&&!f?h?e.replaceChild(i,l):e.insertBefore(i,s):h&&l.remove()}else o=!0}}else e.insertBefore(i,s);return[i]}function M(e,t){const s=e.querySelectorAll("*[data-hk]");for(let n=0;n<s.length;n++){const i=s[n],o=i.getAttribute("data-hk");(!t||o.startsWith(t))&&!r.registry.has(o)&&r.registry.set(o,i)}}function ie(){const e=r.context;return`${e.id}${e.count++}`}const ce=(...e)=>(z(),ne(...e));export{ue as a,oe as b,le as c,re as g,ce as h,se as i,te as r,fe as t};
