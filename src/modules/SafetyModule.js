import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { safetyAlerts } from '../data/mockData';

export default function SafetyModule() {
  const [alerts, setAlerts] = useState(safetyAlerts);
  const [showReportModal, setShowReportModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'medium', // low, medium, high, emergency
    category: 'suspicious', // suspicious, crime, emergency, maintenance, general
    anonymous: false
  });
  const [selectedCategory, setSelectedCategory] = useState('all');

  const severityConfig = {
    low: { color: '#10b981', icon: 'information-circle', label: 'Low' },
    medium: { color: '#f59e0b', icon: 'warning', label: 'Medium' },
    high: { color: '#ef4444', icon: 'alert-circle', label: 'High' },
    emergency: { color: '#dc2626', icon: 'alarm', label: 'Emergency' }
  };

  const categoryConfig = {
    suspicious: { color: '#8b5cf6', icon: 'eye', label: 'Suspicious Activity' },
    crime: { color: '#ef4444', icon: 'shield-off', label: 'Crime Report' },
    emergency: { color: '#dc2626', icon: 'medical', label: 'Emergency' },
    maintenance: { color: '#6b7280', icon: 'construct', label: 'Maintenance Issue' },
    general: { color: '#3b82f6', icon: 'chatbubble-ellipses', label: 'General Safety' }
  };

  const handleSubmitAlert = () => {
    if (!newAlert.title || !newAlert.description || !newAlert.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const alert = {
      id: `alert_${Date.now()}`,
      title: newAlert.title,
      description: newAlert.description,
      location: newAlert.location,
      severity: newAlert.severity,
      category: newAlert.category,
      reportedBy: newAlert.anonymous ? 'Anonymous' : 'Current User',
      userId: newAlert.anonymous ? null : 'current_user',
      timestamp: new Date().toISOString(),
      status: 'active',
      responses: 0,
      verified: false
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({
      title: '',
      description: '',
      location: '',
      severity: 'medium',
      category: 'suspicious',
      anonymous: false
    });
    setShowReportModal(false);
    
    Alert.alert(
      'Alert Submitted', 
      newAlert.severity === 'emergency' 
        ? 'Emergency alert sent to all members and local authorities will be notified.'
        : 'Your safety alert has been posted to the community.',
      [{ text: 'OK' }]
    );
  };

  const markAsResolved = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
  };

  const getFilteredAlerts = () => {
    if (selectedCategory === 'all') return alerts;
    return alerts.filter(alert => alert.category === selectedCategory);
  };

  const renderAlertCard = (alert) => {
    const severity = severityConfig[alert.severity];
    const category = categoryConfig[alert.category];
    
    return (
      <View key={alert.id} style={{
        backgroundColor: 'white',
        margin: 8,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: severity.color
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name={severity.icon} size={20} color={severity.color} />
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: severity.color, 
                marginLeft: 8,
                textTransform: 'uppercase'
              }}>
                {severity.label}
              </Text>
              <View style={{
                backgroundColor: category.color,
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 12,
                marginLeft: 12
              }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                  {category.label.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 }}>
              {alert.title}
            </Text>
            
            <Text style={{ color: '#4b5563', marginBottom: 8, lineHeight: 20 }}>
              {alert.description}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Ionicons name="location-outline" size={16} color="#6b7280" />
              <Text style={{ color: '#6b7280', marginLeft: 4, flex: 1 }}>
                {alert.location}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                {new Date(alert.timestamp).toLocaleString()}
              </Text>
              <Text style={{ color: '#6b7280', marginLeft: 12 }}>
                by {alert.reportedBy}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 16
              }}>
                <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
                <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                  {alert.responses} responses
                </Text>
              </TouchableOpacity>
              
              {alert.verified && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Text style={{ color: '#10b981', marginLeft: 4, fontSize: 12 }}>
                    Verified
                  </Text>
                </View>
              )}
            </View>
          </View>
          
          <View style={{ alignItems: 'center' }}>
            <View style={{
              backgroundColor: alert.status === 'active' ? severity.color : '#10b981',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12
            }}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                {alert.status.toUpperCase()}
              </Text>
            </View>
            
            {alert.status === 'active' && (
              <TouchableOpacity
                onPress={() => markAsResolved(alert.id)}
                style={{
                  backgroundColor: '#10b981',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  marginTop: 8
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 12 }}>
                  Mark Resolved
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView>
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
              Safety Alerts
            </Text>
            <TouchableOpacity
              onPress={() => setShowReportModal(true)}
              style={{
                backgroundColor: '#ef4444',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Ionicons name="shield-checkmark" size={20} color="white" />
              <Text style={{ color: 'white', fontWeight: '600', marginLeft: 4 }}>
                Report
              </Text>
            </TouchableOpacity>
          </View>

          {/* Emergency Contact Banner */}
          <View style={{
            backgroundColor: '#fef2f2',
            borderColor: '#fecaca',
            borderWidth: 1,
            padding: 16,
            borderRadius: 12,
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="call" size={24} color="#dc2626" />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#dc2626', marginLeft: 8 }}>
                Emergency Contacts
              </Text>
            </View>
            <Text style={{ color: '#7f1d1d', lineHeight: 20 }}>
              Emergency: 911 • Non-Emergency Police: (555) 123-4567 • Community Safety Coordinator: (555) 987-6543
            </Text>
          </View>

          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => setSelectedCategory('all')}
              style={{
                backgroundColor: selectedCategory === 'all' ? '#3b82f6' : 'white',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selectedCategory === 'all' ? '#3b82f6' : '#d1d5db'
              }}
            >
              <Text style={{ 
                color: selectedCategory === 'all' ? 'white' : '#6b7280',
                fontWeight: '600'
              }}>
                All Alerts
              </Text>
            </TouchableOpacity>
            
            {Object.entries(categoryConfig).map(([key, config]) => (
              <TouchableOpacity
                key={key}
                onPress={() => setSelectedCategory(key)}
                style={{
                  backgroundColor: selectedCategory === key ? config.color : 'white',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor: selectedCategory === key ? config.color : '#d1d5db',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Ionicons 
                  name={config.icon} 
                  size={16} 
                  color={selectedCategory === key ? 'white' : config.color} 
                />
                <Text style={{ 
                  color: selectedCategory === key ? 'white' : '#6b7280',
                  fontWeight: '600',
                  marginLeft: 4
                }}>
                  {config.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Alert Statistics */}
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
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
              Community Status
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ef4444' }}>
                  {alerts.filter(a => a.status === 'active').length}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Active Alerts</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#10b981' }}>
                  {alerts.filter(a => a.status === 'resolved').length}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Resolved</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3b82f6' }}>
                  {alerts.filter(a => a.verified).length}
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Verified</Text>
              </View>
            </View>
          </View>

          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#1f2937' }}>
            Recent Alerts
          </Text>
          
          {getFilteredAlerts().length === 0 ? (
            <View style={{
              backgroundColor: 'white',
              padding: 32,
              borderRadius: 12,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3
            }}>
              <Ionicons name="shield-checkmark-outline" size={48} color="#d1d5db" />
              <Text style={{ color: '#6b7280', marginTop: 8, textAlign: 'center' }}>
                No safety alerts in this category. Stay safe!
              </Text>
            </View>
          ) : (
            getFilteredAlerts().map(renderAlertCard)
          )}
        </View>
      </ScrollView>

      {/* Report Alert Modal */}
      <Modal visible={showReportModal} animationType="slide" transparent>
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '90%'
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Report Safety Alert</Text>
              <TouchableOpacity onPress={() => setShowReportModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                placeholder="Alert title"
                value={newAlert.title}
                onChangeText={(text) => setNewAlert(prev => ({ ...prev, title: text }))}
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16
                }}
              />

              <TextInput
                placeholder="Describe what happened..."
                value={newAlert.description}
                onChangeText={(text) => setNewAlert(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={4}
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  height: 100,
                  textAlignVertical: 'top'
                }}
              />

              <TextInput
                placeholder="Location (e.g., Corner of Main St & Oak Ave)"
                value={newAlert.location}
                onChangeText={(text) => setNewAlert(prev => ({ ...prev, location: text }))}
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16
                }}
              />

              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Category</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setNewAlert(prev => ({ ...prev, category: key }))}
                    style={{
                      backgroundColor: newAlert.category === key ? config.color : '#f3f4f6',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 16,
                      margin: 4,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Ionicons 
                      name={config.icon} 
                      size={16} 
                      color={newAlert.category === key ? 'white' : config.color} 
                    />
                    <Text style={{
                      color: newAlert.category === key ? 'white' : '#6b7280',
                      marginLeft: 4,
                      fontWeight: '600'
                    }}>
                      {config.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Severity Level</Text>
              <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                {Object.entries(severityConfig).map(([key, config]) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setNewAlert(prev => ({ ...prev, severity: key }))}
                    style={{
                      backgroundColor: newAlert.severity === key ? config.color : '#f3f4f6',
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 16,
                      marginRight: 8,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Ionicons 
                      name={config.icon} 
                      size={16} 
                      color={newAlert.severity === key ? 'white' : config.color} 
                    />
                    <Text style={{
                      color: newAlert.severity === key ? 'white' : '#6b7280',
                      marginLeft: 4,
                      fontWeight: '600'
                    }}>
                      {config.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                onPress={() => setNewAlert(prev => ({ ...prev, anonymous: !prev.anonymous }))}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20
                }}
              >
                <Ionicons 
                  name={newAlert.anonymous ? "checkbox" : "square-outline"} 
                  size={24} 
                  color="#3b82f6" 
                />
                <Text style={{ marginLeft: 8, color: '#374151' }}>
                  Submit anonymously
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmitAlert}
                style={{
                  backgroundColor: '#ef4444',
                  paddingVertical: 16,
                  borderRadius: 8,
                  alignItems: 'center'
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                  Submit Alert
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}