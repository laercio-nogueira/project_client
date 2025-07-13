import styled from "styled-components";

const OverlayStyled = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.3s;
  z-index: 999;
`;

interface OverlayProps {
  open: boolean;
  click: () => void;
}

const Overlay = ({ open, click }: OverlayProps) => (
  <OverlayStyled open={open} onClick={click} />
);

export default Overlay;
