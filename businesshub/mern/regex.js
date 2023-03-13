const validEmail = new RegExp("(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})");
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');
//more than 8 chars, containing at least one number
//todo change to contain at least one upper and symbol
module.exports={
    validEmail,
    validPassword
}