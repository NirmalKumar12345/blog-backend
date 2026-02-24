import { generateSlug } from "../utils/slugify.js";
import Post from "../models/post.model.js"

export const CreatePost = async (req, res) => {
    try {
        const { title, content, tags,name } = req.body;
        const slug = generateSlug(title);
        const banner = req.files?.banner ? req.files.banner[0].path.replace(/\\/g, "/") : null;
        const profile = req.files?.profile ? req.files.profile[0].path.replace(/\\/g, "/") : null;
        const exitingSlug = await Post.findOne({ slug });
        if (exitingSlug) {
            return res.status(400).json({ msg: "Slug already exits" })
        }
        const post = await Post.create({
            title,
            slug,
            content,
            tags,
            banner,
            author: req.user.id,
            authorDetails: {
                name,
                profile
            }
        });

        res.status(201).json({ msg: "Post Created", post });
    }
    catch (err) {
        res.status(500).json({ msg: "Server Error", err: err.message });
    }
}

export const getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, sort = "latest" } = req.query;
        const query = { isDeleted: false };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        const sortOption = sort === "latest" ? { createdAt: -1 } : { createdAt: 1 };
        const post = await Post.find(query)
            .populate("author", "name email")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));
        if (post.length === 0) {
            return res.status(200).json({ msg: "No Post Found" });
        }
        const total = await Post.countDocuments(query);
        res.status(200).json({ total, page: Number(page), totalPages: Math.ceil(total / limit), post });
    }
    catch (err) {
        res.status(500).json({ msg: "Server Error", err: err.message });
    }

}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("author", "name email");
        if (!post || post.isDeleted) {
            return res.status(404).json({ msg: "Post Not Found" });
        }
        res.status(200).json({ post });
    }
    catch (err) {
        res.status(500).json({ msg: "Server Error", err: err.message });
    }

}

export const updatePost = async (req,res)=>{
    try{
         const post = await Post.findById(req.params.id);
         if (!post || post.isDeleted) {
            return res.status(404).json({ msg: "Post Not Found" });
        }
        if(post.author.toString()!==req.user.id){
            return res.status(403).json({msg: "Not authorized"});
        }
        const {title,content,tags,name,banner,profile,removeBanner,removeProfile}=req.body;
        if(title){
            post.title=title,
            post.slug=generateSlug(title)
        }
        if(content) post.content= content;
        if(tags) post.tags= tags;
        if(req.files?.banner) {post.banner = req.files.banner[0].path.replace(/\\/g, "/");}
        else if(removeBanner==="true") post.banner = null;
        if(banner) post.banner = banner;
        if(name) post.authorDetails.name = name;
        if(req.files?.profile) {post.authorDetails.profile = req.files.profile[0].path.replace(/\\/g, "/");}
        else if(removeProfile==="true") post.authorDetails.profile = null;
        if(profile) post.authorDetails.profile = profile;
        
        await post.save();
        res.status(200).json({msg: "Post Updated",post});
    }
    catch (err) {
        res.status(500).json({ msg: "Server Error", err: err.message });
    }
}


export const deletePost = async(req,res)=>{
    try{
         const post = await Post.findById(req.params.id);
         if (!post || post.isDeleted) {
            return res.status(404).json({ msg: "Post Not Found" });
        }
        if(post.author.toString()!==req.user.id){
            return res.status(403).json({msg: "Not authorized"});
        }
        post.isDeleted=true;
        await post.save();
        res.status(200).json({msg: "Post Deleted Successfully"});
    }
    catch (err) {
        res.status(500).json({ msg: "Server Error", err: err.message });
    }
}