<!-- What we test: (a) an image wider than the page must be scaled down to the text width, keeping its aspect ratio; (b) a relative path must resolve against the .md file's folder; (c) a missing image must not break the whole export. -->

# 05 · Large and relative images

Large image (3000 × 600, relative path):

![Wide test image](images/wide.svg)

Missing image (should show alt text or a placeholder, export must still succeed):

![This file does not exist](images/missing.png)

Remote image with a title:

![Remote placeholder](https://dummyimage.com/600x200/cccccc/333333.png&text=remote "Remote image")
