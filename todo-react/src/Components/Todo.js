import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

function Todo(props) {
  return (
    <div className="container">
      <div className="page-header">
        <h1>{props.todo.title}</h1>
      </div>
      <div className="row">
        <div className="col-md-2">Description</div>
        <div className="col-md-10">
          <p>{props.todo.desc}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Link to="/" onClick={props.deleteTodo}>
            Close task
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Link to={`/edit/${props.todo.id}`}>Edit task</Link>
        </div>
      </div>
    </div>
  );
}

const Button = props => {
  let click = history => e => {
    props.onClick(e);
    history.push(props.submitUrl);
  };
  return (
    <Route
      render={({ history }) => {
        return <button onClick={click(history)}>{props.text}</button>;
      }}
    />
  );
};

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.initial;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.title) {
      alert("Title is required");
    } else {
      this.props.handleSubmit(this.state);
      this.setState({ title: "", desc: "" });
    }
  };

  render() {
    return (
      <div>
        <form>
          <div>
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
              className="form-control"
              placeHolder="Title"
            />
          </div>
          <div>
            <label>Description</label>
            <br />
            <input
              type="text"
              name="desc"
              onChange={this.handleChange}
              value={this.state.desc}
              className="form-control"
              placeHolder="Description"
            />
          </div>
          <br />
          <Button
            onClick={this.handleSubmit}
            text={this.props.submitText}
            submitUrl="/"
          />
          <br />
        </form>
      </div>
    );
  }
}

class AddTodo extends Component {
  handleSubmit = newTodo => {
    this.props.addTodo(newTodo);
  };

  render() {
    return (
      <div>
        <h3>Create new task</h3>
        <TodoForm
          initial={{ title: "", desc: "" }}
          handleSubmit={this.handleSubmit}
          submitText="Create New Task"
        />
      </div>
    );
  }
}

class EditTodo extends Component {
  handleSubmit = todo => {
    this.props.editTodo(todo);
  };

  render() {
    return (
      <div>
        <h3>Edit new task</h3>
        <TodoForm
          initial={this.props.todo}
          handleSubmit={this.handleSubmit}
          submitText="Edit New Task"
        />
      </div>
    );
  }
}

export { Todo, AddTodo, EditTodo };
