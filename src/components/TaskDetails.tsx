import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Task } from '@/types';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

type TaskDetailsProps = {
  task: Task;
};

export const TaskDetails = ({ task }: TaskDetailsProps) => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.content, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>{task.title}</Text>
          <Text style={[styles.course, { color: theme.primary }]}>{task.course}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.muted }]}>Status</Text>
          <Text style={[styles.value, { color: task.isCompleted ? theme.success : theme.warning }]}>
            {task.isCompleted ? '✓ Completed' : '⏳ Pending'}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.muted }]}>Priority</Text>
          <Text style={[styles.value, { color: theme.text, fontWeight: 'bold' }]}>
            {task.priority.toUpperCase()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.muted }]}>Due Date</Text>
          <Text style={[styles.value, { color: theme.text }]}>{task.dueDate}</Text>
        </View>

        {task.description ? (
          <View style={styles.descriptionSection}>
            <Text style={[styles.label, { color: theme.muted }]}>Description</Text>
            <Text style={[styles.descriptionText, { color: theme.text }]}>{task.description}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  content: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  header: {
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  course: {
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: FontSize.small,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: FontSize.body,
    flexShrink: 1,
  },
  descriptionSection: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  descriptionText: {
    fontSize: FontSize.body,
    marginTop: Spacing.xs,
    lineHeight: 22,
  },
});