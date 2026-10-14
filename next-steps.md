# Next steps

Status (2026-10-14): the torture test is live on GitHub Pages — https://rufflet.github.io/notebooks/torture-test/.
Not yet on observablehq.com. No tool comparison yet.

## 1. Check the live page
- [ ] Open https://rufflet.github.io/notebooks/torture-test/ (light and dark, phone).
- [ ] Links to md2file / Chrome extension must carry `utm_source=github-pages`.
- [ ] Both download buttons work.

## 2. Run the cases through real tools (optional, before announcing)
Download "all 20 cases" from the notebook, plus run case 05 and 18 as separate files from `torture-test/cases/`.
For each tool record version + date and save the PDFs:
- [ ] md2file.com
- [ ] Markdown to PDF (Chrome extension)
- [ ] pandoc (`pandoc all.md -o all.pdf --pdf-engine=...`, note the engine)
- [ ] optionally: a VS Code extension, one popular online converter

Then fill the comparison section in `torture-test/index.html` (cell 13) — only verified results, mark md2file failures honestly.

## 3. Publish on observablehq.com
Follow `torture-test/PUBLISH.md`, part B. Needs your login; an agent can fill the editor through your browser session.

## 4. Afterwards
- [ ] Link the notebook from the GitHub profile README (Rufflet/Rufflet).
- [ ] Use the same cases as regression tests for md2file.
- [ ] Next notebook: Mermaid visual cookbook (new folder next to `torture-test/`).

## How to work here
```sh
npm install
npm run preview   # http://localhost:5173/torture-test/
npm run build     # .observable/dist; pushing to main redeploys Pages
```
Edit cases in `torture-test/cases/`; `npm run embed` copies them into the notebook (runs automatically in preview/build).
