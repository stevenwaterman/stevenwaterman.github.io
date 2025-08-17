import{S as pe,i as me,s as ke,q as ue,r as ae,m as fe,k as re,w as ce,e as i,g as s,c as n,F as be,f as o}from"../../chunks/vendor-b123dbec.js";import{B as he}from"../../chunks/BlogPost-e708a599.js";import{S as ye}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-b3d019de.js";const we={name:"Basic Client",language:"ts",snippet:`
  // You will need to adjust this based on your WS message schema
  // Assuming "AUTH <token>" to authenticate, server responds "AUTH OK/ERROR"
  // Assuming server sends "AUTH EXPIRED" when your token expires

  let tokenPromise: Promise<string> = fetchToken();

  async function authenticate() {
    const token = await tokenPromise;
    ws.send("AUTH " + token);
  }

  ws.onOpen = () => authenticate();
  ws.onMessage = (event) => {
      if (event.data === "AUTH EXPIRED" || event.data === "AUTH ERROR") {
        tokenPromise = fetchToken();
        authenticate();
      }
  }
  `};var de={ws:we};function Te(j){let l,a,u,f,r,P,p,E,m,B,k,F,b,O,h,D,y,Y,w,X,d,G,T,J,v,K,x,Q,S,z,C,N,W,V,$,Z,H,g,c,ee,_,te,M,ne,q,oe,A,ie,R,se,I,le,L,U;return c=new ye({props:{config:de.ws}}),{c(){l=i("p"),l.innerHTML=`When I was the naive new guy at <a href="https://talkjs.com/">TalkJS</a>, someone suggested that
		I could tackle renewable authentication for our WebSockets. And after only a couple of weeks, it
		worked great on my machine\u2122.`,a=s(),u=i("p"),u.textContent="...but if your token expired while you were in a tunnel then it would break forever.",f=s(),r=i("h2"),r.textContent="The Problem",P=s(),p=i("p"),p.innerHTML=`When you enter the tunnel, you disconnect from the internet and your WebSocket connection
		closes. We start trying to reconnect, but after you leave the tunnel, the attempts to reconnect <em>still</em> fail, because now your token expired.`,E=s(),m=i("p"),m.textContent="That's easy, we'll just check for the 401 status code. Right?",B=s(),k=i("figure"),k.innerHTML=`<img src="/assets/blog/authenticating-javascript-websockets/meme.jpg" alt="A "for the better, right?" meme, using cats, "Your WebSocket connection failed" / "Because I'm in a tunnel, right?" / <blank> / "Because I'm in a tunnel, right?"" style="max-width: 50%"/> 
		<figcaption>Me encountering reality (2024)</figcaption>`,F=s(),b=i("h3"),b.textContent="IETF RFC 6455",O=s(),h=i("p"),h.textContent="The general WebSocket specification is happy to tell us about that 401 status code:",D=s(),y=i("blockquote"),y.innerHTML=`If the connection could not be opened, either because a direct connection failed or because any
		proxy used returned an error, then the client MUST <em>Fail the WebSocket Connection</em> and
		abort the connection attempt.
		<cite><a href="https://datatracker.ietf.org/doc/html/rfc6455#section-4.1">Section 4.1</a></cite>`,Y=s(),w=i("blockquote"),w.innerHTML=`Certain algorithms and specifications require an endpoint to <em>Fail the WebSocket Connection</em>. To do so, the client MUST <em>Close the WebSocket Connection</em>, and MAY report the problem
		to the user (which would be especially useful for developers) in an appropriate manner.
		<cite><a href="https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.7">Section 7.1.7</a></cite>`,X=s(),d=i("h3"),d.textContent="WHATWG WebSockets Standard",G=s(),T=i("p"),T.textContent="But when it comes to the browser specification, they're having none of it:",J=s(),v=i("blockquote"),v.innerHTML=`User agents must not convey any failure information to scripts... [because it] would allow a
		script to probe the user\u2019s local network in preparation for an attack.
		<cite><a href="https://websockets.spec.whatwg.org/#message-example">Section 4</a></cite>`,K=s(),x=i("p"),x.innerHTML=`At its core, this is because WebSocket connections don&#39;t support CORS. The initial WebSocket
		connection is treated like a <code>no-cors</code> request, meaning you cannot receive any information
		about the server&#39;s response.`,Q=s(),S=i("h3"),S.textContent="Impact",z=s(),C=i("p"),C.textContent=`The end result is that if a WebSocket connection fails, you just get told that it failed. This
		works fine, until you want to try and differentiate between "I am still in a tunnel" and "My
		auth expired".`,N=s(),W=i("h2"),W.textContent="The Solution",V=s(),$=i("p"),$.innerHTML=`We can&#39;t see the failure reason, so let&#39;s make sure there&#39;s only one option: network loss. That
		means that we need to remove any authentication checks from the initial connection. We need <strong>in-band authentication</strong>.`,Z=s(),H=i("p"),H.textContent=`Rather than checking auth tokens during the initial connection, we accept WebSocket connections
		from anyone. However, after connecting, you are left with an extremely limited "unauthenticated"
		session.`,g=s(),ue(c.$$.fragment),ee=s(),_=i("p"),_.textContent=`To authenticate the session, the client sends a WebSocket message containing their auth token.
		If it's valid, they become authenticated, otherwise they get a usable error message so they can
		refresh their token and try again.`,te=s(),M=i("p"),M.innerHTML=`Rather than terminating the connection when your token expires, your connection simply reverts
		to the unauthenticated state and tells the client. That way, if the WebSocket <em>does</em> close,
		the client knows it must be a network issue.`,ne=s(),q=i("h2"),q.textContent="Other Tips",oe=s(),A=i("p"),A.textContent="Quick list of other things to think about",ie=s(),R=i("ul"),R.innerHTML=`<li class="svelte-1t6539q">Make sure the client is still authenticated before you send them data.</li> 
		<li class="svelte-1t6539q">Clients should reauthenticate before their token expires, so they&#39;re always authenticated.</li> 
		<li class="svelte-1t6539q">The client&#39;s system time is probably wrong, don&#39;t trust it when checking token expiry. The
			server should return <code>validFor</code> after you authenticate.</li> 
		<li class="svelte-1t6539q">You can still pass an auth token in the initial connection, but you should allow the
			connection and then close the WebSocket with a 3000 status code if it&#39;s invalid. This is
			visible to the client.</li>`,se=s(),I=i("h2"),I.textContent="Conclusion",le=s(),L=i("p"),L.textContent=`Don't try to check auth tokens during the initial WebSocket connection. Do it once the WebSocket
		is connected, instead. It's much more robust, avoids nasty edge cases, and keeps your users
		happy.`},m(e,t){n(e,l,t),n(e,a,t),n(e,u,t),n(e,f,t),n(e,r,t),n(e,P,t),n(e,p,t),n(e,E,t),n(e,m,t),n(e,B,t),n(e,k,t),n(e,F,t),n(e,b,t),n(e,O,t),n(e,h,t),n(e,D,t),n(e,y,t),n(e,Y,t),n(e,w,t),n(e,X,t),n(e,d,t),n(e,G,t),n(e,T,t),n(e,J,t),n(e,v,t),n(e,K,t),n(e,x,t),n(e,Q,t),n(e,S,t),n(e,z,t),n(e,C,t),n(e,N,t),n(e,W,t),n(e,V,t),n(e,$,t),n(e,Z,t),n(e,H,t),n(e,g,t),ae(c,e,t),n(e,ee,t),n(e,_,t),n(e,te,t),n(e,M,t),n(e,ne,t),n(e,q,t),n(e,oe,t),n(e,A,t),n(e,ie,t),n(e,R,t),n(e,se,t),n(e,I,t),n(e,le,t),n(e,L,t),U=!0},p:be,i(e){U||(fe(c.$$.fragment,e),U=!0)},o(e){re(c.$$.fragment,e),U=!1},d(e){e&&o(l),e&&o(a),e&&o(u),e&&o(f),e&&o(r),e&&o(P),e&&o(p),e&&o(E),e&&o(m),e&&o(B),e&&o(k),e&&o(F),e&&o(b),e&&o(O),e&&o(h),e&&o(D),e&&o(y),e&&o(Y),e&&o(w),e&&o(X),e&&o(d),e&&o(G),e&&o(T),e&&o(J),e&&o(v),e&&o(K),e&&o(x),e&&o(Q),e&&o(S),e&&o(z),e&&o(C),e&&o(N),e&&o(W),e&&o(V),e&&o($),e&&o(Z),e&&o(H),e&&o(g),ce(c,e),e&&o(ee),e&&o(_),e&&o(te),e&&o(M),e&&o(ne),e&&o(q),e&&o(oe),e&&o(A),e&&o(ie),e&&o(R),e&&o(se),e&&o(I),e&&o(le),e&&o(L)}}}function ve(j){let l,a;return l=new he({props:{id:"authenticating-javascript-websockets",$$slots:{default:[Te]},$$scope:{ctx:j}}}),{c(){ue(l.$$.fragment)},m(u,f){ae(l,u,f),a=!0},p(u,[f]){const r={};f&1&&(r.$$scope={dirty:f,ctx:u}),l.$set(r)},i(u){a||(fe(l.$$.fragment,u),a=!0)},o(u){re(l.$$.fragment,u),a=!1},d(u){ce(l,u)}}}class $e extends pe{constructor(l){super();me(this,l,null,ve,ke,{})}}export{$e as default};
