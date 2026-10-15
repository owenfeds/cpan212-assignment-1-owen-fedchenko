import { Router } from 'express';
import { getCityWeather } from '../lib/weather.js';
import { parseCity } from '../validators/weather-query.js';

export const weatherRouter = Router();

weatherRouter.get('/weather', async (req, res, next) => {
  try {
    const city = parseCity(req.query.city);
    const data = await getCityWeather(city);

    res.json({
      data: data, attribution: "Weather data"
  });
  
} catch (err) {
  next(err);
}
});


// TODO (you): GET /api/compare?cities=Toronto,Vancouver,Halifax
// Validate with parseCities, start every lookup at once with Promise.allSettled,
// then build the cities array and the summary described on the assignment page.
weatherRouter.get('/compare', async (req, res, next) => {
    try {
        const cities = parseCities(req.query.cities);

        const results = await Promise.allSettled(
            cities.map(city => getCityWeather(city))
        );

        const cityResults = results.map((result, index) => {
            if (result.status === "fulfilled") {
                return {
                    city: cities[index],
                    data: result.value
                };
            } else {
                return {
                    city: cities[index],
                    error: {
                        message: result.reason.message
                    }
                };
            }
        });

        const successful = results.filter(
            result => result.status === "fulfilled"
        ).length;

        const failed = results.length - successful;

        res.json({
            data: {
                cities: cityResults,
                summary: {
                    total: results.length,
                    successful: successful,
                    failed: failed
                }
            }
        });

    } catch (err) {
        next(err);
    }
});