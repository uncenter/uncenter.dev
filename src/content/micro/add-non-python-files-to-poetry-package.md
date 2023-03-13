---
tags: ['Python', 'Poetry']
title: Add non-Python files to a Poetry package
date: 2023-03-13
description: A simple explanation of how to add non-Python files to a Poetry package.
---

Since it took me long enough to find a solution, thought it might be worthwhile to put this out there.

Say you have a Poetry package and you have a few `.txt` or `.json` or `.csv` files that you want to use somewhere in your package. After quite a bit of digging, I found this.

```py
import importlib.resources

importlib.resources.open_text(<directory_containg_file>, <file>)
# "Return a file-like object opened for text reading of the resource."
```

In my case, I had a few `.csv` data files I needed to use in Pandas DataFrames. I was able to do this and it worked perfectly (Pandas' `read_csv` function takes a filepath or a buffer, whatever that means).

```py
pd.read_csv(importlib.resources.open_text("directory_containing_file", "file.csv"))
```

It happens that all my files were in the same directory, so I'm not *entirely* sure how it with a sub-directory or something, but I'm confident it'll work.
