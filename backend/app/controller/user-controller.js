import User from '../database/models/user.js';
import Comments from '../database/models/comment.js'
import randomstring from 'randomstring';

class UserController {

    login = async (req, res) => {
        try{
            const user = await User.findOne({ login: req.body.login });
            if(!user) 
                throw {error: "Logowanie nie powiodło się"};
            const isValidPass = user.comparePassword(req.body.password);
            if(!isValidPass)
            {
                throw {error: "Logowanie nie powiodło się"};
            }
            if(user.accountType === "inactive")
                throw {error : "Konto nie jest jeszcze aktywne" };
            // login
            const token = user.generateAuthToken();
            res.json({token: token})
        }catch(err){
            console.log(err);
            res.status(400).json({ errors: err.error })
        }
    }

    getUserData = async (req, res) => {
        const _id = req.user._id
        try {
            const result = await User.findById(_id)
            res.json(result)
        } catch (err) {
            res.status(500)
        }
    }

    getUsersList = async (req, res) => {
        const { _id, accountType } = req.user
        if(accountType !== 'admin')
        {
            res.sendStatus(403)
            return;
        }
        try {
            const result = await User.find({})
            res.json(result)
        } catch (err) {
            console.log(err)
            res.status(500).send({ message: "Nie udalo sie wczytać użytkowników"})
        }
    }

    register = async (req, res) => {
        try{
            console.log(req.body)
            if(req.body.passwordconfirm !== req.body.password)
            { 
                throw {errors: {passwordconfirm: {message: "Hasła nie zgadzają się"}}}
            }
            const newUser = User(req.body);
            await newUser.save();
            res.sendStatus(201)
        }
        catch(err)
        {
            console.log(err);
            res.status(400).json({ errors: err.errors })
        }
    }

    profileEdit = async (req, res) => {
        const _id = req.user._id
        try{
            const user = await User.findById(_id);
            user.gender = req.body.gender;
            user.firstname = req.body.firstname;
            user.surname = req.body.surname;
            user.email = req.body.email;
            user.birthdate = req.body.birthdate;
            console.log(user)
            await user.save(); 
            res.sendStatus(202)
        }
        catch(err)
        {
            console.log(err);
            res.status(400).json({ errors: err.errors })
        }
    }

    passwordChange = async (req, res) => {
        const _id = req.user._id
        try{
            if(req.body.passwordCheck === undefined)
                throw ({error: {passwordCheck: "Powtórz hasło"}});
            if(req.body.passwordCheck !== req.body.password)
                throw ({error: {passwordCheck: "Podane hasła nie zgadzają się"}});
            const user = await User.findById(_id);
            user.password = req.body.password;
            await user.save();
            res.status(202).send({message: "Password updated"})
        } catch(err){
            console.log(err);
            res.status(400).json({ errors: err.error })
        }
    }

    delete = async (req, res) => {
        const {_id} = req.user
        const {password} = req.body
        try{
            const user = await User.findById(_id);
            if(user && user.comparePassword(password)){
                await User.findByIdAndDelete(_id)
                res.sendStatus(204)
            } else {
                // res.status(403).json( {errors: {password: {message: "Hasło nie jest poprawne" }}})
                res.sendStatus(403)
            }
        } catch(err){
            console.log(err);
            // res.status(403).json({ errors: err.errors })
            res.sendStatus(403)
        }
    }

    changeRole = async (req, res) => {
        const validRoles = ['inactive', 'user', 'moderator', 'admin']
        const { accountType } = req.user
        if(accountType !== 'admin')
        {
            res.sendStatus(403)
            return;
        }
        const { userID, newRole } = req.body;
        console.log(userID, newRole)
        if(userID === undefined || newRole === undefined || !validRoles.includes(newRole)) {
            res.status(400).send({ message: "Niepoprawne dane formularza" })
            return;
        }
        console.log(userID);
        try{
            const user = await User.findById(userID);
            if(user){
                user.accountType = newRole
                await user.save();
            } else {
                res.status(400).json({ error: "Nie znaleziono użytkownika o podanym ID" })
            }
            res.sendStatus(202)
        }
        catch (err)
        {
            console.log(err);
            res.status(400).json({ errors: err.error })
        }
    }

    //? usuwanie komentarzy razem z kontem - do zastanowienia
                // const userID = User._id;
                // const comments = await Comments.find({});
                // const commentsForDelete = [];
                // comments.forEach(comment => {
                //     if(comment.author.equals(userID)){
                //         commentsForDelete.append(comment._id);
                //     }
                // });
                // console.log(commentsForDelete);
                // commentsForDelete.forEach(async function(comment) {
                //     await Comments.findByIdAndDelete(comment);
                // });
                //await Comments.deleteMany({author: userID});

    renewApiToken = async (req, res) => {
        if(typeof req.session.user === 'undefined')
            res.redirect('/user/login');
        else {
            try {
                const user = await User.findById(req.session.user._id);
                if(user) {
                    const newToken = randomstring.generate(30);
                    user.apiToken = newToken;
                    console.log(user.apiToken);
                    await user.save();
                    res.status(201).send({message: `Nowy API token: ${newToken}. Strzeż jak oka w głowie!`});
                }
                else
                    res.status(403).send({message: "Nie masz dostępu"});

            }
            catch (err) {
                console.log(err);
                res.status(500).send({message: "Coś poszło nie tak"});
            }
        }
    }
}

export default new UserController();