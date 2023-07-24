const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils')

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
    checkPermissions(req.user, user._id)
    res.status(StatusCodes.OK).json({ user });
}


const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

// update user using save();
const updateUser = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
        throw new CustomError.BadRequestError("Please provide all values")
    }
    const user = await User.findOne({ _id: req.user.userId })
    user.email = email
    user.name = name
    const updatedUser = await user.save();
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.OK).json({ ...tokenUser, email: updatedUser.email })
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



// const updateUser = async (req, res) => {
//     const { email, name } = req.body;
//     if (!email || !name) {
//         throw new CustomError.BadRequestError("Please provide all values")
//     }
//     const user = await User.findOneAndUpdate(
//         { _id: req.user.userId },
//         { email, name },
//         { new: true, runValidators: true }
//     ).select('-password -__v');
//     const tokenUser = createTokenUser(user);
//     attachCookiesToResponse({ res, user: tokenUser })
//     res.status(StatusCodes.OK).json({ user })
// }
