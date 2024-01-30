const express = require('express');
const path = require('path');
const filePath = path.join(__dirname, 'users.json');
const fs = require('fs');
const app = express();
const Joi = require('joi');

app.use(express.json());

let uniqueID = 1;

const schema = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    lastName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    age: Joi.number()
        .integer()
        .min(1)
        .required(),

    city: Joi.string()
        .min(1)
        .max(30)
})

app.get('/users', (req, res) => {
    res.send(fs.readFileSync(filePath));
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});

app.post('/users', (req, res) => {

    getValidate(req.body, res);

    uniqueID += 1;

    const users = JSON.parse(fs.readFileSync(filePath));

    users.push({
        id: uniqueID,
        ...req.body
    });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.send({
        id: uniqueID
    });
});


app.put('/users/:id', (req, res) => {

    getValidate(req.body, res);

    const users = JSON.parse(fs.readFileSync(filePath));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        user.firstName = req.body.firstName;
        user.secondtName = req.body.secondtName;
        user.age = req.body.age;
        user.city = req.body.city;

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath));
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1)

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        res.send({ user });
    } else {
        res.status(404);
        res.send({ user: null });
    };
});


const port = 3000;


app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

function getValidate(req, res) {
    const validateResult = schema.validate(req);
    if (validateResult.error) {
        return res.status(404).send({ error: validateResult.error.details });
    }
}