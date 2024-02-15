<div id="background">
	<div class="key-and-descriptor">
		<div class="key"><span>h</span></div>
		<span>display the help screen</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>p</span></div>
		<span>display the menu to manually edit player scores</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>up arrow</span></div>
		<span>or</span>
		<div class="key"><span>w</span></div>
		<span>increase the score of the player who buzzed in last</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>down arrow</span></div>
		<span>or</span>
		<div class="key"><span>s</span></div>
		<span>decrease the score of the player who buzzed in last</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>right arrow</span></div>
		<span>or</span>
		<div class="key"><span>d</span></div>
		<span>go to the next clue window</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>left arrow</span></div>
		<span>or</span>
		<div class="key"><span>a</span></div>
		<span>go to the previous clue window</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>esc</span></div>
		<span>close the clue or window</span>
	</div>
	<div class="key-and-descriptor">
		<div class="key"><span>space bar</span></div>
		<span>activate the buzzers and start the timer for people to buzz in</span>
	</div>
</div>

<style>
	#background {
		position: absolute;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.8);
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		padding: 10%;
		gap: 5%;
	}

	.key {
		padding: 15px 18px;
		background-color: var(--grey-100);
		display: flex;
		align-content: center;
		justify-content: center;
		white-space: nowrap;
		border: 5px outset var(--secondary-200);
		border-radius: 5px;
	}

	.key-and-descriptor {
		display: flex;
		gap: 20px;
		align-items: center;
	}

	.key-and-descriptor > span {
		background-color: var(--grey-200);
		white-space: nowrap;
		padding: 15px;
		font-size: var(--size-8);
		border-radius: 5px;
	}
</style>
