import styled from "styled-components";
import Overlay from "@components/Overlay";
import Button from "@components/Button";
import React from "react";

const ModalContent = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 4px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
  z-index: 1001;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 22px;
  right: 22px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  color: #181c2a;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 8px;
`;

interface ModalProps {
  close: () => void;
  click: () => void;
  title: string;
  label: string;
  children: React.ReactNode;
}

const Modal = ({ close, click, title, label, children }: ModalProps) => {
  return (
    <>
      <Overlay open={true} click={close || (() => {})} />
      <ModalContent>
        <CloseButton onClick={close || (() => {})}>×</CloseButton>
        <Title>{title}</Title>
        <div className="mb-2">{children}</div>
        <Button click={click} size="thin">
          {label}
        </Button>
      </ModalContent>
    </>
  );
};

export default Modal;
