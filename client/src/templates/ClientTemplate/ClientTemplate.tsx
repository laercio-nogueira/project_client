import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Client, ClientCreate } from "@interfaces/client.interface";
import { selectedClient } from "@store/states/clients/clientsSlice";

import Sidebar from "@components/Sidebar";
import { Container, Header, Button, Paginate, Main } from "@components/index";
import ClientActionsOrganisms from "@organisms/ClientOrganisms/ClientActionsOrganisms";
import ClientCardOrganisms from "@organisms/ClientOrganisms/ClientCardOrganisms";
import { ActionsProps, OptionsProps } from "@interfaces/common.interface";
import ClientLegendOrganisms from "@organisms/ClientOrganisms/ClientLegendOrganisms";

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
          <ClientLegendOrganisms
            total={total}
            itemByPage={itemByPage}
            options={options}
            setItemByPage={setItemByPage}
          />
          <ClientCardOrganisms
            clients={clients}
            dispatch={dispatch}
            selectedClient={selectedClient}
            selected={selected}
            dispatchAction={dispatchAction}
          />
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
        error={error}
      />
    </div>
  );
};

export default ClientTemplate;
