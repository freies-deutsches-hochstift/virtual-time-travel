### Povs

#### Config

The povs config file is stored under **/assets/items/povs/index.csv**.

**Example config**

| id  | fence | cover | title | orientation | geometry.type | geometry.coordinates                  |
| --- | ----- | ----- | ----- | ----------- | ------------- | ------------------------------------- |
| 1   | 1     | 1.jpg | DRM   | 10          | Point         | [8.67731489889593,50.111175669006855] |

- **id**: _string_ | _number_ \
  Unique value within the pages fences

- **fence**: _string_ \
  Verbose fence identification, not directly used in the app but useful during content editing

- **cover**: _string_ \
  Cover image asset path, it can be a local file stored in the relative **povs/medias** folder or an external url.\
  For performance reason and stability best would be to always use local files.\
  The system does not handle image conversion, so it your responsability to provide images with a resonable format and weight.

- **title**: _string_ | _localized string_ _\*\*_ \
  Point of view title

- **orientation**: _number_ \
  Compass degree angle that the user should orient to in order to see the wanted prospective of the point of interested.

- **geometry**: _geometry_

  - **geometry.type** \
    Currently settable only as "Point"

  - **geometry.coordinates** \
    Array of coordinates [latitude, longitude]

_\*\*_ **Title is subject to localization:**

This means that in the case of a multilanguage app you should add as many declinations as many avail languages.

Eg: en - de

| id  | fence | cover | title.de           | title.en       | orientation | geometry.type | geometry.coordinates                  |
| --- | ----- | ----- | ------------------ | -------------- | ----------- | ------------- | ------------------------------------- |
| 1   | 1     | 1.jpg | Meine beispiel POV | My example POV | 10          | Point         | [8.67731489889593,50.111175669006855] |

#### Adding content

The content of each pov is collected under the relative **locales** subfolder.\
The **locales** subfolder should contain your markdown files scoped by language code (which is also the language slug set in your locales/index.csv).\
The content filename \*.md should be identical to the "**page identifier**" specified in the pages config csv.

See also [Localization](/reference/localization/index.md) and [How to markdown](/reference/markdown/index.md)
