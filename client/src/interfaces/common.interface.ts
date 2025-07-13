import { Client } from "./client.interface";

export interface OptionsProps {
  value: string | number;
  label: string | number;
}

export interface ActionsProps {
  type?: "create" | "edit" | "delete" | null;
  client?: Client | null;
}
