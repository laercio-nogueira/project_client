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

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const Typograph = ({ children, ...props }: TypographyProps): JSX.Element => {
  return <TypographStyled {...props}>{children}</TypographStyled>;
};

export default Typograph;
