import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { datingProfiles } from '../data/mockData';

export default function DatingModule() {
  const [activeTab, setActiveTab] = useState('discover'); // discover, matches, profile
  const [profiles] = useState(datingProfiles || []);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [liked, setLiked] = useState([]);

  const tabs = [
    { id: 'discover', label: 'Discover', icon: 'search-outline' },
    { id: 'matches', label: 'Matches', icon: 'heart-outline' },
    { id: 'profile', label: 'My Profile', icon: 'person-outline' }
  ];

  const currentProfile = profiles[currentProfileIndex];

  const handleLike = (profileId) => {
    setLiked(prev => [...prev, profileId]);
    
    // Simulate match logic (in real app, this would check if they liked you back)
    const matchChance = Math.random() > 0.7; // 30% chance of match for demo
    if (matchChance && !matches.find(m => m.id === profileId)) {
      const profile = profiles.find(p => p.id === profileId);
      if (profile) {
        setMatches(prev => [...prev, { ...profile, matchedAt: new Date().toISOString() }]);
        Alert.alert('It\'s a Match!', `You and ${profile.name} liked each other!`);
      }
    }
    
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(prev => prev + 1);
    } else {
      setCurrentProfileIndex(0); // Loop back to start for demo
    }
  };

  const calculateAge = (birthDate) => {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  };

  const getDistance = (userLocation) => {
    // Mock distance calculation
    return `${Math.floor(Math.random() * 10) + 1} km away`;
  };

  const renderDiscoverTab = () => (
    <View style={{ flex: 1 }}>
      {!currentProfile ? (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          margin: 16,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4
        }}>
          <Ionicons name="heart-outline" size={64} color="#e5e7eb" />
          <Text style={{ fontSize: 18, color: '#6b7280', marginTop: 16, textAlign: 'center' }}>
            No more profiles to show
          </Text>
          <Text style={{ color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>
            Check back later for new people in your area
          </Text>
        </View>
      ) : (
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          margin: 16,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          overflow: 'hidden'
        }}>
          {/* Profile Image */}
          <View style={{ height: '60%', backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' }}>
            {currentProfile.image ? (
              <Image 
                source={{ uri: currentProfile.image }} 
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={120} color="#d1d5db" />
            )}
            
            {/* Verification Badge */}
            {currentProfile.verified && (
              <View style={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: '#10b981',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', marginLeft: 4 }}>
                  Verified
                </Text>
              </View>
            )}

            {/* Distance */}
            <View style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              backgroundColor: 'rgba(0,0,0,0.7)',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12
            }}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
                {getDistance(currentProfile.location)}
              </Text>
            </View>
          </View>

          {/* Profile Info */}
          <View style={{ flex: 1, padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1f2937' }}>
                {currentProfile.name}
              </Text>
              <Text style={{ fontSize: 24, color: '#6b7280', marginLeft: 8 }}>
                {calculateAge(currentProfile.birthDate)}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="briefcase-outline" size={16} color="#6b7280" />
              <Text style={{ color: '#6b7280', marginLeft: 4 }}>
                {currentProfile.occupation}
              </Text>
            </View>

            <Text style={{ color: '#4b5563', lineHeight: 20, marginBottom: 16 }}>
              {currentProfile.bio}
            </Text>

            {/* Interests */}
            {currentProfile.interests && currentProfile.interests.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1f2937' }}>
                  Interests
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {currentProfile.interests.map((interest, idx) => (
                    <View key={idx} style={{
                      backgroundColor: '#e0e7ff',
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      borderRadius: 16,
                      marginRight: 8,
                      marginBottom: 8
                    }}>
                      <Text style={{ color: '#3730a3', fontSize: 14, fontWeight: '600' }}>
                        {interest}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 'auto' }}>
              <TouchableOpacity
                onPress={handlePass}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#fee2e2',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <Ionicons name="close" size={28} color="#dc2626" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleLike(currentProfile.id)}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#dcfce7',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2
                }}
              >
                <Ionicons name="heart" size={32} color="#16a34a" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderMatchesTab = () => (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
        Your Matches
      </Text>

      {matches.length === 0 ? (
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
          <Ionicons name="heart-outline" size={48} color="#e5e7eb" />
          <Text style={{ color: '#6b7280', marginTop: 16, textAlign: 'center', fontSize: 16 }}>
            No matches yet
          </Text>
          <Text style={{ color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>
            Start liking profiles to find your matches!
          </Text>
        </View>
      ) : (
        <View>
          {matches.map((match) => (
            <View key={match.id} style={{
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#f3f4f6',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 16
                }}>
                  {match.image ? (
                    <Image 
                      source={{ uri: match.image }} 
                      style={{ width: 60, height: 60, borderRadius: 30 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name="person" size={30} color="#6b7280" />
                  )}
                </View>
                
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
                      {match.name}
                    </Text>
                    {match.verified && (
                      <Ionicons name="checkmark-circle" size={16} color="#10b981" style={{ marginLeft: 4 }} />
                    )}
                  </View>
                  
                  <Text style={{ color: '#6b7280', marginBottom: 4 }}>
                    {calculateAge(match.birthDate)} • {match.occupation}
                  </Text>
                  
                  <Text style={{ color: '#10b981', fontSize: 12 }}>
                    Matched {new Date(match.matchedAt).toLocaleDateString()}
                  </Text>
                </View>
                
                <TouchableOpacity style={{
                  backgroundColor: '#e0e7ff',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 8
                }}>
                  <Text style={{ color: '#3730a3', fontWeight: '600' }}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Safety Tips */}
      <View style={{
        backgroundColor: '#fffbeb',
        borderColor: '#fed7aa',
        borderWidth: 1,
        padding: 16,
        borderRadius: 12,
        marginTop: 16
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="shield-checkmark" size={20} color="#d97706" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#d97706', marginLeft: 8 }}>
            Safety First
          </Text>
        </View>
        <Text style={{ color: '#92400e', lineHeight: 18 }}>
          • Always meet in public places for first dates{'\n'}
          • Tell a friend where you're going{'\n'}
          • All profiles are verified for your safety{'\n'}
          • Report any suspicious behavior
        </Text>
      </View>
    </ScrollView>
  );

  const renderProfileTab = () => (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
        My Profile
      </Text>

      {/* Profile Card */}
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
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#f3f4f6',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 12
          }}>
            <Ionicons name="person" size={50} color="#6b7280" />
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
              John Doe
            </Text>
            <Ionicons name="checkmark-circle" size={18} color="#10b981" style={{ marginLeft: 6 }} />
          </View>
          
          <Text style={{ color: '#6b7280', marginBottom: 8 }}>
            28 • Software Engineer
          </Text>
          
          <TouchableOpacity style={{
            backgroundColor: '#3b82f6',
            paddingHorizontal: 16,
            paddingVertical: 6,
            borderRadius: 16
          }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>Edit Photos</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1f2937' }}>
          About Me
        </Text>
        <Text style={{ color: '#4b5563', marginBottom: 16, lineHeight: 20 }}>
          Love hiking, coffee, and exploring new places in the city. Looking for someone who shares similar interests and values good conversation.
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <TouchableOpacity style={{
            flex: 1,
            backgroundColor: '#f3f4f6',
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center'
          }}>
            <Text style={{ color: '#6b7280', fontWeight: '600' }}>Edit Bio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{
            flex: 1,
            backgroundColor: '#f3f4f6',
            paddingVertical: 10,
            borderRadius: 8,
            alignItems: 'center'
          }}>
            <Text style={{ color: '#6b7280', fontWeight: '600' }}>Interests</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Settings */}
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
          Dating Preferences
        </Text>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            AGE RANGE
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#1f2937' }}>22 - 35 years</Text>
            <TouchableOpacity>
              <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            DISTANCE
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#1f2937' }}>Within 10 km</Text>
            <TouchableOpacity>
              <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 }}>
            SHOW ME
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: '#1f2937' }}>Women</Text>
            <TouchableOpacity>
              <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Verification Status */}
      <View style={{
        backgroundColor: '#ecfdf5',
        borderColor: '#a7f3d0',
        borderWidth: 1,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#059669', marginLeft: 8 }}>
            Verified Profile
          </Text>
        </View>
        <Text style={{ color: '#065f46', lineHeight: 18 }}>
          Your identity has been verified. This helps build trust and safety in our community.
        </Text>
      </View>

      {/* Privacy & Safety */}
      <View style={{
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
      }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#1f2937' }}>
          Privacy & Safety
        </Text>

        {['Block Contacts', 'Report User', 'Privacy Settings', 'Delete Account'].map((option, index) => (
          <TouchableOpacity key={index} style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
            borderBottomWidth: index < 3 ? 1 : 0,
            borderBottomColor: '#f3f4f6'
          }}>
            <Text style={{ color: index === 3 ? '#dc2626' : '#1f2937', fontWeight: '500' }}>
              {option}
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#6b7280" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'discover': return renderDiscoverTab();
      case 'matches': return renderMatchesTab();
      case 'profile': return renderProfileTab();
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
              borderBottomColor: activeTab === tab.id ? '#e11d48' : 'transparent'
            }}
          >
            <Ionicons 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.id ? '#e11d48' : '#6b7280'} 
            />
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: activeTab === tab.id ? '#e11d48' : '#6b7280',
              marginTop: 4
            }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderTabContent()}
    </View>
  );
}