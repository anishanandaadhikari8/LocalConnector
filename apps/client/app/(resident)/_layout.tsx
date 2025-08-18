import React from 'react';
import { Tabs, Redirect, Link } from 'expo-router';
import Logo from '../../src/components/Logo';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/auth';
import { useCircleStore } from '../../src/store/circle';
import { theme } from '../../src/theme/theme';

export default function ResidentLayout() {
  const { role, circle } = useAuthStore();
  const { features } = useCircleStore();
  const isResident = role === 'RESIDENT' || !role; // allow pre-login view to redirect elsewhere
  if (!isResident) return <Redirect href="/(admin)/dashboard" />;
  const has = (f: string) => features?.includes(f);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={{flexDirection:'row', alignItems:'center', gap:8}}>
            <Logo size={20} />
            <Text style={styles.circleName}>{circle?.name || 'Select Circle'}</Text>
          </View>
          <Text style={styles.circleType}>{circle?.type || ''}</Text>
        </View>
        <Link href="/circles/switcher" asChild>
          <TouchableOpacity style={styles.circleSwitcher}>
            <Ionicons name="swap-horizontal" size={20} color={theme.colors.primary700 as any} />
            <Text style={styles.switchText}>Switch</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: theme.colors.primary700 as any,
          tabBarInactiveTintColor: theme.colors.ink700 as any,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="book"
          options={{
            title: 'Book',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
          href={has('BOOKINGS') ? undefined : null}
        />
        <Tabs.Screen
          name="bookings"
          options={{
            title: 'My Bookings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
          href={has('BOOKINGS') ? undefined : null}
        />
        <Tabs.Screen
          name="incidents"
          options={{
            title: 'Issues',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="warning" size={size} color={color} />
            ),
          }}
          href={has('INCIDENTS') ? undefined : null}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
          href={has('COMMS') ? undefined : null}
        />
        <Tabs.Screen
          name="polls"
          options={{
            title: 'Polls',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart" size={size} color={color} />
            ),
          }}
          href={has('COMMS') ? undefined : null}
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
    backgroundColor: theme.colors.surface50 as any,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: theme.colors.surface0 as any,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSubtle as any,
  },
  headerLeft: {
    flex: 1,
  },
  circleName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.ink900 as any,
    marginBottom: 2,
  },
  circleType: {
    fontSize: 12,
    color: theme.colors.ink700 as any,
    backgroundColor: theme.colors.surface100 as any,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  circleSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface100 as any,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  switchText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary700 as any,
    marginLeft: 4,
  },
  tabBar: {
    backgroundColor: theme.colors.surface0 as any,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderSubtle as any,
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
