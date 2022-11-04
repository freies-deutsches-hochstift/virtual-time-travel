Before you start to add your content you should define which languages it should use.

You can setup one or multiple locales here: **/assets/items/locales/index.csv**

**Default values**

| slug | default | labels.start | labels.confirm | labels.cancel | labels.skip | labels.next | labels.switch-map | labels.switch-list | labels.go-home        | labels.out-of-geofence.confirm | labels.ar-tutorial.confirm | labels.ar-unavailable.confirm | labels.camera-unavailable.confirm | labels.geo-feeds.look_around         | labels.geo-feeds.get_closer                                       | labels.geo-feeds.find_pov                                                              | labels.geo-feeds.view_pov |
| ---- | ------- | ------------ | -------------- | ------------- | ----------- | ----------- | ----------------- | ------------------ | --------------------- | ------------------------------ | -------------------------- | ----------------------------- | --------------------------------- | ------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------- |
| de   | true    | Los geht’s   | Weiter         | Beenden       | Skip        | Weiter      | Map               | List               | Zurück zur Startseite | Zur Karte                      | Los geht’s                 | Zum Hilfebereich              | Zum Hilfebereich                  | Bewege dich auf einen der Kreise zu. | Laufe soweit bis du dich vollkommen im Orangenen Kreis befindest. | Drehe dich um deine Achse bis der orangene Strich in der Mitte deines Bildschirms ist. | Blickwinkel<br/>ansehen   |

Each locale contains its slug and a series of common labels used through out the app.

- **slug** : _string_\
  language code from avail locales
- **default**: _boolean_\
  By default, the app will look for the user browser language and if this is within the app locales it will be selected as default.\
  If the user language is not within the app locales, the app will be displayed in the language marked as default.\
  If the app is multilanguage, the user can switch language under the menu tab.

- **labels**:\
  All labels need to have "**labels.**" prefix and most of them are self explanatory.

**Note**:\
Dialogs by default have avail the common labels:

- labels.confirm
- labels.next
- labels.skip
- labels.cancel

But these can be customized per dialog by adding a column in your csv file with the rule:

- label.dialog-identifier.confirm
- label.dialog-identifier.next
- label.dialog-identifier.skip
- label.dialog-identifier.cancel

as done by default for labels.ar-tutorial.confirm, labels.ar-unavailable.confirm,labels.camera-unavailable.confirm

## Content localization

Each content type is localized and has a "**locales**" subfolder inside its main assets folder.

The "**locales**" subfolder should contain your markdown files scoped by language code (which is also the language slug set in your locales/index.csv).

eg:

- :open_file_folder: **item**
  - :file_folder: locales
    - :file_folder: de
      - file_example-1.md
      - file_example-2.md
    - :file_folder: en
      - file_example-1.md
      - file_example-2.md
