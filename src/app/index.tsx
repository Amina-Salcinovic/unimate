import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Task } from '@/types';
import { fetchTasks } from '@/data/api';
import { TaskCard } from '@/components/TaskCard';
import { EmptyState } from '@/components/EmptyState';
import { FilterChip } from '@/components/FilterChip';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, FontSize, Radius } from '@/constants/theme';

type FilterType = 'all' | 'pending' | 'high' | 'medium' | 'low';
type SortType = 'default' | 'dueDate' | 'priority';

const PRIORITY_WEIGHT: Record<Task['priority'], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('default');

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - Spacing.md * 2 - (columns - 1) * Spacing.md) / columns;

  useEffect(() => {
    let ignore = false;

    fetchTasks()
      .then((data) => {
        if (!ignore) {
          setTasks(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error');
        }
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus('loading');
    setAttempt((a) => a + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch {
    } finally {
      setRefreshing(false);
    }
  }

  function confirmDelete(task: Task) {
    Alert.alert('Delete task?', `"${task.title}" will be removed from your planner.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTasks((current) => current.filter((t) => t.id !== task.id)),
      },
    ]);
  }

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => !t.isCompleted).length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high').length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'pending') return !task.isCompleted;
    return task.priority === filter;
  });

  const displayedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return a.dueDate.localeCompare(b.dueDate);
    }
    if (sortBy === 'priority') {
      return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
    }
    return 0;
  });

  const getEmptyMessage = () => {
    if (filter === 'all') {
      return { title: 'No tasks yet', message: 'Your upcoming assignments and lectures will appear here.' };
    }
    if (filter === 'pending') {
      return { title: 'All caught up!', message: 'You have no pending tasks right now.' };
    }
    return {
      title: `No ${filter} priority tasks`,
      message: 'Select another filter chip to view your other tasks.',
    };
  };

  if (status === 'loading') {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <EmptyState title="Could not load tasks" message="Check your connection and try again." />
        <Pressable
          onPress={retry}
          style={[styles.retryButton, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.retryText, { color: theme.onPrimary }]}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const emptyState = getEmptyMessage();

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <FlatList
        key={columns}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? { gap: Spacing.md } : undefined}
        data={displayedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            style={{ width: cardWidth }}
            onLongPress={() => confirmDelete(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
        refreshing={refreshing}
        onRefresh={refresh}
        contentContainerStyle={{
          flexGrow: 1,
          padding: Spacing.md,
          paddingBottom: Spacing.md + insets.bottom,
        }}
        ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
        ListHeaderComponent={
          <View>
            <View style={styles.headerContainer}>
              <Text style={[styles.heading, { color: theme.text }]}>My Tasks</Text>
              <Text style={[styles.subheading, { color: theme.muted }]}>
                Overview & Deadlines
              </Text>
            </View>

            {/* Summary Row */}
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

            {/* Filter Chips (Task 6) */}
            <Text style={[styles.sectionLabel, { color: theme.muted }]}>Filter</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
            >
              <FilterChip label="All" selected={filter === 'all'} onPress={() => setFilter('all')} />
              <FilterChip label="Pending" selected={filter === 'pending'} onPress={() => setFilter('pending')} />
              <FilterChip label="High" selected={filter === 'high'} onPress={() => setFilter('high')} />
              <FilterChip label="Medium" selected={filter === 'medium'} onPress={() => setFilter('medium')} />
              <FilterChip label="Low" selected={filter === 'low'} onPress={() => setFilter('low')} />
            </ScrollView>

            {/* Sort Chips (Task 8) */}
            <Text style={[styles.sectionLabel, { color: theme.muted }]}>Sort by</Text>
            <View style={styles.chipsRow}>
              <FilterChip
                label="Default"
                selected={sortBy === 'default'}
                onPress={() => setSortBy('default')}
              />
              <FilterChip
                label="Due Date"
                selected={sortBy === 'dueDate'}
                onPress={() => setSortBy('dueDate')}
              />
              <FilterChip
                label="Priority"
                selected={sortBy === 'priority'}
                onPress={() => setSortBy('priority')}
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <EmptyState title={emptyState.title} message={emptyState.message} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  retryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
    marginTop: Spacing.sm,
  },
  retryText: {
    fontSize: FontSize.body,
    fontWeight: '600',
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
    marginBottom: Spacing.md,
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
  sectionLabel: {
    fontSize: FontSize.small,
    fontWeight: '600',
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
  },
  chipsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
});