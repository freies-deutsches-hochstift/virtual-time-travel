### Dialogs

?> :page_facing_up: **/assets/items/dialog**

Because dialogs are deeply nested inside the app their config setup is hidden and not configurable.\
On the other hand, their content and appearance are fully customizable.

#### Available Dialogs

- **request-camera.md** \
  Info Dialog prior Camera authorization browser request.

- **request-geolocation.md** \
  Info Dialog prior Location authorization browser request.

- **ar-unavailable.md** \
  Error Dialog is shown in case the device does not suffice all the required features or if the user had declined their authorization.

- **camera-unavailable.md** \
  Error Dialog is shown in case the device has no camera or if the user had declined the authorization.

- **ar-tutorial.md** \
  Multistep tutorial dialog, displayed before starting the explore experience.

- **invalid-qr.md** \
  Error Dialog is shown in case the QrCode scanned is not part of the pov collection.

- **pov-404.md** \
  Error Dialog is shown in case the POV scanned is not found in pov collection.

- **out-of-geofence.md** \
  Error Dialog is shown in case the user is located outside of any avail geofences.

- **force-portrait.md** \
  Info Dialog, the app can be displayed only in portrait mode.

#### Contents

?> :page_facing_up: **/assets/dialogs/locales/**

Each of their content can be found under **/assets/dialogs/locales/** scoped by the available app languages.

?> :page_facing_up: **/assets/dialogs/media/**

The graphics used per each dialog are stored under **/assets/dialogs/medias/**.\
They can be easily replaceable but because of layout restrictions best to use a similar format.\
Ideally, for the best cross-device visualization, it would be best to use \*.svg.

> See also [Localization](/reference/localization/index.md) and [How to markdown](/reference/markdown/index.md)
