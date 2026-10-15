import { config } from '../config.js';
import { geocodeCity, getForecast } from './open-meteo.js';
import { describeWeatherCode } from './weather-codes.js';

const cache = new Map();

const cacheTtl = config.cacheTtlSeconds * 1000;

let cacheHits = 0;
let cacheMisses = 0;

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

export function getCacheStats() {
   return {
        entries: cache.size,
        hits: cacheHits,
        misses: cacheMisses
    };
}
