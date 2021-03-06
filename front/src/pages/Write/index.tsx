import React, {useContext, useState} from "react";
import Button from "@atoms/Buttons";
import {useNavigate, useLocation} from "react-router-dom";
import AddImgInput from "@molecules/AddImgInput";
import {FieldValues, useForm} from "react-hook-form";
import Input from "@atoms/Input";
import usePostApi from "@service/usePostApi";
import styled, {ThemeContext} from "styled-components";
import Title from "@atoms/Title";
import {useMutation, useQueryClient} from "react-query";
import Header from "@organisms/Header";
import {PostListType} from "../../interfaces/ApiDataType";

const StyledInputArea = styled.div`
  margin-bottom: 20px;
`
const StyledFormContainer = styled.div`
  h2 {
    text-align: center;
    margin-top: 70px;
  }
`
const StyledFormBody = styled.div`
  max-width: 600px;
  margin: 40px auto;
  width: 100%;
  padding: 25px;
  background: #fff;
  border-radius: 20px;


  input[type=radio] {
    visibility: hidden;
    width: 0;
    height: 0;
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

  button:disabled {
    opacity: .6
  }
`
const StyledTemplateArea = styled.div`
  display: flex;
  justify-content: center;

  label {
    width: 100px;
    cursor: pointer;
    margin-bottom: 20px;
    justify-content: center;
  }

  input:checked + label {
    font-weight: bold;
    color: ${({theme}) => theme.colors.point_2};;
  }
`
const TextAreaBox = styled.div`
  display: flex;

  label {
    width: 100px;
    justify-content: center;
    padding-right: 20px;
  }

  textarea {
    min-height: 300px;
    border: 1px solid #dcdcdc;
    padding: 15px 10px;
    font-size: 14px;
    margin: 10px 0 30px;
    width: calc(100% - 100px);
  }
`
const StyledTitleBox = styled.div`
  display: flex;
  margin-bottom: 15px;

  label {
    width: 100px;
    justify-content: center;
    padding-right: 20px;
  }

  input {
    width: calc(100% - 100px)
  }
`
export type WriteFormFileds = {
  postId: number;
  title: string;
  content: string;
  image: File[];
  template: string;
};

// URL??? File ????????? ????????? ??????
/*
export const convertURLtoFile = async (url: string) => {
  // ?????? http://mybucket-files.s3.ap-northeast-2.amazonaws.com/b8ad145b-e01a-44c6-bae4-b5a14eec9b7f.jpg
  const response = await fetch(url); // url ??????
  const data = await response.blob(); // ???????????? ????????? ???????????? ?????????
  const ext = url.split(".").pop(); // .?????? ?????? ???????????? ????????? ????????? ????????? .jpg
  const filename = url.split("/").pop(); // / ?????? ????????? ????????? ???????????? b8ad145b-e01a-44c6-bae4-b5a14eec9b7f.jpg
  const metadata = { type: `image/${ext}` }; // ?????? ????????? ?????? ????????? ?????? ????????? ??????
  return new File([data], filename!, metadata); // ????????? ???????????? ???????????? ????????? ?????? ??????
  // ?????????????????? ?????? file ????????? ???????????? ????????? ????????? ???????????? ??????????????? ?????? AWS ?????? ????????? ????????? ???????????? ??????
};
?????? ??????
*/
function Write() {
  const queryClient = useQueryClient();
  const {register, handleSubmit, formState, setValue} = useForm<WriteFormFileds>({mode: 'onChange'});
  const [files, setFiles] = useState<File[]>([])
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { post: PostListType };
  // ????????? post ???????????? ?????? ????????? ?????? ??????
  const themeContext = useContext(ThemeContext);

  // ????????? post ???????????? ?????? ??????
  // true = ?????? ??????, false = ?????? ??????
  // ?????? ????????? !! ?????? ????????? true??? ?????? ??????????????? if(????????????) ???????????? -> ???????????? ????????? esLint?????? ????????????
  const writeType = !state?.post;
  const [selectedTemplate, setSelectedTemplate] = React.useState<number>(state?.post.template);
  // ????????? ??? ????????? ????????? ???????????? ?????? ????????? ?????????, title??? ????????? ?????? ????????? ????????? ?????? ????????? ????????? state ???????????? ??? ?????? ???
  const [beforeTitle, setBeforeTitle] = React.useState<string>(state?.post.title);

  const isRadioSelected = (value: number): boolean => selectedTemplate === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>):
    void => setSelectedTemplate(parseInt(e.currentTarget.value,10))
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):
    void => setBeforeTitle(e.currentTarget.value)

  // ??????????????? ?????? postId??? ??? ?????????
  if (!writeType) {
    setValue("title", beforeTitle);
    setValue("postId", state?.post.id);
    /*
    const preFile: any = convertURLtoFile(state?.post.imageUrl);
    console.log(preFile);
    setFiles([preFile]);
    */
  }


  const postApi = writeType ? usePostApi.post : usePostApi.modifyPost;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mutation = useMutation((addData: FieldValues) => postApi(addData), {
    onSuccess: () => {
      queryClient.invalidateQueries('postList');
      navigate('/')
    },
    onError: () => {

    }
  });

  const saveBtnClick = (data: FieldValues) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('image', file);
    });
    const {title, content, postId} = data;
    // template?????? radio?????? ?????? ???????????? ???????????? 1??? ?????????
    // ?????? ?????? ?????? ???????????? selectedTemplate state?????? ?????? ???????????? template??? ?????????
    // ????????? ????????? ?????? formData??? int?????? ???????????? any type ????????? ?????? ???????????? ?????????
    const templateTemp: any = selectedTemplate;
    formData.append('title', title)
    formData.append('content', content)
    formData.append('template', templateTemp)
    if (!writeType) formData.append('postId', postId)
    mutation.mutate(formData)
  }


  return (
    <>
      <Header/>

      <StyledFormContainer>
        <Title content="??? ????????????" importance="h2"/>
        <StyledFormBody>
          <form onSubmit={handleSubmit(saveBtnClick)} encType="multipart/formdata">
            <input id="postId" {...register('postId')} hidden/>
            <StyledInputArea>
              <StyledTemplateArea>
                <input id="left" {...register("template", {required: true})} type="radio" value={1}
                       checked={isRadioSelected(1)} onChange={handleRadioClick}/>
                <label htmlFor="left">Left</label>

                <input id="center" {...register("template", {required: true})} type="radio" value={2}
                       checked={isRadioSelected(2)} onChange={handleRadioClick}/>
                <label htmlFor="center">Center</label>

                <input id="right" {...register("template", {required: true})} type="radio" value={3}
                       checked={isRadioSelected(3)} onChange={handleRadioClick}/>
                <label htmlFor="right">Right</label>
              </StyledTemplateArea>
              <StyledTitleBox>
                <Input id="title" register={register('title', {required: true})} onChange={handleInputChange}>??????</Input>
              </StyledTitleBox>
              <TextAreaBox>
                <label htmlFor="content">??????</label>
                <textarea {...register('content', {required: true})}
                          defaultValue={state?.post.content}/>
              </TextAreaBox>
              <AddImgInput setImgFiles={setFiles} maxNum={4}/>
            </StyledInputArea>
            <Button type="submit"
                    disabled={!formState.isValid}
                    size="big" bgColor={themeContext.colors.point_0} color="#fff">
              ????????????
            </Button>
          </form>
        </StyledFormBody>
      </StyledFormContainer>
    </>
  )
}

export default Write
