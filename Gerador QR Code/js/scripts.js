const container = document.querySelector(".main-form")
const qrCodeBtn = document.querySelector("#qr-btn")
const qrCodeInput = document.querySelector("#URL")
const qrCodeImg= document.querySelector("#qrcodeimg")

function generateQrCode() {
    const qrCodeInputValue = qrCodeInput.value;
    console.log("botao");
    console.log(qrCodeInputValue);

    if(!qrCodeInputValue) return;

    qrCodeBtn.value = "Gerando código..."

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeInputValue}`;

    qrCodeImg.addEventListener("load", () => {
        container.classList.add("active");
        qrCodeBtn.value = "Código criado!"
    })
}

qrCodeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    generateQrCode();
})

qrCodeInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter")
        generateQrCode();
})

