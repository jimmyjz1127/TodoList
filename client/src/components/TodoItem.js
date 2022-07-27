import React, {Component} from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component{

    getTitleStyle = () => {
        return {
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
            backgroundColor: '#f4f4f4',
            padding: '10px',
            border: '1px #ccc dotted'
        }
    }

    

    render() {
        const {id, title} = this.props.todo;

        return (
            <div style={this.getTitleStyle()}>
                <p>
                    <input 
                        type='checkbox' 
                        onChange={this.props.markComplete.bind(this, id)}
                        checked={this.props.todo.completed ? true : false}
                    />
                    <button onClick={this.props.onDelete.bind(this, id)} style={btnStyle}>x</button>
                    {title}
                    <button className='archiveBTN' onClick={this.props.archive.bind(this,id)} style={archiveStyle} >archive</button>
                </p>
            </div>
        );
    }
}

//create propType for todos array object 
TodoItem.propTypes = {
    todo : PropTypes.object.isRequired,
    markComplete : PropTypes.func.isRequired,
    onDelete : PropTypes.func.isRequired
}

const archiveStyle = {
    border:'#none',
    padding:"5px 10px",
    float:"right",
    marginRight:"10px"
}

const btnStyle = {
    background: "#ff0000",
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem;