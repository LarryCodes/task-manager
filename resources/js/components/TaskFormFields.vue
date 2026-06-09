<script setup lang="ts">
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { taskStatuses, type Task } from '@/types';

defineProps<{
    task?: Task;
    errors: Record<string, string>;
}>();
</script>

<template>
    <div class="grid gap-2">
        <Label for="title">Title</Label>
        <Input
            id="title"
            name="title"
            :default-value="task?.title"
            required
            placeholder="Task title"
        />
        <InputError :message="errors.title" />
    </div>

    <div class="grid gap-2">
        <Label for="description">Description</Label>
        <textarea
            id="description"
            name="description"
            rows="3"
            :default-value="task?.description ?? ''"
            placeholder="Optional details"
            class="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm dark:bg-input/30"
        />
        <InputError :message="errors.description" />
    </div>

    <div class="grid gap-2">
        <Label for="status">Status</Label>
        <select
            id="status"
            name="status"
            required
            class="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
        >
            <option
                v-for="status in taskStatuses"
                :key="status.value"
                :value="status.value"
                :selected="(task?.status ?? 'pending') === status.value"
            >
                {{ status.label }}
            </option>
        </select>
        <InputError :message="errors.status" />
    </div>

    <div class="grid gap-2">
        <Label for="due_date">Due date</Label>
        <Input
            id="due_date"
            name="due_date"
            type="date"
            :default-value="task?.due_date?.slice(0, 10)"
        />
        <InputError :message="errors.due_date" />
    </div>
</template>
