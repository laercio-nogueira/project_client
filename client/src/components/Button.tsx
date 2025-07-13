import styled from "styled-components";

interface sizeTypeProps {
  padding: string;
  fontSize: string;
}

const sizeType: Record<"normal" | "thin", sizeTypeProps> = {
  normal: {
    padding: "1rem 0",
    fontSize: "calc(var(--size-text-base) * 6)",
  },
  thin: {
    padding: "8px 0",
    fontSize: "0.875rem",
  },
};

const StyledButton = styled.button<{
  $variant: string | undefined;
  $size: "normal" | "thin";
}>`
  width: 100%;
  padding: ${({ $size }) => sizeType[$size].padding};
  background: ${({ $variant }) =>
    $variant === "outlined" ? "none" : "var(--primary-color)"};
  color: ${({ $variant }) =>
    $variant === "outlined" ? "var(--primary-color);" : "var(--white-color)"};
  border: ${({ $variant }) =>
    $variant === "outlined"
      ? `var(--size-text-base) solid var(--primary-color)`
      : "none"};
  border-radius: 0.25rem;
  font-size: ${({ $size }) => sizeType[$size].fontSize};
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
`;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string;
  size?: "normal" | "thin";
  click: () => void;
}

const Button = ({
  children,
  variant,
  click,
  size = "normal",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <StyledButton {...props} $variant={variant} $size={size} onClick={click}>
      {children}
    </StyledButton>
  );
};

export default Button;
