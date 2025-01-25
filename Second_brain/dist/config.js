"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.JWT_SECRET = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL;
mongoose_1.default.connect(DB_URL);
