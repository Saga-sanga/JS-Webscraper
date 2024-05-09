import { argv } from "node:process";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  if (argv.length < 3) {
    console.log("Error: Expected 1 argument");
    return;
  }

  if (argv.length > 3) {
    console.log("Error: Received more than 1 arguments");
    return;
  }

  argv.forEach((val, index) => console.log(`${index}: ${val}`));

  const link = argv[2];
  console.log("Crawling your website: ", link);
  const pages = await crawlPage(link);
  printReport(pages);
}

main();
