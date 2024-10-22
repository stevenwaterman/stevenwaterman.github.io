import{S as yt,i as Tt,s as vt,q as w,r as b,m as y,k as T,w as v,e as n,g as o,c as i,F as Dt,f as s}from"../../chunks/vendor-b123dbec.js";import{B as Ot}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as D}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";const kt={name:"Endpoint",language:"java",snippet:`
  public class Controller {
    // Getters, Constructors, Validation, and Documentation ommitted

    public class CreateProductRequest {
        private String name;
        private Double price;
    }
    
    public class ProductResponse {
        private Long id;
        private String name;
        private Double price;
    }
    
    @PostMapping("/products")
    public ResponseEntity<ProductResponse> createProduct(
        @RequestBody CreateProductRequest request
    ) { /*...*/ }
  }`},Pt={name:"ProductDTO",language:"java",snippet:`
  public enum ProductDTO {;
    private interface Id { @Positive Long getId(); }
    private interface Name { @NotBlank String getName(); }
    private interface Price { @Positive Double getPrice(); }
    private interface Cost { @Positive Double getCost(); }

    public enum Request{;
        @Value public static class Create implements Name, Price, Cost {
            String name;
            Double price;
            Double cost;
        }
    }

    public enum Response{;
        @Value public static class Public implements Id, Name, Price {
            Long id;
            String name;
            Double price;
        }

        @Value public static class Private implements Id, Name, Price, Cost {
            Long id;
            String name;
            Double price;
            Double cost;
        }
    }
}`},xt={name:"SyntaxError",language:"java",snippet:`@Value public static class PatchPrice implements Id, Price {
    String id;    // Should be Long id;
    Double prise; // Should be Double price;

  // PatchPrice is not abstract and does not override abstract method getId() in Id
  // PatchPrice is not abstract and does not override abstract method getPrice() in Price
}`},Ct={name:"Semantics",language:"java",snippet:`  private interface Cost {
    /**
     * The amount that it costs us to purchase this product
     * For the amount we sell a product for, see the {@link Price Price} parameter.
     * <b>This data is confidential</b>
     */
    @Positive Double getCost();
}`},It={name:"Generic Types",language:"java",snippet:`
  public class GenericExample {
    public static <T extends Price & Cost> Double getMarkup(T dto){
      return (dto.getPrice() - dto.getCost()) / dto.getCost();
  }
  }
  `};var O={endpoint:kt,productDto:Pt,syntaxError:xt,semantics:Ct,generics:It};function $t(we){let l,r,a,p,f,be,k,ye,P,Te,x,ve,u,De,C,Oe,I,ke,$,Pe,L,xe,H,Ce,M,Ie,S,$e,j,Le,R,He,A,Me,_,Se,m,je,q,Re,E,Ae,F,_e,qe,Ee,V,Fe,Ve,We,W,Ne,N,Be,B,Ye,Y,Ue,U,Ge,G,Je,J,ze,z,Ke,K,Qe,d,Xe,Q,Ze,X,ge,Z,et,c,tt,g,it,ee,st,te,ot,ie,nt,se,lt,oe,at,ne,rt,le,pt,ae,ft,re,ut,pe,mt,fe,dt,h,ct,ue,ht,me,wt,de,bt,ce,he;return u=new D({props:{config:O.endpoint}}),m=new D({props:{config:O.productDto}}),d=new D({props:{config:O.syntaxError}}),c=new D({props:{config:O.semantics}}),h=new D({props:{config:O.generics}}),{c(){l=n("p"),l.textContent=`As part of Scott Logic's graduate training program, I spent 12 weeks working with the other grads on an internal 
    project.
    One aspect stuck with me more than the rest - the style and structure of our DTOs.
    It was controversial during the project, and the subject of much debate, but I've really grown to like it.
    
    It's not *the one true solution to all problems*, but it's an interesting approach which integrates well with 
    modern IDEs.
    Hopefully, the initial shock will pass and you'll like it too!`,r=o(),a=n("h2"),a.innerHTML="What <em>is</em> a DTO (Data Transfer Object)?",p=o(),f=n("p"),f.innerHTML=`In client-server projects, data is often structured differently by the client (<em>presentation layer</em>) and the server (<em>domain layer</em>).
    This allows the server to store its information in a database-friendly or performant way, while providing a user-friendly representation for the client.
    The server needs a way to translate between the two data formats.
    Different architectures <em>do</em> exist, but we are just considering this one for simplicity.
    DTO-like objects can be used between any two data representations.`,be=o(),k=n("figure"),k.innerHTML='<img src="/assets/blog/rethinking-dto/header.png" title="Data Representation Layers" alt="The Client and API both use the Presentation Layer data representation. The Service and Domain layers both use the domain representation, while the Controller layer uses both representations and maps between them."/>',ye=o(),P=n("p"),P.innerHTML=`A DTO is a server-side <a href="https://en.wikipedia.org/wiki/Value_object">value object</a> which stores data using the presentation layer representation.
    We separate DTOs into those received by the server (<code>Request</code>), and those returned by the server (<code>Response</code>).
    They are automatically serialised/deserialised by Spring.`,Te=o(),x=n("p"),x.textContent="For context, here is an example endpoint using DTOs:",ve=o(),w(u.$$.fragment),De=o(),C=n("h2"),C.textContent="What makes a good DTO?",Oe=o(),I=n("p"),I.innerHTML=`First, it&#39;s important to remember that you don&#39;t <strong>have</strong> to use DTOs.
    They are a programming <em>pattern</em>, and your code will work just fine without them.`,ke=o(),$=n("ul"),$.innerHTML=`<li>If you want to keep the same data representation in both layers, you can just use your entities as DTOs.</li> 
    <li>If you want to manually serialise your entities into presentation layer JSON, I can&#39;t stop you!</li>`,Pe=o(),L=n("p"),L.textContent=`They also document the presentation layer in a declarative human-readable way.
    I like DTOs, and think you should use them because they decouple the presentation layer and domain layer, allowing you to be more flexible while reducing the maintenance load.`,xe=o(),H=n("p"),H.innerHTML=`However, not all DTOs are <em>good</em> DTOs.
    A <em>good</em> DTO should encourage API best practices and clean code principles.`,Ce=o(),M=n("p"),M.innerHTML=`They should allow developers to write APIs that are internally consistent.
    Knowledge about a parameter on one endpoint should apply to parameters with the same name on all related endpoints.
    For example, given the snippet above, if the request&#39;s <code>price</code> includes VAT then the response&#39;s <code>price</code> should include it too.
    A consistent API prevents bugs that would be caused by differences between endpoints, while facilitating the learning of developers new to a project.`,Ie=o(),S=n("p"),S.textContent=`They should minimise boilerplate, and be fool-proof to write.
    If it is easy to make a mistake when writing a DTO, you will struggle to be consistent.
    DTOs should also be readable - we have this amazing description of the presentation layer's data representation, but it's useless if our DTOs are illegible.
    They should allow you to quickly view the data structure, even from another class.`,$e=o(),j=n("p"),j.textContent="Let's have a look at our DTOs before seeing whether they achieve those goals.",Le=o(),R=n("h2"),R.textContent="Show us the code!",He=o(),A=n("p"),A.textContent=`This code will be confusing at first, but stick with it.
    Under the code, I describe how it all fits together.
    In the remainder of the post, I explain why we implemented it this way, and what the benefits are.
    Hopefully you'll understand the code and appreciate it by the end!`,Me=o(),_=n("p"),_.innerHTML=`It is based roughly on actual code we wrote in our grad project, translated into the context of an online store.
    For each product, we store the name, sale price, and wholesale cost of its products.
    Prices are stored as floating-point numbers for the purposes of this example, but in real projects <a href="https://dzone.com/articles/never-use-float-and-double-for-monetary-calculatio">should be stored as BigDecimal</a>.`,Se=o(),w(m.$$.fragment),je=o(),q=n("p"),q.innerHTML=`We create one file for each controller.
    It contains a top-level enum with no values, in this case <code>ProductDTO</code>.
    Under that, we split into <code>Request</code> and <code>Response</code>.
    We create one <code>Request</code> DTO per controller endpoint, and as many <code>Response</code> DTOs as necessary.
    In this case, we have two <code>Response</code> DTOs, where <code>Public</code> is safe to send to any user and <code>Private</code> includes the wholesale cost of a product.`,Re=o(),E=n("p"),E.textContent='For each API parameter, we create an interface with the same name as the parameter.\n    Each defines a single method - the getter for that parameter.\n    Any validation goes on the interface\'s method - for example, the `@NotBlank` annotation ensures that no DTO will ever have `""` as its name.',Ae=o(),F=n("p"),F.innerHTML=`For each field on a DTO, we implement the associated interface.
    <a href="https://projectlombok.org/features/Value">Lombok&#39;s <code>@Value</code> annotation</a> auto-generates getters which satisfy the interfaces.`,_e=o(),qe=n("hr"),Ee=o(),V=n("p"),V.innerHTML=`For a full comparison with documentation, see the two examples: <a href="https://gist.github.com/stevenwaterman/93881ec1b81d23066dfed96bbf636104">before</a> and <a href="https://gist.github.com/stevenwaterman/28f0ec03a0cc0370a3b0c9351917976b">after</a>.
    Bear in mind that this is a small example, and the differences become more apparent as you add more DTOs.`,Fe=o(),Ve=n("hr"),We=o(),W=n("h2"),W.textContent='"I hate it"',Ne=o(),N=n("p"),N.innerHTML=`It <em>is</em> really weird.
    There&#39;s a lot of unusual things going on there - let&#39;s discuss a few in detail.`,Be=o(),B=n("p"),B.innerHTML=`<strong>There&#39;s three enums and none have any values!</strong>
    This is a <a href="https://stackoverflow.com/a/26619349">trick</a> to create namespaces in java, meaning we can reference a DTO as \`ProductDTO.Request.Create\`.
    That trick is also the reason there&#39;s a trailing <code>;</code> after each enum.
    The semicolon indicates the end of the (empty) list of values!
    Using namespaces improves discoverability by allowing us to type <code>ProductDTO</code> and rely on auto-completion to list the DTOs.
    There are other ways of achieving that, but this way is very concise, while preventing <code>new ProductDTO()</code> and <code>new Create()</code>.
    Honestly, this is personal preference and you can organise the classes however you like.`,Ye=o(),Y=n("p"),Y.innerHTML=`<strong>There are also a lot of interfaces - one per API parameter!</strong>
    This is because we use the interfaces as a single source of truth for that parameter.
    I will talk a lot more about this later - but trust me that it brings a lot of benefits.`,Ue=o(),U=n("p"),U.innerHTML=`<strong>The interface methods never get implemented!</strong>
    Yeah, this one is pretty weird and I wish there was a better way.
    Using Lombok&#39;s auto-generated getters to implement the interface is quite hacky.
    It would be much nicer to just define fields on the interfaces, which would also mean the DTO classes could be one-line long.
    However, java doesn&#39;t allow interfaces to have non-static fields.
    If you followed this pattern in other languages, it would be much neater.`,Ge=o(),G=n("h2"),G.textContent="It's (almost) perfect",Je=o(),J=n("p"),J.textContent=`Let's go back to the list of things that make a good DTO.
    Does this style achieve those goals?`,ze=o(),z=n("h3"),z.textContent="Consistent Syntax",Ke=o(),K=n("p"),K.textContent=`We definitely enforce consistent syntax - and that was the main reason we started using this pattern.
    Each API parameter has its syntax defined by the associated interface.
    If the DTO class contains a typo in a parameter name or incorrect return type, the code won't compile and your 
    IDE will warn you.
    For example:`,Qe=o(),w(d.$$.fragment),Xe=o(),Q=n("p"),Q.textContent=`Additionally, since validation is placed on the interfaces, it is consistent between DTOs.
    You can never have a situation where a value can be valid for a parameter on one endpoint but not another.`,Ze=o(),X=n("h3"),X.textContent="Consistent Semantics",ge=o(),Z=n("p"),Z.textContent=`This style helps enforce consistent semantics through inherited documentation.
    Each parameter has its semantic meaning defined by the documentation on associated interface method.
    For example:`,et=o(),w(c.$$.fragment),tt=o(),g=n("p"),g.textContent=`Since the DTO classes implement the interfaces, the documentation is automatically inherited by the getters.
    This means that on every DTO instance, you can learn the semantic meaning and validation rules for a field by viewing the documentation for the method:`,it=o(),ee=n("figure"),ee.innerHTML='<img src="/assets/blog/rethinking-dto/documentation.png" title="Documentation for getCost()" alt="The documentation for getCost() on a DTO class is automatically copied from the Cost interface."/>',st=o(),te=n("p"),te.textContent=`You're also guaranteed that this documentation is present and consistent across all DTOs that implement a given interface.
    In the rare case where an API parameter with the same name *should* have different semantics, this style enforces that a new interface should be created.
    While this is a hassle, it forces the developer to stop and think, while also allowing future readers to immediately see that something is different.`,ot=o(),ie=n("h3"),ie.textContent="Readable & Maintainable",nt=o(),se=n("p"),se.innerHTML=`There&#39;s no getting around this - our style introduces a lot of boilerplate.
    There are four interfaces that could be removed, and each DTO class has a long <code>implements</code> list that doesn&#39;t need to be there.
    However, the interfaces can be hidden away in their own package, which helps maintain the signal:noise ratio of the actual DTO class.
    Still, the boilerplate is the main downside of this style, and it&#39;s reasonable to choose a different style on that basis.
    To me, it&#39;s worth the extra interface definitions.`,lt=o(),oe=n("p"),oe.innerHTML=`Our style really shines when it comes to creating a new DTO.
    You simply write <code>@Value public static class [name] implements</code>, followed by a list of the fields you want.
    Then, declare the fields demanded by your IDE until it stops complaining.
    You&#39;re done - a full DTO with validation!`,at=o(),ne=n("p"),ne.innerHTML=`Additionally, it&#39;s trivial to see the structure of our DTO classes.
    Looking at the code, you can see everything you need from the class signature.
    Each field is listed in the <code>implements</code> list.
    Since it&#39;s all declared in the class signature, you can simply press \`ctrl+q\` in IntelliJ and see the list of fields.`,rt=o(),le=n("figure"),le.innerHTML='<img src="/assets/blog/rethinking-dto/implements.png" title="The list of interfaces implemented by a DTO" alt="When viewing the documentation for ProductDTO.Response.Private, you can see that it implements ID, Name, Price, and Cost."/>',pt=o(),ae=n("p"),ae.textContent=`Our style has write-once validation, as all validation is added to the interface methods.
    When writing a DTO, you get validation for free after implementing the interface.`,ft=o(),re=n("p"),re.textContent=`Finally, thanks to our single-method interfaces, we can write reusable utility methods.
    For example, given the sale price and wholesale cost of a product, we can calculate its markup:`,ut=o(),pe=n("p"),pe.innerHTML="<code>markup = (sale_price - cost_price) / cost_price</code>",mt=o(),fe=n("p"),fe.innerHTML="In Java, we can implement this using a generic method with type parameter <code>T</code>:",dt=o(),w(h.$$.fragment),ct=o(),ue=n("p"),ue.innerHTML=`Our single parameter has type T, which is a generic <a href="https://en.wikipedia.org/wiki/Intersection_type">intersection type</a>.
    <code>dto</code> must implement both <code>Price</code> and <code>Cost</code> - meaning you can&#39;t pass a <code>Public</code> response to <code>getMarkup</code> (as it does not implement <code>Cost</code>).
    With normal DTO classes, we would have to write this as a method which takes two parameters, adding overloads for each DTO (<a href="https://gist.github.com/stevenwaterman/93881ec1b81d23066dfed96bbf636104">see the example</a>).
    This offloads the work onto the caller, and risks getting the parameters backwards, causing bugs.`,ht=o(),me=n("h2"),me.textContent="Conclusion",wt=o(),de=n("p"),de.textContent=`I don't expect you to go away and rewrite all your DTOs right now.
    There are, however, a lot of small things you can take away:`,bt=o(),ce=n("ol"),ce.innerHTML=`<li>Establish a single source of truth for your API parameters</li> 
    <li>Small interfaces are better</li> 
    <li>Try being weird, maybe you&#39;ll like it!</li>`},m(e,t){i(e,l,t),i(e,r,t),i(e,a,t),i(e,p,t),i(e,f,t),i(e,be,t),i(e,k,t),i(e,ye,t),i(e,P,t),i(e,Te,t),i(e,x,t),i(e,ve,t),b(u,e,t),i(e,De,t),i(e,C,t),i(e,Oe,t),i(e,I,t),i(e,ke,t),i(e,$,t),i(e,Pe,t),i(e,L,t),i(e,xe,t),i(e,H,t),i(e,Ce,t),i(e,M,t),i(e,Ie,t),i(e,S,t),i(e,$e,t),i(e,j,t),i(e,Le,t),i(e,R,t),i(e,He,t),i(e,A,t),i(e,Me,t),i(e,_,t),i(e,Se,t),b(m,e,t),i(e,je,t),i(e,q,t),i(e,Re,t),i(e,E,t),i(e,Ae,t),i(e,F,t),i(e,_e,t),i(e,qe,t),i(e,Ee,t),i(e,V,t),i(e,Fe,t),i(e,Ve,t),i(e,We,t),i(e,W,t),i(e,Ne,t),i(e,N,t),i(e,Be,t),i(e,B,t),i(e,Ye,t),i(e,Y,t),i(e,Ue,t),i(e,U,t),i(e,Ge,t),i(e,G,t),i(e,Je,t),i(e,J,t),i(e,ze,t),i(e,z,t),i(e,Ke,t),i(e,K,t),i(e,Qe,t),b(d,e,t),i(e,Xe,t),i(e,Q,t),i(e,Ze,t),i(e,X,t),i(e,ge,t),i(e,Z,t),i(e,et,t),b(c,e,t),i(e,tt,t),i(e,g,t),i(e,it,t),i(e,ee,t),i(e,st,t),i(e,te,t),i(e,ot,t),i(e,ie,t),i(e,nt,t),i(e,se,t),i(e,lt,t),i(e,oe,t),i(e,at,t),i(e,ne,t),i(e,rt,t),i(e,le,t),i(e,pt,t),i(e,ae,t),i(e,ft,t),i(e,re,t),i(e,ut,t),i(e,pe,t),i(e,mt,t),i(e,fe,t),i(e,dt,t),b(h,e,t),i(e,ct,t),i(e,ue,t),i(e,ht,t),i(e,me,t),i(e,wt,t),i(e,de,t),i(e,bt,t),i(e,ce,t),he=!0},p:Dt,i(e){he||(y(u.$$.fragment,e),y(m.$$.fragment,e),y(d.$$.fragment,e),y(c.$$.fragment,e),y(h.$$.fragment,e),he=!0)},o(e){T(u.$$.fragment,e),T(m.$$.fragment,e),T(d.$$.fragment,e),T(c.$$.fragment,e),T(h.$$.fragment,e),he=!1},d(e){e&&s(l),e&&s(r),e&&s(a),e&&s(p),e&&s(f),e&&s(be),e&&s(k),e&&s(ye),e&&s(P),e&&s(Te),e&&s(x),e&&s(ve),v(u,e),e&&s(De),e&&s(C),e&&s(Oe),e&&s(I),e&&s(ke),e&&s($),e&&s(Pe),e&&s(L),e&&s(xe),e&&s(H),e&&s(Ce),e&&s(M),e&&s(Ie),e&&s(S),e&&s($e),e&&s(j),e&&s(Le),e&&s(R),e&&s(He),e&&s(A),e&&s(Me),e&&s(_),e&&s(Se),v(m,e),e&&s(je),e&&s(q),e&&s(Re),e&&s(E),e&&s(Ae),e&&s(F),e&&s(_e),e&&s(qe),e&&s(Ee),e&&s(V),e&&s(Fe),e&&s(Ve),e&&s(We),e&&s(W),e&&s(Ne),e&&s(N),e&&s(Be),e&&s(B),e&&s(Ye),e&&s(Y),e&&s(Ue),e&&s(U),e&&s(Ge),e&&s(G),e&&s(Je),e&&s(J),e&&s(ze),e&&s(z),e&&s(Ke),e&&s(K),e&&s(Qe),v(d,e),e&&s(Xe),e&&s(Q),e&&s(Ze),e&&s(X),e&&s(ge),e&&s(Z),e&&s(et),v(c,e),e&&s(tt),e&&s(g),e&&s(it),e&&s(ee),e&&s(st),e&&s(te),e&&s(ot),e&&s(ie),e&&s(nt),e&&s(se),e&&s(lt),e&&s(oe),e&&s(at),e&&s(ne),e&&s(rt),e&&s(le),e&&s(pt),e&&s(ae),e&&s(ft),e&&s(re),e&&s(ut),e&&s(pe),e&&s(mt),e&&s(fe),e&&s(dt),v(h,e),e&&s(ct),e&&s(ue),e&&s(ht),e&&s(me),e&&s(wt),e&&s(de),e&&s(bt),e&&s(ce)}}}function Lt(we){let l,r;return l=new Ot({props:{id:"rethinking-dto",$$slots:{default:[$t]},$$scope:{ctx:we}}}),{c(){w(l.$$.fragment)},m(a,p){b(l,a,p),r=!0},p(a,[p]){const f={};p&1&&(f.$$scope={dirty:p,ctx:a}),l.$set(f)},i(a){r||(y(l.$$.fragment,a),r=!0)},o(a){T(l.$$.fragment,a),r=!1},d(a){v(l,a)}}}class Rt extends yt{constructor(l){super();Tt(this,l,null,Lt,vt,{})}}export{Rt as default};
