# Advanced

Under the hood, the app uses an internal library **libs/app-config** to handle intrinsic and derived values.

The complete derived object used by the app store will look like this:

```

{
      DATA_ROOT: '/assets/items',
      fences: {
        fetchParams: {
          url: '/assets/items/fences/index.csv',
          type: 'csv'
        },
        mediasUrl: '/assets/items/fences/medias',
        contentUrl: '/assets/items/fences/locales'
      },
      povs: {
        fetchParams: {
          url: '/assets/items/povs/index.csv',
          type: 'csv'
        },
        mediasUrl: '/assets/items/povs/medias',
        contentUrl: '/assets/items/povs/locales'
      },
      dialogs: {
        fetchParams: {
          url: '/assets/items/dialogs/index.csv',
          type: 'csv'
        },
        mediasUrl: '/assets/items/dialogs/medias',
        contentUrl: '/assets/items/dialogs/locales'
      },
      locales: {
        fetchParams: {
          url: '/assets/items/locales/index.csv',
          type: 'csv'
        },
        mediasUrl: '/assets/items/locales/medias',
        contentUrl: '/assets/items/locales/locales'
      },
      pages: {
        fetchParams: {
          url: '/assets/items/pages/index.csv',
          type: 'csv'
        },
        mediasUrl: '/assets/items/pages/medias',
        contentUrl: '/assets/items/pages/locales'
      },
      DISABLE_QR: false,
      DISABLE_EXPLORE: false,
      INVIEW_THRESHOLD_ANGLE: 35,
      INVIEW_THRESHOLD_DISTANCE: 25,
      LOOK_AROUND_MIN_DISTANCE: 100,
      GET_CLOSER_MIN_DISTANCE: 100,
      APP_URL: 'https://example.com'
    }
```

If you need you can overwrite these params by adding the relative key in **config.csv**

**Eg: Custom DATA_ROUTE**

| DATA_ROUTE     | APP_URL             | DISABLE_EXPLORE | DISABLE_QR | INVIEW_THRESHOLD_ANGLE | INVIEW_THRESHOLD_DISTANCE | LOOK_AROUND_MIN_DISTANCE | GET_CLOSER_MIN_DISTANCE |
| -------------- | ------------------- | --------------- | ---------- | ---------------------- | ------------------------- | ------------------------ | ----------------------- |
| assets/my-data | https://example.com | false           | false      | 35                     | 25                        | 100                      | 100                     |

by changing DATA_ROUTE, all items fetchParams.url,mediasUrl,contentUrl will be automatically updated

**Eg: Custom FetchParams**

| pages.fetchParams.url          | pages.fetchParams.type | APP_URL             | DISABLE_EXPLORE | DISABLE_QR | INVIEW_THRESHOLD_ANGLE | INVIEW_THRESHOLD_DISTANCE | LOOK_AROUND_MIN_DISTANCE | GET_CLOSER_MIN_DISTANCE |
| ------------------------------ | ---------------------- | ------------------- | --------------- | ---------- | ---------------------- | ------------------------- | ------------------------ | ----------------------- |
| /assets/items/pages/index.json | json                   | https://example.com | false           | false      | 35                     | 25                        | 100                      | 100                     |
