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
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
    res.send("updateUser")
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide old and new password')
    }
    const user = await User.findOne({ _id: req.user.userId })
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    if (oldPassword === newPassword) {
        throw new CustomError.BadRequestError('No changes in new password')
    }
    user.password = newPassword;
    await user.save(); //is will call pre('save');
    res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
}


module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}