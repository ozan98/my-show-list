//@desc     Register user
//@route    POST /api/users/
//@acess    public

const registerUser = (req, res) => {
    res.json({message: 'register user'})
}

//@desc     Authenticate user
//@route    POST /api/users/login
//@acess    public

const loginUser = (req, res) => {
    res.json({message: 'log in user'})
}

//@desc     Get user data
//@route    GET /api/users/me
//@acess    public

const getMe = (req, res) => {
    res.json({message: 'user data provided'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
