import DB from '$lib/source/DB.json';
import { type Fee, type Airline, type Band, type Country, type AirlineResponse } from '$lib/index';

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
	return airline.bands
		.map((band: Band) => band.countries)
		.flat()
		.sort((a: Country, b: Country) => a.name.localeCompare(b.name)); // Sort by country name alphabetically
};

/**
 * Finds the origin country band from the corresponding bands for a given airline by its ID.
 *
 * @param {Airline} airline - The airline object.
 * @param {string} ID - The ID of the band to find.
 * @returns {Band} The found band, or undefined if not found.
 */
const findOriginCountryByID = (airline: Airline, ID: string): Band => {
	return airline.bands.find((band: Band) => band.id === ID) as Band;
};

/**
 * Finds the overweight fee for a destination country within a given origin country band.
 *
 * @param {Band} originCountry - The origin country band object.
 * @param {string} ID - The ID of the destination band to find the overweight fee for.
 * @returns {Fee} The found overweight fee, or undefined if not found.
 */
const findOverweightFeeForDestination = (originCountry: Band, ID: string): Fee => {
	return originCountry.overweightFees.find((fee: Fee) => fee.bandID === ID) as Fee;
};

/**
 * Calculates the difference between the allocated weight and the actual weight of baggage.
 *
 * @param {number} allocatedWeight - The allocated weight of baggage.
 * @param {number} actualWeight - The actual weight of baggage.
 * @returns {number} The difference between the two weights.
 */
const calculateBaggageOverweight = (allocatedWeight: number, actualWeight: number): number => {
	return actualWeight - allocatedWeight;
};

/**
 * Calculates the overweight fee for baggage based on the overweight amount and rate.
 *
 * @param {Fee} overweightRate - The fee rate for overweight baggage.
 * @param {number} overweight - The amount by which the baggage is overweight.
 * @returns {number} The calculated overweight fee.
 */
const calculateOverweightFee = (overweightRate: Fee, overweight: number): number => {
	return overweight * overweightRate.fee;
};

export {
	findAirlines,
	findAirlineByID,
	findOriginCountryByID,
	calculateOverweightFee,
	findCountriesForAirline,
	calculateBaggageOverweight,
	findOverweightFeeForDestination,
};
