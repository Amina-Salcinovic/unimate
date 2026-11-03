import { TaskCard } from '@/components/TaskCard';
import { tasks } from '@/data/tasks';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>My Tasks</Text>
        <Text style={styles.subheading}>{tasks.length} tasks</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subheading: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

