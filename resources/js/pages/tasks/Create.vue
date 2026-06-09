<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import TaskController from '@/actions/App/Http/Controllers/TaskController';
import Heading from '@/components/Heading.vue';
import TaskFormFields from '@/components/TaskFormFields.vue';
import { Button } from '@/components/ui/button';
import { index } from '@/routes/tasks';

defineOptions({
    layout: {
        breadcrumbs: [
            {
                title: 'Tasks',
                href: index(),
            },
            {
                title: 'New task',
                href: index(),
            },
        ],
    },
});
</script>

<template>
    <Head title="New task" />

    <div class="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Heading
            variant="small"
            title="New task"
            description="Add a task to your list"
        />

        <Form
            v-bind="TaskController.store.form()"
            class="space-y-6"
            v-slot="{ errors, processing }"
        >
            <TaskFormFields :errors="errors" />

            <div class="flex items-center gap-4">
                <Button type="submit" :disabled="processing"
                    >Create task</Button
                >
                <Button as-child variant="outline">
                    <Link :href="index()">Cancel</Link>
                </Button>
            </div>
        </Form>
    </div>
</template>
