import React, { Component } from "react";

class SearchTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  search = e => {
    e.preventDefault();
    this.props.search(this.state.query);
  };

  queryChanged = e => {
    const v = e.target.value;
    this.setState({ query: v });
  };

  render() {
    return (
      <div>
        <h3>Search</h3>
        <form>
          <div>
            <input
              type="text"
              value={this.state.query}
              onChange={this.queryChanged}
              className="form-control"
              placeHolder="Query"
            />
          </div>
          <br />
          <button onClick={this.search}>Go</button>
          <br />
        </form>
      </div>
    );
  }
}

export default SearchTodo;
