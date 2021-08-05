import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { TodoInputContext, TodoContext } from './context/context';

import TodoInput from './components/Todo/TodoInput';
import Todo from './components/Todo/Todo';

import './App.css';

// let tempTodoDataArray = [
//   {
//     id: uuidv4(),
//     todo: 'walk the dog',
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     todo: 'walk the cat',
//     isCompleted: false,
//   },
//   {
//     id: uuidv4(),
//     todo: 'walk the hamster',
//     isCompleted: false,
//   },
// ];

function App() {
  let initialTodosArray = window.localStorage.getItem('todos')
    ? JSON.parse(window.localStorage.getItem('todos'))
    : [];

  const [todoArray, setTodoArray] = useState(initialTodosArray);

  function addTodo(todo) {
    let newAddedTodoArray = [
      ...todoArray,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ];

    setTodoArray(newAddedTodoArray);
  }

  useEffect(() => {
    console.log(todoArray);
    console.log(JSON.stringify(todoArray));

    window.localStorage.setItem('todos', JSON.stringify(todoArray));
  }, [todoArray]);

  function showTodoInput() {
    return (
      <TodoInputContext.Provider value={{ addTodo }}>
        <TodoInput />
      </TodoInputContext.Provider>
    );
  }

  // function handleDoneByID(id) {
  //   let resultArray = todoArray.map((item) => {
  //     if (item.id === id) {
  //       item.isCompleted = !item.isCompleted;
  //     }
  //     return item;
  //   });
  //   setTodoArray(resultArray);
  // }

  function handleDone(index) {
    let newArray = [...todoArray];

    newArray[index].isCompleted = !newArray[index].isCompleted;

    setTodoArray(newArray);
  }

  function handleDelete(index) {
    //same as using spread operator above
    let newArray = Object.assign([], todoArray);

    newArray.splice(index, 1);

    setTodoArray(newArray);
  }

  function showTodo() {
    return todoArray.map((item, index) => {
      return (
        <TodoContext.Provider
          key={item.id}
          value={{ todoItem: item, index, handleDone, handleDelete }}
        >
          <Todo />
        </TodoContext.Provider>
      );
    });
  }

  return (
    <div className='App'>
      {showTodoInput()}
      {showTodo()}
    </div>
  );
}

export default App;
