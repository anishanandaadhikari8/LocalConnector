import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  connectors, 
  connectorPosts, 
  events, 
  notifications, 
  conversations,
  mockUsers 
} from '../data/mockData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState(connectorPosts);
  const [connectorsList, setConnectorsList] = useState(connectors);
  const [eventsList, setEventsList] = useState(events);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [conversationsList, setConversationsList] = useState(conversations);
  const [users, setUsers] = useState(mockUsers);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from storage on app start
  useEffect(() => {
    loadDataFromStorage();
  }, []);

  const loadDataFromStorage = async () => {
    try {
      setIsLoading(true);
      const [
        storedPosts,
        storedConnectors,
        storedEvents,
        storedNotifications,
        storedConversations,
        storedUsers
      ] = await Promise.all([
        AsyncStorage.getItem('posts'),
        AsyncStorage.getItem('connectors'),
        AsyncStorage.getItem('events'),
        AsyncStorage.getItem('notifications'),
        AsyncStorage.getItem('conversations'),
        AsyncStorage.getItem('users')
      ]);

      if (storedPosts) setPosts(JSON.parse(storedPosts));
      if (storedConnectors) setConnectorsList(JSON.parse(storedConnectors));
      if (storedEvents) setEventsList(JSON.parse(storedEvents));
      if (storedNotifications) setNotificationsList(JSON.parse(storedNotifications));
      if (storedConversations) setConversationsList(JSON.parse(storedConversations));
      if (storedUsers) setUsers(JSON.parse(storedUsers));
    } catch (error) {
      console.error('Error loading data from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveDataToStorage = async () => {
    try {
      await Promise.all([
        AsyncStorage.setItem('posts', JSON.stringify(posts)),
        AsyncStorage.setItem('connectors', JSON.stringify(connectorsList)),
        AsyncStorage.setItem('events', JSON.stringify(eventsList)),
        AsyncStorage.setItem('notifications', JSON.stringify(notificationsList)),
        AsyncStorage.setItem('conversations', JSON.stringify(conversationsList)),
        AsyncStorage.setItem('users', JSON.stringify(users))
      ]);
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  };

  // Posts Management
  const createPost = async (postData) => {
    try {
      const newPost = {
        postId: `post_${Date.now()}`,
        ...postData,
        createdAt: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false,
        isBookmarked: false,
      };
      
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      await saveDataToStorage();
      return { success: true, post: newPost };
    } catch (error) {
      console.error('Error creating post:', error);
      return { success: false, error: error.message };
    }
  };

  const updatePost = async (postId, updates) => {
    try {
      const updatedPosts = posts.map(post => 
        post.postId === postId ? { ...post, ...updates } : post
      );
      setPosts(updatedPosts);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error updating post:', error);
      return { success: false, error: error.message };
    }
  };

  const deletePost = async (postId) => {
    try {
      const updatedPosts = posts.filter(post => post.postId !== postId);
      setPosts(updatedPosts);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error deleting post:', error);
      return { success: false, error: error.message };
    }
  };

  const likePost = async (postId, userId) => {
    try {
      const updatedPosts = posts.map(post => {
        if (post.postId === postId) {
          const isLiked = post.likedBy?.includes(userId) || false;
          const likedBy = isLiked 
            ? post.likedBy?.filter(id => id !== userId) || []
            : [...(post.likedBy || []), userId];
          
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !isLiked,
            likedBy
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error liking post:', error);
      return { success: false, error: error.message };
    }
  };

  // Connectors Management
  const createConnector = async (connectorData) => {
    try {
      const newConnector = {
        connectorId: `connector_${Date.now()}`,
        ...connectorData,
        createdAt: new Date().toISOString(),
        memberCount: 1,
        posts: [],
        events: [],
        isActive: true,
      };
      
      const updatedConnectors = [newConnector, ...connectorsList];
      setConnectorsList(updatedConnectors);
      await saveDataToStorage();
      return { success: true, connector: newConnector };
    } catch (error) {
      console.error('Error creating connector:', error);
      return { success: false, error: error.message };
    }
  };

  const updateConnector = async (connectorId, updates) => {
    try {
      const updatedConnectors = connectorsList.map(connector => 
        connector.connectorId === connectorId ? { ...connector, ...updates } : connector
      );
      setConnectorsList(updatedConnectors);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error updating connector:', error);
      return { success: false, error: error.message };
    }
  };

  const joinConnector = async (connectorId, userId) => {
    try {
      const updatedConnectors = connectorsList.map(connector => {
        if (connector.connectorId === connectorId) {
          const isMember = connector.members?.includes(userId) || false;
          const members = isMember 
            ? connector.members?.filter(id => id !== userId) || []
            : [...(connector.members || []), userId];
          
          return {
            ...connector,
            memberCount: isMember ? connector.memberCount - 1 : connector.memberCount + 1,
            members
          };
        }
        return connector;
      });
      
      setConnectorsList(updatedConnectors);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error joining connector:', error);
      return { success: false, error: error.message };
    }
  };

  // Events Management
  const createEvent = async (eventData) => {
    try {
      const newEvent = {
        eventId: `event_${Date.now()}`,
        ...eventData,
        createdAt: new Date().toISOString(),
        attendees: [],
        attendeeCount: 0,
        isActive: true,
      };
      
      const updatedEvents = [newEvent, ...eventsList];
      setEventsList(updatedEvents);
      await saveDataToStorage();
      return { success: true, event: newEvent };
    } catch (error) {
      console.error('Error creating event:', error);
      return { success: false, error: error.message };
    }
  };

  const joinEvent = async (eventId, userId) => {
    try {
      const updatedEvents = eventsList.map(event => {
        if (event.eventId === eventId) {
          const isAttending = event.attendees?.includes(userId) || false;
          const attendees = isAttending 
            ? event.attendees?.filter(id => id !== userId) || []
            : [...(event.attendees || []), userId];
          
          return {
            ...event,
            attendeeCount: isAttending ? event.attendeeCount - 1 : event.attendeeCount + 1,
            attendees
          };
        }
        return event;
      });
      
      setEventsList(updatedEvents);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error joining event:', error);
      return { success: false, error: error.message };
    }
  };

  // Notifications Management
  const createNotification = async (notificationData) => {
    try {
      const newNotification = {
        id: `notification_${Date.now()}`,
        ...notificationData,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      const updatedNotifications = [newNotification, ...notificationsList];
      setNotificationsList(updatedNotifications);
      await saveDataToStorage();
      return { success: true, notification: newNotification };
    } catch (error) {
      console.error('Error creating notification:', error);
      return { success: false, error: error.message };
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const updatedNotifications = notificationsList.map(notification => 
        notification.id === notificationId ? { ...notification, read: true } : notification
      );
      setNotificationsList(updatedNotifications);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, error: error.message };
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      const updatedNotifications = notificationsList.map(notification => ({
        ...notification,
        read: true
      }));
      setNotificationsList(updatedNotifications);
      await saveDataToStorage();
      return { success: true };
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return { success: false, error: error.message };
    }
  };

  // Messages Management
  const sendMessage = async (conversationId, messageData) => {
    try {
      const newMessage = {
        id: `message_${Date.now()}`,
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      const updatedConversations = conversationsList.map(conversation => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            messages: [...(conversation.messages || []), newMessage],
            lastMessage: newMessage,
            unreadCount: conversation.unreadCount + 1,
          };
        }
        return conversation;
      });
      
      setConversationsList(updatedConversations);
      await saveDataToStorage();
      return { success: true, message: newMessage };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, error: error.message };
    }
  };

  const createConversation = async (conversationData) => {
    try {
      const newConversation = {
        id: `conversation_${Date.now()}`,
        ...conversationData,
        createdAt: new Date().toISOString(),
        messages: [],
        unreadCount: 0,
      };
      
      const updatedConversations = [newConversation, ...conversationsList];
      setConversationsList(updatedConversations);
      await saveDataToStorage();
      return { success: true, conversation: newConversation };
    } catch (error) {
      console.error('Error creating conversation:', error);
      return { success: false, error: error.message };
    }
  };

  // Search and Filter Functions
  const searchPosts = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post => 
      post.title?.toLowerCase().includes(lowercaseQuery) ||
      post.content?.toLowerCase().includes(lowercaseQuery) ||
      post.author.name.toLowerCase().includes(lowercaseQuery)
    );
  };

  const searchConnectors = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return connectorsList.filter(connector => 
      connector.name.toLowerCase().includes(lowercaseQuery) ||
      connector.description?.toLowerCase().includes(lowercaseQuery) ||
      connector.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getPostsByConnector = (connectorId) => {
    return posts.filter(post => post.connectorId === connectorId);
  };

  const getConnectorById = (connectorId) => {
    return connectorsList.find(connector => connector.connectorId === connectorId);
  };

  const getUserById = (userId) => {
    return users.find(user => user.id === userId);
  };

  const value = {
    // Data
    posts,
    connectorsList,
    eventsList,
    notificationsList,
    conversationsList,
    users,
    isLoading,
    
    // Posts
    createPost,
    updatePost,
    deletePost,
    likePost,
    
    // Connectors
    createConnector,
    updateConnector,
    joinConnector,
    
    // Events
    createEvent,
    joinEvent,
    
    // Notifications
    createNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    
    // Messages
    sendMessage,
    createConversation,
    
    // Search and Filter
    searchPosts,
    searchConnectors,
    getPostsByConnector,
    getConnectorById,
    getUserById,
    
    // Utility
    saveDataToStorage,
    loadDataFromStorage,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}; 