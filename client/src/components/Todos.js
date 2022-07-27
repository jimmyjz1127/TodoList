import React, {Component} from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends Component{

    render() {
        return (
            this.props.todos.map((todo) => (
                <TodoItem 
                    archive={this.props.archive}
                    onDelete={this.props.onDelete}
                    markComplete={this.props.markComplete} 
                    todo={todo} 
                    key={todo.id}
                />
            ))
        );
    }
}

//create propType for todos array object 
Todos.propTypes = {
    todos : PropTypes.array.isRequired,
    markComplete : PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired 
}

export default Todos;