const jwt = require('jsonwebtoken')


const createJWT = ({ payload }) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
    return token;
}


const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user }); //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHJhZnVsbDEiLCJ1c2VySWQiOiI2NGJlMWQwMzhjZjRhMDQzMmY5NGRiNDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5MDE4MDg2OCwiZXhwIjoxNjkwMjY3MjY4fQ.QHpFJmqQRw6vIjYOKDq332xDBsLnIph7LydVjW1Gp4U
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    }) //to get cookie use req.signedCookies because in app.js line 20-> app.use(cookieParser(process.env.JWT_SECRET))
}

module.exports = {
    createJWT, isTokenValid, attachCookiesToResponse
}