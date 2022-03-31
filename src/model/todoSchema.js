const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    "userId": Number,
    "id": Number,
    "title": String,
    "completed" : Boolean
});

const Todomodel = mongoose.model("todoList", todoSchema);

module.exports = Todomodel;