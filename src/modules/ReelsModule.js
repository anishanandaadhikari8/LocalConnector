import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function ReelsModule() {
  const [reels, setReels] = useState([
    {
      id: 1,
      user: 'John Doe',
      title: 'Community Garden Tour',
      description: 'Take a quick tour of our beautiful community garden!',
      videoUrl: 'https://via.placeholder.com/300x400',
      thumbnail: 'https://via.placeholder.com/300x400',
      views: 128,
      likes: 24,
      duration: '0:45',
      createdAt: '3 hours ago',
    },
    {
      id: 2,
      user: 'Jane Smith',
      title: 'Neighborhood Cleanup',
      description: 'Before and after of our monthly cleanup effort.',
      videoUrl: 'https://via.placeholder.com/300x400',
      thumbnail: 'https://via.placeholder.com/300x400',
      views: 89,
      likes: 18,
      duration: '1:12',
      createdAt: '1 day ago',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      title: 'Local Event Highlights',
      description: 'Highlights from our community picnic yesterday!',
      videoUrl: 'https://via.placeholder.com/300x400',
      thumbnail: 'https://via.placeholder.com/300x400',
      views: 156,
      likes: 32,
      duration: '2:30',
      createdAt: '2 days ago',
    }
  ]);

  const [selectedReel, setSelectedReel] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReel, setNewReel] = useState({
    title: '',
    description: '',
  });

  const handleCreateReel = () => {
    if (!newReel.title || !newReel.description) return;
    setReels([
      {
        id: Date.now(),
        user: 'Current User',
        title: newReel.title,
        description: newReel.description,
        videoUrl: 'https://via.placeholder.com/300x400',
        thumbnail: 'https://via.placeholder.com/300x400',
        views: 0,
        likes: 0,
        duration: '0:30',
        createdAt: 'Just now',
      },
      ...reels,
    ]);
    setNewReel({ title: '', description: '' });
    setShowCreateForm(false);
  };

  const handlePlayReel = (reel) => {
    setSelectedReel(reel);
    // Increment view count
    setReels(reels.map(r =>
      r.id === reel.id
        ? { ...r, views: r.views + 1 }
        : r
    ));
  };

  const handleLikeReel = (reelId) => {
    setReels(reels.map(reel =>
      reel.id === reelId
        ? { ...reel, likes: reel.likes + 1 }
        : reel
    ));
  };

  const handleDeleteReel = (reelId) => {
    setReels(reels.filter(r => r.id !== reelId));
    if (selectedReel?.id === reelId) {
      setSelectedReel(null);
    }
  };

  const renderReelCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePlayReel(item)}
      style={{ marginBottom: 12, backgroundColor: '#fff', borderRadius: 6, elevation: 1, overflow: 'hidden' }}
    >
      <View style={{ position: 'relative' }}>
        <View style={{ height: 200, backgroundColor: '#f3f4f6' }} />
        <View style={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          backgroundColor: 'rgba(0,0,0,0.7)', 
          borderRadius: 4, 
          padding: 4 
        }}>
          <Text style={{ color: '#fff', fontSize: 12 }}>{item.duration}</Text>
        </View>
        <View style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: [{ translateX: -15 }, { translateY: -15 }],
          backgroundColor: 'rgba(0,0,0,0.7)', 
          borderRadius: 30, 
          width: 30, 
          height: 30,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>▶</Text>
        </View>
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{item.title}</Text>
        <Text style={{ color: '#666', marginBottom: 4 }} numberOfLines={2}>{item.description}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 12 }}>by {item.user}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#888', fontSize: 12, marginRight: 8 }}>👁 {item.views}</Text>
            <Text style={{ color: '#888', fontSize: 12, marginRight: 8 }}>❤ {item.likes}</Text>
            <Text style={{ color: '#888', fontSize: 12 }}>{item.createdAt}</Text>
          </View>
        </View>
        {item.user === 'Current User' && (
          <TouchableOpacity 
            onPress={() => handleDeleteReel(item.id)}
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

  if (selectedReel) {
    return (
      <View style={{ flex: 1, padding: 8 }}>
        {/* Reel Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => setSelectedReel(null)} style={{ marginRight: 12 }}>
            <Text style={{ color: '#0284c7', fontWeight: 'bold' }}>← Back</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Reel</Text>
        </View>

        {/* Reel Player */}
        <View style={{ backgroundColor: '#000', borderRadius: 6, overflow: 'hidden', marginBottom: 12 }}>
          <View style={{ height: 300, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ 
              backgroundColor: 'rgba(0,0,0,0.7)', 
              borderRadius: 40, 
              width: 80, 
              height: 80,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: '#fff', fontSize: 32 }}>▶</Text>
            </View>
            <Text style={{ color: '#fff', marginTop: 8, fontSize: 12 }}>Tap to play</Text>
          </View>
        </View>

        {/* Reel Info */}
        <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 6, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>{selectedReel.title}</Text>
          <Text style={{ color: '#666', marginBottom: 8, lineHeight: 20 }}>{selectedReel.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ color: '#888' }}>by {selectedReel.user}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#888', marginRight: 8 }}>👁 {selectedReel.views} views</Text>
              <Text style={{ color: '#888', marginRight: 8 }}>❤ {selectedReel.likes} likes</Text>
              <Text style={{ color: '#888' }}>{selectedReel.createdAt}</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => handleLikeReel(selectedReel.id)}
            style={{ backgroundColor: '#dc2626', borderRadius: 6, padding: 8, alignSelf: 'flex-start' }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>❤ Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Reels</Text>
        <TouchableOpacity 
          onPress={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#0284c7', borderRadius: 6, padding: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {showCreateForm ? 'Cancel' : 'Create Reel'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Create Reel Form */}
      {showCreateForm && (
        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Create New Reel</Text>
          <TextInput
            value={newReel.title}
            onChangeText={text => setNewReel({ ...newReel, title: text })}
            placeholder="Reel Title"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newReel.description}
            onChangeText={text => setNewReel({ ...newReel, description: text })}
            placeholder="Describe your reel..."
            multiline
            numberOfLines={3}
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <View style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 12, marginBottom: 8, alignItems: 'center' }}>
            <Text style={{ color: '#666', marginBottom: 4 }}>📹 Video Upload</Text>
            <Text style={{ color: '#888', fontSize: 12 }}>Tap to select video file</Text>
          </View>
          <TouchableOpacity onPress={handleCreateReel} style={{ backgroundColor: '#059669', borderRadius: 6, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Upload Reel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reels List */}
      <FlatList
        data={reels}
        keyExtractor={item => item.id.toString()}
        renderItem={renderReelCard}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No reels yet.</Text>}
      />
    </View>
  );
} 