const mongoose = require('mongoose')
const validator = require('validator')
// const bcrypt = require('bcryptjs')
const md5 = require('md5');
const CustomError = require('../errors')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email id'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

// UserSchema.pre('save', async function () {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// })

// UserSchema.methods.comparePassword = async function (canditatePassword) {
//     const isMatch = await bcrypt.compare(canditatePassword, this.password)
//     return isMatch;
// }

UserSchema.pre('save', async function () {
    if (this.modifiedPaths().length == 0) {
        throw new CustomError.CustomAPIError('Same data is given. No change')
    }
    if (!this.isModified('password')) return
    this.password = md5(this.password);
})

UserSchema.methods.comparePassword = async function (canditatePassword) {
    let hashedPassword = md5(canditatePassword);
    const isMatch = hashedPassword == this.password
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema)