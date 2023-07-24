const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser: createTokenUserPayload } = require('../utils/index')

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const isEmailExist = await User.findOne({ email })
    if (isEmailExist) {
        throw new CustomError.BadRequestError('Email already exists.')
    }
    const user = await User.create({ name, email, password }); //{name: 'prafull1',email: 'prafull1@gmail.com',password: '5ebe2294ecd0e0f08eab7690d2a6ee69',role: 'user',_id: new ObjectId("64be1d038cf4a0432f94db40"),__v: 0}
    const tokenUser = createTokenUserPayload(user); //{name: 'prafull1',userId: new ObjectId("64be1d038cf4a0432f94db40"),role: 'user'}
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
    const isPasswordCorrect = await user.comparePassword(password); //return true/false | function defined in User model
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const tokenUser = createTokenUserPayload(user); //{name: 'prafull1',userId: new ObjectId("64be1d038cf4a0432f94db40"),role: 'user'}
    attachCookiesToResponse({ res, user: tokenUser })
    res.status(StatusCodes.OK).json({ user: tokenUser })
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