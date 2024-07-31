import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
});

const PublicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
    },
    comments: [CommentSchema],
    status: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Publications', PublicationSchema);