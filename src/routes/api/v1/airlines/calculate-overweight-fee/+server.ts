import { json, type RequestHandler, type RequestEvent } from '@sveltejs/kit';
import {
	findAirlineByID,
	findOriginCountryByID,
	calculateOverweightFee,
	calculateBaggageOverweight,
	findOverweightFeeForDestination,
	type Fee,
	type Band,
	type Airline,
	type POSTRequest,
} from '$lib/index';

/**
 * Calculates the overweight fee for baggage based on the given request body.
 *
 * @param {number} id - ID of the airline
 * @param {string} from - ID of the origin country
 * @param {string} to - ID of the destination country
 * @param {number} allocatedWeight - Weight allocated by the airline
 * @param {number} actualWeight - Actual weight of the baggage
 *
 * @returns {Promise<Response>} The response with the calculated overweight fee
 *
 * @throws {Response} 400 - If the ID, origin or destination countries are not provided
 * @throws {Response} 404 - If the airline is not found
 * @throws {Response} 404 - If the origin country is not found
 * @throws {Response} 404 - If the fee for overweight baggage from the origin country to the destination
 *                         country is not found
 */
export const POST: RequestHandler = async ({ request }: RequestEvent): Promise<Response> => {
	/**
	 * @const {number} id - ID of the airline
	 * @const {string} from - ID of the origin country
	 * @const {string} to - ID of the destination country
	 * @const {number} allocatedWeight - Weight allocated by the airline
	 * @const {number} actualWeight - Actual weight of the baggage
	 */
	const { id, from, to, allocatedWeight, actualWeight }: POSTRequest = await request.json();

	// IF the ID is not provided, return a 400 error.
	if (!id) return json({ message: 'ID is required' }, { status: 400 });

	// IF the origin and destination countries are not provided, return a 400 error.
	if (!from || !to)
		return json({ message: 'Origin and destination countries are required' }, { status: 400 });

	// Find the corresponding airline from the database by ID.
	const foundAirline: Airline | null = findAirlineByID(Number(id));

	// IF the airline is not found, return a 404 error.
	if (!foundAirline) return json({ message: `Airline ${id} is not found` }, { status: 404 });

	// Find the origin country from the corresponding bands for that airline
	const foundOriginCountry: Band | null = findOriginCountryByID(foundAirline, from);

	// IF the origin country is not found, return a 404 error.
	if (!foundOriginCountry) return json({ message: `Band ${from} is not found` }, { status: 404 });

	// Find the fee for overweight baggages to the destination country
	const foundFee: Fee | null = findOverweightFeeForDestination(foundOriginCountry, to);

	// IF the fee is not found, return a 404 error.
	if (!foundFee) return json({ message: `Fee for ${from} to ${to} is not found` }, { status: 404 });

	// Calculate the overweight amount of the baggage
	const overweight: number = calculateBaggageOverweight(allocatedWeight, actualWeight);

	// Calculate the overweight fee
	const overweightFee: number = calculateOverweightFee(foundFee, overweight);

	// Return the overweight fee for the baggage
	return json({ overweightFee });
};
