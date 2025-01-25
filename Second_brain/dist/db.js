"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String, unique: true },
    password: { type: String }
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
const contenttypes = ['Twitter', 'Youtube'];
const ContentSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contenttypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }]
});
exports.ContentModel = (0, mongoose_1.model)('Content', ContentSchema);
const LinkSchema = new mongoose_1.Schema({
    hash: String,
    userId: [{ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }]
});
exports.LinkModel = (0, mongoose_1.model)('Links', LinkSchema);
