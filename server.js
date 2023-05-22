const express = require('express');
const bcrypt = require('bcrypt');


const app = express();

app.use(express.json());
const users = [];

app.get('/users', (req, res) => {
    res.json(users);
});


app.post('/users', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { name: req.body.name, password: hashedPassword };
        console.log(user);
        users.push(user);
        res.status(201).send();
    } catch{
        res.status(500).send();
    }
    

    
});


app.post('/users/login/', async (res, req) => {
    const user = users.find(user => user.name === req.body.name);
});

app.listen(3000);