const express = require('express');
const bodyParser = require('body-parser');

const user = require('./controller/userController');
const todo = require('./controller/todoController');

var port = 3000;
var app = express();

app.use(bodyParser.json());

app.use('/user',user);
app.use('/todo',todo);

app.get("/",(req,res)=>{
    res.send("Hello from the server");
});

app.listen(port,()=>{
    console.log("server started");
});