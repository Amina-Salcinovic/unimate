import React from 'react';
import { View, Text, StyleSheet, Pressable, type StyleProp, type ViewStyle } from 'react-native';
import type { Task } from '@/types';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius } from '@/constants/theme';

type TaskCardProps = {
  task: Task;
  style?: StyleProp<ViewStyle>;
};

export const TaskCard = ({ task, style }: TaskCardProps) => {
  const theme = useTheme();

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return theme.danger;
      case 'medium':
        return theme.warning;
      case 'low':
        return theme.success;
      default:
        return theme.primary;
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          opacity: task.isCompleted ? 0.6 : pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.title, { color: theme.text }, task.isCompleted && styles.completedTitle]}>
          {task.title}
        </Text>
        <Text style={[styles.badge, { backgroundColor: getPriorityColor(), color: '#ffffff' }]}>
          {task.priority.toUpperCase()}
        </Text>
      </View>

      <Text style={[styles.course, { color: theme.primary }]}>{task.course}</Text>

      {task.description ? (
        <Text style={[styles.description, { color: theme.muted }]} numberOfLines={2}>
          {task.description}
        </Text>
      ) : null}

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Text style={[styles.date, { color: theme.muted }]}>Due: {task.dueDate}</Text>
        <Text style={[styles.status, { color: task.isCompleted ? theme.success : theme.warning }]}>
          {task.isCompleted ? '✓ Completed' : '⏳ Pending'}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
    position: 'relative',
  },
  cardHeader: {
    paddingRight: 60, 
  },
  title: {
    fontSize: FontSize.body,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    fontSize: FontSize.small - 2,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  course: {
    fontSize: FontSize.small,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: FontSize.small,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    marginTop: Spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  date: {
    fontSize: FontSize.small,
  },
  status: {
    fontSize: FontSize.small,
    fontWeight: '600',
  },
});