import express from "express";
import zod from "zod";
import { User, Tags, Link, Content } from "./db";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { authMiddleware } from "./middlewares";
import { random } from "./utils";
import cors from 'cors';

dotenv.config();
const app = express();
const port: number = 3000;
const JWT_SECRET: string = process.env.JWT_SECRET || '';
app.use(express.json());
app.use(cors({
    origin: ["https://second-brain-pink.vercel.app"],  
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],    
    credentials: true 
}));




app.options('*', cors());app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://second-brain-pink.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});



const signuporinSchema = zod.object({
    username: zod.string().min(3).max(40),
    password: zod
        .string()
        .min(8, 'The password must be at least 8 characters long')
        .max(32, 'The password must be a maximun 32 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),
});

const contentSchema = zod.object({
    type: zod.string(),
    link: zod.string(),
    title: zod.string(),
    tags: zod.array(zod.string())
})

app.get("/api/v1/test", (req, res) => {
    res.status(200).send("Test route working!");
});


app.post("/api/v1/signup", async (req, res): Promise<any> => {
    const validatedSchema = signuporinSchema.safeParse(req.body);
    if (!validatedSchema.success) {
        return res.status(411).json({ msg: "Error in inputs" });
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
        return res.status(403).json({ msg: " User already exists with this username" })
    }

    const userPassword = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    user = await User.create({
        username: req.body.username,
        password: hashedPassword
    });

    if (user) {
        return res.status(200).json({ msg: "Signed up " });
    }
    else {
        return res.status(500).json({ msg: "Internal Server Error" });
    }


});

app.post("/api/v1/signin", async (req, res): Promise<any> => {
    const validatedSchema = signuporinSchema.safeParse(req.body);
    if (!validatedSchema.success) {
        return res.status(411).json({ msg: "Error in inputs" });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        return res.status(403).json({ msg: "Wrong email entered" });
    }

    const dbPassword = user.password;
    const userPassword = req.body.password;
    const passwordMatched = await bcrypt.compare(userPassword, dbPassword);

    if (!passwordMatched) {
        return res.status(403).json("Wrong password entered");
    }

    const token = jwt.sign({ username: req.body.username }, JWT_SECRET);

    return res.status(200).json({ "token": token });

});

app.post("/api/v1/content", authMiddleware, async (req: any, res: any): Promise<any> => {
    
    const verifiedbody = contentSchema.safeParse(req.body);
    if (!verifiedbody.success) {
        return res.status(411).json({ msg: "wrong inputs" });
    }

    const userid = req.params.userid;

    const tags = []
    for (const Tag of req.body.tags) {
        const isExited = await Tags.findOne({ title: Tag });
        if (isExited) {
            tags.push(isExited?._id);
        }
        else {
            const tag = await Tags.create({
                title: Tag,
            });
            tags.push(tag?._id);
        }

    }

    try {
        const content = await Content.create({
            type: req.body.type,
            link: req.body.link,
            title: req.body.title,
            tags: tags,
            userid: userid
        })
    }
    catch (e: any) {
        return res.status(500).json({ msg: e.message });
    }


    return res.status(200).json({ msg: "content saved sucessfully" });

});

app.get("/api/v1/content", authMiddleware, async (req, res): Promise<any> => {

    // try {
    // @ts-ignore
    const userId = req.params.userid;
    try {
        var content = await Content.aggregate([
            { $match: { userid: userId } },
            {
                $lookup: {
                    from: "tags",
                    localField: "tags",
                    foreignField: "_id",
                    as: "tagsInfo"
                }
            },
            {
                $project: {
                    type: 1,
                    link: 1,
                    title: 1,
                    "tagsInfo.title": 1
                }
            }
        ])
    }
    catch(e) {
        return res.status(500).json({ error: e });
    }
    return res.status(200).json({ content: content });
});


app.delete("/api/v1/content", authMiddleware, async (req, res): Promise<any> => {

    const contentId: string = req.body.content_id;

    try {
        var deletedContent: object = await Content.deleteOne({ _id: contentId });
    }
    catch (e) {
        return res.status(500).json({ msg: e });
    }
    return res.status(200).json({ msg: "Content Deleted Successfully" });
});

// @ts-ignore
app.post("/api/v1/brain/share", authMiddleware, async (req: any, res): Promise<any> => {

    const isSharable = req.body.share;
    const userid = req.params.userid;
    if (isSharable) {
        const existingLink = await Link.findOne({ userid: userid });
        if (existingLink) {
            return res.json({
                hash: existingLink.hash
            })
        }

        const hash = random(30);
        const sharedLink = await Link.create({
            userid: userid,
            hash: hash
        });
        return res.status(200).json({ hash })
    }
    else {
        const removedLink = await Link.deleteOne({ userid: userid })
        return res.json("Link Removed sucessfully");
    }
});


app.get("/api/v1/brain/:shareLink", async (req: any, res: any): Promise<any> => {
    const hash = req.params.shareLink;
    const link = await Link.findOne({ hash });
    if (!link) {
        return res.status(411).json("IncorrectLink");
    }
    const userId = link.userid || "";
    const content = await Content.find({ userid: userId });
    const user = await User.findOne({
        _id: userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })


});

app.get("/api/v1/brain/gettags",authMiddleware,async (req,res):Promise<any>=>{
    try{
        const tags = await Tags.find({},{ title: 1, _id: 0 });
        return res.status(200).json({tags:tags});
    }
    catch(e:any)
    {
        return res.status(500).json({msg:e});
    }
})

app.listen(port, () => { console.log("server started") });