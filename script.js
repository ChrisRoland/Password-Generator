const result = document.getElementById("result");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const passLength = document.getElementById("length");
const genBtn = document.getElementById("generate");
const copyBtn = document.getElementById("clipboard")

// types
const randomFuction = {
    upper: getRandomUp,
    lower: getRandomLow,
    number: getRandomNo,
    symbol: getRandomSymbol
};

//clipboard functonality
copyBtn.addEventListener("click", () => {
    const textarea = document.createElement("textarea")

    const passW = result.innerText
 
    if(!passW) {
        return "Select at least one character type!";
    }

    textarea.value = passW
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()

    alert('Password has been copied to clipboard');
})

// Event Listener
genBtn.addEventListener("click", () => {
    const length = parseInt(passLength.value, 10);
    const hasUppercase = uppercase.checked;
    const hasLowercase = lowercase.checked;
    const hasNumbers = numbers.checked;
    const hasSymbols = symbols.checked;

    if (!length || length <= 0) {
        result.innerText = "Enter a valid password length!";
        return;
    }

    result.innerText = genPassword(hasUppercase, hasLowercase, hasNumbers, hasSymbols, length);
});

// Password Generator Function
function genPassword(upper, lower, number, symbol, length) {
    let generatedPass = "";

    const typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(
        item => Object.values(item)[0]
    );

    if (typesArray.length === 0) {
        return "Select at least one character type!";
    }

    // Generate characters for the password
    for (let i = 0; i < length; i++) {
        const randomType = typesArray[Math.floor(Math.random() * typesArray.length)];
        const funcName = Object.keys(randomType)[0];
        generatedPass += randomFuction[funcName]();
    }

    return generatedPass;
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Random Character Functions
function getRandomLow() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUp() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNo() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbolsChar = "!@#$%&*()-_+={}[]|:;<>,.?/~";
    return symbolsChar[Math.floor(Math.random() * symbolsChar.length)];
}
