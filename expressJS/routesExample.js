const express = require("express");
const app = express();
app.use(express.json());

const credentials = [
  { email: "kirito@gmail.com", password: "SwordArt123" },
  { email: "nakul@gmail.com", password: "Nakul1234" },
];

app.get("/", (req, res) => {
  res.send("Routes Example in ExpressJS");
});

app.get("/auth/users", (req, res) => {
  res.json({ users: credentials });
});

// example of PUT request - password reset
app.put("/auth/reset", (req, res) => {
  const { email, password, newPassword } = req.body;

  // find user
  const user = credentials.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    res.status(404).json({ message: "Invalid email or password" });
  }

  // update password
  user.password = newPassword;
  res.json({ message: "Password updated successfully" });
});

// PATCH request - update email
app.patch("/auth/update-email", (req, res) => {
  const { email, password, newEmail } = req.body;

  const user = credentials.find((user) => user.email === email && user.password === password);
  if (user) {
    user.email = newEmail;
    res.json({ message: "Email updated successfully", email: user.email });
  } else {
    res.status(404).json({ message: "Invalid email or password" });
  }

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
