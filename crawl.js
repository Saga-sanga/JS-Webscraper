import { JSDOM } from "jsdom";

function normailzeURL(url) {
  const urlObj = new URL(url);
  let baseURL = `${urlObj.host}${urlObj.pathname}`;

  if (baseURL.slice(-1) === "/") {
    // Remove last char
    baseURL = baseURL.slice(0, -1);
  }

  return baseURL;
}

function getURLsFromHTML(html, baseURL) {
  const dom = new JSDOM(html);
  const links = dom.window.document.querySelectorAll("a[href]");
  const arrayLinks = Array.from(links).map((node) => node.getAttribute("href"));

  const absoluteURLs = arrayLinks.map((link) => {
    let href;
    try {
      href = new URL(link, baseURL).href;
    } catch (err) {
      console.log(`${err.message}: ${href}`);
    }
    return href;
  });

  return absoluteURLs;
}

async function parseHtml(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
    });
    const contentType = res.headers.get("content-type");

    if (res.status >= 400) {
      console.log("Server error, cannot fetch from url");
      return;
    }

    if (!contentType || !contentType.includes("text/html")) {
      console.log("Content Type is not text/html");
      return;
    }

    return res.text();
  } catch (error) {
    throw new Error(`Network Error: ${error.message}`);
  }
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // compare baseURL to currentURL to check if we're still within the same domain
  const currentDomain = new URL(currentURL).hostname;
  const baseDomain = new URL(baseURL).hostname;

  if (currentDomain !== baseDomain) {
    return pages;
  }

  const normalizedURL = normailzeURL(currentURL);

  // check if normalized url is in pages
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`Crawling ${currentURL}`);

  // Get urls from html
  const htmlBody = await parseHtml(currentURL);
  const parsedURLs = getURLsFromHTML(htmlBody, baseURL);

  // using concurrency to speed things up
  const promises = parsedURLs.map((pageURL) =>
    crawlPage(baseURL, pageURL, pages)
  );
  const results = await Promise.all(promises);

  const mergedPages = results.reduce(
    (acc, result) => ({ ...acc, ...result }),
    {}
  );
  return mergedPages;

  // for (const nextURL of parsedURLs) {
  //   pages = await crawlPage(baseURL, nextURL, pages);
  // }
  // return pages;
}

export { normailzeURL, getURLsFromHTML, crawlPage };
