import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function ReviewsModule() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      title: 'Great Community!',
      content: 'This community has been amazing. Everyone is so helpful and friendly.',
      date: '2024-12-20',
      helpful: 3,
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      title: 'Good Experience',
      content: 'Overall good experience. The marketplace feature is really useful.',
      date: '2024-12-19',
      helpful: 1,
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 5,
      title: 'Excellent Platform',
      content: 'Love how easy it is to connect with neighbors and organize events.',
      date: '2024-12-18',
      helpful: 5,
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newReview, setNewReview] = useState({
    title: '',
    content: '',
    rating: 0,
  });

  const handleCreateReview = () => {
    if (!newReview.title || !newReview.content || newReview.rating === 0) return;
    setReviews([
      {
        id: Date.now(),
        user: 'Current User',
        rating: newReview.rating,
        title: newReview.title,
        content: newReview.content,
        date: new Date().toISOString().split('T')[0],
        helpful: 0,
      },
      ...reviews,
    ]);
    setNewReview({ title: '', content: '', rating: 0 });
    setShowCreateForm(false);
  };

  const handleHelpful = (reviewId) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const renderStars = (rating) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <Text key={star} style={{ color: star <= rating ? '#fbbf24' : '#d1d5db', fontSize: 16 }}>
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderRatingSelector = () => {
    return (
      <View style={{ marginBottom: 8 }}>
        <Text style={{ marginBottom: 4 }}>Rating:</Text>
        <View style={{ flexDirection: 'row' }}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity
              key={star}
              onPress={() => setNewReview({ ...newReview, rating: star })}
              style={{ marginRight: 4 }}
            >
              <Text style={{ 
                color: star <= newReview.rating ? '#fbbf24' : '#d1d5db', 
                fontSize: 24 
              }}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Reviews</Text>
        <TouchableOpacity 
          onPress={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#0284c7', borderRadius: 6, padding: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {showCreateForm ? 'Cancel' : 'Write Review'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Average Rating */}
      <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, elevation: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>Overall Rating</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          {renderStars(Math.round(averageRating))}
          <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>{averageRating}</Text>
        </View>
        <Text style={{ color: '#666' }}>Based on {reviews.length} reviews</Text>
      </View>

      {/* Create Review Form */}
      {showCreateForm && (
        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Write a Review</Text>
          {renderRatingSelector()}
          <TextInput
            value={newReview.title}
            onChangeText={text => setNewReview({ ...newReview, title: text })}
            placeholder="Review Title"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newReview.content}
            onChangeText={text => setNewReview({ ...newReview, content: text })}
            placeholder="Share your experience..."
            multiline
            numberOfLines={4}
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TouchableOpacity onPress={handleCreateReview} style={{ backgroundColor: '#059669', borderRadius: 6, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reviews List */}
      <FlatList
        data={reviews}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, padding: 12, backgroundColor: '#fff', borderRadius: 6, elevation: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{item.title}</Text>
                <Text style={{ color: '#666', marginBottom: 4 }}>by {item.user}</Text>
                {renderStars(item.rating)}
              </View>
              <Text style={{ color: '#888', fontSize: 12 }}>{item.date}</Text>
            </View>
            
            <Text style={{ color: '#333', marginBottom: 8, lineHeight: 20 }}>{item.content}</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity 
                onPress={() => handleHelpful(item.id)}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ color: '#0284c7', marginRight: 4 }}>👍</Text>
                <Text style={{ color: '#666' }}>Helpful ({item.helpful})</Text>
              </TouchableOpacity>
              {item.user === 'Current User' && (
                <TouchableOpacity 
                  onPress={() => handleDeleteReview(item.id)}
                  style={{ backgroundColor: '#dc2626', borderRadius: 6, padding: 6 }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No reviews yet.</Text>}
      />
    </View>
  );
} 