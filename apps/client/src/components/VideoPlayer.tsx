import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
// Removed expo-av dependency to fix loading issues
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface VideoPlayerProps {
  uri: string;
  thumbnail?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onPlaybackStatusUpdate?: (status: any) => void;
  style?: any;
}

const { width: screenWidth } = Dimensions.get('window');

export default function VideoPlayer({
  uri,
  thumbnail,
  autoPlay = false,
  loop = false,
  muted = false,
  onPlaybackStatusUpdate,
  style,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const togglePlayPause = async () => {
    // Simplified video player - just toggle state
    setIsPlaying(!isPlaying);
    setShowControls(true);
    
    if (onPlaybackStatusUpdate) {
      onPlaybackStatusUpdate({
        isLoaded: true,
        isPlaying: !isPlaying,
        durationMillis: 30000, // Default 30 seconds
        positionMillis: 0,
      });
    }
  };

  const handleVideoPress = () => {
    setShowControls(!showControls);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.videoContainer}
        onPress={handleVideoPress}
        activeOpacity={1}
      >
        {/* Video thumbnail or placeholder */}
        <Image
          source={{ uri: thumbnail || uri }}
          style={styles.videoThumbnail}
          resizeMode="cover"
        />
        
        {/* Play/Pause overlay */}
        {showControls && (
          <View style={styles.controlsOverlay}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayPause}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={32}
                color={theme.colors.surface[0]}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.colors.primary[700]} />
          </View>
        )}

        {/* Video info overlay */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoDuration}>0:30</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: theme.colors.surface[100],
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  videoDuration: {
    color: theme.colors.surface[0],
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
  },
});
