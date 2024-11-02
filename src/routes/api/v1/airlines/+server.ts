import { json, type RequestHandler } from '@sveltejs/kit';
import { findAirlines, type AirlineResponse } from '$lib/index';

/**
 * Sends the list of airlines.
 *
 * @returns {Promise<Response>} Returns airline listing
 */
export const GET: RequestHandler = async (): Promise<Response> => {
	const response: AirlineResponse[] = findAirlines();

	return json(response);
};
