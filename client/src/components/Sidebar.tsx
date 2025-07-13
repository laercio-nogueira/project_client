import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { HiOutlineArrowLeft } from "react-icons/hi";
import { FaHome, FaUser } from "react-icons/fa";
import Logo from "./Logo";
import Overlay from "./Overlay";
import { setUserName } from "@store/states/user/userSlice";
import UserCheck from "./Icons/UserCheck";

const SidebarContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: ${({ open }) => (open ? "344px" : "0")};
  color: #fff;
  transition: width 0.3s;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-top-right-radius: 24px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background: var(--white-color);
`;

const MenuButton = styled.button<{ open: boolean }>`
  position: absolute;
  top: 107px;
  transition: left 0.3s;
  left: ${({ open }) => (open ? "323px" : "-50px")};
  background: #232323;
  border: none;
  color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HiOutlineArrowLeftStyled = styled(HiOutlineArrowLeft)`
  background: var(--white-color);
  border-radius: 100%;
  padding: 3px;
  color: var(--text-color);
  font-size: 10px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 40px 0 0 0;
  width: 100%;
`;

const MenuItem = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  color: ${({ $active }) => ($active ? "#F26C21" : "#232323")};
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  svg {
    margin-right: 12px;
    color: ${({ $active }) => ($active ? "#F26C21" : "#232323")};
  }
  &:hover {
    background: #fff;
    color: #f26c21;
    svg {
      color: #f26c21;
    }
  }
`;

interface LinkProps {
  title: string;
  sidebar?: string;
  link?: string;
  url?: string;
  icon?: React.ReactNode;
  action?: () => void;
}

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const links: LinkProps[] = [
    {
      title: "Clientes",
      sidebar: "Home",
      icon: <FaHome />,
      url: "/clients",
      action: () => navigate("/clients"),
    },
    {
      title: "Clientes selecionados",
      icon: <FaUser />,
      url: "/clients-selected",
      action: () => navigate("/clients-selected"),
    },
    {
      title: "Sair",
      icon: <UserCheck />,
      action: () => {
        dispatch(setUserName(""));
        navigate("/");
      },
    },
  ];

  return (
    <>
      <Overlay open={open} click={() => setOpen(false)} />
      <MenuButton open={open} onClick={() => setOpen(false)}>
        <HiOutlineArrowLeftStyled />
      </MenuButton>
      <SidebarContainer open={open}>
        <Logo />
        <Box>
          <MenuList>
            {links?.map((link, key: number) => (
              <MenuItem
                $active={location.pathname === link.url}
                onClick={link.action}
                key={key}
              >
                {link.icon}
                {open && (link.sidebar ?? link.title)}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
