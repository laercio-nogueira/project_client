import * as Components from "../../src/components/index";

describe("Component exports", () => {
  test("should export all components correctly", () => {
    expect(Components.Title).toBeDefined();
    expect(Components.Input).toBeDefined();
    expect(Components.Button).toBeDefined();
    expect(Components.Grid).toBeDefined();
    expect(Components.Card).toBeDefined();
    expect(Components.Select).toBeDefined();
    expect(Components.Typograph).toBeDefined();
    expect(Components.Modal).toBeDefined();
    expect(Components.Container).toBeDefined();
    expect(Components.Main).toBeDefined();
    expect(Components.Header).toBeDefined();
    expect(Components.Paginate).toBeDefined();
    expect(Components.Wrapper).toBeDefined();
  });
});
