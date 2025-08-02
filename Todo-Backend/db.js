require('dotenv').config();

const mongoose = require("mongoose")
console.log("MONGO_URL:", process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
})

const todo = mongoose.model('todos',todoSchema)

module.exports = {
    todo
}