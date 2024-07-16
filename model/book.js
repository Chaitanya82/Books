var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    name:{
        type: String
    },
    author:{
        type: String
    },
    genre:{
        type: String
    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    sno:{
        type: Number
    }
})

var Book = mongoose.model('Book', bookSchema)
module.exports = Book