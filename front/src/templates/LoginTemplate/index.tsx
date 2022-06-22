import React from "react";
import styled from "styled-components";
import LoginContainer from "@organisms/LoginContainer";
import Title from "@atoms/Title";

const StyledLoginTemplate = styled.div`
  @media (min-width: 1000px) {
    max-width:400px;
  }
  width: 90vw;
  margin:100px auto;
  background: #fff;
  padding:10px;
  box-sizing: border-box;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  border-radius: 10px;
`
function LoginTemplate(){
  return(
    <StyledLoginTemplate>
      <Title content="로그인" importance="h2"/>
      <LoginContainer/>
    </StyledLoginTemplate>
  )
}
export default LoginTemplate
