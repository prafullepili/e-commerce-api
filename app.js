const express = require('express')
require('dotenv').config();
require('express-async-errors');
const app = express()

// database
const connectDB = require('./db/connect');

//middleware 
const notFountMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json());
app.get('/', (req, res) => {
    req.send('E-commerce api')
})

app.use(notFountMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, (req, res) => {
            console.log(`Server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();