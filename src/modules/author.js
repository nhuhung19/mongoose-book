const mongoose = require("mongoose")

// create schema
const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    }
})

const Author = mongoose.model("Author", authorSchema)
module.exports = Author
// create model


// export model