import type { Task } from '@/types';

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Lab 4 - Project Repository',
    course: 'Cross-Platform Development',
    dueDate: '2026-11-02',
    priority: 'high',
    isCompleted: false,
    description: 'Create Expo app with SDK 58, set up GitHub repository, and build first screens.',
  },
  {
    id: '2',
    title: 'Database Design',
    course: 'Database Systems',
    dueDate: '2026-11-05',
    priority: 'medium',
    isCompleted: false,
    description: 'Table normalization to 3NF and ERD diagram creation.',
  },
  {
    id: '3',
    title: 'Final Exam Preparation',
    course: 'Web Programming',
    dueDate: '2027-01-15',
    priority: 'high',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'SPM Project Defense Preparation',
    course: 'Software Project Management',
    dueDate: '2026-11-15',
    priority: 'low',
    isCompleted: true,
  },
  {
    id: '5',
    title: 'Lab Assignment Preparation',
    course: 'Computer Networks',
    dueDate: '2026-11-18',
    priority: 'medium',
    isCompleted: false,
  },
];