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

	{#if view === views.Create}
		<p>Go to create or from your games click the create game button.</p>
		<p>
			Enter a name for your game. If no name is entered, it will default to "Untitled Game".
		</p>
		<p>Select the type of game you would like to create.</p>
		<p>
			A standard game is the same as what you would see in the TV show Jeopardy: one single
			Jeoparty round, one double Jeoparty round and a final jeoparty round.
		</p>
		<p>
			A custom game allows you to decide the number of rounds, categories per round and clues
			per category, as well as the dollar values for each of the clues.
		</p>
		<p>Create your game and start editing!</p>
	{/if}
	{#if view === views.Edit}
		<p>
			If you have just created a game, you should be automatically redirected to the edit
			page.
		</p>
		<p>
			If you'd like to edit an existing game, navigate to the 'Your Games' page, select the
			game you'd like to edit, and click 'Edit'.
		</p>
		<p>You can change the title of your game with the text box at the top.</p>
		<p>Buttons allow for toggling between rounds.</p>
		<p>
			To edit a clue, press the button corresponding to the clue you'd like to edit. To close
			the clue dropdown, you can press the button again.
		</p>
		<p>
			For a standard game, you have the number of daily doubles allowed as per standard
			Jeopardy rules. For a custom game, you can add as many as you'd like.
		</p>
		<p>
			Clues and categories can be rearranged by dragging and dropping. For a standard round,
			the clue values will all update automatically to align with Jeopardy standards. For a
			custom round, the clue values will not update.
		</p>
		<p>
			In a custom round, clues, categories, and rounds can be added by pressing the plus
			buttons. They can be deleted by dragging and dropping onto the trash can.
		</p>
		<p>
			Make sure not to navigate away from the page until your changes have saved otherwise
			they will be lost!
		</p>
	{/if}
	{#if view === views.Play}
		<p>
			Now that you have created a game and populated it with clues and answers, it's time to
			get your friends together (or multiple devices, we don't judge) and play a game!
		</p>
		<p>You will need a minimum of three other players (or devices) to play.</p>
		<p>As the host, you are responsible for controlling the flow of the game.</p>
		<p>
			Start a game by navigating to the 'Your Games' page, selecting the game you'd like to
			start, and clicking the 'Play' button.
		</p>
		<p>
			The game has begun! Others can join by going to jeoparty.net/join on their personal
			devices and entering the game code shown in the top right corner of the screen.
		</p>
		<p>Once at least three players have joined the game room, you can start the game.</p>
		<p>
			In a standard round, to open a clue, click on the button that corresponds to the clue
			you'd like to open.
		</p>
		<p>
			When the question is showing, hit space bar to activate the buzzers for the players and
			start the timer. Players will have five seconds to buzz in. The buzzer winner will
			appear in the bottom right corner of the screen. Once someone has won the buzz, the
			timer will restart, and the player will have five seconds to respond with their answer.
		</p>
		<p>
			If they answer correctly, hit w or the up arrow to increase the players score according
			to the value of the clue.
		</p>
		<p>
			If they answer incorrectly, hit s or the down arrow to decrease the players score
			according to the value of the clue. You can reactivate the buzzers by hitting space bar
			again to give other players an opportunity to steal!
		</p>
		<p>
			Once they have responded correctly, or if no one has buzzed in, you can press d or the
			right arrow to display the answer. Press d or the right arrow to close and clear the
			clue. You can still update the buzzer winners score until you open the next clue.
		</p>
		<p>
			If you accidentally click on the wrong clue, and want to close it without clearing it or
			displaying the answer, so it can be played again later, hit the escape key.
		</p>
		<p>
			If the clue that has been opened is a daily double, the player who chose it will be
			prompted to enter their wager on their device. Once this has been entered, the buzzer
			winners icon will change colours, and you will be able to display the question.
		</p>
		<p>
			Once all clues are cleared from the board, the game will automatically move to the next
			round.
		</p>
		<p>
			If at any point, you make a mistake and need to edit a player's score, hitting p will
			bring up the players menu displaying all current player and allow for manual editing.
		</p>
		<p>
			For final jeoparty, when you display the category, all players will have a screen on
			their devices to enter their wagers. Players with a 0 or a negative score at this point
			will be unable to participate in final jeoparty. Press the right arrow or d to display
			the question, and press space bar to start the timer. Players will have 30 seconds to
			respond to the clue. At the end of the 30 seconds, their response will be automatically
			submitted.
		</p>
		<p>
			Pressing the right arrow or d again will display all player answers, and pressing one of
			those keys again will display the answer to the final jeoparty clue.
		</p>
		<p>
			All players scores will be automatically updated from their respective wagers and
			responses. Thus, their response must match the answer exactly, sans any special
			characters or casing differences. For example, 'Where is Canada?' and 'where is canada'
			will match, but 'where is canada?' and 'where is canda' is incorrect as there is a typo.
			So, if the answer, for example, is the name of a person, make sure the clue is very
			specific about what you want (specify just first name or last name or both).
		</p>
		<p>A quick reference for the controls are:</p>
		<ul>
			<li>h: pulls up the help screen with these controls listed</li>
			<li>p: show all the players in the game - for manual editing</li>
			<li>up arrow or w: increase the score of the player who buzzed in last</li>
			<li>down arrow or s: decrease the score of the player who buzzed in last</li>
			<li>right arrow or d: go to the next clue window</li>
			<li>left arrow or a: go back to the last clue window</li>
			<li>esc: close the clue</li>
			<li>space bar: activate the buzzers and start the timer for people to buzz in</li>
		</ul>
	{/if}
</div>

<style>
	h1 {
		margin: 0;
	}
</style>
