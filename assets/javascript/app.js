// Hiding the answer choices until the game is started
$(".answer-choices").hide();

$(document).ready(function() {
	//Start button begins the game and runs the game
	$("#start-button").on("click", function () {
		// Creating an object for the game
		var triviaGame = {
			// Creating an array of the questions
			questions: [
				"Where did Michael Jordan play the majority of his NBA career?", 
				"How many national championships does UNC have?", 
				"Who is the all-time leader in total points at UNC?",
				"What player called the infamous timeout against UNC in the 1993 championship game?",
				"Who was the Most Outstanding Player in the 2017 championship game?",
				"Which two UNC players were traded for one another in the 1998 NBA Draft?",
				"What is the nickname for UNC's bench players?",
				"What song plays before every UNC game?",
				"Who did UNC beat in the 1957 championship game?",
				"Which of these UNC players did NOT win player of the year?"
			],
			// Creating an array of the answer choices for each question
			answerChoices: [
				["Washington Wizards", "Chicago Bulls", "Charlotte Hornets", "New York Knicks"],
				["7", "5", "8", "6"],
				["Michael Jordan", "Phil Ford", "Sam Perkins", "Tyler Hansbrough"],
				["Chris Webber", "Jalen Rose", "Juwan Howard", "Jimmy King"],
				["Luke Maye", "Justin Jackson", "Kennedy Meeks", "Joel Berry II"],
				["Antawn Jamison and Shammond Williams", "Vince Carter and Antawn Jamison", "Shammond Williams and Vince Carter", "Vince Carter and Ed Cota"],
				["Bluebirds", "Blue Suedes", "Blue Steel", "Blue Babies"],
				["Jump Around", "Sweet Caroline", "Remember the Name", "Seven Nation Army"],
				["Kentucky Wildcats", "UCLA Bruins", "Texas Western Miners", "Kansas Jayhawks"],
				["Antawn Jamison", "Michael Jordan", "James Worthy", "Tyler Hansbrough"]
			],
			// Creating an array of the correct answers
			correctAnswers: [
				"Chicago Bulls", "7", "Tyler Hansbrough", "Chris Webber", "Joel Berry II",
				"Vince Carter and Antawn Jamison", "Blue Steel", "Jump Around", "Kansas Jayhawks", "James Worthy"
			],
			// Creating an array of the gifs
			gifs: [
				"assets/images/jordan.gif", "assets/images/champs.gif", "assets/images/hansbrough.gif",
				"assets/images/webber.gif", "assets/images/berry.gif",
				"assets/images/carter.gif", "assets/images/steel.gif", "assets/images/jump.gif",
				"assets/images/kansas.gif", "assets/images/worthy.gif",
			],
			// Creating stats that start at 0
			totalCorrect: 0,
			totalIncorrect: 0,
			totalUnanswered: 0,
			// Creating empty strings to be used later
			round: "",
			timeLeft: "",
			intervalId: "",
			// method to run timer
			runTimer: function() {
				// Setting timer to 10 seconds
				this.timeLeft = 10;
				// Displaying timer to DOM
				$("#timer").html("<h3>Time Remaining: " + this.timeLeft + "</h3>");
				// Decrementing the time by 1 second using setInterval
				this.intervalId = setInterval(this.decrement, 1000);
			},
			// Creating method to decrement timer and displaying timer to DOM for every second
			decrement: function() {
				// Decreasing time and displaying to DOM
				triviaGame.timeLeft--;
				$("#timer").html("<h3>Time Remaining: " + triviaGame.timeLeft +
					"</h3>");
				// If time goes to 0 then run unaswered
				if (triviaGame.timeLeft === 0) {
					triviaGame.unanswered();			
				};
			},
			// Method to stop timer
			stopTimer: function() {
				clearInterval(triviaGame.intervalId);
			},
			// Emptying question and answers
			emptyQandA: function() {
				$("#question").empty();
				$(".answer-choices").empty().hide();
			},
			// Emptying gif and correct answer
			emptyMediaAndAnswer: function() {
				$("#images").empty();
				$("#correct-answer").empty();	
			},
			// Method to begin next round and to end game
			nextRound: function() {
				// Showing the answer choices
				$(".answer-choices").show();
				// Making sure all questions are being asked
				if (triviaGame.round < triviaGame.questions.length) {
					// Increasing the round number
					triviaGame.round++;
					// Running timer, media methods, emptying result and adding new question
					triviaGame.runTimer();
					triviaGame.emptyMediaAndAnswer();
					$("#result").empty();
					$("#question").html("<h3>" + 
						triviaGame.questions[triviaGame.round - 1] + "</h3>");
					// Displaying answers to their respective ids
					for (var i = 0; i < triviaGame.answerChoices[triviaGame.round - 1].length; i++) {
						$("#" + i).html(triviaGame.answerChoices[triviaGame.round -1][i]);
						$("#" + i).attr("data-text", triviaGame.answerChoices[triviaGame.round -1][i]);
					};
				  // Runs showStats when no questions are left		
				} else {
					triviaGame.showStats();
				}		
			},
			// Creating a method for guessing correct answer
			correctGuess: function() {
				triviaGame.stopTimer();
				triviaGame.emptyQandA();
				$("#result").html("<h3>Correct!</h3>");
				triviaGame.displayImage();	
				triviaGame.totalCorrect++;
				// Changing question after 5 seconds
				setTimeout(triviaGame.nextRound, 5000);
			},
			// Creating a method for guessing an incorrect answer
			incorrectGuess: function() {
				triviaGame.stopTimer();
				triviaGame.emptyQandA();
				$("#result").html("<h3>Incorrect!</h3>");
				$("#correct-answer").html("<h4>The correct answer was: " 
					+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
				triviaGame.displayImage();	
				triviaGame.totalIncorrect++;
				setTimeout(triviaGame.nextRound, 5000);
			},
			// Creating a method for not guessing an answer before the time runs out
			unanswered: function() {
				triviaGame.stopTimer();
				triviaGame.emptyQandA();
				$("#result").html("<h3>Time's Up!</h3>");
				$("#correct-answer").html("<h4>The correct answer was: " 
					+ triviaGame.correctAnswers[triviaGame.round - 1]) + "</h4>";
				triviaGame.displayImage();
				triviaGame.totalUnanswered++;
				setTimeout(triviaGame.nextRound, 5000);		
			},
			// Creating a method to diplay gif
			displayImage: function() {
				var gif = $("<img>");
				gif.addClass("gif");
				gif.attr("src", triviaGame.gifs[triviaGame.round - 1]);
				$("#images").append(gif);
			},
			// Creating a method to show stats at the end of the game
			showStats: function() {
				triviaGame.emptyQandA();	
				triviaGame.emptyMediaAndAnswer();
				$("#result").html("<h3>All done, here's how you did:</h3>");
				$("#stats").append("<h4>Total Correct: " + triviaGame.totalCorrect + "</h4>");
				$("#stats").append("<h4>Total Incorrect: " + triviaGame.totalIncorrect + "</h4>");
				$("#stats").append("<h4>Total Unanswered: " + triviaGame.totalUnanswered + "</h4>");
				$("#restart-button").html("<h2>Restart</h2>")
			},
			// Creating a method to restart game where the browser does not refresh
			restartGame: function() {
				triviaGame.round = 0;
				triviaGame.totalCorrect = 0;
				triviaGame.totalIncorrect = 0;
				triviaGame.totalUnanswered = 0;
				$("#stats").empty();
				$("#restart-button").empty();
				triviaGame.nextRound();
			}
		};

		// Removing start button once clicked
		$("#start-button").remove();
		triviaGame.round = 0;
		triviaGame.nextRound();

		// Creating function for clicking an answer choice
		$(".answer-choices").on("click", function() {
			if (($(this).attr("data-text")) === triviaGame.correctAnswers[triviaGame.round - 1]) {
				triviaGame.correctGuess();
			} else if (($(this).attr("data-text")) !== triviaGame.correctAnswers[triviaGame.round - 1]) {
				triviaGame.incorrectGuess();
			}
		});

		// Creating function for restarting the game
		$("#restart-button").on("click", function() {
			triviaGame.restartGame();
		});
	});
});