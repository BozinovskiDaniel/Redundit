import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../entities/User';

// Middleware for auth
export default async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.cookies.token // Get token

        if (!token) throw new Error("Unauthenticated") // If no token

        const { username }: any = jwt.verify(token, process.env.JWT_SECRET) // Get username

        const user = await User.findOne({username}) // Look in db for user

        if (!user) throw new Error("Unauthenticated") // If no user, return unauth
        
        res.locals.user = user

        return next()

    } catch (err) {
        console.log(err)
        return res.status(401).json({error: "Unauthenticated"})
    }

}