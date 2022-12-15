const url = "http://localhost:5500/api"
function getUsers(){
    fetch(url)
        .then(response => response.json())
        .then(data => renderApiResult.textContent = JSON.stringify(data))
        .catch(error => console.error(error.message))
}

function getUser(){
    fetch(`${url}/1`).then(response => response.json()).then(data => {
        const {name, avatar, city} = data
        userName.textContent = name;
        userAvatar.src = avatar;
        userCity.textContent = city;
    }).catch(error => console.error(error.message))
}

function addUser(newUser){
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            "content-type": "application/json; charset=utf-8"
        }
    }).then(response => response.json()).then(data => alertApi.textContent = data)
}

const newUser = {
    name: "Pedro",
    avatar: "http://lorempixel.com.br/400/200",
    city: "Brasília"
}

function updateUser(updatedUser){
    fetch(`${url}/1`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    }).then(response => response.json()).then(data => alertApi.textContent = data).catch(error => console.error(error.message))
}

const updatedUser = {
    name: "Pedro",
    avatar: "http://lorempixel.com.br/400/200",
    city: "Rio de Janeiro"
}

function deleteUsers(id){
    fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json, charset=utf-8"
        }
    }).then(response => response.json()).then(data => alertApi.textContent = data).catch(error => console.error(error))
}

// updateUser(updatedUser)
// addUser(newUser);
deleteUsers(3)
getUsers();
getUser();
