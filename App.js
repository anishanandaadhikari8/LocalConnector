import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Providers } from './src/providers/Providers';
import { useAuth } from './src/providers/AuthProvider';
import AppNavigator from './src/navigation/AppNavigator';
import AuthScreen from './src/screens/AuthScreen';

// Loading Component
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0284c7" />
    <Text style={styles.loadingText}>Loading NeighborConnect...</Text>
  </View>
);

// Main App Component
const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return <AppNavigator />;
};

// Root App Component
export default function App() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
}); 