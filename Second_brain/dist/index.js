"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.JWT_SECRET = process.env.JWT_SECRET;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    //get here zod validation
    // z.string().min(3,{ message: "username must be of minimum size 3"});
    // username.z.string().max(10,{ message: "username must be of maximum size 10"});
    // password.z.string().min(4).max(10);
    const hashedpassword = yield bcrypt_1.default.hash(password, 7);
    try {
        yield db_1.UserModel.create({
            username: username,
            password: hashedpassword
        });
        res.status(200).json({
            message: "Signed up"
        });
    }
    catch (e) {
        //check for more status codes
        res.status(411).json({
            message: "user already exists"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    //use cookies
    const User = yield db_1.UserModel.findOne({
        username: username
    });
    const hashpw = User === null || User === void 0 ? void 0 : User.password;
    try {
        if (typeof hashpw === 'string') {
            const check = yield bcrypt_1.default.compare(password, hashpw);
            if (User && check) {
                const token = jsonwebtoken_1.default.sign({
                    id: User._id.toString(),
                }, exports.JWT_SECRET);
                res.status(200).json({
                    message: "signed in",
                    token
                });
            }
            else {
                res.status(403).json({
                    message: "incorrect credentials"
                });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            message: "internal server error"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    yield db_1.ContentModel.create({
        link: link,
        type: type,
        title: title,
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({
        userId: userId,
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    try {
        yield db_1.ContentModel.deleteMany({
            contentId,
            userId: req.userId
        });
        res.status(200).json({
            message: "delete successfull"
        });
    }
    catch (e) {
        res.status(403).json({
            message: "cannot delete"
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existinglink = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existinglink) {
            res.json({
                hash: existinglink.hash
            });
        }
        const hashlink = (0, utils_1.random)(12);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hashlink
        });
        res.json({
            hashlink
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
        res.json({
            message: "link deleted"
        });
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash: hash
    });
    if (!link) {
        res.status(411).json({
            message: "incorrect url"
        });
        return;
    }
    const content = yield db_1.ContentModel.findOne({
        userId: link.userId
    });
    const user = yield db_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.DB_URL);
        app.listen(3000);
    });
}
main();
