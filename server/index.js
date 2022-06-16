'use strict';

const router = require('./routes/routes');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const USERDAO = require('./dao/user_DAO');
const userDao = new USERDAO();




// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = new express();
const PORT = 3001;

app.use(morgan('dev'));

// set up and enable cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
    const user = await userDao.getUser(username, password);
    if (!user)
        return cb(null, false, `Incorrect username or password.`);

    return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (user, cb) { // this user is id + email + name
    return cb(null, user);
    // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

//custom middleware
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: 'Not authorized' });
}

app.use(session({
    secret: "My_Secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


router.all(isLoggedIn);

app.use('/api', router);


//USER RELATED APIs

// POST /api/sessions
app.post('/api/sessions', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            // display wrong login messages
            return res.status(401).send(info);
        }
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);

            // req.user contains the authenticated user, we send all the user info back
            return res.status(201).json(req.user);
        });
    })(req, res, next);
});


// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else
        res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
    req.logout(() => {
        res.end();
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));