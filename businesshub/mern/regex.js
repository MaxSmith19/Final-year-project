const validEmail = new RegExp('\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');
//more than 8 chars, containing at least one number
//todo change to contain at least one upper and symbol
module.exports={
    validEmail,
    validPassword
}