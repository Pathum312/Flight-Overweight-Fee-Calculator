import DB from '$lib/source/DB.json';
import { type Airline, type Band, type Country, type AirlineResponse } from '$lib/index';

/**
 * Retrieves the list of airlines.
 *
 * @returns {AirlineResponse[]} The list of airlines
 */
const findAirlines = (): AirlineResponse[] => {
	return DB.map(({ bands, ...data }: Airline) => data);
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

export { findAirlines, findAirlineByID, findCountriesForAirline };
