---
tags: ['Python']
title: Add extra files to a Python package
date: 2023-03-13
description: How to add extra files to a Python package
excerpt: Say you have a Poetry package and you have a few `.txt` or `.json` or `.csv` files that you want to use somewhere in your package - here's how to do it!
micro: true
# cspell:ignore importlib
---

Say you have a Poetry package and you have a few `.txt` or `.json` or `.csv` files that you want to use somewhere in your package. You can open them just fine locally with `open()`, but when you try to import your package, you'll get an error about a missing file. Non-python files aren't included in the package by default.
Luckily, you can use the `importlib.resources` module to open these files. For example:

```py
import importlib.resources

importlib.resources.open_text(<directory_containg_file>, <file>)
```

In my case, I had a few `.csv` data files I needed to use in a Pandas DataFrame for my package. Pandas' `read_csv` function had no issues with `importlib.resources.open_text()`:

```py
pd.read_csv(importlib.resources.open_text("directory_containing_file", "file.csv"))
```
