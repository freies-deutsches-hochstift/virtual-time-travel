## Configuration

The application relies on two databases.
One for fences and one for POVs (Points of View)

The API is designed to work with Directus, a simple easy to set up CMS, and as such expects by default databases to be under an API path of `items`
This is set in the data library at `libs/data/src/lib/data.tsx` within

```typescript
const fencesDb = useAPI(apiRoot, `items`, {
  endPoint: `fences`,
  token: apiToken,
  mode: dataMode,
  mapper: fenceMapper,
});
const povsDb = useAPI(apiRoot, `items`, {
  endPoint: `povs`,
  token: apiToken,
  mode: dataMode,
  mapper: povsMapper,
});
```

The **application mode** is configured via a `.env` file in the root of the project.
The application can ingest data from a JSON API or directly from locally hosted csv files.

#### To use JSON

```bash
NX_DATA_MODE=json
NX_API_ROOT=https://mysever.com
```

#### To use CSV

```bash
NX_DATA_MODE=csv
NX_API_ROOT=
```

with NX_API_ROOT pointing to the folder containing fences.csv & povs.csv
This is set by default as the assets folder of the core application
ie. `apps/geo-ar/assets/items`
and is packed when building by the core application build script configured in `apps/geo-ar/project.json`

```json
  "targets": {
    "build": {
      "options": {
        "assets": [
          {
            "input": "apps/geo-ar/assets/items",
            "glob": "*.csv",
            "output": "./items"
          }
        ]
```

## Geofence data

The Geofence data base expects

## POV data

## Project page

## About page

## Imprint page

## Additional pages

## Images

## Local development
