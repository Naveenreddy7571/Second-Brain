"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const middlewares_1 = require("./middlewares");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
const port = 3000;
const JWT_SECRET = process.env.JWT_SECRET || '';
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
const signuporinSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(40),
    password: zod_1.default
        .string()
        .min(8, 'The password must be at least 8 characters long')
        .max(32, 'The password must be a maximun 32 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),
});
const contentSchema = zod_1.default.object({
    type: zod_1.default.string(),
    link: zod_1.default.string(),
    title: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string())
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedSchema = signuporinSchema.safeParse(req.body);
    if (!validatedSchema.success) {
        return res.status(411).json({ msg: "Error in inputs" });
    }
    let user = yield db_1.User.findOne({ username: req.body.username });
    if (user) {
        return res.status(403).json({ msg: " User already exists with this username" });
    }
    const userPassword = req.body.password;
    const salt = yield bcrypt_1.default.genSalt();
    const hashedPassword = yield bcrypt_1.default.hash(userPassword, salt);
    user = yield db_1.User.create({
        username: req.body.username,
        password: hashedPassword
    });
    if (user) {
        return res.status(200).json({ msg: "Signed up " });
    }
    else {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedSchema = signuporinSchema.safeParse(req.body);
    if (!validatedSchema.success) {
        return res.status(411).json({ msg: "Error in inputs" });
    }
    const user = yield db_1.User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(403).json({ msg: "Wrong email entered" });
    }
    const dbPassword = user.password;
    const userPassword = req.body.password;
    const passwordMatched = yield bcrypt_1.default.compare(userPassword, dbPassword);
    if (!passwordMatched) {
        return res.status(403).json("Wrong password entered");
    }
    const token = jsonwebtoken_1.default.sign({ username: req.body.username }, JWT_SECRET);
    return res.status(200).json({ "token": token });
}));
app.post("/api/v1/content", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedbody = contentSchema.safeParse(req.body);
    if (!verifiedbody.success) {
        return res.status(411).json({ msg: "wrong inputs" });
    }
    const userid = req.params.userid;
    const tags = [];
    for (const Tag of req.body.tags) {
        const isExited = yield db_1.Tags.findOne({ title: Tag });
        if (isExited) {
            tags.push(isExited === null || isExited === void 0 ? void 0 : isExited._id);
        }
        else {
            const tag = yield db_1.Tags.create({
                title: Tag,
            });
            tags.push(tag === null || tag === void 0 ? void 0 : tag._id);
        }
    }
    try {
        const content = yield db_1.Content.create({
            type: req.body.type,
            link: req.body.link,
            title: req.body.title,
            tags: tags,
            userid: userid
        });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
    return res.status(200).json({ msg: "content saved sucessfully" });
}));
app.get("/api/v1/content", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    // @ts-ignore
    const userId = req.params.userid;
    try {
        var content = yield db_1.Content.aggregate([
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
        ]);
    }
    catch (e) {
        return res.status(500).json({ error: e });
    }
    return res.status(200).json({ content: content });
}));
app.delete("/api/v1/content", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.content_id;
    try {
        var deletedContent = yield db_1.Content.deleteOne({ _id: contentId });
    }
    catch (e) {
        return res.status(500).json({ msg: e });
    }
    return res.status(200).json({ msg: "Content Deleted Successfully" });
}));
// @ts-ignore
app.post("/api/v1/brain/share", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isSharable = req.body.share;
    const userid = req.params.userid;
    if (isSharable) {
        const existingLink = yield db_1.Link.findOne({ userid: userid });
        if (existingLink) {
            return res.json({
                hash: existingLink.hash
            });
        }
        const hash = (0, utils_1.random)(30);
        const sharedLink = yield db_1.Link.create({
            userid: userid,
            hash: hash
        });
        return res.status(200).json({ hash });
    }
    else {
        const removedLink = yield db_1.Link.deleteOne({ userid: userid });
        return res.json("Link Removed sucessfully");
    }
}));
app.get("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.Link.findOne({ hash });
    if (!link) {
        return res.status(411).json("IncorrectLink");
    }
    const userId = link.userid || "";
    const content = yield db_1.Content.find({ userid: userId });
    const user = yield db_1.User.findOne({
        _id: userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
app.get("/api/v1/brain/gettags", middlewares_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield db_1.Tags.find({}, { title: 1, _id: 0 });
        return res.status(200).json({ tags: tags });
    }
    catch (e) {
        return res.status(500).json({ msg: e });
    }
}));
app.listen(port, () => { console.log("server started"); });
