import React from "react";
import styled from "styled-components";
import PostList from "@organisms/Post";
import Header from "@organisms/Header";
import {PostListType} from "../../interfaces/ApiDataType";

const StyledPostListContainer = styled.div`
  max-width:600px;
  margin:0 auto;
`
function ListTemplate({listData}:{listData:PostListType[]}){
  return(
    <StyledPostListContainer>
      <Header/>
      {
        listData.map((data)=><PostList key={data.id} post={data}/>)
      }
    </StyledPostListContainer>
  )
}
export default ListTemplate
