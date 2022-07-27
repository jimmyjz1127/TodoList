const { urlencoded } = require('express');
const express = require('express');
const app = express();


const path = require('path');
// const { default: AddTodo } = require('./client/src/components/AddTodo');

app.use(express.json());
app.use(urlencoded());

//runs server and handles http requests 
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

    app.post('/delArchivedTodo', (req,res) => {
        delArchivedTodo(req.body.id);
        res.sendFile(path.join(__dirname, "archive.json"));
    });

    app.post('/archiveTodo', (req,res) => {
        archiveTodo(req.body.id);
        res.sendFile(path.join(__dirname, "database.json"));
    });

    var port = 5000;
    app.listen(port, () => console.log("Server running on Port " + port));
}

//deletes todo from todolist archive 
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

//changes the todo in the database to complete
function completeTodo(todo) {
    var fs = require('fs');

    var databaseFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json')));

    var database = [];

    databaseFile.forEach((line) => {
        if (line.id == todo.id) {
            line.completed = true;
        }
        database.push(line);
    });
    fs.writeFileSync('./database.json', JSON.stringify(database));
}

//removes a todo from database and adds it to the arhive database 
function archiveTodo(id) {
    var fs = require('fs');

    var databaseFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'database.json')));

    var archiveFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive.json')));

    var database = [];
    var archive = [];

    archiveFile.forEach((line) => {
        archive.push(line);
    });

    databaseFile.forEach((line) => {
        if (line.id == id) {
            archive.push(line);
        }
        else {
            database.push(line);
        }
    });

    fs.writeFileSync('./archive.json', JSON.stringify(archive));
    fs.writeFileSync('./database.json', JSON.stringify(database));
}

//adds a new todo item to the database
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

//Deletes an archived todo from archive.json database
function delArchivedTodo(deleteID) {
    var fs = require('fs');

    var jsonFile = JSON.parse(fs.readFileSync(path.join(__dirname, 'archive.json')));

    var json = [];

    jsonFile.forEach((line) => {
        if (line.id !== deleteID){
            json.push(line);
        }
    });

    fs.writeFileSync('./archive.json', JSON.stringify(json));
}



runServer();