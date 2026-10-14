<!-- What we test: footnote references become superscript links and footnote text is collected at the end (or bottom of page) with working back-links. -->

# 13 · Footnotes

Markdown footnotes are an extension[^ext], supported by GitHub, pandoc and many others[^many].

A footnote can be referenced twice[^ext] and can contain **formatting** and code[^code].

[^ext]: Not part of CommonMark.
[^many]: But each tool renders them a little differently.
[^code]: For example `markdown-it-footnote`:
    ```js
    md.use(footnote)
    ```
