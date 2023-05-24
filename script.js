let activeNum = document.querySelector("#active-num");
let expression = document.querySelector("#expression");

const clearBtn = document.querySelector("#clear");
const invertBtn = document.querySelector("#invert");
const percentBtn = document.querySelector("#percent");
const divideBtn = document.querySelector("#divide");

let errorMessage = "Nope";
let fixedLimit = 10;

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
	button.addEventListener("click", () => fireButton(button));
});

function fireButton(button) {
	console.log(button.id);
	switch (button.id) {
		case "clear":
			checkHalfClear() ? halfClear() : allClear();
			break;

		case "invert":
			activeNum.textContent = +(activeNum.textContent * -1).toFixed(fixedLimit);
			break;
			
			case "percent":
			activeNum.textContent = +(activeNum.textContent / 100).toFixed(fixedLimit);
			break;

		case "decimal":
			clearBtn.textContent = "C";
			updateActiveNum(button.textContent);
			break;

		case "equals":
			expression.textContent += activeNum.textContent;
			activeNum.textContent = operate(expression.textContent);
			break;

		case "divide":
		case "multiply":
		case "subtract":
		case "add":
			// need to run operation if there are in fact 2 numbers to operate on.
	
		default:
			if (activeNum.textContent === "0" || 
				activeNum.textContent === errorMessage) {
					activeNum.textContent = "";
			}
			clearBtn.textContent = "C";
			updateActiveNum(button.textContent);
			break;
	};
}

function updateActiveNum(value) {
	switch (value) {
		case "÷":
		case "×":
		case "–":
		case "+":
			expression.textContent = "";
			expression.textContent += `${activeNum.textContent} ${value} `;
			activeNum.textContent = "0";
			break;
	
		default:
			activeNum.textContent += value
			break;
	}
}

function allClear() {
	activeNum.textContent = "0";
	expression.textContent = "";
	clearBtn.textContent = "AC";
}

function halfClear() {
	activeNum.textContent = "0";
	clearBtn.textContent = "AC";
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
		expression.textContent = "";
		return errorMessage;
	}
	const answer = methods[opr](a, b);
	return +(answer + Number.EPSILON).toFixed(fixedLimit);
}

function checkHalfClear() {
	return clearBtn.textContent === "C";
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