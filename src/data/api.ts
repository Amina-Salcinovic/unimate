import type { Task } from '@/types';
import { tasks } from './tasks';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTasks(options: { fail?: boolean } = {}): Promise<Task[]> {
  await wait(800);
  if (options.fail) {
    throw new Error('Could not load tasks');
  }
  return tasks;
}