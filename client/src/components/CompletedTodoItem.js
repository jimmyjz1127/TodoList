import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CompletedTodoItem extends Component {
    getStyle = () => {
        return {
            backgroundColor: '#f4f4f4',
            padding: '10px',
            border: '1px #ccc dotted'
        }
    }

    render() { 
        const {title, created, finished, id} = this.props.completedTodo;
        return (
            <div style={this.getStyle()}>
                <h2>
                    {title}
                </h2>
                <p>
                    <button onClick={this.props.delArchivedTodo.bind(this, id)} style={btnStyle}>x</button>
                    <text style={{fontWeight:"bold"}}>Todo Created : </text>
                    {created}
                    <br/>
                    <text style={{fontWeight:"bold"}}>Todo Finished : </text>
                    {finished}
                </p>
            </div>
        );
    }
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

CompletedTodoItem.propTypes = {
    completedTodo : PropTypes.object.isRequired
}
 
export default CompletedTodoItem;