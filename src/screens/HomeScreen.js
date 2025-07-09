import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { format, isValid } from 'date-fns';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Chip, Badge, Surface, FAB, Avatar, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../providers/AuthProvider';
import { useData } from '../providers/DataProvider';
import { getElevationStyle, getConnectorColor } from '../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState(null);
  
  const theme = useTheme();
  const { user } = useAuth();
  const { 
    posts, 
    connectorsList, 
    eventsList, 
    notificationsList,
    likePost,
    getPostsByConnector,
    getConnectorById,
    getUserById
  } = useData();

  const onRefresh = async () => {
    setRefreshing(true);
    // In a real app, this would refresh data from the server
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getRecentPosts = () => {
    if (!posts || !Array.isArray(posts)) return [];
    if (selectedConnector) {
      return getPostsByConnector(selectedConnector.connectorId).slice(0, 5);
    }
    return posts.slice(0, 5);
  };

  const getUserConnectors = () => {
    if (!user?.joinedConnectors || !connectorsList || !Array.isArray(connectorsList)) return [];
    return connectorsList.filter(connector => 
      user.joinedConnectors.includes(connector.connectorId)
    );
  };

  const getUpcomingEvents = () => {
    if (!eventsList || !Array.isArray(eventsList)) return [];
    const now = new Date();
    return eventsList
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const getUnreadNotifications = () => {
    if (!notificationsList || !Array.isArray(notificationsList)) return 0;
    return notificationsList.filter(notification => !notification.read).length;
  };

  const handleLikePost = async (postId) => {
    if (!user) return;
    await likePost(postId, user.id);
  };

  const handleConnectorPress = (connector) => {
    navigation.navigate('CommunityDetails', { community: connector });
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const handleCreatePost = () => {
    if (selectedConnector) {
      navigation.navigate('CreatePost', { connectorId: selectedConnector.connectorId });
    } else {
      navigation.navigate('CreatePost');
    }
  };

  const renderStoryItem = ({ item: connector }) => (
    <TouchableOpacity 
      style={styles.storyItem}
      onPress={() => handleConnectorPress(connector)}
    >
      <View style={[styles.storyAvatar, { borderColor: getConnectorColor(connector.category) }]}>
        <Avatar.Image 
          size={50} 
          source={{ uri: connector.image }} 
        />
      </View>
      <Text style={[styles.storyName, theme.typography.bodySmall]} numberOfLines={1}>
        {connector.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPostCard = ({ item: post }) => {
    // Safe date formatting with fallback
    let formattedDate = 'Just now';
    try {
      const postDate = new Date(post.createdAt);
      if (isValid(postDate)) {
        formattedDate = format(postDate, 'MMM d, h:mm a');
      }
    } catch (error) {
      console.warn('Invalid date format:', post.createdAt);
    }

    const connector = getConnectorById(post.connectorId);
    const author = getUserById(post.author.id);

    return (
      <Card style={[styles.postCard, getElevationStyle('sm', theme)]}>
        <Card.Content>
          <View style={styles.postHeader}>
            <View style={styles.postAuthor}>
              <Avatar.Image 
                size={40} 
                source={{ uri: author?.avatar || post.author.avatar }} 
              />
              <View style={styles.postAuthorInfo}>
                <Text style={[styles.postAuthorName, theme.typography.titleSmall]}>
                  {author?.name || post.author.name}
                </Text>
                <Text style={[styles.postTime, theme.typography.bodySmall]}>
                  {formattedDate}
                </Text>
              </View>
            </View>
            {connector && (
              <Chip 
                mode="outlined" 
                style={[styles.connectorChip, { borderColor: getConnectorColor(connector.category) }]}
                textStyle={{ color: getConnectorColor(connector.category) }}
              >
                {connector.name}
              </Chip>
            )}
          </View>
          
          <Text style={[styles.postContent, theme.typography.bodyMedium]}>
            {post.content}
          </Text>
          
          {post.image && (
            <Image 
              source={{ uri: post.image }} 
              style={styles.postImage}
              resizeMode="cover"
            />
          )}

          <View style={styles.postActions}>
            <TouchableOpacity 
              style={styles.postAction}
              onPress={() => handleLikePost(post.postId)}
            >
              <MaterialCommunityIcons 
                name={post.isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={post.isLiked ? theme.colors.error : theme.colors.onSurfaceVariant} 
              />
              <Text style={[styles.postActionText, theme.typography.bodySmall]}>
                {post.likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <MaterialCommunityIcons 
                name="comment-outline" 
                size={20} 
                color={theme.colors.onSurfaceVariant} 
              />
              <Text style={[styles.postActionText, theme.typography.bodySmall]}>
                {post.comments}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <MaterialCommunityIcons 
                name="share-variant-outline" 
                size={20} 
                color={theme.colors.onSurfaceVariant} 
              />
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderEventCard = ({ item: event }) => (
    <Card style={[styles.eventCard, getElevationStyle('sm', theme)]}>
      <Card.Content>
        <View style={styles.eventHeader}>
          <MaterialCommunityIcons 
            name="calendar" 
            size={24} 
            color={theme.colors.primary} 
          />
          <View style={styles.eventInfo}>
            <Text style={[styles.eventTitle, theme.typography.titleSmall]}>
              {event.title}
            </Text>
            <Text style={[styles.eventDate, theme.typography.bodySmall]}>
              {format(new Date(event.date), 'MMM d, h:mm a')}
            </Text>
          </View>
        </View>
        <Text style={[styles.eventDescription, theme.typography.bodySmall]}>
          {event.description}
        </Text>
        <View style={styles.eventStats}>
          <Text style={[styles.eventStatsText, theme.typography.bodySmall]}>
            📍 {event.location}
          </Text>
          <Text style={[styles.eventStatsText, theme.typography.bodySmall]}>
            👥 {event.attendeeCount} attending
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const renderConnectorCard = ({ item: connector }) => (
    <TouchableOpacity 
      style={styles.connectorCard}
      onPress={() => handleConnectorPress(connector)}
    >
      <Surface style={[styles.connectorCardInner, getElevationStyle('sm', theme)]}>
        <Image source={{ uri: connector.image }} style={styles.connectorImage} />
        <View style={styles.connectorOverlay}>
          <Chip 
            style={[styles.connectorTypeChip, { backgroundColor: getConnectorColor(connector.category) }]}
            textStyle={styles.connectorTypeText}
          >
            {connector.category}
          </Chip>
        </View>
        <View style={styles.connectorInfo}>
          <Text style={styles.connectorName}>{connector.name}</Text>
          <Text style={styles.connectorMembers}>{connector.memberCount} members</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.greeting, theme.typography.headlineSmall]}>
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}!
            </Text>
            <Text style={[styles.userName, theme.typography.titleMedium]}>
              {user?.name || 'Neighbor'}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <MaterialCommunityIcons 
                name="bell-outline" 
                size={24} 
                color={theme.colors.onSurface} 
              />
              {getUnreadNotifications() > 0 && (
                <Badge style={styles.notificationBadge}>
                  {getUnreadNotifications()}
                </Badge>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Connector Filter */}
        {getUserConnectors().length > 0 && (
          <View style={styles.connectorFilter}>
            <Text style={[styles.filterTitle, theme.typography.titleSmall]}>
              Your Connectors
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[
                  styles.filterChip,
                  !selectedConnector && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => setSelectedConnector(null)}
              >
                <Text style={[
                  styles.filterChipText,
                  !selectedConnector && { color: theme.colors.onPrimary }
                ]}>
                  All
                </Text>
              </TouchableOpacity>
              {getUserConnectors().map(connector => (
                <TouchableOpacity
                  key={connector.connectorId}
                  style={[
                    styles.filterChip,
                    selectedConnector?.connectorId === connector.connectorId && { 
                      backgroundColor: theme.colors.primary 
                    }
                  ]}
                  onPress={() => setSelectedConnector(connector)}
                >
                  <Text style={[
                    styles.filterChipText,
                    selectedConnector?.connectorId === connector.connectorId && { 
                      color: theme.colors.onPrimary 
                    }
                  ]}>
                    {connector.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Stories/Connectors */}
        <View style={styles.storiesSection}>
          <Text style={[styles.sectionTitle, theme.typography.titleMedium]}>
            Your Communities
          </Text>
          <FlatList
            data={getUserConnectors()}
            renderItem={renderStoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesList}
            keyExtractor={(item) => item.connectorId}
          />
        </View>

        {/* Recent Posts */}
        <View style={styles.postsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, theme.typography.titleMedium]}>
              Recent Posts
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Communities')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={getRecentPosts()}
            renderItem={renderPostCard}
            keyExtractor={(item) => item.postId}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>

        {/* Upcoming Events */}
        {getUpcomingEvents().length > 0 && (
          <View style={styles.eventsSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, theme.typography.titleMedium]}>
                Upcoming Events
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={getUpcomingEvents()}
              renderItem={renderEventCard}
              keyExtractor={(item) => item.eventId}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Popular Connectors */}
        <View style={styles.connectorsSection}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, theme.typography.titleMedium]}>
              Popular Connectors
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Communities')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={connectorsList.slice(0, 4)}
            renderItem={renderConnectorCard}
            keyExtractor={(item) => item.connectorId}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="Create Post"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleCreatePost}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontWeight: '600',
    marginBottom: 4,
  },
  userName: {
    fontWeight: '500',
  },
  headerRight: {
    position: 'relative',
  },
  notificationButton: {
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#ef4444',
  },
  connectorFilter: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterChipText: {
    fontWeight: '500',
    fontSize: 14,
  },
  storiesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  seeAllText: {
    fontWeight: '500',
  },
  storiesList: {
    paddingHorizontal: 20,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 70,
  },
  storyAvatar: {
    borderWidth: 3,
    borderRadius: 30,
    marginBottom: 8,
  },
  storyName: {
    textAlign: 'center',
    fontWeight: '500',
  },
  postsSection: {
    marginBottom: 24,
  },
  postCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAuthorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  postAuthorName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  postTime: {
    color: '#666',
  },
  connectorChip: {
    borderRadius: 12,
  },
  postContent: {
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  postActionText: {
    marginLeft: 4,
    color: '#666',
  },
  eventsSection: {
    marginBottom: 24,
  },
  eventCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfo: {
    marginLeft: 12,
    flex: 1,
  },
  eventTitle: {
    fontWeight: '600',
    marginBottom: 2,
  },
  eventDate: {
    color: '#666',
  },
  eventDescription: {
    marginBottom: 8,
    lineHeight: 18,
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventStatsText: {
    color: '#666',
  },
  connectorsSection: {
    marginBottom: 100,
  },
  connectorCard: {
    flex: 1,
    margin: 4,
  },
  connectorCardInner: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  connectorImage: {
    width: '100%',
    height: 100,
  },
  connectorOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  connectorTypeChip: {
    borderRadius: 8,
  },
  connectorTypeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10,
  },
  connectorInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
  },
  connectorName: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
  },
  connectorMembers: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default HomeScreen; 