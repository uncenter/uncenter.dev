---
tags: ['Pandas', 'Python', 'NiceGUI']
title: Pandas DataFrame & NiceGUI
micro: true
date: 2023-03-13
---

In the process of making a GUI for my [`chemic`](https://github.com/uncenter/chemic) package through [NiceGUI](https://nicegui.io), I couldn't figure out how to use a Pandas DataFrame inside a NiceGUI Grid element.

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
