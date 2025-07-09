import React from 'react';
import { View, Text } from 'react-native';
import PostsModule from './PostsModule';
import EventsModule from './EventsModule';
import ChatModule from './ChatModule';
import MarketplaceModule from './MarketplaceModule';
import ReviewsModule from './ReviewsModule';
import StoriesModule from './StoriesModule';
import ReelsModule from './ReelsModule';
import { connectorPosts, events } from '../data/mockData'; // adjust as needed for real data

export default function ConnectorModuleManager({ modules }) {
  return (
    <View style={{ flex: 1 }}>
      {modules.map((module, idx) => {
        switch (module) {
          case 'posts':
            return <PostsModule key={module} posts={posts} />;
          case 'events':
            return <EventsModule key={module} events={events} />;
          case 'chat':
            return <ChatModule key={module} />;
          case 'marketplace':
            return <MarketplaceModule key={module} />;
          case 'reviews':
            return <ReviewsModule key={module} />;
          case 'stories':
            return <StoriesModule key={module} />;
          case 'reels':
            return <ReelsModule key={module} />;
          default:
            return (
              <View key={module} style={{ marginVertical: 12, padding: 16, backgroundColor: '#f0f4f8', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {module.charAt(0).toUpperCase() + module.slice(1)} Module Placeholder
                </Text>
                <Text style={{ color: '#666', marginTop: 4 }}>
                  This is where the {module} module UI will appear.
                </Text>
              </View>
            );
        }
      })}
    </View>
  );
} 