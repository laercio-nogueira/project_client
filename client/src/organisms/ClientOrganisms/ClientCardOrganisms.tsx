import { Card, Grid } from "@components/index";
import { Client } from "@interfaces/client.interface";
import { ActionsProps } from "@interfaces/common.interface";
import { UnknownAction } from "@reduxjs/toolkit";
import { currencyFormat } from "@utils/currencyFormat";
import { Dispatch } from "react";
import {
  HiOutlineCheck,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";

interface ClientCardOrganismsProps {
  clients: Client[];
  dispatch: Dispatch<any>;
  selectedClient: (id: string) => void;
  selected: string[];
  dispatchAction: ({ type, client }: ActionsProps) => void;
}

const ClientCardOrganisms = ({
  clients,
  selected,
  dispatch,
  selectedClient,
  dispatchAction,
}: ClientCardOrganismsProps) => (
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
          <HiOutlineCheck className="pointer" strokeWidth={3} />
        ) : (
          <HiOutlinePlus
            className="pointer"
            strokeWidth={3}
            onClick={() => dispatch(selectedClient(client?.id))}
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
);

export default ClientCardOrganisms;
