import React, { Component } from 'react';
import './App.css';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import SearchTodo from './Components/SearchTodo';
import uuid from 'uuid';

class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            visibleTodos: []
        }
    }

    loadTodos() {
        // Fake fetch from persistent datastore
        let todos = [
                {
                    id : uuid.v4(),
                    title: 'Shopping',
                    desc: 'yada yada yada ...'
                },
                {
                    id : uuid.v4(),
                    title: 'Cleaning',
                    desc: 'yada yada yada ...'
                }
            ];

        this.setState({
            todos: todos,
            visibleTodos: todos
        });
    }

    handleAddTodo(todo) {
        let todos = this.state.todos;
        todo.id = uuid.v4();
        todos.push(todo);
        this.setState({
            todos : todos,
            visibleTodos: todos
        });
    }

    handleDeleteTodo(id) {
        let todos = this.state.todos;
        let idx1 = todos.findIndex(t => t.id == id);
        todos.splice(idx1, 1);
        let visible = this.state.visibleTodos;
        let idx2 = visible.findIndex(t => t.id == id);
        if (idx2 != -1) {
            visible.splice(idx2, 1);
        }
        this.setState({
            todos : todos,
            visibleTodos : visible
        });
    }

    componentWillMount() {
        this.loadTodos();
    }

    handleSearchTodo(needle) {
        let needleLower = needle.toLowerCase();
        let todos = this.state.todos;
        let visible = todos.filter(t => t.title.toLowerCase().indexOf(needleLower) != -1);
        this.setState({visibleTodos: visible});
    }

  render() {
    return (
      <div className="App">
        <nav class="navbar navbar-inverse">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">ToDo App</a>
                </div>
            </div>
        </nav>

        <div className="container">
            <Todos todos={this.state.visibleTodos} deleteTodo={this.handleDeleteTodo.bind(this)} />
            <div className="row">
                <div className="col-md-6">
                    <SearchTodo search={this.handleSearchTodo.bind(this)} />
                </div>
                <div className="col-md-6">
                    <AddTodo addTodo={this.handleAddTodo.bind(this)} />
                </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
