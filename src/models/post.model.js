import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: [String],
    banner:{
        type: String
    },
    authorDetails:{
        name: {type: String, required: true},
        profile: {type: String},
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true }
);

export default mongoose.model("Post",PostSchema);