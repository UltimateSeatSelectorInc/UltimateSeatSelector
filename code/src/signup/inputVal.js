const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
// checks if any field is empty, and if it is, returns that field

function checkIfEmpty(field) {
    if (field === "") {
        return true
    } else {
        return false
    }
}

function checkIfEmailValid(email) {
    if (!email.match(validEmail) || (email.length < 5)){
        return false
    } else {
        return true
    }
}

function checkIfPasswordValid(password) {
    if (!password.match(validPass)){
        return false
    } else {
        return true
    }
}

export { checkIfEmpty, checkIfEmailValid, checkIfPasswordValid }