import React from 'react';
import { View, Text } from 'react-native';
import PostsModule from './PostsModule';
import EventsModule from './EventsModule';
import ChatModule from './ChatModule';
import MarketplaceModule from './MarketplaceModule';
import ReviewsModule from './ReviewsModule';
import StoriesModule from './StoriesModule';
import ReelsModule from './ReelsModule';
import BillsModule from './BillsModule';
import SafetyModule from './SafetyModule';
import RoommateModule from './RoommateModule';
import DatingModule from './DatingModule';
import { connectorPosts, events } from '../data/mockData';

export default function ConnectorModuleManager({ modules, connector, userRole = 'member' }) {
  const renderModule = (module) => {
    switch (module) {
      case 'posts':
        return <PostsModule key={module} posts={connectorPosts} connector={connector} />;
      
      case 'events':
        return <EventsModule key={module} events={events} connector={connector} />;
      
      case 'chat':
        return <ChatModule key={module} connector={connector} />;
      
      case 'marketplace':
        return <MarketplaceModule key={module} connector={connector} />;
      
      case 'bills':
        return <BillsModule key={module} connectorType={connector?.type} />;
      
      case 'safety':
        return <SafetyModule key={module} connector={connector} />;
      
      case 'roommate':
        return <RoommateModule key={module} connector={connector} />;
      
      case 'dating':
        return <DatingModule key={module} connector={connector} />;
      
      case 'reviews':
        return <ReviewsModule key={module} connector={connector} />;
      
      case 'stories':
        return <StoriesModule key={module} connector={connector} />;
      
      case 'reels':
        return <ReelsModule key={module} connector={connector} />;
      
      case 'directory':
        return (
          <View key={module} style={{ marginVertical: 12, padding: 16, backgroundColor: '#f0f4f8', borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1f2937' }}>
              Member Directory
            </Text>
            <Text style={{ color: '#666', marginTop: 4 }}>
              View all {connector?.type === 'Apartment' ? 'residents' : 'members'} in this connector.
            </Text>
          </View>
        );
      
      default:
        return (
          <View key={module} style={{ marginVertical: 12, padding: 16, backgroundColor: '#f0f4f8', borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1f2937' }}>
              {module.charAt(0).toUpperCase() + module.slice(1)} Module
            </Text>
            <Text style={{ color: '#666', marginTop: 4 }}>
              This is where the {module} module UI will appear.
            </Text>
          </View>
        );
    }
  };

  // Filter modules based on connector type and user permissions
  const getEnabledModules = () => {
    if (!connector || !modules) return [];
    
    // Admin can see all modules, members see only their permitted ones
    if (userRole === 'admin') {
      return modules;
    }
    
    // Some modules might be admin-only for certain connector types
    const adminOnlyModules = [];
    if (connector.type === 'Apartment') {
      adminOnlyModules.push('announcements', 'alerts');
    }
    
    return modules.filter(module => !adminOnlyModules.includes(module));
  };

  const enabledModules = getEnabledModules();

  return (
    <View style={{ flex: 1 }}>
      {/* Connector Type Specific Header */}
      <View style={{ 
        padding: 16, 
        backgroundColor: getConnectorHeaderColor(connector?.type),
        marginBottom: 8
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: 'white',
          textAlign: 'center'
        }}>
          {getConnectorDisplayName(connector?.type)}
        </Text>
        {connector?.description && (
          <Text style={{ 
            color: 'rgba(255,255,255,0.9)', 
            textAlign: 'center',
            marginTop: 4
          }}>
            {connector.description}
          </Text>
        )}
      </View>

      {/* Render Modules */}
      {enabledModules.map((module) => renderModule(module))}
      
      {enabledModules.length === 0 && (
        <View style={{ 
          padding: 32, 
          alignItems: 'center',
          backgroundColor: 'white',
          margin: 16,
          borderRadius: 12
        }}>
          <Text style={{ fontSize: 18, color: '#6b7280', textAlign: 'center' }}>
            No modules enabled for this connector
          </Text>
          <Text style={{ color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>
            Contact your admin to enable modules
          </Text>
        </View>
      )}
    </View>
  );
}

// Helper functions for connector-specific styling
const getConnectorHeaderColor = (type) => {
  switch (type) {
    case 'Apartment': return '#059669';
    case 'Marketplace': return '#dc2626';
    case 'Safety': return '#2563eb';
    case 'Event': return '#7c3aed';
    case 'Roommate': return '#ea580c';
    case 'Dating': return '#e11d48';
    default: return '#6b7280';
  }
};

const getConnectorDisplayName = (type) => {
  switch (type) {
    case 'Apartment': return 'Building Community';
    case 'Marketplace': return 'Local Marketplace';
    case 'Safety': return 'Neighborhood Watch';
    case 'Event': return 'Event Organizing';
    case 'Roommate': return 'Roommate Hub';
    case 'Dating': return 'Verified Dating';
    default: return type || 'Community';
  }
}; 