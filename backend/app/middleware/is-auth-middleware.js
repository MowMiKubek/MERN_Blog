import User from '../database/models/user.js';

const auth = async (req, res, next) => {
    try {
        const bearer = req.headers?.authorization;
        if(typeof bearer !== 'string')
            throw {message: "no bearer token"};
        const token = bearer.split(' ')[1];
        if(token === "")
            throw {message: "invalid bearer token"};
        const user = await User.findOne({apiToken: token});
        if(user && (user.accountType === 'admin' || user.accountType === 'moderator'))
            next();
        else
            res.status(403).json({message: "Nie masz dostępu"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "Coś poszło nie tak"});
    }
}

export default auth;