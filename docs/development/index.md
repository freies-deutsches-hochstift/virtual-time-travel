### Intro

This is a monorepo project generated with [Nx](https://nx.dev).

- Please adopt the [Conventional Commit 1.0.0](https://www.conventionalcommits.org/en/v1.0.0) specification
- Development practice follows the [git flow principles](https://www.gitkraken.com/learn/git/git-flow)
- Do not forget to publish your Feature-/BugFix-/Hotfix-/Support-/Release-Branch to the remote repository

### Requirements

- **node v16.16.0**
- **nx** as a global package

```
  npm i --location=global nx
```

### Get it up and running

- Clone (or download) this repository on your computer

- Setup your node version

```
  nvm use
```

- Install project dependencies (one time only)

```
npm i
```

- Duplicate the directory **apps/geo-ar/assets-templates** and rename it into **assets**.\
  The directory "assets-templates" contains config and contents samples and it is used to create the pre-build standalone package so it should stay untouched.

- Run development server

```
nx serve
```

Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

### Build the application

To build the application with your contents run:

```
yarn build
```

To build the application with sample contents run:

```
yarn package
```
