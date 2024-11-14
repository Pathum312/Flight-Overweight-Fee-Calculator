// import { randomUUID } from 'crypto';
// import { chromium } from '@playwright/test';
import { json, type RequestHandler } from '@sveltejs/kit';
import { findAirlines, type AirlineResponse } from '$lib';

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

// export const PUT: RequestHandler = async (): Promise<Response> => {
// 	// Open a new browser
// 	const browser = await chromium.launch();
// 	// Open a new page
// 	const page = await browser.newPage();

// 	// Navigate to the page
// 	await page.goto('https://www.srilankan.com/en_uk/PlanAndBook/luggage');

// 	// Get the title from the page
// 	const bands = await page
// 		.locator('#collapseSix > div:nth-child(1) > div:nth-child(17) > p:nth-child(2)')
// 		.textContent();

// 	// Close the browser
// 	await browser.close();

// 	const regions = bands
// 		?.trim()
// 		.split('\n')
// 		.reduce((acc, line) => {
// 			const [region, countries] = line.split('–').map((part: string) => part.trim());

// 			if (region && countries) {
// 				const countryList = countries
// 					.replace(/\sand\s/g, ',') // Replace 'and' with a comma
// 					.replace(/\s*,\s*/g, ',') // Remove unnecessary spaces around commas
// 					.replace(/\s+/g, ' ') // Replace multiple spaces with a single space
// 					.split(',') // Split by commas into an array
// 					.map((country: string) => ({
// 						id: randomUUID(),
// 						name: country.trim(),
// 						parentID: region,
// 					})); // Trim each country name

// 				acc.push({ region: { name: region, countries: countryList } });
// 			}

// 			return acc;
// 		}, [] as { region: { name: string; countries: { name: string }[] } }[]);

// 	return json(regions);
// };
