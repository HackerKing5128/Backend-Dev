// simple auth credentials for login and register

const express = require("express");

const app = express();
app.use(express.json());

const users = [
  { username: "kirito", password: 1234 },
  { username: "nitin", password: 4321 },
];

app.get("/", (req, res) => {
  res.send("Google Atuth System initiated...");
});

// register API
app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;

  // check whether user already exists or not
  if (users.findIndex((user) => user.username === username) !== -1) {
    res.json({ message: "User already exists. Please login." });
  }

  // validate password strength
  const passwordStrength = password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) ;

  if (username && password && passwordStrength) {
    users.push({ username, password });
    res.json({
      message: "new User registered successfully",
      username: username,
    });
  } else {
    res.json({ message: "Username and password are required" });
  }

});

// login API
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  // check whether user already exists or not
  if (users.findIndex((user) => user.username === username) === -1) {
    res.json({ message: "User does not exists. Please register." });
  }

  const user = users.find((user) => user.username === username);
  if (user.password === password) {
    res.json({ message: "Login successful", username: username });
  } else {
    res.json({ message: "Invalid credentials. please try again." });
  }

});




app.listen(3000, () => console.log("Auth server running on port 3000...."));
