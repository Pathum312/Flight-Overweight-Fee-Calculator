<script lang="ts">
	let { label = 'EXAMPLE', placeholder = 'TYPE HERE' } = $props();
</script>

<div class="container">
	<input {placeholder} class="text-input smooth-type" type="text" id="input" />
	<label class="input-label" for="input">{label}</label>
</div>

<style>
	.container {
		width: 15.625rem;
		position: relative;
		font-family: monospace;
		margin: 2.5rem 2.5rem 1rem 0;
	}

	.text-input {
		width: 100%;
		outline: none;
		color: black;
		overflow: hidden;
		border-radius: 0;
		font-weight: bold;
		position: relative;
		padding: 0.9375rem;
		font-size: var(--fs-0);
		background-color: white;
		border: 0.25rem solid black;
		box-shadow:
			0.3125rem 0.3125rem 0 black,
			0.625rem 0.625rem 0 var(--clr-soft-blue);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	@keyframes glitch {
		0% {
			transform: translate(0);
		}
		20% {
			transform: translate(-0.125rem, 0.125rem);
		}
		40% {
			transform: translate(-0.125rem, -0.125rem);
		}
		60% {
			transform: translate(0.125rem, 0.125rem);
		}
		80% {
			transform: translate(0.125rem, -0.125rem);
		}
		100% {
			transform: translate(0);
		}
	}

	.text-input:focus {
		animation:
			focus-pulse 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite,
			glitch 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
	}

	.text-input:focus::after {
		content: '';
		z-index: -1;
		top: -0.125rem;
		left: -0.125rem;
		right: -0.125rem;
		bottom: -0.125rem;
		position: absolute;
		background: white;
	}

	.text-input:focus::before {
		top: 0;
		left: 0;
		z-index: -2;
		content: '';
		width: 100%;
		height: 100%;
		position: absolute;
		background: black;
		clip-path: inset(0 100% 0 0);
		animation: glitch-slice 4s steps(2, end) infinite;
	}

	@keyframes glitch-slice {
		0% {
			clip-path: inset(0 100% 0 0);
		}
		10% {
			clip-path: inset(0 5% 0 0);
		}
		20% {
			clip-path: inset(0 80% 0 0);
		}
		30% {
			clip-path: inset(0 10% 0 0);
		}
		40% {
			clip-path: inset(0 50% 0 0);
		}
		50% {
			clip-path: inset(0 30% 0 0);
		}
		60% {
			clip-path: inset(0 70% 0 0);
		}
		70% {
			clip-path: inset(0 15% 0 0);
		}
		80% {
			clip-path: inset(0 90% 0 0);
		}
		90% {
			clip-path: inset(0 5% 0 0);
		}
		100% {
			clip-path: inset(0 100% 0 0);
		}
	}

	.input-label {
		z-index: 1;
		color: white;
		top: -2.1875rem;
		left: -0.1875rem;
		font-weight: bold;
		position: absolute;
		font-size: var(--fs--1);
		transform: rotate(-1deg);
		background-color: black;
		padding: 0.3125rem 0.625rem;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.text-input:focus + .input-label {
		transform: rotate(0deg) scale(1.05);
		background-color: var(--clr-soft-blue);
	}

	.smooth-type {
		overflow: hidden;
		position: relative;
	}

	.smooth-type::before {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		opacity: 0;
		content: '';
		position: absolute;
		transition: opacity 0.3s ease;
		background: linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0) 100%);
	}

	.smooth-type:focus::before {
		opacity: 1;
		animation: type-gradient 2s linear infinite;
	}

	@keyframes type-gradient {
		0% {
			background-position: 18.75rem 0; /* 300px */
		}
		100% {
			background-position: 0 0;
		}
	}

	.text-input::placeholder {
		color: #888;
		transition: color 0.3s ease;
	}

	.text-input:focus::placeholder {
		color: transparent;
	}

	.text-input:focus {
		animation: focus-pulse 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
	}

	@keyframes focus-pulse {
		0%,
		100% {
			border-color: black;
		}
		50% {
			border-color: var(--clr-soft-blue);
		}
	}
</style>
