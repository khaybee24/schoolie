const Router = require ('express').Router();
const Authcheck = (req,res,next) => {
    if (!req.user){
        res.redirect('/auth/login');
    }
    else{
        next();
    }
};

Router.get('/',Authcheck,(req,res) => {
    res.send('you are logged in' + req.user.username);
});


module.exports = Router;