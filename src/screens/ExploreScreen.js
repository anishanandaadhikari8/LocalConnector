import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Avatar, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock trending data
const trendingConnectors = [
  {
    id: 1,
    name: 'Downtown Fitness Buddies',
    type: 'Fitness',
    members: 22,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Downtown Foodies',
    type: 'Food',
    members: 31,
    image: 'https://images.unsplash.com/photo-1504674900240-9a9049b7d63d?w=400&h=200&fit=crop',
  },
];

const trendingPosts = [
  {
    id: 1,
    title: 'Lost: Golden Retriever named Max',
    author: 'Pet Owner',
    likes: 12,
    comments: 8,
    type: 'LostPet',
  },
  {
    id: 2,
    title: 'Singles Meetup at Central Cafe',
    author: 'John Smith',
    likes: 12,
    comments: 5,
    type: 'Event',
  },
];

const trendingTags = ['#fitness', '#dating', '#pets', '#food', '#business', '#volunteer'];

const ExploreScreen = ({ navigation }) => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const renderTrendingConnector = ({ item }) => (
    <TouchableOpacity>
      <Card style={[styles.connectorCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Cover source={{ uri: item.image }} style={styles.connectorImage} />
        <Card.Content style={styles.connectorContent}>
          <Text style={[styles.connectorName, { color: theme.colors.onSurface }]}>{item.name}</Text>
          <Text style={[styles.connectorType, { color: theme.colors.onSurfaceVariant }]}>{item.type}</Text>
          <Text style={[styles.connectorMembers, { color: theme.colors.onSurfaceVariant }]}>{item.members} members</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderTrendingPost = ({ item }) => (
    <TouchableOpacity>
      <Card style={[styles.postCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content style={styles.postContent}>
          <Text style={[styles.postTitle, { color: theme.colors.onSurface }]}>{item.title}</Text>
          <Text style={[styles.postAuthor, { color: theme.colors.onSurfaceVariant }]}>by {item.author}</Text>
          <View style={styles.postStats}>
            <Text style={[styles.postStat, { color: theme.colors.onSurfaceVariant }]}>{item.likes} likes</Text>
            <Text style={[styles.postStat, { color: theme.colors.onSurfaceVariant }]}>{item.comments} comments</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Explore</Text>
        <Divider style={styles.divider} />
        
        {/* Trending Tags */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Trending Tags</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsContainer}>
            {trendingTags.map((tag, index) => (
              <Chip key={index} style={[styles.tagChip, { backgroundColor: theme.colors.surfaceVariant }]} textStyle={{ color: theme.colors.onSurfaceVariant }}>{tag}</Chip>
            ))}
          </ScrollView>
        </View>
        
        {/* Trending Connectors */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Trending Connectors</Text>
          <FlatList
            data={trendingConnectors}
            renderItem={renderTrendingConnector}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.connectorsContainer}
          />
        </View>
        
        {/* Trending Posts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Trending Posts</Text>
          {trendingPosts.map((post) => (
            <View key={post.id}>
              {renderTrendingPost({ item: post })}
              <Divider style={styles.divider} />
            </View>
          ))}
        </View>
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
    padding: 16,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tagsContainer: {
    paddingHorizontal: 4,
  },
  tagChip: {
    marginRight: 8,
  },
  connectorsContainer: {
    paddingHorizontal: 4,
  },
  connectorCard: {
    width: 200,
    marginRight: 12,
    borderRadius: 12,
    elevation: 2,
  },
  connectorImage: {
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  connectorContent: {
    padding: 12,
  },
  connectorName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  connectorType: {
    fontSize: 12,
    marginBottom: 4,
  },
  connectorMembers: {
    fontSize: 12,
  },
  postCard: {
    marginBottom: 8,
    borderRadius: 12,
    elevation: 1,
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  postAuthor: {
    fontSize: 12,
    marginBottom: 8,
  },
  postStats: {
    flexDirection: 'row',
    gap: 16,
  },
  postStat: {
    fontSize: 12,
  },
});

export default ExploreScreen; 