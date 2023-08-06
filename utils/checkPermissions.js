const CustomError = require('../errors')

const checkPermissions = (requestUser, resouceUserId, adminFlag = 0) => {
    // console.log(4, requestUser); //{ name: 'Prafull', userId: '64bd8876c98d8fab174fb975', role: 'admin' }
    // console.log(5, resouceUserId); //new ObjectId("64bdfd5c7e4a5df255abedee")
    // console.log(6, typeof resouceUserId); //object

    if (adminFlag) if (requestUser.role === 'admin') return;
    if (requestUser.userId === resouceUserId.toString()) return
    throw new CustomError.UnauthorizedError('Not authorized to access this route')
}

module.exports = checkPermissions;