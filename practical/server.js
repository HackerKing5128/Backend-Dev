// import required modules
const express = require("express");
const session = require("express-session");

// express app
const app = express();
app.use(express.json())
app.use(session({
    "secret": "kimsuho",
    "resave": false,
    "saveUninitialized": false,
    "cookie": {secure: false}
}));

// hardcoded user
user = {
    "username": "admin",
    "password": "1234"
};

// middleware for protected /dashboard
function isLogged(req, res, next) {
    if (req.session && req.session.user) return next();
    return res.status(401).send("Unauthorized") ;
}


// login - POST route
app.post("/login", (req, res) => {
    const { username, password } = req.body || {};
    if (username === user.username && password === user.password) {
        req.session.user = { username };
        return res.send("Login Successful");
    }
    res.status(401).send("Invalid Credentials");
});

// dashboard - GET protected route
app.get("/dashboard", isLogged, (req, res) => {
    res.send("Welcome to Dashboard");
});

// logout - GET route
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("Error in Logging out");
        res.clearCookie("connect.sid");
        return res.send("Logout Successful");
    });
})

// start server
app.listen(3000, () => {
    "Server is running on port: 3000"
});

