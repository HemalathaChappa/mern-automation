
const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// MySQL connection
const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "root123",
  database: "mern_db"
});

function connectDB() {
  db.connect((err) => {
    if (err) {
      console.log("DB ERROR:", err);
      setTimeout(connectDB, 5000);
    } else {
      console.log("Database connected successfully");
    }
  });
}

connectDB();

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// Add a user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User added successfully",
        id: result.insertId
      });
    }
  );
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});