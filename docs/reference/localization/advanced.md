# Advanced

The app uses an internal library **libs/localization** which mainly contains types definitions.\
Language selection/handling is mostly handled in the **redux store** **apps/geo-ar/src/app/store/locales.slice.ts**.

The **/assets/items/locales/index.csv** will be fetched and added to the store as following:

```
[
      {
        slug: 'de',
        'default': true,
        labels: {
          start: 'Los geht’s',
          confirm: 'Weiter',
          cancel: 'Beenden',
          skip: 'Skip',
          next: 'Weiter',
          'switch-map': 'Map',
          'switch-list': 'List',
          'go-home': 'Zurück zur Startseite',
          'out-of-geofence': {
            confirm: 'Zur Karte'
          },
          'ar-tutorial': {
            confirm: 'Los geht’s'
          },
          'ar-unavailable': {
            confirm: 'Zum Hilfebereich'
          },
          'camera-unavailable': {
            confirm: 'Zum Hilfebereich'
          },
          'geo-feeds': {
            look_around: 'Bewege dich auf einen der Kreise zu.',
            get_closer: 'Laufe soweit bis du dich vollkommen im Orangenen Kreis befindest.',
            find_pov: 'Drehe dich um deine Achse bis der orangene Strich in der Mitte deines Bildschirms ist.',
            view_pov: 'Blickwinkel<br/>ansehen'
          }
        }
      }
    ]
```
