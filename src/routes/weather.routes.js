import { Router } from 'express';
import { getCityWeather } from '../lib/weather.js';

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
weatherRouter.get('/compare', (req, res) => {
  res.status(501).json({ error: { message: 'Not written yet: GET /api/compare' } });
});
