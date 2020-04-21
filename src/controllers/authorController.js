const Author = require("../modules/author")

exports.createAuthor = async (req, res) => {
    const { name } = req.body
    console.log(typeof name, name)

    try {
        //create author
        const author = await Author.create({name: name})

        return res.status(201).json({ status: "ok", data: author })
    } catch(error){
        res.status(400).json({status: "fail", err: error.message})
    }
    
    
}

exports.updateAuthor = async (req, res) => {
    const { id } = req.params
    const newAuthor = await Author.findByIdAndUpdate(id, {name: req.body.name}, {new: true})
    return res.status(202).json({ status: "ok", data: newAuthor })
}

exports.readAuthor = async (req, res) => {
    const authors = await Author.find()
    return res.status(200).json({status: "ok",data: authors})
}

exports.deleteAuthor = async (req, res) => {
    const { id } = req.params

    try {
        //create author
        await Author.findByIdAndDelete(id)

        return res.status(204).json({ status: "ok", data: null })
    } catch(error){
        res.status(400).json({status: "fail", err: error.message})
    }
    
    
}

