import Post from '../database/models/post.js';

class PageController {
    homeRoute = async (req, res) => {
        try {
            const posts = await Post.find({active: true}).sort({_id: -1}).populate('author');
            const postsTrucated = [];
            posts.forEach(post => {
                const newPost = (({_id, title, subtitle}) => ({_id, title, subtitle}))(post);
                if(post.author)
                    newPost.author = post.author.firstname + ' ' + post.author.surname;
                else
                    newPost.author = null;
                const d = post._id.getTimestamp();
                const date = d.toLocaleDateString("PL", { 
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                });
                newPost.publishDate = date;
                postsTrucated.push(newPost);
            });
            //console.log(postsTrucated);
            res.json(posts)
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: "Coś poszło nie tak"})
        }
    }
}

export default new PageController();