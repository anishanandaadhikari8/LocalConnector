import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Button, Card, Header, Text } from '../ui/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="LocalConnector" />
      <View style={styles.content}>
        <Card style={{ marginBottom: spacing.lg }}>
          <Text variant="h2">Announcements</Text>
          <View style={{ height: spacing.sm }} />
          <Button title="View" onPress={() => navigation.navigate('Announcements')} />
        </Card>
        <Card style={{ marginBottom: spacing.lg }}>
          <Text variant="h2">Book an Amenity</Text>
          <View style={{ height: spacing.sm }} />
          <Button title="Book" onPress={() => navigation.navigate('Amenities')} />
        </Card>
        <Card style={{ marginBottom: spacing.lg }}>
          <Text variant="h2">Report an Incident</Text>
          <View style={{ height: spacing.sm }} />
          <Button title="Report" onPress={() => navigation.navigate('Incidents')} />
        </Card>
        <Card>
          <Text variant="h2">Directory</Text>
          <View style={{ height: spacing.sm }} />
          <Button title="Open" onPress={() => navigation.navigate('Directory')} />
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg },
});

export default HomeScreen;


