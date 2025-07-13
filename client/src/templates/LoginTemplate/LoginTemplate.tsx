import { Button, Input, Typograph, Wrapper } from "@components/index";

interface LoginTemplateProps {
  data: string;
  setData: (data: string) => void;
  handleClick: () => void;
}

const LoginTemplate = ({ data, setData, handleClick }: LoginTemplateProps) => {
  return (
    <Wrapper className="h-full w-full">
      <div style={{ width: "521px" }}>
        <Typograph className="mb-3">Olá, seja bem-vindo!</Typograph>
        <Input
          className="mb-2"
          type="text"
          placeholder="Digite o seu nome:"
          value={data}
          required
          onChange={(e) => setData(e.target.value)}
        />
        <Button click={handleClick}>Entrar</Button>
      </div>
    </Wrapper>
  );
};

export default LoginTemplate;
