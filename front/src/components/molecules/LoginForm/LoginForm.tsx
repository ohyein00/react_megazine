import React, {useState} from "react";
import Input from "@atoms/Input";
import styled from "styled-components";
import Button from "@atoms/Buttons";
import {FieldValues, useForm} from 'react-hook-form';
import {useMutation} from "react-query";
import {useSetRecoilState} from 'recoil'
import {useNavigate} from 'react-router-dom';
import userToken from "@recoil/userAtoms"
import userApi from "@service/useUserApi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const StyledForm = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  & > label {
    margin: 5px 5px;
    flex-direct: column;
  }

  & > label > input {
    margin-top: 5px;
    width: 100%;
    border-width: 1px;
    border-color: #CCCCCC;
    background-color: #FFFFFF;
    color: #000000;
    border-style: solid;
    border-radius: 2px;
    box-shadow: 1px 1px 5px rgba(66, 66, 66, .75);
  }

  & > label > input:focus {
    outline: none;
  }
`

export type RegistrationFormFields = {
  email: string;
  password: string;
};

function LoginForm() {
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm<RegistrationFormFields>();
  const ReactSwal = withReactContent(Swal)

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const setUserToken = useSetRecoilState(userToken)
  const mutation = useMutation((addData: FieldValues) => userApi.callLoginUser(addData), {
    onSuccess: async (res: FieldValues) => {
      if (!res.data.userToken) {
        ReactSwal.fire({
          title: <p>로그인 실패!</p>,
          html: <p>토큰 정보가 없습니다.</p>,
          icon: 'error',
          timer: 3000
        });
      } else {
        await setUserToken(res.data.userToken);
        navigate('/');
      }
    },
    onError: async (res: FieldValues) => {
      ReactSwal.fire({
        title: <p>로그인 실패!</p>,
        html: <p>{res.response.data.message}</p>,
        icon: 'error',
        timer: 3000
      });
    }
  });
  const onSubmit = (data: FieldValues) => {
    mutation.mutate(data);
  };


  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Input id="email" type="email"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
             register={register('email', {required: true})}>아이디</Input>
      <Input id="password" type="password"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
             register={register('password', {required: true})}>패스워드</Input>

      {email && password ? (
        <Button type="submit" size="big">로그인</Button>
      ) : (
        <Button type="submit" size="big">로그인</Button>
      )}
    </StyledForm>
  )
}

export default LoginForm
