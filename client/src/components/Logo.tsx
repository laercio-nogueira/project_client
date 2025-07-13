import styled from "styled-components";
import LogoTerry from "../assets/img/logo_teddy.svg";

const LogoStyled = styled.img`
  width: 100%;
  padding: 2.4697rem 0px;
  height: 48.98px;
`;

const Logo = () => <LogoStyled src={LogoTerry} alt="Logo" />;

export default Logo;
