import { useState } from "react";
import { useSelector } from "react-redux";

import ClientTemplate from "@templates/ClientTemplate/ClientTemplate";
import { ClientsResponse } from "@interfaces/client.interface";
import { ErrorI } from "@interfaces/error.interface";

import {
  useAddClientMutation,
  useGetClientsQuery,
  useDeleteClientMutation,
  useUpdateClientMutation,
} from "@store/states/clients/clientsApi";

const ClientPage = () => {
  const { name } = useSelector((state: any) => state.user);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [itemByPage, setItemByPage] = useState<number>(8);
  const { selected } = useSelector((state: any) => state.clients);

  const [updateClient, updateStatus] = useUpdateClientMutation<ErrorI>();
  const [addClient, addStatus] = useAddClientMutation<ErrorI>();
  const [deleteClient] = useDeleteClientMutation();
  const { data, refetch } = useGetClientsQuery<{
    data: ClientsResponse;
    refresh: () => void;
  }>(
    {
      page,
      limit: itemByPage,
    },
    { pollingInterval: 3000 }
  );

  const limitPagination = () => {
    if (!data) return 0;

    return Math.ceil(data.total / data?.limit);
  };

  const options = [
    { value: 8, label: 8 },
    { value: 16, label: 16 },
    { value: 32, label: 32 },
  ];

  return (
    <ClientTemplate
      currentPage={page}
      setCurrentPage={setPage}
      setOpenMenu={setOpenMenu}
      openMenu={openMenu}
      clients={data?.data || []}
      total={data?.total}
      name={name}
      itemByPage={itemByPage}
      setItemByPage={setItemByPage}
      totalPages={limitPagination()}
      options={options}
      deleteClient={deleteClient}
      updateClient={updateClient}
      addClient={addClient}
      refetch={refetch}
      selected={selected}
      error={{
        updateStatus: updateStatus.status,
        addStatus: addStatus.status,
      }}
    />
  );
};

export default ClientPage;
