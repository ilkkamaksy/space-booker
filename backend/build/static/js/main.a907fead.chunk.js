(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{141:function(e,a,t){},264:function(e,a,t){},265:function(e,a,t){"use strict";t.r(a);var r=t(3),s=t(0),n=t.n(s),o=t(13),c=t.n(o),i=t(23),l=(t(141),t(14)),d=t(305),u=t(70),m=t(306),j=t(73),p=t.n(j),b="http://localhost:3000/api/v1";function h(e){return p.a.post("".concat(b,"/register"),e)}function x(e){return p.a.post("http://localhost:3000/auth",e)}var g=t(296),f=t(308),O=t(300),w=t(301),v=t(309),y=Object(g.a)((function(){return Object(f.a)({logo:{zIndex:1250,width:"210px",marginRight:"2em"},logoImg:{width:"100%",height:"auto",display:"block"}})})),N=function(){var e=y();return Object(r.jsx)(v.a,{component:i.b,className:e.logo,to:"/",children:Object(r.jsx)("img",{src:"/img/logo.png",className:e.logoImg,alt:"SpaceBooker"})})},S=Object(g.a)((function(){return Object(f.a)({root:{flexGrow:1},appBar:{zIndex:1250,backgroundColor:"#ffffff"},linkBtnTransparent:{padding:"0.8em 1em",border:"1px solid transparent","&:hover":{textDecoration:"none",opacity:.8}},linkBtnBordered:{padding:"0.8em 1em",borderRadius:"4px",border:"1px solid rgba(98,0,238, 0.4)","&:hover":{textDecoration:"none",backgroundColor:"rgba(0,0,0,0.02)",opacity:.8}},loginGreet:{fontSize:".95em",marginRight:"1em",color:"#000"},sectionLeft:{flexGrow:1,textAlign:"left"},toggleButton:{marginRight:25}})})),k=function(e){var a=e.user,t=e.logout,s=S();return Object(r.jsx)("div",{className:s.root,children:Object(r.jsx)(O.a,{position:"static",className:s.appBar,children:Object(r.jsxs)(w.a,{children:[Object(r.jsx)(N,{}),Object(r.jsx)("div",{className:s.sectionLeft,children:Object(r.jsx)(v.a,{component:i.b,className:s.linkBtnTransparent,to:"/dashboard",children:"Dashboard"})}),Object(r.jsxs)("div",{children:[!a&&Object(r.jsxs)("div",{children:[Object(r.jsx)(v.a,{component:i.b,className:s.linkBtnTransparent,to:"/login",children:"Login"}),Object(r.jsx)(v.a,{component:i.b,className:s.linkBtnBordered,to:"/register",children:"Sign up"})]}),a&&Object(r.jsxs)("div",{children:[Object(r.jsxs)("span",{className:s.loginGreet,children:["Hello, ",a.username]}),Object(r.jsx)(v.a,{component:i.b,className:s.linkBtnBordered,to:"/",onClick:t,children:"Logout"})]})]})]})})})},B=t(304),P=Object(g.a)((function(){return Object(f.a)({root:{background:"#6A0572",display:"flex",position:"relative",justifyContent:"center",alignItems:"center",height:"calc(100vh - 64px)"},intro:{color:"#ffffff",textAlign:"center",position:"relative",zIndex:1},heading:{fontSize:"4rem",position:"relative",fontWeight:"bold",letterSpacing:-1,marginBottom:"1rem"},introText:{fontSize:"1.5rem",marginTop:"0 auto 2rem"},containedBtn:{backgroundColor:"#df0cc4",padding:"12px 0",fontWeight:"bold",color:"#ffffff",margin:"0 0.5em",width:180},outlinedBtn:{padding:"12px 0",fontWeight:"bold",color:"#ffffff",margin:"0 0.5em",width:180,borderColor:"rgba(255,255,255,0.5)","&:hover":{borderColor:"#fff"}}})})),C=function(){var e=P(),a=Object(l.e)(),t=function(e){return function(){a.push(e)}};return Object(r.jsx)("div",{className:e.root,children:Object(r.jsxs)("div",{className:e.intro,children:[Object(r.jsx)("h1",{className:e.heading,children:"Working spaces booking app"}),Object(r.jsx)("p",{className:e.introText,children:"Create a booking calendar for your working spaces in a few seconds."}),Object(r.jsx)(B.a,{color:"primary",className:e.containedBtn,variant:"contained",size:"large",onClick:t("/register"),disableElevation:!0,children:"Sign up"}),Object(r.jsx)(B.a,{color:"secondary",className:e.outlinedBtn,variant:"outlined",size:"large",onClick:t("/login"),disableElevation:!0,children:"Login"})]})})},T=t(46),E=t.n(T),I=t(66),z=t(24),M=t(307),F=t(48),L=t(302),q=t(303),A=t(25),W=function(){return A.a().shape({email:A.c().email().required("Email address is mandatory."),username:A.c().required("Please choose your username.").min(3,"Username must be at least 3 characters long.").max(50,"Username can be maximum 50 characters long.").required("Username is mandatory."),password:A.c().min(8,"Password must be at least 8 characters long.").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!?@#$%^&*()]).{7,30}\S$/).required("Password must have at least one number, one uppercase character, lowercase  character and special character from !?@#$%^&*() "),confirmPassword:A.c().oneOf([A.b("password"),""],"Passwords must match.").required("Passwords must match.")})},R=Object(g.a)((function(e){return Object(f.a)({root:{maxWidth:"500px",display:"block",margin:"0 auto"},textField:{"& > *":{width:"100%"}},registerButton:{marginTop:"30px"},title:{textAlign:"left"},successMessage:{color:e.palette.success.main},errorMessage:{color:e.palette.error.main}})})),U={success:{message:"Registered successfully.",type:"success"},error:{message:"Registeration failed: username already exists.",type:"error"}},_=function(){var e=Object(s.useState)({message:"",type:""}),a=Object(z.a)(e,2),t=a[0],n=a[1],o=R(),c=Object(s.useState)(!1),i=Object(z.a)(c,2),l=i[0],d=i[1],u=Object(M.a)(h),m=function(){var e=Object(I.a)(E.a.mark((function e(a){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u.mutate({username:a.username,email:a.email,password:a.password});case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){u.isSuccess&&(n(U.success),d(!0)),u.isError&&(n(U.duplicate),d(!0))}),[u.isSuccess,u.isError]),Object(r.jsx)("div",{className:o.root,children:Object(r.jsx)(F.b,{initialValues:{username:"",email:"",password:"",confirmPassword:""},onSubmit:function(e,a){m(e),setTimeout((function(){a.setSubmitting(!1)}),400)},validationSchema:W,children:function(e){var a=e.handleBlur,s=e.handleChange,n=e.values,c=e.isSubmitting,i=e.touched,d=e.errors;return Object(r.jsx)(F.a,{children:Object(r.jsxs)(L.a,{container:!0,direction:"row",children:[Object(r.jsx)(L.a,{item:!0,className:o.title,xs:12,children:Object(r.jsx)("h1",{children:"Sign up!"})}),Object(r.jsx)(L.a,{item:!0,className:o.textField,xs:8,children:Object(r.jsx)(q.a,{id:"username",name:"username",type:"text",label:"Username",value:n.username,onChange:s,onBlur:a,helperText:i.username&&d.username?d.username:"",error:!(!i.username||!d.username)})}),Object(r.jsxs)(L.a,{item:!0,className:o.textField,xs:8,children:[" ",Object(r.jsx)(q.a,{id:"email",name:"email",type:"text",label:"Email",value:n.email,onChange:s,onBlur:a,helperText:i.email&&d.email?d.email:"",error:!(!i.email||!d.email)})]}),Object(r.jsx)(L.a,{item:!0,className:o.textField,xs:8,children:Object(r.jsx)(q.a,{id:"password",name:"password",type:"password",label:"Password",value:n.password,onChange:s,onBlur:a,helperText:i.password&&d.password?"Make sure your password is minimum of 8 characters long and consists of at least 1 uppercase, lowercase, number and one special character from !?@#$%^&*(). Password cannot end with an empty space.":"",error:!(!i.password||!d.password)})}),Object(r.jsx)(L.a,{item:!0,className:o.textField,xs:8,children:Object(r.jsx)(q.a,{id:"confirmPassword",name:"confirmPassword",type:"password",label:"Confirm password",value:n.confirmPassword,onChange:s,onBlur:a,helperText:i.confirmPassword&&d.confirmPassword?"Your confirmation did not match with your password. Please try again.":"",error:!(!i.confirmPassword||!d.confirmPassword)})}),Object(r.jsxs)(L.a,{item:!0,className:o.registerButton,xs:6,children:[Object(r.jsxs)(B.a,{color:"primary",type:"submit",variant:"contained",disabled:c,children:[" ","Sign up"]}),l&&Object(r.jsx)("div",{className:"formStatus",children:"success"===t.type?Object(r.jsx)("p",{className:o.successMessage,children:t.message}):"error"===t.type?Object(r.jsx)("p",{className:o.errorMessage,children:t.message}):null})]})]})})}})})},G=Object(g.a)((function(e){return Object(f.a)({root:{maxWidth:"500px",display:"block",margin:"0 auto"},textField:{"& > *":{width:"100%"}},loginButton:{marginTop:"30px"},title:{textAlign:"left"},successMessage:{color:e.palette.success.main},errorMessage:{color:e.palette.error.main}})})),$={error:{message:"Login failed. Please try again.",type:"error"}},D=function(){var e=Object(s.useState)({message:"",type:""}),a=Object(z.a)(e,2),t=a[0],n=a[1],o=G(),c=Object(s.useState)(!1),i=Object(z.a)(c,2),l=i[0],d=i[1],u=Object(M.a)(x),m=function(){var e=Object(I.a)(E.a.mark((function e(a){return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u.mutate({username:a.username,password:a.password});case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){var e,a,t;u.isSuccess&&(localStorage.setItem("access_token",null!==(e=null===(a=u.data)||void 0===a||null===(t=a.data)||void 0===t?void 0:t.access_token)&&void 0!==e?e:""),window.location.href="/");u.isError&&(n($.duplicate),d(!0))}),[u.isSuccess,u.isError]);var j=A.a().shape({username:A.c().required("Please enter your username."),password:A.c().required("Please enter your password.")});return Object(r.jsx)("div",{className:o.root,children:Object(r.jsx)(F.b,{initialValues:{username:"",password:""},onSubmit:function(e,a){m(e),setTimeout((function(){a.setSubmitting(!1)}),400)},validationSchema:j,children:function(e){var a=e.handleBlur,s=e.handleChange,n=e.values,c=e.isSubmitting,i=e.touched,d=e.errors;return Object(r.jsx)(F.a,{children:Object(r.jsxs)(L.a,{container:!0,direction:"row",children:[Object(r.jsx)(L.a,{item:!0,className:o.title,xs:12,children:Object(r.jsx)("h1",{children:"Login"})}),Object(r.jsx)(L.a,{item:!0,className:o.textField,xs:8,children:Object(r.jsx)(q.a,{id:"username",name:"username",type:"text",label:"Username",value:n.username,onChange:s,onBlur:a,helperText:i.username&&d.username?d.username:"",error:!(!i.username||!d.username)})}),Object(r.jsx)(L.a,{item:!0,className:o.textField,xs:8,children:Object(r.jsx)(q.a,{id:"password",name:"password",type:"password",label:"Password",value:n.password,onChange:s,onBlur:a,helperText:i.password&&d.password?d.password:"",error:!(!i.password||!d.password)})}),Object(r.jsxs)(L.a,{item:!0,className:o.loginButton,xs:6,children:[Object(r.jsxs)(B.a,{color:"primary",type:"submit",variant:"contained",disabled:c,children:[" ","Log in"]}),l&&Object(r.jsx)("div",{className:"formStatus",children:Object(r.jsx)("p",{className:o.errorMessage,children:t.message})})]})]})})}})})},J=(t(264),new d.a);var V=function(){var e,a,t=null!==(e=localStorage.getItem("access_token"))&&void 0!==e?e:void 0,s=Object(m.a)(["me",t],(function(){return function(e){var a={headers:{Authorization:"JWT ".concat(e)}};return p.a.get("".concat(b,"/me"),a)}(t)}),{enabled:!!t,onError:function(){t=void 0,localStorage.removeItem("access_token")}}),n=null===(a=s.data)||void 0===a?void 0:a.data;console.log("meeeee",s);return Object(r.jsxs)("div",{children:[Object(r.jsx)(k,{logout:function(){localStorage.removeItem("access_token"),window.location.href="/"},user:n}),Object(r.jsx)(l.a,{exact:!0,path:"/",children:Object(r.jsx)(C,{})}),Object(r.jsx)(l.a,{exact:!0,path:"/register",component:_}),Object(r.jsx)(l.a,{exact:!0,path:"/login",component:D})]})},H=function(){return Object(r.jsx)(u.a,{client:J,children:Object(r.jsx)(V,{})})};c.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(i.a,{children:Object(r.jsx)(H,{})})}),document.getElementById("root"))}},[[265,1,2]]]);
//# sourceMappingURL=main.a907fead.chunk.js.map