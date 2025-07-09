import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  Chip, 
  useTheme,
  SegmentedButtons,
  Searchbar,
  FAB
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import { categories, communities, currentUser, trendingHashtags } from '../data/mockData';

const CreatePostScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const { communityId } = route.params || {};
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(communityId || '');
  const [hashtags, setHashtags] = useState([]);
  const [showHashtagSuggestions, setShowHashtagSuggestions] = useState(false);
  const [hashtagSearch, setHashtagSearch] = useState('');

  // Get user's joined communities
  const userCommunities = communities.filter(community => 
    currentUser.joinedCommunities.includes(community.id)
  );

  // Filter hashtag suggestions
  const filteredHashtags = trendingHashtags.filter(tag =>
    tag.toLowerCase().includes(hashtagSearch.toLowerCase()) &&
    !hashtags.includes(tag)
  );

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAddHashtag = (tag) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
    setHashtagSearch('');
    setShowHashtagSuggestions(false);
  };

  const handleRemoveHashtag = (tagToRemove) => {
    setHashtags(hashtags.filter(tag => tag !== tagToRemove));
  };

  const handleHashtagInput = (text) => {
    setHashtagSearch(text);
    if (text.includes('#')) {
      const tag = text.replace('#', '').trim();
      if (tag && !hashtags.includes(tag)) {
        setHashtags([...hashtags, tag]);
        setHashtagSearch('');
      }
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Mock post creation
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      price: price ? parseFloat(price) : null,
      location: location.trim() || currentUser.neighborhood,
      image: selectedImage,
      communityId: selectedCommunity,
      hashtags,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      },
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      status: 'active'
    };

    console.log('Creating post:', newPost);
    navigation.goBack();
  };

  const renderHashtagSuggestions = () => {
    if (!showHashtagSuggestions || filteredHashtags.length === 0) return null;

    return (
      <View style={styles.hashtagSuggestions}>
        <Text style={[styles.suggestionsTitle, { color: theme.colors.onSurface }]}>
          Suggested hashtags:
        </Text>
        <View style={styles.suggestionsList}>
          {filteredHashtags.slice(0, 8).map((tag, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAddHashtag(tag)}
            >
              <Chip
                style={[styles.suggestionChip, { backgroundColor: theme.colors.surfaceVariant }]}
                textStyle={{ color: theme.colors.onSurfaceVariant }}
                compact
              >
                #{tag}
              </Chip>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.cancelButton, { color: theme.colors.primary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
            Create Post
          </Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text style={[styles.postButton, { color: theme.colors.primary }]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        {/* Community Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Post to Community
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.communityScroll}
          >
            {userCommunities.map((community) => (
              <TouchableOpacity
                key={community.id}
                onPress={() => setSelectedCommunity(community.id)}
              >
                <Chip
                  icon="account-group"
                  style={[
                    styles.communityChip,
                    selectedCommunity === community.id && { backgroundColor: theme.colors.primary }
                  ]}
                  textStyle={{ 
                    color: selectedCommunity === community.id 
                      ? theme.colors.onPrimary 
                      : theme.colors.onSurfaceVariant 
                  }}
                >
                  {community.name}
                </Chip>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Category
          </Text>
          <SegmentedButtons
            value={category}
            onValueChange={setCategory}
            buttons={categories.map(cat => ({
              value: cat.name,
              label: cat.name,
              style: { flex: 1 }
            }))}
            style={styles.categoryButtons}
          />
        </View>

        {/* Title Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Title *
          </Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="What's happening in your neighborhood?"
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            maxLength={100}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Description *
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Tell your neighbors more about this..."
            multiline
            numberOfLines={4}
            style={[styles.textArea, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            maxLength={500}
          />
          <Text style={[styles.charCount, { color: theme.colors.onSurfaceVariant }]}>
            {description.length}/500
          </Text>
        </View>

        {/* Hashtags */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Hashtags
          </Text>
          <TextInput
            value={hashtagSearch}
            onChangeText={handleHashtagInput}
            placeholder="Add hashtags (e.g., #CommunityEvent)"
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            onFocus={() => setShowHashtagSuggestions(true)}
          />
          {renderHashtagSuggestions()}
          
          {hashtags.length > 0 && (
            <View style={styles.selectedHashtags}>
              {hashtags.map((tag, index) => (
                <Chip
                  key={index}
                  onClose={() => handleRemoveHashtag(tag)}
                  style={[styles.hashtagChip, { backgroundColor: theme.colors.primaryContainer }]}
                  textStyle={{ color: theme.colors.onPrimaryContainer }}
                  compact
                >
                  #{tag}
                </Chip>
              ))}
            </View>
          )}
        </View>

        {/* Price Input (for Buy/Sell) */}
        {category === 'Buy/Sell' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Price
            </Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Enter price (leave empty for free)"
              keyboardType="numeric"
              style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
              textColor={theme.colors.onSurface}
              placeholderTextColor={theme.colors.onSurfaceVariant}
            />
          </View>
        )}

        {/* Location Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Location
          </Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder={currentUser.neighborhood}
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />
        </View>

        {/* Image Upload */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Add Photo (Optional)
          </Text>
          <TouchableOpacity onPress={handleImagePick} style={styles.imageUpload}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
            ) : (
              <View style={[styles.uploadPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
                <Text style={[styles.uploadText, { color: theme.colors.onSurfaceVariant }]}>
                  Tap to add photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <View style={styles.submitSection}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
            textColor={theme.colors.onPrimary}
            disabled={!title.trim() || !description.trim()}
          >
            Create Post
          </Button>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  postButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  communityScroll: {
    paddingRight: 16,
  },
  communityChip: {
    marginRight: 8,
  },
  categoryButtons: {
    marginTop: 8,
  },
  input: {
    borderRadius: 8,
    fontSize: 16,
  },
  textArea: {
    borderRadius: 8,
    fontSize: 16,
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  hashtagSuggestions: {
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  suggestionChip: {
    marginBottom: 4,
  },
  selectedHashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  hashtagChip: {
    marginBottom: 4,
  },
  imageUpload: {
    marginTop: 8,
  },
  uploadPlaceholder: {
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  submitSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  submitButton: {
    borderRadius: 8,
    paddingVertical: 8,
  },
});

export default CreatePostScreen; 