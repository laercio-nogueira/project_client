import { ErrorI } from "@interfaces/error.interface";

describe("ErrorI interface structure", () => {
  test("should match structure with message array", () => {
    const errorObject: ErrorI = {
      isLoading: false,
      isError: true,
      error: {
        data: {
          message: ["Campo obrigatório", "Formato inválido"],
        },
      },
    };

    expect(errorObject.isLoading).toBe(false);
    expect(errorObject.isError).toBe(true);
    expect(Array.isArray(errorObject.error.data.message)).toBe(true);
    expect(errorObject.error.data.message).toContain("Campo obrigatório");
  });

  test("should handle empty message array", () => {
    const errorObject: ErrorI = {
      isLoading: true,
      isError: false,
      error: {
        data: {
          message: [],
        },
      },
    };

    expect(errorObject.isLoading).toBe(true);
    expect(errorObject.error.data.message).toEqual([]);
  });
});
