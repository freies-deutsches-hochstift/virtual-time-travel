All contents by default are stored under **/assets/items**:

The major content types are:

- [Pages](#pages)
- [POVs](#povs)
- [Fences](#fences)
- [Dialogs](#dialogs)

### Generic content structure

All content types follow this structure:

- :open_file_folder: **item**
  - :file_folder: locales
  - :file_folder: medias
  - index.csv

The **locales** folder hosts all content markdown entries scoped by language code.\
The **medias** folder hosts all static assets used in the markdown files.\
**index.csv** represents the content config.

**Filenames:**

!> consider following hints when choosing file names!

- Don't **start** or **end** your filename **with a space, period, hyphen, or underline**.
- Keep your filenames to a **reasonable length** and be sure they are under 31 characters.
- Most operating systems are case sensitive; **always use lowercase**.
- **Avoid using spaces**. Use a hyphen or underscore instead.
- **Avoid** using **special characters** eg: #/§$%& öäüß ...
