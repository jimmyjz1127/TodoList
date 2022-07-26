import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import {v4 as uuid} from "uuid"; 


class App extends Component{
    state = {
      todos: [],
      completedTodos: []
    }

    componentDidMount() {
      fetch('/data')
        .then(res => res.json())
        .then(todos => this.setState({todos}, () => console.log('fetch', todos)));      
    }

    //Deletes a todoItem
    onDelete = (id) => {
      fetch('/delete', {
        method: 'post',
        headers: {'Accept' : 'application/json', 'Content-type' : 'application/json'},
        body : JSON.stringify({id : id})
      }).then((res) => res.json()).then((todos) => this.setState({todos}, () => console.log('onDelete', todos)));
    }

    //toggle Complete attribute for a TodoItem
    markComplete = (id) => {
      let completedTodo;
      //here we basically replace the entire todos list in state with a new modified version with the changed todoItem
      this.setState({todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
          completedTodo = todo;
        }
        return todo;
      })});

      this.setState({completedTodos : [...this.state.completedTodos, completedTodo]});

      console.log("Completed Todos : ", this.state.completedTodos);

      fetch('/complete', {
        method: 'post',
        headers : {'Accept' : 'application/json', 'Content-type' : 'application/json'},
        body : JSON.stringify({id : id})
      }).then((res) => res.json()).then((todos) => this.setState({todos}, () => console.log('onDelete', todos)));
    }

    //add a new todo to state and database 
    addTodo = (title) => {

      const newTodo = {
        id : uuid(),
        title : title,
        completed : false
      };

      this.setState({todos : [...this.state.todos, newTodo]});

      fetch('/addTodo', {
        method: 'post',
        headers : {'Accept' : 'application/json', 'Content-type' : 'application/json'},
        body : JSON.stringify(newTodo)
      }).then((res) => res.json()).then((todos) => console.log('addTodo', todos));
    }

    render() {
      console.log(this.state.todos)
      return (
        <BrowserRouter>
          <div className='App'>
            <div className='container'>
              <Header />
              <Routes>
                <Route exact path="/" element={
                  <>
                    <AddTodo addTodo={this.addTodo}/>
                    <Todos onDelete={this.onDelete} markComplete={this.markComplete} todos={this.state.todos}/>
                  </>
                }/>
                <Route path="/about" element={<About/>}/>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      );
    }
}

export default App;
