"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const index_1 = require("./index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    //use cookies
    const decoded = jsonwebtoken_1.default.verify(token, index_1.JWT_SECRET);
    if (decoded) {
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "you are not logged in"
        });
    }
};
exports.userMiddleware = userMiddleware;
