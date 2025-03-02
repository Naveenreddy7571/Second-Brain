import mongoose, { Types } from "mongoose";

mongoose.connect("mongodb+srv://bnkreddy7571:MuuM8C1ef130xGyu@cluster0.yy1ma.mongodb.net/secondbrain")

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});

const tagsSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true}
});

const contentTypes = ['image', 'video', 'article', 'audio','document','link','tweet'];

const contentSchema = new mongoose.Schema({
    link:{type:String,required:true},
    type:{type:String,enum:contentTypes,required:true},
    title:{type:String,required:true},
    tags:[{type:Types.ObjectId,ref:'Tags'}],
    userid:{type:Types.ObjectId,ref:'User'}
});

const linkSchema = new mongoose.Schema({
    hash:{type:String,required:true,unique:true},
    userid:{type:Types.ObjectId,ref:'User'}
});

const User = mongoose.model("User",userSchema);
const Tags = mongoose.model("Tags",tagsSchema);
const Link = mongoose.model("Link",linkSchema);
const Content = mongoose.model("Content",contentSchema);

export { User, Tags, Link, Content };