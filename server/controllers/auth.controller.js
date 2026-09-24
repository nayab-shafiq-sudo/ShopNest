const userModel = require('../models/user.model')
const JWT = require('jsonwebtoken')
const BCRYPT = require('bcrypt')

const genrateToken = (id) => {
    return JWT.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Provide all the required Credintials' })
            return
        }
        // CHECK IF USER ALREADY EXISTS
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(400).json({message:'User already exists'})
            return
        }
        // PASSWORD HASH
        const hash = await BCRYPT.hash(password, 10)
        // SAVE CREDENTIALS
        const user = await userModel.create({ name, email, password:hash })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genrateToken(user._id)
        })

        
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        // CHECK IF USER ALREADY EXISTS
        if (!email || !password) {
            res.status(400).json({ message: 'Provide all the required Credintials' })
            return
        }
        // CHECK IF USER HAVE AN ACCOUNT
        const user = await userModel.findOne({email})
        if (user && (await BCRYPT.compare(password, user.password))) {
            res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: genrateToken(user._id)
            })
        } else {
            res.status(400).json({message: "Invalid Crenentials"})
        }

    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({}).select('-password')
        res.json({users})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}



module.exports = { register, login, getUsers }