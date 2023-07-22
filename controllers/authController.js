const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')


const register = async (req, res) => {
    const { name, email, password } = req.body;

    const isEmailExist = await User.findOne({ email })
    if (isEmailExist)
        throw new CustomError.BadRequestError('Email already exists')
    const user = await User.create({ name, email, password });
    res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
    res.send('login here')
}

const logout = async (req, res) => {
    res.send('logout here')
}


module.exports = {
    register,
    login,
    logout
}