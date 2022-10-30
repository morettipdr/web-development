const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render('ejs')
})
app.listen(8080)