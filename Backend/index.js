import express from 'express'
import passport  from 'passport';
import User from './model/user.js';
import 'dotenv/config';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import * as auth from './auth.js'


const ObjectId = mongoose.Types.ObjectId;

const app = express();
app.use(cors());
const port =  8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(session({
    secret: "do not have any screte",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
        // Other cookie options if needed...
    },
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/NewsHub');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.get('/', (req, res) => {
    res.send('Welcome');
})



app.post('/login', auth.login);

app.post('/signup',auth.signup);



app.listen(port,() => {

    console.log('listinig ar port : ' + port);

});