import Sidebar from "@components/Sidebar";
import styled from "styled-components";
import {
  Container,
  Select,
  Header,
  Grid,
  Card,
  Button,
  Paginate,
  Main,
} from "@components/index";
import { Client, ClientCreate } from "@interfaces/client.interface";
import ClientActionsOrganisms from "@organisms/ClientActionsOrganisms";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import { useEffect, useState } from "react";
import { selectedClient } from "@store/states/clients/clientsSlice";
import { useDispatch } from "react-redux";
import { currencyFormat } from "@utils/currencyFormat";
import { HiOutlineMinus } from "react-icons/hi";

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #222;
`;

interface OptionsProps {
  value: string | number;
  label: string | number;
}

interface ClientTemplateProps {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  setOpenMenu: (value: boolean) => void;
  openMenu: boolean;
  clients: Client[];
  name: string;
  totalPages: number;
  itemByPage: number;
  setItemByPage: (value: number) => void;
  error: {
    updateStatus: string;
    addStatus: string;
  };
  deleteClient: (id: string) => void;
  updateClient: (value: Client) => void;
  addClient: (value: ClientCreate) => void;
  options: OptionsProps[];
  total: number;
  refetch: () => void;
  selected: string[];
}

interface ActionsProps {
  type?: "create" | "edit" | "delete" | null;
  client?: Client | null;
}

const ClientTemplate = ({
  currentPage,
  setCurrentPage,
  setOpenMenu,
  openMenu,
  clients,
  name,
  totalPages,
  itemByPage,
  setItemByPage,
  options,
  deleteClient,
  updateClient,
  addClient,
  error,
  total,
  refetch,
  selected,
}: ClientTemplateProps) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState<ActionsProps>({
    type: null,
    client: null,
  });

  const dispatchAction = ({ type, client }: ActionsProps) => {
    setAction({
      type,
      client,
    });
  };

  const submit = async (value: Client) => {
    if (action?.type === "delete") {
      await deleteClient(value?.id);
      dispatchAction({});
    }

    if (action?.type === "create") {
      const { name, salary, enterprise } = value;
      await addClient({ name, salary, enterprise });
    }

    if (action?.type === "edit") {
      await updateClient(value);
    }

    refetch();
  };

  useEffect(() => {
    if (error.addStatus === "fulfilled" || error.updateStatus === "fulfilled") {
      dispatchAction({});
    }

    if (error.addStatus === "rejected" || error.updateStatus === "rejected") {
      return window.alert(
        "Algum campo esta incorreto ou vazio, corrija e tente novamente"
      );
    }
  }, [error.addStatus, error.updateStatus]);

  useEffect(() => {
    if (!clients.length && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [clients]);

  return (
    <div style={{ background: "#f7f7f7" }}>
      <Sidebar open={openMenu} setOpen={setOpenMenu} />
      <Header setOpenMenu={setOpenMenu} name={name} />
      <Container>
        <Main>
          <TitleRow>
            <Title>{total ?? 0} clientes encontrados:</Title>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#888", fontSize: 14 }}>
                Clientes por página:
              </span>
              <Select
                value={itemByPage}
                change={(value) => setItemByPage(value as number)}
                options={options}
              />
            </div>
          </TitleRow>
          <Grid>
            {clients.map((client) => (
              <Card
                key={client.id}
                title={client.name}
                info={[
                  `Salário: ${currencyFormat(client.salary)}`,
                  `Empresa: ${currencyFormat(client.enterprise)}`,
                ]}
              >
                {selected.includes(client.id) ? (
                  <HiOutlineMinus className="pointer" strokeWidth={3} />
                ) : (
                  <HiOutlinePlus
                    className="pointer"
                    strokeWidth={3}
                    onClick={() => {
                      dispatch(selectedClient(client?.id));
                    }}
                  />
                )}

                <HiOutlinePencil
                  className="pointer"
                  onClick={() => dispatchAction({ type: "edit", client })}
                />
                <HiOutlineTrash
                  className="pointer"
                  style={{ color: "var(--red-color)" }}
                  onClick={() => dispatchAction({ type: "delete", client })}
                />
              </Card>
            ))}
          </Grid>
        </Main>
        <Button
          variant="outlined"
          size="thin"
          click={() => dispatchAction({ type: "create" })}
        >
          Criar Cliente
        </Button>
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
      <ClientActionsOrganisms
        action={action}
        dispatchAction={dispatchAction}
        submit={submit}
      />
    </div>
  );
};

export default ClientTemplate;
