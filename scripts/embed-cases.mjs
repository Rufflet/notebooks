// Embeds torture-test/cases/*.md (and images) into torture-test/index.html,
// so the notebook is a single self-contained file that can be pasted into observablehq.com.
import {readFileSync, readdirSync, writeFileSync} from "node:fs";
import {join} from "node:path";

const dir = new URL("../torture-test/", import.meta.url).pathname;
const casesDir = join(dir, "cases");
const files = readdirSync(casesDir).filter((f) => f.endsWith(".md")).sort();
const cases = Object.fromEntries(files.map((f) => [f, readFileSync(join(casesDir, f), "utf8")]));
const images = Object.fromEntries(
  readdirSync(join(casesDir, "images")).map((f) => [`images/${f}`, readFileSync(join(casesDir, "images", f), "utf8")])
);

// JSON with "<" escaped is valid JS and can never close the <script> cell.
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");
const body = [
  "    // BEGIN GENERATED (npm run embed)",
  `    const caseSources = ${json(cases)};`,
  `    const caseImages = ${json(images)};`,
  "    // END GENERATED"
].join("\n");

const file = join(dir, "index.html");
const html = readFileSync(file, "utf8");
const re = /    \/\/ BEGIN GENERATED[\s\S]*?\/\/ END GENERATED/;
if (!re.test(html)) throw new Error("markers not found in index.html");
writeFileSync(file, html.replace(re, () => body));
console.log(`embedded ${files.length} cases, ${Object.keys(images).length} images`);
