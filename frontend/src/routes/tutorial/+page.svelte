<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	enum views {
		Create = 'create',
		Edit = 'edit',
		Play = 'play'
	}

	let loggedIn = data.loggedIn;
	let view = 'create';
</script>

<NavBar {loggedIn} />

<div id="container">
	<h1>How it Works</h1>
	<div id="buttons">
		<button
			class:active={view === views.Create}
			on:click={() => {
				view = views.Create;
			}}>Create</button
		>
		<button
			class:active={view === views.Edit}
			on:click={() => {
				view = views.Edit;
			}}>Edit</button
		>
		<button
			class:active={view === views.Play}
			on:click={() => {
				view = views.Play;
			}}>Play</button
		>
	</div>

	{#if view === views.Create}
		<div id="create">
			<h2>To Start:</h2>
			<div class="block">
				<ol>
					<li>
						Go to <a href="/create">Create</a>, or from <a href="/games">Your Games</a> click
						the create game button.
					</li>
					<li>
						Enter a name for your game. If no name is entered, it will default to
						"Untitled Game".
					</li>
					<li>Select the type of game you would like to create.</li>
					<li>Create your game and start editing!</li>
				</ol>
			</div>

			<h2>Game Types</h2>
			<div class="center block">
				<div class="img-with-description">
					<div class="header-and-img">
						<h3>Standard Game</h3>
						<img src="/tutorial/standard-edit-board.png" alt="standard edit board" />
					</div>
					<p>
						A <b>standard game</b> consists of one Single Jeoparty round, one Double Jeoparty
						round and a Final Jeoparty round. You are allowed to place one daily double for
						the first round, and two for the second.
					</p>
				</div>
				<div class="img-with-description">
					<div class="header-and-img">
						<h3>Custom Game</h3>
						<img src="/tutorial/custom-edit-board.png" alt="custom edit board" />
					</div>
					<p>
						A <b>custom game</b> allows you to decide the number of rounds, categories per
						round, and clues per category, as well as the dollar values for each of the clues.
						You control the number of daily doubles per round.
					</p>
				</div>
			</div>
		</div>
	{/if}

	{#if view === views.Edit}
		<div id="edit">
			<h2>To Start:</h2>
			<div class="block block-text">
				<p>
					If you have just created a game, you should be automatically redirected to the
					edit page.
				</p>
				<p>
					If you'd like to edit an existing game, navigate to <a href="/games"
						>Your Games</a
					>, select the game you'd like to edit, and click 'Edit'.
				</p>
			</div>

			<h2>Editing a Game</h2>
			<div class="block">
				<p>
					Make sure not to navigate away from the page until your changes have saved,
					otherwise they will be lost!
				</p>
			</div>

			<div class="block">
				<div class="left">
					<img
						src="/tutorial/standard-edit-clue-open.png"
						alt="standard edit board with clue open"
					/>
					<img src="/tutorial/clue-open-edit.png" alt="clue editor" />
				</div>

				<div class="text-float text-float-right">
					<p>You can change the title of your game with the text box at the top.</p>
					<p>Buttons allow for toggling between rounds.</p>
					<p>
						To edit a clue, press the button corresponding to the clue you'd like to
						edit. To close the clue dropdown, you can press the button again.
					</p>
					<p>
						For a standard game, you have one daily double for the first round, and two
						for the second. For a custom game, you can add as many as you'd like.
					</p>
				</div>
			</div>

			<div class="float-clear block block-text">
				<p>
					Clues and categories can be rearranged by dragging and dropping. For a standard
					game, the clue values will all update automatically to align with Jeoparty
					standards. For a custom round, the clue values will not update.
				</p>
				<p>
					In a custom game, clues, categories, and rounds can be added by pressing the
					plus buttons. They can be deleted by dragging and dropping onto the trash can.
				</p>
			</div>

			<div class="block">
				<div class="right">
					<img src="/tutorial/final-jeoparty-edit.png" alt="final jeoparty edit page" />
				</div>
				<div class="text-float text-float-left">
					<p>
						For a Final Jeoparty round, fill in the text boxes provided with your
						category and clue details.
					</p>
				</div>
			</div>
		</div>
	{/if}

	{#if view === views.Play}
		<div id="play">
			<h2>To Start:</h2>
			<div class="block block-text">
				<p>
					Now that you have created a game and populated it with clues and answers, it's
					time to get your friends together (or multiple devices, we don't judge) and play
					a game!
				</p>
				<p>You will need a minimum of three other players (or devices) to play.</p>
				<p>
					As the host, you are responsible for controlling the flow of the game. Start a
					game by navigating to <a href="/games">Your Games</a>, selecting the game you'd
					like to start, and clicking the 'Play' button.
				</p>
			</div>

			<h2>Running a Game</h2>
			<div class="block">
				<div class="left">
					<img src="/tutorial/join.png" alt="join page" />
				</div>
				<div class="text-float text-float-right">
					<p>
						The game has begun! Others can join by going to <a href="/join"
							>jeoparty.net/join</a
						> on their personal devices and entering the game code shown in the top right
						corner of the screen.
					</p>
					<p>
						Once at least three players have joined the game room, a button will appear
						for you to start the game.
					</p>
				</div>
			</div>

			<h2>Normal Round</h2>
			<div class="block">
				<div class="center">
					<div class="header-and-img">
						<h3>Standard Game</h3>
						<img
							src="/tutorial/standard-board.png"
							alt="standard round standard game"
						/>
					</div>
					<div class="header-and-img">
						<h3>Custom Game</h3>
						<img src="/tutorial/custom-board.png" alt="standard round custom game" />
					</div>
				</div>
				<p>
					In a normal round, the top three players will be displayed on the bottom of the
					screen. To open a clue, click on the button that corresponds to the clue you'd
					like to open.
				</p>
			</div>

			<div class="block">
				<div class="center">
					<img src="/tutorial/clue-open.png" alt="clue open" />
					<img src="/tutorial/clue-open-buzzers.png" alt="clue open buzzers activated" />
					<img src="/tutorial/buzzer-winner.png" alt="clue open buzzer winner showing" />
				</div>
			</div>
			<div class="block block-text">
				<p>
					When the question is showing, hit space bar to activate the buzzers for the
					players and start the timer. Players will have five seconds to buzz in. The
					buzzer winner will appear in the bottom right corner of the screen. Once someone
					has won the buzz, the timer will restart, and the player will have five seconds
					to respond with their answer.
				</p>
				<p>
					If they answer correctly, hit w or the up arrow to increase the players score
					according to the value of the clue.
				</p>
				<p>
					If they answer incorrectly, hit s or the down arrow to decrease the players
					score according to the value of the clue. You can reactivate the buzzers by
					hitting space bar again to give other players an opportunity to steal!
				</p>
				<p>
					Once they have responded correctly, or if no one has buzzed in, you can press d
					or the right arrow to display the answer. Press d or the right arrow to close
					and clear the clue. You can still update the buzzer winners score until you open
					the next clue.
				</p>
				<p>
					If you accidentally click on the wrong clue, and want to close it without
					clearing it or displaying the answer, so it can be played again later, hit the
					escape key.
				</p>
				<p>
					If the clue that has been opened is a daily double, the player who chose it will
					be prompted to enter their wager on their device. Once this has been entered,
					the wager will appear on the screen, and you will be able to display the
					question.
				</p>
				<p>
					Once all clues are cleared from the board, the game will automatically move to
					the next round.
				</p>
				<p>
					If at any point, you make a mistake and need to edit a player's score, hitting p
					will bring up the players menu displaying all current player and allow for
					manual editing.
				</p>
			</div>

			<h2>Final Jeoparty Round</h2>
			<div class="block">
				<div class="right">
					<img src="/tutorial/final-jeoparty.png" alt="final jeoparty page" />
				</div>
				<div class="text-float text-float-left">
					<p>
						For Final Jeoparty, when you display the category, all players will use
						their devices to enter their wagers. Players with a $0 or negative score at
						this point will be unable to participate in Final Jeoparty. Press the right
						arrow or d to display the question, then press space bar to start the timer.
						Players will have 30 seconds to respond to the clue. At the end of the 30
						seconds, their response will be automatically submitted.
					</p>
					<p>
						Pressing the right arrow or d again will display all player answers, and
						pressing one of those keys again will display the answer to the Final
						Jeoparty clue. When you and the audience are done reviewing the responses,
						press the same key once more to go to the final podium.
					</p>
				</div>
				<div class="block">
					<p>
						All players scores will be automatically updated from their respective
						wagers and responses. <b
							>Their response must match the answer exactly, sans any special
							characters or casing differences</b
						>. For example, if the question to answer the clue is 'Where is Canada?',
						then 'where is canada' will match, but 'where is canda' is incorrect as
						there is a typo. So, if the answer, for example, is the name of a person,
						make sure the clue is very specific about what you want (specify just first
						name or last name or both).
					</p>
				</div>
			</div>

			<h2>Controls Reference</h2>
			<div class="block">
				<ul>
					<li>h: pulls up the help screen with these controls listed</li>
					<li>p: show all the players in the game - for manual editing</li>
					<li>up arrow or w: increase the score of the player who buzzed in last</li>
					<li>down arrow or s: decrease the score of the player who buzzed in last</li>
					<li>right arrow or d: go to the next clue window</li>
					<li>left arrow or a: go back to the last clue window</li>
					<li>esc: close the clue</li>
					<li>
						space bar: activate the buzzers and start the timer for people to buzz in
					</li>
				</ul>
			</div>
		</div>
	{/if}
</div>

<style>
	#container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: calc(8vh + 3%) 0;
		gap: 50px;
	}

	#create,
	#edit,
	#play {
		width: 80%;
	}

	h1,
	h2,
	h3 {
		margin: 0;
	}

	h2 {
		padding-bottom: 2%;
	}

	#container h2:first-child {
		padding-top: 0;
	}

	p,
	a,
	li {
		font-size: var(--size-9);
	}

	#buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 80%;
		gap: 5%;
	}

	#buttons button {
		padding: 1%;
		width: 100%;
		background-color: var(--grey-100);
		color: var(--black);
	}

	#buttons button.active {
		background-color: var(--secondary-400);
	}

	#buttons button:hover {
		background-color: var(--secondary-400);
	}

	#buttons button.active:hover {
		background-color: var(--secondary-500);
	}

	ol,
	ul {
		margin: 0;
	}

	li {
		line-height: 1.4em;
	}

	p {
		margin: 0.5em 0;
		text-align: justify;
	}

	.left,
	.right {
		height: 40vh;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.center {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		gap: 5%;
	}
	.center > img {
		width: 100%;
		height: auto;
	}

	.img-with-description {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 5%;
		flex-basis: 100%;
	}

	.img-with-description p {
		text-align: justify;
	}

	.header-and-img {
		display: flex;
		align-items: center;
		padding-bottom: 5%;
		gap: 20px;
		height: 35vh;
	}

	.text-float {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 40vh;
		padding: 1% 0;
	}

	.text-float-right {
		padding-left: 2%;
	}

	.text-float-left {
		padding-right: 2%;
	}

	.float-clear {
		padding: 4% 0;
		clear: both;
	}

	.block {
		padding: 1% 0 3% 0;
	}

	.block-text p:not(:last-child) {
		margin-bottom: 1.5em;
	}

	img {
		border: 2px solid var(--grey-700);
		min-height: 300px;
		width: auto;
		height: 100%;
	}
</style>
