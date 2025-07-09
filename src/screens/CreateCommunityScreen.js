import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  useTheme,
  Card,
  Chip,
  SegmentedButtons,
  Switch,
  Divider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { connectorTypes } from '../data/mockData';

const CreateConnectorScreen = ({ navigation }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    locationRadius: '1km',
    isPrivate: false,
    verifiedRequired: false,
    rules: '',
    tags: [],
    bannerImage: null
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState('');

  const availableTags = [
    "roommates", "bills", "chores", "dating", "singles", "business", "networking",
    "pets", "animals", "fitness", "health", "food", "restaurants", "volunteer",
    "community", "events", "collaboration", "support", "anonymous"
  ];

  const locationRadiusOptions = [
    { label: '500m', value: '500m' },
    { label: '1km', value: '1km' },
    { label: '1.5km', value: '1.5km' },
    { label: '2km', value: '2km' },
    { label: '3km', value: '3km' },
    { label: '5km', value: '5km' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleLocationRadiusChange = (value) => {
    setFormData(prev => ({ ...prev, locationRadius: value }));
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
      setFormData(prev => ({ 
        ...prev, 
        tags: prev.tags.filter(t => t !== tag) 
      }));
    } else {
      setSelectedTags(prev => [...prev, tag]);
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tag] 
      }));
    }
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      const newTag = customTag.trim();
      setSelectedTags(prev => [...prev, newTag]);
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, newTag] 
      }));
      setCustomTag('');
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, bannerImage: result.assets[0].uri }));
    }
  };

  const handleCreateConnector = () => {
    // Validate form
    if (!formData.name.trim() || !formData.description.trim() || !formData.type) {
      alert('Please fill in all required fields');
      return;
    }

    // Mock connector creation
    console.log('Creating connector:', formData);
    alert('Connector created successfully!');
    navigation.goBack();
  };

  const getConnectorTypeColor = (type) => {
    const connectorType = connectorTypes.find(ct => ct.id.toLowerCase() === type.toLowerCase());
    return connectorType ? connectorType.color : theme.colors.primary;
  };

  const getConnectorTypeIcon = (type) => {
    const connectorType = connectorTypes.find(ct => ct.id.toLowerCase() === type.toLowerCase());
    return connectorType ? connectorType.icon : 'account-group';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={theme.colors.onSurface} 
            />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
            Create Connector
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Banner Image */}
        <View style={styles.bannerSection}>
          <TouchableOpacity onPress={handlePickImage} style={styles.bannerContainer}>
            {formData.bannerImage ? (
              <Image source={{ uri: formData.bannerImage }} style={styles.bannerImage} />
            ) : (
              <View style={[styles.bannerPlaceholder, { backgroundColor: theme.colors.surfaceVariant }]}>
                <MaterialCommunityIcons 
                  name="image-plus" 
                  size={48} 
                  color={theme.colors.onSurfaceVariant} 
                />
                <Text style={[styles.bannerText, { color: theme.colors.onSurfaceVariant }]}>
                  Add Banner Image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Information */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Basic Information
            </Text>
            
            <TextInput
              label="Connector Name *"
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              style={styles.input}
              mode="outlined"
            />

            <TextInput
              label="Description *"
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={3}
            />
          </Card.Content>
        </Card>

        {/* Connector Type */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Connector Type *
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Choose the type that best describes your connector
            </Text>
            
            <View style={styles.typeGrid}>
              {connectorTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => handleTypeSelect(type.id)}
                  style={[
                    styles.typeOption,
                    formData.type === type.id && { 
                      backgroundColor: type.color,
                      borderColor: type.color 
                    }
                  ]}
                >
                  <MaterialCommunityIcons 
                    name={type.icon} 
                    size={24} 
                    color={formData.type === type.id ? 'white' : type.color} 
                  />
                  <Text style={[
                    styles.typeText,
                    { color: formData.type === type.id ? 'white' : theme.colors.onSurface }
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Location & Settings */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Location & Settings
            </Text>
            
            <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
              Location Radius
            </Text>
            <SegmentedButtons
              value={formData.locationRadius}
              onValueChange={handleLocationRadiusChange}
              buttons={locationRadiusOptions.map(option => ({
                value: option.value,
                label: option.label,
              }))}
              style={styles.segmentedButtons}
            />

            <Divider style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                  Private Connector
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Only invited members can join
                </Text>
              </View>
              <Switch
                value={formData.isPrivate}
                onValueChange={(value) => handleInputChange('isPrivate', value)}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.colors.onSurface }]}>
                  Verification Required
                </Text>
                <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                  Members must be verified to join
                </Text>
              </View>
              <Switch
                value={formData.verifiedRequired}
                onValueChange={(value) => handleInputChange('verifiedRequired', value)}
                color={theme.colors.primary}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Tags */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Tags
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Add tags to help people discover your connector
            </Text>
            
            <View style={styles.tagInput}>
              <TextInput
                label="Add custom tag"
                value={customTag}
                onChangeText={setCustomTag}
                style={styles.input}
                mode="outlined"
                right={
                  <TextInput.Icon 
                    icon="plus" 
                    onPress={handleAddCustomTag}
                    disabled={!customTag.trim()}
                  />
                }
              />
            </View>

            <View style={styles.tagsContainer}>
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  onPress={() => handleTagToggle(tag)}
                >
                  <Chip
                    style={[
                      styles.tagChip,
                      selectedTags.includes(tag) && { backgroundColor: theme.colors.primary }
                    ]}
                    textStyle={{ 
                      color: selectedTags.includes(tag) 
                        ? theme.colors.onPrimary 
                        : theme.colors.onSurfaceVariant 
                    }}
                    compact
                  >
                    #{tag}
                  </Chip>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Rules */}
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Community Rules
            </Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.onSurfaceVariant }]}>
              Set guidelines for your connector members
            </Text>
            
            <TextInput
              label="Rules"
              value={formData.rules}
              onChangeText={(text) => handleInputChange('rules', text)}
              style={styles.input}
              mode="outlined"
              multiline
              numberOfLines={4}
              placeholder="Be respectful, no spam, keep posts relevant..."
            />
          </Card.Content>
        </Card>

        {/* Create Button */}
        <View style={styles.createButton}>
          <Button
            mode="contained"
            onPress={handleCreateConnector}
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            textColor={theme.colors.onPrimary}
            disabled={!formData.name.trim() || !formData.description.trim() || !formData.type}
          >
            Create Connector
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  bannerSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bannerContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  bannerPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  bannerText: {
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeOption: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    gap: 8,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  settingDescription: {
    fontSize: 12,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  tagInput: {
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagChip: {
    marginBottom: 8,
  },
  createButton: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 8,
  },
});

export default CreateConnectorScreen; 