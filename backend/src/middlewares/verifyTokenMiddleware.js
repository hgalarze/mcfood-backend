import { verifyToken } from '../utils/verifyToken.js';


export const verifyTokenMiddleware = (req, res, next) => {

    try {
        const accessToken = req.cookies.authtoken || req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            return res.status(400).json({
                message: "Missing access token"
            });
        }

        const tokenDecoded = verifyToken(accessToken);

        req.user = tokenDecoded;

        next();

    } catch(error) {
        return res.status(400).json({
            message: "Invalid access token",
            error: error.message
        });
    }
}