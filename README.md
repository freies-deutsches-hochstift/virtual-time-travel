# Virtual Time Travel

## Funding

The museum4punkt0 project is funded by the Federal Government Commissioner for Culture and the Media on the basis of a resolution of the German Bundestag.

![BKM-Logo](https://github.com/museum4punkt0/images/blob/2c46af6cb625a2560f39b01ecb8c4c360733811c/BKM_Fz_2017_Web_de.gif)
![NeustartKultur](https://github.com/museum4punkt0/media_storage/blob/a35eedb36e5b502e90cd76d669a6b337002b230a/BKM_Neustart_Kultur_Wortmarke_pos_RGB_RZ_web.jpg)

## Development

This is a monorepo project generated with [Nx](https://nx.dev).

- Please adopt the [Conventional Commit 1.0.0](https://www.conventionalcommits.org/en/v1.0.0) specification
- Development practice follows the [git flow principles](https://www.gitkraken.com/learn/git/git-flow)
- Do not forget to publish your Feature-/BugFix-/Hotfix-/Support-/Release-Branch to the remote repository

### Requirements

- Node
  - Install **node v16.16.0 (LTS)**
  - Install **nx** as global package
    - `npm i --location=global nx`

### Development server

Run `nx serve geo-ar` for a geo-ar dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

### Code formatting

```
nx format:check --configuration=.prettierrc
```

or

```
nx format:write --configuration=.prettierrc
```

### Code Linting

```
nx lint
```

or

```
nx lint -- --fix
```

### Documentation

The documentation is using Docsify. This is a client-side-only tool.

- Client-side only Markdown renderer
- To serve it locally, just use an HTTP server.

```
npm install --global http-server
http-server -c-1 ./docs
```
