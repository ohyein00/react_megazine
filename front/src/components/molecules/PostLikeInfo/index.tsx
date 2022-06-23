import React, {useCallback, useEffect} from "react";
import styled from "styled-components";
import Text, {TextProps} from "@atoms/Text";
import LikeButton, {LikeByMe} from "@atoms/LikeButton";
import {useMutation, useQueryClient} from "react-query";
import usePostApi from "@service/usePostApi";
import {useRecoilValue} from "recoil";
import userToken from "@recoil/userAtoms";

const StyledLikeContainer = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid #efefef;
  align-items: center;
  padding: 10px 10px 0;

  & > p {
    font-size: 13px;
    margin-left: 5px;
  }
`

export interface PostLikeInfoType<V> extends LikeByMe, TextProps {
  postId: V;
}

function PostLikeInfo<V>({likeByMe, postId, ...props}: PostLikeInfoType<V>) {
  const {content} = props
  const queryClient = useQueryClient()
  const likePostApi = usePostApi.likePost
  const token = useRecoilValue(userToken)
  const [like,setLike] = React.useState(likeByMe)
  const likeMutation = useMutation((id: V) => likePostApi(id), {
    onSuccess: () => {
      setLike(!like)
    },
  });
  useEffect(()=>()=>{
    queryClient.invalidateQueries('postList')
    },[queryClient])
  const callBackToggleLike = useCallback((event:any)=>{
    if (!token) {
      event.preventDefault()
      alert('로그인 후 이용 가능합니다')
      return false
    }
    likeMutation.mutate(postId)
  },[likeMutation, postId , token])
  return (
    <StyledLikeContainer>
      <LikeButton likeByMe={like} onClick={(event)=>callBackToggleLike(event)}/>
      <Text content={`${content}`}/>
    </StyledLikeContainer>
  )
}

export default PostLikeInfo
