import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface MediaUploadProps {
  onMediaSelected: (media: MediaFile) => void;
  maxDuration?: number; // in seconds
  allowedTypes?: ('video' | 'audio' | 'image')[];
  disabled?: boolean;
}

export interface MediaFile {
  uri: string;
  type: 'video' | 'audio' | 'image';
  duration?: number;
  thumbnail?: string;
  size: number;
  filename: string;
}

export default function MediaUpload({
  onMediaSelected,
  maxDuration = 30,
  allowedTypes = ['video', 'audio', 'image'],
  disabled = false,
}: MediaUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Please grant camera roll permissions to upload media.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const pickMedia = async (type: 'video' | 'audio' | 'image') => {
    if (disabled) return;
    
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const options: ImagePicker.ImagePickerOptions = {
        mediaTypes: type === 'video' ? ImagePicker.MediaTypeOptions.Videos :
                   type === 'audio' ? ImagePicker.MediaTypeOptions.All :
                   ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
        videoMaxDuration: maxDuration,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        let mediaFile: MediaFile = {
          uri: asset.uri,
          type: type,
          size: asset.fileSize || 0,
          filename: asset.fileName || `media_${Date.now()}.${type}`,
        };

        // For video, we'll use the first frame as thumbnail (simplified)
        if (type === 'video' && asset.uri) {
          mediaFile.thumbnail = asset.uri; // Use video URI as placeholder
          mediaFile.duration = asset.duration || 0;
        }

        onMediaSelected(mediaFile);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick media. Please try again.');
      console.error('Media pick error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const recordVideo = async () => {
    if (disabled) return;
    
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
        videoMaxDuration: maxDuration,
        videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const asset = result.assets[0];
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
          await new Promise(resolve => setTimeout(resolve, 50));
        }

        let mediaFile: MediaFile = {
          uri: asset.uri,
          type: 'video',
          size: asset.fileSize || 0,
          filename: asset.fileName || `video_${Date.now()}.mp4`,
        };

        // Use video URI as thumbnail placeholder
        if (asset.uri) {
          mediaFile.thumbnail = asset.uri;
          mediaFile.duration = asset.duration || 0;
        }

        onMediaSelected(mediaFile);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to record video. Please try again.');
      console.error('Video recording error:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (isUploading) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary[700]} />
        <Text style={styles.uploadingText}>Uploading... {uploadProgress}%</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Media</Text>
      <Text style={styles.subtitle}>Max duration: {maxDuration}s</Text>
      
      <View style={styles.buttonGrid}>
        {allowedTypes.includes('video') && (
          <>
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => pickMedia('video')}
              disabled={disabled}
            >
              <Ionicons name="videocam" size={24} color={theme.colors.primary[700]} />
              <Text style={styles.buttonText}>Video</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={recordVideo}
              disabled={disabled}
            >
              <Ionicons name="camera" size={24} color={theme.colors.primary[700]} />
              <Text style={styles.buttonText}>Record</Text>
            </TouchableOpacity>
          </>
        )}
        
        {allowedTypes.includes('image') && (
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => pickMedia('image')}
            disabled={disabled}
          >
            <Ionicons name="image" size={24} color={theme.colors.primary[700]} />
            <Text style={styles.buttonText}>Photo</Text>
          </TouchableOpacity>
        )}
        
        {allowedTypes.includes('audio') && (
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => pickMedia('audio')}
            disabled={disabled}
          >
            <Ionicons name="mic" size={24} color={theme.colors.primary[700]} />
            <Text style={styles.buttonText}>Audio</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface[0],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    marginVertical: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.ink[900],
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.ink[700],
    marginBottom: theme.spacing.md,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  mediaButton: {
    flex: 1,
    minWidth: 80,
    backgroundColor: theme.colors.surface[50],
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
  buttonText: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.ink[900],
    marginTop: theme.spacing.xs,
  },
  uploadingContainer: {
    backgroundColor: theme.colors.surface[0],
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    marginVertical: theme.spacing.sm,
  },
  uploadingText: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.ink[700],
    marginTop: theme.spacing.sm,
  },
});
