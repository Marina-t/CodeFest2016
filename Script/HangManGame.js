// GLOBAL VARIABLES
var Alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
                'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

var lives;
var word;
var charactersToGuess;

/* 
 * Runs at the start of a new game.
 */
function StartGame () {
	
	/* 
	 *[Task 6]: Complete the startGame function
     */


	// 1. initialize the number of lives, word, charactersToGuess 
	lives = 6;
	word = "";
	charactersToGuess = 0;

	// 2. pick word and display the correct number of spaces accordingly
	ChooseWord();

	// 3. populate the Alphabet
	PopulateAlphabet();

	// 4. re-set the final result div (empty the div)
	$("#final-result").empty();


	// 5. set up the hangman div
	$("#hangman").empty();
	var innerContainer = $("<div></div>");
	$('<div id="hangman-upperborder"></div>').appendTo(innerContainer);
	$('<div id="stickman-body"></div>').appendTo(innerContainer);
	$('<div id="stickman-legs"></div>').appendTo(innerContainer);
	$("#hangman").append(innerContainer);
}

/* 
 * Randomly chooses a word from the list of available words and displays
 * the correct number of spaces accordingly
 */
function ChooseWord () {

	/* 
	 *[Task 7]: Complete the ChooseWord function
     */

	// 1. randomly pick a word from the avilable list of words 
	//    and set the gloabal variable word to that chosen word
	var randomIndex = Math.floor(Math.random() * Words.length);
	word = Words[randomIndex];

	// 2. empty the word div, iterate over the characters in the word and for each
	//    a. if it is space --> add a new div with class word-character (for styling)
	//    b. if it is not --> add a new div with class word-character and class place-holder 
	//                        also you would need to increment characters to guess
	$("#word").empty();
	var newLetter;
	for (var i = 0; i < word.length; i++ ) {
		if (word[i] == " ") {
			newLetter = $("<div></div>").addClass("word-character"); 
		} 
		else {
			newLetter = $("<div></div>").addClass("word-character").addClass("place-holder");
			charactersToGuess++;
		}

		$("#word").append(newLetter);
	}
	
}

/* 
 * Create the alphabet buttons 
 */
function PopulateAlphabet () {
	
	/* 
	 *[Task 8]: Complete the PopulateAlphabet function
     */

	// 1. create the alphabet-list (use a ul element)
	var alphabetList = $("<ul id='alphabet-list'></ul>");

	// 2. go over each letter in the alphabet list and for each:
	//	a. create a li with id = the letter
	//  b. add class letter to the element and class active (for styling)
	//  c. attach an event to the letter so when it is clicked, Check Guess function is called
	//  d. append the current letter to the element (so the user would see it)
	var newLetter;
	for (var i = 0; i < Alphabet.length; i++) {
		newLetter = $("<li id='" + Alphabet[i].toLowerCase() + "'></li>").addClass("letter");
		newLetter.addClass("active").on("click", CheckGuess).text(Alphabet[i]);

		alphabetList.append(newLetter);
	}
	

    // 3. empty the alphabet div and attach the list you created to it
    $("#alphabet").empty().append(alphabetList);
}

/* 
 * Checks the user's guess.
 */
function CheckGuess () {

	var guessedLetter = this.id;
	$(this).off("click", CheckGuess).removeClass("active").addClass("inactive");

	var correctGuess = false;
	for (var i = 0; i < word.length; i++) {

		if (word[i] == guessedLetter) {
			charactersToGuess --;
			var child = $("#word").children()[i];  /* [TODO]: could have also used eq which returns a jquery object */ 
			$(child).removeClass("place-holder").html("<p>" + guessedLetter.toUpperCase() + "</p>");
			correctGuess = true;
		}
	} 

	if (!correctGuess) {		
		
		DrawStickMan(); 
		lives --;
	}

	CheckGameEnded();	
}

/* 
 * Draws part of the stick man according to the number of lives remaining.
 */
function DrawStickMan () {

	/* 
	 * [Task 9]: Using a switch statements, call the appropriate DrawStickMan function
	 */
	switch (lives) {

		case 6 :
			DrawStickManHead();
			break;

		case 5:
			DrawStickManTorso();
			break;

		case 4:
			DrawStickManRarm();
			break;

		case 3:
			DrawStickManLarm();
			break;

		case 2:
			DrawStickManRleg();
			break;

		case 1:
			DrawStickManLleg();
			break;

		default:
			break;
	}
	
}

function DrawStickManHead () {
	$("<div></div>").addClass("stickman-head").insertAfter("#hangman-upperborder");
}

function DrawStickManTorso () {
	$("<div></div>").addClass("stickman-torso").appendTo("#stickman-body");
}

function DrawStickManRarm () {
	$("<div></div>").addClass("stickman-rarm").prependTo("#stickman-body");
}

function DrawStickManLarm () {
	$("<div></div>").addClass("stickman-larm").prependTo("#stickman-body");
}

function DrawStickManRleg () {
	$("<div></div>").addClass("stickman-rleg").appendTo("#stickman-legs");
}

function DrawStickManLleg () {
	$("<div></div>").addClass("stickman-lleg").appendTo("#stickman-legs");
}

/*
 * Checks if the game has ended (the user has won or lost) and displays 
 * the appropriate message accordingly.
 */
function CheckGameEnded() {

	/* [Task 10]: Complete CheckGameEnded
     */ 

    var gameEnded = false;
	if (lives == 0) {
		// 1. make the final result's html be a <p> element with message:
		//    GAME OVER
		$("#final-result").html("<p>GAME OVER</p>");

		gameEnded = true;
	}
	else if (charactersToGuess == 0) {
		// 2. make the final result's html be a <p> element with message:
		//    YEAAAAY!!! YOU WON
		$("#final-result").html("<p>YEAAAAY!!! YOU WON</p>");
		gameEnded = true;
	}

	if (gameEnded) {
		$("#alphabet > ul").children().off("click", CheckGuess);
	}

}


/* [Task 5]: attach the StartGame function to both when the 
 * document is done loading and when the user clicks the play again button
 */ 
$(document).ready(function() {

	$("#play-again > button").on("click", StartGame);

	StartGame();

});