// alert("linked");

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








// ----------------------------TRIVIA GAME----------------------------

var correctAnswers = 0;
var incorrectAnswers = 0;
var unansweredQuestions = 0;
var timeRemaining = 20;
var intervalID;
var indexQandA = 0;    //index to load a different question each round without the game reset or screen refresh
var answered = false;   //variable to stop the timer if user has clicked an answer
var triviaGame = [
		{question:"How many colors are there on a Rubik's Cube?", answer:["5", "6", "7", "4"], correct: "1", image:("../images/rubik.png")},
		{question:"What is the speed of light?", answer:["8,600 miles/second","86,000 miles/second","186,000 miles/second","886,000 miles/second"], correct:"2", image:("../images/lightspeed.jpg")},
		{question:"Approximately how long does it take for sunlight to reach Earth??", answer:["45 seconds", "10 hours", "2 hours 15 minutes", "8 minutes"], correct:"3", image:("../images/sunlight.jpg")},
		{question:"What element's chemical symbol is Pb?", answer:["Potassium","Strontium","Lead","Palladium"], correct:"2", image:("../images/periodictable.png")},
		{question:"How fast can bees fly?", answer:["35 mph", "15 mph", "48 mph", "8 mph"], correct:"1", image: ("../images/bee.png")},
		{question:"What is the most abundant element in the universe?", answer:["Hydrogen", "Oxygen", "Helium", "Carbon"], correct:"0", image:("../images/universe.png")},
		{question:"The air that we breathe is mostly comprised of which ?", answer:["Carbon", "Argon", "Oxygen", "Nitrogen"], correct:"3", image:("../images/breathe.jpg")},
		{question:"What is the diameter of the Earth ?", answer:["140,000 miles", "2,500,000 miles", "8,000 miles", "25,000,000 miles"], correct:"2", image:("../images/earth.png")}	
];

function correctAnswer() {
	correctAnswers++;
	$('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({'color':'#3D414F', 'font-size':'28px'}).addClass('animated pulse infinite');
}

function incorrectAnswer() {
	incorrectAnswers++;
	$('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({'color':'#3D414F', 'font-size':'28px'}).addClass('animated pulse infinite');

}

function unAnswered() {
	unansweredQuestions++;
	$('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({'color':'#3D414F', 'font-size':'28px'}).addClass('animated pulse infinite');
}

function timer() {
	if (timeRemaining === 0) {
		clearInterval(intervalID);  
		unAnswered();
	}
	else if (answered === true) {
		clearInterval(intervalID); 
	}
	else {
		timeRemaining--;
		$('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
	}
}	

function loadQandA() {
	timeRemaining = 21;
	intervalID = setInterval(timer, 1000);
	if (answered === false){
		timer();
	}
	
	var correct = triviaGame[indexQandA].correct;
	var question = triviaGame[indexQandA].question;
	$('.question').html(question);
	for (var i = 0; i < 4; i++) {
		var answer = triviaGame[indexQandA].answer[i];
		$('.answers').append('<h4 id=' + i + '>' + answer + '</h4>');
	}
	indexQandA++;

	//  if click else if time runs out ??????	
	
	if (timeRemaining === 0) {
		answered = true;
		$('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER");
	}
	
	$( "h4" ).click(function() {
  		var id = $(this).attr('id');
  		// alert(id);
  		if (id === correct) {
  			answered = true;    // stops the timer
  			// alert("correct answer");
  			correctAnswer ();
  		}
  		else {
  			answered = true;    //stops the timer
  			// alert("incorrect answer");
  			incorrectAnswer();
  		}
	});	
	
}



function startGame() {
	console.log("game has begun");
	$('.start-button').remove();
	correctAnswers = 0;
	incorrectAnswers = 0;
	unansweredQuestions = 0;
	loadQandA ();
}		


// function resetGame()  ??????????










$('.startButton').on("click", function() {
	$('.startButton').removeClass('infinite').addClass('animated fadeOutDown');   //manages the Animate.css applied to Start Button
		startGame();

});











