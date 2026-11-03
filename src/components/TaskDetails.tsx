import type { Task } from '@/types';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type TaskDetailsProps = {
  task: Task;
};

export const TaskDetails = ({ task }: TaskDetailsProps) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.course}>{task.course}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>
          {task.isCompleted ? '✓ Completed' : '⏳ Pending'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Priority:</Text>
        <Text style={[styles.value, styles.priorityText]}>
          {task.priority.toUpperCase()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{task.dueDate}</Text>
      </View>

      {task.description ? (
        <View style={styles.section}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    color: '#4f46e5',
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
  },
  priorityText: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});