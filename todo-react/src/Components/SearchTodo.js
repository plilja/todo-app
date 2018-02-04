import React, { Component } from 'react';

class SearchTodo extends Component {
    handleSubmit(e) {
        this.props.search(this.refs.search.value);
        e.preventDefault();
    }

  render() {
    return (
      <div>
        <h3>Search</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <input type="text" ref="search" />
          </div>
          <br />
          <input type="submit" value="Go" />
          <br />
        </form>
      </div>
    );
  }
}

export default SearchTodo;
