<script lang="ts">
	import { onMount } from 'svelte';
	import { Text, Button, Dropdown, type AirlineResponse, type Country } from '$lib';

	const getAirlines = async (): Promise<AirlineResponse[]> => {
		// Send a GET request to the /api/v1/airlines endpoint
		const response = await fetch('/api/v1/airlines');

		// Parse the response as JSON
		const airlines: AirlineResponse[] = await response.json();

		// Return the list of airlines
		return airlines;
	};

	const getCountries = async (): Promise<Country[]> => {
		// Send a GET request to the /api/v1/airlines/get-countries endpoint
		const response = await fetch(`/api/v1/airlines/get-countries?id=${selectedAirline?.id}`);

		// Parse the response as JSON
		const countries: Country[] = await response.json();

		// Return the list of countries
		return countries;
	};

	// Get the list of airlines
	let airlines: AirlineResponse[] = $state([]);

	// Get the list of countries
	let countries: Country[] = $state([]);

	// Get the selected airline
	let selectedAirline: AirlineResponse | undefined = $state();

	// Get the selected departure country
	let selecetdDepartureCountry: Country | undefined = $state();

	// Get the selected destination country
	let selecetdDestinationCountry: Country | undefined = $state();

	onMount(async () => {
		// Get the list of airlines before the component is mounted
		airlines = await getAirlines();
	});

	$effect(() => {
		// Get the list of countries when the selected airline changes or when a airline is selected
		if (selectedAirline) {
			getCountries().then((data: Country[]) => (countries = data));
		}
	});
</script>

<form action="/calculator">
	<Dropdown
		label="AIRLINE"
		placeholder="SELECT AIRLINE"
		data={airlines}
		bind:selectedValue={selectedAirline}
	/>
	<Dropdown
		label="DEPARTURE COUNTRY"
		placeholder="SELECT COUNTRY"
		data={countries}
		bind:selectedValue={selecetdDepartureCountry}
	/>
	<Dropdown
		label="DESTINATION COUNTRY"
		placeholder="SELECT COUNTRY"
		data={countries}
		bind:selectedValue={selecetdDestinationCountry}
	/>
	<Text label="ALLOCATED WEIGHT (KG)" placeholder="ENTER WEIGHT" />
	<Text label="ACTUAL WEIGHT (KG)" placeholder="ENTER WEIGHT" />
	<Button />
	<Text label="BAGGAGE OVERWEIGHT FEE (USD)" placeholder="$0" />
</form>

<style>
	form {
		padding: 1rem;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
