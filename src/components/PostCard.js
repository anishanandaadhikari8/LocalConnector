import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { 
  Text, 
  Avatar, 
  IconButton, 
  Chip,
  Surface,
  useTheme 
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDistanceToNow, isValid } from 'date-fns';
import { getConnectorColor, getElevationStyle } from '../theme/theme';

const PostCard = ({ post, onPress, onLike, onComment, onShare }) => {
  const theme = useTheme();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

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
    likes: post.likes || 0,
    comments: post.comments || 0
  };

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(newLikedState ? likeCount + 1 : likeCount - 1);
    onLike && onLike(post, newLikedState);
  };

  const handlePress = () => {
    onPress && onPress(post);
  };

  const handleComment = () => {
    onComment && onComment(post);
  };

  const handleShare = () => {
    onShare && onShare(post);
  };

  return (
    <Surface style={[styles.card, getElevationStyle('xs', theme)]}>
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.98}
        style={styles.cardContent}
      >
        {/* Compact Header */}
        <View style={styles.header}>
          <Avatar.Image 
            size={theme.components.avatar.small} 
            source={{ uri: postData.author?.avatar }} 
            style={styles.avatar}
          />
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <Text style={[styles.authorName, theme.typography.titleSmall, { color: theme.colors.onSurface }]}>
                {postData.author?.name}
              </Text>
              {postData.author?.verified && (
                <MaterialCommunityIcons 
                  name="check-decagram" 
                  size={14} 
                  color={theme.colors.primary}
                  style={styles.verifiedIcon}
                />
              )}
              <Chip
                style={[styles.categoryChip, { backgroundColor: getConnectorColor(postData.category, theme) }]}
                textStyle={[styles.categoryChipText, theme.typography.captionSmall]}
                compact
              >
                {postData.category}
              </Chip>
            </View>
            <View style={styles.metadata}>
              <MaterialCommunityIcons 
                name="clock-outline" 
                size={theme.components.icon.small} 
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.timestamp, theme.typography.caption, { color: theme.colors.onSurfaceVariant }]}>
                {(() => {
                  try {
                    const postDate = new Date(postData.timestamp);
                    if (isValid(postDate)) {
                      return formatDistanceToNow(postDate, { addSuffix: true });
                    }
                    return 'Just now';
                  } catch (error) {
                    console.warn('Invalid date format:', postData.timestamp);
                    return 'Just now';
                  }
                })()}
              </Text>
              <Text style={[styles.location, theme.typography.caption, { color: theme.colors.onSurfaceVariant }]}>
                • {postData.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Compact Title */}
        <Text 
          style={[styles.title, theme.typography.titleLarge, { color: theme.colors.onSurface }]}
          numberOfLines={2}
        >
          {postData.title}
        </Text>

        {/* Price Badge (if applicable) */}
        {postData.price !== null && postData.price !== undefined && (
          <View style={[styles.priceBadge, { backgroundColor: theme.colors.primaryContainer }]}>
            <MaterialCommunityIcons 
              name="currency-usd" 
              size={theme.components.icon.small} 
              color={theme.colors.onPrimaryContainer}
            />
            <Text style={[styles.priceText, theme.typography.labelMedium, { color: theme.colors.onPrimaryContainer }]}>
              {postData.price === 0 ? 'FREE' : `$${postData.price}`}
            </Text>
          </View>
        )}

        {/* Compact Image */}
        {postData.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: postData.image }} style={styles.image} />
          </View>
        )}

        {/* Description (truncated) */}
        {postData.description && postData.title !== postData.description && (
          <Text 
            style={[styles.description, theme.typography.bodyMedium, { color: theme.colors.onSurface }]}
            numberOfLines={2}
          >
            {postData.description}
          </Text>
        )}

        {/* Compact Action Bar */}
        <View style={styles.actionBar}>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="heart" 
                size={theme.components.icon.small} 
                color={theme.colors.error}
              />
              <Text style={[styles.statText, theme.typography.caption, { color: theme.colors.onSurfaceVariant }]}>
                {likeCount}
              </Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="comment" 
                size={theme.components.icon.small} 
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[styles.statText, theme.typography.caption, { color: theme.colors.onSurfaceVariant }]}>
                {postData.comments}
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.action, isLiked && { backgroundColor: `${theme.colors.error}15` }]} 
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={isLiked ? "heart" : "heart-outline"}
                size={theme.components.icon.medium}
                color={isLiked ? theme.colors.error : theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.action}
              onPress={handleComment}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="comment-outline"
                size={theme.components.icon.medium}
                color={theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.action}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={theme.components.icon.medium}
                color={theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardContent: {
    padding: 16, // Consistent 16px padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  authorName: {
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  verifiedIcon: {
    marginRight: 8,
  },
  categoryChip: {
    borderRadius: 8,
    height: 20,
  },
  categoryChipText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontWeight: '500',
  },
  location: {
    fontWeight: '500',
  },
  title: {
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 8,
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
    gap: 4,
  },
  priceText: {
    fontWeight: '600',
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160, // Compact image height
    resizeMode: 'cover',
  },
  description: {
    lineHeight: 20,
    marginBottom: 12,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.06)',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  action: {
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostCard; 