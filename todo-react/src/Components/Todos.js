import React, { Component } from 'react';
import Todo from './Todo';

class Todos extends Component {
    deleteTodo(id) {
        this.props.deleteTodo(id);
    }

  render() {
    let todos;
    if(this.props.todos){
      todos = this.props.todos.map(todo => {
        return (
          <Todo key={todo.title} todo={todo} deleteTodo={this.deleteTodo.bind(this)} />
        );
      });
    }
      
    return (
        <div>
            <div className="page-header">
                <h1>Open tasks</h1>
            </div>
            <div className="row">
                  <ul>
                    {todos}
                  </ul>
            </div>
        </div>
    );
  }
}

export default Todos;
