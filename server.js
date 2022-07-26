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

    app.get('/archive', (req,res) => {
        res.header("Content-Type", "application/json");
        res.sendFile(path.join(__dirname, "archive.json"));
    })

    app.post('/delete', (req,res) => {
        deleteTodo(req.body.id);
        res.sendFile(path.join(__dirname, "database.json"));
    });

    app.post('/complete', (req,res) => {
        completeTodo(req.body);
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

function completeTodo(todo) {
    var fs = require('fs');

    var databaseFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json')));

   

    var json1 = [];
    var json2 = [];

    databaseFile.forEach((line) => {
        if (line.id == todo.id) {
            json2.push(todo);
        }
        json1.push(line);
    });
    fs.writeFileSync('./database.json', JSON.stringify(json1));
    

    var archiveFile = JSON.parse(fs.readFileSync(path.join(__dirname, "archive.json")));

    archiveFile.forEach((line) => {
        json2.push(line);
    });

    fs.writeFileSync('./archive.json', JSON.stringify(json2));
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