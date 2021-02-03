(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{147:function(e,t,a){},270:function(e,t,a){"use strict";a.r(t);var r=a(3),s=a(0),n=a.n(s),o=a(12),c=a.n(o),i=a(20),l=(a(147),a(35)),d=a(310),u=a(76),m=a(46),j=a(127),p=a(59),b={user:void 0,token:void 0},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"@prefix/SET_TOKEN":return Object(p.a)(Object(p.a)({},e),{},{token:t.payload});case"@prefix/SET_USER":return Object(p.a)(Object(p.a)({},e),{},{user:t.payload});default:return e}},f=Object(m.c)({userdata:h});var x=a(15),g=a(311);function O(e){return{type:"@prefix/SET_TOKEN",payload:e}}var v=function(e){return{type:"@prefix/SET_USER",payload:e}},w=a(79),k=a.n(w),y="https://space-booker.herokuapp.com",S="api/v1";function N(e){return k.a.post("".concat(y,"/").concat(S,"/register"),e)}function B(e){return k.a.post("".concat(y,"/auth"),e)}var T=a(301),P=a(313),E=a(305),C=a(306),I=a(314),U=Object(T.a)((function(){return Object(P.a)({logo:{zIndex:1250,width:"210px",marginRight:"2em"},logoImg:{width:"100%",height:"auto",display:"block"}})})),_=function(){var e=U();return Object(r.jsx)(I.a,{component:i.b,className:e.logo,to:"/",children:Object(r.jsx)("img",{src:"/img/logo.png",className:e.logoImg,alt:"SpaceBooker"})})},z=Object(T.a)((function(){return Object(P.a)({root:{flexGrow:1},appBar:{zIndex:1250,backgroundColor:"#ffffff"},linkBtnTransparent:{padding:"0.8em 1em",border:"1px solid transparent","&:hover":{textDecoration:"none",opacity:.8}},linkBtnBordered:{padding:"0.8em 1em",borderRadius:"4px",border:"1px solid rgba(98,0,238, 0.4)","&:hover":{textDecoration:"none",backgroundColor:"rgba(0,0,0,0.02)",opacity:.8}},loginGreet:{fontSize:".95em",marginRight:"1em",color:"#000"},sectionLeft:{flexGrow:1,textAlign:"left"},toggleButton:{marginRight:25}})})),L=function(e){var t=e.user,a=z();return Object(r.jsx)("div",{className:a.root,children:Object(r.jsx)(E.a,{position:"static",className:a.appBar,children:Object(r.jsxs)(C.a,{children:[Object(r.jsx)(_,{}),Object(r.jsx)("div",{className:a.sectionLeft,children:Object(r.jsx)(I.a,{component:i.b,className:a.linkBtnTransparent,to:"/dashboard",children:"Dashboard"})}),Object(r.jsxs)("div",{children:[!t&&Object(r.jsxs)("div",{children:[Object(r.jsx)(I.a,{component:i.b,className:a.linkBtnTransparent,to:"/login",children:"Login"}),Object(r.jsx)(I.a,{component:i.b,className:a.linkBtnBordered,to:"/register",children:"Sign up"})]}),t&&Object(r.jsxs)("div",{children:[Object(r.jsxs)("span",{className:a.loginGreet,children:["Hello, ",t.username]}),Object(r.jsx)(I.a,{component:i.b,className:a.linkBtnBordered,to:"/",onClick:function(){localStorage.removeItem("access_token"),window.location.href="/"},children:"Logout"})]})]})]})})})},M=a(309),F=Object(T.a)((function(){return Object(P.a)({root:{background:"#6A0572",display:"flex",position:"relative",justifyContent:"center",alignItems:"center",height:"calc(100vh - 64px)"},intro:{color:"#ffffff",textAlign:"center",position:"relative",zIndex:1},heading:{fontSize:"4rem",position:"relative",fontWeight:"bold",letterSpacing:-1,marginBottom:"1rem"},introText:{fontSize:"1.5rem",marginTop:"0 auto 2rem"},containedBtn:{backgroundColor:"#df0cc4",padding:"12px 0",fontWeight:"bold",color:"#ffffff",margin:"0 0.5em",width:180},outlinedBtn:{padding:"12px 0",fontWeight:"bold",color:"#ffffff",margin:"0 0.5em",width:180,borderColor:"rgba(255,255,255,0.5)","&:hover":{borderColor:"#fff"}}})})),R=function(){var e=F(),t=Object(x.f)(),a=function(e){return function(){t.push(e)}};return Object(r.jsx)("div",{className:e.root,children:Object(r.jsxs)("div",{className:e.intro,children:[Object(r.jsx)("h1",{className:e.heading,children:"Working spaces booking app"}),Object(r.jsx)("p",{className:e.introText,children:"Create a booking calendar for your working spaces in a few seconds."}),Object(r.jsx)(M.a,{color:"primary",className:e.containedBtn,variant:"contained",size:"large",onClick:a("/register"),disableElevation:!0,children:"Sign up"}),Object(r.jsx)(M.a,{color:"secondary",className:e.outlinedBtn,variant:"outlined",size:"large",onClick:a("/login"),disableElevation:!0,children:"Login"})]})})},q=a(39),A=a.n(q),W=a(57),G=a(18),$=a(312),D=a(50),J=a(307),K=a(308),V=a(25),H=function(){return V.a().shape({email:V.c().email().required("Email address is mandatory."),username:V.c().required("Please choose your username.").min(3,"Username must be at least 3 characters long.").max(50,"Username can be maximum 50 characters long.").required("Username is mandatory."),password:V.c().min(8,"Password must be at least 8 characters long.").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?@#$%^&*()]).{7,30}\S$/).required("Password must have at least one number, one uppercase character, lowercase  character and special character from !?@#$%^&*() "),confirmPassword:V.c().oneOf([V.b("password"),""],"Passwords must match.").required("Passwords must match.")})},Y=Object(T.a)((function(e){return Object(P.a)({root:{maxWidth:"500px",display:"block",margin:"0 auto"},textField:{"& > *":{width:"100%"}},registerButton:{marginTop:"30px"},title:{textAlign:"left"},successMessage:{color:e.palette.success.main},errorMessage:{color:e.palette.error.main}})})),Z={message:"Registered successfully.",type:"success"},Q={message:"Registeration failed: username or email already registered.",type:"error"},X=Object(l.b)((function(e){return{token:e.userdata.token,user:e.userdata.user}}),{setToken:O,setUser:v})((function(e){e.token;var t=e.user,a=e.setToken,n=(e.setUser,Object(s.useState)({message:"",type:""})),o=Object(G.a)(n,2),c=o[0],i=o[1],l=Object(s.useState)(!1),d=Object(G.a)(l,2),u=d[0],m=d[1],j=Object(s.useState)({username:"",password:""}),p=Object(G.a)(j,2),b=p[0],h=p[1],f=Object(s.useState)(!1),g=Object(G.a)(f,2),O=g[0],v=g[1],w=Y(),k=Object($.a)(N,{onError:function(){i(Q),m(!0)},onSuccess:function(){i(Z),m(!0)}}),y=function(){var e=Object(W.a)(A.a.mark((function e(t){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k.mutate({username:t.username,email:t.email,password:t.password}),h({username:t.username,password:t.password});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=Object($.a)(B,{onError:function(){i(Q),m(!0)}}),T=function(){var e=Object(W.a)(A.a.mark((function e(t){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S.mutate({username:t.username,password:t.password});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){var e,t,r,s,n,o;(k.isSuccess&&b.username&&b.password&&!S.isLoading&&T(b),S.isSuccess)&&(localStorage.setItem("access_token",null!==(e=null===(t=S.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.access_token)&&void 0!==e?e:""),a(null!==(s=null===(n=S.data)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.access_token)&&void 0!==s?s:""),v(!0))}),[k,t,S]),O||(null===t||void 0===t?void 0:t.username)?Object(r.jsx)(x.a,{to:"/"}):Object(r.jsx)("div",{className:w.root,children:Object(r.jsx)(D.b,{initialValues:{username:"",email:"",password:"",confirmPassword:""},onSubmit:function(e,t){y(e),setTimeout((function(){t.setSubmitting(!1)}),400)},validationSchema:H,children:function(e){var t=e.handleBlur,a=e.handleChange,s=e.values,n=e.isSubmitting,o=e.touched,i=e.errors;return Object(r.jsx)(D.a,{children:Object(r.jsxs)(J.a,{container:!0,direction:"row",children:[Object(r.jsx)(J.a,{item:!0,className:w.title,xs:12,children:Object(r.jsx)("h1",{children:"Sign up!"})}),Object(r.jsx)(J.a,{item:!0,className:w.textField,xs:8,children:Object(r.jsx)(K.a,{id:"username",name:"username",type:"text",label:"Username",value:s.username,onChange:a,onBlur:t,helperText:o.username&&i.username?i.username:"",error:!(!o.username||!i.username)})}),Object(r.jsxs)(J.a,{item:!0,className:w.textField,xs:8,children:[" ",Object(r.jsx)(K.a,{id:"email",name:"email",type:"text",label:"Email",value:s.email,onChange:a,onBlur:t,helperText:o.email&&i.email?i.email:"",error:!(!o.email||!i.email)})]}),Object(r.jsx)(J.a,{item:!0,className:w.textField,xs:8,children:Object(r.jsx)(K.a,{id:"password",name:"password",type:"password",label:"Password",value:s.password,onChange:a,onBlur:t,helperText:o.password&&i.password?"Make sure your password is minimum of 8 characters long and consists of at least 1 uppercase, lowercase, number and one special character from !?@#$%^&*(). Password cannot end with an empty space.":"",error:!(!o.password||!i.password)})}),Object(r.jsx)(J.a,{item:!0,className:w.textField,xs:8,children:Object(r.jsx)(K.a,{id:"confirmPassword",name:"confirmPassword",type:"password",label:"Confirm password",value:s.confirmPassword,onChange:a,onBlur:t,helperText:o.confirmPassword&&i.confirmPassword?"Your confirmation did not match with your password. Please try again.":"",error:!(!o.confirmPassword||!i.confirmPassword)})}),Object(r.jsxs)(J.a,{item:!0,className:w.registerButton,xs:6,children:[Object(r.jsxs)(M.a,{color:"primary",type:"submit",variant:"contained",disabled:n,children:[" ","Sign up"]}),u&&Object(r.jsx)("div",{className:"formStatus",children:"success"===c.type?Object(r.jsx)("p",{className:w.successMessage,children:c.message}):"error"===c.type?Object(r.jsx)("p",{className:w.errorMessage,children:c.message}):null})]})]})})}})})})),ee=Object(T.a)((function(e){return Object(P.a)({root:{maxWidth:"500px",display:"block",margin:"0 auto"},textField:{"& > *":{width:"100%"}},loginButton:{marginTop:"30px"},title:{textAlign:"left"},successMessage:{color:e.palette.success.main},errorMessage:{color:e.palette.error.main}})})),te={message:"Invalid username or password. Please try again.",type:"error"},ae=Object(l.b)((function(e){return{token:e.userdata.token,user:e.userdata.user}}),{setToken:O,setUser:v})((function(e){e.token;var t=e.user,a=e.setToken,n=(e.setUser,Object(s.useState)({message:"",type:""})),o=Object(G.a)(n,2),c=o[0],i=o[1],l=ee(),d=Object(s.useState)(!1),u=Object(G.a)(d,2),m=u[0],j=u[1],p=Object(s.useState)(!1),b=Object(G.a)(p,2),h=b[0],f=b[1],g=Object($.a)(B,{onError:function(){i(te),j(!0)}}),O=function(){var e=Object(W.a)(A.a.mark((function e(t){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:g.mutate({username:t.username,password:t.password});case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();if(Object(s.useEffect)((function(){var e,t,r,s,n,o;g.isSuccess&&!g.isLoading&&(localStorage.setItem("access_token",null!==(e=null===(t=g.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.access_token)&&void 0!==e?e:""),a(null!==(s=null===(n=g.data)||void 0===n||null===(o=n.data)||void 0===o?void 0:o.access_token)&&void 0!==s?s:""),f(!0))}),[g]),h&&g.isSuccess||(null===t||void 0===t?void 0:t.username))return Object(r.jsx)(x.a,{to:"/"});var v=V.a().shape({username:V.c().required("Please enter your username."),password:V.c().required("Please enter your password.")});return Object(r.jsx)("div",{className:l.root,children:Object(r.jsx)(D.b,{initialValues:{username:"",password:""},onSubmit:function(e,t){O(e),setTimeout((function(){t.setSubmitting(!1)}),400)},validationSchema:v,children:function(e){var t=e.handleBlur,a=e.handleChange,s=e.values,n=e.isSubmitting,o=e.touched,i=e.errors;return Object(r.jsx)(D.a,{children:Object(r.jsxs)(J.a,{container:!0,direction:"row",children:[Object(r.jsx)(J.a,{item:!0,className:l.title,xs:12,children:Object(r.jsx)("h1",{children:"Login"})}),Object(r.jsx)(J.a,{item:!0,className:l.textField,xs:8,children:Object(r.jsx)(K.a,{id:"username",name:"username",type:"text",label:"Username",value:s.username,onChange:a,onBlur:t,helperText:o.username&&i.username?i.username:"",error:!(!o.username||!i.username)})}),Object(r.jsx)(J.a,{item:!0,className:l.textField,xs:8,children:Object(r.jsx)(K.a,{id:"password",name:"password",type:"password",label:"Password",value:s.password,onChange:a,onBlur:t,helperText:o.password&&i.password?i.password:"",error:!(!o.password||!i.password)})}),Object(r.jsxs)(J.a,{item:!0,className:l.loginButton,xs:6,children:[Object(r.jsxs)(M.a,{color:"primary",type:"submit",variant:"contained",disabled:n,children:[" ","Log in"]}),m&&Object(r.jsx)("div",{className:"formStatus",children:Object(r.jsx)("p",{className:l.errorMessage,children:c.message})})]})]})})}})})})),re=Object(l.b)((function(e){return{token:e.userdata.token,user:e.userdata.user}}),{setToken:O,setUser:v})((function(e){var t=e.token,a=e.user,n=e.setToken,o=e.setUser,c=Object(g.a)(["me",t],(function(){return function(e){var t={headers:{Authorization:"JWT ".concat(e)}};return k.a.get("".concat(y,"/").concat(S,"/me"),t)}(t)}),{enabled:!!t,onError:function(){n(""),localStorage.removeItem("access_token")}});return Object(s.useEffect)((function(){var e,t,a,r,s;(n(null!==(e=localStorage.getItem("access_token"))&&void 0!==e?e:""),c.isSuccess)&&o({username:null===(t=c.data)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.username,email:null===(r=c.data)||void 0===r||null===(s=r.data)||void 0===s?void 0:s.email})}),[c]),Object(r.jsxs)("div",{children:[Object(r.jsx)(L,{user:a}),Object(r.jsx)(x.b,{exact:!0,path:"/",children:Object(r.jsx)(R,{})}),Object(r.jsx)(x.b,{exact:!0,path:"/register",component:X}),Object(r.jsx)(x.b,{exact:!0,path:"/login",component:ae})]})})),se=Object(m.d)(f,{},Object(m.a)(j.a)),ne=new d.a;var oe=function(){return Object(r.jsx)(l.a,{store:se,children:Object(r.jsx)(u.a,{client:ne,children:Object(r.jsx)(re,{})})})};c.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(i.a,{children:Object(r.jsx)(oe,{})})}),document.getElementById("root"))}},[[270,1,2]]]);
//# sourceMappingURL=main.7c2eeccb.chunk.js.map