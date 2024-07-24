import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.JWT_SECRET

export const authenticateToken = (req,res,next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({message : "Token is required"})
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({message : "Invalid token"})
        }
        req.user = user;
        next()
    })
}