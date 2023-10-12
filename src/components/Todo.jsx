import React from 'react'

const Todo = ({ title, setEditText }) => {
    return (
        <div>
            <input type="text" defaultValue={title} placeholder="Type here" className="input input-ghost w-full" onChange={(e) => setEditText(e.target.value)} />
        </div>
    )
}

export default Todo