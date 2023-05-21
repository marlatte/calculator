function operate(str) {
	const split = str.split(' '),
		a = +split[0],
		opr = split[1],
		b = +split[2];

	const methods = {
		"+": (a, b) => a + b,
		"-": (a, b) => a - b,
		"*": (a, b) => a * b,
		"/": (a, b) => a / b,
	};

	if (!methods[opr] || isNaN(a) || isNaN(b)) {
		return NaN;
	}
	const answer = methods[opr](a, b);
	return +(answer + Number.EPSILON).toFixed(5);
}

function testCalculations() {
	for (let index = 0; index < 10; index++) {
		let randA = Math.floor(Math.random() * 100) + 1;
		let randB = Math.floor(Math.random() * 100) + 1;
		let operators = {
			symbol : ["+", "-", "*", "/"],
			word : ["sum of", "difference between", "product of", "quotient of"],
		};
		let chooser = Math.floor(Math.random() * 4);
	
		console.log(`The ${operators.word[chooser]} ${randA} and ${randB} is ${operate(`${randA} ${operators.symbol[chooser]} ${randB}`)}`);
	};
}
testCalculations();