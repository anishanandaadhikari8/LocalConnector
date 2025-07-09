import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  FlatList 
} from 'react-native';
import { 
  Text, 
  Card, 
  Avatar, 
  Chip, 
  Button, 
  useTheme,
  Surface,
  Badge,
  Divider,
  List
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isValid } from 'date-fns';

import { 
  connectors, 
  posts, 
  currentUser,
  connectorTypes 
} from '../data/mockData';
import { getConnectorColor, getElevationStyle } from '../theme/theme';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('posts');

  const getUserConnectors = () => {
    return connectors.filter(connector => 
      currentUser.joinedConnectors.includes(connector.connectorId)
    );
  };

  const getUserPosts = () => {
    return posts.filter(post => post.author.id === currentUser.id);
  };

  const renderConnectorCard = ({ item: connector }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('CommunityDetails', { community: connector })}
      style={styles.connectorCard}
    >
      <Card style={[styles.connectorCardInner, getElevationStyle('sm', theme)]}>
        <Image 
          source={{ uri: connector.image }} 
          style={styles.connectorImage}
          resizeMode="cover"
        />
        <View style={styles.connectorOverlay}>
          <Chip
            icon={() => (
              <MaterialCommunityIcons 
                name={connectorTypes.find(ct => ct.id.toLowerCase() === connector.type.toLowerCase())?.icon || 'account-group'} 
                size={12} 
                color="white" 
              />
            )}
            style={[styles.connectorTypeChip, { backgroundColor: getConnectorColor(connector.type, theme) }]}
            textStyle={styles.connectorTypeText}
            compact
          >
            {connector.type}
          </Chip>
        </View>
        <View style={styles.connectorInfo}>
          <Text style={[styles.connectorName, theme.typography.titleSmall]} numberOfLines={1}>
            {connector.name}
          </Text>
          <Text style={[styles.connectorMembers, theme.typography.bodySmall]}>
            {connector.membersCount} members
          </Text>
        </View>
      </Card>
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

    return (
      <Card style={[styles.postCard, getElevationStyle('sm', theme)]}>
        <View style={styles.postHeader}>
          <View style={styles.postAuthor}>
            <Avatar.Image 
              size={40} 
              source={{ uri: post.author.avatar }} 
            />
            <View style={styles.postAuthorInfo}>
              <Text style={[styles.postAuthorName, theme.typography.titleSmall]}>
                {post.author.name}
              </Text>
              <Text style={[styles.postTime, theme.typography.bodySmall]}>
                {formattedDate}
              </Text>
            </View>
          </View>
        </View>
      
        <View style={styles.postContent}>
          <Text style={[styles.postText, theme.typography.bodyMedium]}>
            {post.content}
          </Text>
          {post.image && (
            <Image 
              source={{ uri: post.image }} 
              style={styles.postImage}
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.postAction}>
            <MaterialCommunityIcons 
              name="heart-outline" 
              size={20} 
              color={theme.colors.onSurfaceVariant} 
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
        </View>
      </Card>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <FlatList
            data={getUserPosts()}
            renderItem={renderPostCard}
            keyExtractor={(item) => item.postId}
            contentContainerStyle={styles.tabContent}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'connectors':
        return (
          <FlatList
            data={getUserConnectors()}
            renderItem={renderConnectorCard}
            keyExtractor={(item) => item.connectorId}
            contentContainerStyle={styles.tabContent}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Avatar.Image 
              size={100} 
              source={{ uri: currentUser.avatar }} 
            />
            {currentUser.verified && (
              <Badge style={styles.verifiedBadge}>
                <MaterialCommunityIcons name="shield-check" size={12} color="white" />
              </Badge>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, theme.typography.headlineMedium]}>
              {currentUser.name}
            </Text>
            <Text style={[styles.profileBio, theme.typography.bodyMedium]}>
              {currentUser.bio || 'Community enthusiast and connector'}
            </Text>
            <Text style={[styles.profileLocation, theme.typography.bodySmall]}>
              📍 {currentUser.location}
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={[styles.editButtonText, { color: theme.colors.onPrimary }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Surface style={[styles.statCard, getElevationStyle('sm', theme)]}>
            <Text style={[styles.statNumber, theme.typography.headlineMedium]}>
              {getUserConnectors().length}
            </Text>
            <Text style={[styles.statLabel, theme.typography.bodySmall]}>
              Connectors
            </Text>
          </Surface>
          
          <Surface style={[styles.statCard, getElevationStyle('sm', theme)]}>
            <Text style={[styles.statNumber, theme.typography.headlineMedium]}>
              {getUserPosts().length}
            </Text>
            <Text style={[styles.statLabel, theme.typography.bodySmall]}>
              Posts
            </Text>
          </Surface>
          
          <Surface style={[styles.statCard, getElevationStyle('sm', theme)]}>
            <Text style={[styles.statNumber, theme.typography.headlineMedium]}>
              {currentUser.reputationScore || 85}
            </Text>
            <Text style={[styles.statLabel, theme.typography.bodySmall]}>
              Reputation
            </Text>
          </Surface>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'posts' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[
              styles.tabText, 
              theme.typography.labelMedium,
              activeTab === 'posts' && { color: theme.colors.primary, fontWeight: '600' }
            ]}>
              Posts
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'connectors' && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 }
            ]}
            onPress={() => setActiveTab('connectors')}
          >
            <Text style={[
              styles.tabText, 
              theme.typography.labelMedium,
              activeTab === 'connectors' && { color: theme.colors.primary, fontWeight: '600' }
            ]}>
              Connectors
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={[styles.quickAction, { backgroundColor: theme.colors.surface }]}
          onPress={() => navigation.navigate('Settings')}
        >
          <MaterialCommunityIcons 
            name="cog" 
            size={24} 
            color={theme.colors.onSurface} 
          />
          <Text style={[styles.quickActionText, theme.typography.labelSmall]}>
            Settings
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.quickAction, { backgroundColor: theme.colors.surface }]}
          onPress={() => navigation.navigate('HelpFAQ')}
        >
          <MaterialCommunityIcons 
            name="help-circle" 
            size={24} 
            color={theme.colors.onSurface} 
          />
          <Text style={[styles.quickActionText, theme.typography.labelSmall]}>
            Help
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0284c7',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  profileBio: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 4,
  },
  profileLocation: {
    color: '#666',
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '500',
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
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
  postCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  postAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAuthorInfo: {
    marginLeft: 12,
  },
  postAuthorName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  postTime: {
    color: '#666',
  },
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  postText: {
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  postActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  quickActions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  quickActionText: {
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default ProfileScreen; 