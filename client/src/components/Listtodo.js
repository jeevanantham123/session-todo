import React, { Fragment, useEffect, useState } from "react";
import history from "../History";

const ListTodos = (props) => {
  const [todos, setTodos] = useState([]);
  
  //delete todo function
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos_list/${id}`, {
        method: "DELETE",
        credentials: 'include'
      });
      console.log(deleteTodo);
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async user_passed => {
    try {
      const response = await fetch(`http://localhost:5000/todos_list/${user_passed}`,{
        method:"GET",
        credentials: 'include'
      });
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (err) {
      history.push("/");
    }
  };

  useEffect(() => {
    const user_passed=props.user;
    getTodos(user_passed);
  });


  return (
    <Fragment>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th> 
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)} >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
