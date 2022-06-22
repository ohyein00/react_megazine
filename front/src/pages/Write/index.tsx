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

function Write() {
  const queryClient = useQueryClient();
  const {register, handleSubmit, formState, setValue} = useForm<WriteFormFileds>({mode: 'onChange'});
  const [files, setFiles] = useState<File[]>([])
  const navigate = useNavigate();
  const location = useLocation();

  const themeContext = useContext(ThemeContext);
  const state = location.state as { post: PostListType };
  // 넘어온 post 파라미터 값이 있으면 수정 모드

  // 넘어온 post 파라미터 확인 코드
  // true = 추가 모드, false = 수정 모드
  // 마음 같아선 !! 두개 붙여서 true인 경우 수정모드로 if(수정모드) 바로처리 -> 해버리고 싶은데 esLint에서 막아버림
  const writeType = !state?.post;
  const [selectedTemplate, setSelectedTemplate] = React.useState<number>(state?.post.template);
  // 수정할 때 이미지 넣으면 페이지가 다시 렌더링 되는지, title에 넣어준 값이 기존에 값으로 다시 돌아가 버려서 state 기반으로 값 처리 함
  const [beforeTitle, setBeforeTitle] = React.useState<string>(state?.post.title);

  const isRadioSelected = (value: number): boolean => selectedTemplate === value;
  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>):
    void => setSelectedTemplate(parseInt(e.currentTarget.value,10))
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):
    void => setBeforeTitle(e.currentTarget.value)


  // 수정모드인 경우 postId에 값 넣어줌
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

  const mutation = useMutation((addData: FormData) => postApi(addData), {
    onSuccess: () => {
      queryClient.invalidateQueries('postList');
      navigate('/')
    },
    onError: (e) => {
      console.log(e)
    }
  });

  const saveBtnClick = (data: FieldValues) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('image', file);
    });
    const {title, content, postId} = data;
    // template으로 radio에서 값을 가져오면 이상하게 1만 들어옴
    // 버튼 선택 값을 보관하는 selectedTemplate state에서 값을 가져와서 template에 넣어줌
    // 그대로 넣으려 하면 formData가 int라고 안받아서 any type 변수를 하나 선언해서 넣어줌
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
        <Title content="글 작성하기" importance="h2"/>
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
                <Input id="title" register={register('title', {required: true})} onChange={handleInputChange}>제목</Input>
              </StyledTitleBox>
              <TextAreaBox>
                <label htmlFor="content">내용</label>
                <textarea {...register('content', {required: true})}
                          defaultValue={state?.post.content}/>
              </TextAreaBox>
              <AddImgInput setImgFiles={setFiles} maxNum={4}/>
            </StyledInputArea>
            <Button type="submit"
                    disabled={!formState.isValid}
                    size="big" bgColor={themeContext.colors.point_0} color="#fff">
              작성하기
            </Button>
          </form>
        </StyledFormBody>
      </StyledFormContainer>
    </>
  )
}

export default Write
