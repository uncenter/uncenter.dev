---
tags: ['Python']
title: Add extra files to a Python package
date: 2023-03-13
description: How to add extra files to a Python package
# cspell:ignore importlib
---

Say you have a Poetry package and you have a few `.txt` or `.json` or `.csv` files that you want to use somewhere in your package. You can just do this:

```py
import importlib.resources

importlib.resources.open_text(<directory_containg_file>, <file>)
```

In my case, I had a few `.csv` data files I needed to use in a Pandas DataFrame. I was able to do this and it worked perfectly:

```py
pd.read_csv(importlib.resources.open_text("directory_containing_file", "file.csv"))
```
