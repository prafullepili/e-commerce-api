require('dotenv').config();
require('express-async-errors');
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// security 
const helment = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');

const app = express()
const connectDB = require('./db/connect'); // database

//routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')

//middleware 
const notFountMiddleware = require('./middleware/not-found') //page not found
const errorHandlerMiddleware = require('./middleware/error-handler')

// security
app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
}));
app.use(helment());
app.use(cors());
app.use(mongoSanitize());

app.use(morgan('tiny'))
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))


app.use(express.static('./public'));
app.use(fileUpload());

app.get('/', (req, res) => {
    // console.log(req.cookies)
    // console.log(req.signedCookies)
    res.send('E-commerce api')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)


app.use(notFountMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI_LOCAL)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();