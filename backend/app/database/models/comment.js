import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {collection: "Comments"});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;

// Post
//   .find({})
//   .populate({
// 	path:     'comments',			
// 	populate: { path:  'user',
// 		    model: 'users' }
//   })
//   .exec(function(err, data){
//     if (err) return handleError(err);
//     res.json(data);
// });

