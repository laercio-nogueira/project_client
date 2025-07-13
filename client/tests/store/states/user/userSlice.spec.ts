import userReducer from "@store/states/user/userSlice";
import initialState from "@store/states/user/initialStates";

describe("userSlice reducer", () => {
  test("deve retornar o estado inicial quando passado um estado undefined", () => {
    const state = userReducer(undefined, { type: "@@INIT" });
    expect(state).toEqual(initialState);
  });

  test("deve retornar o estado atual para uma action desconhecida", () => {
    const previousState = { someKey: "someValue" };
    const state = userReducer(previousState as any, {
      type: "alguma/actionInexistente",
    });
    expect(state).toBe(previousState);
  });
});
