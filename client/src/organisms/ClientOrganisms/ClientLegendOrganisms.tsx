import { Select, Typograph } from "@components/index";
import { OptionsProps } from "@interfaces/common.interface";
import styled from "styled-components";

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

interface ClientLegendOrganismsProps {
  total: number;
  itemByPage: number;
  options: OptionsProps[];
  setItemByPage: (value: number) => void;
}

const ClientLegendOrganisms = ({
  total,
  itemByPage,
  options,
  setItemByPage,
}: ClientLegendOrganismsProps) => {
  return (
    <TitleRow>
      <Typograph variant="h2">{total ?? 0} clientes encontrados:</Typograph>
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
  );
};

export default ClientLegendOrganisms;
