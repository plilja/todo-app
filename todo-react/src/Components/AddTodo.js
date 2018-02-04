import React, { Component } from 'react';

class AddTodo extends Component {
  constructor(){
    super();
    this.state = {
      newTodo:{}
    }
  }

  handleSubmit(e){
    if(this.refs.title.value === '') {
      alert('Title is required');
    } else {
      this.setState({newTodo:{
        title: this.refs.title.value,
        category: this.refs.desc.value
      }}, function(){
        this.props.addTodo(this.state.newTodo);
          this.refs.title.value = '';
          this.refs.desc.value = '';
      });
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Create new task</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type="text" ref="title" />
          </div>
          <div>
            <label>Description</label><br />
            <input type="text" ref="desc" />
          </div>
          <br />
          <input type="submit" value="New task" />
          <br />
        </form>
      </div>
    );
  }
}

export default AddTodo;
