var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 120;
var t;
var questions = [{
	question: "What is the national animal of Scotland?",
	choices: ["Unicorn", "Leapercon", "Wild Turkey"],
	correctAnswer: 0
}, {
	question: " Do Unicorns have magical powers? ",
	choices: ["Yes", "No"], 
	correctAnswer: 0
}, {
	question: "What is the name for the study or belief in unicorns?",
	choices: ["Unicornology", "Unicornomancy", "Unicornology"],
	correctAnswer: 0
}, {
	question: "What animal is commonly mistaken for Unicorn?",
	choices: ["Rhino", "Horse", "Narwhale"],
	correctAnswer: 0
}, {
	question: "What country was a unicorn liar recently discovered in?",
	choices: ["USA", "China", "North Korea"],
	correctAnswer: 2
}, {
	question: "What is the term used to describe a group of unicorns?",
	choices: ["Herd" , "Pack", "Blessing"],
	correctAnswer: 1
}, {
	question: "In ancient mythology, what was believed to be the natural enemy of a unicorn?",
	choices: ["Mermaid", "Griffin", "Centaur"],
	correctAnswer: 2
}, {
	question: "Is a Unicorn fart a rainbow?",
	choices: [ "Yes" , "No"],
	correctAnswer: 0
}, {
	question: "What is the common color for Unicorns?",
	choices: ["Black", "White", "Red"],
	correctAnswer: 1
}, {
	question: "In which mythology are unicorns often mentioned?",
	choices: ["Norse ", "Egyptian", "Greek"],
	correctAnswer: 0
}];


$(document).ready(function () {
	displayCurrentQuestion();
	$(this).find(".quizMessage").hide();
	$(this).find(".preButton").attr('disabled', 'disabled');

	timedCount();

	$(this).find(".preButton").on("click", function () {

		if (!quizOver) {
			if (currentQuestion == 0) { return false; }

			if (currentQuestion == 1) {
				$(".preButton").attr('disabled', 'disabled');
			}

			currentQuestion--;
			if (currentQuestion < questions.length) {
				displayCurrentQuestion();

			}
		} else {
			if (viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults();
		}
	});


	$(this).find(".nextButton").on("click", function () {
		if (!quizOver) {

			var val = $("input[type='radio']:checked").val();

			if (val == undefined) {
				$(document).find(".quizMessage").text("You have to pick something");
				$(document).find(".quizMessage").show();
			}
			else {
				$(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) {
					correctAnswers++;
				}
				iSelectedAnswer[currentQuestion] = val;

				currentQuestion++;
				if (currentQuestion >= 1) {
					$('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) {
					displayCurrentQuestion();

				}
				else {
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					c = 185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").text("Play Again?");
					quizOver = true;
					return false;

				}
			}

		}
		else {
			quizOver = false;
			$('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
			$(document).find(".nextButton").text("Next");
			$(document).find(".preButton").text("Previous");
			$(".preButton").attr('disabled', 'disabled');
			resetQuiz();
			viewingAns = 1;
			displayCurrentQuestion();
			hideScore();
		}
	});
});


function timedCount() {
	if (c == 185) {
		return false;
	}

	var hours = parseInt(c / 3600) % 24;
	var minutes = parseInt(c / 60) % 60;
	var seconds = c % 60;
	var result = ( minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	$('#timer').html(result);

	if (c == 0) {
		displayScore();
		$('#iTimeShow').html('Quiz Time Completed!');
		$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
		c = 125;
		$(document).find(".preButton").text("View Answer");
		$(document).find(".nextButton").text("Play Again?");
		quizOver = true;
		return false;

	}


	c = c - 1;
	t = setTimeout(function () {
		timedCount()
	}, 2000);
}

function displayCurrentQuestion() {

	if (c == 185) { c = 18
0; timedCount(); }
	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;
	$(questionClass).text(question);
	$(choiceList).find("li").remove();
	var choice;


	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];

		if (iSelectedAnswer[currentQuestion] == i) {
			$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
		} else {
			$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
		}
	}
}

function resetQuiz() {
	currentQuestion = 0;
	correctAnswers = 0;
	hideScore();
}

function displayScore() {
	$(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
	$(document).find(".quizContainer > .result").show();
}

function hideScore() {
	$(document).find(".result").hide();
}

function viewResults() {

	if (currentQuestion == 10) { currentQuestion = 0; return false; }
	if (viewingAns == 1) { return false; }

	hideScore();
	var question = questions[currentQuestion].question;
	var questionClass = $(document).find(".quizContainer > .question");
	var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;
	$(questionClass).text(question);
	$(choiceList).find("li").remove();
	var choice;


	for (i = 0; i < numChoices; i++) {
		choice = questions[currentQuestion].choices[i];

		if (iSelectedAnswer[currentQuestion] == i) {
			if (questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
			}
		} else {
			if (questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
			}
		}
	}

	currentQuestion++;

	setTimeout(function () {
		viewResults();
	}, 2500);
}
