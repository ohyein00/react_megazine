import React from "react";
import ListTemplate from "@templates/ListTemplate";
import {useQuery} from "react-query";
import Text from "@atoms/Text";
import usePostApi from "@service/usePostApi";

function List() {

  const {isLoading,data} = useQuery(
    'postList', usePostApi.get, {
      cacheTime: Infinity,
      onError: e => {
        console.log(e)
      }
    }
  )
  if (isLoading) {
    return <Text content="로딩중!"/>
  }
  console.log(data)
  return (
    <ListTemplate listData={data}/>
  )
}

export default List
