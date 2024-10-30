import { json, type RequestHandler } from '@sveltejs/kit';
import { DB, type Airline, type AirlineResponse } from '$lib/index';

/**
 * Sends the list of airlines.
 *
 * @returns {Promise<Response>} Returns airline listing
 */
export const GET: RequestHandler = async (): Promise<Response> => {
	const response: AirlineResponse[] = DB.map(({ bands, ...data }: Airline) => data);

	return json(response);
};
