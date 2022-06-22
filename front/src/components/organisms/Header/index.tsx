import React from "react";
import Navi from "@molecules/Navigation";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  max-width:1200px;
  position: fixed;
  top: 15px;
  left: 50%;
  border-radius: 20px;
  transform:translateX(-50%);
  right: 0;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
`

function Navigation() {
  return (
    <StyledHeader>
      <Navi/>
    </StyledHeader>
  )
}

export default Navigation
