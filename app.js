const express = require("express")
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const {readAuthor, createAuthor, updateAuthor, deleteAuthor} = require("./src/controllers/authorController")
const {readGenre, createGenre, updateGenre, deleteGenre} = require("./src/controllers/genreController")
const {createBook, readBooks, deleteBooks} = require("./src/controllers/bookController")
const {createUser} = require("./src/controllers/userController")
const {login, auth, logout, logoutAll} = require("./src/controllers/authController")
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
.get(auth, readAuthor)
.post(auth, createAuthor)

router.delete("/authors/:id", auth, deleteAuthor)
router.put("/authors/:id",auth, updateAuthor)

//genre
router.route("/genres")
.get(auth, readGenre)
.post(auth, createGenre)

router.delete("/genres/:id",auth , deleteGenre)
router.put("/genres/:id",auth, updateGenre)

//book
router.route("/books")
.post(auth, createBook)
.get(auth, readBooks)

router.delete("/books/:id",auth , deleteBooks)

router.route("/users")
.post(createUser)

router.route("/auth/login")
.post(login)

router.get("/logout", auth, logout);
router.get("/logoutall", auth, logoutAll);

app.listen(process.env.PORT, () => {
    console.log("App is running on port", process.env.PORT)
})
