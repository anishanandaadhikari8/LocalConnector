import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ConnectorAdminConfig({ connector, onSave, onClose }) {
  const [config, setConfig] = useState({
    name: connector?.name || '',
    description: connector?.description || '',
    type: connector?.type || 'Apartment',
    address: connector?.address || '',
    geoRadius: connector?.geoRadius?.toString() || '500',
    verifiedRequired: connector?.verifiedRequired || false,
    isPublic: connector?.isPublic !== false, // default true
    rules: connector?.rules || '',
    modulesEnabled: connector?.modulesEnabled || []
  });

  const connectorTypes = [
    { value: 'Apartment', label: 'Apartment / HOA / Building', icon: 'home' },
    { value: 'Marketplace', label: 'Local Marketplace', icon: 'storefront' },
    { value: 'Safety', label: 'Neighborhood Watch / Safety', icon: 'shield-checkmark' },
    { value: 'Event', label: 'Event & Party Organizing', icon: 'calendar' },
    { value: 'Roommate', label: 'Roommate Coordination', icon: 'people' },
    { value: 'Dating', label: 'Dating for Verified Locals', icon: 'heart' }
  ];

  const getAvailableModules = (type) => {
    const moduleConfigs = {
      Apartment: [
        { id: 'posts', name: 'Announcements', description: 'Admin-only announcements and community posts', adminOnly: true },
        { id: 'alerts', name: 'Alerts', description: 'Building alerts and notices', adminOnly: true },
        { id: 'bills', name: 'Bills', description: 'HOA fees and bill management' },
        { id: 'chat', name: 'Chat', description: 'Group and private messaging' },
        { id: 'events', name: 'Events', description: 'Community events and meetings' },
        { id: 'directory', name: 'Directory', description: 'Resident directory' },
        { id: 'safety', name: 'Safety', description: 'Safety alerts and lost & found' }
      ],
      Marketplace: [
        { id: 'posts', name: 'Posts', description: 'General marketplace discussions' },
        { id: 'marketplace', name: 'Marketplace', description: 'Buy/sell/trade listings' },
        { id: 'chat', name: 'Chat', description: 'Buyer-seller communication' },
        { id: 'directory', name: 'Directory', description: 'Member directory' },
        { id: 'reviews', name: 'Reviews', description: 'User ratings and reviews' }
      ],
      Safety: [
        { id: 'posts', name: 'Posts', description: 'Safety discussions' },
        { id: 'safety', name: 'Safety Alerts', description: 'Report and view safety incidents' },
        { id: 'chat', name: 'Chat', description: 'Safety coordination chat' },
        { id: 'directory', name: 'Directory', description: 'Member directory' },
        { id: 'events', name: 'Events', description: 'Safety meetings and events' }
      ],
      Event: [
        { id: 'posts', name: 'Posts', description: 'Event discussions' },
        { id: 'events', name: 'Events', description: 'Create and manage events' },
        { id: 'chat', name: 'Chat', description: 'Event coordination' },
        { id: 'directory', name: 'Directory', description: 'Member directory' },
        { id: 'bills', name: 'Bills', description: 'Event cost sharing' }
      ],
      Roommate: [
        { id: 'posts', name: 'Posts', description: 'Roommate discussions' },
        { id: 'chat', name: 'Chat', description: 'Group and private chat' },
        { id: 'bills', name: 'Bills', description: 'Bill splitting and tracking' },
        { id: 'roommate', name: 'Roommate Tools', description: 'Roommate finding and management' },
        { id: 'directory', name: 'Directory', description: 'Member directory' },
        { id: 'events', name: 'Events', description: 'House events and activities' }
      ],
      Dating: [
        { id: 'posts', name: 'Posts', description: 'Community discussions (optional)' },
        { id: 'dating', name: 'Dating Features', description: 'Profile browsing and matching' },
        { id: 'chat', name: 'Chat', description: 'Match messaging' },
        { id: 'directory', name: 'Directory', description: 'Member directory' },
        { id: 'events', name: 'Events', description: 'Dating events and meetups' }
      ]
    };
    return moduleConfigs[type] || [];
  };

  const selectedType = connectorTypes.find(t => t.value === config.type);
  const availableModules = getAvailableModules(config.type);

  const toggleModule = (moduleId) => {
    setConfig(prev => ({
      ...prev,
      modulesEnabled: prev.modulesEnabled.includes(moduleId)
        ? prev.modulesEnabled.filter(id => id !== moduleId)
        : [...prev.modulesEnabled, moduleId]
    }));
  };

  const handleSave = () => {
    if (!config.name.trim()) {
      Alert.alert('Error', 'Connector name is required');
      return;
    }
    if (!config.address.trim()) {
      Alert.alert('Error', 'Address is required');
      return;
    }
    if (!config.geoRadius || isNaN(parseInt(config.geoRadius))) {
      Alert.alert('Error', 'Valid geo radius is required');
      return;
    }

    const saveData = {
      ...config,
      geoRadius: parseInt(config.geoRadius)
    };

    onSave?.(saveData);
    Alert.alert('Success', 'Connector configuration saved successfully!');
  };

  const getTypeSpecificSettings = () => {
    switch (config.type) {
      case 'Apartment':
        return (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1f2937' }}>
              Building-Specific Settings
            </Text>
            <View style={{ backgroundColor: '#f9fafb', padding: 12, borderRadius: 8 }}>
              <Text style={{ color: '#6b7280', fontSize: 14 }}>
                • Residents require ID verification by default{'\n'}
                • Admin approval needed for new members{'\n'}
                • Unit numbers can be added to member profiles
              </Text>
            </View>
          </View>
        );
      
      case 'Dating':
        return (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1f2937' }}>
              Dating-Specific Settings
            </Text>
            <View style={{ backgroundColor: '#fef2f2', padding: 12, borderRadius: 8 }}>
              <Text style={{ color: '#dc2626', fontSize: 14, fontWeight: '600' }}>
                ID Verification Required
              </Text>
              <Text style={{ color: '#7f1d1d', fontSize: 14, marginTop: 4 }}>
                All dating connector members must verify their identity for safety.
              </Text>
            </View>
          </View>
        );
      
      case 'Safety':
        return (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1f2937' }}>
              Safety-Specific Settings
            </Text>
            <View style={{ backgroundColor: '#eff6ff', padding: 12, borderRadius: 8 }}>
              <Text style={{ color: '#1e40af', fontSize: 14 }}>
                • Emergency alerts notify local authorities{'\n'}
                • Anonymous reporting option available{'\n'}
                • Incident mapping (future feature)
              </Text>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
              Connector Configuration
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Basic Information */}
          <View style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
              Basic Information
            </Text>

            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 }}>
              Connector Name *
            </Text>
            <TextInput
              value={config.name}
              onChangeText={(text) => setConfig(prev => ({ ...prev, name: text }))}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16
              }}
              placeholder="e.g., Greenwood Apartments Community"
            />

            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 }}>
              Description
            </Text>
            <TextInput
              value={config.description}
              onChangeText={(text) => setConfig(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={3}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                textAlignVertical: 'top',
                fontSize: 16
              }}
              placeholder="Describe the purpose and community..."
            />

            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
              Connector Type *
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {connectorTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  onPress={() => setConfig(prev => ({ ...prev, type: type.value, modulesEnabled: [] }))}
                  style={{
                    backgroundColor: config.type === type.value ? '#3b82f6' : '#f3f4f6',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 8,
                    marginRight: 12,
                    minWidth: 120,
                    alignItems: 'center'
                  }}
                >
                  <Ionicons 
                    name={type.icon} 
                    size={24} 
                    color={config.type === type.value ? 'white' : '#6b7280'} 
                  />
                  <Text style={{
                    color: config.type === type.value ? 'white' : '#6b7280',
                    fontWeight: '600',
                    marginTop: 4,
                    textAlign: 'center',
                    fontSize: 12
                  }}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Location & Access */}
          <View style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
              Location & Access
            </Text>

            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 }}>
              Address *
            </Text>
            <TextInput
              value={config.address}
              onChangeText={(text) => setConfig(prev => ({ ...prev, address: text }))}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16
              }}
              placeholder="123 Main Street, City"
            />

            <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4 }}>
              Geo Radius (meters) *
            </Text>
            <TextInput
              value={config.geoRadius}
              onChangeText={(text) => setConfig(prev => ({ ...prev, geoRadius: text }))}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 16
              }}
              placeholder="500"
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
                  Public Connector
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 14, marginTop: 2 }}>
                  Anyone can discover and request to join
                </Text>
              </View>
              <Switch
                value={config.isPublic}
                onValueChange={(value) => setConfig(prev => ({ ...prev, isPublic: value }))}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
                  ID Verification Required
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 14, marginTop: 2 }}>
                  Members must verify their identity
                </Text>
              </View>
              <Switch
                value={config.verifiedRequired}
                onValueChange={(value) => setConfig(prev => ({ ...prev, verifiedRequired: value }))}
                disabled={config.type === 'Dating'} // Always required for dating
              />
            </View>
          </View>

          {/* Type-Specific Settings */}
          {getTypeSpecificSettings()}

          {/* Module Configuration */}
          <View style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
              Enabled Modules
            </Text>
            
            <Text style={{ color: '#6b7280', marginBottom: 16 }}>
              Select which features are available for {selectedType?.label}
            </Text>

            {availableModules.map((module) => (
              <View key={module.id} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f4f6'
              }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
                      {module.name}
                    </Text>
                    {module.adminOnly && (
                      <View style={{
                        backgroundColor: '#fef3c7',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginLeft: 8
                      }}>
                        <Text style={{ color: '#92400e', fontSize: 10, fontWeight: '600' }}>
                          ADMIN ONLY
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ color: '#6b7280', fontSize: 14, marginTop: 2 }}>
                    {module.description}
                  </Text>
                </View>
                <Switch
                  value={config.modulesEnabled.includes(module.id)}
                  onValueChange={() => toggleModule(module.id)}
                />
              </View>
            ))}
          </View>

          {/* Rules & Guidelines */}
          <View style={{
            backgroundColor: 'white',
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
              Rules & Guidelines
            </Text>

            <TextInput
              value={config.rules}
              onChangeText={(text) => setConfig(prev => ({ ...prev, rules: text }))}
              multiline
              numberOfLines={6}
              style={{
                borderWidth: 1,
                borderColor: '#d1d5db',
                borderRadius: 8,
                padding: 12,
                textAlignVertical: 'top',
                fontSize: 16
              }}
              placeholder="Enter community rules and guidelines..."
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: '#10b981',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              marginBottom: 32
            }}
          >
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
              Save Configuration
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}