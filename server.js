const { urlencoded } = require('express');
const express = require('express');
const app = express();


const path = require('path');
// const { default: AddTodo } = require('./client/src/components/AddTodo');

app.use(express.json());
app.use(urlencoded());


function runServer() {
    app.get('/data', (req,res) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(__dirname, "database.json"));
    });

    app.post('/delete', (req,res) => {
        deleteTodo(req.body.id);
        res.sendFile(path.join(__dirname, "database.json"));
    });

    app.post('/complete', (req,res) => {
        completeTodo(req.body.id);
        res.sendFile(path.join(__dirname, "database.json"));
    });

    app.post('/addTodo', (req,res) => {
        addTodo(req.body);
        res.sendFile(path.join(__dirname, "database.json"));
    });


    var port = 5000;
    app.listen(port, () => console.log("Server running on Port " + port));
}

function deleteTodo(deleteID) {
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json')));

    var json = [];

    jsonFile.forEach((line) => {
        if (line.id !== deleteID){
            json.push(line);
        }
    });
    fs.writeFileSync('./database.json', JSON.stringify(json));
}

function completeTodo(completeID) {
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json')));

    var json = [];

    jsonFile.forEach((line) => {
        if (line.id == completeID) {
            line.completed = true;
        }
        json.push(line);
    });
    fs.writeFileSync('./database.json', JSON.stringify(json));
}

function addTodo(data) {
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json')));

    var json = [];

    jsonFile.forEach((line) => {
        json.push(line);
    });

    json.push(data);

    fs.writeFileSync('./database.json', JSON.stringify(json));
}



runServer();