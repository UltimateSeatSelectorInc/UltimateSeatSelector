const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=,./?;':"[\]{}`|<>]).{8,}$/;

// checks if any field is empty, and if it is, returns that field
function checkIfEmpty(field) {
    if (field === "") {
        return true
    } else {
        return false
    }
}

// checks if email is valid via regex
function checkIfEmailValid(email) {
    if (!email.match(validEmail) || (email.length < 5)){
        return false
    } else {
        return true
    }
}

// checks if password is valid via regex
function checkIfPasswordValid(password) {
    if (!password.match(validPass)){
        return false

    } else {
        return true
    }
}

export { checkIfEmpty, checkIfEmailValid, checkIfPasswordValid }