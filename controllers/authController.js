const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse } = require('../utils/index')

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        throw new CustomError.BadRequestError('Email already exists')
    }
    const user = await User.create({ name, email, password });
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    // const token = jwt.sign(tokenUser, 'jwtSecret', { expiresIn: '1d' })
    // const token = createJWT({ payload: tokenUser })
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({ msg: "user logged out!" })
}


module.exports = {
    register,
    login,
    logout
}