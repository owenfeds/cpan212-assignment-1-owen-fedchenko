# City Weather API

Gets weather information from a certain city or compares weather between cities.

## Run it

TODO (you): the commands to install and start it, including copying `.env.example` to `.env`.

## Environment variables

| Variable | Default | Controls |
|---|---|---|
| PORT | 4000 | The port the server listens on |
| GEOCODING_URL | https://geocoding-api.open-meteo.com/v1 | Base URL of the geocoding API |
| FORECAST_URL | https://api.open-meteo.com/v1 | https://api.open-meteo.com/v1 |
| UPSTREAM_TIMEOUT_MS | 5000 | How long to wait for each Open-Meteo request |
| CACHE_TTL_SECONDS | 600 | How long a cached answer stays valid |
	

Base URL of the forecast API

## Endpoints

| ENDPOINT | EXAMPLE | DESCRIPTION |
|---|---|---|
| GET /api/weather | /api/weather?city=Toronto | Current weather and a 3-day forecast for one city |
| GET /api/compare | /api/compare?cities=Toronto,Vancouver,Halifax | The same lookup for 2 to 5 cities at once, with a result for each city even when some fail |
| Get /api/cache/stats | /api/cache/stats | How many answers are cached, and how often the cache was used |

## Data source

TODO (you): credit Open-Meteo with a link to https://open-meteo.com/.

## AI use

AI used to explain and understand code sections as well as find errors.
