<script lang="ts">
	type Props = {
		label?: string;
	};

	let { label = 'CALCULATE' }: Props = $props();
</script>

<button type="submit">
	<span class="button_top">{label}</span>
</button>

<style>
	button {
		--button_radius: 0.75em;
		--button_color: var(--clr-white-100);
		--button_outline_color: black;
		border: none;
		cursor: pointer;
		margin: 1rem 0 1rem 0;
		font-size: var(--fs-0);
		border-radius: var(--button_radius);
		background: var(--button_outline_color);
	}

	.button_top {
		display: block;
		font-weight: bold;
		padding: 0.75em 1.5em;
		box-sizing: border-box;
		transform: translateY(-0.2em);
		background: var(--button_color);
		transition: transform 0.1s ease;
		color: var(--button_outline_color);
		border-radius: var(--button_radius);
		border: 2px solid var(--button_outline_color);
	}

	button:hover .button_top {
		/* Pull the button upwards when hovered */
		transform: translateY(-0.33em);
	}

	button:active .button_top {
		/* Push the button downwards when pressed */
		transform: translateY(0);
	}
</style>
