const Book = require("../modules/book")


exports.createBook = async (req, res) => {
    const { title, genres, author, description } = req.body
    console.log(title, genres, author, description)
    try {
        const newBook = new Book({ // create new instance iherence class Book
            ...req.body,
            owner: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        })
        await newBook.save() // chang title, des, genres, author and save in database
        res.status(201).json({ status: "ok", data: newBook })
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
}

// exports.updateBooks = async (req, res) => {
//     const {title, description, genres, author } = req.body
//     try {
//         const books = await Book.findByIdAndUpdate({ "owner._id": req.user._id });
//         res.json({ status: "success", data: books });
//     } catch (error) {
//         res.status(400).json({ status: "fail", message: error.message });
//     };
// };

exports.readBooks = async (req, res) => {
    try {
        const books = await Book.find({ "owner._id": req.user._id });
        res.json({ status: "success", data: books });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    };
};

exports.deleteBooks = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.body.id);
        res.json({ status: "success", data: null });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    };
};


