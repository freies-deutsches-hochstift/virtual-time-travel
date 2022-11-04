# Metadata & App-icons

Application title, description, icons ... are defined in **/index.html**.

Currently, the given values are just examples and they should be replaced/filled before deploying the app.

Usually, it should suffice to edit the metatags marked in the index.html as:

- Primary Meta Tags
- Open Graph / Facebook
- Twitter

There are many online tools to help you debug and generate meta tags for example [metatags.io](https://metatags.io/)

## App manifest

This application is avail as Progressive Web App.

_From mdn: Progressive Web Apps (PWAs) are web apps that use service workers, manifests, and other web-platform features in combination with progressive enhancement to give users an experience on par with native apps._

As for the Metadata, **/manifest.json** should be edited accordingly with your app title and icons.

Usually, it is suggested/required to edit only the field 'name' and 'short_name'.

```
  "name": "`YourApp name`",
  "short_name": "YourApp",
```

- **name** \
  Application name/title.

- **short_name** \
  If given, this will be used in contexts where the name field is too long. It's recommended that the short name should not exceed 12 characters. If the short name field is not included in manifest.json, then **name** will be used instead and may be truncated.

The current manifest contains just basic mandatory fields.
It can be fully configured as specified under the [Mdn documentation](https://web.dev/add-manifest/)

## App-icons

All icons used in the Meta tags are located under **/assets/app-icons/**.

They can be directly replaced with icons with the same filename/format/size.
