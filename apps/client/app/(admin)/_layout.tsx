import React from 'react';
import { Tabs } from 'expo-router';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminLayout() {
  return (
    <View style={styles.container}>
      {/* Header with Circle Info */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.circleName}>Oakwood Apartments</Text>
          <Text style={styles.circleType}>APARTMENT • ADMIN</Text>
        </View>
        <TouchableOpacity style={styles.circleSwitcher}>
          <Ionicons name="swap-horizontal" size={20} color="#6C8CFF" />
          <Text style={styles.switchText}>Switch</Text>
        </TouchableOpacity>
      </View>

      {/* Admin Tabs */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#6C8CFF',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="approvals"
          options={{
            title: 'Approvals',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-circle" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="incidents"
          options={{
            title: 'Incidents',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="warning" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="comms"
          options={{
            title: 'Comms',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="megaphone" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="members"
          options={{
            title: 'Members',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E8F0',
  },
  headerLeft: {
    flex: 1,
  },
  circleName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111318',
    marginBottom: 2,
  },
  circleType: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  circleSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C8CFF',
    marginLeft: 4,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E8F0',
    paddingBottom: 8,
    paddingTop: 8,
    height: 88,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
