<div align="center">
   <img width="150" heigth="150" src="https://github.com/technologiestiftung/bikesharing-vis/blob/master/assets/citylab-logo_.svg" />
</div>

## Example: Use deck.gl with react-map-gl and Webpack

Uses [Webpack](https://github.com/webpack/webpack) to bundle files and serves it
with [webpack-dev-server](https://webpack.js.org/guides/development/#webpack-dev-server).

## Usage

To run this example, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can either set an environment variable:

```bash
export MapboxAccessToken=<mapbox_access_token>
```

Or set `MAPBOX_TOKEN` directly in `app.js`.

Other options can be found at [using with Mapbox GL](../../../../docs/get-started/using-with-mapbox-gl.md).

To install dependencies:

```bash
npm install
# or
yarn
```

Commands:
* `npm start` is the development target, to serves the app and hot reload.
* `npm run build` is the production target, to create the final bundle and write to disk.
