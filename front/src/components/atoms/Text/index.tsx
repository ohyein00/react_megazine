import React, {ReactNode} from "react";
import styled from "styled-components";

export interface TextProps {
  content : string | ReactNode;
}
const StyledP = styled.p`
  line-height:1.4;
`

function Text({content}: TextProps) {
  return (
    <StyledP>{content}</StyledP>
  )
}

export default Text
