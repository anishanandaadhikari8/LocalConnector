import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { roommateData } from '../data/mockData';

export default function RoommateModule() {
  const [activeTab, setActiveTab] = useState('find'); // find, manage, chores
  const [roommateProfiles] = useState(roommateData.profiles || []);
  const [choreList, setChoreList] = useState(roommateData.chores || []);
  const [newChore, setNewChore] = useState({ title: '', assignedTo: '', dueDate: '' });

  const tabs = [
    { id: 'find', label: 'Find Roommates', icon: 'people-outline' },
    { id: 'manage', label: 'Manage Living', icon: 'home-outline' },
    { id: 'chores', label: 'Chores', icon: 'checkbox-outline' }
  ];

  const markChoreComplete = (choreId) => {
    setChoreList(prev => prev.map(chore => 
      chore.id === choreId 
        ? { ...chore, status: 'completed', completedAt: new Date().toISOString() }
        : chore
    ));
  };

  const addChore = () => {
    if (!newChore.title) {
      Alert.alert('Error', 'Please enter a chore title');
      return;
    }

    const chore = {
      id: `chore_${Date.now()}`,
      title: newChore.title,
      assignedTo: newChore.assignedTo || 'Unassigned',
      dueDate: newChore.dueDate,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setChoreList([chore, ...choreList]);
    setNewChore({ title: '', assignedTo: '', dueDate: '' });
    Alert.alert('Success', 'Chore added successfully!');
  };

  const renderFindRoommates = () => (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
        Potential Roommates
      </Text>
      
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Compatibility Filters</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['Clean', 'Quiet', 'Social', 'Pet-friendly', 'Non-smoker', 'Student', 'Professional'].map(filter => (
            <TouchableOpacity
              key={filter}
              style={{
                backgroundColor: '#f3f4f6',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                marginRight: 8,
                borderWidth: 1,
                borderColor: '#d1d5db'
              }}
            >
              <Text style={{ color: '#6b7280', fontWeight: '600' }}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {roommateProfiles.map((profile, index) => (
        <View key={profile.id || index} style={{
          backgroundColor: 'white',
          marginBottom: 16,
          padding: 16,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#e5e7eb',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16
            }}>
              <Ionicons name="person" size={30} color="#6b7280" />
            </View>
            
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
                  {profile.name}
                </Text>
                {profile.verified && (
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" style={{ marginLeft: 4 }} />
                )}
              </View>
              
              <Text style={{ color: '#6b7280', marginBottom: 8 }}>
                {profile.age} years old • {profile.occupation}
              </Text>
              
              <Text style={{ color: '#4b5563', marginBottom: 8, lineHeight: 18 }}>
                {profile.bio}
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 }}>
                {profile.preferences?.map((pref, idx) => (
                  <View key={idx} style={{
                    backgroundColor: '#dbeafe',
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 10,
                    marginRight: 6,
                    marginBottom: 4
                  }}>
                    <Text style={{ color: '#1e40af', fontSize: 12, fontWeight: '600' }}>
                      {pref}
                    </Text>
                  </View>
                ))}
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="location-outline" size={16} color="#6b7280" />
                <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                  {profile.location}
                </Text>
                <Ionicons name="cash-outline" size={16} color="#6b7280" style={{ marginLeft: 16 }} />
                <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                  ${profile.budget}/month
                </Text>
              </View>
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                  <Ionicons name="star" size={16} color="#f59e0b" />
                  <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                    {profile.rating || '4.8'} ({profile.reviews || '12'} reviews)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', marginTop: 16, gap: 8 }}>
            <TouchableOpacity style={{
              flex: 1,
              backgroundColor: '#3b82f6',
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontWeight: '600' }}>Send Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#d1d5db',
              paddingVertical: 10,
              borderRadius: 8,
              alignItems: 'center'
            }}>
              <Text style={{ color: '#6b7280', fontWeight: '600' }}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderManageLiving = () => (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
        Living Management
      </Text>
      
      {/* House Rules */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Ionicons name="list-outline" size={24} color="#3b82f6" />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>House Rules</Text>
        </View>
        
        <View style={{ marginBottom: 8 }}>
          <Text style={{ color: '#4b5563', marginBottom: 4 }}>• Quiet hours: 10 PM - 8 AM</Text>
          <Text style={{ color: '#4b5563', marginBottom: 4 }}>• Clean up after yourself immediately</Text>
          <Text style={{ color: '#4b5563', marginBottom: 4 }}>• No overnight guests without notice</Text>
          <Text style={{ color: '#4b5563', marginBottom: 4 }}>• Take turns buying shared groceries</Text>
        </View>
        
        <TouchableOpacity style={{
          backgroundColor: '#f3f4f6',
          paddingVertical: 8,
          borderRadius: 6,
          alignItems: 'center'
        }}>
          <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Edit Rules</Text>
        </TouchableOpacity>
      </View>

      {/* Shared Expenses Summary */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Ionicons name="wallet-outline" size={24} color="#059669" />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>Expense Summary</Text>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#059669' }}>$1,245</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Total Shared</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3b82f6' }}>$415</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Your Share</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#f59e0b' }}>$45</Text>
            <Text style={{ color: '#6b7280', fontSize: 12 }}>Outstanding</Text>
          </View>
        </View>
        
        <TouchableOpacity style={{
          backgroundColor: '#3b82f6',
          paddingVertical: 8,
          borderRadius: 6,
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>View All Bills</Text>
        </TouchableOpacity>
      </View>

      {/* Roommate Contacts */}
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Ionicons name="people-outline" size={24} color="#8b5cf6" />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>Roommates</Text>
        </View>
        
        {['Sarah Johnson', 'Mike Chen', 'Alex Rodriguez'].map((name, index) => (
          <View key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            borderBottomWidth: index < 2 ? 1 : 0,
            borderBottomColor: '#f3f4f6'
          }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#e5e7eb',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 12
            }}>
              <Ionicons name="person" size={20} color="#6b7280" />
            </View>
            <Text style={{ flex: 1, fontWeight: '600', color: '#1f2937' }}>{name}</Text>
            <TouchableOpacity>
              <Ionicons name="chatbubble-outline" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderChores = () => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
          Chore Management
        </Text>
        <TouchableOpacity
          onPress={() => {/* Toggle add chore form */}}
          style={{
            backgroundColor: '#10b981',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Ionicons name="add" size={16} color="white" />
          <Text style={{ color: 'white', fontWeight: '600', marginLeft: 4 }}>Add Chore</Text>
        </TouchableOpacity>
      </View>

      {/* Add Chore Form */}
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
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Quick Add Chore</Text>
        
        <TextInput
          placeholder="Chore description"
          value={newChore.title}
          onChangeText={(text) => setNewChore(prev => ({ ...prev, title: text }))}
          style={{
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 8,
            padding: 10,
            marginBottom: 12
          }}
        />
        
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
          <TextInput
            placeholder="Assigned to"
            value={newChore.assignedTo}
            onChangeText={(text) => setNewChore(prev => ({ ...prev, assignedTo: text }))}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 8,
              padding: 10
            }}
          />
          <TextInput
            placeholder="Due date"
            value={newChore.dueDate}
            onChangeText={(text) => setNewChore(prev => ({ ...prev, dueDate: text }))}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: '#d1d5db',
              borderRadius: 8,
              padding: 10
            }}
          />
        </View>
        
        <TouchableOpacity
          onPress={addChore}
          style={{
            backgroundColor: '#10b981',
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>Add Chore</Text>
        </TouchableOpacity>
      </View>

      {/* Chore List */}
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#f59e0b', marginRight: 16 }}>
          Pending: {choreList.filter(c => c.status === 'pending').length}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#10b981' }}>
          Completed: {choreList.filter(c => c.status === 'completed').length}
        </Text>
      </View>

      {choreList.map((chore) => (
        <View key={chore.id} style={{
          backgroundColor: 'white',
          marginBottom: 12,
          padding: 16,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          borderLeftWidth: 4,
          borderLeftColor: chore.status === 'completed' ? '#10b981' : '#f59e0b'
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: 'bold', 
                color: '#1f2937',
                textDecorationLine: chore.status === 'completed' ? 'line-through' : 'none'
              }}>
                {chore.title}
              </Text>
              
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Ionicons name="person-outline" size={14} color="#6b7280" />
                <Text style={{ color: '#6b7280', marginLeft: 4, marginRight: 12 }}>
                  {chore.assignedTo}
                </Text>
                
                {chore.dueDate && (
                  <>
                    <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                    <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                      Due: {chore.dueDate}
                    </Text>
                  </>
                )}
              </View>
              
              {chore.status === 'completed' && chore.completedAt && (
                <Text style={{ color: '#10b981', fontSize: 12, marginTop: 4 }}>
                  Completed: {new Date(chore.completedAt).toLocaleDateString()}
                </Text>
              )}
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <View style={{
                backgroundColor: chore.status === 'completed' ? '#10b981' : '#f59e0b',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12
              }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                  {chore.status.toUpperCase()}
                </Text>
              </View>
              
              {chore.status === 'pending' && (
                <TouchableOpacity
                  onPress={() => markChoreComplete(chore.id)}
                  style={{
                    backgroundColor: '#10b981',
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 6,
                    marginTop: 8
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 11 }}>
                    Mark Done
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'find': return renderFindRoommates();
      case 'manage': return renderManageLiving();
      case 'chores': return renderChores();
      default: return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      {/* Tab Navigation */}
      <View style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 4,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
      }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: activeTab === tab.id ? '#3b82f6' : 'transparent'
            }}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.id ? '#3b82f6' : '#6b7280'} 
            />
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
              marginTop: 4
            }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}