import{S as $e,i as _e,s as je,q as Be,r as Ie,m as Le,k as He,w as Ce,e as s,g as o,c as i,F as Ae,f as r}from"../../chunks/vendor-b123dbec.js";import{B as Ee}from"../../chunks/BlogPost-fb5b6ef4.js";import{Y as Re}from"../../chunks/YoutubeEmbed-3d57994a.js";import"../../chunks/Template-7e2d3e9c.js";/* empty css                                                              */function De(Y){let a,n,l,f,h,G,m,N,p,V,u,U,c,W,y,X,d,Q,w,Z,b,ee,g,te,M,ie,T,re,k,se,v,oe,x,ae,B,le,I,ne,L,fe,H,he,C,pe,$,me,_,ue,j,ce,A,ye,E,de,R,we,D,be,S,ge,P,Me,q,Te,z,ke,F,ve,J,xe,K,O;return p=new Re({props:{code:"mtHFzrI7zEE"}}),{c(){a=s("p"),a.innerHTML=`The <a href="https://microbit.org/">BBC Micro:Bit</a> is a single-board computer that aims to help children learn to code.
    It has 16KB of RAM, a 16MHz processor, and a 25 pixel &quot;screen&quot; (which is just a 5x5 LED array).
    On their website, they propose <a href="https://makecode.microbit.org/projects">lots of fun ideas that you can try</a>.`,n=o(),l=s("p"),l.innerHTML=`For <em>some reason</em>, they don&#39;t suggest trying to implement a ray tracer - an algorithm which simulates light rays to render a 3D scene.
    That may have something to do with the fact that <a href="https://en.wikipedia.org/wiki/Ray_tracing_(graphics)#Disadvantages">ray tracing is incredibly slow, even on fast computers</a> and <a href="https://sciencebehindpixar.org/pipeline/rendering">Pixar has entire supercomputers dedicated to it</a>.
    Nonetheless, I like a challenge!`,f=o(),h=s("h2"),h.textContent="Show me!",G=o(),m=s("p"),m.textContent=`I don't want to keep you waiting, so here's the end result.
    The Micro:Bit is rendering a pyramid, with two bright red sides and two dark red sides.
    You can turn the camera by tilting, and move it with the buttons.`,N=o(),Be(p.$$.fragment),V=o(),u=s("p"),u.innerHTML=`Of course, the best bit about the Micro:Bit is its <a href="https://makecode.microbit.org/#editor">scratch-like, blocks-based IDE</a>.
    It has the killer feature of letting you convert a program back and forth between blocks and JavaScript - which I couldn&#39;t resist.
    Click the image to see a full-quality version.`,U=o(),c=s("figure"),c.innerHTML='<a href="https://stevenwaterman.uk/microbit-raytracer/blocks.html"><img src="/assets/blog/microbit-raytracer/blocks.jpg" alt="It&#39;s is zoomed out so much that you can barely tell what&#39;s going on. It is clear that the blocks-based IDE was not designed for this." title="Click me to see the full resolution"/></a>',W=o(),y=s("p"),y.innerHTML=`The code is available <a href="https://github.com/stevenwaterman/microbit-raytracer">on GitHub</a>.
    You can try it out for yourself <a href="https://makecode.microbit.org/_dRJ72yCK0V6E">in the official emulator</a> or <a href="https://stevenwaterman.uk/microbit-raytracer/index.html">in my custom-made HTML test bench</a> (which generated the hi-res images in the top left of the video).`,X=o(),d=s("p"),d.textContent=`The remainder of this post discusses more about the Micro:Bit, and explains what a ray tracer actually is and how it works.
    In my next blog post, I will discuss the actual implementation, and the challenges I faced when optimising such an intensive algorithm for the Micro:Bit.`,Q=o(),w=s("h2"),w.textContent="A :bit more about the Micro:Bit",Z=o(),b=s("p"),b.textContent="I apologise for that subheading...",ee=o(),g=s("p"),g.innerHTML=`The <a href="https://microbit.org/">BBC Micro:Bit</a> is a single-board computer, like a <a href="https://www.raspberrypi.org/">Raspberry Pi</a> or <a href="https://www.arduino.cc/">Arduino</a>.
    It was announced March 2015 and released February 2016, costing under \xA315.
    For that, you get a pretty impressive <a href="https://microbit.org/guide/features/">feature list</a>:`,te=o(),M=s("ul"),M.innerHTML=`<li>16MHz ARM Cortex-M0 processor</li> 
    <li>256KB nonvolatile storage and 16KB RAM</li> 
    <li>Power via USB or Battery</li> 
    <li>25 LEDs</li> 
    <li>Radio &amp; Bluetooth</li> 
    <li>2 programmable buttons</li> 
    <li>Accelerometer, Compass, Light &amp; Temperature sensors</li> 
    <li>3 general purpose input/output (GPIO) pins</li> 
    <li>3V 90mA power &amp; ground for accessories</li>`,ie=o(),T=s("figure"),T.innerHTML='<img src="/assets/blog/microbit-raytracer/microbit.jpg" alt="The Micro:Bit and its packaging. It has a 5x5 array of LEDs in the middle, with a button either side." title="It&#39;s no supercomputer"/>',re=o(),k=s("p"),k.textContent="There are many ways to program the Micro:Bit, including:",se=o(),v=s("ul"),v.innerHTML=`<li><a href="https://makecode.microbit.org/reference">Blocks + Javascript</a> (actually somewhere between JavaScript and Typescript, but they don&#39;t say that)</li> 
    <li><a href="https://microbit.org/guide/python/">Python</a> (actually <a href="https://micropython.org/">MicroPython</a></li> 
    <li><a href="https://microbit.org/guide/mobile/#swift">Swift</a></li> 
    <li><a href="https://microbit.org/code-alternative-editors/">Many other 3rd party programs</a></li>`,oe=o(),x=s("p"),x.innerHTML=`In any source language, the user&#39;s program is <a href="https://tech.microbit.org/software/hex-format/">compiled to a HEX file</a> which <a href="https://tech.microbit.org/software/#high-level-programming-languages">contains the ARM assembly code</a>.
    This assembly code usually interacts with the <a href="https://tech.microbit.org/software/runtime-mbed/">device abstraction layer</a> which provides a simpler interface for controlling the board&#39;s functionality such as Bluetooth and accelerometer.`,ae=o(),B=s("p"),B.textContent="Basically everything about the Micro:Bit is open-source and well-documented, so check out their [developer site](https://tech.microbit.org/).",le=o(),I=s("h2"),I.textContent="What's a Ray Tracer, Anyway?",ne=o(),L=s("p"),L.innerHTML=`A <a href="https://en.wikipedia.org/wiki/Ray_tracing_(graphics)">ray tracer</a> is a program which renders a 3D scene by simulating the path of light from a virtual camera.
    Rather than try and explain it in words, I have created a series of pictures demonstrating the process:`,fe=o(),H=s("p"),H.innerHTML=`On the left hand side of the scene, we can see the virtual camera.
    It sits behind the origin point, and is currently looking straight ahead, in the <code>z</code> direction.`,he=o(),C=s("figure"),C.innerHTML='<img src="/assets/blog/microbit-raytracer/raytrace-1.jpg" alt="The 3d environment is mostly white with a grid drawn on the floor. There are two darker grid lines representing x=0 and z=0. At the point where they cross, there is some text saying 0,0." title="The camera is a virtual object in the scene and chooses what direction we fire the rays"/>',pe=o(),$=s("p"),$.textContent=`The pyramid is made of four triangles.
    It sits further away from the camera, with two light sides and two dark sides.`,me=o(),_=s("figure"),_.innerHTML='<img src="/assets/blog/microbit-raytracer/raytrace-2.jpg" alt="A few meters away from the camera, we see a square-based pyramid sitting on the grid. The side facing the camera is bright red, while the right-hand side is a darker red." title="The pyramid is the physical object that we want to render in the scene"/>',ue=o(),j=s("p"),j.innerHTML=`Here, we visualise the <code>view plane</code> - the representation of the screen.
    It is a 5x5 grid, which sits 1m away from the camera.
    The width of the grid is customisable, and affects how wide of a view the camera has.
    Each LED on the Micro:Bit is represented by one cell in the grid.`,ce=o(),A=s("figure"),A.innerHTML='<img src="/assets/blog/microbit-raytracer/raytrace-3.jpg" alt="A grid appears in the scene, with an arrow from the camera demonstrating that it is 1m away and 0.5m wide." title="There are other (better looking) ways to arrange the rays, but this is the fastest to compute"/>',ye=o(),E=s("p"),E.textContent=`Now, we simulate the rays.
    Each of the 25 rays originates at the camera (now hidden) and travels through the center of a grid cell.
    For higher-quality rendering you could send multiple rays through each pixel, evenly spaced, and average the result.`,de=o(),R=s("figure"),R.innerHTML='<img src="/assets/blog/microbit-raytracer/raytrace-4.jpg" alt="Many bright-red lines appear, propoagating from the camera&#39;s location and shooting off into the distance. Some go through the pyramid." title="The rays are infinitely long"/>',we=o(),D=s("p"),D.textContent=`Some of the rays went through the pyramid.
    Let's just keep those, and remove the ones that didn't hit anything.`,be=o(),S=s("figure"),S.innerHTML='<img src="/assets/blog/microbit-raytracer/raytrace-5.jpg" alt="There are now far fewer rays - only the ones that went through the pyramid remain." title="Looks painful"/>',ge=o(),P=s("p"),P.textContent=`Any time a ray hits something, we fill that cell the same colour as the object that the ray hit.
    This means that if a ray hits the dark side of the pyramid, the cell would get filled in a darker colour.
    The rays that don't hit anything get coloured in black, since the camera can't see anything in that pixel.`,Me=o(),q=s("figure"),q.innerHTML='<img src="/assets/blog/microbit-raytracer/raytrace-6.jpg" alt="The grid has been filled in so that it displays something vaguely resembling a pyramid." title="The Egyptians would be proud"/>',Te=o(),z=s("p"),z.textContent=`Bear in mind that this is the absolute simplest version of ray tracing.
    More advanced versions simulate the light as it bounces off objects or refracts through glass.
    They also consider the location of virtual lights within the 3D scene, allowing objects to cast shadows that appear in the resulting renders.
    Considering that the Micro:Bit already struggled with the simple version, that may have been a bit much to ask.`,ke=o(),F=s("h2"),F.textContent="Conclusion",ve=o(),J=s("p"),J.textContent=`Frankly, I think this was an outstanding success.
    It works well enough on the Micro:Bit, it's accurate, and it works really well as a learning tool.
    I understand ray tracers much better, and it was a great excuse to play with the Micro:Bit!`,xe=o(),K=s("p"),K.innerHTML='In <a href="/raytracer-how-to">Part 2</a>, I discuss how you actually implement a ray tracer, and how I approached programming the Micro:Bit for maximum performance.'},m(e,t){i(e,a,t),i(e,n,t),i(e,l,t),i(e,f,t),i(e,h,t),i(e,G,t),i(e,m,t),i(e,N,t),Ie(p,e,t),i(e,V,t),i(e,u,t),i(e,U,t),i(e,c,t),i(e,W,t),i(e,y,t),i(e,X,t),i(e,d,t),i(e,Q,t),i(e,w,t),i(e,Z,t),i(e,b,t),i(e,ee,t),i(e,g,t),i(e,te,t),i(e,M,t),i(e,ie,t),i(e,T,t),i(e,re,t),i(e,k,t),i(e,se,t),i(e,v,t),i(e,oe,t),i(e,x,t),i(e,ae,t),i(e,B,t),i(e,le,t),i(e,I,t),i(e,ne,t),i(e,L,t),i(e,fe,t),i(e,H,t),i(e,he,t),i(e,C,t),i(e,pe,t),i(e,$,t),i(e,me,t),i(e,_,t),i(e,ue,t),i(e,j,t),i(e,ce,t),i(e,A,t),i(e,ye,t),i(e,E,t),i(e,de,t),i(e,R,t),i(e,we,t),i(e,D,t),i(e,be,t),i(e,S,t),i(e,ge,t),i(e,P,t),i(e,Me,t),i(e,q,t),i(e,Te,t),i(e,z,t),i(e,ke,t),i(e,F,t),i(e,ve,t),i(e,J,t),i(e,xe,t),i(e,K,t),O=!0},p:Ae,i(e){O||(Le(p.$$.fragment,e),O=!0)},o(e){He(p.$$.fragment,e),O=!1},d(e){e&&r(a),e&&r(n),e&&r(l),e&&r(f),e&&r(h),e&&r(G),e&&r(m),e&&r(N),Ce(p,e),e&&r(V),e&&r(u),e&&r(U),e&&r(c),e&&r(W),e&&r(y),e&&r(X),e&&r(d),e&&r(Q),e&&r(w),e&&r(Z),e&&r(b),e&&r(ee),e&&r(g),e&&r(te),e&&r(M),e&&r(ie),e&&r(T),e&&r(re),e&&r(k),e&&r(se),e&&r(v),e&&r(oe),e&&r(x),e&&r(ae),e&&r(B),e&&r(le),e&&r(I),e&&r(ne),e&&r(L),e&&r(fe),e&&r(H),e&&r(he),e&&r(C),e&&r(pe),e&&r($),e&&r(me),e&&r(_),e&&r(ue),e&&r(j),e&&r(ce),e&&r(A),e&&r(ye),e&&r(E),e&&r(de),e&&r(R),e&&r(we),e&&r(D),e&&r(be),e&&r(S),e&&r(ge),e&&r(P),e&&r(Me),e&&r(q),e&&r(Te),e&&r(z),e&&r(ke),e&&r(F),e&&r(ve),e&&r(J),e&&r(xe),e&&r(K)}}}function Se(Y){let a,n;return a=new Ee({props:{id:"microbit-raytracer",$$slots:{default:[De]},$$scope:{ctx:Y}}}),{c(){Be(a.$$.fragment)},m(l,f){Ie(a,l,f),n=!0},p(l,[f]){const h={};f&1&&(h.$$scope={dirty:f,ctx:l}),a.$set(h)},i(l){n||(Le(a.$$.fragment,l),n=!0)},o(l){He(a.$$.fragment,l),n=!1},d(l){Ce(a,l)}}}class Ke extends $e{constructor(a){super();_e(this,a,null,Se,je,{})}}export{Ke as default};
