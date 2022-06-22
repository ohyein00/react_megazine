/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useInfiniteQuery} from "react-query";

import usePostApi from "@service/usePostApi";
import styled from "styled-components";
import {useInView} from "react-intersection-observer";
import ListTemplate from "@templates/ListTemplate";
import {PostResType} from "../../interfaces/ApiDataType";

const StyledLoading = styled.aside`
  padding: 150px;
  text-align: center;
  font-size: 20px;
`

function List() {
    const {ref, inView} = useInView({threshold: 0.75});

  const {data, hasNextPage, fetchNextPage , isFetchingNextPage} = useInfiniteQuery<PostResType, // , isFetching
    Error,
    PostResType,
    [string] | string>(['postList'],
    async ({pageParam = 0}) => usePostApi.getPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(allPages)
        return lastPage.end === false ? allPages.length : undefined},
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry:1
    }
  );
  useEffect(() => {
    console.log(data,'useEffect Data')
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView,hasNextPage])
  return (
    <>
      <ListTemplate pageData={data?.pages}/>
      {
        hasNextPage &&
      <StyledLoading ref={ref}>
        <p>LOADING..</p>
      </StyledLoading>
      }

    </>
  )
  /*
      <ListTemplate listData={data}/>
    {hasNextPage||isFetchingNextPage &&
    <StyledLoading ref={ref}>
      <p>LOADING..isFetching{isFetching}</p>
    </StyledLoading>
    }
    */
}

export default List
