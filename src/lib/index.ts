import {
	findAirlines,
	findAirlineByID,
	findOriginCountryByID,
	calculateOverweightFee,
	findCountriesForAirline,
	calculateBaggageOverweight,
	findOverweightFeeForDestination,
} from '$lib/controllers/DB.controller';
import { Header, Footer, Content, Card, Form, Text, Button } from './components';

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
	bandID: string; // ID of the band
	fee: number; // Charge per kg over the allocated limit (USD/KG)
};

// POST request
type POSTRequest = {
	id: number; // ID of the airline
	from: string; // ID of the origin country
	to: string; // ID of the destination country
	allocatedWeight: number; // Weight allocated by the airline
	actualWeight: number; // Actual weight of the baggage
};

export {
	findAirlines, // Returns a list of airlines
	findAirlineByID, // Find an airline by its ID
	findOriginCountryByID, // Find the origin country by its ID
	calculateOverweightFee, // Calculate the overweight fee
	findCountriesForAirline, // Retuens a list of transit countries for an airline
	calculateBaggageOverweight, // Calculates the baggage overweight
	findOverweightFeeForDestination, // Returns the overweight fee for a given destination
	type Fee,
	type Band,
	type Country,
	type Airline,
	type POSTRequest,
	type AirlineResponse,
	Text, // Text Input UI Component
	Card, // Card UI Component
	Form, // Form UI Component
	Header, // Header UI Component
	Footer, // Footer UI Component
	Button, // Button UI Component
	Content, // Content UI Component
};
