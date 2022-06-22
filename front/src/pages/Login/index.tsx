import React from "react";
import LoginTemplate from "@templates/LoginTemplate";
import Header from "@organisms/Header";


function Login(){
  return(
    // Question. 아래 props  [prop: string]: any; 로 어떻게 전달하지??
    // <Input id="loginId" placeholder="아이디를 입력해주세요" borderSize={1} max-length={5} min-length={0}/>
    <>
      <Header/>
    <LoginTemplate/>
    </>
  )
}

export default Login
