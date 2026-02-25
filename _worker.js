var Et=Object.defineProperty;var Ge=e=>{throw TypeError(e)};var Ct=(e,t,r)=>t in e?Et(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>Ct(e,typeof t!="symbol"?t+"":t,r),Me=(e,t,r)=>t.has(e)||Ge("Cannot "+r);var i=(e,t,r)=>(Me(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>t.has(e)?Ge("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Me(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Me(e,t,"access private method"),r);var We=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return i(e,t,s)}});var Be=(e,t,r)=>(s,n)=>{let a=-1;return o(0);async function o(l){if(l<=a)throw new Error("next() called multiple times");a=l;let c,d=!1,h;if(e[l]?(h=e[l][0][0],s.req.routeIndex=l):h=l===e.length&&n||void 0,h)try{c=await h(s,()=>o(l+1))}catch(u){if(u instanceof Error&&t)s.error=u,c=await t(u,s),d=!0;else throw u}else s.finalized===!1&&r&&(c=await r(s));return c&&(s.finalized===!1||d)&&(s.res=c),s}},Rt=Symbol(),jt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof ct?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Ot(e,{all:r,dot:s}):{}};async function Ot(e,t){const r=await e.formData();return r?At(r,t):{}}function At(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?St(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(Tt(r,s,n),delete r[s])}),r}var St=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Tt=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((a,o)=>{o===n.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},st=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Pt=e=>{const{groups:t,path:r}=_t(e),s=st(r);return Nt(s,t)},_t=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Nt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},Se={},Ht=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Se[s]||(r[2]?Se[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Se[s]=[e,r[1],!0]),Se[s]}return null},qe=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},It=e=>qe(e,decodeURI),nt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const a=t.indexOf("?",s),o=t.indexOf("#",s),l=a===-1?o===-1?void 0:o:o===-1?a:Math.min(a,o),c=t.slice(r,l);return It(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(n===63||n===35)break}return t.slice(r,s)},Dt=e=>{const t=nt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ne=(e,t,...r)=>(r.length&&(t=ne(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),at=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const a=n.replace("?","");s+="/"+a,r.push(s)}else s+="/"+n}),r.filter((n,a,o)=>o.indexOf(n)===a)},ke=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?qe(e,ot):e):e,it=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const l=e.charCodeAt(o+t.length+1);if(l===61){const c=o+t.length+2,d=e.indexOf("&",c);return ke(e.slice(c,d===-1?void 0:d))}else if(l==38||isNaN(l))return"";o=e.indexOf(`&${t}`,o+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const o=e.indexOf("&",a+1);let l=e.indexOf("=",a);l>o&&o!==-1&&(l=-1);let c=e.slice(a+1,l===-1?o===-1?void 0:o:l);if(s&&(c=ke(c)),a=o,c==="")continue;let d;l===-1?d="":(d=e.slice(l+1,o===-1?void 0:o),s&&(d=ke(d))),r?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(d)):n[c]??(n[c]=d)}return t?n[t]:n},$t=it,Mt=(e,t)=>it(e,t,!0),ot=decodeURIComponent,Ke=e=>qe(e,ot),oe,S,F,lt,dt,Le,q,Xe,ct=(Xe=class{constructor(e,t="/",r=[[]]){m(this,F);p(this,"raw");m(this,oe);m(this,S);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});m(this,q,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(a=>(n==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,S,r),f(this,oe,{})}param(e){return e?x(this,F,lt).call(this,e):x(this,F,dt).call(this)}query(e){return $t(this.url,e)}queries(e){return Mt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await jt(this,e))}json(){return i(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return i(this,q).call(this,"text")}arrayBuffer(){return i(this,q).call(this,"arrayBuffer")}blob(){return i(this,q).call(this,"blob")}formData(){return i(this,q).call(this,"formData")}addValidatedData(e,t){i(this,oe)[e]=t}valid(e){return i(this,oe)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Rt](){return i(this,S)}get matchedRoutes(){return i(this,S)[0].map(([[,e]])=>e)}get routePath(){return i(this,S)[0].map(([[,e]])=>e)[this.routeIndex].path}},oe=new WeakMap,S=new WeakMap,F=new WeakSet,lt=function(e){const t=i(this,S)[0][this.routeIndex][1][e],r=x(this,F,Le).call(this,t);return r&&/\%/.test(r)?Ke(r):r},dt=function(){const e={},t=Object.keys(i(this,S)[0][this.routeIndex][1]);for(const r of t){const s=x(this,F,Le).call(this,i(this,S)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?Ke(s):s)}return e},Le=function(e){return i(this,S)[1]?i(this,S)[1][e]:e},q=new WeakMap,Xe),kt={Stringify:1},ht=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(n?n[0]+=e:n=[e],Promise.all(a.map(l=>l({phase:t,buffer:n,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(c=>ht(c,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},Ft="text/plain; charset=UTF-8",Fe=(e,t)=>({"Content-Type":e,...t}),xe=(e,t)=>new Response(e,t),we,Ee,D,ce,$,O,Ce,le,de,Y,Re,je,z,ae,Qe,Lt=(Qe=class{constructor(e,t){m(this,z);m(this,we);m(this,Ee);p(this,"env",{});m(this,D);p(this,"finalized",!1);p(this,"error");m(this,ce);m(this,$);m(this,O);m(this,Ce);m(this,le);m(this,de);m(this,Y);m(this,Re);m(this,je);p(this,"render",(...e)=>(i(this,le)??f(this,le,t=>this.html(t)),i(this,le).call(this,...e)));p(this,"setLayout",e=>f(this,Ce,e));p(this,"getLayout",()=>i(this,Ce));p(this,"setRenderer",e=>{f(this,le,e)});p(this,"header",(e,t,r)=>{this.finalized&&f(this,O,xe(i(this,O).body,i(this,O)));const s=i(this,O)?i(this,O).headers:i(this,Y)??f(this,Y,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});p(this,"status",e=>{f(this,ce,e)});p(this,"set",(e,t)=>{i(this,D)??f(this,D,new Map),i(this,D).set(e,t)});p(this,"get",e=>i(this,D)?i(this,D).get(e):void 0);p(this,"newResponse",(...e)=>x(this,z,ae).call(this,...e));p(this,"body",(e,t,r)=>x(this,z,ae).call(this,e,t,r));p(this,"text",(e,t,r)=>!i(this,Y)&&!i(this,ce)&&!t&&!r&&!this.finalized?new Response(e):x(this,z,ae).call(this,e,t,Fe(Ft,r)));p(this,"json",(e,t,r)=>x(this,z,ae).call(this,JSON.stringify(e),t,Fe("application/json",r)));p(this,"html",(e,t,r)=>{const s=n=>x(this,z,ae).call(this,n,t,Fe("text/html; charset=UTF-8",r));return typeof e=="object"?ht(e,kt.Stringify,!1,{}).then(s):s(e)});p(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});p(this,"notFound",()=>(i(this,de)??f(this,de,()=>xe()),i(this,de).call(this,this)));f(this,we,e),t&&(f(this,$,t.executionCtx),this.env=t.env,f(this,de,t.notFoundHandler),f(this,je,t.path),f(this,Re,t.matchResult))}get req(){return i(this,Ee)??f(this,Ee,new ct(i(this,we),i(this,je),i(this,Re))),i(this,Ee)}get event(){if(i(this,$)&&"respondWith"in i(this,$))return i(this,$);throw Error("This context has no FetchEvent")}get executionCtx(){if(i(this,$))return i(this,$);throw Error("This context has no ExecutionContext")}get res(){return i(this,O)||f(this,O,xe(null,{headers:i(this,Y)??f(this,Y,new Headers)}))}set res(e){if(i(this,O)&&e){e=xe(e.body,e);for(const[t,r]of i(this,O).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=i(this,O).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,O,e),this.finalized=!0}get var(){return i(this,D)?Object.fromEntries(i(this,D)):{}}},we=new WeakMap,Ee=new WeakMap,D=new WeakMap,ce=new WeakMap,$=new WeakMap,O=new WeakMap,Ce=new WeakMap,le=new WeakMap,de=new WeakMap,Y=new WeakMap,Re=new WeakMap,je=new WeakMap,z=new WeakSet,ae=function(e,t,r){const s=i(this,O)?new Headers(i(this,O).headers):i(this,Y)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,l]of a)o.toLowerCase()==="set-cookie"?s.append(o,l):s.set(o,l)}if(r)for(const[a,o]of Object.entries(r))if(typeof o=="string")s.set(a,o);else{s.delete(a);for(const l of o)s.append(a,l)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??i(this,ce);return xe(e,{status:n,headers:s})},Qe),w="ALL",qt="all",zt=["get","post","put","delete","options","patch"],ut="Can not add a route since the matcher is already built.",ft=class extends Error{},Ut="__COMPOSED_HANDLER",Gt=e=>e.text("404 Not Found",404),Ve=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},P,E,pt,_,K,Te,Pe,he,Wt=(he=class{constructor(t={}){m(this,E);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");m(this,P,"/");p(this,"routes",[]);m(this,_,Gt);p(this,"errorHandler",Ve);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,_,t),this));p(this,"fetch",(t,...r)=>x(this,E,Pe).call(this,t,r[1],r[0],t.method));p(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ne("/",t)}`,r),s,n)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,E,Pe).call(this,t.request,t,void 0,t.request.method))})});[...zt,qt].forEach(a=>{this[a]=(o,...l)=>(typeof o=="string"?f(this,P,o):x(this,E,K).call(this,a,i(this,P),o),l.forEach(c=>{x(this,E,K).call(this,a,i(this,P),c)}),this)}),this.on=(a,o,...l)=>{for(const c of[o].flat()){f(this,P,c);for(const d of[a].flat())l.map(h=>{x(this,E,K).call(this,d.toUpperCase(),i(this,P),h)})}return this},this.use=(a,...o)=>(typeof a=="string"?f(this,P,a):(f(this,P,"*"),o.unshift(a)),o.forEach(l=>{x(this,E,K).call(this,w,i(this,P),l)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??nt:Dt}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var o;let a;r.errorHandler===Ve?a=n.handler:(a=async(l,c)=>(await Be([],r.errorHandler)(l,()=>n.handler(l,c))).res,a[Ut]=n.handler),x(o=s,E,K).call(o,n.method,n.path,a)}),this}basePath(t){const r=x(this,E,pt).call(this);return r._basePath=ne(this._basePath,t),r}mount(t,r,s){let n,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?n=c=>c:n=s.replaceRequest));const o=a?c=>{const d=a(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};n||(n=(()=>{const c=ne(this._basePath,t),d=c==="/"?0:c.length;return h=>{const u=new URL(h.url);return u.pathname=u.pathname.slice(d)||"/",new Request(u,h)}})());const l=async(c,d)=>{const h=await r(n(c.req.raw),...o(c));if(h)return h;await d()};return x(this,E,K).call(this,w,ne(t,"*"),l),this}},P=new WeakMap,E=new WeakSet,pt=function(){const t=new he({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,_,i(this,_)),t.routes=this.routes,t},_=new WeakMap,K=function(t,r,s){t=t.toUpperCase(),r=ne(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},Te=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Pe=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await x(this,E,Pe).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),o=this.router.match(n,a),l=new Lt(t,{path:a,matchResult:o,env:s,executionCtx:r,notFoundHandler:i(this,_)});if(o[0].length===1){let d;try{d=o[0][0][0][0](l,async()=>{l.res=await i(this,_).call(this,l)})}catch(h){return x(this,E,Te).call(this,h,l)}return d instanceof Promise?d.then(h=>h||(l.finalized?l.res:i(this,_).call(this,l))).catch(h=>x(this,E,Te).call(this,h,l)):d??i(this,_).call(this,l)}const c=Be(o[0],this.errorHandler,i(this,_));return(async()=>{try{const d=await c(l);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return x(this,E,Te).call(this,d,l)}})()},he),gt=[];function Bt(e,t){const r=this.buildAllMatchers(),s=((n,a)=>{const o=r[n]||r[w],l=o[2][a];if(l)return l;const c=a.match(o[0]);if(!c)return[[],gt];const d=c.indexOf("",1);return[o[1][d],c]});return this.match=s,s(e,t)}var Ne="[^/]+",ye=".*",be="(?:|/.*)",ie=Symbol(),Kt=new Set(".\\+*[^]$()");function Vt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ye||e===be?1:t===ye||t===be?-1:e===Ne?1:t===Ne?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,X,N,ee,Yt=(ee=class{constructor(){m(this,J);m(this,X);m(this,N,Object.create(null))}insert(t,r,s,n,a){if(t.length===0){if(i(this,J)!==void 0)throw ie;if(a)return;f(this,J,r);return}const[o,...l]=t,c=o==="*"?l.length===0?["","",ye]:["","",Ne]:o==="/*"?["","",be]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const h=c[1];let u=c[2]||Ne;if(h&&c[2]&&(u===".*"||(u=u.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(u))))throw ie;if(d=i(this,N)[u],!d){if(Object.keys(i(this,N)).some(g=>g!==ye&&g!==be))throw ie;if(a)return;d=i(this,N)[u]=new ee,h!==""&&f(d,X,n.varIndex++)}!a&&h!==""&&s.push([h,i(d,X)])}else if(d=i(this,N)[o],!d){if(Object.keys(i(this,N)).some(h=>h.length>1&&h!==ye&&h!==be))throw ie;if(a)return;d=i(this,N)[o]=new ee}d.insert(l,r,s,n,a)}buildRegExpStr(){const r=Object.keys(i(this,N)).sort(Vt).map(s=>{const n=i(this,N)[s];return(typeof i(n,X)=="number"?`(${s})@${i(n,X)}`:Kt.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof i(this,J)=="number"&&r.unshift(`#${i(this,J)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},J=new WeakMap,X=new WeakMap,N=new WeakMap,ee),He,Oe,Ze,Jt=(Ze=class{constructor(){m(this,He,{varIndex:0});m(this,Oe,new Yt)}insert(e,t,r){const s=[],n=[];for(let o=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const d=`@\\${o}`;return n[o]=[d,c],o++,l=!0,d}),!l)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=n.length-1;o>=0;o--){const[l]=n[o];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(l)!==-1){a[c]=a[c].replace(l,n[o][1]);break}}return i(this,Oe).insert(a,t,s,i(this,He),r),s}buildRegExp(){let e=i(this,Oe).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,a,o)=>a!==void 0?(r[++t]=Number(a),"$()"):(o!==void 0&&(s[Number(o)]=++t),"")),[new RegExp(`^${e}`),r,s]}},He=new WeakMap,Oe=new WeakMap,Ze),Xt=[/^$/,[],Object.create(null)],_e=Object.create(null);function mt(e){return _e[e]??(_e[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Qt(){_e=Object.create(null)}function Zt(e){var d;const t=new Jt,r=[];if(e.length===0)return Xt;const s=e.map(h=>[!/\*|\/:/.test(h[0]),...h]).sort(([h,u],[g,v])=>h?1:g?-1:u.length-v.length),n=Object.create(null);for(let h=0,u=-1,g=s.length;h<g;h++){const[v,y,T]=s[h];v?n[y]=[T.map(([A])=>[A,Object.create(null)]),gt]:u++;let C;try{C=t.insert(y,u,v)}catch(A){throw A===ie?new ft(y):A}v||(r[u]=T.map(([A,b])=>{const H=Object.create(null);for(b-=1;b>=0;b--){const[pe,De]=C[b];H[pe]=De}return[A,H]}))}const[a,o,l]=t.buildRegExp();for(let h=0,u=r.length;h<u;h++)for(let g=0,v=r[h].length;g<v;g++){const y=(d=r[h][g])==null?void 0:d[1];if(!y)continue;const T=Object.keys(y);for(let C=0,A=T.length;C<A;C++)y[T[C]]=l[y[T[C]]]}const c=[];for(const h in o)c[h]=r[o[h]];return[a,c,n]}function se(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(mt(r).test(t))return[...e[r]]}}var U,G,Ie,xt,et,er=(et=class{constructor(){m(this,Ie);p(this,"name","RegExpRouter");m(this,U);m(this,G);p(this,"match",Bt);f(this,U,{[w]:Object.create(null)}),f(this,G,{[w]:Object.create(null)})}add(e,t,r){var l;const s=i(this,U),n=i(this,G);if(!s||!n)throw new Error(ut);s[e]||[s,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[w]).forEach(d=>{c[e][d]=[...c[w][d]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=mt(t);e===w?Object.keys(s).forEach(d=>{var h;(h=s[d])[t]||(h[t]=se(s[d],t)||se(s[w],t)||[])}):(l=s[e])[t]||(l[t]=se(s[e],t)||se(s[w],t)||[]),Object.keys(s).forEach(d=>{(e===w||e===d)&&Object.keys(s[d]).forEach(h=>{c.test(h)&&s[d][h].push([r,a])})}),Object.keys(n).forEach(d=>{(e===w||e===d)&&Object.keys(n[d]).forEach(h=>c.test(h)&&n[d][h].push([r,a]))});return}const o=at(t)||[t];for(let c=0,d=o.length;c<d;c++){const h=o[c];Object.keys(n).forEach(u=>{var g;(e===w||e===u)&&((g=n[u])[h]||(g[h]=[...se(s[u],h)||se(s[w],h)||[]]),n[u][h].push([r,a-d+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(i(this,G)).concat(Object.keys(i(this,U))).forEach(t=>{e[t]||(e[t]=x(this,Ie,xt).call(this,t))}),f(this,U,f(this,G,void 0)),Qt(),e}},U=new WeakMap,G=new WeakMap,Ie=new WeakSet,xt=function(e){const t=[];let r=e===w;return[i(this,U),i(this,G)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==w&&t.push(...Object.keys(s[w]).map(a=>[a,s[w][a]]))}),r?Zt(t):null},et),W,M,tt,tr=(tt=class{constructor(e){p(this,"name","SmartRouter");m(this,W,[]);m(this,M,[]);f(this,W,e.routers)}add(e,t,r){if(!i(this,M))throw new Error(ut);i(this,M).push([e,t,r])}match(e,t){if(!i(this,M))throw new Error("Fatal error");const r=i(this,W),s=i(this,M),n=r.length;let a=0,o;for(;a<n;a++){const l=r[a];try{for(let c=0,d=s.length;c<d;c++)l.add(...s[c]);o=l.match(e,t)}catch(c){if(c instanceof ft)continue;throw c}this.match=l.match.bind(l),f(this,W,[l]),f(this,M,void 0);break}if(a===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(i(this,M)||i(this,W).length!==1)throw new Error("No active router has been determined yet.");return i(this,W)[0]}},W=new WeakMap,M=new WeakMap,tt),ve=Object.create(null),rr=e=>{for(const t in e)return!0;return!1},B,j,Q,ue,R,k,V,fe,sr=(fe=class{constructor(t,r,s){m(this,k);m(this,B);m(this,j);m(this,Q);m(this,ue,0);m(this,R,ve);if(f(this,j,s||Object.create(null)),f(this,B,[]),t&&r){const n=Object.create(null);n[t]={handler:r,possibleKeys:[],score:0},f(this,B,[n])}f(this,Q,[])}insert(t,r,s){f(this,ue,++We(this,ue)._);let n=this;const a=Pt(r),o=[];for(let l=0,c=a.length;l<c;l++){const d=a[l],h=a[l+1],u=Ht(d,h),g=Array.isArray(u)?u[0]:d;if(g in i(n,j)){n=i(n,j)[g],u&&o.push(u[1]);continue}i(n,j)[g]=new fe,u&&(i(n,Q).push(u),o.push(u[1])),n=i(n,j)[g]}return i(n,B).push({[t]:{handler:s,possibleKeys:o.filter((l,c,d)=>d.indexOf(l)===c),score:i(this,ue)}}),n}search(t,r){var h;const s=[];f(this,R,ve);let a=[this];const o=st(r),l=[],c=o.length;let d=null;for(let u=0;u<c;u++){const g=o[u],v=u===c-1,y=[];for(let C=0,A=a.length;C<A;C++){const b=a[C],H=i(b,j)[g];H&&(f(H,R,i(b,R)),v?(i(H,j)["*"]&&x(this,k,V).call(this,s,i(H,j)["*"],t,i(b,R)),x(this,k,V).call(this,s,H,t,i(b,R))):y.push(H));for(let pe=0,De=i(b,Q).length;pe<De;pe++){const ze=i(b,Q)[pe],L=i(b,R)===ve?{}:{...i(b,R)};if(ze==="*"){const te=i(b,j)["*"];te&&(x(this,k,V).call(this,s,te,t,i(b,R)),f(te,R,L),y.push(te));continue}const[wt,Ue,ge]=ze;if(!g&&!(ge instanceof RegExp))continue;const I=i(b,j)[wt];if(ge instanceof RegExp){if(d===null){d=new Array(c);let re=r[0]==="/"?1:0;for(let me=0;me<c;me++)d[me]=re,re+=o[me].length+1}const te=r.substring(d[u]),$e=ge.exec(te);if($e){if(L[Ue]=$e[0],x(this,k,V).call(this,s,I,t,i(b,R),L),rr(i(I,j))){f(I,R,L);const re=((h=$e[0].match(/\//))==null?void 0:h.length)??0;(l[re]||(l[re]=[])).push(I)}continue}}(ge===!0||ge.test(g))&&(L[Ue]=g,v?(x(this,k,V).call(this,s,I,t,L,i(b,R)),i(I,j)["*"]&&x(this,k,V).call(this,s,i(I,j)["*"],t,L,i(b,R))):(f(I,R,L),y.push(I)))}}const T=l.shift();a=T?y.concat(T):y}return s.length>1&&s.sort((u,g)=>u.score-g.score),[s.map(({handler:u,params:g})=>[u,g])]}},B=new WeakMap,j=new WeakMap,Q=new WeakMap,ue=new WeakMap,R=new WeakMap,k=new WeakSet,V=function(t,r,s,n,a){for(let o=0,l=i(r,B).length;o<l;o++){const c=i(r,B)[o],d=c[s]||c[w],h={};if(d!==void 0&&(d.params=Object.create(null),t.push(d),n!==ve||a&&a!==ve))for(let u=0,g=d.possibleKeys.length;u<g;u++){const v=d.possibleKeys[u],y=h[d.score];d.params[v]=a!=null&&a[v]&&!y?a[v]:n[v]??(a==null?void 0:a[v]),h[d.score]=!0}}},fe),Z,rt,nr=(rt=class{constructor(){p(this,"name","TrieRouter");m(this,Z);f(this,Z,new sr)}add(e,t,r){const s=at(t);if(s){for(let n=0,a=s.length;n<a;n++)i(this,Z).insert(e,s[n],r);return}i(this,Z).insert(e,t,r)}match(e,t){return i(this,Z).search(e,t)}},Z=new WeakMap,rt),vt=class extends Wt{constructor(e={}){super(e),this.router=e.router??new tr({routers:[new er,new nr]})}},ar=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ye=(e,t=or)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let n=t[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},ir={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},or=ir,cr=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const n of r)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},yt={br:".br",zstd:".zst",gzip:".gz"},lr=Object.keys(yt),dr="index.html",hr=e=>{const t=e.root??"./",r=e.path,s=e.join??cr;return async(n,a)=>{var h,u,g,v;if(n.finalized)return a();let o;if(e.path)o=e.path;else try{if(o=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(o))throw new Error}catch{return await((h=e.onNotFound)==null?void 0:h.call(e,n.req.path,n)),a()}let l=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(l)&&(l=s(l,dr));const c=e.getContent;let d=await c(l,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const y=e.mimes&&Ye(l,e.mimes)||Ye(l);if(n.header("Content-Type",y||"application/octet-stream"),e.precompressed&&(!y||ar.test(y))){const T=new Set((u=n.req.header("Accept-Encoding"))==null?void 0:u.split(",").map(C=>C.trim()));for(const C of lr){if(!T.has(C))continue;const A=await c(l+yt[C],n);if(A){d=A,n.header("Content-Encoding",C),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((g=e.onFound)==null?void 0:g.call(e,l,n)),n.body(d)}await((v=e.onNotFound)==null?void 0:v.call(e,l,n)),await a()}},ur=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=r[e];if(!n)return null;const a=await s.get(n,{type:"stream"});return a||null},fr=e=>async function(r,s){return hr({...e,getContent:async a=>ur(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},pr=e=>fr(e),gr=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:o=>a===o?o:null:typeof a=="function"?a:o=>a.includes(o)?o:null)(r.origin),n=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(o,l){var h;function c(u,g){o.res.headers.set(u,g)}const d=await s(o.req.header("origin")||"",o);if(d&&c("Access-Control-Allow-Origin",d),r.credentials&&c("Access-Control-Allow-Credentials","true"),(h=r.exposeHeaders)!=null&&h.length&&c("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),o.req.method==="OPTIONS"){r.origin!=="*"&&c("Vary","Origin"),r.maxAge!=null&&c("Access-Control-Max-Age",r.maxAge.toString());const u=await n(o.req.header("origin")||"",o);u.length&&c("Access-Control-Allow-Methods",u.join(","));let g=r.allowHeaders;if(!(g!=null&&g.length)){const v=o.req.header("Access-Control-Request-Headers");v&&(g=v.split(/\s*,\s*/))}return g!=null&&g.length&&(c("Access-Control-Allow-Headers",g.join(",")),o.res.headers.append("Vary","Access-Control-Request-Headers")),o.res.headers.delete("Content-Length"),o.res.headers.delete("Content-Type"),new Response(null,{headers:o.res.headers,status:204,statusText:"No Content"})}await l(),r.origin!=="*"&&o.header("Vary","Origin",{append:!0})}};const Ae=new vt;Ae.use("/api/*",gr());Ae.use("/static/*",pr({root:"./public"}));Ae.get("/api/commands",async e=>{try{const t=await fetch("https://raw.githubusercontent.com/dzhechko/claude-commands-docs/main/commands-data.json").then(r=>r.json()).catch(()=>[]);return e.json(t)}catch{return e.json({error:"Failed to load commands"},500)}});Ae.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Интерактивный транскрипт команд Claude Code — полное руководство по командам для разработки">
        <meta name="keywords" content="Claude Code, команды, разработка, AI, documentation">
        <meta name="author" content="Дмитрий Жечков">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="Команды Claude Code — Интерактивный Транскрипт">
        <meta property="og:description" content="Полное интерактивное руководство по командам Claude Code для разработки">
        <meta property="og:url" content="https://claude-commands-docs.pages.dev/">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="Команды Claude Code — Интерактивный Транскрипт">
        <meta property="twitter:description" content="Полное интерактивное руководство по командам Claude Code">
        
        <title>Команды Claude Code — Интерактивный Транскрипт</title>
        
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
            
            * {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            
            code, pre, .command-text {
                font-family: 'Fira Code', 'Courier New', monospace;
            }
            
            body {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
            }
            
            .glass-effect {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .card-hover {
                transition: all 0.3s ease;
            }
            
            .card-hover:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }
            
            .category-badge {
                transition: all 0.2s ease;
            }
            
            .category-badge:hover {
                transform: scale(1.05);
            }
            
            .search-input {
                transition: all 0.3s ease;
            }
            
            .search-input:focus {
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
            }
            
            .command-detail {
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .step-number {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            
            .code-block {
                background: #1e1e1e;
                color: #d4d4d4;
                border-radius: 8px;
                padding: 1rem;
                overflow-x: auto;
            }
            
            .loading-spinner {
                border: 3px solid rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                border-top: 3px solid #667eea;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .phase-card {
                border-left: 4px solid #667eea;
            }
            
            /* Скрыть скроллбар, но оставить возможность прокрутки */
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        </style>
    </head>
    <body class="p-4 md:p-8">
        <!-- Header -->
        <header class="glass-effect rounded-2xl shadow-2xl mb-8 p-6 md:p-8">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            <i class="fas fa-terminal text-purple-600 mr-3"></i>
                            Команды Claude Code
                        </h1>
                        <p class="text-gray-600 text-sm md:text-base">
                            Интерактивный транскрипт команд для разработки
                        </p>
                        <p class="text-gray-500 text-xs md:text-sm mt-1">
                            <i class="fas fa-user mr-1"></i>
                            Подготовил: <a href="https://t.me/llm_notes" target="_blank" class="text-purple-600 hover:underline">Дмитрий Жечков</a>
                        </p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <a href="https://github.com/dzhechko/2026-jan-pu-opus-clone-01" target="_blank" 
                           class="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                            <i class="fab fa-github mr-2"></i>
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-6xl mx-auto">
            <!-- Search and Filter -->
            <div class="glass-effect rounded-2xl shadow-2xl mb-8 p-6">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <div class="relative">
                            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            <input 
                                type="text" 
                                id="searchInput" 
                                placeholder="Поиск команд..." 
                                class="search-input w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div class="flex gap-2 flex-wrap">
                        <button class="category-badge px-4 py-2 rounded-lg bg-purple-600 text-white font-medium" data-category="all">
                            Все
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="deployment">
                            Развёртывание
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="development">
                            Разработка
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="knowledge">
                            Знания
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="planning">
                            Планирование
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="bootstrap">
                            Bootstrap
                        </button>
                        <button class="category-badge px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300" data-category="testing">
                            Тестирование
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div id="loadingState" class="glass-effect rounded-2xl shadow-2xl p-12 text-center">
                <div class="loading-spinner mx-auto mb-4"></div>
                <p class="text-gray-600">Загрузка команд...</p>
            </div>

            <!-- Commands Grid -->
            <div id="commandsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" style="display: none;">
                <!-- Commands will be inserted here -->
            </div>

            <!-- Command Detail Modal -->
            <div id="commandDetail" class="hidden">
                <!-- Detail will be inserted here -->
            </div>
        </main>

        <!-- Footer -->
        <footer class="glass-effect rounded-2xl shadow-2xl mt-8 p-6 max-w-6xl mx-auto">
            <div class="text-center text-gray-600 text-sm">
                <p class="mb-2">
                    <i class="fas fa-code mr-2"></i>
                    Создано с использованием Claude Code & Hono
                </p>
                <p>
                    <i class="fas fa-calendar-alt mr-2"></i>
                    2026 | 
                    <a href="https://t.me/llm_notes" target="_blank" class="text-purple-600 hover:underline ml-1">
                        <i class="fab fa-telegram mr-1"></i>
                        t.me/llm_notes
                    </a>
                </p>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const Je=new vt,mr=Object.assign({"/src/index.tsx":Ae});let bt=!1;for(const[,e]of Object.entries(mr))e&&(Je.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Je.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),bt=!0);if(!bt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Je as default};
