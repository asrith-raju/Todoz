import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './compoments/Navbar'
import { v4 as uuidv4 } from 'uuid';



function App() {
     const [todo, settodo] = useState("")
     const [todos, settodos] = useState([])
     const [showFinished, setshowFinished] = useState(true)

     useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if(todoString){
          let todos = JSON.parse(localStorage.getItem("todos"))
          settodos(todos)

        }
     }, [])
     


     const saveTOLS = () => {
       localStorage.setItem("todos",JSON.stringify(todos))
     }
     

  const handleEdit = (e,id) => {
     let t = todos.filter(i=> i.id === id)
     settodo(t[0].todo)
      let newtodos = todos.filter(item=>{
        return item.id!==id
      });
      settodos(newtodos)
      saveTOLS()
  }
  const handleDelete = (id) => {
    // let id = e.target.name
       
      let newtodos = todos.filter(item=>{
        return item.id!==id
      });
      console.log(newtodos);
      
      settodos(newtodos)
      saveTOLS()
  }
  const handleAdd = () => {
    settodos([...todos,{id: uuidv4(),todo , isCompleted : false}])
    settodo("")
    saveTOLS()
  }
  const handleChange = (e) => {
     settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item=>{
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
      <div className="container mx-auto my-5 rounded-xl p-5 bg-slate-100 min-h-[80vh] ">
        <div className="addtodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold p-2 py-1 rounded-md mx-6'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} id="" />show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length ===0 &&  <div className='m-5'>No Todos to Display</div> }
          {todos.map(item=>{
          
          return <div key ={item.id} className="todo flex w-1/4 my-3 justify-between">
            <div className='flex gap-5'>
            <input name = {item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>
                {item.todo}
            </div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e,item.id)} className='bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold p-2 py-1 rounded-md mx-1'>Edit</button>
              <button onClick={(e)=>handleDelete(item.id)} className='bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold p-2 py-1 rounded-md mx-1'>Delete</button>
            </div>
          </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
