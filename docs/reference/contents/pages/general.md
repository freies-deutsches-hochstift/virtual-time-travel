### Pages

#### Config

?> :page_facing_up: **/assets/items/pages/index.csv**

The pages config file contains the setup of all pages used by the app.

The app is composed by mandatory pages and optional/free pages

**Mandatory pages**\
Mandatory pages are all the ones used by the app as the main route and have to be present in the config file:

| id  | identifier | slug       | title    | subpages  |
| --- | ---------- | ---------- | -------- | --------- |
| 1   | home       |            | Home     | []        |
| 999 | not-found  |            | NotFound | []        |
| 2   | explore    | explore-de | Explore  | []        |
| 3   | qr         | qr-de      | Qr       | []        |
| 4   | list       | list-de    | List     | []        |
| 5   | menu       | menu-de    | Menu     | [6,7,8,9] |
| 6   | intro      | intro-de   | Intro    | []        |

**Optional pages** (eg)\
Optional pages are all the ones used mostly by the menu (or eventually for any type of internal linking).\
There are no strict rules on quantity, nesting, naming, the default pages added in the config are just an example of common usage.

| id  | identifier | slug       | title                                     | subpages |
| --- | ---------- | ---------- | ----------------------------------------- | -------- |
| 7   | about      | about-de   | Infos zum Projekt                         | []       |
| 8   | help       | help-de    | Hilfe                                     | [10,11]  |
| 9   | imprint    | imprint-de | Impressum                                 | []       |
| 10  | faq-1      | faq-1-de   | Ich kann die Kameraansicht nicht starten. | []       |
| 11  | faq-2      | faq-2-de   | Mein GPS Standort wird nicht erkannt.     | []       |

- **id**: _string_ | _number_\
  Unique value within the pages table

- **identifier**: _string_\
  Unique value within the pages table\
  Used to identify route type and point to relative content markdown file.

- **slug**: _string_ | _localized string_ _\*\*_ \
  Entry unique value within the pages table\
  Used for route composition\
  All app routes are localized and because of this, each page can have a custom path language dependent.

- **title**: _string_ | _localized string_ _\*\*_ \
  Page title

- **subpages**: _array_ \
  Array of pages Ids\
  If filled the page automatically will display a submenu will all linked subpages.\
  Mostly used to setup the menu.\
  There is no nesting depth limit.

_\*\*_ **Slug and title are subject to localization:**

This means that in the case of a multilanguage app you should add as many declinations as many avail languages.

Eg: en - de

| id  | identifier | slug.de              | slug.en         | title.de            | title.en        | subpages |
| --- | ---------- | -------------------- | --------------- | ------------------- | --------------- | -------- |
| 99  | example    | meine-beispiel-seite | my-example-page | Meine Beispielseite | My example page | []       |

#### Adding content

The content of each page is collected under the relative **locales** subfolder.\
The **locales** subfolder should contain your markdown files scoped by language code (which is also the language slug set in your locales/index.csv).\
The content filename \*.md should be identical to the "**page identifier**" specified in the pages config csv.

> See also [Localization](/reference/localization/index.md) and [How to markdown](/reference/markdown/index.md)
