export interface Client {
  id: string;
  name: string;
  salary: number;
  enterprise: number;
}

export interface ClientCreate {
  name: string;
  salary: number;
  enterprise: number;
}

export interface ClientUpdate extends ClientCreate {
  id?: string;
}

export interface ClientsResponse {
  data: Client[];
  total: number;
  page: number;
  limit: number;
}

export interface ClientState {
  clients: Client[];
  selected: string[];
}
