import {
  ClientState,
  Client,
  ClientCreate,
  ClientUpdate,
} from "../../src/interfaces/client.interface";

describe("User interfaces structure", () => {
  test("User should have correct structure", () => {
    const user: Client = {
      id: "user-001",
      name: "João da Silva",
      salary: 0,
      enterprise: 0,
    };

    expect(user.name).toBe("João da Silva");
  });

  test("UserState should hold a list of users", () => {
    const state: ClientState = {
      clients: [
        {
          id: "123",
          name: "Jose",
          salary: 1200,
          enterprise: 12000,
        },
      ],
      selected: [],
    };

    expect(state.clients.length).toBe(1);
    expect(state.clients[0].salary).toBe(1200);
  });

  test("UserCreate should have required fields", () => {
    const create: ClientCreate = {
      name: "Pedro Alves",
      salary: 1200,
      enterprise: 12000,
    };

    expect(create.name).toBe("Pedro Alves");
    expect(create.salary).toBe(1200);
  });

  test("UserUpdate may include id", () => {
    const update: ClientUpdate = {
      id: "user-003",
      name: "Carlos Lima",
      salary: 1200,
      enterprise: 12000,
    };

    expect(update.id).toBe("user-003");
    expect(update.salary).toBe(1200);
  });
});
