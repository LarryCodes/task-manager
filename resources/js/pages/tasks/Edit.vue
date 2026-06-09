<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import TaskController from '@/actions/App/Http/Controllers/TaskController';
import Heading from '@/components/Heading.vue';
import TaskFormFields from '@/components/TaskFormFields.vue';
import { Button } from '@/components/ui/button';
import { index } from '@/routes/tasks';
import type { Task } from '@/types';

defineProps<{
    task: Task;
}>();

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Tasks',
                href: index(),
            },
            {
                title: 'Edit task',
                href: index(),
            },
        ],
    },
});
</script>

<template>
    <Head title="Edit task" />

    <div class="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Heading
            variant="small"
            title="Edit task"
            description="Update task details"
        />

        <Form
            v-bind="TaskController.update.form(task)"
            class="space-y-6"
            v-slot="{ errors, processing }"
        >
            <TaskFormFields :task="task" :errors="errors" />

            <div class="flex items-center gap-4">
                <Button type="submit" :disabled="processing"
                    >Save changes</Button
                >
                <Button as-child variant="outline">
                    <Link :href="index()">Cancel</Link>
                </Button>
            </div>
        </Form>

        <Form v-bind="TaskController.destroy.form(task)" class="border-t pt-6">
            <Button type="submit" variant="destructive">Delete task</Button>
        </Form>
    </div>
</template>
