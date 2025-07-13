import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserName } from "@store/states/user/userSlice";
import LoginTemplate from "@templates/LoginTemplate/LoginTemplate";

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
    <LoginTemplate data={data} setData={setData} handleClick={handleClick} />
  );
};

export default LoginPage;
