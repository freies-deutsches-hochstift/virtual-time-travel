# Generate Qr Codes

The QrReader of this application is configured to work only with QrCodes bound to the app.

The text of the QrCode should be constructed as follows:

```
<APP_URL>/#/pov/<POV_ID> // eg: https://example.com/#/pov/1
```

Where:

- **APP_URL** \
  is the Host app URL specified in **/assets/config.csv**.\
  eg: https://example.com

- **POV_ID** \
  is the relative POV id specified in **/assets/items/povs/index.csv**.

## Qrs for multilanguage apps

In the case of a multilanguage app, the Qr code URL can be localized or not depending on the needs:

**Unlocalized Qr**

```
<APP_URL>/#/pov/<POV_ID> // eg: https://example.com/#/pov/1
```

In this case, the locale will automatically fall back to the user's browser language.

**Localized Qr**

```
<APP_URL>/#/<LANG_CODE>/pov/<POV_ID> // eg: https://example.com/#/de/pov/1
```

In this case, the locale will be automatically set to the specified LANG_CODE independently of the browser language.

**LANG_CODE** should be one of the avail locale slugs specified in **/assets/items/locales/index.csv**.
