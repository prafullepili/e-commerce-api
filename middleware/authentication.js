const CustomError = require('../errors')
const { isTokenValid } = require('../utils')


const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid | login again');
    }
    try {
        const { name, userId, role } = isTokenValid({ token }) //{userId: '64be2375df0e244d7dc22342',name: 'prafull1',email: 'prafull1@gmail.com',role: 'user',iat: 1690182530,exp: 1690268930}
        req.user = { name, userId, role }
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError('Unauthorized to access this route')
        }
        next();
    };
};

const checkPermissions = (req, res, next) => {
    const { userId, role } = req.user;
    const { id } = req.params;

    if (role === 'admin') return next();
    if (userId === id) return next()
    throw new CustomError.UnauthorizedError('Not authorized to access this route')
};
module.exports = {
    authenticateUser,
    authorizePermissions,
    checkPermissions
}