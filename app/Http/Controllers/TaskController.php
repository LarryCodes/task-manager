<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('tasks/Index', [
            'tasks' => Task::query()->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('tasks/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->user()->tasks()->create(
            $request->validate($this->taskRules()),
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Task created.')]);

        return to_route('tasks.index');
    }

    public function edit(Task $task): Response
    {
        return Inertia::render('tasks/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, Task $task): RedirectResponse
    {
        $task->update($request->validate($this->taskRules()));

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Task updated.')]);

        return to_route('tasks.index');
    }

    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Task deleted.')]);

        return to_route('tasks.index');
    }

    /**
     * @return array<string, mixed>
     */
    private function taskRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', Rule::in(['pending', 'in_progress', 'completed'])],
            'due_date' => ['nullable', 'date'],
        ];
    }
}
