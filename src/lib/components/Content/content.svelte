<main>
	<slot />
</main>

<style>
	main {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--clr-white-100);
		background-image: linear-gradient(
				90deg,
				transparent 50px,
				var(--clr-pale-red) 50px,
				var(--clr-pale-red) 52px,
				transparent 52px
			),
			linear-gradient(#e1e1e1 0.1em, transparent 0.1em);
		background-size: 100% 30px;
	}
</style>
