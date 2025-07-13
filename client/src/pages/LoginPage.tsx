import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";

import { Button, Input, Typograph } from "@components/index";
import { setUserName } from "@store/states/user/userSlice";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  width: 521px;
  flex-direction: column;
  align-items: center;
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<string>("");

  const handleClick = () => {
    if (!data) return window.alert("Preencha o campo");

    dispatch(setUserName(data!));
    navigate("/clients");
  };

  return (
    <Wrapper className="h-full w-full">
      <LoginBox className="w-350">
        <Typograph className="mb-3">Olá, seja bem-vindo!</Typograph>
        <Input
          className="mb-2"
          type="text"
          placeholder="Digite o seu nome:"
          value={data}
          required
          onChange={(e: { target: HTMLInputElement }) =>
            setData(e.target.value)
          }
        />
        <Button click={handleClick}>Entrar</Button>
      </LoginBox>
    </Wrapper>
  );
};

export default LoginPage;
