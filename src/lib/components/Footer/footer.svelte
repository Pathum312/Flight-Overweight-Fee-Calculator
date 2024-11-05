<script lang="ts">
	let { alignment = 'center', content, fontSize = 'medium' } = $props();
</script>

<footer class="{alignment} {fontSize}">
	{content}
</footer>

<style>
	footer {
		padding: 1rem;
		display: flex;
		color: var(--clr-dark-blue);
		background-color: var(--clr-soft-blue);
	}

	/* Align the header items to the left, center or right */
	.center {
		align-items: center;
		justify-content: center;
	}

	.left {
		align-items: flex-start;
		justify-content: flex-start;
	}

	.right {
		align-items: flex-end;
		justify-content: flex-end;
	}

	/* Font Sizes for header */
	.small {
		font-size: var(--fs--1);
	}

	.medium {
		font-size: var(--fs-0);
	}

	.large {
		font-size: var(--fs-1);
	}
</style>
