import React, {useCallback, useContext} from "react";
import styled,{ThemeContext} from "styled-components";
import Button from "@atoms/Buttons";
import {useNavigate} from 'react-router-dom';
import UserThumb,{UserThumbType} from "@molecules/userThumb";
import {useMutation,useQueryClient} from "react-query";
import usePostApi from "@service/usePostApi";
import timeForToday from "@utils/Time/time"
import {useRecoilValue} from "recoil";
import userToken from "@recoil/userAtoms";
import {getEmail} from "@utils/Jwt/jwt";

const StyledCardTopBarArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 10px;
`
const StyledCreatedAt = styled.p`
  font-size: 12px;
  color: #999;
  margin-top: 3px;

  &::before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 1em;
    width: 1px;
    background: #999;
    opacity: .5;
    margin: 0 10px;
  }
`
const StyledButtonArea = styled.div`
  justify-content: right;
  display: flex;
  align-items: center;

  & > button {
    margin-left: 8px;
    font-weight: bold;
  }
`
const StyledPostInfo = styled.div`
  justify-content: right;
  display: flex;
  align-items: center;
`
interface PostTopBarType<T> extends UserThumbType {
  postId: T,
  createdAt: Date,
  userEmail: string
}
function PostTopBar<T>({userName,userEmail, src, alt, postId, createdAt, post}:PostTopBarType<T>){
  const themeContext = useContext(ThemeContext);
  const queryClient = useQueryClient()
  const deletePostApi = usePostApi.delete
  const navigate = useNavigate();

  const token = useRecoilValue(userToken)
  const deleteMutation = useMutation((id: T) => deletePostApi(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('postList');
    },
  });
  /* useCallback으로 안싸면 자기 혼자 실행되고 난리남 */
  const checkMyPost = () => {
    if (token === '') return false
    return getEmail(token) === userEmail
  }
  /* useCallback으로 안싸면 자기 혼자 실행되고 난리남 */
  const deleteCallBack = useCallback(() => {
    deleteMutation.mutate(postId)
  }, [deleteMutation, postId])
  const modifyPost = () => {
    navigate('/write',  {state:{post}});
  };
  return (
    <StyledCardTopBarArea>
      <StyledPostInfo>
        <UserThumb alt={alt} src={src} userName={userName}/>
        <StyledCreatedAt>{timeForToday(createdAt)}</StyledCreatedAt>
      </StyledPostInfo>
      {
        checkMyPost()
        &&
        <StyledButtonArea>
          <Button size="xsmall" onClick={modifyPost}
                  bgColor={themeContext.colors.point_6} round="10px"
                  color={themeContext.colors.point_0}>수정</Button>
          <Button size="xsmall" onClick={deleteCallBack} bgColor={themeContext.colors.point_4_1} round="10px"
                  color={themeContext.colors.point_0}>삭제</Button>
        </StyledButtonArea>
      }
    </StyledCardTopBarArea>
  )
}
export default PostTopBar
