import styled from "styled-components";

interface variantTypeProps {
  padding: string;
  lineHeight: string;
  placeHolder: {
    fontSize: string;
  };
}

const variantType: Record<"normal" | "thin", variantTypeProps> = {
  normal: {
    padding: "6px 12px 0px",
    lineHeight: "50px",
    placeHolder: {
      fontSize: "calc(var(--size-text-base) * 6)",
    },
  },
  thin: {
    padding: "0px 12px",
    lineHeight: "35px",
    placeHolder: {
      fontSize: "calc(var(--size-text-base) * 4)",
    },
  },
};

const InputStyled = styled.input<{ $variant: "normal" | "thin" }>`
  width: calc(100% - 30px);
  padding: ${({ $variant }) => variantType[$variant].padding};
  border: 2px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  font-family: Inter;
  color: #222;
  background: #fff;
  line-height: ${({ $variant }) => variantType[$variant].lineHeight};
  &::placeholder {
    color: #bdbdbd;
    font-weight: 400;
    font-size: ${({ $variant }) => variantType[$variant].placeHolder?.fontSize};
  }
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "normal" | "thin";
}

const Input = ({ variant = "normal", ...props }: InputProps): JSX.Element => {
  return <InputStyled $variant={variant} {...props} />;
};

export default Input;
