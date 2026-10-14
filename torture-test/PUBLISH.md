# Publishing the torture test

Source of truth: `torture-test/index.html` (Notebooks 2.0 format) + `torture-test/cases/*.md`.
Case sources are embedded into the notebook by `npm run embed` (runs automatically in `preview` and `build`),
so `index.html` is self-contained.

UTM: the notebook sets `utm_source` at runtime: `github-pages` on `*.github.io`, `observable` everywhere else.
`utm_medium=notebook`, `utm_campaign=torture-test`.

## A. GitHub Pages (agent can do all of it after the owner's OK)

1. Create the public repo: `gh repo create Rufflet/notebooks --public --source . --push`.
2. Add `.github/workflows/pages.yml`: `npm ci` → `npm run build` (the default base `./` works on Pages) →
   upload `.observable/dist` with `actions/upload-pages-artifact`, deploy with `actions/deploy-pages`.
3. Enable Pages: Settings → Pages → Source: GitHub Actions (or `gh api -X POST repos/Rufflet/notebooks/pages -f build_type=workflow`).
4. Check `https://rufflet.github.io/notebooks/torture-test/`: cases switch, both downloads work, links carry `utm_source=github-pages`.
5. Add a link to the notebook in the repo README and (optionally) in the GitHub profile.

## B. observablehq.com (needs the owner's account)

There is no public write API, so the notebook is created in the web editor.

**What the owner does (≈5 min):**
1. Sign in at observablehq.com, open the @rufflet workspace, New notebook (the new Notebooks 2.0 editor).
2. For each `<script>` cell in `index.html`, in order, add a cell of the same type and paste its body
   (without the 4-space indent): Markdown cells → Markdown, `type="module"` → JavaScript,
   `type="text/html"` → HTML. Mark the same cells hidden/pinned as in the file.
   Cell 2 (generated case sources) is one long line — paste it as is.
3. If the editor offers importing an HTML/notebook file, use that instead of step 2 (check every time — it may appear).
4. Title: “Markdown → PDF torture test: 20 cases that break converters”. Add a thumbnail (e.g. the Mermaid or alerts case).
5. Preview, check the case switcher and the downloads, then Publish (public). Add to a collection if one exists.

**What an agent can do with the owner's browser session** (Claude in Chrome / built-in browser):
steps 1–5 except signing in and the final “Publish” confirmation, which stay with the owner.

## After publishing
- Add a row to the publication log (promo notes) with date and URL.
- Cross-link: the Observable notebook ↔ GitHub Pages version ↔ md2file blog post.
- Answer comments within the first day.
