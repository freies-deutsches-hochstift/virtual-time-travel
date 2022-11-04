The application theme can be customized by editing the css files stored under **/assets/styles/**

The theme is mainly split into 3 components, and the given values are just some default values that can be replaced as wished.

**NOTE for end users:** \
The content of these files are CSS custom properties (values reused throughout the whole app), so it is important to edit just their values and not their definition.

eg:

```
--variable-name: variable-value;
```

For more information see CSS custom properties on [Mdn Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Fonts

- **/assets/styles/fonts.css**

By default, the app uses 2 font families "dm_serif" for the headlines and "noto_sans" for the text.

To replace a font:

- add Webfont \*.woff2 (or preferred extension) under **/assets/fonts/**

in **/assets/styles/fonts.css**

- add @font-face definition
- replace the font family value in the variables

```
:root {
  --font-headline: "your headline font family";
  --font-body: "your text font family";
}
```

### Colors

- **/assets/styles/colors.css**

Primarily the app uses 3 colors "primary", "secondary" and "highlight" with a few declinations.

```
  --primary: #fff;
  --primary-a: #94a3d8;
  --primary-b: rgb(17, 23, 44);

  --primary-gradient: linear-gradient(var(--primary-b), var(--primary-b));

  --secondary-a: #bdb2f6;
  --secondary: #fff;
  --secondary-b: #7b61ff;

  --highlight-text: #fff;
  --highlight: rgb(255, 122, 0);
  --highlight-a: rgba(255, 122, 0, 0.6);

```

As default, these main colors are reused within the different app components.\
With this setup, it should be sufficient to replace only the values listed above to change the basic look and feel of your app.

This is usually a common best practice, but if needed each set value can be replaced with any desired one.

| Main navigation      |                                    |
| -------------------- | ---------------------------------- |
| --ui-nav-bg          | navigation base background         |
| --ui-nav-link        | navigation icon default fill color |
| --ui-nav-link-active | navigation icon active fill color  |

| Dialogs             |                                 |
| ------------------- | ------------------------------- |
| --ui-dialog-overlay | dialog overlay background color |
| --ui-dialog-bg      | dialog inner background color   |
| --ui-dialog-primary | dialog text color               |

| Buttons                  |                                   |
| ------------------------ | --------------------------------- |
| --ui-button-primary      | primary button text color         |
| --ui-button-primary-bg   | primary button background color   |
| --ui-button-secondary    | secondary button text color       |
| --ui-button-secondary-bg | secondary button background color |
| --ui-button-highlight    | highlight button text color       |
| --ui-button-highlight-bg | highlight button background color |
| --ui-button-disabled     | disabled button text color        |
| --ui-button-disabled-bg  | disabled button background color  |

| Ar - Geo                        |                                          |
| ------------------------------- | ---------------------------------------- |
| --ui-pov-primary                | POV marker background color              |
| --ui-pov-waves                  | POV marker waves background color        |
| --ui-pov-compass-primary        | compass ticks background color           |
| --ui-pov-compass-primary-text   | compass ticks text color                 |
| --ui-pov-compass-highlight      | compass marker tick background color     |
| --ui-pov-compass-highlight-text | compass marker tick text color           |
| --ui-pov-compass-cta            | compass open POV button background color |
| --ui-pov-compass-cta-text       | compass open POV button text color       |

| Cards (POVs list and details) |                                         |
| ----------------------------- | --------------------------------------- |
| --ui-cards-bg                 | compact card background color           |
| --ui-cards-border             | compact card border definition          |
| --ui-cards-text               | compact card text color                 |
| --ui-card-placeholder         | card placeholder image background color |
| --ui-card-details-bg          | popup card background color             |
| --ui-card-details-text        | popup card text color                   |

### Extras

More advanced settings can be found in:

- **/assets/styles/theme.css**

In this file, it is possible to change layout intrinsic attributes like sizes/radius/masks.
