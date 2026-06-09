<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import TaskController from '@/actions/App/Http/Controllers/TaskController';
import Heading from '@/components/Heading.vue';
import TaskFormFields from '@/components/TaskFormFields.vue';
import { Button } from '@/components/ui/button';
import { create, edit, index } from '@/routes/tasks';
import { formatTaskStatus, type Task } from '@/types';

defineProps<{
    tasks: Task[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Tasks',
                href: index(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Tasks" />

    <div class="flex flex-col gap-6">
        <div class="flex items-center justify-between gap-4">
            <Heading
                variant="small"
                title="Tasks"
                description="View and manage all tasks"
            />
            <Button as-child>
                <Link :href="create()">New task</Link>
            </Button>
        </div>

        <div
            v-if="tasks.length === 0"
            class="rounded-xl border border-dashed border-sidebar-border/70 p-8 text-center dark:border-sidebar-border"
        >
            <p class="text-muted-foreground">No tasks yet.</p>
            <Button as-child class="mt-4">
                <Link :href="create()">Create your first task</Link>
            </Button>
        </div>

        <div v-else class="overflow-hidden rounded-xl border">
            <table class="w-full text-sm">
                <thead class="border-b bg-muted/40 text-left">
                    <tr>
                        <th class="px-4 py-3 font-medium">Title</th>
                        <th class="px-4 py-3 font-medium">Status</th>
                        <th class="px-4 py-3 font-medium">Due date</th>
                        <th class="px-4 py-3 text-right font-medium">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="task in tasks"
                        :key="task.id"
                        class="border-b last:border-b-0"
                    >
                        <td class="px-4 py-3">
                            <div class="font-medium">{{ task.title }}</div>
                            <p
                                v-if="task.description"
                                class="mt-1 line-clamp-1 text-muted-foreground"
                            >
                                {{ task.description }}
                            </p>
                        </td>
                        <td class="px-4 py-3">
                            {{ formatTaskStatus(task.status) }}
                        </td>
                        <td class="px-4 py-3">
                            {{
                                task.due_date
                                    ? new Date(
                                          task.due_date,
                                      ).toLocaleDateString()
                                    : '—'
                            }}
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex justify-end gap-2">
                                <Button as-child variant="outline" size="sm">
                                    <Link :href="edit(task)">Edit</Link>
                                </Button>
                                <Form
                                    v-bind="TaskController.destroy.form(task)"
                                    class="inline"
                                >
                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </Form>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
