const clickHere = document.querySelector("#generate-password");
const passwordSuggestionBox = document.querySelector("#password-suggestion");
const submit = document.querySelector("#submit");
const generatedPassword = document.querySelector("#generated-password");
const passwordFilterBox = document.querySelector("#password-filter");
const createPasswordBtn = document.querySelector("#create-password-btn");
const copyBtn = document.querySelector("#copy-password");
const generatePasswordContainer = document.querySelector("#password-filter");
const lengthInput = document.querySelector("#length");
const lettersInput = document.querySelector("#letters");
const numbersInput = document.querySelector("#numbers");
const symbolsInput = document.querySelector("#symbols");

const getLetterLowerCase = () => {

    return (String.fromCharCode(Math.floor(Math.random() * 26) + 97));

};

const getLetterUpperCase = () => {

    return (String.fromCharCode(Math.floor(Math.random() * 26) + 65));

};

const getNumber = () => {

    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {

    const symbols = "(){}[]=<>/.,!@#$%&*+-";
    return symbols[Math.floor(Math.random() * symbols.length)]

};

const showPasswordSuggestion = (password) => {
    generatedPassword.innerText = password;
    if(passwordSuggestionBox.classList.contains("hide")) {
        passwordSuggestionBox.classList.remove("hide");
    }
};

const toggleFilters = () => {
//    if(passwordFilterBox.classList.contains("hide")) {
//       passwordFilterBox.classList.remove("hide");
//  }
    passwordFilterBox.classList.toggle("hide");
};

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = "";
    const passwordLength = +lengthInput.value;
    const generators = [];
    if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase);
    }

    if(numbersInput.checked) {
        generators.push(getNumber);
    }

    if(symbolsInput.checked) {
        generators.push(getSymbol);
    }

    if(generators.length === 0) {
        return;
    }

    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)]();
            password += randomValue;
        })
        
    }
    
    password = password.slice(0, passwordLength);
    return password;

};

clickHere.addEventListener("click", (e) => {
    e.preventDefault();
    toggleFilters(password);
});

submit.addEventListener("click", (e) => {
    e.preventDefault();
});

createPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const password = generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
    if(!password) {
        showPasswordSuggestion("Filtro inválido!")
    } else {showPasswordSuggestion(password)}
});

copyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const password = generatedPassword.innerText;
    
    navigator.clipboard.writeText(password).then(() => {
        copyBtn.innerText = "Senha copiada!"

        setTimeout(() => {
            copyBtn.innerText = "Copiar"
        }, 1500);
    })
});
