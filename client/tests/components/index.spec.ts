import * as Components from "@components/index";

describe("Component exports", () => {
  test("should export all components correctly", () => {
    expect(Components.Container).toBeDefined();
    expect(Components.Title).toBeDefined();
    expect(Components.Label).toBeDefined();
    expect(Components.Input).toBeDefined();
    expect(Components.Button).toBeDefined();
    expect(Components.Navbar).toBeDefined();
    expect(Components.Select).toBeDefined();
    expect(Components.Table).toBeDefined();
    expect(Components.RadioButton).toBeDefined();
    expect(Components.RadioGroup).toBeDefined();
  });
});
