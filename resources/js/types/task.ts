export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type Task = {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    due_date: string | null;
    created_at: string;
    updated_at: string;
};

export const taskStatuses: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In progress' },
    { value: 'completed', label: 'Completed' },
];

export function formatTaskStatus(status: TaskStatus): string {
    return taskStatuses.find((item) => item.value === status)?.label ?? status;
}
