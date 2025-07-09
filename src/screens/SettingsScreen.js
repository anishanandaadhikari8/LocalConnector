import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Divider, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Settings</Text>
        <Divider style={styles.divider} />
        <List.Section>
          <List.Subheader>Preferences</List.Subheader>
          <List.Item
            title="Push Notifications"
            left={() => <List.Icon icon="bell-outline" />}
            right={() => (
              <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
            )}
          />
          <List.Item
            title="Dark Mode"
            left={() => <List.Icon icon="theme-light-dark" />}
            right={() => (
              <Switch value={darkMode} onValueChange={setDarkMode} />
            )}
          />
          <List.Item
            title="Location Access"
            left={() => <List.Icon icon="map-marker" />}
            right={() => (
              <Switch value={locationEnabled} onValueChange={setLocationEnabled} />
            )}
          />
        </List.Section>
        <Divider style={styles.divider} />
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            title="Edit Profile"
            left={() => <List.Icon icon="account-edit" />}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <List.Item
            title="Change Password"
            left={() => <List.Icon icon="lock-reset" />}
            onPress={() => alert('Change password (mock)')}
          />
        </List.Section>
        <Divider style={styles.divider} />
        <List.Section>
          <List.Subheader>Support</List.Subheader>
          <List.Item
            title="Help & FAQ"
            left={() => <List.Icon icon="help-circle-outline" />}
            onPress={() => navigation.navigate('HelpFAQ')}
          />
          <List.Item
            title="Contact Support"
            left={() => <List.Icon icon="email-outline" />}
            onPress={() => alert('Contact support (mock)')}
          />
        </List.Section>
        <Divider style={styles.divider} />
        <Button
          mode="outlined"
          style={styles.logoutButton}
          textColor={theme.colors.error}
          onPress={() => alert('Logged out (mock)')}
        >
          Log Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
  logoutButton: {
    marginTop: 24,
    borderColor: '#ef4444',
  },
});

export default SettingsScreen; 