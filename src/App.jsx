import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './compoments/Navbar'

function App() {

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh] ">
        <div className="addtodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input type="text" />
          <button className='bg-slate-700 hover:bg-slate-600 text-white p-3 py-1'>Add</button>
        </div>
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            <div className="todo flex">
             <div className="text">
              Lorem, ipsum dolor sit amet consectetur adipisicing.
             </div>
             <div className="buttons">
              <button>Edit</button>
              <button>Delete</button>
             </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
