const User = require("../modules/user")

exports.login = async function (req, res){
    const {email, password} = req.body
    // use email to find the correct user or document

    const user = await User.loginWithCredentials(email, password)

    //generate token for that user
    const token = user.generateToken()
    try{
        return res.status(200).json({status: "ok", data: token})
    } catch(err){
        return res.status(400).json({status:"fail", error: err.message})
    }
}

exports.auth = async function (req, res, next){
    //check there is a token 
    console.log(req.headers.authorization)
    return res.status(410).json({status: "fail"})

    //check if token is valid ? by using the algo & signature to decode

    next()
}