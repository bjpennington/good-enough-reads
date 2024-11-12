import { testFunction } from "./index.js";

describe("test setup test", () => {
  it("returns hello world from the test function", () =>
    expect(testFunction()).toEqual("Hello world!"));
});
