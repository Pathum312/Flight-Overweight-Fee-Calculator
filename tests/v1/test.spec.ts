import {
	test,
	expect,
	type PlaywrightTestArgs,
	type PlaywrightTestOptions,
} from '@playwright/test';

// Server host
const host = 'http://localhost:5173';

test.describe('GET /api/v1/airlines', async () => {
	// API endpoint
	const url = `${host}/api/v1/airlines`;

	// Expected response
	const expectedResponse = [
		{
			id: 1,
			name: 'Sri Lanka Airlines',
		},
		{
			id: 2,
			name: 'Singapore Airlines',
		},
		{
			id: 3,
			name: 'Emirates Airlines',
		},
		{
			id: 4,
			name: 'Qatar Airlines',
		},
	];

	test('should has a status of 200', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Check response status code
		expect(response.status()).toBe(200);
	});

	test('response should be an array', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Response body
		const responseBody = await response.json();

		// Check response body is an array
		expect(responseBody).toBeInstanceOf(Array);
	});

	test('response should be equal to the expected response', async ({
		request,
	}: PlaywrightTestArgs & PlaywrightTestOptions) => {
		// Send GET request
		const response = await request.get(url);

		// Response body
		const responseBody = await response.json();

		// Check response is equal to the expected response
		expect(responseBody).toEqual(expectedResponse);
	});
});
