<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
   
    public function validator(Request $request){
        return $request->validate([
            'task' => 'string',
            'completed_at' => 'nullable|string',
            'is_completed' => 'boolean'
        ]);

    }
    public function index()
    {
        return Inertia::render('todos/index', [
            'todos' => Todo::all()
        ]);
    }

   
    public function create()
    {
        return Inertia::render('todos/create');
    }

   
    public function store(Request $request)
    {
            // dd($request->all()); // This dumps all input data and stops execution

        $validated = $this->validator($request);

        // Todo::create([$validated]);
        Todo::create([
            'task' => $request->task,
            'is_completed' => $request->is_completed ?? false,
            'completed_at' => $request->completed_at,
        ]);

        return to_route('todos.index');
;    }

    /**
     * Todo is from the model
     */
    public function show(Todo $todo)
    {
        return Inertia::render('todos/show', [
            'todos' => $todo,
        ]);
    }


    public function edit(Todo $todo)
    {
        return Inertia::render('todos/edit', [
            'todos' => $todo
        ]);
    }

   
    public function update(Request $request, Todo $todo)
    {
        $validated = $this->validator($request);
        $todo->update($validated);

        return to_route('todos.index');
    }

 
    public function destroy(string $id)
    {
        $todo = Todo::find($id);
        $todo->delete();
    }
}
