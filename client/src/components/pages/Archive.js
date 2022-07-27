import React, {Component} from 'react';
import CompletedTodos from '../CompletedTodos';

 class Archive extends Component {
    state = { 
        completedTodos : []
     } 

    //load archive database data upon mounting of component 
    componentDidMount() {
        fetch('/archive')
            .then(res => res.json())
            .then(completedTodos => this.setState({completedTodos}, () => console.log("archive completedTodos", completedTodos)));
    }

    delArchivedTodo = (id) => {
        fetch('/delArchivedTodo', {
            method: 'post',
            headers: {'Accept' : 'application/json', 'Content-type' : 'application/json'},
            body : JSON.stringify({id : id})
        })
            .then((res) => res.json())
            .then((completedTodos) => this.setState({completedTodos}, console.log('delCompeltedTodos', completedTodos)));
    }

    render() { 
        return (
            <div className='container'>
                <h1>Completed Todos</h1>
                <CompletedTodos 
                    delArchivedTodo={this.delArchivedTodo}
                    completedTodos={this.state.completedTodos}
                />
            </div>
        );
    }
 }
  
 export default Archive;