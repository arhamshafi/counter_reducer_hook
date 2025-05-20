import React, { useReducer, useRef, useState } from 'react';

let initial = { todo: [] };

let reducer = (state, action) => {
    switch (action.type) {
        case "add_todo":
            return { ...state, todo: [...state.todo, action.payload] };

        case "del":
            return { ...state, todo: state.todo.filter((_, idx) => idx !== action.payload) };

        case "editTodo":
            let updated = [...state.todo];
            updated[action.payload.index] = action.payload.value;
            return { ...state, todo: updated };

        default:
            return state;
    }
};

function TodoApp() {
    let input = useRef()
    let [state, dispatch] = useReducer(reducer, initial);
    let [inp, setinp] = useState("");
    let [editIndex, setEditIndex] = useState(null);
    let [isEditing, setIsEditing] = useState(false);

    function edit_f(ele, idx) {
        setIsEditing(true);
        setinp(ele);
        setEditIndex(idx); 
        input.current.focus()
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEditing) {
            dispatch({ type: "editTodo", payload: { index: editIndex, value: inp } });
            setIsEditing(false);
            setEditIndex(null);
        } else {
            dispatch({ type: "add_todo", payload: inp });
        }
        setinp("");
    }

    return (
        <>
            <h1 className='text-center font-bold mt-4'>TODO LIST WITH REDUCER HOOK</h1>
            <div className='w-max mx-auto mt-12'>
                <form className='flex justify-center items-center gap-4' onSubmit={handleSubmit}>
                    <input className='py-2 px-3 bg-gray-200 text-black w-[350px]'
                        type="text"
                        onChange={(e) => setinp(e.target.value)}
                        value={inp}
                        ref={input}
                    />
                    <button className='py-2 px-3 bg-black text-white' type="submit">
                        {isEditing ? "Update" : "Add"}
                    </button>
                </form>
            </div>

            <ul className='w-[80%] mx-auto mt-12'>
                {state.todo.map((ele, idx) => (
                    <li key={idx} className='w-full bg-gray-200 mt-4 px-4 py-2 rounded-md h-[40px] text-black flex justify-between items-center'>
                        <p className='font-bold'>{ele}</p>
                        <div>
                            <button className='py-1 px-3 bg-blue-600 text-white rounded' onClick={() => edit_f(ele, idx)}>Edit</button>
                            <button className='py-1 px-3 bg-red-600 ml-4 text-white rounded' onClick={() => dispatch({ type: "del", payload: idx })}>Del</button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TodoApp;
