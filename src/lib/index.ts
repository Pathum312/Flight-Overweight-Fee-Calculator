import {
	findAirlines,
	findAirlineByID,
	findCountriesForAirline,
} from '$lib/controllers/DB.controller';

// Full airline object
type Airline = {
	id: number; // ID of the airline
	name: string; // Name of the airline
	bands: Band[]; // Countries travelled to/from by the airline
};

// Response with bare minimum details of the airlines
type AirlineResponse = {
	id: number; // ID of the airline
	name: string; // Name of the airline
};

// Country group object
type Band = {
	id: string; // ID of the country group
	name: string; // Name of the country group
	countries: Country[]; // Countries in the group
	overweightFees: Fee[]; // Overweight fees for each country group
};

// Country object
type Country = {
	id: number; // ID of the country
	name: string; // Name of the country
	parentID: string; // ID of the parent band
};

// Fee Object
type Fee = {
	countryID: string; // ID of the band
	fee: number; // Charge per kg over the allocated limit (USD/KG)
};

export {
	findAirlines, // Returns a list of airlines
	findAirlineByID, // Find an airline by its ID
	findCountriesForAirline, // Retuens a list of transit countries for an airline
	type Fee,
	type Band,
	type Country,
	type Airline,
	type AirlineResponse,
};
