import Sidebar from "@components/Sidebar";
import styled from "styled-components";
import { Container, Header, Grid, Card, Button, Main } from "@components/index";
import { Client } from "@interfaces/client.interface";
import { HiOutlineMinus } from "react-icons/hi";
import {
  deselectedClient,
  deselectedAllClient,
} from "@store/states/clients/clientsSlice";
import { useDispatch } from "react-redux";

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: var(--text-color);
`;

const ContentIcons = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  color: var(--primary-color);
`;

interface ClientTemplateProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  setOpenMenu: (value: boolean) => void;
  openMenu: boolean;
  clients: Client[];
  name: string;
}

const ClientTemplate = ({
  setOpenMenu,
  openMenu,
  clients,
  name,
}: ClientTemplateProps) => {
  const dispatch = useDispatch();
  return (
    <div style={{ background: "#f7f7f7" }}>
      <Sidebar open={openMenu} setOpen={setOpenMenu} />
      <Header setOpenMenu={setOpenMenu} name={name} />
      <Container>
        <Main>
          <Title>Clientes Selecionados:</Title>
          <Grid>
            {clients?.map((client) => (
              <Card
                key={client.id}
                title={client.name}
                info={[
                  `Salário: ${client.salary}`,
                  `Empresa: ${client.enterprise}`,
                ]}
              >
                <ContentIcons>
                  <HiOutlineMinus
                    className="pointer"
                    strokeWidth={3}
                    onClick={() => {
                      dispatch(deselectedClient(client.id));
                    }}
                  />
                </ContentIcons>
              </Card>
            ))}
          </Grid>
        </Main>
        <Button
          variant="outlined"
          size="thin"
          click={() => dispatch(deselectedAllClient())}
        >
          Limpar clientes selecionados
        </Button>
      </Container>
    </div>
  );
};

export default ClientTemplate;
