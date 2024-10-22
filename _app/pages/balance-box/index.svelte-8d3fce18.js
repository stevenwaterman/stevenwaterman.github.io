import{S as St,i as _t,s as Bt,e as o,g as n,a as b,G as At,c as t,E as Lt,F as Ct,f as i,q as g,r as I,m as T,k,w as x}from"../../chunks/vendor-b123dbec.js";import{B as Pt}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as $e}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";function Ft(d){let l,f,r,a,u,p;return{c(){l=o("div"),f=o("a"),f.innerHTML='<div class="overlay svelte-1aehn3w"></div>',r=n(),a=o("iframe"),b(f,"href","https://stevenwaterman.uk/Balance"),b(a,"title","Balance Scores"),At(a.src,u="https://stevenwaterman.uk/Balance")||b(a,"src",u),b(a,"loading","lazy"),b(a,"class","svelte-1aehn3w"),b(l,"class","container svelte-1aehn3w"),b(l,"style",p=`height: ${d[0]};`)},m(m,h){t(m,l,h),Lt(l,f),Lt(l,r),Lt(l,a)},p(m,[h]){h&1&&p!==(p=`height: ${m[0]};`)&&b(l,"style",p)},i:Ct,o:Ct,d(m){m&&i(l)}}}function jt(d,l,f){let{height:r="8em"}=l;return d.$$set=a=>{"height"in a&&f(0,r=a.height)},[r]}class Rt extends St{constructor(l){super();_t(this,l,jt,Ft,Bt,{height:0})}}const Dt={name:"Arduino",language:"c",snippet:`
/* ...LED constants setup... */

void setup() {
  Serial.begin(9600);
  /* ...pinMode... */
}

int value = 0;

void loop() {  
  int newValue = read();
  if (newValue != -1 && value != newValue) {
    value = newValue;
    display();
    Serial.println(value);
  }

  delay(16);
}

int read() {
  int sensorValue = analogRead(A5);
  for (int i = 0; i < 10; i++) {
    if (sensorValue < i * 110 + 85) { return 9 - i; }
    if (sensorValue < i * 110 + 105) { return -1; }
  }
  return -1;
}

void display() {
  digitalWrite(4, LOW);
  if (value < 0 || value > 9) {
    shiftOut(3, 2, MSBFIRST, led_g);
  } else {
    shiftOut(3, 2, MSBFIRST, digits[value]);
  }
  digitalWrite(4, HIGH);
}`},Et={name:"Serial (Listener)",language:"ts",snippet:`
  import { ReadlineParser, SerialPort } from "serialport";
  
  const port = new SerialPort({
    path: "/dev/ttyACM0",
    baudRate: 9600
  });
  
  let timer: NodeJS.Timeout | null = null;
  let value: number = 0;
  
  const lineStream = port.pipe(new ReadlineParser());
  lineStream.on("data", (data: string) => {
    value = parseInt(data[0]);
    pushUpdate();
  });
  `},Gt={name:"Serial (Firestore)",language:"ts",snippet:`
  const currentDoc = db.doc("current/current");
  const historicCollection = db.collection("/historic");
  
  async function pushUpdate() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const data = { value, timestamp };
    
    await Promise.all([
      currentDoc.update(data),
      historicCollection.add(data)
    ]);
    console.log(\`Updated \${value}\`);
  }
  `},Ot={name:"Website",language:"svelte",snippet:`
<script lang="ts">
  const currentDoc = doc(db, "current", "current");
  onSnapshot(currentDoc, doc => {
    const data = doc.data();
    if (data !== undefined) {
      value = data.value;
    }
  });

  let value: number | undefined = undefined;
<\/script>

{#if value !== undefined}
  <span>{value}</span>
{/if}
`};var He={arduino:Dt,serial:Et,firestore:Gt,web:Ot};function Vt(d){let l,f,r,a,u,p,m,h,Le,M,Ce,$,Se,H,_e,L,Be,C,Ae,S,Pe,_,Fe,B,je,A,Re,P,De,F,Ee,j,Ge,R,Oe,D,Ve,E,We,G,qe,O,Ue,V,Ye,W,Ne,q,Je,U,ze,Y,Ke,N,Qe,J,Xe,z,Ze,K,et,Q,tt,X,it,Z,st,ee,ot,te,nt,ie,lt,se,at,oe,y,rt,ne,ft,le,ut,ae,pt,re,c,mt,fe,dt,ue,w,ht,pe,bt,me,yt,de,ct,he,wt,be,vt,ye,gt,ce,v,It,we,Tt,ve,kt,ge,xt,Ie,Mt,Te,$t,ke,Ht,xe,Me;return a=new Rt({}),y=new $e({props:{config:He.arduino}}),c=new $e({props:{config:He.serial}}),w=new $e({props:{config:He.firestore}}),v=new $e({props:{config:He.web}}),{c(){l=o("p"),l.textContent=`There's a box sitting on my desk.
    Three sliders, and a number above each.
    How I feel in myself, how I feel professionally, and how I feel spiritually.
    With 0 being the worst, and 9 being the best.
    I try to keep it updated:`,f=n(),r=o("figure"),g(a.$$.fragment),u=n(),p=o("p"),p.innerHTML=`Of course, updating my website <em>instantly</em> isn&#39;t doable.
    It&#39;s <strong>one second</strong> out of date:`,m=n(),h=o("figure"),h.innerHTML=`<video autoplay="" loop="" title="Sorry for how overexposed this is. Clever Steven told his camera to auto-adjust ISO based on black plastic..." src="/assets/blog/balance-box/box-gif.mp4" alt="A screen recording of this website, also showing my webcam. I am holding the balance box, and adjust the personal slider from 5 to 7. After a second, the value on the website updates. I adjust it back to 5, and the website updates again." class="svelte-v4wve8"></video> 
    <figcaption>You really are seeing it in real-time</figcaption>`,Le=n(),M=o("h2"),M.textContent="Why?",Ce=n(),$=o("p"),$.textContent=`Online, we curate an image of ourselves, like a personal brand, by only presenting one side of day-to-day life.
    For many of us, it's the same at work too.
    Opening up is uncomfortable, because it makes us feel vulnerable.
    Even though we know that everyone else has bad days too, it doesn't feel nice to admit it.`,Se=n(),H=o("p"),H.innerHTML=`I recently finished reading <a href="https://agileconversations.com/agile-conversation-book/">Agile Conversations</a>, which talks in detail about <a href="http://www.aral.com.au/resources/argyris2.html#a_as_m12">Argyris&#39; two models of reasoning</a>.
    That last paragraph is a clear example of <em>Defensive Reasoning</em> (aka Model I), which we tend to use when there&#39;s something important on the line.
    Defensive Reasoning is undepinned by four principles:`,_e=n(),L=o("ol"),L.innerHTML=`<li>Achieve the purposes as the actor perceives them</li> 
    <li>Maximise winning and minimise losing</li> 
    <li>Minimise eliciting negative feelings</li> 
    <li>Be rational and minimise emotionality</li>`,Be=n(),C=o("p"),C.innerHTML=`You can probably think of a time when you followed those rules, trying to win an argument.
    Contrast that with Model II, <em>Productive Reasoning</em>, which aims to foster relationships and collaborate towards the best possible solution:`,Ae=n(),S=o("ol"),S.innerHTML=`<li>Valid information</li> 
    <li>Free and informed choice</li> 
    <li>Internal commitment to the choice and constant monitoring of the implementation</li>`,Pe=n(),_=o("p"),_.textContent=`If I asked how you thought people should act in a discussion, you'd probably describe Model II.
    If I put you in a group, and offered a cash prize for the person who won the argument, you'd probably exhibit Model I.`,Fe=n(),B=o("p"),B.innerHTML=`Defensive Reasoning is stressful, harms relationships, and produces worse outcomes.
    <strong>Screw everything about that.</strong>
    I have always preached openness, authenticity, and Productive Reasoning, but it&#39;s time for me to commit to it.
    Time to practice what I preach.`,je=n(),A=o("p"),A.innerHTML=`<strong>I have emotions</strong>.
    And you know what?
    <strong>I have bad days too</strong>.
    And when I&#39;m not feeling great?
    <strong>I&#39;ll tell you</strong>.
    This is me, committing to openness, Productive Reasoning, and vulnerability.
    And there&#39;s a big glowing box on my desk to remind me.`,Re=n(),P=o("figure"),P.innerHTML=`<img style="max-height: 30em; margin-bottom: 1em;" src="/assets/blog/balance-box/box.png" title="It&#39;s quite menacing to be honest" alt="The finished balance box. It is a tall box made of black plastic, presenting a front face with three sliders, and a 7-segment display above each. The brightly glowing displays show the numbers 6-7-7."/> 
    <figcaption>The Finished Box</figcaption>`,De=n(),F=o("h2"),F.textContent="Balance Scores",Ee=n(),j=o("p"),j.innerHTML=`Reading <a href="https://itrevolution.com/a-radical-enterprise/">A Radical Enterprise</a>, I learnt about <em>Balance Scores</em>.
    A balance score is a set of three ratings, describing how you&#39;re balancing the different aspects of your life, and giving a little bit of context for how you act.
    There&#39;s no explanation, and no questions or sympathy allowed, just three scores out of ten:`,Ge=n(),R=o("ul"),R.innerHTML=`<li><strong>Personal</strong> - Your mental/physical health, happiness, home life, and general wellbeing.</li> 
    <li><strong>Professional</strong> - How much you are enjoying your job, work life, and feeling productive.</li> 
    <li><strong>Spiritual</strong> - Encompasses a sense of higher purpose, but ultimately up to the individual. For me, it&#39;s a sense of belonging, knowing that I&#39;ve found my place in the world and have true belief in a mission / purpose.</li>`,Oe=n(),D=o("p"),D.textContent=`At the start of each meeting, try going around the room and sharing your balance scores.
    By openly sharing our emotional state, it becomes much easier to use productive reasoning.
    It sets the stage for a discussion that fosters relationships, rather than one that damages them.`,Ve=n(),E=o("p"),E.innerHTML=`Of course, everyone will have a different idea of what a <code>5</code> means, or even what personal wellbeing is.
    It doesn&#39;t really matter though.
    Over time, you intuitively understand what someone&#39;s baseline is, and whether they&#39;re having a good or bad day.
    It&#39;s not really about the numbers anyway, it&#39;s about creating a space for emotions and vulnerability, so do whatever works best for you.
    Feel free to just use <code>good</code> / <code>neutral</code> / <code>bad</code> for each category instead, if that&#39;s easier.`,We=n(),G=o("p"),G.innerHTML=`I went one step futher, and built a box that shares my balance scores in real time.
    Just three digits, 0-9, visible for anyone that wants to look.
    You can see my scores on any blog post, or at <a href="https://stevenwaterman.uk/Balance">https://stevenwaterman.uk/Balance</a>.`,qe=n(),O=o("h2"),O.textContent="How?",Ue=n(),V=o("p"),V.innerHTML=`The system is conceptually simple, and everything you need to make one for yourself is available on <a href="https://github.com/stevenwaterman/Balance">GitHub</a>, including a parts list and instructions.
    An Arduino is connected to my PC via USB, constantly reporting the current values set on the sliders.
    My PC writes that to Firestore, which updates any of the browsers currently on the page.`,Ye=n(),W=o("figure"),W.innerHTML=`<img style="width: 80%;" src="/assets/blog/balance-box/components.svg" title="Seeing how simple this is makes me feel bad for how long it took" alt="A potentiometer has its voltage read by an arduino. The arduino reports the 3 scores to my PC over serial. My PC sends the data to Firestore. A browser fetches the web page from GitHub Pages, and the data from Firestore."/> 
    <figcaption>System Architecture</figcaption>`,Ne=n(),q=o("p"),q.textContent=`I'll work my way through each component, giving a brief overview.
    If you have any questions, check out the GitHub repo, or feel free to get in touch!`,Je=n(),U=o("h3"),U.textContent="Case",ze=n(),Y=o("p"),Y.innerHTML=`I designed the casing in CAD based on component measurements and 3d-printed it on a <a href="https://www.prusa3d.com/category/original-prusa-i3-mk3s/">Prusa i3 MK3S+</a>.
    I printed most of it in black PETG, and the sliders in grey PLA.
    It&#39;s case is printed in 3 parts, and held together with 4 bolts, which just self-tap into the holes.`,Ke=n(),N=o("figure"),N.innerHTML=`<iframe style="width: 100%; height: 30em;" src="https://viewscreen.githubusercontent.com/view/solid?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f73746576656e77617465726d616e2f42616c616e63652f663964366538313333343937343664316161363136663831613336336164336631373462626232642f7072696e74657246696c65732f6578706c6f6465642e73746c" title="The case files" name="56009715-555d-4e55-9648-cf14f7f40f43"></iframe> 
    <figcaption>The 3d Printer Files for the Case</figcaption>`,Qe=n(),J=o("p"),J.innerHTML=`There&#39;s not much else to say here, because CAD and 3d printing are definitely out of scope for this post.
    If you&#39;re looking for printer recommendations, I can say that the MK3S+ is expensive compared to more DIY options, but it&#39;s rock solid reliable, and I haven&#39;t found anything it can&#39;t do (yet).
    If your hobby is 3d <strong>printers</strong>, it&#39;s not for you.
    Nothing ever breaks.
    If your hobby is print<strong>ing</strong>, it&#39;s perfect.`,Xe=n(),z=o("h3"),z.textContent="Electronics",Ze=n(),K=o("p"),K.innerHTML=`A sliding potentiometer is connected between the 5v rail and ground, and its signal is connected to one of the analog pins on the Arduino.
    That&#39;s the only <em>necessary</em> part, and everything else is just for the displays, which are much more complicated.`,et=n(),Q=o("figure"),Q.innerHTML=`<img style="width: 80%;" src="/assets/blog/balance-box/circuit.svg" title="Seeing how simple this is makes me feel bad for how long it took" alt="A potentiometer has its voltage read by an arduino. The arduino reports the 3 scores to my PC over serial. My PC sends the data to Firestore. A browser fetches the web page from GitHub Pages, and the data from Firestore."/> 
    <figcaption>Circuit Diagram, One per slider</figcaption>`,tt=n(),X=o("p"),X.innerHTML=`Each <a href="https://en.wikipedia.org/wiki/Seven-segment_display">7-segment display</a> consists of 7 LEDs, each with their own pin named A-G.
    Because I need to run 3 of these displays, and the arduino doesn&#39;t have 21 logic pins, I have to use a <a href="https://en.wikipedia.org/wiki/Shift_register">shift register</a> for each one.
    That lets me control the 7 output pins using only 3 pins on the arduino, writing pin states serially and outputting them in parallel.`,it=n(),Z=o("p"),Z.innerHTML=`To limit the current sent through the LEDs in the display, each LED needs a resistor connected to it.
    I found it really helpful to use some <a href="https://en.wikipedia.org/wiki/Stripboard#/media/File:UniversalPCB.jpg">TriPad stripboard</a> to hold everything in place.`,st=n(),ee=o("p"),ee.innerHTML=`Honestly, if I did this again, I&#39;d probably not bother with the 7-segment displays.
    Instead, I&#39;d use a potentiometer with discrete steps, or mark on the casing where each value was.
    It <em>does</em> look cool though.`,ot=n(),te=o("h3"),te.textContent="Arduino",nt=n(),ie=o("p"),ie.textContent=`The Arduino polls the 3 potentiometers 60 times per second, and converts their voltages into digits 0-9.
    If there is any change, it updates the 7-segment displays by writing to the shift registers, and writes the new values to the serial bus.`,lt=n(),se=o("p"),se.innerHTML=`Below is a shortened version of <a href="https://github.com/stevenwaterman/Balance/blob/master/arduino/sketch/sketch.ino">the actual code</a>, which only contains the code for one of the 3 balance scores.
    It uses the pin layouts from the diagram above.`,at=n(),oe=o("figure"),g(y.$$.fragment),rt=n(),ne=o("p"),ne.textContent=`I have no doubt that there are errors in that code.
    Feel free to let me know, but no need to bully me for it - C isn't my strong suit.
    In fact that goes for the electronics - actually it goes for everything here.
    Let's just agree not to bully people for not knowing things.`,ft=n(),le=o("h3"),le.textContent="Serial Listener",ut=n(),ae=o("p"),ae.innerHTML=`Currently, the Arduino is just shouting into the void (serially).
    We need something on the other end, to listen.
    I wrote a Node.js TypeScript app that runs on my PC, listening for incoming serial data, and sending it to <a href="https://firebase.google.com/docs/firestore">Firestore</a>.`,pt=n(),re=o("figure"),g(c.$$.fragment),mt=n(),fe=o("p"),fe.innerHTML=`In the Firestore database, one document (<code>current</code>) is available for anyone to read, which contains my current balance scores.
    It gets overwritten each time I adjust a slider.
    I also create a document in the <code>historic</code> collection, which is there for when I want to analyse the data later on.`,dt=n(),ue=o("figure"),g(w.$$.fragment),ht=n(),pe=o("p"),pe.innerHTML=`In <a href="https://github.com/stevenwaterman/Balance/blob/master/serial/src/index.ts">the real code</a>, there&#39;s also a 1-second debounce timer.
    This means that no database writes happen until I stop moving the slider.
    It also means that Firestore doesn&#39;t get overwhelmed, because it&#39;s not designed to handle more than one update per second on a single document.`,bt=n(),me=o("p"),me.innerHTML=`For security, I have the database configured to deny all writes, and then I use the <code>firebase-admin</code> package to bypass those permissions.
    This requires a certificate stored locally, which gets read from storage and passed to <code>firebase-admin</code>.
    In the future I&#39;ll probably integrate authentication so I can update my scores from my phone too.`,yt=n(),de=o("p"),de.textContent=`I expect that this will sit completely within Firestore's free tier - with the only potential cost being $0.06 per 100,000 reads, after the first 50,000 per day.
    By the time $0.0000006 per page view gets expensive, everything else will have broken.`,ct=n(),he=o("h3"),he.textContent="Website",wt=n(),be=o("p"),be.innerHTML=`Finally, we get to the little web app I made that displays my current balance score, <a href="https://stevenwaterman.uk/Balance">https://stevenwaterman.uk/Balance</a>.
    Like most of my personal projects, it&#39;s written in <a href="https://svelte.dev">Svelte</a>, hosted on <a href="https://pages.github.com/">GitHub Pages</a>, and <a href="https://github.com/stevenwaterman/Balance/blob/master/.github/workflows/main.yml">deployed</a> with <a href="https://github.com/features/actions">GitHub Actions</a>.`,vt=n(),ye=o("p"),ye.innerHTML=`It uses Firestore&#39;s <a href="https://firebase.google.com/docs/firestore/query-data/listen">realtime update</a> feature to listen for changes.
    Whenever the document is updated, a callback is triggered, which updates the variables, causing Svelte to update the page.
    Following the trend, this code has been cut down to only show one of the three values:`,gt=n(),ce=o("figure"),g(v.$$.fragment),It=n(),we=o("p"),we.innerHTML=`The <a href="https://github.com/stevenwaterman/Balance/blob/master/web/src/routes/index.svelte">real code</a> has a load of extra styling, some transitions, and all of the Firestore config code.
    Then, to display the balance scores on this blog, I just add an <code>iframe</code>, and it all works nicely!
    (I <a href="/you-dont-need-js">still refuse</a> to enable JS on this blog)`,Tt=n(),ve=o("h2"),ve.textContent="Conclusion",kt=n(),ge=o("p"),ge.innerHTML=`This project took much, <strong>much</strong> longer than I expected.
    Honestly, it&#39;s a good thing that I didn&#39;t have the balance scores set up at the time, because I was <strong>not</strong> having a good time.
    I&#39;m not showing you inside the box, because it&#39;s a complete mess and I&#39;m ashamed of it.
    But it works!`,xt=n(),Ie=o("p"),Ie.textContent=`Everyone can see how I feel, and can get a little bit of context for my actions!
    I'm committing to being vulnerable, to sharing my knowledge, and to Productive Reasoning.`,Mt=n(),Te=o("p"),Te.textContent=`Next time you're in a meeting, try and think about which model you're using.
    Try and share your emotions, and the knowledge that you are keeping to yourself.
    Introduce others to Balance Scores, Productive Reasoning, and Radical Vulnerability.`,$t=n(),ke=o("p"),ke.innerHTML='If you want to make your own Balance box, everything you need is available on <a href="https://github.com/stevenwaterman/Balance">GitHub</a>.',Ht=n(),xe=o("p"),xe.textContent="Good luck, and have fun!"},m(e,s){t(e,l,s),t(e,f,s),t(e,r,s),I(a,r,null),t(e,u,s),t(e,p,s),t(e,m,s),t(e,h,s),t(e,Le,s),t(e,M,s),t(e,Ce,s),t(e,$,s),t(e,Se,s),t(e,H,s),t(e,_e,s),t(e,L,s),t(e,Be,s),t(e,C,s),t(e,Ae,s),t(e,S,s),t(e,Pe,s),t(e,_,s),t(e,Fe,s),t(e,B,s),t(e,je,s),t(e,A,s),t(e,Re,s),t(e,P,s),t(e,De,s),t(e,F,s),t(e,Ee,s),t(e,j,s),t(e,Ge,s),t(e,R,s),t(e,Oe,s),t(e,D,s),t(e,Ve,s),t(e,E,s),t(e,We,s),t(e,G,s),t(e,qe,s),t(e,O,s),t(e,Ue,s),t(e,V,s),t(e,Ye,s),t(e,W,s),t(e,Ne,s),t(e,q,s),t(e,Je,s),t(e,U,s),t(e,ze,s),t(e,Y,s),t(e,Ke,s),t(e,N,s),t(e,Qe,s),t(e,J,s),t(e,Xe,s),t(e,z,s),t(e,Ze,s),t(e,K,s),t(e,et,s),t(e,Q,s),t(e,tt,s),t(e,X,s),t(e,it,s),t(e,Z,s),t(e,st,s),t(e,ee,s),t(e,ot,s),t(e,te,s),t(e,nt,s),t(e,ie,s),t(e,lt,s),t(e,se,s),t(e,at,s),t(e,oe,s),I(y,oe,null),t(e,rt,s),t(e,ne,s),t(e,ft,s),t(e,le,s),t(e,ut,s),t(e,ae,s),t(e,pt,s),t(e,re,s),I(c,re,null),t(e,mt,s),t(e,fe,s),t(e,dt,s),t(e,ue,s),I(w,ue,null),t(e,ht,s),t(e,pe,s),t(e,bt,s),t(e,me,s),t(e,yt,s),t(e,de,s),t(e,ct,s),t(e,he,s),t(e,wt,s),t(e,be,s),t(e,vt,s),t(e,ye,s),t(e,gt,s),t(e,ce,s),I(v,ce,null),t(e,It,s),t(e,we,s),t(e,Tt,s),t(e,ve,s),t(e,kt,s),t(e,ge,s),t(e,xt,s),t(e,Ie,s),t(e,Mt,s),t(e,Te,s),t(e,$t,s),t(e,ke,s),t(e,Ht,s),t(e,xe,s),Me=!0},p:Ct,i(e){Me||(T(a.$$.fragment,e),T(y.$$.fragment,e),T(c.$$.fragment,e),T(w.$$.fragment,e),T(v.$$.fragment,e),Me=!0)},o(e){k(a.$$.fragment,e),k(y.$$.fragment,e),k(c.$$.fragment,e),k(w.$$.fragment,e),k(v.$$.fragment,e),Me=!1},d(e){e&&i(l),e&&i(f),e&&i(r),x(a),e&&i(u),e&&i(p),e&&i(m),e&&i(h),e&&i(Le),e&&i(M),e&&i(Ce),e&&i($),e&&i(Se),e&&i(H),e&&i(_e),e&&i(L),e&&i(Be),e&&i(C),e&&i(Ae),e&&i(S),e&&i(Pe),e&&i(_),e&&i(Fe),e&&i(B),e&&i(je),e&&i(A),e&&i(Re),e&&i(P),e&&i(De),e&&i(F),e&&i(Ee),e&&i(j),e&&i(Ge),e&&i(R),e&&i(Oe),e&&i(D),e&&i(Ve),e&&i(E),e&&i(We),e&&i(G),e&&i(qe),e&&i(O),e&&i(Ue),e&&i(V),e&&i(Ye),e&&i(W),e&&i(Ne),e&&i(q),e&&i(Je),e&&i(U),e&&i(ze),e&&i(Y),e&&i(Ke),e&&i(N),e&&i(Qe),e&&i(J),e&&i(Xe),e&&i(z),e&&i(Ze),e&&i(K),e&&i(et),e&&i(Q),e&&i(tt),e&&i(X),e&&i(it),e&&i(Z),e&&i(st),e&&i(ee),e&&i(ot),e&&i(te),e&&i(nt),e&&i(ie),e&&i(lt),e&&i(se),e&&i(at),e&&i(oe),x(y),e&&i(rt),e&&i(ne),e&&i(ft),e&&i(le),e&&i(ut),e&&i(ae),e&&i(pt),e&&i(re),x(c),e&&i(mt),e&&i(fe),e&&i(dt),e&&i(ue),x(w),e&&i(ht),e&&i(pe),e&&i(bt),e&&i(me),e&&i(yt),e&&i(de),e&&i(ct),e&&i(he),e&&i(wt),e&&i(be),e&&i(vt),e&&i(ye),e&&i(gt),e&&i(ce),x(v),e&&i(It),e&&i(we),e&&i(Tt),e&&i(ve),e&&i(kt),e&&i(ge),e&&i(xt),e&&i(Ie),e&&i(Mt),e&&i(Te),e&&i($t),e&&i(ke),e&&i(Ht),e&&i(xe)}}}function Wt(d){let l,f;return l=new Pt({props:{id:"balance-box",$$slots:{default:[Vt]},$$scope:{ctx:d}}}),{c(){g(l.$$.fragment)},m(r,a){I(l,r,a),f=!0},p(r,[a]){const u={};a&1&&(u.$$scope={dirty:a,ctx:r}),l.$set(u)},i(r){f||(T(l.$$.fragment,r),f=!0)},o(r){k(l.$$.fragment,r),f=!1},d(r){x(l,r)}}}class Jt extends St{constructor(l){super();_t(this,l,null,Wt,Bt,{})}}export{Jt as default};
