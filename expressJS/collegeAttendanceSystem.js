const express = require("express");

const app = express();
app.use(express.json()); // to parse JSON bodies

app.get("/", (req, res) => {
  res.send("Welcome to the College Attendance System");
});

app.get("/attendance", (req, res) => {
  const name = req.query.name;
  if (req.query.present === "yes") {
    res.send(`${name} is present`);
  } else {
    res.send(`${name} is absent`);
  }
});

// routings examples
const students = [
  { name: "Kirito", id: 1, branch: "CSE" },
  { name: "Asuna", id: 2, branch: "ECE" },
  { name: "Nakul", id: 3, branch: "CSE" },
];

app.post("/students/add", async (req, res) => {
  //method 1
  // const data = req.body;
  // students.push( {name:data.name, id:data.id, branch:data.branch} )

  //method 2
  const { name, id, branch } = req.body;

  students.push({ name, id, branch });
  res.json({ message: "Student added successfully", students });
});

app.get("/students", (req, res) => {
  res.send(students);
});


// delete student
app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    res.json({ message: "Student deleted successfully", students });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
