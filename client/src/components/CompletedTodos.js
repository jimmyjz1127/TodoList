import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CompletedTodoItem from './CompletedTodoItem';

class CompletedTodos extends Component {
    render() { 
        return (
            this.props.completedTodos.map((completedTodo) => (
                <CompletedTodoItem key={completedTodo.id} completedTodo={completedTodo}/>
            ))
        );
    }
}

CompletedTodos.propTypes = {
    completedTodos : PropTypes.array.isRequired
}
 
export default CompletedTodos;