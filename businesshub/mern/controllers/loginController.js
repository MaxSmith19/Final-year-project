const getLogin = (req,res) => {
    res.status(200).json({ message:"get logins"})
}

const setLogin = (req, res) =>{
    res.status(200).json({message: "Create login"})
}

const updateLogin = (req, res) =>{
    res.status(200).json({message: `putting (updating) login ${req.params.id}`})
}
const deleteLogin = (req, res) =>{
    res.status(200).json({message: `deleting login ${req.params.id}`})
}
module.exports ={
    getLogin,
    setLogin,
    updateLogin,
    deleteLogin
}