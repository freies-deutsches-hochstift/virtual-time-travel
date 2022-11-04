### Code Linting

ESLint configuration is defined at the top level **.**eslintrc.json**
All apps and libs in this workspace follow this config, and any change in **.eslintrc.json\*\* will be automatically reflected on all files (server restart necessary).

You can add an ESLint plugin for your editor and or check manually:

```
nx lint
```

or with autofix

```
nx lint -- --fix
```

### Code formatting

Prettier configuration is defined in the top level **.prettierrc**

```
nx format:check --configuration=.prettierrc
```

or if you want to check and apply changes directly you can run

```
nx format:write --configuration=.prettierrc
```
