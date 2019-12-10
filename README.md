<div align="center">
   <a href="https://citylab-berlin.org"><img width="50" heigth="50" src="https://raw.githubusercontent.com/technologiestiftung/bikesharing-vis/master/assets/citylab-shape.png" /></a>
</div>

# CityLAB Berlin: Bikesharing Visualization

> The visualization is developed by the CityLAB Berlin and shows the use of bikesharing providers (LIDL-Bike, NextBike) in Berlin . All wheel movements larger than 300 meters are shown. Thus it becomes visible at which times and in which regions bikesharing is used particularly intensively.

> A version of the working prototype can be found [here](https://bikesharing.citylab-berlin.org/)

This project uses [Webpack](https://github.com/webpack/webpack) to bundle files and serves it
with [webpack-dev-server](https://webpack.js.org/guides/development/#webpack-dev-server).

## Usage

To run this project, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can either set an environment variable:

```bash
export MapboxAccessToken=<mapbox_access_token>
```

Or set `MAPBOX_TOKEN` directly in `app.js`.

Other options can be found at [using with Mapbox GL](../../../../docs/get-started/using-with-mapbox-gl.md).

To install dependencies:

```bash
npm install
```

#### Commands:
* `npm start` is the development target, to serves the app and hot reload.
* `npm run build` is the production target, to create the final bundle and write to disk.