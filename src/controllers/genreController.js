const Genre = require("../modules/genre")

exports.readGenre = async (req, res) => {
    try {
        const genres = await Genre.find()
        return res.status(200).json({status: "ok", data: genres})
    } 
    catch (error){
        return res.status(404).json({status: "fail", error: error})
    }
}

exports.createGenre = async (req, res) => {
    const {genre} = req.body
    try {
        const newGenre = await Genre.create({genre: genre})
        res.status(201).json({status: "ok", data: newGenre})
    }
    catch(error){
        return res.status(400).json({status: "fail", error: error})
    }
}

exports.updateGenre = async (req, res) => {
    const {id} = req.params
    const {genre} = req.body
    try {
        const newGenre = await Genre.findByIdAndUpdate(id, {genre: genre}, {new: true})
        res.status(202).json({status: "ok", data: newGenre})
    }
    catch(error){
        return res.status(400).json({status: "fail", error: error})
    }
}

exports.deleteGenre = async (req, res) => {
    const {id} = req.params
    try {
        await Genre.findByIdAndDelete(id)
        res.status(204).json({status: "ok", data: null})
    }
    catch(error){
        return res.status(400).json({status: "fail", error: error})
    }
}