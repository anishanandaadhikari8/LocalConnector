import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../../src/components/Logo';
import { theme } from '../../src/theme/theme';
import { format, parseISO } from 'date-fns';

// Mock data for now - in real app this would come from API
const mockAnnouncements = [
  {
    id: '1',
    title: 'Holiday Schedule Updates',
    body: 'Important changes to facility hours during the holiday season...',
    pinned: true,
    created_at: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'New Year\'s Eve Community Party',
    body: 'Join us for a festive celebration to ring in 2025!',
    pinned: true,
    created_at: '2024-12-17T09:15:00Z',
  },
  {
    id: '3',
    title: 'Pool Maintenance Notice',
    body: 'The swimming pool will be closed for routine maintenance...',
    pinned: false,
    created_at: '2024-12-16T14:30:00Z',
  },
];

const mockUpcomingBookings = [
  {
    id: '1',
    amenity_name: 'Fitness Center',
    start_at: '2024-12-20T07:00:00Z',
    end_at: '2024-12-20T08:00:00Z',
    status: 'APPROVED',
  },
  {
    id: '2',
    amenity_name: 'Swimming Pool',
    start_at: '2024-12-20T15:00:00Z',
    end_at: '2024-12-20T16:30:00Z',
    status: 'APPROVED',
  },
];

const mockEvents = [
  {
    id: '1',
    title: 'Community Yoga Class',
    start_at: '2024-12-22T09:00:00Z',
    end_at: '2024-12-22T10:00:00Z',
    rsvp_status: 'GOING',
  },
  {
    id: '2',
    title: 'Book Club Meeting',
    start_at: '2024-12-28T19:00:00Z',
    end_at: '2024-12-28T21:00:00Z',
    rsvp_status: 'INTERESTED',
  },
];

const mockPolls = [
  {
    id: '1',
    question: 'What community improvement would you like to see next?',
    total_votes: 24,
    has_voted: false,
  },
  {
    id: '2',
    question: 'Should we extend the fitness center hours on weekends?',
    total_votes: 18,
    has_voted: true,
  },
];

export default function ResidentHomeScreen() {
  const router = useRouter();

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM d');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return theme.colors.successFg as any;
      case 'PENDING':
        return theme.colors.warningBg as any;
      case 'REJECTED':
        return theme.colors.dangerFg as any;
      default:
        return theme.colors.ink700 as any;
    }
  };

  const getRSVPColor = (status: string) => {
    switch (status) {
      case 'GOING':
        return theme.colors.successFg as any;
      case 'INTERESTED':
        return theme.colors.warningBg as any;
      case 'DECLINED':
        return theme.colors.dangerFg as any;
      default:
        return theme.colors.ink700 as any;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{flexDirection:'row', alignItems:'center', gap:8}}>
            <Logo size={28} />
            <Text style={styles.greeting}>Good morning, Sarah!</Text>
            <Text style={styles.subtitle}>Oakwood Apartments</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/(resident)/profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SJ</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(resident)/book')}
          >
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={styles.actionText}>Book Amenity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(resident)/incidents')}
          >
            <Text style={styles.actionIcon}>🚨</Text>
            <Text style={styles.actionText}>Report Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(resident)/events')}
          >
            <Text style={styles.actionIcon}>🎉</Text>
            <Text style={styles.actionText}>Events</Text>
          </TouchableOpacity>
        </View>

        {/* Pinned Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📌 Pinned Announcements</Text>
            <TouchableOpacity onPress={() => router.push('/(resident)/announcements')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {mockAnnouncements.filter(a => a.pinned).map((announcement) => (
            <TouchableOpacity key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <Text style={styles.announcementTitle}>{announcement.title}</Text>
                <Text style={styles.announcementDate}>
                  {formatDate(announcement.created_at)}
                </Text>
              </View>
              <Text style={styles.announcementBody} numberOfLines={2}>
                {announcement.body}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📅 Upcoming Bookings</Text>
            <TouchableOpacity onPress={() => router.push('/(resident)/bookings')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {mockUpcomingBookings.length > 0 ? (
            mockUpcomingBookings.map((booking) => (
              <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingAmenity}>{booking.amenity_name}</Text>
                  <Text style={styles.bookingTime}>
                    {formatDate(booking.start_at)} • {formatTime(booking.start_at)} - {formatTime(booking.end_at)}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
                  <Text style={styles.statusText}>{booking.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No upcoming bookings</Text>
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => router.push('/(resident)/book')}
              >
                <Text style={styles.emptyStateButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎉 Community Events</Text>
            <TouchableOpacity onPress={() => router.push('/(resident)/events')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {mockEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>
                  {formatDate(event.start_at)} • {formatTime(event.start_at)} - {formatTime(event.end_at)}
                </Text>
              </View>
              <View style={[styles.rsvpBadge, { backgroundColor: getRSVPColor(event.rsvp_status) }]}>
                <Text style={styles.rsvpText}>{event.rsvp_status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Polls */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Community Polls</Text>
            <TouchableOpacity onPress={() => router.push('/(resident)/polls')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {mockPolls.map((poll) => (
            <TouchableOpacity key={poll.id} style={styles.pollCard}>
              <View style={styles.pollInfo}>
                <Text style={styles.pollQuestion}>{poll.question}</Text>
                <Text style={styles.pollVotes}>{poll.total_votes} responses</Text>
              </View>
              <View style={styles.pollAction}>
                {poll.has_voted ? (
                  <Text style={styles.votedText}>✓ Voted</Text>
                ) : (
                  <TouchableOpacity style={styles.voteButton}>
                    <Text style={styles.voteButtonText}>Vote</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
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
    backgroundColor: theme.colors.primary700 as any,
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
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.ink900 as any,
    textAlign: 'center',
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
  announcementCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink900 as any,
    flex: 1,
  },
  announcementDate: {
    fontSize: 12,
    color: theme.colors.ink700 as any,
  },
  announcementBody: {
    fontSize: 14,
    color: theme.colors.ink700 as any,
    lineHeight: 20,
  },
  bookingCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingAmenity: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink900 as any,
    marginBottom: 4,
  },
  bookingTime: {
    fontSize: 14,
    color: theme.colors.ink700 as any,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  emptyState: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.ink700 as any,
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: theme.colors.primary700 as any,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyStateButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  eventCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink900 as any,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: theme.colors.ink700 as any,
  },
  rsvpBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rsvpText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  pollCard: {
    backgroundColor: theme.colors.surface0 as any,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pollInfo: {
    flex: 1,
  },
  pollQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.ink900 as any,
    marginBottom: 4,
  },
  pollVotes: {
    fontSize: 14,
    color: theme.colors.ink700 as any,
  },
  pollAction: {
    alignItems: 'center',
  },
  votedText: {
    fontSize: 14,
    color: theme.colors.successFg as any,
    fontWeight: '600',
  },
  voteButton: {
    backgroundColor: theme.colors.primary700 as any,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
