function printReport(pages) {
  console.log("Initiating crawling report...");
  const sortedArray = sortPages(pages);

  for (const [url, count] of sortedArray) {
    console.log(`Found ${count} internal links to ${url}`);
  }
}

function sortPages(pages) {
  return Object.entries(pages).sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  });
}

export { printReport, sortPages };
