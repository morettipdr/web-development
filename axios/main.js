const url = "http://localhost:5500/api"
function getUsers(){
    axios.get(url).then((res) => {
        apiResult.textContent = JSON.stringify(res.data);
    }).catch((err) => {
        console.error(err.message);
    })
}

function addNewUser(user){
    axios.post(url, user).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.error(err.message);
    })
}

function getUser(id){
    axios.get(`${url}/${id}`).then(res => {
        let data = res.data;
        userName.textContent = data.name;
        userCity.textContent = data.city;
        userID.textContent = data.id;
        userAvatar.src = data.avatar;
    }).catch(err => {
        console.error(err);
    })
}

function updateUser(id, newInfos) {
    axios.put(`${url}/${id}`, newInfos).then(response => {
        console.log(response);
    }).catch(err => console.error(err))
}

function deleteUser(id){
    axios.delete(`${url}/${id}`).then(response => console.log(response)).catch(err => console.error(err))
}

const Pedro = {
    name: "Pedro Augusto",
    avatar: "https://picsum.photos/200/300",
    city: "Rio de Janeiro"
}

const newInfos = {
    name: "Joao Miguel",
    avatar: "https://picsum.photos/200/300",
    city: "Brasília"
}

getUsers()
// addNewUser(Pedro)
getUser(2)
// updateUser(10, newInfos)
// deleteUser(3)