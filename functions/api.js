const express = require("express");
const serverless = require("serverless-http");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/test", (req, res) => {
  res.send("Hello World222!");
});

//Create new record
app.post("/add", (req, res) => {
  res.send("New record added.");
});

//delete existing record
app.delete("/", (req, res) => {
  res.send("Deleted existing record");
});

//updating existing record
app.put("/", (req, res) => {
  res.send("Updating existing record");
});

//showing demo records
app.get("/demo", (req, res) => {
  res.json([
    {
      id: "001",
      name: "Smith",
      email: "smith@gmail.com",
    },
    {
      id: "002",
      name: "Sam",
      email: "sam@gmail.com",
    },
    {
      id: "003",
      name: "lily",
      email: "lily@gmail.com",
    },
  ]);
});
app.use("/.netlify/functions/api", app);
module.exports.handler = serverless(app);
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
