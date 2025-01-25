"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.JWT_SECRET = "manas123";
mongoose_1.default.connect("mongodb+srv://manasbhalerao23:53cqN1YLFhJFS5Fp@cluster0.ykbrx.mongodb.net/Second_brain");
