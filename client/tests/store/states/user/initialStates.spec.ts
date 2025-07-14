import initialState from "../../../../src/store/states/user/initialStates";

describe("UserSlice initialStates", () => {
  it("should have the correct initial state structure", () => {
    expect(initialState).toBeDefined();
    expect(typeof initialState).toBe("object");
  });

  it("should have the expected properties", () => {
    expect(initialState).toHaveProperty("name");
    expect(initialState.name).toBe("");
  });
});
