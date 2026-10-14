import { config } from '../config.js';
import { geocodeCity, getForecast } from './open-meteo.js';
import { describeWeatherCode } from './weather-codes.js';

// TODO (you): create one cache for the whole app, with a time to live of
// config.cacheTtlSeconds.
const cache = new Map();

const cacheTtl = config.cacheTtlSeconds * 1000;

let cacheHits = 0;
let cacheMisses = 0;

// TODO (you): return the weather summary for one city, in the shape shown on
// the assignment page. Check the cache first. On a miss, geocode the city, get
// the forecast, build the summary, store it, and return it with cached: false.
// On a hit, return the stored summary with cached: true.
export async function getCityWeather(city) {

    const key = city.trim().toLowerCase();

    const cached = cache.get(key);

    if (cached && Date.now() < cached.expiresAt) {
      cachedHits++;
      
        return {
            ...cached.data,
            cached: true
        };
    }

    const location = await geocodeCity(city);

    const forecast = await getForecast(
        location.latitude,
        location.longitude
    );

    const summary = {
        city: location.name,
        region: location.region,
        country: location.country,
        timezone: location.timezone,
        current: forecast.current,
        daily: forecast.daily
    };

    cache.set(key, {
        data: summary,
        expiresAt: Date.now() + cacheTtl
    });

    return {
        ...summary,
        cached: false
    };
}

// TODO (you): return the cache statistics for GET /api/cache/stats.
export function getCacheStats() {
   return {
        entries: cache.size,
        hits: cacheHits,
        misses: cacheMisses
    };
}
