import type { Task } from '@/types';
import { StyleSheet, Text, View } from 'react-native';

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <View style={[styles.card, task.isCompleted && styles.completedCard]}>
      <View style={styles.header}>
        <Text style={[styles.title, task.isCompleted && styles.completedText]}>
          {task.title}
        </Text>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(task.priority) },
          ]}
        >
          <Text style={styles.priorityText}>{task.priority.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.course}>{task.course}</Text>

      {task.description && (
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      )}

      <View style={styles.footer}>
        <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
        <Text style={styles.status}>
          {task.isCompleted ? '✓ Completed' : '⏳ Pending'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 5,
    borderLeftColor: '#4f46e5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedCard: {
    opacity: 0.6,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  course: {
    fontSize: 13,
    color: '#4f46e5',
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  dueDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
}); 