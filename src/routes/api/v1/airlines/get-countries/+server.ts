import { json, type RequestHandler, type RequestEvent } from '@sveltejs/kit';
import { findAirlineByID, findCountriesForAirline, type Airline, type Country } from '$lib';

/**
 * Retrieves the list of transit countries for a given airline by its ID.
 *
 * @param {RequestEvent} ID - Get the ID from the URL of the request.
 *
 * @returns {Promise<Response>} The response containing the list of transit countries.
 *
 * @throws {Response} 400 - If the ID is not provided.
 * @throws {Response} 404 - If the airline is not found.
 * @throws {Response} 404 - If the airline is not found or has no associated transit countries.
 */
export const GET: RequestHandler = async ({ url }: RequestEvent): Promise<Response> => {
	// Get the ID from the URL
	const ID: string | null = url.searchParams.get('id');

	// IF the ID is not provided, return a 400 error.
	if (!ID) return json({ message: 'ID is required' }, { status: 400 });

	// Find the corresponding airline from the database by ID.
	const foundAirline: Airline | null = findAirlineByID(Number(ID));

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
