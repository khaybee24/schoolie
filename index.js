const express = require ('express');
const passport = require('passport');
const env = require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000
const connectDB = require('./Db/Db')
const authRoutes =require('../SRC/Routes/googleRoutes');
const passportSetup = require('./controllers/passport-setup');
const User = require('./models/userSchema');
const morgan = require('morgan')
const cookieSession = require('cookie-session');
const adminRouter = require('./Routes/adminRoutes');
const userRouter = require ('./Routes/googleRoutes')
const profileRoutes = require('./Routes/profileRoutes')



connectDB();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
   keys: [process.env.COOKIE]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', userRouter)
app.use("/api/v1/admin", adminRouter);

app.get('/', (req,res) => {
    res.render('Home')
});

app.get('/login', (req,res) => {
    res.render('login')
});
// app.get('/', (req,res) => {
//     res.send('welcome to home page')
// });


app.listen(port,
     console.log(`app is active on http://localhost:${port}`));