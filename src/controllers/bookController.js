const Book = require("../modules/book")


exports.createBook = async (req, res) => {
    const { title, genres, author, description } = req.body
    console.log(title, genres, author, description)
    
    const book = new Book({
        title: title,
        description: description, 
        genres: genres,
        author: author
    })
    await book.save()
    res.status(201).json({status:"ok", data: book})

}