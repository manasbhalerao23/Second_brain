import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken"


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        //use cookies
        const decoded = jwt.verify(token as string, JWT_SECRET as string) as unknown as JwtPayLoad;
        if(decoded){
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                message: "you are not logged in"
            })
        }
}