import { Link, router } from "@inertiajs/react";
import { Todo } from "../../types/todo";
import { useState } from "react";

///////////////////////////////////
// declaring type when passing props
//////////////////////////////////
type Props = {
  todos: Todo[];
}

export default function Index({ todos }: Props) {
  ///////////////////////////
  // useStates
  /////////////////////////
  const [task, setTask] = useState("");
  const [editForm, setEditForm] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('')


  //////////////////////////
  // Event handlers for form
  /////////////////////////   
  const handleToggle = (id: number, isCompleted: boolean) => {
    const completedAt = isCompleted ? new Date().toISOString() : null;
    router.put(`/todos/${id}`, {
      is_completed: isCompleted,
      completed_at: completedAt
    });

  }
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (task === "") {
      alert("please input a task")
      return;
    }

    router.post('/todos', { task });
    // {task} shorthand for {task:task} key value.
    setTask('');
  }

  const handleSave = (id: number) => {
    //validation 
    if (editedText === "") {
      alert("Please input something")
      return;
    }
    // if validateion passed pass the value
    router.put(`/todos/${id}`, {
      task: editedText
    })
    // remove the value
    setEditForm(null);
  }

  const closeEditForm = () => {
    setEditForm(null);
  }


  ///////////////
  // start of tsx
  ///////////////
  return (
    <>
      {/* Input Task Form */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleAddTask} method="POST" className="flex items-center space-x-4">
          <input type="text" name="task" value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out">
            Add Task
          </button>
        </form>
      </div>

      <div className=" flex justify-around mt-5 text-gray-700">
        <h1>Total: {todos.length}</h1>
        <h1>Completed: {todos.filter((todo) => todo.is_completed).length}</h1>
        <h1>Remaining: {todos.filter((todo) => !todo.is_completed).length}</h1>
      </div>



      {/* mapping of all todo list */}
      <div>
        {todos.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen text-5xl  text-gray-300 ">
            No Task
          </div>

        ) : (

        todos.map((todo) => (
          ////////////////////////////////////////////////////////////////
          // when declaring a map, it is required to have a key sa kasunod : error
          ///////////////////////////////////////////////////////////////
          <div key={todo.id} className="bg-white rounded-lg shadow-lg p-6 mb-4 flex items-center justify-between">

            <div className="flex items-center space-x-2">
              {/* handles checkbox toggle */}
              <input type="checkbox" name={todo.task} value={todo.id}
                checked={todo.is_completed}
                onChange={() => handleToggle(todo.id, !todo.is_completed)}
              />

              {/* Edit form  */}
              {editForm === todo.id ? (
                <input type="text" onChange={(e) => setEditedText(e.target.value)} value={editedText} className="border px-2 py-1 rounded" autoFocus />
              ) : (
                <span onClick={() => { setEditForm(todo.id); setEditedText(todo.task); }} className={todo.is_completed ? "text-gray-600 line-through" : ""}>
                  {todo.task}
                </span>
              )}
            </div>
            

            <div className="flex space-x-7">
              {editForm === todo.id ? (
                <div className="flex space-x-7">
                  <button type="submit" onClick={() => handleSave(todo.id)} className="text-blue-600 hover:text-blue-700 cursor-pointer " >Save</button>
                  <button type="button" onClick={closeEditForm} className="text-red-600 hover:text-red-700 cursor-pointer " >Cancel</button>
                </div>
              ) : (
                <Link className="text-red-600 hover:text-red-700 cursor-pointer " method="delete" href={`/todos/${todo.id}`}>Delete</Link>
              )}
            </div>
            
          </div>
        )))}
      </div>
      
    </>
  )
}

