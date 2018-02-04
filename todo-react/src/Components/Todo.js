import React, { Component } from 'react';

class Todo extends Component {

  render() {
    return (
      <li className="Todo">
        <strong>{this.props.todo.title}</strong>
        <a href="#" onClick={this.props.deleteTodo.bind(this, this.props.todo.id)}>X</a>
      </li>
    );
  }
}

export default Todo;
