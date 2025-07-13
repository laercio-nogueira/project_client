import {
  User,
  UserState,
  UserCreate,
  UserUpdate,
} from "@interfaces/user.interface";
import { User } from "@interfaces/user.interface";

describe("User interfaces structure", () => {
  test("User should have correct structure", () => {
    const user: User = {
      id: "user-001",
      name: "João da Silva",
      document: "12345678900",
      documentType: "CPF",
      createdAt: new Date("2024-05-10"),
    };

    expect(user.name).toBe("João da Silva");
    expect(user.createdAt instanceof Date).toBe(true);
  });

  test("UserState should hold a list of users", () => {
    const state: UserState = {
      users: [
        {
          id: "user-002",
          name: "Maria Oliveira",
          document: "98765432100",
          documentType: "CPF",
          createdAt: new Date("2024-01-01"),
        },
      ],
    };

    expect(state.users.length).toBe(1);
    expect(state.users[0].documentType).toBe("CPF");
  });

  test("UserCreate should have required fields", () => {
    const create: UserCreate = {
      name: "Pedro Alves",
      document: "11223344556",
      documentType: "CPF",
    };

    expect(create.name).toBe("Pedro Alves");
    expect(create.documentType).toBe("CPF");
  });

  test("UserUpdate may include id", () => {
    const update: UserUpdate = {
      id: "user-003",
      name: "Carlos Lima",
      document: "99887766554",
      documentType: "CNPJ",
    };

    expect(update.id).toBe("user-003");
    expect(update.documentType).toBe("CNPJ");
  });
});
