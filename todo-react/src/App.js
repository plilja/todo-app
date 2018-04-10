import React, { Component } from "react";
import Todos from "./Components/Todos";
import { Todo, AddTodo, EditTodo } from "./Components/Todo";
import SearchTodo from "./Components/SearchTodo";
import { Switch, Route, Link } from "react-router-dom";
import uuid from "uuid";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      visibleTodos: []
    };
  }

  loadTodos = () => {
    // Fake fetch from persistent datastore
    let todos = [
      {
        id: uuid.v4(),
        title: "Shopping",
        desc: "yada yada yada ..."
      },
      {
        id: uuid.v4(),
        title: "Cleaning",
        desc: "yada yada yada ..."
      }
    ];

    this.setState({
      todos: todos,
      visibleTodos: todos
    });
  };

  getTodo = id => {
    let matches = this.state.todos.filter(t => t.id == id);
    return matches[0];
  };

  handleAddTodo = todo => {
    let todos = this.state.todos;
    todo.id = uuid.v4();
    todos.push(todo);
    this.setState({
      todos: todos,
      visibleTodos: todos
    });
  };

  handleDeleteTodo = id => {
    let todos = this.state.todos;
    let idx1 = todos.findIndex(t => t.id == id);
    todos.splice(idx1, 1);
    let visible = this.state.visibleTodos;
    let idx2 = visible.findIndex(t => t.id == id);
    if (idx2 != -1) {
      visible.splice(idx2, 1);
    }
    this.setState({
      todos: todos,
      visibleTodos: visible
    });
  };

  handleUpdateTodo = todo => {
    let todos = this.state.todos;
    let idx1 = todos.findIndex(t => t.id == todo.id);
    if (idx1 != -1) {
      todos = todos.slice();
      todos[idx1] = todo;
    }
    let visible = this.state.visibleTodos;
    let idx2 = visible.findIndex(t => t.id == todo.id);
    if (idx2 != -1) {
      visible = visible.slice();
      visible[idx2] = todo;
    }
    this.setState({
      todos: todos,
      visibleTodos: visible
    });
  };

  componentDidMount() {
    this.loadTodos();
  }

  handleSearchTodo = needle => {
    let needleLower = needle.toLowerCase();
    let todos = this.state.todos;
    let visible = todos.filter(
      t => t.title.toLowerCase().indexOf(needleLower) != -1
    );
    this.setState({ visibleTodos: visible });
  };

  ViewTodos = () => {
    return (
      <div className="container">
        <Todos
          todos={this.state.visibleTodos}
          deleteTodo={this.handleDeleteTodo}
        />
        <div className="row">
          <div className="col-md-6">
            <SearchTodo search={this.handleSearchTodo} />
          </div>
          <div className="col-md-6">
            <AddTodo addTodo={this.handleAddTodo} />
          </div>
        </div>
      </div>
    );
  };

  ViewTodo = props => {
    let id = props.match.params.id;
    let todo = this.getTodo(id);
    if (todo) {
      return (
        <div className="container">
          <Todo todo={todo} deleteTodo={this.handleDeleteTodo} />
        </div>
      );
    } else {
      return <div />;
    }
  };

  EditTodo = props => {
    let id = props.match.params.id;
    let todo = this.getTodo(id);
    if (todo) {
      return (
        <div className="container">
          <EditTodo todo={todo} editTodo={this.handleUpdateTodo} />
        </div>
      );
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                ToDo App
              </Link>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={this.ViewTodos} />
          <Route exact path="/view/:id" component={this.ViewTodo} />
          <Route exact path="/edit/:id" component={this.EditTodo} />
        </Switch>
      </div>
    );
  }
}

export default App;
