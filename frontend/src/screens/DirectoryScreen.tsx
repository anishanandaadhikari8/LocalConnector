import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Header, ListItem, Text } from '../ui/components';

const mock = [
  { id: 1, name: 'Anish', unit: '12B' },
  { id: 2, name: 'Priya', unit: '8A' },
  { id: 3, name: 'Rahul', unit: '23C' },
];

const DirectoryScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header title="Directory" />
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={mock}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <ListItem>
            <Text variant="h3">{item.name}</Text>
            <Text color={colors.subtext}>{item.unit}</Text>
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});

export default DirectoryScreen;


