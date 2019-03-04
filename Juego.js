$(document).ready(function() {


	let currentQ;		

	let correctAnswer;	
	let wrongAnswer;	
	let unanswered;		

	let answered; 		
						
	let seconds;		
	let time;			
	
	let userChoice;		

	let text = {
		correct: "Muy bien!",
		incorrect: "Aww, respuesta incorrecta...",
		noTime: "Hey! Has de ser más rápido",
		done: "¿Que tal ha ido?",
	};

	let triviaQuestions = [
		{	
			question: "¿Durante cuánto tiempo puede dormir un caracol?",
			choices: ["5 meses", "3 años", "Año y medio", "2 años", "3 meses"],
			correct: 1,
			image: "img/snail.gif",
			answerText: "La razón por la que un caracol puede dormir hasta tres años, es porque como muchos otros animales, hibernan.",
		},

		{
			question: "¿Que animal es capaz de identificarse por sus nombres?",
			choices: ["Loro", "Perro", "Gato", "Delfín", "Orangután"],
			correct: 3,
			image: "img/dolphin.gif",
			answerText: "Los delfines desarrollan un silbido específico que codifica su identidad individual y sólo responden a los semejantes que imitan su mismo silbido.",
		},

		{
			question: "¿Cuánto tiempo pueden llegar a vivir los cocodrilos?",
			choices: ["80 años", "50 años", "100 años", "90 años", "20 años"],
			correct: 0,
			image: "img/alli.gif",
			answerText: "La vida útil más larga de un cocodrilo que ha vivido en cautiverio data de un especimen americano que murió a la edad de 85 años en París en el año de 1937. ",
		},

		{
			question: "¿De que porcentaje de la caza se ocupa la leona?",
			choices: ["20%", "40%", "90%", "50%", "5%"],
			correct: 2,
			image: "img/lio.gif",
			answerText: "Una leona puede alcanzar a un búfalo pero no puede comérselo ella sola. Por otro lado una leona puede comerse fácilmente a una gacela, pero no puede darle alcance ella sola, no es tan rápida.",
		},
		{
			question: "¿Cuántos corazones tiene un pulpo?",
			choices: ["2", "1", "5", "3", "10"],
			correct: 4,
			image: "img/octo.gif",
			answerText: 'Dos de los corazones llevan la sangre sin oxígeno a las branquias (que son los órganos respiratorios mediante los que se realiza el intercambio de gases) y el tercero transporta la sangre oxigenada al resto del cuerpo.',
		},
		{
			question: "¿En que clave musical se escucha el zumbido de una mosca?",
			choices: ["Do", "Mi", "Fa", "Re", "Sol"],
			correct: 2,
			image: "img/fly.gif",
			answerText: 'Efectivamente, las moscas zumban en Fa'
		},
		{
			question: "¿Cuánto pesa un diente de elefante?",
			choices: ["4kg", "500g", "6kg", "2kg", "750g"],
			correct: 0,
			image: "img/ele.gif",
			answerText: "Aunque a simple vista solo se ven dos colmillos, a estos les acompañan cuatro molares también: uno en cada cuadrante de la boca."
		},
	];

	// Esconde el contenido antes de empezar
	$("#gameArea").hide();

	// Boton de inicio
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Botón de reset
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	//Funcion para empezar el juego
	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}
	// Enseñar Pregunta
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
		answered = true;
		// Pone la pregunta del array
		$(".question").html(triviaQuestions[currentQ].question);

		for (let i = 0; i <= 5; i++) {
			let list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

		
		countdown();

		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// CUENTA ATRÁS
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		//Delay of 1 sec before timer goes off
		time = setInterval(countDownSho, 1000);
	}

	// ENSEÑA EL TIMER
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "lightpink"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}

	// ENSEÑA EL DiV DE LAS RESPUESTAS
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		let rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		let rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);
		//GIF IMG
		let gifLink = triviaQuestions[currentQ].image;
		let Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
		// GIF TEXT
		let gifText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(gifText);
			newCap.addClass("gifCap");
			$("#gifText").html(newCap);


		// ENSEÑA Y CUENTA LAS RESPUESTAS
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		// TIEMPO EN ENSEÑAR LOS RESULTADOS
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});