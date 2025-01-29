import express from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, UserModel } from "./db";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.use(express.json());
app.use(cors());


app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //get here zod validation

    // z.string().min(3,{ message: "username must be of minimum size 3"});
    // username.z.string().max(10,{ message: "username must be of maximum size 10"});
    // password.z.string().min(4).max(10);

    const hashedpassword = await bcrypt.hash(password,7);

    try{
        await UserModel.create({
            username: username,
            password: hashedpassword
        })
    
        res.status(200).json({
            message: "Signed up"
        })
    }
    catch(e){
        //check for more status codes
        res.status(411).json({
            message: "user already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
//use cookies
    const User = await UserModel.findOne({
        username: username
    });
    const hashpw = User?.password;
    try{
        if(typeof hashpw === 'string'){
            const check = await bcrypt.compare(password, hashpw);
            if(User && check){
                const token = jwt.sign({
                    id: User._id.toString(),
                }, JWT_SECRET);
                res.status(200).json({
                    message: "signed in",
                    token
                })
            }
            else{
                res.status(403).json({
                    message: "incorrect credentials"
                })
            }
        }    
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            message: "internal server error"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    await ContentModel.create({
        link: link,
        type: type,
        title: title,
        userId: req.userId,
        tags: []
    })
    res.json({
        message: "content added"
    })
})


app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId,
    }).populate("userId", "username");
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId  = req.body.contentId;
    try{
        await ContentModel.deleteMany({
            contentId,
            userId: req.userId
        })
        res.status(200).json({
            message: "delete successfull"
        })
    }
    catch(e){
        res.status(403).json({
            message: "cannot delete"
        })
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
        const share = req.body.share;
        if(share){
            const existinglink = await LinkModel.findOne({
                userId:req.userId
            });
            if(existinglink){
                res.json({
                    hash: existinglink.hash
                })
            }
            const hashlink = random(12);

            await LinkModel.create({
                userId: req.userId,
                hash: hashlink
            })
            res.json({
                hashlink
            })
        }
        else {
            await LinkModel.deleteOne({
                userId: req.userId
            });
            res.json({
                message: "link deleted"
            })
        }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash: hash
    })
    if(!link){
        res.status(411).json({
            message: "incorrect url"
        })
        return;
    }

    const content = await ContentModel.findOne({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message: "user not found"
        })
        return;
    }
    res.json({
        username: user.username,
        content: content
    })
})

async function main() {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(3000);
}

main();
