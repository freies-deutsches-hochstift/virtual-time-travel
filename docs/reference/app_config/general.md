**Default values**

| APP_URL             | DISABLE_EXPLORE | DISABLE_QR | INVIEW_THRESHOLD_ANGLE | INVIEW_THRESHOLD_DISTANCE | LOOK_AROUND_MIN_DISTANCE | GET_CLOSER_MIN_DISTANCE |
| ------------------- | --------------- | ---------- | ---------------------- | ------------------------- | ------------------------ | ----------------------- |
| https://example.com | false           | false      | 35                     | 25                        | 100                      | 100                     |

- **APP_URL**: _string_

  - Host app url
  - Used for QrCode URL match validation
  - Need to be HTTPS (Webcam stream and other features avail only under secure context)

- **DISABLE_EXPLORE**: _boolean_

  If set to **true** the Explore tab (and feature) will be hidden from the main menu.

- **DISABLE_QR**: _boolean_

  If set to **true** the QrReader tab (and feature) will be hidden from the main menu.

- **INVIEW_THRESHOLD_DISTANCE**: _number_

  How many meters the user needs to be from a "point of view" for it to be activated in navigation mode.

- **INVIEW_THRESHOLD_ANGLE**: _number_

  How many degrees the user can be oriented towards a "point of view" for it to be considered in direct view.

- **LOOK_AROUND_MIN_DISTANCE**: _number_

  How many meters the user needs to be from a "point of view" for it to be seen on screen.

- **GET_CLOSER_MIN_DISTANCE**: _number_

  How many meters the user needs to be to a "point of view" for it to be considered close enough.

Because the **GPS signal** is never 100% accurate and it can differ by factors\
**INVIEW_THRESHOLD_DISTANCE, INVIEW_THRESHOLD_ANGLE, LOOK_AROUND_MIN_DISTANCE,GET_CLOSER_MIN_DISTANCE**\
should not be set too low (eg: under 20 meters)
