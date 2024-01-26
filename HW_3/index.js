const fs = require("fs");
const path = require("path");
const pathFile = path.join(__dirname, "counter.json");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const counter = JSON.parse(fs.readFileSync(pathFile));
    counter.home++;
    const counterJson = JSON.stringify(counter, null, 2);
    fs.writeFileSync(pathFile, counterJson);
    res.send(`<h1>Home Page</h1> <p>Просмотров: ${counter.home}</p> <a href= "/about">Ссылка на страницу About </a>`);
});

app.get("/about", (req, res) => {
    const counter = JSON.parse(fs.readFileSync(pathFile));
    counter.about++;
    const counterJson = JSON.stringify(counter, null, 2);
    fs.writeFileSync(pathFile, counterJson);
    res.send(`<h1>About Page</h1> <p>Просмотров: ${counter.about}</p> <a href= "/">Ссылка на страницу Home</a>`);
});


const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


