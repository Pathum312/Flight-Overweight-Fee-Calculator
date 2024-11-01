import { DB, type Airline, type Band, type Country } from '$lib/index';
import { json, type RequestHandler, type RequestEvent } from '@sveltejs/kit';

/**
 * Retrieves the list of transit countries for a given airline by its ID.
 *
 * @param {RequestEvent} event - Get the ID from the URL of the request.
 * @returns {Promise<Response>} The response containing the list of transit countries.
 * @throws {Response} 400 - If the ID is not provided.
 * @throws {Response} 404 - If the airline is not found.
 * @throws {Response} 404 - If the airline is not found or has no associated transit countries.
 */
export const GET: RequestHandler = async ({ url }: RequestEvent): Promise<Response> => {
	// Get the ID from the URL
	const ID = url.searchParams.get('id');

	// IF the ID is not provided, return a 400 error.
	if (!ID) return json({ message: 'ID is required' }, { status: 400 });

	// Find the corresponding airline from the database by ID.
	const foundAirline: Airline = findAirlineByID(Number(ID));

	// If the airline is not found, return a 404 error.
	if (!foundAirline) return json({ message: `Airline ${ID} is not found` }, { status: 404 });

	// Find the countries from the corresponding bands for that airline
	const foundCountries: Country[] = findCountriesForAirline(foundAirline);

	// If the countries are not found, return a 404 error.
	if (!foundCountries.length)
		return json(
			{ message: `${foundAirline.name} has no associated transit countries` },
			{ status: 404 },
		);

	// Return the found countries as a JSON response
	return json(foundCountries);
};

/**
 * Finds an airline from the database by its ID.
 *
 * @param {number} ID - The ID of the airline to find.
 * @returns {Airline} The found airline, or undefined if not found.
 */
const findAirlineByID = (ID: number): Airline => {
	return DB.find((airline: Airline) => airline.id === ID) as Airline;
};

/**
 * Finds the transit countries from the corresponding bands for a given airline.
 *
 * @param {Airline} airline - The airline object
 * @returns {Country[]} The list of countries
 */
const findCountriesForAirline = (airline: Airline): Country[] => {
	return airline.bands.map((band: Band) => band.countries).flat();
};
