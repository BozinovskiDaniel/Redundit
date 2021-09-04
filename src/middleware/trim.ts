import { NextFunction, Response } from 'express';
import { Request } from 'express';
export default (req: Request, res: Response, next: NextFunction) => {

    Object.keys(req.body).forEach(key => {

        const exceptions = ['password']
        if (!exceptions.includes(key) && typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim()
        }

    })

    next()

}