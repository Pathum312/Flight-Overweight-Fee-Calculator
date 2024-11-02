import { json, type RequestHandler } from '@sveltejs/kit';
import { findAirlines, type AirlineResponse } from '$lib/index';

/**
 * Sends the list of airlines.
 *
 * @returns {Promise<Response>} Returns airline listing
 */
export const GET: RequestHandler = async (): Promise<Response> => {
	// Find the list of airlines
	const foundAirlines: AirlineResponse[] = findAirlines();

	// Return the list of airlines
	return json(foundAirlines);
};
