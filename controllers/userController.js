const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')


const getAllUsers = async (req, res) => {
    const users = await User.find({ role: 'user' }).select('-password -__v');
    res.status(StatusCodes.OK).json({ users, count: users.length });
}

const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select('-password -__v');
    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${id}`);
    }
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async (req, res) => {
    res.send("showCurrentUser")
}

const updateUser = async (req, res) => {
    res.send("updateUser")
}

const updateUserPassword = async (req, res) => {
    res.send("updateUserPassword")
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}