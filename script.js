const activeNum = document.querySelector("#active-num");
const expression = document.querySelector("#expression");
const clearBtn = document.querySelector("#clear");

let fixedLimit = 10;

const OPERATORS = ["÷", "×", "–", "+"]

const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
	button.addEventListener("click", () => 	calculate(button.textContent));
});

window.addEventListener("keydown", (e) => {
	if (e.key === "Backspace") {
		backspaceActiveNum();
	} else if (e.key === "Enter") {
		calculate("=");
	} else if (e.key.length > 1) {
		return;	// Weed out keys like "Shift", "Meta", etc.
	}
	else if (parseInt(e.key)) {
		calculate(e.key); // If it's a number, go straight to calculating.
	} else {
		const buttonFromKey = convertKeyToButtonText(e.key)
		if (buttonFromKey) { // If it's a letter/symbol, check if it's on the list.
			calculate(buttonFromKey);
		}
	}
});

function backspaceActiveNum() {
	activeNum.textContent = activeNum.textContent.slice(0, -1);
	if (activeNum.textContent === "") {
		halfClear();
	}
}

function convertKeyToButtonText(eventKey) {
	switch (eventKey) {
		case "x":
		case "*":
			return "×";
	
		case "/":
			return "÷";
	
		case "-":
			return "–";
	
		case "a":
			return "+";
			
		case "p":
			return "%";
		
		case "c":
			return "C";
		
		case "i":
			return "+/-";
		
		case "f":
		case "!":
			displayFactorial(activeNum.textContent);
			break;

		case ".":
		case "%":
		case "–":
		case "÷":
		case "+":
		case "=":
			return eventKey;
		
		default:
			return;
	}
}

function calculate(buttonText) {
	switch (buttonText) {
		case "C":
		case "AC":
			checkHalfClear() ? halfClear() : allClear();
			break;

		case "+/-":
			activeNum.textContent = +(activeNum.textContent * -1).toFixed(fixedLimit);
			break;

		case "%":
			activeNum.textContent = +(activeNum.textContent / 100).toFixed(fixedLimit);
			break;

		case ".":
			clearBtn.textContent = "C";
			updateActiveNum(buttonText);
			break;

		case "=":
			checkRepeatEquals();
			break;

		case "÷":
		case "×":
		case "–":
		case "+":
			fireOperator(buttonText);
			break;

		default:
			if (activeNum.textContent === "0") activeNum.textContent = "";
			clearBtn.textContent = "C";
			updateActiveNum(buttonText);
			break;
	};
}

function checkRepeatEquals() {
	if (+activeNum.textContent === 0) return;
	const operatorPresent = OPERATORS.some(operator => {
		return expression.textContent.includes(operator)
	});
	const bIsEmpty = expression.textContent.split(" ").includes("");
	if (bIsEmpty && operatorPresent) {
		runEquals(true);
	} else {
		let expArray = expression.textContent.split(" ");
		expArray.splice(0, 1, activeNum.textContent);
		expression.textContent = expArray.join(" ");
		runEquals(false);
	}
}

function runEquals(addToEnd) {
	if (addToEnd) expression.textContent += activeNum.textContent;
	activeNum.textContent = operate(expression.textContent);
}

function updateActiveNum(value) {
	activeNum.textContent += value
}

function updateExpression(value) {
	expression.textContent = "";
	expression.textContent += `${activeNum.textContent} ${value} `;
	activeNum.textContent = "0";
}

function checkHalfClear() {
	return clearBtn.textContent === "C";
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
		return;
	}
	const answer = methods[opr](a, b);
	return +(answer + Number.EPSILON).toFixed(fixedLimit);
}

function fireOperator(buttonText) {
	const operatorPresent = OPERATORS.some(operator => {
		return expression.textContent.includes(operator)
	});
	const bIsEmpty = expression.textContent.split(" ").includes("");
	if (bIsEmpty && operatorPresent) {
		runEquals(true);
		updateExpression(buttonText);
		activeNum.textContent = "";
	} else {
		updateExpression(buttonText);
	}
}

function displayFactorial(value) {
	expression.textContent = `${value}!`
	activeNum.textContent = factorial(value);
}

function factorial(num) {
	num = Math.floor(Math.abs(num));
	return num === 0 ? 1 : num * factorial(num -1);
};

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