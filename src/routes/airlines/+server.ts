import { DB } from '$lib/index';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Airline, AirlineResponse } from '$lib/index';

/**
 * Sends the list of airlines.
 *
 * @returns {Promise<Response>} Returns airline listing
 */
export const GET: RequestHandler = async (): Promise<Response> => {
	const response: AirlineResponse[] = DB.map(({ bands, ...data }: Airline) => data);

	return json(response);
};
