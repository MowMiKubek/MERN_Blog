import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        minlength: [3,"Tytuł jest za krótki"],
        required: [true, "Tytuł jest wymagany"]
    },
    subtitle: {
        type: String,
        minlength: [3,"Podtytuł za krótki"],
        //required: [true, "Podtytuł jest wymagany"]
    },
    content: {
        type: String,
        required: [true, "Treść jest wymagana"]
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    },
    // key: {
    //     required: true,
    //     unique: true
    // },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
        required: true
    }]
}, {collection: "Posts"});

const Post = mongoose.model('Post', postSchema);
export default Post;