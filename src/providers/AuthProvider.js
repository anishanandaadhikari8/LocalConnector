import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { currentUser } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check for existing session on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      // Mock authentication - in real app, this would be an API call
      if (email === 'john.doe@email.com' && password === 'password') {
        const userData = {
          ...currentUser,
          email,
          lastLogin: new Date().toISOString(),
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      setIsLoading(true);
      setAuthError(null);

      // Mock registration - in real app, this would be an API call
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        bio: 'New NeighborConnect member',
        location: 'Your City',
        verified: false,
        reputationScore: 50,
        joinedConnectors: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsAuthenticated(false);
      setAuthError(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUser = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  };

  const joinConnector = async (connectorId) => {
    try {
      const updatedUser = {
        ...user,
        joinedConnectors: [...(user.joinedConnectors || []), connectorId],
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error joining connector:', error);
      return { success: false, error: error.message };
    }
  };

  const leaveConnector = async (connectorId) => {
    try {
      const updatedUser = {
        ...user,
        joinedConnectors: user.joinedConnectors.filter(id => id !== connectorId),
      };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error leaving connector:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    authError,
    signIn,
    signUp,
    signOut,
    updateUser,
    joinConnector,
    leaveConnector,
    clearError: () => setAuthError(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 