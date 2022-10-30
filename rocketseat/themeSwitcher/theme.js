// function turnLight(){
//     let dark = divDark.getAttribute("hidden") != null;
//     if(dark){
//         divDark.removeAttribute("hidden")   
//         divLight.setAttribute("hidden", "true")
//         body.style.backgroundColor = "var(--light)"
//     } else{
//         divDark.setAttribute("hidden", "true")
//         divLight.removeAttribute("hidden")
//         body.style.backgroundColor = "var(--dark)"
//     }
// }
function turnLight(){
    const light = divLight.style.right
    if(light == "5px"){
        divLight.style.right = "133px"
        body.style.backgroundColor = "var(--light)"
    } else{
        divLight.style.right = "5px"
        body.style.backgroundColor = "var(--dark)"
    }
}
const body = document.querySelector("body")
const button = document.querySelector(".button")
const divDark = document.querySelector(".dark")
const divLight = document.querySelector(".light")
button.addEventListener("click", turnLight)