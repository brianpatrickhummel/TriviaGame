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


var triviaGame = {
	triviaQuestions: {
		one: {question:"How many colors are there on a Rubik's Cube?", answer:["6", "5", "7", "4"], image: ("")},
		two: {question:"What is the speed of light?", answer:["186,000 miles/second","8,600 miles/second","86,000 miles/second","886,000 miles/second"], image: ("")},
		three: {question:"Approximately how long does it take for sunlight to reach Earth??", answer:["8 minutes", "45 seconds", "10 hours", "2 hours 15 minutes"], image: ("4")},
		four: {question:"What element's chemical symbol is Pb?", answer:["Lead","Potassium","Strontium","Palladium"], image: ("")},
		five: {question:"How fast can bees fly?", answer:["15 mph", "35 mph", "48 mph", "8 mph"], image: ("")},
		six: {question:"What is the most abundant element in the universe?", answer:["Hydrogen", "Oxygen", "Helium", "Carbon"], image: ("")},
		seven: {question:"The air that we breathe is mostly comprised of which ?", answer:["Nitrogen", "Carbon", "Argon", "Oxygen" ], image: ("")},
		eight: {question:"What is the diameter of the Earth?", answer:["8,000 miles", "140,000 miles", "2,500,000 miles", "25,000,000 miles"], image: ("")}	
	},   //end of Questions Object

	timeRemaining: 12,
	correctAnswers: 0,
	incorrectAnswers: 0,
	startGame: function() {
		// alert("game has begun");
	},
	loadQuestion: function() {

	},
	resetGame: function() {

	},

};  // end of Trivia Game MAIN Object

$('.startButton').on("click", function() {
	$('.startButton').removeClass('infinite').addClass('animated fadeOutDown');   //manages the Animate.css applied to Start Button
	triviaGame.startGame();

});





