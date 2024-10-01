import { characters } from "../../src/js-foundation/02-destructuring";

describe("js-foundation/02-destructuring", () => {
  test("characters should contain Flash, Superman", () => {
    expect(characters).toContain("Flash");
    expect(characters).toContain("Superman");
  });

  test("first character should be Flash", () => {
    const [first] = characters;
    expect(first).toBe("Flash");
  });
});
