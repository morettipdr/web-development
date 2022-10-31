const isAccepted = false;
const promise = new Promise((accepted, rejected) => {
    if(isAccepted){
        return accepted("Promise made and concluded")
    }
    return rejected("Promise made and not succeeded")
})
promise.then(result => console.log(result)).catch(result => console.log(result)).finally(() => console.log("promise ended"))