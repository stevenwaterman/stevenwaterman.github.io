import{S as $t,i as Ct,s as Lt,q as b,r as y,m as w,k as c,w as v,e as o,g as n,c as i,F as St,f as s}from"../../chunks/vendor-2cc2f6d5.js";import{B as At,a as Bt}from"../../chunks/BlogPost-3232096b.js";import{S as ke}from"../../chunks/Snippet-9204c8be.js";import"../../chunks/Template-f76403f7.js";const Pt={name:"Arduino",language:"c",snippet:`
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
}`},Ft={name:"Serial (Listener)",language:"ts",snippet:`
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
  `},_t={name:"Serial (Firestore)",language:"ts",snippet:`
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
  `},jt={name:"Website",language:"svelte",snippet:`
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
`};var xe={arduino:Pt,serial:Ft,firestore:_t,web:jt};function Rt(Me){let l,f,a,r,u,g,He,I,$e,T,Ce,k,Le,x,Se,M,Ae,H,Be,$,Pe,C,Fe,L,_e,S,je,A,Re,B,De,P,Ee,F,Ge,_,Oe,j,Ve,R,We,D,qe,E,Ue,G,Ye,O,Ne,V,Je,W,Ke,q,ze,U,Qe,Y,Xe,N,Ze,J,et,K,tt,z,it,Q,st,X,ot,Z,nt,ee,lt,te,p,at,ie,rt,se,ft,oe,ut,ne,m,pt,le,mt,ae,d,dt,re,ht,fe,bt,ue,yt,pe,wt,me,ct,de,vt,he,h,gt,be,It,ye,Tt,we,kt,ce,xt,ve,Mt,ge,Ht,Ie,Te;return r=new Bt({}),p=new ke({props:{config:xe.arduino}}),m=new ke({props:{config:xe.serial}}),d=new ke({props:{config:xe.firestore}}),h=new ke({props:{config:xe.web}}),{c(){l=o("p"),l.textContent=`There's a box sitting on my desk.
    Three sliders, and a number above each.
    How I feel in myself, how I feel professionally, and how I feel spiritually.
    With 0 being the worst, and 9 being the best.
    I try to keep it updated:`,f=n(),a=o("figure"),b(r.$$.fragment),u=n(),g=o("p"),g.innerHTML=`Of course, updating my website <em>instantly</em> isn&#39;t doable.
    It&#39;s <strong>one second</strong> out of date:`,He=n(),I=o("figure"),I.innerHTML=`<video autoplay="" loop="" title="Sorry for how overexposed this is. Clever Steven told his camera to auto-adjust ISO based on black plastic..." src="/assets/blog/balance-box/box-gif.mp4" alt="A screen recording of this website, also showing my webcam. I am holding the balance box, and adjust the personal slider from 5 to 7. After a second, the value on the website updates. I adjust it back to 5, and the website updates again." class="svelte-v4wve8"></video> 
    <figcaption>You really are seeing it in real-time</figcaption>`,$e=n(),T=o("h2"),T.textContent="Why?",Ce=n(),k=o("p"),k.textContent=`Online, we curate an image of ourselves, like a personal brand, by only presenting one side of day-to-day life.
    For many of us, it's the same at work too.
    Opening up is uncomfortable, because it makes us feel vulnerable.
    Even though we know that everyone else has bad days too, it doesn't feel nice to admit it.`,Le=n(),x=o("p"),x.innerHTML=`I recently finished reading <a href="https://agileconversations.com/agile-conversation-book/">Agile Conversations</a>, which talks in detail about <a href="http://www.aral.com.au/resources/argyris2.html#a_as_m12">Argyris&#39; two models of reasoning</a>.
    That last paragraph is a clear example of <em>Defensive Reasoning</em> (aka Model I), which we tend to use when there&#39;s something important on the line.
    Defensive Reasoning is undepinned by four principles:`,Se=n(),M=o("ol"),M.innerHTML=`<li>Achieve the purposes as the actor perceives them</li> 
    <li>Maximise winning and minimise losing</li> 
    <li>Minimise eliciting negative feelings</li> 
    <li>Be rational and minimise emotionality</li>`,Ae=n(),H=o("p"),H.innerHTML=`You can probably think of a time when you followed those rules, trying to win an argument.
    Contrast that with Model II, <em>Productive Reasoning</em>, which aims to foster relationships and collaborate towards the best possible solution:`,Be=n(),$=o("ol"),$.innerHTML=`<li>Valid information</li> 
    <li>Free and informed choice</li> 
    <li>Internal commitment to the choice and constant monitoring of the implementation</li>`,Pe=n(),C=o("p"),C.textContent=`If I asked how you thought people should act in a discussion, you'd probably describe Model II.
    If I put you in a group, and offered a cash prize for the person who won the argument, you'd probably exhibit Model I.`,Fe=n(),L=o("p"),L.innerHTML=`Defensive Reasoning is stressful, harms relationships, and produces worse outcomes.
    <strong>Screw everything about that.</strong>
    I have always preached openness, authenticity, and Productive Reasoning, but it&#39;s time for me to commit to it.
    Time to practice what I preach.`,_e=n(),S=o("p"),S.innerHTML=`<strong>I have emotions</strong>.
    And you know what?
    <strong>I have bad days too</strong>.
    And when I&#39;m not feeling great?
    <strong>I&#39;ll tell you</strong>.
    This is me, committing to openness, Productive Reasoning, and vulnerability.
    And there&#39;s a big glowing box on my desk to remind me.`,je=n(),A=o("figure"),A.innerHTML=`<img style="max-height: 30em; margin-bottom: 1em;" src="/assets/blog/balance-box/box.png" title="It&#39;s quite menacing to be honest" alt="The finished balance box. It is a tall box made of black plastic, presenting a front face with three sliders, and a 7-segment display above each. The brightly glowing displays show the numbers 6-7-7."/> 
    <figcaption>The Finished Box</figcaption>`,Re=n(),B=o("h2"),B.textContent="Balance Scores",De=n(),P=o("p"),P.innerHTML=`Reading <a href="https://itrevolution.com/a-radical-enterprise/">A Radical Enterprise</a>, I learnt about <em>Balance Scores</em>.
    A balance score is a set of three ratings, describing how you&#39;re balancing the different aspects of your life, and giving a little bit of context for how you act.
    There&#39;s no explanation, and no questions or sympathy allowed, just three scores out of ten:`,Ee=n(),F=o("ul"),F.innerHTML=`<li><strong>Personal</strong> - Your mental/physical health, happiness, home life, and general wellbeing.</li> 
    <li><strong>Professional</strong> - How much you are enjoying your job, work life, and feeling productive.</li> 
    <li><strong>Spiritual</strong> - Encompasses a sense of higher purpose, but ultimately up to the individual. For me, it&#39;s a sense of belonging, knowing that I&#39;ve found my place in the world and have true belief in a mission / purpose.</li>`,Ge=n(),_=o("p"),_.textContent=`At the start of each meeting, try going around the room and sharing your balance scores.
    By openly sharing our emotional state, it becomes much easier to use productive reasoning.
    It sets the stage for a discussion that fosters relationships, rather than one that damages them.`,Oe=n(),j=o("p"),j.innerHTML=`Of course, everyone will have a different idea of what a <code>5</code> means, or even what personal wellbeing is.
    It doesn&#39;t really matter though.
    Over time, you intuitively understand what someone&#39;s baseline is, and whether they&#39;re having a good or bad day.
    It&#39;s not really about the numbers anyway, it&#39;s about creating a space for emotions and vulnerability, so do whatever works best for you.
    Feel free to just use <code>good</code> / <code>neutral</code> / <code>bad</code> for each category instead, if that&#39;s easier.`,Ve=n(),R=o("p"),R.innerHTML=`I went one step futher, and built a box that shares my balance scores in real time.
    Just three digits, 0-9, visible for anyone that wants to look.
    You can see my scores on any blog post, or at <a href="https://stevenwaterman.uk/Balance">https://stevenwaterman.uk/Balance</a>.`,We=n(),D=o("h2"),D.textContent="How?",qe=n(),E=o("p"),E.innerHTML=`The system is conceptually simple, and everything you need to make one for yourself is available on <a href="https://github.com/stevenwaterman/Balance">GitHub</a>, including a parts list and instructions.
    An Arduino is connected to my PC via USB, constantly reporting the current values set on the sliders.
    My PC writes that to Firestore, which updates any of the browsers currently on the page.`,Ue=n(),G=o("figure"),G.innerHTML=`<img style="width: 80%;" src="/assets/blog/balance-box/components.svg" title="Seeing how simple this is makes me feel bad for how long it took" alt="A potentiometer has its voltage read by an arduino. The arduino reports the 3 scores to my PC over serial. My PC sends the data to Firestore. A browser fetches the web page from GitHub Pages, and the data from Firestore."/> 
    <figcaption>System Architecture</figcaption>`,Ye=n(),O=o("p"),O.textContent=`I'll work my way through each component, giving a brief overview.
    If you have any questions, check out the GitHub repo, or feel free to get in touch!`,Ne=n(),V=o("h3"),V.textContent="Case",Je=n(),W=o("p"),W.innerHTML=`I designed the casing in CAD based on component measurements and 3d-printed it on a <a href="https://www.prusa3d.com/category/original-prusa-i3-mk3s/">Prusa i3 MK3S+</a>.
    I printed most of it in black PETG, and the sliders in grey PLA.
    It&#39;s case is printed in 3 parts, and held together with 4 bolts, which just self-tap into the holes.`,Ke=n(),q=o("figure"),q.innerHTML=`<iframe style="width: 100%; height: 30em;" src="https://viewscreen.githubusercontent.com/view/solid?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f73746576656e77617465726d616e2f42616c616e63652f663964366538313333343937343664316161363136663831613336336164336631373462626232642f7072696e74657246696c65732f6578706c6f6465642e73746c" title="The case files" name="56009715-555d-4e55-9648-cf14f7f40f43"></iframe> 
    <figcaption>The 3d Printer Files for the Case</figcaption>`,ze=n(),U=o("p"),U.innerHTML=`There&#39;s not much else to say here, because CAD and 3d printing are definitely out of scope for this post.
    If you&#39;re looking for printer recommendations, I can say that the MK3S+ is expensive compared to more DIY options, but it&#39;s rock solid reliable, and I haven&#39;t found anything it can&#39;t do (yet).
    If your hobby is 3d <strong>printers</strong>, it&#39;s not for you.
    Nothing ever breaks.
    If your hobby is print<strong>ing</strong>, it&#39;s perfect.`,Qe=n(),Y=o("h3"),Y.textContent="Electronics",Xe=n(),N=o("p"),N.innerHTML=`A sliding potentiometer is connected between the 5v rail and ground, and its signal is connected to one of the analog pins on the Arduino.
    That&#39;s the only <em>necessary</em> part, and everything else is just for the displays, which are much more complicated.`,Ze=n(),J=o("figure"),J.innerHTML=`<img style="width: 80%;" src="/assets/blog/balance-box/circuit.svg" title="Seeing how simple this is makes me feel bad for how long it took" alt="A potentiometer has its voltage read by an arduino. The arduino reports the 3 scores to my PC over serial. My PC sends the data to Firestore. A browser fetches the web page from GitHub Pages, and the data from Firestore."/> 
    <figcaption>Circuit Diagram, One per slider</figcaption>`,et=n(),K=o("p"),K.innerHTML=`Each <a href="https://en.wikipedia.org/wiki/Seven-segment_display">7-segment display</a> consists of 7 LEDs, each with their own pin named A-G.
    Because I need to run 3 of these displays, and the arduino doesn&#39;t have 21 logic pins, I have to use a <a href="https://en.wikipedia.org/wiki/Shift_register">shift register</a> for each one.
    That lets me control the 7 output pins using only 3 pins on the arduino, writing pin states serially and outputting them in parallel.`,tt=n(),z=o("p"),z.innerHTML=`To limit the current sent through the LEDs in the display, each LED needs a resistor connected to it.
    I found it really helpful to use some <a href="https://en.wikipedia.org/wiki/Stripboard#/media/File:UniversalPCB.jpg">TriPad stripboard</a> to hold everything in place.`,it=n(),Q=o("p"),Q.innerHTML=`Honestly, if I did this again, I&#39;d probably not bother with the 7-segment displays.
    Instead, I&#39;d use a potentiometer with discrete steps, or mark on the casing where each value was.
    It <em>does</em> look cool though.`,st=n(),X=o("h3"),X.textContent="Arduino",ot=n(),Z=o("p"),Z.textContent=`The Arduino polls the 3 potentiometers 60 times per second, and converts their voltages into digits 0-9.
    If there is any change, it updates the 7-segment displays by writing to the shift registers, and writes the new values to the serial bus.`,nt=n(),ee=o("p"),ee.innerHTML=`Below is a shortened version of <a href="https://github.com/stevenwaterman/Balance/blob/master/arduino/sketch/sketch.ino">the actual code</a>, which only contains the code for one of the 3 balance scores.
    It uses the pin layouts from the diagram above.`,lt=n(),te=o("figure"),b(p.$$.fragment),at=n(),ie=o("p"),ie.textContent=`I have no doubt that there are errors in that code.
    Feel free to let me know, but no need to bully me for it - C isn't my strong suit.
    In fact that goes for the electronics - actually it goes for everything here.
    Let's just agree not to bully people for not knowing things.`,rt=n(),se=o("h3"),se.textContent="Serial Listener",ft=n(),oe=o("p"),oe.innerHTML=`Currently, the Arduino is just shouting into the void (serially).
    We need something on the other end, to listen.
    I wrote a Node.js TypeScript app that runs on my PC, listening for incoming serial data, and sending it to <a href="https://firebase.google.com/docs/firestore">Firestore</a>.`,ut=n(),ne=o("figure"),b(m.$$.fragment),pt=n(),le=o("p"),le.innerHTML=`In the Firestore database, one document (<code>current</code>) is available for anyone to read, which contains my current balance scores.
    It gets overwritten each time I adjust a slider.
    I also create a document in the <code>historic</code> collection, which is there for when I want to analyse the data later on.`,mt=n(),ae=o("figure"),b(d.$$.fragment),dt=n(),re=o("p"),re.innerHTML=`In <a href="https://github.com/stevenwaterman/Balance/blob/master/serial/src/index.ts">the real code</a>, there&#39;s also a 1-second debounce timer.
    This means that no database writes happen until I stop moving the slider.
    It also means that Firestore doesn&#39;t get overwhelmed, because it&#39;s not designed to handle more than one update per second on a single document.`,ht=n(),fe=o("p"),fe.innerHTML=`For security, I have the database configured to deny all writes, and then I use the <code>firebase-admin</code> package to bypass those permissions.
    This requires a certificate stored locally, which gets read from storage and passed to <code>firebase-admin</code>.
    In the future I&#39;ll probably integrate authentication so I can update my scores from my phone too.`,bt=n(),ue=o("p"),ue.textContent=`I expect that this will sit completely within Firestore's free tier - with the only potential cost being $0.06 per 100,000 reads, after the first 50,000 per day.
    By the time $0.0000006 per page view gets expensive, everything else will have broken.`,yt=n(),pe=o("h3"),pe.textContent="Website",wt=n(),me=o("p"),me.innerHTML=`Finally, we get to the little web app I made that displays my current balance score, <a href="https://stevenwaterman.uk/Balance">https://stevenwaterman.uk/Balance</a>.
    Like most of my personal projects, it&#39;s written in <a href="https://svelte.dev">Svelte</a>, hosted on <a href="https://pages.github.com/">GitHub Pages</a>, and <a href="https://github.com/stevenwaterman/Balance/blob/master/.github/workflows/main.yml">deployed</a> with <a href="https://github.com/features/actions">GitHub Actions</a>.`,ct=n(),de=o("p"),de.innerHTML=`It uses Firestore&#39;s <a href="https://firebase.google.com/docs/firestore/query-data/listen">realtime update</a> feature to listen for changes.
    Whenever the document is updated, a callback is triggered, which updates the variables, causing Svelte to update the page.
    Following the trend, this code has been cut down to only show one of the three values:`,vt=n(),he=o("figure"),b(h.$$.fragment),gt=n(),be=o("p"),be.innerHTML=`The <a href="https://github.com/stevenwaterman/Balance/blob/master/web/src/routes/index.svelte">real code</a> has a load of extra styling, some transitions, and all of the Firestore config code.
    Then, to display the balance scores on this blog, I just add an <code>iframe</code>, and it all works nicely!
    (I <a href="/you-dont-need-js">still refuse</a> to enable JS on this blog)`,It=n(),ye=o("h2"),ye.textContent="Conclusion",Tt=n(),we=o("p"),we.innerHTML=`This project took much, <strong>much</strong> longer than I expected.
    Honestly, it&#39;s a good thing that I didn&#39;t have the balance scores set up at the time, because I was <strong>not</strong> having a good time.
    I&#39;m not showing you inside the box, because it&#39;s a complete mess and I&#39;m ashamed of it.
    But it works!`,kt=n(),ce=o("p"),ce.textContent=`Everyone can see how I feel, and can get a little bit of context for my actions!
    I'm committing to being vulnerable, to sharing my knowledge, and to Productive Reasoning.`,xt=n(),ve=o("p"),ve.textContent=`Next time you're in a meeting, try and think about which model you're using.
    Try and share your emotions, and the knowledge that you are keeping to yourself.
    Introduce others to Balance Scores, Productive Reasoning, and Radical Vulnerability.`,Mt=n(),ge=o("p"),ge.innerHTML='If you want to make your own Balance box, everything you need is available on <a href="https://github.com/stevenwaterman/Balance">GitHub</a>.',Ht=n(),Ie=o("p"),Ie.textContent="Good luck, and have fun!"},m(e,t){i(e,l,t),i(e,f,t),i(e,a,t),y(r,a,null),i(e,u,t),i(e,g,t),i(e,He,t),i(e,I,t),i(e,$e,t),i(e,T,t),i(e,Ce,t),i(e,k,t),i(e,Le,t),i(e,x,t),i(e,Se,t),i(e,M,t),i(e,Ae,t),i(e,H,t),i(e,Be,t),i(e,$,t),i(e,Pe,t),i(e,C,t),i(e,Fe,t),i(e,L,t),i(e,_e,t),i(e,S,t),i(e,je,t),i(e,A,t),i(e,Re,t),i(e,B,t),i(e,De,t),i(e,P,t),i(e,Ee,t),i(e,F,t),i(e,Ge,t),i(e,_,t),i(e,Oe,t),i(e,j,t),i(e,Ve,t),i(e,R,t),i(e,We,t),i(e,D,t),i(e,qe,t),i(e,E,t),i(e,Ue,t),i(e,G,t),i(e,Ye,t),i(e,O,t),i(e,Ne,t),i(e,V,t),i(e,Je,t),i(e,W,t),i(e,Ke,t),i(e,q,t),i(e,ze,t),i(e,U,t),i(e,Qe,t),i(e,Y,t),i(e,Xe,t),i(e,N,t),i(e,Ze,t),i(e,J,t),i(e,et,t),i(e,K,t),i(e,tt,t),i(e,z,t),i(e,it,t),i(e,Q,t),i(e,st,t),i(e,X,t),i(e,ot,t),i(e,Z,t),i(e,nt,t),i(e,ee,t),i(e,lt,t),i(e,te,t),y(p,te,null),i(e,at,t),i(e,ie,t),i(e,rt,t),i(e,se,t),i(e,ft,t),i(e,oe,t),i(e,ut,t),i(e,ne,t),y(m,ne,null),i(e,pt,t),i(e,le,t),i(e,mt,t),i(e,ae,t),y(d,ae,null),i(e,dt,t),i(e,re,t),i(e,ht,t),i(e,fe,t),i(e,bt,t),i(e,ue,t),i(e,yt,t),i(e,pe,t),i(e,wt,t),i(e,me,t),i(e,ct,t),i(e,de,t),i(e,vt,t),i(e,he,t),y(h,he,null),i(e,gt,t),i(e,be,t),i(e,It,t),i(e,ye,t),i(e,Tt,t),i(e,we,t),i(e,kt,t),i(e,ce,t),i(e,xt,t),i(e,ve,t),i(e,Mt,t),i(e,ge,t),i(e,Ht,t),i(e,Ie,t),Te=!0},p:St,i(e){Te||(w(r.$$.fragment,e),w(p.$$.fragment,e),w(m.$$.fragment,e),w(d.$$.fragment,e),w(h.$$.fragment,e),Te=!0)},o(e){c(r.$$.fragment,e),c(p.$$.fragment,e),c(m.$$.fragment,e),c(d.$$.fragment,e),c(h.$$.fragment,e),Te=!1},d(e){e&&s(l),e&&s(f),e&&s(a),v(r),e&&s(u),e&&s(g),e&&s(He),e&&s(I),e&&s($e),e&&s(T),e&&s(Ce),e&&s(k),e&&s(Le),e&&s(x),e&&s(Se),e&&s(M),e&&s(Ae),e&&s(H),e&&s(Be),e&&s($),e&&s(Pe),e&&s(C),e&&s(Fe),e&&s(L),e&&s(_e),e&&s(S),e&&s(je),e&&s(A),e&&s(Re),e&&s(B),e&&s(De),e&&s(P),e&&s(Ee),e&&s(F),e&&s(Ge),e&&s(_),e&&s(Oe),e&&s(j),e&&s(Ve),e&&s(R),e&&s(We),e&&s(D),e&&s(qe),e&&s(E),e&&s(Ue),e&&s(G),e&&s(Ye),e&&s(O),e&&s(Ne),e&&s(V),e&&s(Je),e&&s(W),e&&s(Ke),e&&s(q),e&&s(ze),e&&s(U),e&&s(Qe),e&&s(Y),e&&s(Xe),e&&s(N),e&&s(Ze),e&&s(J),e&&s(et),e&&s(K),e&&s(tt),e&&s(z),e&&s(it),e&&s(Q),e&&s(st),e&&s(X),e&&s(ot),e&&s(Z),e&&s(nt),e&&s(ee),e&&s(lt),e&&s(te),v(p),e&&s(at),e&&s(ie),e&&s(rt),e&&s(se),e&&s(ft),e&&s(oe),e&&s(ut),e&&s(ne),v(m),e&&s(pt),e&&s(le),e&&s(mt),e&&s(ae),v(d),e&&s(dt),e&&s(re),e&&s(ht),e&&s(fe),e&&s(bt),e&&s(ue),e&&s(yt),e&&s(pe),e&&s(wt),e&&s(me),e&&s(ct),e&&s(de),e&&s(vt),e&&s(he),v(h),e&&s(gt),e&&s(be),e&&s(It),e&&s(ye),e&&s(Tt),e&&s(we),e&&s(kt),e&&s(ce),e&&s(xt),e&&s(ve),e&&s(Mt),e&&s(ge),e&&s(Ht),e&&s(Ie)}}}function Dt(Me){let l,f;return l=new At({props:{id:"balance-box",$$slots:{default:[Rt]},$$scope:{ctx:Me}}}),{c(){b(l.$$.fragment)},m(a,r){y(l,a,r),f=!0},p(a,[r]){const u={};r&1&&(u.$$scope={dirty:r,ctx:a}),l.$set(u)},i(a){f||(w(l.$$.fragment,a),f=!0)},o(a){c(l.$$.fragment,a),f=!1},d(a){v(l,a)}}}class Wt extends $t{constructor(l){super();Ct(this,l,null,Dt,Lt,{})}}export{Wt as default};
