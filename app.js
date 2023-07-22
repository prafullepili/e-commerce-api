require('dotenv').config();
require('express-async-errors');
const express = require('express')
const morgan = require('morgan')

const app = express()
const connectDB = require('./db/connect'); // database

//middleware 
const notFountMiddleware = require('./middleware/not-found') //page not found
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json());

app.get('/', (req, res) => {
    res.send('E-commerce api')
})

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