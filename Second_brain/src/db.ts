import { model, Schema } from "mongoose";
import mongoose from "mongoose";


const UserSchema = new Schema({
    username : {type: String, unique: true},
    password : {type: String}
    }
)

export const UserModel = model('User', UserSchema);

const contenttypes = ['Twitter','Youtube'];

const ContentSchema = new Schema({
    link : {type: String, required: true},
    type : {type: String, enum: contenttypes, required: true},
    title : {type: String, required: true},
    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
})

export const ContentModel = model('Content', ContentSchema);

const LinkSchema = new Schema({
    hash : String,
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
})

export const LinkModel = model('Links', LinkSchema);