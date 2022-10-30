const button = document.querySelector(".button")
const div = document.querySelector(".screen")

let people = []
function create(){
    let itemName = document.querySelector("#name").value
    let price = document.querySelector("#price").value
    function Person(nome, preco){
        this.name = nome;
        this.price = preco;
    }
    let newPerson = new Person(itemName, price)
    people.push(newPerson)
    document.querySelector("#name").value = "";
    document.querySelector("#price").value = "";
    let lastObject = people[people.length - 1]
}
button.addEventListener("click", create)

for(let obj of people){
    div.innerHTML += `<div class="div"> <img src="foto do gato.jpg" alt="" class="img">  <div class="card"> <p>${obj.name}</p> <p>${obj.price}</p> </div></div>`
}



