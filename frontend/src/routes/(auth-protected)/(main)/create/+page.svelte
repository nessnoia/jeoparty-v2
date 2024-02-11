<script lang="ts">
	import { enhance } from '$app/forms';

	let gameType = 'standard';
</script>

<div id="container">
	<h1>Create New Game</h1>
	<form method="POST" use:enhance>
		<div id="create-form">
			<div id="title">
				<label for="title">Title: </label>
				<div />
				<input name="title" type="text" />
			</div>

			<div id="radio-buttons">
				<label for="radio">Type:</label>
				<div id="buttons">
					<div class:active={gameType === 'standard'} class="radio-option">
						<label for="standard">Standard</label>
						<input
							bind:group={gameType}
							name="type"
							type="radio"
							id="standard"
							value="standard"
							checked
						/>
					</div>

					<div class:active={gameType === 'custom'} class="radio-option">
						<label for="custom">Custom</label>
						<input
							bind:group={gameType}
							name="type"
							type="radio"
							id="custom"
							value="custom"
						/>
					</div>
				</div>
			</div>
			<!-- <label>
		Tags
		<input type="text" />
	</label> -->
			<button id="create" type="submit">Create</button>
		</div>
	</form>
</div>

<style>
	h1 {
		text-align: center;
		margin: 0;
	}

	#container {
		padding: 10% var(--gutter-size-other);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		height: 92%;
		gap: 7%;
	}

	form {
		height: 32%;
		width: 60%;
	}

	#create-form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: start;
		height: 100%;
		gap: 10px;
	}

	#title {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 3em;
		width: 100%;
	}

	#title input {
		flex-grow: 1;
	}

	#radio-buttons {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 5.8em;
		width: 100%;
	}

	#radio-buttons {
		flex-grow: 1;
	}

	#buttons {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		gap: 1em;
	}

	.radio-option {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 2% 3%;
		border: 1px solid var(--black);
		border-radius: 0.2em;
		width: 50%;
	}

	.radio-option input {
		appearance: none;
		border: none;
		background-color: transparent;
		position: fixed;
		opacity: 0;
		pointer-events: none;
	}

	.radio-option input:checked {
		background-color: transparent;
	}

	.radio-option.active {
		border: 3px solid var(--black);
		border-radius: 0.2em;
	}

	.radio-option label {
		color: var(--black);
		text-transform: uppercase;
		text-align: center;
		width: 100%;
	}

	.radio-option.active label {
		font-weight: bold;
	}

	#create {
		width: 100%;
	}

	#create:hover {
		cursor: pointer;
	}
</style>
