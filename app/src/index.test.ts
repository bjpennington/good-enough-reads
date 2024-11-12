import { describe, test, expect } from "vitest";
import { testFunction } from "./index.js";

describe("test setup test", () => {
  test("returns hello world from the test function", () =>
    expect(testFunction()).toEqual("Hello world!"));
});
