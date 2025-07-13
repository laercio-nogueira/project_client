import Input from "@components/Input";
import { useEffect, useState } from "react";
import { Modal } from "@components/index";
import { Client } from "@interfaces/client.interface";
import { ActionsProps } from "@interfaces/common.interface";

interface PageClientModalProps {
  action: ActionsProps;
  submit: (data: Client) => void;
  dispatchAction: ({ type, client }: ActionsProps) => void;
  error: {
    updateStatus: string;
    addStatus: string;
  };
}

const labelButton = {
  create: "Criar cliente",
  edit: "Editar cliente",
  delete: "Excluir cliente",
};

const ClientActionsOrganisms = ({
  action,
  submit,
  dispatchAction,
  error,
}: PageClientModalProps) => {
  const [data, setData] = useState<Client>({
    id: "",
    name: "",
    salary: 0,
    enterprise: 0,
  });

  const resetData = () => {
    setData({
      id: "",
      name: "",
      salary: 0,
      enterprise: 0,
    });
  };

  const handleSubmit = async () => {
    await submit(data);
  };

  const handleClose = () => {
    resetData();
    dispatchAction({});
  };

  useEffect(() => {
    action.client && setData(action.client);
  }, [action.client]);

  useEffect(() => {
    if (error.addStatus === "fulfilled" || error.updateStatus === "fulfilled") {
      dispatchAction({});
      resetData();
    }

    if (error.addStatus === "rejected" || error.updateStatus === "rejected") {
      return window.alert(
        "Algum campo esta incorreto ou vazio, corrija e tente novamente"
      );
    }
  }, [error.addStatus, error.updateStatus]);

  if (!action?.type) return null;

  switch (action?.type) {
    case "create":
    case "edit":
      return (
        <Modal
          close={handleClose}
          click={handleSubmit}
          title={labelButton[action?.type]}
          label={labelButton[action?.type]}
        >
          <Input
            variant="thin"
            placeholder="Digite o nome:"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="mb-2"
          />
          <Input
            type="number"
            variant="thin"
            placeholder="Digite o salário:"
            value={data.salary > 1 ? data.salary : undefined}
            onChange={(e) => setData({ ...data, salary: +e.target.value })}
            className="mb-2"
          />
          <Input
            type="number"
            variant="thin"
            placeholder="Digite o valor da empresa:"
            value={data.enterprise > 1 ? data.enterprise : undefined}
            onChange={(e) => setData({ ...data, enterprise: +e.target.value })}
          />
        </Modal>
      );
    case "delete":
      return (
        <Modal
          close={handleClose}
          click={handleSubmit}
          title={labelButton[action?.type]}
          label={labelButton[action?.type]}
        >
          Você está preste a excluir o cliente: <b>{data?.name}</b>
        </Modal>
      );
  }
};

export default ClientActionsOrganisms;
