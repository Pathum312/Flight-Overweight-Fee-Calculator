import {
	test,
	expect,
	type PlaywrightTestArgs,
	type PlaywrightTestOptions,
} from '@playwright/test';
import type { AirlineResponse, Country } from '$lib';

// Server host
const host = 'http://localhost:5173';

test.describe('GET /api/v1/airlines', async () => {
	// API endpoint
	const url = `${host}/api/v1/airlines`;

	test('should has a status of 200', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Check response status code
		expect(response.status()).toBe(200);
	});

	test('should return an array', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Response body
		const responseBody = await response.json();

		// Check response body is an array
		expect(responseBody).toBeInstanceOf(Array);
	});

	test('should return an list of airlines', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Response body
		const responseBody = await response.json();

		// Check response is an expected response
		expect(responseBody.length).toBeGreaterThan(0); // Check if response is not empty

		responseBody.forEach((airline: AirlineResponse) => {
			expect(airline).toHaveProperty('id'); // Check if id is present
			expect(airline).toHaveProperty('name'); // Check if name is present
		});
	});
});

test.describe('GET /api/v1/airlines/get-countries', async () => {
	// API endpoint
	const url = `${host}/api/v1/airlines/get-countries`;

	test('should return 400 if ID is not provided', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Check response bad request status code
		expect(response.status()).toBe(400);

		// Response body
		const responseBody = await response.json();

		// Check response message
		expect(responseBody.message).toBe('ID is required');
	});

	test('should return 404 if airline is not found', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(`${url}?id=9999`);

		// Check response not found status code
		expect(response.status()).toBe(404);

		// Response body
		const responseBody = await response.json();

		// Check response message
		expect(responseBody.message).toBe('Airline 9999 is not found');
	});

	test('should return an array', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(`${url}?id=1`);

		// Check response success status code
		expect(response.status()).toBe(200);

		// Response body
		const responseBody = await response.json();

		// Check response body is an array
		expect(responseBody).toBeInstanceOf(Array);
	});

	test('should return an list of countries', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(`${url}?id=1`);

		// Check response success status code
		expect(response.status()).toBe(200);

		// Response body
		const responseBody = await response.json();

		// Check response body is an array
		expect(responseBody.length).toBeGreaterThan(0); // Check if response is not empty

		responseBody.forEach((country: Country) => {
			expect(country).toHaveProperty('id'); // Check if id is present
			expect(country).toHaveProperty('name'); // Check if name is present
			expect(country).toHaveProperty('parentID'); // Check if parentID is present
		});
	});
});
