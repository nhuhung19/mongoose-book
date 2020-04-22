const mongoose = require("mongoose")
const Author = require("../modules/author")
const Genre = require("../modules/genre")

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true
    },
    genres: Array,
    author: Object,
    owner: {
        type: Object,
        require: [true, "Blog must have an owner"]
    }
})
// const authorObj = await Author.findById(author)
//     const genresArray = genres.map(async el => await Genre.findById(el))
//     const a = await Promise.all(genresArray)

bookSchema.pre('save',async function (next) {
    console.log(this)
    this.author = await Author.findById(this.author)
    const genresArray = this.genres.map(async el => await Genre.findById(el))
    this.genres = await Promise.all(genresArray)
    next()
});
const Book = mongoose.model("Book", bookSchema)
module.exports = Book