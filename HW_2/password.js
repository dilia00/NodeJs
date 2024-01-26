const symbols = "1234567890~!@#$%^&*()-_=+;:][}{/?.,><|qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
let password = "";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getPassword(passwordLength) {
    let symbolIndex = getRandomNumber(0, symbols.length + 1);
    password += symbols.charAt(symbolIndex);
    passwordLength--;
    if (passwordLength != 0) {
        getPassword(passwordLength)
    }
    return password;
}

module.exports = { getRandomNumber, getPassword };