export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: Priority;
  isCompleted: boolean;
  description?: string;
};