const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Generate unique IDs
const path = require("path");
const apiRoutes = require("./Develop/routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

// Route for HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop", "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop", "public", "notes.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
