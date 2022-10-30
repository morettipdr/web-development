function reSize(){
    const size = sidebar.style.width;
    if(size == "250px"){
        sidebar.style.width = "78px"
        footer.style.justifyContent = "center"
        all.forEach(element => {
            element.setAttribute("hidden", "true")
            if(element.classList.contains("input") == true){
                search.style.width = "50px"
                search.style.marginRight = "10px"
            }
        });
    } else{
        sidebar.style.width = "250px"
        footer.style.justifyContent = "space-between"
        all.forEach(element => {
            element.removeAttribute("hidden")
            if(element.classList.contains("input") == true){
                search.style.width = "222px"
            }
        });
    }
}
const footer = document.querySelector(".bottom")
const lupa = document.querySelector(".lupa")
const search = document.querySelector(".search")
const all = document.querySelectorAll(".away")
const logo = document.querySelector(".logo")
const sidebar = document.querySelector(".sidebar")
const button = document.querySelector(".close")
button.addEventListener("click", reSize)