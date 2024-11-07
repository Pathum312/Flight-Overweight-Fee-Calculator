<script lang="ts">
	import { onMount } from 'svelte';
	import { preventDefault } from 'svelte/legacy';
	import { Text, Button, Dropdown, type AirlineResponse, type Country } from '$lib';

	let countries: Country[] = $state([]); // The list of countries
	let airlines: AirlineResponse[] = $state([]); // The list of airlines
	let actualWeight: number | undefined = $state(); // The actual weight of baggage
	let overweightFee: string | undefined = $state(); // The overweight fee for the baggage
	let allocatedWeight: number | undefined = $state(); // The allocated weight of baggage
	let selectedAirline: AirlineResponse | undefined = $state(); // The selected airline
	let selecetdDepartureCountry: Country | undefined = $state(); // The selected departure country
	let selecetdDestinationCountry: Country | undefined = $state(); // The selected destination country

	const getAirlines = async () => {
		// Send a GET request to the /api/v1/airlines endpoint
		const response = await fetch('/api/v1/airlines');

		// Parse the response as JSON
		airlines = await response.json();
	};

	const getCountries = async () => {
		// Send a GET request to the /api/v1/airlines/get-countries endpoint
		const response = await fetch(`/api/v1/airlines/get-countries?id=${selectedAirline?.id}`);

		// Parse the response as JSON and assign it to the countries variable
		countries = await response.json();
	};

	// Validate selection
	const validateSelection = (value: any, message: string) => {
		if (typeof value === 'string') {
			alert(message);
			return false;
		}
		return true;
	};

	const calculateOverweightFee = async () => {
		// Check if an airline is selected
		if (!validateSelection(selectedAirline, 'Please select an airline')) return;

		// Check if departure country is selected
		if (!validateSelection(selecetdDepartureCountry, 'Please select a departure country')) return;

		// Check if destination country is selected
		if (!validateSelection(selecetdDestinationCountry, 'Please select a destination country'))
			return;

		// Send a POST request to the /api/v1/airlines/calculate-overweight-fee endpoint
		const response = await fetch('api/v1/airlines/calculate-overweight-fee', {
			method: 'POST',
			body: JSON.stringify({
				id: selectedAirline?.id,
				from: selecetdDepartureCountry?.parentID,
				to: selecetdDestinationCountry?.parentID,
				allocatedWeight,
				actualWeight,
			}),
			headers: {
				'content-type': 'application/json',
			},
		});

		// Parse the response as JSON
		const data = await response.json();

		// Assign the overweight fee to the overweightFee variable
		overweightFee = `$${data.overweightFee}`;
	};

	onMount(getAirlines);
</script>

<form onsubmit={preventDefault(calculateOverweightFee)}>
	<Dropdown
		label="AIRLINE"
		placeholder="SELECT AIRLINE"
		options={airlines}
		onchange={getCountries}
		bind:selectedValue={selectedAirline}
	/>
	<Dropdown
		label="DEPARTURE COUNTRY"
		placeholder="SELECT COUNTRY"
		options={countries}
		bind:selectedValue={selecetdDepartureCountry}
	/>
	<Dropdown
		label="DESTINATION COUNTRY"
		placeholder="SELECT COUNTRY"
		options={countries}
		bind:selectedValue={selecetdDestinationCountry}
	/>
	<Text label="ALLOCATED WEIGHT (KG)" placeholder="ENTER WEIGHT" bind:weight={allocatedWeight} />
	<Text label="ACTUAL WEIGHT (KG)" placeholder="ENTER WEIGHT" bind:weight={actualWeight} />
	<Button />
	<Text label="BAGGAGE OVERWEIGHT FEE (USD)" placeholder="$0" bind:weight={overweightFee} />
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
