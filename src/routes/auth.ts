import { Request, Response, Router } from "express";

import { User } from './../entities/User';

const register = async (req: Request, res: Response) => {
    const {email, username, password} = req.body;

    try {

        // TODO: Validate data

        // TODO: Create User
        const user = new User({email, username, password})
        await user.save() // Save to db

        // TODO: Return User
        return res.json(user)

    } catch (err) {

        console.log(err)
        return res.status(500).json(err)
    }

} 

const router = Router();
router.post('/register', register)

export default router;