import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tasks } from '@/data/tasks';
import { TaskCard } from '@/components/TaskCard';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius } from '@/constants/theme';

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  // Task 6
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - Spacing.md * 2 - (columns - 1) * Spacing.md) / columns;

  // Task 5
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => !t.isCompleted).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high').length;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.md + insets.bottom, backgroundColor: theme.background },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={[styles.heading, { color: theme.text }]}>My Tasks</Text>
        <Text style={[styles.subheading, { color: theme.muted }]}>Overview & Deadlines</Text>
      </View>

      {/* Task 5*/}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.summaryNumber, { color: theme.primary }]}>{totalTasks}</Text>
          <Text style={[styles.summaryLabel, { color: theme.muted }]}>Total</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.summaryNumber, { color: theme.warning }]}>{pendingTasks}</Text>
          <Text style={[styles.summaryLabel, { color: theme.muted }]}>Pending</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.summaryNumber, { color: theme.danger }]}>{highPriorityTasks}</Text>
          <Text style={[styles.summaryLabel, { color: theme.muted }]}>High</Text>
        </View>
      </View>

      {/* Task 6 */}
      <View style={styles.gridContainer}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} style={{ width: cardWidth }} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  headerContainer: {
    marginBottom: Spacing.md,
  },
  heading: {
    fontSize: FontSize.hero,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: FontSize.body,
    marginTop: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  summaryCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryNumber: {
    fontSize: FontSize.hero,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: FontSize.small,
    marginTop: Spacing.xs,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
});