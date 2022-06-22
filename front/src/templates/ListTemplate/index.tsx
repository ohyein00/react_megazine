import React from "react";
import styled from "styled-components";
import Post from "@organisms/Post";
import Header from "@organisms/Header";
import {PostResType} from "../../interfaces/ApiDataType";

const StyledPostListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

function ListTemplate({pageData}: { pageData: PostResType[] | undefined }) {
  return (
    <>
      <Header/>
      <StyledPostListContainer>
        {
          pageData?.map((page) => page.posts?.map((post) => <Post key={post.id} post={post}/>))

        }
      </StyledPostListContainer>
    </>

  )
}

export default ListTemplate
