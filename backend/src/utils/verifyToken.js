import jwt from 'jsonwebtoken';
import { API_TOKEN_SECRET } from '../../config.js';

export function verifyToken(token) {

    try {
        const tokenDecoded = jwt.verify(token, API_TOKEN_SECRET);
        return tokenDecoded;
    } catch(error) {
        throw new Error("Invalid token");
    }
}