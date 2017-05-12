// alert("linked");




// ----------------------------TRIVIA GAME----------------------------

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var timeRemaining = 16;
var intervalID = null;
var indexQandA = 0;    //index to load a different question each round without the game reset or screen refresh
var answered = false;  //variable to stop the timer if user has clicked an answer
var correct;
var triviaGame = [
		{question:"HOW MANY COLORS ARE THERE ON A RUBIK'S CUBE ?", answer:["5", "6", "7", "4"], correct: "1", image:("assets/images/rubik.png")},
		{question:"WHAT IS THE SPEED OF LIGHT ?", answer:["8,600 MILES per SECOND","86,000 MILES per SECOND","186,000 MILES per SECOND","886,000 MILES per SECOND"], correct:"2", image:("assets//images/lightspeed.jpg")},
		{question:"APPROXIMATELY HOW LONG DOES IT TAKE FOR SUNLIGHT TO REACH THE EARTH ?", answer:["45 SECONDS", "10 HOURS", "2 HOURS 15 MINUTES", "8 MINUTES"], correct:"3", image:("assets//images/sunlight.jpg")},
		{question:"WHAT ELEMENT'S CHEMICAL SYMBOL IS Pb ?", answer:["POTASSIUM","STRONTIUM","LEAD","PALLADIUM"], correct:"2", image:("assets//images/periodictable.png")},
		{question:"HOW FAST CAN BEES FLY ?", answer:["35 MPH", "15 MPH", "48 MPH", "8 MPH"], correct:"1", image: ("assets/images/bee.png")},
		{question:"WHAT IS THE MOST ABUNDANT ELEMENT IN THE UNIVERSE ?", answer:["HYDROGEN", "OXYGEN", "HELIUM", "CARBON"], correct:"0", image:("assets//images/universe.png")},
		{question:"THE AIR THAT WE BREATHE IS COMPRISED MOSTLY OF WHAT ELEMENT ?", answer:["CARBON", "ARGON", "OXYGEN", "NITROGEN"], correct:"3", image:("assets//images/breathe.jpg")},
		{question:"WHAT IS THE DIAMETER OF THE EARTH ?", answer:["140,000 MILES", "2,500,000 MILES", "8,000 MILES", "25,000,000 MILES"], correct:"2", image:("assets//images/earth.png")}	
];

// ------------- FUNCTION DECLARATIONS ----------------------------


function startGame() {
	console.log("game has begun");
	$('.start-button').remove();
	correctAnswers = 0;
	incorrectAnswers = 0;
	unansweredQuestions = 0;
	loadQandA ();
}		

function loadQandA() {
	// console.log(correctAnswers);
	// console.log(incorrectAnswers);
	// console.log(unansweredQuestions);
	// console.log(indexQandA);
	answered = false;    // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
	timeRemaining = 16;
	intervalID = setInterval(timer, 1000);
	if (answered === false){
		timer();
	}
	correct = triviaGame[indexQandA].correct;
	var question = triviaGame[indexQandA].question;
	$('.question').html(question);
	for (var i = 0; i < 4; i++) {
		var answer = triviaGame[indexQandA].answer[i];
		$('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
	}
	
	$( "h4" ).click(function() {
  		var id = $(this).attr('id');
  		// alert(id);
  		if (id === correct) {
  			answered = true;    // stops the timer
  			$('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
  			correctAnswer ();
  		}
  		else {
  			answered = true;    //stops the timer
  			$('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
  			incorrectAnswer();
  		}
	});		
}

function timer() { 
	if (answered === true) {
		clearInterval(intervalID); 
	}

	else if (timeRemaining === 0) {
		answered = true;
		clearInterval(intervalID);  
		$('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
		unAnswered();
	}

	else {
		timeRemaining--;
		$('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE').removeClass('animated pulse infinite');
	}
}	

function correctAnswer() {
	correctAnswers++;
	$('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({'color':'#3D414F'}).addClass('animated pulse infinite');
	resetRound();
}

function incorrectAnswer() {
	incorrectAnswers++;
	$('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({'color':'#3D414F'}).addClass('animated pulse infinite');
	resetRound();

}

function unAnswered() {
	unansweredQuestions++;
	$('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({'color':'#3D414F'}).addClass('animated pulse infinite');
	resetRound();
}

function resetRound() {
	$('.answersAll').remove();
	$('.answers').append('<img class=answerImage src="' + triviaGame[indexQandA].image + ' ">');   // adds answer image
	indexQandA++;   								// increments index which will load next question when loadQandA() is called again
	if (indexQandA < triviaGame.length) {
		setTimeout(function(){ loadQandA(); $('.answerImage').remove();}, 5000);         // removes answer image from previous round
	}
	else {
		setTimeout(function(){ 
			$('.question').remove();
			$('.timeRemaining').remove();
			$('.answerImage').remove(); 
			$('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
			$('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
			$('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
			setTimeout(function(){ location.reload(); }, 7000);    
		}, 5000);  
	}
}





// ----------------------- MAIN PROCESS ---------------------


$('.startButton').on("click", function() {
	$('.startButton').removeClass('infinite').addClass('animated fadeOutDown');   //manages the Animate.css applied to Start Button
		startGame();

});








// -----------------------------Background Gradient JS---------------------

var colors = new Array(
  [77,99,77],
  [178,158,135],
  [138,146,178],
  [178,77,77],
  [204,194,160],
  [178,172,149],
  [204,174,160]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);







