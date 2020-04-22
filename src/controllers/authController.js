const User = require("../modules/user")
const jwt = require('jsonwebtoken')

exports.login = async function (req, res) {
    const { email, password } = req.body


    const user = await User.loginWithCredentials(email, password) //user will be obj of class User

    //generate token for that user
    const token = await user.generateToken()
    try {
        return res.status(200).json({ status: "ok", data: token })
    } catch (err) {
        return res.status(400).json({ status: "fail", error: err.message })
    }
}

exports.auth = async function (req, res, next) {
    // make sure we get the token
    console.log(req.headers.authorization)
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    // verify token  
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token)
    try {
        
        const decoded = jwt.verify(token, process.env.SECRET);
        // find User with token 
        console.log(decoded,"==========")
        const user = await User.findOne({ _id: decoded.id, tokens: token });
        if (!user) throw new Error("Unauthorized");
        // attach user object to req object
        req.user = user;

    } catch (err) {
        console.log(err)
        return res.status(401).json({ status: "fail" })
    }
    //check there is a token 

    //check if token is valid ? by using the algo & signature to decode

    next()
}

exports.logout = async function (req, res) {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      req.user.tokens = req.user.tokens.filter(el => el !== token);
      await req.user.save();
      res.status(204).json({ status: "success", data: null });
    } catch (err) {
      res.status(401).json({ status: "fail", message: err.message });
    };
  }

  exports.logoutAll = async function (req, res) {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(204).json({ status: "success", data: null });
    } catch (err) {
      res.status(401).json({ status: "fail", message: err.message });
    };
  }