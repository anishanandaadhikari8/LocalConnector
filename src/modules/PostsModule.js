import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function PostsModule({ posts: initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        postId: Date.now(),
        content: newPost,
        comments: [],
      },
      ...posts,
    ]);
    setNewPost('');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p.postId !== postId));
  };

  const handleAddComment = (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;
    setPosts(posts.map(p =>
      p.postId === postId
        ? { ...p, comments: [...(p.comments || []), { id: Date.now(), text: comment }] }
        : p
    ));
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <View style={{ padding: 8 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Posts</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TextInput
          value={newPost}
          onChangeText={setNewPost}
          placeholder="What's on your mind?"
          style={{ flex: 1, backgroundColor: '#fff', borderRadius: 6, padding: 8, marginRight: 8 }}
        />
        <TouchableOpacity onPress={handleAddPost} style={{ backgroundColor: '#0284c7', borderRadius: 6, padding: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Post</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={item => item.postId.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, padding: 12, backgroundColor: '#fff', borderRadius: 6, elevation: 1 }}>
            <Text style={{ fontWeight: '600', marginBottom: 4 }}>{item.content}</Text>
            <View style={{ flexDirection: 'row', marginBottom: 4 }}>
              <TouchableOpacity onPress={() => handleDeletePost(item.postId)} style={{ marginRight: 12 }}>
                <Text style={{ color: '#dc2626', fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
            </View>
            {/* Comments */}
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Comments</Text>
              {(item.comments || []).map(comment => (
                <Text key={comment.id} style={{ marginLeft: 8, color: '#555' }}>- {comment.text}</Text>
              ))}
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <TextInput
                  value={commentInputs[item.postId] || ''}
                  onChangeText={text => setCommentInputs({ ...commentInputs, [item.postId]: text })}
                  placeholder="Add a comment..."
                  style={{ flex: 1, backgroundColor: '#f3f4f6', borderRadius: 6, padding: 6, marginRight: 6 }}
                />
                <TouchableOpacity onPress={() => handleAddComment(item.postId)} style={{ backgroundColor: '#059669', borderRadius: 6, padding: 8 }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No posts yet.</Text>}
      />
    </View>
  );
} 