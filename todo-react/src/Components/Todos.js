import React, { Component } from "react";
import Todo from "./Todo";
import { Link } from "react-router-dom";

function Todos(props) {
  return (
    <div>
      <div className="page-header">
        <h1>Open tasks</h1>
      </div>
      <div className="row">
        <ul>
          {props.todos.map(todo => {
            return (
              <li className="Todo">
                <Link to={`/view/${todo.id}`}>{todo.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todos;
