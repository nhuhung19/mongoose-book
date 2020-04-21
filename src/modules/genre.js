const mongoose = require("mongoose")

const genreSchema = mongoose.Schema({
    genre: {
        type: String,
        required: [true, "genre is required"],
        trim: true,
        unique: true
    }
})

const Genre = mongoose.model("Genre", genreSchema)

module.exports = Genre