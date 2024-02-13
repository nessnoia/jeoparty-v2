<script lang="ts">
	export let name: string;
	export let score: number;
</script>

<div class="player-card">
	<div class="player-score">
		<span>$ {score}</span>
	</div>
	<div class="player-name">
		<span>{name}</span>
	</div>
</div>

<style>
	.player-card {
		background-color: var(--primary-600);
		color: var(--white);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		border: var(--border-style);
	}

	.player-score {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 2%;
		height: 80%;
	}

	.player-score span {
		font-size: var(--size-5);
		font-weight: bold;
	}

	.player-name {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 40%;
		width: 100%;
		border-top: 1px solid var(--primary-100);
	}

	.player-name span {
		font-size: var(--size-8);
	}
</style>
