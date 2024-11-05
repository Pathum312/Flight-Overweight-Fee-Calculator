<script lang="ts">
	let { alignment = 'center', content, fontSize = 'medium' } = $props();
</script>

<header class="{alignment} {fontSize}">
	{content}
</header>

<style>
	header {
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
		font-size: var(--fs-heading--2);
	}

	.medium {
		font-size: var(--fs-heading--1);
	}

	.large {
		font-size: var(--fs-heading-0);
	}
</style>
