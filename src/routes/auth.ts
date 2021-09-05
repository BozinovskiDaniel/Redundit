import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import { User } from './../entities/User';
import { validate, isEmpty } from "class-validator";

const register = async (req: Request, res: Response) => {
    const {email, username, password} = req.body;

    try {

        // Validate data
        let errors: any = {}
        const emailUser = await User.findOne({email})
        const usernameUser = await User.findOne({username})

        if (emailUser) errors.email = "Email is already taken"
        if (usernameUser) errors.username = "Username is already taken"

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        // Create User
        const user = new User({email, username, password})
        errors = await validate(user)

        if (errors.length > 0) return res.status(400).json(errors)
        
        await user.save() // Save to db

        // Return User
        return res.json(user)

    } catch (err) {

        console.log(err)
        return res.status(500).json(err)
    }

} 

const login = async (req: Request, res: Response) => {

    const {username, password} = req.body
    
    try {
        let errors: any = {}

        if (isEmpty(username)) errors.username = "Username must not be empty"
        if (isEmpty(password)) errors.password = "Password must not be empty"
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors)
        }

        const user = await User.findOne({username})
        
        if (!user) return res.status(400).json({error: "User not found"})
    
        const passwordMatches = await bcrypt.compare(password, user.password)

        if (!passwordMatches) {
            return res.status(401).json({password: "Password is incorrect"})
        }

        const token = jwt.sign({username}, process.env.JWT_SECRET)

        // Set a cookie in the header with the token
        res.set('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            maxAge: 3600, // Hour expiration
            path: '/' // Valid across app
        }))

        return res.json(user)
    
    } catch (error) {
        
    }

}

const me = async (req: Request, res: Response) => {

    try {
        const token = req.cookies.token // Get token

        if (!token) throw new Error("Unauthenticated") // If no token

        const { username }: any = jwt.verify(token, process.env.JWT_SECRET) // Get username

        const user = await User.findOne({username}) // Look in db for user

        if (!user) throw new Error("Unauthenticated") // If no user, return unauth

        return res.json(user) // Return user
    } catch (err) {
        console.log(err)
        return res.status(401).json({error: err.message})
    }
}

const logout = (req: Request, res: Response) => {

    res.set('Set-Cookie', cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        expires: new Date(0), // Make cookie expire instantly
        path: '/' // Valid across app
    }))

    return res.status(200).json({success: true})
}

const router = Router();
router.post('/register', register)
router.post('/login', login)
router.get('/me', me)
router.get('/logout', logout)

export default router;