import { useState, useEffect } from 'react'
import './App.css'
import Todo from './components/Todo';

function App() {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [mode, setMode] = useState('');
  const [todo, setTodo] = useState(() => {
    const saveTodos = localStorage.getItem('todos');
    if (saveTodos) {
      return JSON.parse(saveTodos);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleRemove = (id) => {
    const removeTodo = todo.filter(t => t.id !== id);
    setTodo(removeTodo);
  }

  const handleStatus = (id) => {
    const updatedStatus = todo.map((t) => {
      if (t.id === id) {
        return { ...t, status: !t.status };
      }
      return t;
    });
    setTodo(updatedStatus);
  }

  const handleSubmit = () => {
    if (text !== "") {
      const newTodo = {
        id: todo.length + 1,
        title: text,
        status: false
      }
      setTodo([...todo, newTodo])
      setText("");
    }
  }

  const handleUpdate = (id) => {
    if (editText !== "") {
      const updatedTodo = todo.map((t) => {
        if (t.id === id) {
          return { ...t, title: editText };
        }
        return t;
      });
      setTodo(updatedTodo);
      setEditText("");
      setMode("");
    }
  }

  return (
    <>
      <div className="container mx-auto">
        <h1 className='text-4xl font-bold my-5'>Todo List</h1>
        <div className="flex mb-5">
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder='Todo'
            value={text}
            onChange={handleChange}
          />
          <button className="btn btn-primary ml-5 w-24" onClick={handleSubmit}>Add</button>
        </div>
      </div>

      {todo.map(({ id, title, status }) => (
        <div key={id} className="flex items-center justify-between my-2 bg-base-200 p-2 rounded">
          <div>
            <input
              type="checkbox"
              className="checkbox"
              checked={status}
              onChange={() => handleStatus(id)}
            />
          </div>
          <div className={status ? 'w-96 line-through' : 'w-96'}>
            {mode === id ?
              <Todo title={title} setEditText={setEditText} />
              : <p className='text-2xl'>{title}</p>}
          </div>
          <div>
            {mode === id ? <button className="btn btn-neutral w-24" onClick={() => handleUpdate(id)}>
              Update
            </button> : <button className="btn btn-neutral w-24" onClick={() => setMode(id)}>
              Edit
            </button>}
            <button onClick={() => handleRemove(id)} className="btn btn-error w-24 ml-1">
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default App
