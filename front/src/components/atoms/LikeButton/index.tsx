import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";


export interface LikeByMe{
  likeByMe:boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const StyledButton = styled.button`
  display: inline-block;
  outline: none;
  border: none;
  background: none;
  color: #e54c3f;
`
function LikeButton({likeByMe,onClick}: LikeByMe) {
  console.log('좋아요')
  return (
    <StyledButton type="button" onClick={onClick}>

      {likeByMe?<FontAwesomeIcon icon="heart"/>:<FontAwesomeIcon icon={faHeart} />}
    </StyledButton>
  )
}

export default LikeButton
