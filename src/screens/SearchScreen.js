import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, TextInput, Card, Chip, Button, SegmentedButtons } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { connectorPosts, popularTags } from '../data/mockData';
import PostCard from '../components/PostCard';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchRadius, setSearchRadius] = useState('5');
  const theme = useTheme();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'General', label: 'General' },
    { value: 'Buy/Sell', label: 'Buy/Sell' },
    { value: 'Lost & Found', label: 'Lost & Found' },
    { value: 'Alerts', label: 'Alerts' }
  ];

  const locations = [
    { value: 'all', label: 'All Areas' },
    { value: 'Downtown', label: 'Downtown' },
    { value: 'Oak Street', label: 'Oak Street' },
    { value: 'Maple Street', label: 'Maple Street' },
    { value: 'Pine Street', label: 'Pine Street' }
  ];

  const radiusOptions = [
    { value: '1', label: '1 mile' },
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' }
  ];

  // Filter posts based on search criteria
  const filteredPosts = connectorPosts.filter(post => {
    // Search query filter
    const matchesQuery = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    // Location filter
    const matchesLocation = selectedLocation === 'all' || post.location.includes(selectedLocation);

    // Tags filter
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));

    return matchesQuery && matchesCategory && matchesLocation && matchesTags;
  });

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedTags([]);
    setSearchRadius('5');
  };

  const handlePostPress = (post) => {
    navigation.navigate('PostDetail', { post });
  };

  const renderPost = ({ item }) => (
    <PostCard post={item} onPress={handlePostPress} />
  );

  const renderEmptyState = () => (
    <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
      <Card.Content style={styles.emptyContent}>
        <MaterialCommunityIcons 
          name="magnify" 
          size={64} 
          color={theme.colors.onSurfaceVariant} 
        />
        <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
          No results found
        </Text>
        <Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
          Try adjusting your search terms or filters to find what you're looking for.
        </Text>
        <Button
          mode="outlined"
          onPress={handleClearFilters}
          style={styles.clearButton}
        >
          Clear All Filters
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Card style={[styles.searchCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <TextInput
              mode="outlined"
              placeholder="Search posts..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              left={<TextInput.Icon icon="magnify" />}
              style={styles.searchInput}
            />
          </Card.Content>
        </Card>

        {/* Filter Options */}
        <Card style={[styles.filterCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Filter By
            </Text>

            {/* Category Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.colors.onSurface }]}>
                Category
              </Text>
              <SegmentedButtons
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                buttons={categories.map(cat => ({
                  value: cat.value,
                  label: cat.label,
                  style: styles.segmentedButton
                }))}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.colors.onSurface }]}>
                Location
              </Text>
              <SegmentedButtons
                value={selectedLocation}
                onValueChange={setSelectedLocation}
                buttons={locations.map(loc => ({
                  value: loc.value,
                  label: loc.label,
                  style: styles.segmentedButton
                }))}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Search Radius */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.colors.onSurface }]}>
                Search Radius
              </Text>
              <SegmentedButtons
                value={searchRadius}
                onValueChange={setSearchRadius}
                buttons={radiusOptions.map(radius => ({
                  value: radius.value,
                  label: radius.label,
                  style: styles.segmentedButton
                }))}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Tags Filter */}
            <View style={styles.filterSection}>
              <Text style={[styles.filterLabel, { color: theme.colors.onSurface }]}>
                Popular Tags
              </Text>
              <View style={styles.tagsContainer}>
                {popularTags.slice(0, 10).map((tag) => (
                  <Chip
                    key={tag}
                    mode={selectedTags.includes(tag) ? 'flat' : 'outlined'}
                    onPress={() => handleTagToggle(tag)}
                    style={[
                      styles.tagChip,
                      selectedTags.includes(tag) && {
                        backgroundColor: theme.colors.primary,
                      }
                    ]}
                    textStyle={[
                      styles.tagText,
                      selectedTags.includes(tag) && {
                        color: theme.colors.onPrimary,
                      }
                    ]}
                  >
                    #{tag}
                  </Chip>
                ))}
              </View>
            </View>

            {/* Clear Filters Button */}
            <Button
              mode="outlined"
              onPress={handleClearFilters}
              icon="refresh"
              style={styles.clearFiltersButton}
            >
              Clear All Filters
            </Button>
          </Card.Content>
        </Card>

        {/* Results */}
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsTitle, { color: theme.colors.onSurface }]}>
            Results ({filteredPosts.length})
          </Text>
          
          {filteredPosts.length > 0 ? (
            <FlatList
              data={filteredPosts}
              renderItem={renderPost}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            renderEmptyState()
          )}
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
  searchCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  searchInput: {
    backgroundColor: 'transparent',
  },
  filterCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  segmentedButton: {
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
  },
  clearFiltersButton: {
    marginTop: 8,
  },
  resultsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCard: {
    elevation: 2,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  clearButton: {
    marginTop: 8,
  },
});

export default SearchScreen; 