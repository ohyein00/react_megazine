import React from "react";
import styled from "styled-components";
import Post from "@organisms/Post";
import Header from "@organisms/Header";
import {PostListType} from "../../interfaces/ApiDataType";

const StyledPostListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

function ListTemplate({listData}: { listData: PostListType[] }) {
  console.log('page1')
  return (
    <>
      <Header/>
      <StyledPostListContainer>
        {
          listData.map((data) => <Post key={data.id} post={data}/>)
        }
      </StyledPostListContainer>
    </>
  )
}

export default ListTemplate
