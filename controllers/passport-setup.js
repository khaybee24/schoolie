const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20');
const env = require ('dotenv').config();
const User = require('../models/userSchema');
const Item = require('../models/items');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id.then((user)=>{
        done(null,user.id)
        
    })
    )})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},async(accessToken, refreshToken,profile,done) => {

await User.findOne({googleId:profile.id}).then((currentUser) => {
    if (currentUser) {
        console.log('user exists',currentUser);
        done(null,currentUser)
    } else {
        new User({
            userName: profile.displayName,
            googleId: profile.id
        }).save().then((NewUser) =>{ 
            console.log('new user signed up',NewUser);
            done(null,NewUser)
        }) 
    }
})


})
);






  