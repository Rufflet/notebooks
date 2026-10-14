# Running the cases through a converter

How to test a Markdown → PDF tool against the 20 cases so that the result is reproducible and can go into the comparison in the notebook. The rule: **only verified results** — the same input files, a recorded tool version, a date, and the PDFs kept as evidence. Where md2file fails, it is marked as failed like any other tool.

## 1. Prepare the input

Use the files from the repository, not copies edited by hand:

```sh
git clone https://github.com/Rufflet/notebooks && cd notebooks/torture-test/cases
git rev-parse --short HEAD   # record this: it pins the exact case versions
```

Two ways to run:

| Input | When | Notes |
|---|---|---|
| `01-…md` … `20-…md` separately | main run, gives a per-case PDF | Run from inside `cases/` so `images/wide.svg` resolves (case 05). |
| `markdown-pdf-torture-test.md` (“Download all 20 cases” in the notebook) | quick smoke test of one tool | Front matter (case 18) is not at the top there, and `images/` must sit next to the file for case 05 — judge those two from the separate files only. |
| `torture-test-long-document.md` (“Download the 150-page document”) | case 20 only | Measure the time from “export” to a finished file. |

Defaults for every tool, unless the tool cannot do it (then write it down):
- Page size **A4**, portrait, default margins of the tool.
- Default theme/stylesheet; no custom CSS. A tool is judged as a user gets it out of the box.
- If a feature needs a setting to be switched on (Mermaid, math, front matter), switch it on once and record it under “settings”. A feature that cannot be switched on at all counts as broken.

## 2. Record the environment

One block per tool run, kept in `results/<tool>/<YYYY-MM-DD>/run.md`:

```md
Tool: md2file.com            # name as the user sees it
Version: web, build from the footer / About, or `pandoc --version` first line
Date: 2026-10-14
OS / browser: Windows 11, Chrome 141 (for web tools and extensions)
Cases commit: abc1234
Settings: A4, Mermaid on, math on   # everything not default
Input: separate files | combined file
```

PDFs go next to it: `results/<tool>/<date>/01-wide-table.pdf`, … Keep them in the repository (small) so anyone can check a verdict.

## 3. Tools and how to run them

### md2file.com
1. Open https://md2file.com/, paste the case (or open the file), wait until preview finishes (Mermaid, math).
2. Export → PDF, A4. Save as `NN-name.pdf`.
3. Case 05: relative image — upload/attach `images/wide.svg` if the editor supports it; if the only way is a URL, record “relative paths not supported” as the result.
4. Version: whatever the app shows (footer / about / changelog date). If nothing — date + “web”.

### Markdown to PDF (Chrome extension)
1. Chrome → open the `.md` file locally (`file://…/cases/01-wide-table.md`). Allow file URLs for the extension: `chrome://extensions` → extension → *Allow access to file URLs*.
2. Export/print to PDF through the extension, A4.
3. Version: `chrome://extensions` → version number. Record the Chrome version too.

### pandoc
PDF output depends on the engine; record it. Recommended run with the default LaTeX engine and, separately, an HTML-based one:

```sh
pandoc --version | head -1
# LaTeX (needs a TeX distribution with xelatex for CJK)
pandoc 07-cjk.md -o 07-cjk.pdf --pdf-engine=xelatex -V papersize=a4
# HTML-based (needs weasyprint or wkhtmltopdf)
pandoc 07-cjk.md -o 07-cjk.pdf --pdf-engine=weasyprint
```

Loop over all cases:

```sh
for f in [0-2][0-9]-*.md; do pandoc "$f" -f gfm -o "../results/pandoc/$(date +%F)/${f%.md}.pdf" --pdf-engine=xelatex -V papersize=a4 2> "../results/pandoc/$(date +%F)/${f%.md}.log"; done
```

Use `-f gfm` for task lists, alerts-as-blockquotes and GitHub-style ids; also try plain `-f markdown` if a case fails only because of the input format, and note which one the verdict is for. Mermaid and math need filters (`--mathjax` does nothing for PDF; LaTeX math works natively, Mermaid needs `mermaid-filter`) — without a filter Mermaid counts as broken, with a filter record it in settings.

### Optional extra tools
VS Code “Markdown PDF” extension, a popular online converter. Same procedure: version, date, defaults, PDFs. Do not add a tool without saved PDFs.

## 4. What to check in each PDF

Open the PDF in a regular viewer (Chrome’s PDF viewer or Acrobat), at 100%. Judge against “How it should look in the PDF” in the notebook; short version:

| # | Case | OK when | Typical “partial” |
|--:|---|---|---|
| 01 | Wide table | all 14 columns inside the margins, cells wrap | fits, but font < ~6 pt |
| 02 | Long table | header repeats on every page, no row split | no repeat, rows intact |
| 03 | Long code lines | nothing cut off at the right edge | wraps text but not inline code |
| 04 | Heading at page bottom | heading starts the page with its paragraph | depends on page size — note it |
| 05 | Images | wide image scaled with all labels, missing image = alt text, export succeeds | remote image missing |
| 06 | Nested lists | 5 levels indented, “7.” list starts at 7, checkboxes | checkboxes as `[ ]` text |
| 07 | CJK | all four scripts real glyphs, long line wraps | one script tofu |
| 08 | RTL | right-aligned, Arabic joined, numbers in place | alignment wrong but shaping ok |
| 09 | Emoji | color emoji, ZWJ/flags single glyphs, rare scripts visible | monochrome emoji |
| 10 | Long URLs/words | everything inside the column | URL ok, word overflows |
| 11 | Math | typeset, aligned on `=`, `$5…$50` stays text | currency line turned into math |
| 12 | Mermaid | three vector diagrams within page width | raster / clipped |
| 13 | Footnotes | superscripts link to notes, back-links | rendered, links dead |
| 14 | GitHub alerts | five styled callouts | plain blockquotes with titles |
| 15 | `<details>` | both blocks expanded | only the `open` one expanded |
| 16 | Inline HTML | kbd styled, sub/sup, alignment, colspan | tags stripped but text kept |
| 17 | Highlighting | colors in the PDF, diff red/green, unknown lang = plain | colors lost, code ok |
| 18 | Front matter | nothing of the YAML printed, `---` rule kept | YAML hidden but rule lost |
| 19 | Anchors/TOC | every TOC link jumps correctly, incl. Ünïcödé and `#repeated-1` | ASCII links work only |
| 20 | Long document | 150-page file finishes; last section 60 present; note time | finishes > 2 min |

Verdicts: **✅ ok**, **⚠️ partial** (with a few words why), **❌ broken**, **— not supported** (feature cannot be enabled). Case 20: write the time, e.g. `✅ 38 s`.

Clicking links (13, 19) must be checked in the PDF itself, not in the preview.

## 5. Write the results

`results/<tool>/<date>/results.md` — the checklist from the notebook, filled in:

```md
| # | Case | Result | Notes |
|--:|---|---|---|
| 1 | Wide table (14 columns) | ⚠️ | fits, but font ~5 pt |
```

When at least md2file, the Chrome extension and pandoc are done, update the notebook:

1. In `torture-test/index.html`, replace the text of cell `id="13"` (“What about comparing tools?”) with a table: rows = cases, columns = tools, header lines with version and date per tool, and a link to `results/` for the PDFs.
2. Add a sentence about method: defaults, A4, cases commit.
3. Keep md2file failures visible; no “winner” wording.
4. `npm run preview` → check the table on desktop and 390 px → commit → push (Pages redeploys).
5. If the notebook is already on observablehq.com, update the same cell there.

Results go stale: when re-running later, add a new dated folder rather than overwriting the old one, and update the dates in the notebook.

## 6. Bonus: md2file regression tests

The same 20 files can become regression tests for md2file: export each case, keep the PDF as a baseline, and compare text (`pdftotext`) and page count on every release. Track only the cases that pass today, and add a case once it is fixed.
