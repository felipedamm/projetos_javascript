const height = document.querySelector("#height-input");
const weight = document.querySelector("#weight-input");
const calculate = document.querySelector("#button1");
const clear = document.querySelector("#button2");
const back = document.querySelector("#button3");
const mainContainer = document.querySelector("#main-container")
const resultContainer = document.querySelector("#result-container")
var result;

function showResult() {
    const calcHeight = height.value;
    const calcWeight = weight.value;
    if (!calcHeight || (calcHeight<=0)) {
        //height.placeholder = "Valor inválido!";
        return;
    }
    if (!calcWeight || (calcWeight<=0)) {
        //weight.placeholder = "Valor inválido!";
        return;
    }
    const IMC = (calcWeight)/(calcHeight*calcHeight);
    function testIMC(IMC) {
        if (IMC<18.5) return "Abaixo do peso";
        if (IMC>=18.5 && IMC<24.9) return "Peso ideal";
        if (IMC>=24.9 && IMC<29.9) return "Levemente acima do peso";
        if (IMC>=29.9 && IMC<34.9) return "Obesidade grau I";
        if (IMC>=34.9 && IMC<39.9) return "Obesidade grau II (Severa)";
        if (IMC>=40) return "Obesidade grau III (Mórbida)";
    }
    mainContainer.classList.add("hide")
    resultContainer.classList.remove("hide")
    const template = `<div id="result-content"><h1>Seu IMC: <span class="yellow-text">${IMC.toFixed(2)}</span></h1>
    <h1>Situação atual: <span class="yellow-text">${testIMC(IMC)}</span></h1></div>`;
    const parser = new DOMParser();
    const htmlTemplate = parser.parseFromString(template, "text/html");
    result = htmlTemplate.querySelector("#result-content");
    const text = htmlTemplate.querySelectorAll(".yellow-text");
    switch (text[1].innerText){
        case "Abaixo do peso":
            text[1].classList.add("red");
            break;
        case "Peso ideal":
            text[1].classList.add("green");
            break;
        case "Levemente acima do peso":
            text[1].classList.add("green");
            break;
        case "Obesidade grau I":
            text[1].classList.add("yellow");
            break;
        case "Obesidade grau II (Severa)":
            text[1].classList.add("red");
            break;
        case "Obesidade grau III (Mórbida)":
            text[1].classList.add("red");
            break;      
    }
    resultContainer.insertBefore(result, resultContainer.firstChild);
}

calculate.addEventListener("click", (e) => {
      showResult();
})

weight.addEventListener("keydown", (e) => {
    if(e.code === "Enter")
        showResult();
})

back.addEventListener("click", (e) => {
    result.remove();
    height.value = "Exemplo 1.75";
    weight.value = "Exemplo 70.5";
    resultContainer.classList.add("hide")
    mainContainer.classList.remove("hide")
})

clear.addEventListener("click", (e) => {
    height.value = "Exemplo 1.75";
    weight.value = "Exemplo 70.5";
})