import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { 
  Text, 
  Card, 
  Avatar, 
  IconButton, 
  Chip, 
  TextInput, 
  Button,
  Divider,
  useTheme,
  Surface
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDistanceToNow, format, isValid } from 'date-fns';

import { comments } from '../data/mockData';
import { getConnectorColor, getElevationStyle } from '../theme/theme';

const { width } = Dimensions.get('window');

const PostDetailsScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { post } = route.params;
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Handle different post data structures
  const postData = {
    id: post.id || post.postId,
    title: post.title || post.content,
    description: post.description || post.content,
    author: post.user || post.author,
    timestamp: post.timestamp || post.createdAt,
    category: post.category || post.type,
    location: post.location || 'Neighborhood',
    price: post.price || null,
    image: post.image,
    tags: post.tags || [],
    likes: post.likes || 0,
    comments: post.comments || 0
  };

  const postComments = comments.filter(comment => 
    comment.postId === postData.id || comment.postId === parseInt(postData.id)
  );

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      // Mock comment functionality
      console.log('New comment:', commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    // Mock share functionality
    console.log('Sharing post:', postData.id);
  };

  const handleContactUser = () => {
    console.log('Contact user:', postData.author?.name);
  };

  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()}
        style={[styles.backButton, getElevationStyle('sm', theme)]}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name="arrow-left" 
          size={24} 
          color={theme.colors.onSurface} 
        />
      </TouchableOpacity>
      
      <View style={styles.headerActions}>
        <TouchableOpacity 
          onPress={handleBookmark}
          style={[styles.headerActionButton, getElevationStyle('sm', theme)]}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons 
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
            size={24} 
            color={isBookmarked ? theme.colors.primary : theme.colors.onSurfaceVariant} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleShare}
          style={[styles.headerActionButton, getElevationStyle('sm', theme)]}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons 
            name="share-variant" 
            size={24} 
            color={theme.colors.onSurfaceVariant} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPostContent = () => (
    <Surface style={[styles.postCard, getElevationStyle('md', theme)]}>
      <View style={styles.postContent}>
        {/* User Info */}
        <View style={styles.userInfo}>
          <Avatar.Image 
            size={56} 
            source={{ uri: postData.author?.avatar }} 
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <View style={styles.userNameContainer}>
              <Text style={[styles.userName, theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
                {postData.author?.name}
              </Text>
              {postData.author?.verified && (
                <MaterialCommunityIcons 
                  name="check-decagram" 
                  size={18} 
                  color={theme.colors.primary}
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <View style={styles.metaInfo}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={14} 
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.timestamp, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                {format(new Date(postData.timestamp), 'MMM dd, yyyy • h:mm a')}
              </Text>
            </View>
            <View style={styles.metaInfo}>
              <MaterialCommunityIcons 
                name="map-marker" 
                size={14} 
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.location, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                {postData.location}
              </Text>
            </View>
          </View>
          
          <Chip
            style={[styles.categoryChip, { backgroundColor: getConnectorColor(postData.category, theme) }]}
            textStyle={[styles.categoryChipText, theme.typography.labelSmall]}
            compact
          >
            {postData.category}
          </Chip>
        </View>

        {/* Post Title */}
        <Text style={[styles.postTitle, theme.typography.headlineSmall, { color: theme.colors.onSurface }]}>
          {postData.title}
        </Text>

        {/* Price Display */}
        {postData.price !== null && (
          <Surface style={[styles.priceContainer, getElevationStyle('sm', theme)]}>
            <MaterialCommunityIcons 
              name="currency-usd" 
              size={20} 
              color={theme.colors.primary}
            />
            <Text style={[styles.price, theme.typography.titleLarge, { color: theme.colors.primary }]}>
              {postData.price === 0 ? 'FREE' : `$${postData.price}`}
            </Text>
            {postData.price > 0 && (
              <Text style={[styles.priceLabel, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                {postData.category === 'Buy/Sell' ? 'Price' : 'Rent'}
              </Text>
            )}
          </Surface>
        )}

        {/* Post Image */}
        {postData.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: postData.image }} style={styles.postImage} />
          </View>
        )}

        {/* Post Description */}
        <Text style={[styles.postDescription, theme.typography.bodyLarge, { color: theme.colors.onSurface }]}>
          {postData.description}
        </Text>

        {/* Tags */}
        {postData.tags && postData.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            <Text style={[styles.tagsTitle, theme.typography.titleSmall, { color: theme.colors.onSurface }]}>
              Tags
            </Text>
            <View style={styles.tagsList}>
              {postData.tags.map((tag, index) => (
                <Chip
                  key={index}
                  style={[styles.tagChip, { backgroundColor: theme.colors.surfaceVariant }]}
                  textStyle={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}
                  compact
                >
                  #{tag}
                </Chip>
              ))}
            </View>
          </View>
        )}

        {/* Enhanced Action Bar */}
        <View style={styles.actionBar}>
          <View style={styles.engagementStats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="heart" 
                size={16} 
                color={theme.colors.error}
              />
              <Text style={[styles.statText, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                {likeCount} likes
              </Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="comment" 
                size={16} 
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.statText, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                {postComments.length} comments
              </Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, isLiked && { backgroundColor: `${theme.colors.error}20` }]} 
              onPress={handleLike}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name={isLiked ? "heart" : "heart-outline"}
                size={20}
                color={isLiked ? theme.colors.error : theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.actionButtonText, theme.typography.labelMedium, { 
                color: isLiked ? theme.colors.error : theme.colors.onSurfaceVariant 
              }]}>
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => {/* Scroll to comments */}}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="comment-outline"
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.actionButtonText, theme.typography.labelMedium, { color: theme.colors.onSurfaceVariant }]}>
                Comment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={20}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.actionButtonText, theme.typography.labelMedium, { color: theme.colors.onSurfaceVariant }]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Button */}
        <Button
          mode="contained"
          onPress={handleContactUser}
          style={[styles.contactButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.contactButtonContent}
          labelStyle={[theme.typography.labelLarge, { fontWeight: '600' }]}
          icon="message"
        >
          Contact {postData.author?.name}
        </Button>
      </View>
    </Surface>
  );

  const renderComment = (comment) => (
    <Surface key={comment.id} style={[styles.commentContainer, getElevationStyle('sm', theme)]}>
      <Avatar.Image 
        size={36} 
        source={{ uri: comment.user.avatar }} 
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={[styles.commentAuthor, theme.typography.bodyMedium, { color: theme.colors.onSurface }]}>
            {comment.user.name}
          </Text>
          <Text style={[styles.commentTime, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
            {(() => {
              try {
                const commentDate = new Date(comment.timestamp);
                if (isValid(commentDate)) {
                  return formatDistanceToNow(commentDate, { addSuffix: true });
                }
                return 'Just now';
              } catch (error) {
                console.warn('Invalid date format:', comment.timestamp);
                return 'Just now';
              }
            })()}
          </Text>
        </View>
        <Text style={[styles.commentText, theme.typography.bodyMedium, { color: theme.colors.onSurface }]}>
          {comment.text}
        </Text>
        <View style={styles.commentActions}>
          <TouchableOpacity style={styles.commentAction} activeOpacity={0.7}>
            <MaterialCommunityIcons 
              name="heart-outline" 
              size={14} 
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={[styles.commentActionText, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
              Like
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.commentAction} activeOpacity={0.7}>
            <MaterialCommunityIcons 
              name="reply" 
              size={14} 
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={[styles.commentActionText, theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );

  const renderCommentSection = () => (
    <Surface style={[styles.commentsSection, getElevationStyle('sm', theme)]}>
      <View style={styles.commentsSectionHeader}>
        <Text style={[styles.commentsSectionTitle, theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
          Comments ({postComments.length})
        </Text>
      </View>

      {/* Comment Input */}
      <View style={styles.commentInputContainer}>
        <Avatar.Image 
          size={32} 
          source={{ uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }} 
          style={styles.currentUserAvatar}
        />
        <TextInput
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
          style={[styles.commentInput, { backgroundColor: theme.colors.surfaceVariant }]}
          contentStyle={[theme.typography.bodyMedium, { color: theme.colors.onSurface }]}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          multiline
          right={
            <TextInput.Icon 
              icon="send" 
              onPress={handleComment}
              iconColor={commentText.trim() ? theme.colors.primary : theme.colors.onSurfaceVariant}
            />
          }
        />
      </View>

      {/* Comments List */}
      <View style={styles.commentsList}>
        {postComments.length > 0 ? (
          postComments.map(renderComment)
        ) : (
          <View style={styles.noCommentsContainer}>
            <MaterialCommunityIcons 
              name="comment-outline" 
              size={48} 
              color={theme.colors.onSurfaceVariant}
            />
            <Text style={[styles.noCommentsText, theme.typography.bodyLarge, { color: theme.colors.onSurface }]}>
              No comments yet
            </Text>
            <Text style={[styles.noCommentsSubtext, theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
              Be the first to share your thoughts!
            </Text>
          </View>
        )}
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderHeader()}
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderPostContent()}
        {renderCommentSection()}
      </ScrollView>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  postCard: {
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },
  postContent: {
    padding: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatar: {
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
    marginRight: 12,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  userName: {
    fontWeight: '700',
    marginRight: 4,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  timestamp: {
    fontWeight: '500',
  },
  location: {
    fontWeight: '500',
  },
  categoryChip: {
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryChipText: {
    color: 'white',
    fontWeight: '600',
  },
  postTitle: {
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  price: {
    fontWeight: '700',
  },
  priceLabel: {
    fontWeight: '500',
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  postDescription: {
    lineHeight: 24,
    marginBottom: 20,
  },
  tagsContainer: {
    marginBottom: 20,
  },
  tagsTitle: {
    fontWeight: '600',
    marginBottom: 12,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    borderRadius: 12,
  },
  actionBar: {
    marginBottom: 20,
  },
  engagementStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontWeight: '600',
  },
  contactButton: {
    borderRadius: 16,
    marginTop: 8,
  },
  contactButtonContent: {
    paddingVertical: 12,
  },
  commentsSection: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  commentsSectionHeader: {
    padding: 24,
    paddingBottom: 16,
  },
  commentsSectionTitle: {
    fontWeight: '700',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  currentUserAvatar: {
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    borderRadius: 20,
    fontSize: 16,
  },
  commentsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  commentAvatar: {},
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  commentAuthor: {
    fontWeight: '600',
  },
  commentTime: {
    fontWeight: '500',
  },
  commentText: {
    lineHeight: 22,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentActionText: {
    fontWeight: '500',
  },
  noCommentsContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noCommentsText: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  noCommentsSubtext: {
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PostDetailsScreen; 