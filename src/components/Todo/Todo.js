import React, { useContext } from 'react';
import { TodoContext } from '../../context/context';

function Todo() {
  const {
    todoItem: { todo, isCompleted },
    index,
    handleDone,
    handleDelete,
  } = useContext(TodoContext);

  return (
    <div>
      <span style={{ textDecorationLine: isCompleted && 'line-through' }}>
        {todo}
      </span>
      <button onClick={() => handleDone(index)}>Done</button>
      <button onClick={() => handleDelete(index)}>Delete</button>
    </div>
  );
}

export default Todo;
