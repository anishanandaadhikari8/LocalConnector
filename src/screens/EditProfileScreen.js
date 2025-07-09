import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Avatar, useTheme, HelperText } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  neighborhood: 'Downtown',
  bio: 'Tech enthusiast. Coffee lover. Neighborhood watch volunteer.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
};

const EditProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const [form, setForm] = useState({ ...mockUser });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      // Mock save
      alert('Profile updated!');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backButton, { color: theme.colors.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>Edit Profile</Text>
        </View>
        <View style={styles.avatarSection}>
          <Avatar.Image size={80} source={{ uri: form.avatar }} />
        </View>
        <TextInput
          label="Name"
          value={form.name}
          onChangeText={v => handleChange('name', v)}
          style={styles.input}
          error={!!errors.name}
        />
        <HelperText type="error" visible={!!errors.name}>{errors.name}</HelperText>
        <TextInput
          label="Email"
          value={form.email}
          onChangeText={v => handleChange('email', v)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
        />
        <HelperText type="error" visible={!!errors.email}>{errors.email}</HelperText>
        <TextInput
          label="Phone"
          value={form.phone}
          onChangeText={v => handleChange('phone', v)}
          style={styles.input}
          keyboardType="phone-pad"
        />
        <TextInput
          label="Neighborhood"
          value={form.neighborhood}
          onChangeText={v => handleChange('neighborhood', v)}
          style={styles.input}
        />
        <TextInput
          label="Bio"
          value={form.bio}
          onChangeText={v => handleChange('bio', v)}
          style={styles.input}
          multiline
          numberOfLines={3}
        />
        <Button
          mode="contained"
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
          textColor={theme.colors.onPrimary}
        >
          Save Changes
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    fontSize: 16,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default EditProfileScreen; 