<script lang="ts">
	let score = 0;

	const submitDailyDouble = () => {};
</script>

<form on:submit={submitDailyDouble}>
	<span>Your score: ${score}</span>
	<label for="bet">Wager</label>
	<input name="bet" placeholder="Enter wager" />
	<button type="submit">Submit Wager</button>
</form>
