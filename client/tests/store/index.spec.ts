import { store, useAppDispatch } from "../../src/store";
import { useDispatch } from "react-redux";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Redux store", () => {
  test("should initialize with expected reducers", () => {
    const state = store.getState();

    expect(state).toHaveProperty("user");

    expect(Object.keys(state)).toEqual(
      expect.arrayContaining(["clients", "user", "ClientApi", "_persist"])
    );
  });

  test("should dispatch actions", () => {
    const action = { type: "TEST_ACTION" };
    expect(() => store.dispatch(action)).not.toThrow();
  });

  describe("useAppDispatch", () => {
    it("should return the dispatch function from react-redux", () => {
      (useDispatch as any).mockReturnValue(mockDispatch);

      const dispatch = useAppDispatch();

      expect(dispatch).toBe(mockDispatch);
    });
  });
});
