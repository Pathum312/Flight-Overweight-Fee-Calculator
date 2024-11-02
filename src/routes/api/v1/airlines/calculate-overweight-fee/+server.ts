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
} from '$lib/index';

export const POST: RequestHandler = async ({ request }: RequestEvent): Promise<Response> => {
	/**
	 * @const {number} id - ID of the airline
	 * @const {string} from - ID of the origin country
	 * @const {string} to - ID of the destination country
	 * @const {number} allocatedWeight - Weight allocated by the airline
	 * @const {number} actualWeight - Actual weight of the baggage
	 */
	const {
		id,
		from,
		to,
		allocatedWeight,
		actualWeight,
	}: { id: number; from: string; to: string; allocatedWeight: number; actualWeight: number } =
		await request.json();

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
