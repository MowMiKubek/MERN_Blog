import Post from "../database/models/post.js";
import Comment from "../database/models/comment.js";

class PostController{
    getPostList = async (req, res) => {
        try {
            const postData = await Post.find({}).populate('author', 'firstname surname')
            console.log(postData)
            res.json(postData)
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

    addComment = async (req, res) => {
        // walidacja tokena
        const {postID} = req.params;
        if(postID === undefined || postID === null)
        {
            return res.status(400).json({error: "PostID jest wymagane"});
        }
        console.log(req.session.user);
        const newComment = Comment({
            content: req.body.content,
            author: req.session.user._id
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
