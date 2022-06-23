import React from "react";
import ListTemplate from "@templates/ListTemplate";
import {useQuery} from "react-query";
import Text from "@atoms/Text";
import usePostApi from "@service/usePostApi";

function List() {

  const {isLoading, data} = useQuery(
    'postList', usePostApi.get, {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: 1,
      onSuccess:()=> {
        console.log('fetch success')
      },
      onError: e => {
        console.log(e)
      }
    }
  )
  if (isLoading) {
    return <Text content="로딩중!"/>
  }
  return (
    <ListTemplate listData={data.posts}/>
  )
}

export default List
