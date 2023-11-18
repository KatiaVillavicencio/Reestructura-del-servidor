import UserManager from "../dao/classes/userManagerMongo.js";

const usersService = new UserManager();

 const getUsers = async (req, res) => {
    let result = await usersService.getUsers()
    res.send({ status: "success", result: result })
}

 const getUserById = async (req, res) => {
    const { uid } = req.params
    let user = await usersService.getUserById(uid)
    res.send({ status: "success", result: user })
}

 const deleteUser = async (req, res) => {
    const user = req.body
    let result = await usersService.deleteUser(user)
    res.send({ status: "success", result: result })
}

const validateUser = async (req, res) => {
    const user = req.body
    let result = await usersService.validateUser(user)
    res.send({ status: "success", result: result })
}

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    validateUser
};