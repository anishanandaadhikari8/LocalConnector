import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  console.log('SplashScreen rendering...');

  useEffect(() => {
    console.log('SplashScreen useEffect - starting animation');
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spin.start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons 
          name="home-group" 
          size={80} 
          color="#ffffff" 
        />
        <Text style={styles.appName}>NeighborConnect</Text>
        <Text style={styles.tagline}>Your Neighborhood, Connected</Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#dbeafe',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  spinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
  },
});

export default SplashScreen; 