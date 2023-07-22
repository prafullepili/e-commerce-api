const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
const connectDB = async (url) => {
  return mongoose.connect(url, {}, (err) => err ? console.log(err) : console.log("db connected"))
}
module.exports = connectDB
