import React, {useContext, useState} from "react";
import Button from "@atoms/Buttons";
import {useGetuserToken} from "@hooks/useLoginHooks";
import {Navigate, useNavigate} from "react-router-dom";
import AddImgInput from "@molecules/AddImgInput";
import {FieldValues, useForm} from "react-hook-form";
import Input from "@atoms/Input";
import usePostApi from "@service/usePostApi";
import styled, {ThemeContext} from "styled-components";
import Title from "@atoms/Title";

const StyledInputArea = styled.div`
  margin-bottom: 20px;
`
const StyledFormContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  width: 100%;
  padding: 25px;
  background: #fff;
  border-radius: 20px;
  input[type=radio]{
    visibility: hidden;
    width:0;
    height:0;
  }
  label, input, p {
    font-size: 14px;
  }

  label {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 16px;
  }

  input[type="text"], textarea {
    border: 1px solid #dcdcdc;
  }

`
const StyledTemplateArea = styled.div`
  display: flex;
  justify-content: center;
  label{
    width:100px;
    margin-bottom:20px;
    justify-content: center;
  }
`
const TextAreaBox = styled.div`
  display: flex;

  label {
    width: 100px;
    justify-content: center;
    padding-right:20px;
  }

  textarea {
    min-height: 300px;
    border: 1px solid #dcdcdc;
    padding: 20px;
    font-size: 14px;
    margin: 10px 0 30px;
    width:calc(100% - 100px);
  }
`
const StyledTitleBox = styled.div`
  display: flex;
  margin-bottom: 15px;
  label {
    width: 100px;
    justify-content: center;
    padding-right:20px;
  }
  input{
    width:calc(100% - 100px)
  }
`
export type WriteFormFileds = {
  title: string;
  content: string;
  image: File[];
  template: string;
};

function Write() {
  const {register, handleSubmit} = useForm<WriteFormFileds>();
  const [files, setFiles] = useState<File[]>([])
  const token = useGetuserToken()
  const postApi = usePostApi.post
  const navigate = useNavigate()
  const themeContext = useContext(ThemeContext);
  if (!token) {
    alert('로그인이 필요한 페이지입니다.')
    return <Navigate to="/login" replace/>;
  }

  const saveBtnClick = (data: FieldValues) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('image', file);
    });
    formData.append('title', data.title)
    formData.append('content', data.content)
    formData.append('template', data.template)
    postApi(formData)
    navigate('/')
  }
  return (
    <>
      <Title content="글 작성하기" importance="h2"/>
      <StyledFormContainer>
        <form onSubmit={handleSubmit(saveBtnClick)} encType="multipart/formdata">
          <StyledInputArea>
            <StyledTemplateArea>
              <label htmlFor="center">Center</label>
              <input id="center" {...register("template", {required: true})} type="radio" value="center"/>
              <label htmlFor="left">Left</label>
              <input id="left" {...register("template", {required: true})} type="radio" value="left"/>
              <label htmlFor="right">Right</label>
              <input id="right" {...register("template", {required: true})} type="radio" value="right"/>
            </StyledTemplateArea>
            <StyledTitleBox>
              <Input id="title" register={register('title', {required: true})}>제목</Input>
            </StyledTitleBox>
            <TextAreaBox>
              <label htmlFor="content">내용</label>
              <textarea {...register('content', {required: true})} />
            </TextAreaBox>
            <AddImgInput setImgFiles={setFiles} maxNum={4}/>
          </StyledInputArea>
          <Button type="submit" size="big" bgColor={themeContext.colors.point_0} color="#fff">
            작성하기
          </Button>
        </form>
      </StyledFormContainer>
    </>
  )
}

export default Write
