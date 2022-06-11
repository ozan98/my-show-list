const User = require('../models/userModel')
const aysncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc     Register user
//@route    POST /api/users/
//@acess    public

const registerUser = aysncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExist = await User.findOne({ email })

    if(userExist){
        res.status(400)
        throw new Error('user already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(newUser) {
        res.status(200).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user Data')
    }

})

//@desc     Authenticate user
//@route    POST /api/users/login
//@acess    public

const loginUser = aysncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _i: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc     Get user data
//@route    GET /api/users/me
//@acess    public

const getMe = aysncHandler(async (req, res) => {

})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
