import Post from "../database/models/post.js";
import Comment from "../database/models/comment.js";

class PostController{
    getPostList = async (req, res) => {
        try {
            const postData = await Post.find({}, 'title subtitle author').populate('author', 'firstname surname')
            const modifiedData = postData.map(post => {
                return {
                    ...post._doc,
                    date: post._id.getTimestamp().toISOString().split('T')[0]
                };
            });
            res.json(modifiedData)
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Coś poszło nie tak"})
        }
    }

    getPost = async (req, res) => {
        const {postID} = req.params;
        if(postID === undefined || postID === null)
            res.json({})
            try{
                const postData = await Post
                .findById(postID)
                .populate('author', 'firstname surname')
                .populate({
                    path:     'comments',			
                    populate: { 
                            path:  'author',
                            model: 'User' 
                        }
                }).lean().exec()
                postData.comments = postData.comments.map(comment => {
                    const timestamp = comment._id.getTimestamp().toISOString().split('T')[0];
                    return {
                        ...comment,
                        date: timestamp
                    };
                });
                res.json(postData);
            } catch(err) {
                console.log(err);
                res.status(500).send({ message: "Coś poszło nie tak"})
            }
    }

    
    createPost = async (req, res) => {
        const { _id, accountType } = req.user
        if(accountType !== 'admin' && accountType !== 'moderator')
        {
            res.status(403).send({ error: "Nie posiadasz odpowiednich uprawnien" })
            return;
        }
        // walidacja tokena
        const postData = new Post({
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            author: _id,
        });
        try{
            const savedPost = await postData.save();
            res.sendStatus(201)
        }
        catch(err){
            console.log(err);
            res.status(400).send({ error: "Nie udało się dodać postu"})
        }
    }

    deletePost = async (req, res) => {
        const { _id, accountType } = req.user
        const {postID} = req.body
        if(!postID) {
            res.sendStatus(400)
            return
        }
        if(accountType !== 'admin'){
            res.sendStatus(403)
            return
        }
        try{
            const postToDelete = await Post.findById(postID)
            if(postToDelete) {
                const comments = postToDelete.comments
                await Post.findByIdAndDelete(postID)
                await Comment.deleteMany({ _id: { $in: comments }})
                res.sendStatus(204)
            } else {
                res.sendStatus(404)
            }
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    }

    updatePost = async (req, res) => {
        const { _id, accountType } = req.user
        const {postID, title, subtitle, content } = req.body
        if(!postID){
            res.sendStatus(400)
            return
        }
        if(accountType !== 'admin'){
            res.sendStatus(403)
            return
        }
        try {
            const postToUpdate = await Post.findById(postID)
            if(postToUpdate) {
                postToUpdate.title = title
                postToUpdate.subtitle = subtitle
                postToUpdate.content = content
                await postToUpdate.save()
                res.sendStatus(204)
            }
        }catch(err){
            console.log(err);
            res.status(400).send({ error: "Nie udało się edytować postu"})
        }
    }

    addComment = async (req, res) => {
        console.log('komentarz')
        // walidacja tokena
        const {postID, content} = req.body;
        if(postID === undefined || postID === null)
        {
            return res.status(400).json({error: "PostID jest wymagane"});
        }
        const newComment = Comment({
            content: req.body.content,
            author: req.user._id
        });
        try {
            const post = await Post.findById(postID);
            if(!post)
                throw {error: "Post not found"};
            await newComment.save();
            const commentID = newComment._id;
            post.comments.push(commentID);
            await post.save();
            res.sendStatus(201)
        }
        catch(err) {
            console.log(err);
            res.status(500).send({ error: "Coś poszło nie tak"})
        }
    }
}

export default new PostController();
