# Theming stack

**The project uses @emotion/styled - Tailwind CSS - twin.macro**

Tailwind CSS is configured to be suitable for multiple applications with different themes and sharing common buildable libraries.

Because of this, we have a shared preset under:

```
libs/tailwind-preset/tailwind.config.js
```

In here use CSS variables to allow each application/library to provide different values and overwrite defaults.

These CSS variables are defined in:

```
<my-app>/assets/styles/*.css
```

Theme is statically loaded in the index.html

```
<link rel="stylesheet" href="assets/fonts.css" type="text/css" />
<link rel="stylesheet" href="assets/colors.css" type="text/css" />
<link rel="stylesheet" href="assets/theme.css" type="text/css" />
```

## Setup new component/library

**Generate component/library with style: @emotion/styled**

```
nx generate @nrwl/react:component  --style=@emotion/styled
```

**Add Tailwind CSS config**

```
nx generate @nrwl/react:setup-tailwind project-or-library-name
```

**Because of twin.macro add babel-plugin-macros.config.js to your project/lib root folder with the following config:**

```
const { resolve } = require('path');

module.exports = {
  twin: {
    preset: 'emotion',
    config: resolve(__dirname, 'tailwind.config.js'),
  },
};

```
