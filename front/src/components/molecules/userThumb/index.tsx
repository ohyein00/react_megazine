import React from "react";
import Figure, {ImgProps} from "@atoms/Figure";
import styled from "styled-components";

export interface UserThumbType extends ImgProps{
  userName:string
}

const StyledUserInfo = styled.div`
  text-align:left;
  display:flex;
  align-items: center;
  &>p{
    font-size:14px;
    margin-left:10px;
  }
`
function UserThumb({userName, src, alt}:UserThumbType){
  return (
      <StyledUserInfo>
        <Figure alt={alt} src={src} round={100} width="30px" height="30px"/>
        <p>{userName}</p>
      </StyledUserInfo>
  )
}
export default UserThumb
