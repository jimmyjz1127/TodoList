import React, {Component} from 'react';
import CompletedTodos from '../CompletedTodos';

 class Archive extends Component {
    state = { 
        completedTodos : []
     } 

    componentDidMount() {
        fetch('/archive')
            .then(res => res.json())
            .then(completedTodos => this.setState({completedTodos}, () => console.log("archive completedTodos", completedTodos)));
    }

    render() { 
        return (
            <div className='container'>
                <h1>Completed Todos</h1>
                <CompletedTodos completedTodos={this.state.completedTodos}/>
            </div>
        );
    }
 }
  
 export default Archive;