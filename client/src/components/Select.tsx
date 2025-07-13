import styled from "styled-components";

const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 4;
  padding: 4px 8px;
  background: none;
`;

interface OptionsProps {
  value: string | number;
  label: string | number;
}

interface SelectProps {
  value?: number | string;
  options: OptionsProps[];
  change: (value: string | number) => void;
}
const SelectComponent = ({
  value,
  options,
  change,
}: SelectProps): React.ReactNode => (
  <Select
    value={value}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
      change(e.target.value)
    }
  >
    {options.map((option, key: number) => (
      <option value={option.value} key={key}>
        {option.label}
      </option>
    ))}
  </Select>
);

export default SelectComponent;
