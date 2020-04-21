const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const {readAuthor, createAuthor, updateAuthor, deleteAuthor} = require("./src/controllers/authorController")
const {readGenre, createGenre, updateGenre, deleteGenre} = require("./src/controllers/genreController")
const {createBook} = require("./src/controllers/bookController")
const router = express.Router()
mongoose.connect(process.env.DB_LOCAL, {
    // some options to deal with deprecated warning, you don't have to worry about them.
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log("successfully connected to database")).catch(error => console.log(error))


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

app.get("/", (req, res) => {
    res.status(200).json({ status: "ok", data: [] })
})

//POST create a new author
router.route("/authors")
.get(readAuthor)
.post(createAuthor)

router.delete("/authors/:id",deleteAuthor)
router.put("/authors/:id",updateAuthor)

//genre
router.route("/genres")
.get(readGenre)
.post(createGenre)

router.delete("/genres/:id", deleteGenre)
router.put("/genres/:id", updateGenre)

//book
router.route("/books")
.post(createBook)

app.listen(process.env.PORT, () => {
    console.log("App is running on port", process.env.PORT)
})