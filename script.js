const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const quantityEl = document.getElementById('quantity');

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () =>{
    var codeToBeCopied = resultEl.value;
    var emptyArea = document.createElement('TEXTAREA');
    emptyArea.innerHTML = codeToBeCopied;
    document.body.appendChild(emptyArea);
 
    emptyArea.select();
    document.execCommand('copy');
 
    document.body.removeChild(emptyArea);
    alert('Password copied to clipboard');
    });


function auto_grow(element) {
	element.style.height = "20px";
	element.style.height = (element.scrollHeight) +20 + "px";
}

generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	const quantity = quantityEl.value;

	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length, quantity);
	resultEl.style.height = (resultEl.scrollHeight) + 20 + "px";
});

function generatePassword(lower, upper, number, symbol, length, quantity) {
	let generatedPassword = '';
	let finalPassword = '';
	let printpassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

	if (typesCount === 0) {
		return '';
	}

	for (let j = 0; j < quantity; j++) {
		for (let i = 0; i < length; i += typesCount) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += randomFunc[funcName]();
			});

			finalPassword = generatedPassword.slice(0, length);
		}

		if (j == (quantity - 1)) {
			printpassword = printpassword + finalPassword;

		}
		else {
			printpassword = printpassword + finalPassword + "\n";
		}
		generatedPassword = "";
		resultEl.value = printpassword;
	}

}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}

