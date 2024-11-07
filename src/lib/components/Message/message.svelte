<script lang="ts">
	type Props = {
		message: string; // The message to show
		onclick?: () => void; // The function to be called to close the message
	};

	let { message, onclick }: Props = $props();
</script>

<div class="info">
	<div class="info__icon">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
			<path
				fill="#e8e8e8"
				d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
			/>
		</svg>
	</div>
	<div class="info__title">{message}</div>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="info__close" {onclick}>
		<svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"
			><path
				d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
				fill="#e8e8e8"
			></path></svg
		>
	</div>
</div>

<style>
	.info {
		padding: 1rem;
		display: flex;
		margin-bottom: 1rem;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		border-radius: 0.25rem;
		background: var(--clr-soft-blue);
		box-shadow: 0px 0px 5px -3px black;
	}

	.info__icon {
		width: 1.2rem;
		height: 1.2rem;
		margin-right: 1rem;
		transform: translateY(-2px);
	}

	.info__icon path {
		fill: var(--clr-white-50);
	}

	.info__title {
		font-weight: 500;
		font-size: var(--fs-0);
		color: var(--clr-white-50);
	}

	.info__close {
		width: 1.2rem;
		height: 1.2rem;
		cursor: pointer;
		margin-left: 1rem;
	}

	.info__close path {
		fill: var(--clr-white-50);
	}
</style>
