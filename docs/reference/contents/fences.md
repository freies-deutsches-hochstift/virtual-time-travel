### Fences

The fences config file is stored under **/assets/items/fences/index.csv**.

There is no limit on the amount of fences that can be added to the config file. \
Because usually GPS signal is not 100% precise, a good practice is to add a bit of padding around the intrested area polygon and to avoid intersecting fences.

**Example config**

| id  | title                     | geometry.type | geometry.coordinates                                                                                                                                                                                |
| --- | ------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Deutsches Romantik-Museum | Polygon       | [[[8.677112154601929,50.111336486159445],[8.677796361479238,50.11127732472286],[8.677634919407296,50.11076212412124],[8.676954556388125,50.11080896076851],[8.677112154601929,50.111336486159445]]] |

- **id**: _string_ | _number_ \
  Unique value within the pages fences

- **title**: _string_ \
  Verbose fence identification, not directly used in the app but useful during content editing

- **geometry**: _geometry_

  - **geometry.type** \
    Currently settable only as "Polygon"

  - **geometry.coordinates** \
    Array of the polygon points as geo coordinates [latitude, longitude]
