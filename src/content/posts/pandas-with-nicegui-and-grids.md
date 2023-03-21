---
tags: ['Pandas', 'Python', 'NiceGUI']
title: Using Pandas DataFrames with NiceGUI's Grid
date: 2023-03-13
description: How I used a Pandas DataFrames inside NiceGUI's AGGrid.
---

In the process of making my [`chemic`](https://github.com/uncenter/chemic) package, I wanted to make a GUI for it. I found [NiceGUI](https://nicegui.io) and for a Python frontend... it's... not too bad. 

Anyway, I wanted to use a Pandas DataFrame inside a NiceGUI Grid. I couldn't find any examples of this, so I thought I'd write one up.

Here's NiceGUI's example reference for the AGGrid (edited a bit to make it more readable):

```py
grid = ui.aggrid({
    'columnDefs': [
        {'headerName': 'Name', 'field': 'name'},
        {'headerName': 'Age', 'field': 'age'},
    ],
    'rowData': [
        {'name': 'Alice', 'age': 18},
        {'name': 'Bob', 'age': 21},
        {'name': 'Carol', 'age': 42},
    ],
    'rowSelection': 'multiple',
})
```

As you can see, the `columnDefs` and `rowData` are just lists of dictionaries. So, I just converted my DataFrame to a list of dictionaries and it worked perfectly.

```py
data = pd.read_csv("data.csv")
columnDefs = [{"headerName": col, "field": col} for col in data.columns[:7]]
rowData = data.to_dict("records")

grid = ui.aggrid(
    {
        "columnDefs": columnDefs,
        "rowData": rowData,
        "rowSelection": "single",
    }
)
```

## A note on `"rowSelection"`

For some reason, the NiceGUI docs don't mention this [^1], but `"rowSelection"` can be set to `"single"` or `"multiple"`.[^2]

[^1]: Understandably, since it uses the actual AGGrid JavaScript library, they just expect you to read the [AGGrid docs](https://www.ag-grid.com/javascript-data-grid/). But, I think it's worth mentioning here.

[^2]: https://www.ag-grid.com/javascript-data-grid/row-selection/