import { useState, useEffect } from 'react'
import Navbar from './compoments/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)

    }
  }, [])



  const saveTOLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    saveTOLS()
  }
  const handleDelete = (id) => {
    // let id = e.target.name

    let newtodos = todos.filter(item => {
      return item.id !== id
    });

    settodos(newtodos)
    saveTOLS()
  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveTOLS()
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
    saveTOLS()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }



  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container  md:mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh]  md:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>Todoz - Manage Your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type="text" className='w-[80%] px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold p-2 py-1 rounded-md mx-6'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="" /> show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold p-2 py-1 rounded-md mx-1'><CiEdit /></button>
                <button onClick={(e) => handleDelete(item.id)} className='bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold p-2 py-1 rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
