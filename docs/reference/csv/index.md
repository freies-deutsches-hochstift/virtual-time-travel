# CSV interpreter

All CSV files are converted to JSON and used in the React store.

Because of the specific use within the app, any CVS file should be created with the following convention:

**delimiter "," + use quotes**

Eg:

```
"id","title","geometry.type","geometry.coordinates"
1,"Deutsches Romantik-Museum","Polygon","[[[...]]]"
```

**Keys** can be plain values or hierarchical string representations.\
**Values** can be of any kind (string, number, array, ...).

Hierarchical string representations are used to generate a nested object structure.

For example in the CSV above, the keys "geometry.type" and "geometry.coordinates" will be interpreted as:

```
{
  geometry: {
    type: "Polygon",
    coordinates: [[[...]]]
  }
}
```

Hierarchical strings are commonly used in this project for localized fields or POVs/Fences geometry.
