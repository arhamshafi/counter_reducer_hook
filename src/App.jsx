import React, { useReducer } from 'react'

let initial = { todo : [] }

let reducer = ( state , action )=>{
   
}

function App() {

  let [state , dispatch] = useReducer(dispatch , initial)

  return (
    <div>
      <h1 className='text-center font-bold text black'>Add _ ToDo with reducer_hook</h1>
    </div>
  )
}

export default App