import { HttpError } from '../lib/http-error.js';

// TODO (you): check ?city= and return the trimmed city name. Throw a 400
// HttpError with details.city when it breaks a rule from the assignment page.
export function parseCity(value) {
   if (typeof value !== "string") {
        throw new HttpError(400, "Invalid city", {
            city: "City is required"
        });
    }

    const city = value.trim();

    if (city.length === 0) {
        throw new HttpError(400, "Invalid city", {
            city: "City cannot be empty"
        });
    }

    return city;
}
// TODO (you): check ?cities= and return an array of trimmed city names. Throw a
// 400 HttpError with details.cities when it breaks a rule from the assignment page.
export function parseCities(value) {

    if (typeof value !== "string") {
        throw new HttpError(400, "Invalid cities", {
            cities: "Cities are required"
        });
    }

    const cities = value.split(",").map(city => city.trim());

    if (cities.length < 2 || cities.length > 5) {
        throw new HttpError(400, "Invalid cities", {
            cities: "Enter between 2 and 5 cities"
        });
    }

    if (cities.some(city => city.length === 0)) {
        throw new HttpError(400, "Invalid cities", {
            cities: "City names cannot be empty"
        });
    }

    return cities;
}
