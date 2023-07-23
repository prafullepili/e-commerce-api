require('dotenv').config();
require('express-async-errors');
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const app = express()
const connectDB = require('./db/connect'); // database

//routers
const authRouter = require('./routes/authRoutes')

//middleware 
const notFountMiddleware = require('./middleware/not-found') //page not found
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))


app.get('/', (req, res) => {
    // console.log(req.cookies)
    console.log(req.signedCookies)
    res.send('E-commerce api')
})
app.use('/api/v1/auth', authRouter)


app.use(notFountMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();