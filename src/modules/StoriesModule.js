import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function StoriesModule() {
  const [stories, setStories] = useState([
    {
      id: 1,
      user: 'John Doe',
      title: 'Community Garden Update',
      content: 'Our community garden is thriving! Check out the new vegetables we planted this week.',
      image: 'https://via.placeholder.com/300x200',
      views: 45,
      createdAt: '2 hours ago',
      duration: 24, // hours
    },
    {
      id: 2,
      user: 'Jane Smith',
      title: 'Neighborhood Cleanup',
      content: 'Great turnout for our monthly cleanup. Thanks everyone for helping keep our area beautiful!',
      image: 'https://via.placeholder.com/300x200',
      views: 32,
      createdAt: '5 hours ago',
      duration: 24,
    },
    {
      id: 3,
      user: 'Mike Johnson',
      title: 'Local Event Highlights',
      content: 'Amazing time at the community picnic yesterday. Here are some highlights!',
      image: 'https://via.placeholder.com/300x200',
      views: 67,
      createdAt: '1 day ago',
      duration: 24,
    }
  ]);

  const [selectedStory, setSelectedStory] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
  });

  const handleCreateStory = () => {
    if (!newStory.title || !newStory.content) return;
    setStories([
      {
        id: Date.now(),
        user: 'Current User',
        title: newStory.title,
        content: newStory.content,
        image: 'https://via.placeholder.com/300x200',
        views: 0,
        createdAt: 'Just now',
        duration: 24,
      },
      ...stories,
    ]);
    setNewStory({ title: '', content: '' });
    setShowCreateForm(false);
  };

  const handleViewStory = (story) => {
    setSelectedStory(story);
    // Increment view count
    setStories(stories.map(s =>
      s.id === story.id
        ? { ...s, views: s.views + 1 }
        : s
    ));
  };

  const handleDeleteStory = (storyId) => {
    setStories(stories.filter(s => s.id !== storyId));
    if (selectedStory?.id === storyId) {
      setSelectedStory(null);
    }
  };

  const renderStoryCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleViewStory(item)}
      style={{ marginBottom: 12, backgroundColor: '#fff', borderRadius: 6, elevation: 1, overflow: 'hidden' }}
    >
      <View style={{ height: 120, backgroundColor: '#f3f4f6' }} />
      <View style={{ padding: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{item.title}</Text>
        <Text style={{ color: '#666', marginBottom: 4 }} numberOfLines={2}>{item.content}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 12 }}>by {item.user}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#888', fontSize: 12, marginRight: 8 }}>👁 {item.views}</Text>
            <Text style={{ color: '#888', fontSize: 12 }}>{item.createdAt}</Text>
          </View>
        </View>
        {item.user === 'Current User' && (
          <TouchableOpacity 
            onPress={() => handleDeleteStory(item.id)}
            style={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              backgroundColor: '#dc2626', 
              borderRadius: 12, 
              padding: 4 
            }}
          >
            <Text style={{ color: '#fff', fontSize: 10 }}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  if (selectedStory) {
    return (
      <View style={{ flex: 1, padding: 8 }}>
        {/* Story Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => setSelectedStory(null)} style={{ marginRight: 12 }}>
            <Text style={{ color: '#0284c7', fontWeight: 'bold' }}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Story</Text>
        </View>

        {/* Story Content */}
        <View style={{ backgroundColor: '#fff', borderRadius: 6, elevation: 1, overflow: 'hidden' }}>
          <View style={{ height: 200, backgroundColor: '#f3f4f6' }} />
          <View style={{ padding: 16 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{selectedStory.title}</Text>
            <Text style={{ color: '#666', marginBottom: 8, lineHeight: 20 }}>{selectedStory.content}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ color: '#888' }}>by {selectedStory.user}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#888', marginRight: 8 }}>👁 {selectedStory.views} views</Text>
                <Text style={{ color: '#888' }}>{selectedStory.createdAt}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Stories</Text>
        <TouchableOpacity 
          onPress={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#0284c7', borderRadius: 6, padding: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {showCreateForm ? 'Cancel' : 'Create Story'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Create Story Form */}
      {showCreateForm && (
        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Create New Story</Text>
          <TextInput
            value={newStory.title}
            onChangeText={text => setNewStory({ ...newStory, title: text })}
            placeholder="Story Title"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newStory.content}
            onChangeText={text => setNewStory({ ...newStory, content: text })}
            placeholder="Share your story..."
            multiline
            numberOfLines={4}
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TouchableOpacity onPress={handleCreateStory} style={{ backgroundColor: '#059669', borderRadius: 6, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Publish Story</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Stories List */}
      <FlatList
        data={stories}
        keyExtractor={item => item.id.toString()}
        renderItem={renderStoryCard}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No stories yet.</Text>}
      />
    </View>
  );
} 