import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ClientSelectedTemplate from "@templates/ClientTemplate/ClientSelectedTemplate";
import { useGetClientsQuery } from "@store/states/clients/clientsApi";
import { Client, ClientsResponse } from "@interfaces/client.interface";

const ClientSelectedPage = () => {
  const { data, refetch } = useGetClientsQuery<{ data: ClientsResponse }>({});
  const { name } = useSelector((state: any) => state.user);
  const { selected } = useSelector((state: any) => state.clients);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(4);
  const [clients, setClients] = useState<Client[]>([]);

  const setClientSelected = () => {
    setClients(
      data?.data?.filter((client: Client) => selected.includes(client.id))
    );
  };

  useEffect(() => {
    refetch();
    setClientSelected();
  }, [selected, data]);

  return (
    <ClientSelectedTemplate
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      setOpenMenu={setOpenMenu}
      openMenu={openMenu}
      clients={clients}
      name={name}
    />
  );
};

export default ClientSelectedPage;
