const permissionVerification = (req, res, next) => {
    const forbiddenRoles = ['moderator', 'admin']
    if(!forbiddenRoles.includes(req.user.accountType)){
        res.sendStatus(403)
        return;
    }
    next()
}

export default permissionVerification