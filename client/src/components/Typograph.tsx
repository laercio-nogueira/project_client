import styled from "styled-components";

const TypographStyled = styled.p`
  color: var(--text-color);
  font-size: calc(var(--size-text-base) * 9);
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 1.5px;
  text-align: center;
  margin: 0;
`;

const TitleStyled = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
`;

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: string;
}

const Typograph = ({
  children,
  variant,
  ...props
}: TypographyProps): JSX.Element => {
  switch (variant) {
    case "h2":
      return <TitleStyled {...props}>{children}</TitleStyled>;
    default:
      return <TypographStyled {...props}>{children}</TypographStyled>;
  }
};

export default Typograph;
