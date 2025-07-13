import styled from "styled-components";
import LogoTerry from "../assets/img/logo_teddy.svg";
import { HiOutlineMenu } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserName } from "@store/states/user/userSlice";

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 40px 24px 40px;
  background: #fff;
  box-sizing: border-box;
  min-height: 80px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
`;

const Menu = styled.button`
  background: none;
  border: none;
  margin-right: 42px;
  font-weight: 900;
  font-size: 24px;
  color: #757575;
  cursor: pointer;
  display: flex;
  align-items: center;
  stroke-width: 0.1;
`;

const Logo = styled.img`
  height: 40px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  font-size: 1.1rem;
`;

const NavLink = styled.a<{ $active?: boolean }>`
  color: ${({ $active }) =>
    $active ? "var(--primary-color)" : "var(--font-color)"};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: var(--primary-color);
  }
`;

const User = styled.div`
  font-size: 1.1rem;
  color: var(--text-color);
  span {
    font-weight: bold;
  }
`;

interface LinkProps {
  title: string;
  link?: string;
  url?: string;
  action?: () => void;
}

interface HeaderProps {
  setOpenMenu: (value: boolean) => void;
  name: string;
}
const HeaderComponent = ({ setOpenMenu, name }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const links: LinkProps[] = [
    {
      title: "Clientes",
      url: "/clients",
      action: () => navigate("/clients"),
    },
    {
      title: "Clientes selecionados",
      url: "/clients-selected",
      action: () => navigate("/clients-selected"),
    },
    {
      title: "Sair",
      action: () => {
        dispatch(setUserName(""));
        navigate("/");
      },
    },
  ];

  return (
    <Header>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Menu onClick={() => setOpenMenu(true)}>
          <HiOutlineMenu />
        </Menu>
        <Logo src={LogoTerry} alt="Logo" />
      </div>
      <Nav>
        {links?.map((link, key: number) => (
          <NavLink
            $active={location.pathname === link?.url}
            onClick={link.action}
            key={key}
          >
            {link?.title}
          </NavLink>
        ))}
      </Nav>
      <User>
        Olá, <span>{name || "Usuário"}</span>!
      </User>
    </Header>
  );
};

export default HeaderComponent;
