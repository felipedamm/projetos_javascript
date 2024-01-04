const buttons = document.querySelectorAll(".color-options-list li")
const image = document.querySelector(".iphone")



buttons.forEach((btn) => {

    function select(id) {
        if (id == "blue-ball") return "blue"
        if (id == "gold-ball") return "gold"
    }

    btn.addEventListener("click", (e) => {
        console.log(e);
        const button = e.target;
        const id = button.getAttribute("id")
        console.log(id)

        image.classList.add("changing")
        image.setAttribute("src", `img/iphone${select(id)}.jpg`)

        setTimeout(() => {

            image.classList.toggle("changing");

        }, 100)
    })
})