let onScreen = document.querySelector("#screen");

const clearScreenBtn = document.querySelector("#clear");
const invertBtn = document.querySelector("#invert");
const percentBtn = document.querySelector("#percent");
const divideBtn = document.querySelector("#divide");

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
	button.addEventListener("click", () => fireButton(button));
});

function fireButton(button) {
	console.log(button.id);
	switch (button.id) {
		case "clear":
			// IF onScreen ends in " 0"
			allClear();
			/*
			ELSE
				halfClear();
					Replace final digits with "0"
			*/
			break;

		case "invert":
			console.log("I'm gonna invert someday!");
			// activeNum *= -1;
			break;

		case "percent":
			console.log("I'm gonna make a percent someday!");
			// activeNum / 100
			break;

		case "equals":
			onScreen.textContent = operate(onScreen.textContent);
			break;
	
		default:
			if (onScreen.textContent === "0") onScreen.textContent = "";
			updateScreen(button.textContent)
			break;
	};
}

function updateScreen(value) {
	switch (value) {
		case "÷":
		case "×":
		case "–":
		case "+":
			onScreen.textContent += " " + value + " "
			break;
	
		default:
			onScreen.textContent += value
			break;
	}
}

function allClear() {
	onScreen.textContent = "0";
}

function operate(str) {
	const split = str.split(' '),
		a = +split[0],
		opr = split[1],
		b = +split[2];

	const methods = {
		"+": (a, b) => a + b,
		"–": (a, b) => a - b,
		"×": (a, b) => a * b,
		"÷": (a, b) => a / b,
	};

	if (!methods[opr] || isNaN(a) || isNaN(b)) {
		return "Nope";
	}
	const answer = methods[opr](a, b);
	return +(answer + Number.EPSILON).toFixed(5);
}

// function testCalculations() {
// 	for (let index = 0; index < 10; index++) {
// 		let randA = Math.floor(Math.random() * 100) + 1;
// 		let randB = Math.floor(Math.random() * 100) + 1;
// 		let operators = {
// 			symbol : ["+", "-", "×", "÷"],
// 			word : ["sum of", "difference between", "product of", "quotient of"],
// 		};
// 		let chooser = Math.floor(Math.random() * 4);
	
// 		console.log(`The ${operators.word[chooser]} ${randA} and ${randB} is ${operate(`${randA} ${operators.symbol[chooser]} ${randB}`)}`);
// 	};
// }
// testCalculations();