var te=Object.defineProperty,le=Object.defineProperties;var ne=Object.getOwnPropertyDescriptors;var Y=Object.getOwnPropertySymbols;var ie=Object.prototype.hasOwnProperty,se=Object.prototype.propertyIsEnumerable;var Z=(l,e,a)=>e in l?te(l,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[e]=a,w=(l,e)=>{for(var a in e||(e={}))ie.call(e,a)&&Z(l,a,e[a]);if(Y)for(var a of Y(e))se.call(e,a)&&Z(l,a,e[a]);return l},H=(l,e)=>le(l,ne(e));import{S as q,i as E,s as N,e as j,t as $,g as k,a as h,c as v,E as L,d as y,X as S,f as p,Y as P,h as ae,F as z,q as V,r as W,m as M,k as A,w as x,j as oe,l as fe,Z as re,_ as b,$ as ue,a0 as me,a1 as ce,a2 as de,a3 as he,a4 as ge,a5 as _e,a6 as ve,a7 as pe}from"./vendor-b123dbec.js";function G(l,e,a){const s=l.slice();return s[2]=e[a],s[4]=a,s}function I(l,e,a){const s=l.slice();return s[2]=e[a],s[4]=a,s}function J(l){let e,a,s,u=l[0].count+"",r,n,c,t=l[0].lines,i=[];for(let o=0;o<t.length;o+=1)i[o]=K(I(l,t,o));return{c(){e=j("details"),a=j("summary"),s=$("<Show "),r=$(u),n=$(" identical lines>"),c=k();for(let o=0;o<i.length;o+=1)i[o].c();h(a,"class","svelte-19djgjm"),h(e,"class","svelte-19djgjm")},m(o,m){v(o,e,m),L(e,a),L(a,s),L(a,r),L(a,n),L(e,c);for(let d=0;d<i.length;d+=1)i[d].m(e,null)},p(o,m){if(m&1&&u!==(u=o[0].count+"")&&y(r,u),m&3){t=o[0].lines;let d;for(d=0;d<t.length;d+=1){const g=I(o,t,d);i[d]?i[d].p(g,m):(i[d]=K(g),i[d].c(),i[d].m(e,null))}for(;d<i.length;d+=1)i[d].d(1);i.length=t.length}},d(o){o&&p(e),P(i,o)}}}function K(l){let e,a=(l[0].fromStartLine===void 0?" ":l[0].fromStartLine+l[4])+"",s,u,r,n,c=(l[0].toStartLine===void 0?" ":l[0].toStartLine+l[4])+"",t,i,o,m,d=(l[2]||" ")+"",g;return{c(){e=j("div"),s=$(a),r=k(),n=j("div"),t=$(c),o=k(),m=j("div"),h(e,"class",u=S(`fromLine ${l[1]}`)+" svelte-19djgjm"),h(e,"aria-hidden","true"),h(n,"class",i=S(`toLine ${l[1]}`)+" svelte-19djgjm"),h(n,"aria-hidden","true"),h(m,"class",g=S(`code ${l[1]}`)+" svelte-19djgjm")},m(f,_){v(f,e,_),L(e,s),v(f,r,_),v(f,n,_),L(n,t),v(f,o,_),v(f,m,_),m.innerHTML=d},p(f,_){_&1&&a!==(a=(f[0].fromStartLine===void 0?" ":f[0].fromStartLine+f[4])+"")&&y(s,a),_&2&&u!==(u=S(`fromLine ${f[1]}`)+" svelte-19djgjm")&&h(e,"class",u),_&1&&c!==(c=(f[0].toStartLine===void 0?" ":f[0].toStartLine+f[4])+"")&&y(t,c),_&2&&i!==(i=S(`toLine ${f[1]}`)+" svelte-19djgjm")&&h(n,"class",i),_&1&&d!==(d=(f[2]||" ")+"")&&(m.innerHTML=d),_&2&&g!==(g=S(`code ${f[1]}`)+" svelte-19djgjm")&&h(m,"class",g)},d(f){f&&p(e),f&&p(r),f&&p(n),f&&p(o),f&&p(m)}}}function O(l){let e,a=(l[0].fromStartLine===void 0?" ":l[0].fromStartLine+l[4])+"",s,u,r,n,c=(l[0].toStartLine===void 0?" ":l[0].toStartLine+l[4])+"",t,i,o,m,d=(l[2]||" ")+"",g;return{c(){e=j("div"),s=$(a),r=k(),n=j("div"),t=$(c),o=k(),m=j("div"),h(e,"class",u=S(`fromLine ${l[1]}`)+" svelte-19djgjm"),h(e,"aria-hidden","true"),h(n,"class",i=S(`toLine ${l[1]}`)+" svelte-19djgjm"),h(n,"aria-hidden","true"),h(m,"class",g=S(`code ${l[1]}`)+" svelte-19djgjm")},m(f,_){v(f,e,_),L(e,s),v(f,r,_),v(f,n,_),L(n,t),v(f,o,_),v(f,m,_),m.innerHTML=d},p(f,_){_&1&&a!==(a=(f[0].fromStartLine===void 0?" ":f[0].fromStartLine+f[4])+"")&&y(s,a),_&2&&u!==(u=S(`fromLine ${f[1]}`)+" svelte-19djgjm")&&h(e,"class",u),_&1&&c!==(c=(f[0].toStartLine===void 0?" ":f[0].toStartLine+f[4])+"")&&y(t,c),_&2&&i!==(i=S(`toLine ${f[1]}`)+" svelte-19djgjm")&&h(n,"class",i),_&1&&d!==(d=(f[2]||" ")+"")&&(m.innerHTML=d),_&2&&g!==(g=S(`code ${f[1]}`)+" svelte-19djgjm")&&h(m,"class",g)},d(f){f&&p(e),f&&p(r),f&&p(n),f&&p(o),f&&p(m)}}}function Le(l){let e,a,s=l[1]==="hidden"&&J(l),u=l[0].lines,r=[];for(let n=0;n<u.length;n+=1)r[n]=O(G(l,u,n));return{c(){s&&s.c(),e=k();for(let n=0;n<r.length;n+=1)r[n].c();a=ae()},m(n,c){s&&s.m(n,c),v(n,e,c);for(let t=0;t<r.length;t+=1)r[t].m(n,c);v(n,a,c)},p(n,[c]){if(n[1]==="hidden"?s?s.p(n,c):(s=J(n),s.c(),s.m(e.parentNode,e)):s&&(s.d(1),s=null),c&3){u=n[0].lines;let t;for(t=0;t<u.length;t+=1){const i=G(n,u,t);r[t]?r[t].p(i,c):(r[t]=O(i),r[t].c(),r[t].m(a.parentNode,a))}for(;t<r.length;t+=1)r[t].d(1);r.length=u.length}},i:z,o:z,d(n){s&&s.d(n),n&&p(e),P(r,n),n&&p(a)}}}function je(l,e,a){let{change:s}=e,u;return l.$$set=r=>{"change"in r&&a(0,s=r.change)},l.$$.update=()=>{l.$$.dirty&1&&(s.added?a(1,u="added"):s.removed?a(1,u="removed"):s.hidden?a(1,u="hidden"):a(1,u="same"))},[s,u]}class Se extends q{constructor(e){super();E(this,e,je,Le,N,{change:0})}}function Q(l,e,a){const s=l.slice();return s[5]=e[a],s}function R(l){let e,a;return e=new Se({props:{change:l[5]}}),{c(){V(e.$$.fragment)},m(s,u){W(e,s,u),a=!0},p(s,u){const r={};u&2&&(r.change=s[5]),e.$set(r)},i(s){a||(M(e.$$.fragment,s),a=!0)},o(s){A(e.$$.fragment,s),a=!1},d(s){x(e,s)}}}function be(l){let e,a,s,u,r=l[1],n=[];for(let t=0;t<r.length;t+=1)n[t]=R(Q(l,r,t));const c=t=>A(n[t],1,1,()=>{n[t]=null});return{c(){e=j("code");for(let t=0;t<n.length;t+=1)n[t].c();a=k(),s=j("code"),h(e,"class","visualCode svelte-12l7s60"),h(e,"aria-hidden","true"),h(s,"class","sr-code svelte-12l7s60")},m(t,i){v(t,e,i);for(let o=0;o<n.length;o+=1)n[o].m(e,null);v(t,a,i),v(t,s,i),s.innerHTML=l[0],u=!0},p(t,[i]){if(i&2){r=t[1];let o;for(o=0;o<r.length;o+=1){const m=Q(t,r,o);n[o]?(n[o].p(m,i),M(n[o],1)):(n[o]=R(m),n[o].c(),M(n[o],1),n[o].m(e,null))}for(oe(),o=r.length;o<n.length;o+=1)c(o);fe()}(!u||i&1)&&(s.innerHTML=t[0])},i(t){if(!u){for(let i=0;i<r.length;i+=1)M(n[i]);u=!0}},o(t){n=n.filter(Boolean);for(let i=0;i<n.length;i+=1)A(n[i]);u=!1},d(t){t&&p(e),P(n,t),t&&p(a),t&&p(s)}}}function ke(l,e,a){let{from:s}=e,{to:u}=e,r;function n(t){let i=1,o=1;const m=[];for(let d=0;d<t.length;d++){const g=t[d],f=g.value.split(`
`);if(f[f.length-1]===""&&f.pop(),g.added)m.push(H(w({},g),{lines:f,toStartLine:o})),o+=g.count;else if(g.removed)m.push(H(w({},g),{lines:f,fromStartLine:i})),i+=g.count;else{const _=d===0,ee=d===t.length-1,C=_?0:3,T=ee?0:3,F=f.length-C-T;if(F>=6){const B=f.slice(0,C),D=f.slice(C,f.length-T),X=f.slice(f.length-T,f.length);C>0&&(m.push(H(w({},g),{count:B.length,lines:B,fromStartLine:i,toStartLine:o})),i+=C,o+=C),F>0&&(m.push(H(w({},g),{count:D.length,lines:D,fromStartLine:i,toStartLine:o,hidden:!0})),i+=F,o+=F),T>0&&(m.push(H(w({},g),{count:X.length,lines:X,fromStartLine:i,toStartLine:o})),i+=T,o+=T)}else m.push(H(w({},g),{lines:f,fromStartLine:i,toStartLine:o})),i+=g.count,o+=g.count}}return m}let c;return l.$$set=t=>{"from"in t&&a(2,s=t.from),"to"in t&&a(0,u=t.to)},l.$$.update=()=>{l.$$.dirty&5&&a(3,r=re(s!=null?s:u,u)),l.$$.dirty&8&&a(1,c=n(r))},[u,c,s,r]}class $e extends q{constructor(e){super();E(this,e,ke,be,N,{from:2,to:0})}}function U(l){let e,a,s,u,r,n,c;return{c(){e=j("label"),a=$("Show Diff"),r=k(),n=j("input"),h(e,"class","diffLabel svelte-1omgi29"),h(e,"for",s=`diff-${l[1].name}-${l[0].name}-checkbox`),h(e,"title",u=`Tick to show changes from ${l[1].name} to ${l[0].name}`),h(n,"class","diffCheckbox svelte-1omgi29"),h(n,"id",c=`diff-${l[1].name}-${l[0].name}-checkbox`),h(n,"type","checkbox"),n.checked=!0,h(n,"autocomplete","off")},m(t,i){v(t,e,i),L(e,a),v(t,r,i),v(t,n,i)},p(t,i){i&3&&s!==(s=`diff-${t[1].name}-${t[0].name}-checkbox`)&&h(e,"for",s),i&3&&u!==(u=`Tick to show changes from ${t[1].name} to ${t[0].name}`)&&h(e,"title",u),i&3&&c!==(c=`diff-${t[1].name}-${t[0].name}-checkbox`)&&h(n,"id",c)},d(t){t&&p(e),t&&p(r),t&&p(n)}}}function we(l){var o;let e,a,s=l[0].name+"",u,r,n,c,t,i=l[1]!==void 0&&U(l);return c=new $e({props:{from:l[2]((o=l[1])==null?void 0:o.snippet),to:l[2](l[0].snippet)}}),{c(){e=j("figure"),a=j("h2"),u=$(s),r=k(),i&&i.c(),n=k(),V(c.$$.fragment),h(a,"class","name svelte-1omgi29"),h(e,"class","container wide snippet svelte-1omgi29")},m(m,d){v(m,e,d),L(e,a),L(a,u),L(e,r),i&&i.m(e,null),L(e,n),W(c,e,null),t=!0},p(m,[d]){var f;(!t||d&1)&&s!==(s=m[0].name+"")&&y(u,s),m[1]!==void 0?i?i.p(m,d):(i=U(m),i.c(),i.m(e,n)):i&&(i.d(1),i=null);const g={};d&2&&(g.from=m[2]((f=m[1])==null?void 0:f.snippet)),d&1&&(g.to=m[2](m[0].snippet)),c.$set(g)},i(m){t||(M(c.$$.fragment,m),t=!0)},o(m){A(c.$$.fragment,m),t=!1},d(m){m&&p(e),i&&i.d(),x(c)}}}function He(l,e,a){let{config:s}=e,{diffFrom:u=void 0}=e;b.registerLanguage("c",ue),b.registerLanguage("typescript",me),b.registerLanguage("xml",ce),b.registerLanguage("javascript",de),b.registerLanguage("css",he),b.registerLanguage("java",ge),b.registerLanguage("json",_e),b.registerLanguage("yaml",ve);let r;function n(c){if(c===void 0)return;const t=c.trim();let i;r.noPrettify?i=t:i=pe.format(t,{parser:r.name}).trimEnd();let o;return r.highlightAuto?o=b.highlightAuto(i).value:o=b.highlight(r.name,i).value,o}return l.$$set=c=>{"config"in c&&a(0,s=c.config),"diffFrom"in c&&a(1,u=c.diffFrom)},l.$$.update=()=>{l.$$.dirty&1&&(r={c:{name:"c",noPrettify:!0},svelte:{name:"svelte",highlightAuto:!0},ts:{name:"typescript"},java:{name:"java"},html:{name:"html"},json:{name:"json"},yaml:{name:"yaml"}}[s.language])},[s,u,n]}class ye extends q{constructor(e){super();E(this,e,He,we,N,{config:0,diffFrom:1})}}export{ye as S};
