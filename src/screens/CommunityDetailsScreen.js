import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { 
  Text, 
  Card, 
  Avatar, 
  Chip, 
  Button, 
  useTheme,
  FAB,
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from 'date-fns';

import { connectorPosts, currentUser, mockUsers, connectorAdminConfig } from '../data/mockData';
import PostCard from '../components/PostCard';
import ConnectorModuleManager from '../modules/ConnectorModuleManager';

const CommunityDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { community } = route.params;
  const [activeTab, setActiveTab] = useState('posts');
  const connectorConfig = connectorAdminConfig[community.connectorId] || { enabledModules: [] };
  const [activeModule, setActiveModule] = useState(connectorConfig.enabledModules[0] || null);
  
  // Filter posts for this community
  const communityPosts = connectorPosts.filter(post => post.connectorId === community.connectorId);
  
  // Get community members
  const communityMembers = mockUsers.filter(user => 
    community.memberIds.includes(user.id)
  );

  const isUserMember = () => {
    return currentUser.joinedCommunities.includes(community.id);
  };

  const handleJoinLeave = () => {
    // Mock join/leave functionality
    console.log(isUserMember() ? 'Leave' : 'Join', community.id);
  };

  const handleCreatePost = () => {
    navigation.navigate('CreatePost', { communityId: community.id });
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  const renderPost = ({ item: post }) => (
    <PostCard post={post} onPress={() => handlePostPress(post)} />
  );

  const renderMember = ({ item: member }) => (
    <TouchableOpacity>
      <View style={styles.memberItem}>
        <Avatar.Image 
          size={50} 
          source={{ uri: member.avatar }} 
          style={styles.memberAvatar}
        />
        <View style={styles.memberInfo}>
          <Text style={[styles.memberName, { color: theme.colors.onSurface }]}>
            {member.name}
          </Text>
          <Text style={[styles.memberNeighborhood, { color: theme.colors.onSurfaceVariant }]}>
            {member.neighborhood}
          </Text>
          <View style={styles.memberBadges}>
            {member.verified && (
              <Chip 
                icon="check-circle" 
                style={[styles.verifiedChip, { backgroundColor: theme.colors.primary }]}
                textStyle={{ color: theme.colors.onPrimary }}
                compact
              >
                Verified
              </Chip>
            )}
            <Text style={[styles.reputationText, { color: theme.colors.onSurfaceVariant }]}>
              {member.reputation} reputation
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPostsTab = () => (
    <FlatList
      data={communityPosts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.postsList}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: theme.colors.onSurfaceVariant }]}>
            No posts in this community yet
          </Text>
          <Text style={[styles.emptyStateSubtext, { color: theme.colors.onSurfaceVariant }]}>
            Be the first to share something!
          </Text>
        </View>
      }
    />
  );

  const renderMembersTab = () => (
    <FlatList
      data={communityMembers}
      renderItem={renderMember}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.membersList}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <Divider style={styles.memberDivider} />}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Community Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.colors.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        
        <View style={styles.communityHeader}>
          <Avatar.Image 
            size={80} 
            source={{ uri: community.image }} 
            style={styles.communityAvatar}
          />
          <View style={styles.communityInfo}>
            <Text style={[styles.communityName, { color: theme.colors.onSurface }]}>
              {community.name}
            </Text>
            <Text style={[styles.communityDescription, { color: theme.colors.onSurfaceVariant }]}>
              {community.description}
            </Text>
            <View style={styles.communityStats}>
              <Text style={[styles.statText, { color: theme.colors.onSurfaceVariant }]}>
                {community.memberCount} members
              </Text>
              <Text style={[styles.statText, { color: theme.colors.onSurfaceVariant }]}>
                • {community.postCount} posts
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.communityActions}>
          {isUserMember() ? (
            <Button
              mode="outlined"
              onPress={handleJoinLeave}
              style={[styles.actionButton, { borderColor: theme.colors.error }]}
              textColor={theme.colors.error}
            >
              Leave Community
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handleJoinLeave}
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              textColor={theme.colors.onPrimary}
            >
              Join Community
            </Button>
          )}
        </View>

        <View style={styles.communityRules}>
          <Text style={[styles.rulesTitle, { color: theme.colors.onSurface }]}>
            Community Rules:
          </Text>
          <Text style={[styles.rulesText, { color: theme.colors.onSurfaceVariant }]}>
            {community.rules}
          </Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'posts' && { borderBottomColor: theme.colors.primary }
          ]}
          onPress={() => setActiveTab('posts')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'posts' ? theme.colors.primary : theme.colors.onSurfaceVariant }
          ]}>
            Posts ({communityPosts.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'members' && { borderBottomColor: theme.colors.primary }
          ]}
          onPress={() => setActiveTab('members')}
        >
          <Text style={[
            styles.tabText, 
            { color: activeTab === 'members' ? theme.colors.primary : theme.colors.onSurfaceVariant }
          ]}>
            Members ({communityMembers.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'posts' ? renderPostsTab() : renderMembersTab()}
      </View>

      {/* Modules Section */}
      <View style={{ marginTop: 24, marginBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>
          Modules
        </Text>
        {/* Module Switcher */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          {connectorConfig.enabledModules.map(module => (
            <TouchableOpacity
              key={module}
              onPress={() => setActiveModule(module)}
              style={{
                marginRight: 8,
                paddingVertical: 8,
                paddingHorizontal: 14,
                backgroundColor: activeModule === module ? theme.colors.primary : '#e0e7ef',
                borderRadius: 6,
              }}
            >
              <Text style={{
                fontWeight: '600',
                color: activeModule === module ? theme.colors.onPrimary : theme.colors.onSurface,
              }}>{module.charAt(0).toUpperCase() + module.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {activeModule && <ConnectorModuleManager modules={[activeModule]} />}
      </View>

      {/* Floating Action Button */}
      {isUserMember() && (
        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={handleCreatePost}
          color={theme.colors.onPrimary}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  communityHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  communityAvatar: {
    marginRight: 16,
  },
  communityInfo: {
    flex: 1,
  },
  communityName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  communityDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  communityStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    marginRight: 8,
  },
  communityActions: {
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 8,
  },
  communityRules: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  rulesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  rulesText: {
    fontSize: 12,
    lineHeight: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabContent: {
    flex: 1,
  },
  postsList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  membersList: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  memberItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  memberAvatar: {
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  memberNeighborhood: {
    fontSize: 12,
    marginBottom: 4,
  },
  memberBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedChip: {
    height: 20,
    marginRight: 8,
  },
  reputationText: {
    fontSize: 11,
  },
  memberDivider: {
    marginLeft: 62,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 28,
  },
});

export default CommunityDetailsScreen; 