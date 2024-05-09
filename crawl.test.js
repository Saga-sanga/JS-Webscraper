import { test, expect } from "@jest/globals";
import { getURLsFromHTML, normailzeURL } from "./crawl.js";

// Normailizing URLs
test("Checking https://blog.boot.dev/path/", () => {
  expect(normailzeURL("https://blog.boot.dev/path/")).toEqual(
    "blog.boot.dev/path"
  );
});

test("Checking https://blog.boot.dev/path", () => {
  expect(normailzeURL("https://blog.boot.dev/path")).toEqual(
    "blog.boot.dev/path"
  );
});

test("Checking http://blog.boot.dev/path/", () => {
  expect(normailzeURL("http://blog.boot.dev/path/")).toEqual(
    "blog.boot.dev/path"
  );
});

test("Checking http://blog.boot.dev/path", () => {
  expect(normailzeURL("http://blog.boot.dev/path")).toEqual(
    "blog.boot.dev/path"
  );
});

// Get URLs from HTML
test("Get all relative URLs", () => {
  const html =
    '<html><body><a href="/campaigns"><span>Go to Boot.dev</span></a><a href="/friends"><span>Go to Boot.dev</span></a><a href="/spaces"><span>Go to Boot.dev</span></a></body></html>';
  const baseURL = "https://blog.boot.dev";
  const expectedArray = [
    "https://blog.boot.dev/campaigns",
    "https://blog.boot.dev/friends",
    "https://blog.boot.dev/spaces",
  ];
  expect(getURLsFromHTML(html, baseURL)).toEqual(expectedArray);
});

test("getURLsFromHTML absolute", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = ["https://blog.boot.dev/path/one"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputURL = "https://blog.boot.dev";
  const inputBody =
    '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>';
  const actual = getURLsFromHTML(inputBody, inputURL);
  const expected = [
    "https://blog.boot.dev/path/one",
    "https://other.com/path/one",
  ];
  expect(actual).toEqual(expected);
});
