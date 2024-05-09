import { test, expect } from "@jest/globals";
import { sortPages } from "./report";

test("SortPages", () => {
  const input = {
    a: 23,
    b: 2,
    c: 90,
    d: 7,
    e: 68,
  };
  const expected = [
    ["c", 90],
    ["e", 68],
    ["a", 23],
    ["d", 7],
    ["b", 2],
  ];

  const actual = sortPages(input);
  expect(actual).toEqual(expected);
});

test("SortPages null", () => {
  const input = {};
  const expected = [];
  const actual = sortPages(input);
  expect(actual).toEqual(expected);
});
