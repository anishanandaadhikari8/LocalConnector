import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../../src/components/Logo';

import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../src/theme/theme';

// Mock KPI data - in real app this would come from API
const mockKPIs = [
  {
    title: 'Bookings This Week',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: 'calendar',
  },
  {
    title: 'Avg Approval Time',
    value: '45m',
    change: '-18%',
    changeType: 'positive',
    icon: 'time',
  },
  {
    title: 'Incident MTTR',
    value: '8.5h',
    change: '-22%',
    changeType: 'positive',
    icon: 'warning',
  },
  {
    title: 'Check-in Rate',
    value: '78%',
    change: '+5%',
    changeType: 'positive',
    icon: 'checkmark-circle',
  },
];

const mockRecentActivities = [
  {
    id: '1',
    type: 'booking',
    message: 'Sarah Johnson booked Fitness Center for tomorrow 7-8 AM',
    time: '2 minutes ago',
    status: 'pending',
  },
  {
    id: '2',
    type: 'incident',
    message: 'New incident reported: Pool area maintenance needed',
    time: '15 minutes ago',
    status: 'open',
  },
  {
    id: '3',
    type: 'booking',
    message: 'Alex Kim cancelled Pool booking for today',
    time: '1 hour ago',
    status: 'cancelled',
  },
  {
    id: '4',
    type: 'incident',
    message: 'Security incident resolved: Suspicious person investigation',
    time: '2 hours ago',
    status: 'resolved',
  },
];

export default function AdminDashboardScreen() {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return theme.colors.warningBg as any;
      case 'open':
        return theme.colors.dangerFg as any;
      case 'resolved':
        return theme.colors.successFg as any;
      case 'cancelled':
        return theme.colors.ink700 as any;
      default:
        return theme.colors.ink700 as any;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'time';
      case 'open':
        return 'warning';
      case 'resolved':
        return 'checkmark-circle';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return 'calendar';
      case 'incident':
        return 'warning';
      case 'member':
        return 'person';
      default:
        return 'information-circle';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{flexDirection:'row', alignItems:'center', gap:8}}>
            <Logo size={28} />
            <Text style={styles.greeting}>Good morning, Mike!</Text>
            <Text style={styles.subtitle}>Admin Dashboard</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/(admin)/profile')}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>MC</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(admin)/approvals')}
          >
            <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary700 as any} />
            <Text style={styles.actionText}>Approvals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(admin)/incidents')}
          >
            <Ionicons name="warning" size={24} color={theme.colors.dangerFg as any} />
            <Text style={styles.actionText}>Incidents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(admin)/analytics')}
          >
            <Ionicons name="bar-chart" size={24} color={theme.colors.successFg as any} />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(admin)/members')}
          >
            <Ionicons name="people" size={24} color={theme.colors.accent500 as any} />
            <Text style={styles.actionText}>Members</Text>
          </TouchableOpacity>
        </View>

        {/* KPI Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.kpiGrid}>
            {mockKPIs.map((kpi, index) => (
              <View key={index} style={styles.kpiCard}>
                <View style={styles.kpiHeader}>
                  <Ionicons name={kpi.icon as any} size={20} color={theme.colors.ink700 as any} />
                  <Text style={[
                    styles.kpiChange,
                    { color: kpi.changeType === 'positive' ? (theme.colors.successFg as any) : (theme.colors.dangerFg as any) }
                  ]}>
                    {kpi.change}
                  </Text>
                </View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiTitle}>{kpi.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.activitiesContainer}>
            {mockRecentActivities.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Ionicons name={getActivityIcon(activity.type) as any} size={20} color={theme.colors.ink700 as any} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityMessage}>{activity.message}</Text>
                  <View style={styles.activityMeta}>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(activity.status) }]}>
                      <Ionicons name={getStatusIcon(activity.status) as any} size={12} color="#FFFFFF" />
                      <Text style={styles.statusText}>{activity.status}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Pending Approvals</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Open Incidents</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Total Members</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>89%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface50 as any,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.ink900 as any,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.ink700 as any,
  },
  profileButton: {
    padding: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.dangerFg as any,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink900 as any,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink900 as any,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary700 as any,
    fontWeight: '600',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  kpiCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    
    padding: 20,
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.ink900 as any,
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 14,
    color: theme.colors.ink700 as any,
    fontWeight: '500',
  },
  activitiesContainer: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface100 as any,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: theme.colors.ink900 as any,
    marginBottom: 8,
    lineHeight: 20,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTime: {
    fontSize: 12,
    color: theme.colors.ink700 as any,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.ink900 as any,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.ink700 as any,
    textAlign: 'center',
    fontWeight: '500',
  },
});
