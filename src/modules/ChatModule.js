import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function ChatModule() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: 'John Doe',
      lastMessage: 'Hey, is that iPhone still available?',
      timestamp: '2:30 PM',
      unread: 1,
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      user: 'Jane Smith',
      lastMessage: 'Thanks for the coffee table!',
      timestamp: '1:15 PM',
      unread: 0,
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      lastMessage: 'Are you going to the community event?',
      timestamp: '11:45 AM',
      unread: 2,
      avatar: 'https://via.placeholder.com/40',
    }
  ]);

  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: 'Hey, is that iPhone still available?', sender: 'John Doe', timestamp: '2:30 PM' },
      { id: 2, text: 'Yes, it is! Are you interested?', sender: 'me', timestamp: '2:32 PM' },
      { id: 3, text: 'What\'s the best price you can do?', sender: 'John Doe', timestamp: '2:35 PM' },
    ],
    2: [
      { id: 1, text: 'Thanks for the coffee table!', sender: 'Jane Smith', timestamp: '1:15 PM' },
      { id: 2, text: 'You\'re welcome! Hope you like it.', sender: 'me', timestamp: '1:20 PM' },
    ],
    3: [
      { id: 1, text: 'Are you going to the community event?', sender: 'Mike Johnson', timestamp: '11:45 AM' },
      { id: 2, text: 'Yes, I\'ll be there!', sender: 'me', timestamp: '11:50 AM' },
      { id: 3, text: 'Great! See you there.', sender: 'Mike Johnson', timestamp: '11:52 AM' },
    ]
  });

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const chatId = selectedChat.id;
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages({
      ...messages,
      [chatId]: [...(messages[chatId] || []), newMsg],
    });

    // Update conversation with last message
    setConversations(conversations.map(conv =>
      conv.id === chatId
        ? { ...conv, lastMessage: newMessage, timestamp: newMsg.timestamp, unread: 0 }
        : conv
    ));

    setNewMessage('');
  };

  const handleSelectChat = (conversation) => {
    setSelectedChat(conversation);
    // Mark as read
    setConversations(conversations.map(conv =>
      conv.id === conversation.id
        ? { ...conv, unread: 0 }
        : conv
    ));
  };

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectChat(item)}
      style={{
        flexDirection: 'row',
        padding: 12,
        backgroundColor: selectedChat?.id === item.id ? '#e0f2fe' : '#fff',
        borderRadius: 6,
        marginBottom: 8,
        elevation: 1,
      }}
    >
      <View style={{ width: 40, height: 40, backgroundColor: '#f3f4f6', borderRadius: 20, marginRight: 12 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.user}</Text>
          <Text style={{ color: '#666', fontSize: 12 }}>{item.timestamp}</Text>
        </View>
        <Text style={{ color: '#666', marginTop: 2 }} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread > 0 && (
        <View style={{ backgroundColor: '#dc2626', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 }}>
          <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMessage = ({ item }) => (
    <View style={{
      alignSelf: item.sender === 'me' ? 'flex-end' : 'flex-start',
      backgroundColor: item.sender === 'me' ? '#0284c7' : '#f3f4f6',
      padding: 8,
      borderRadius: 12,
      marginBottom: 8,
      maxWidth: '80%',
    }}>
      <Text style={{
        color: item.sender === 'me' ? '#fff' : '#000',
        fontSize: 14,
      }}>
        {item.text}
      </Text>
      <Text style={{
        color: item.sender === 'me' ? '#e0f2fe' : '#666',
        fontSize: 10,
        marginTop: 2,
      }}>
        {item.timestamp}
      </Text>
    </View>
  );

  if (selectedChat) {
    return (
      <View style={{ flex: 1, padding: 8 }}>
        {/* Chat Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => setSelectedChat(null)} style={{ marginRight: 12 }}>
            <Text style={{ color: '#0284c7', fontWeight: 'bold' }}>← Back</Text>
          </TouchableOpacity>
          <View style={{ width: 40, height: 40, backgroundColor: '#f3f4f6', borderRadius: 20, marginRight: 12 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{selectedChat.user}</Text>
        </View>

        {/* Messages */}
        <FlatList
          data={messages[selectedChat.id] || []}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMessage}
          style={{ flex: 1, marginBottom: 12 }}
          inverted
        />

        {/* Message Input */}
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            style={{ flex: 1, backgroundColor: '#fff', borderRadius: 20, padding: 10, marginRight: 8 }}
          />
          <TouchableOpacity onPress={handleSendMessage} style={{ backgroundColor: '#0284c7', borderRadius: 20, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ padding: 8 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Chat</Text>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id.toString()}
        renderItem={renderConversation}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No conversations yet.</Text>}
      />
    </View>
  );
} 