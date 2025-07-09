import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';

export default function EventsModule({ events: initialEvents = [] }) {
  const [events, setEvents] = useState(initialEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
  });

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.location) return;
    setEvents([
      {
        eventId: Date.now(),
        name: newEvent.name,
        description: newEvent.description,
        date: newEvent.date,
        location: newEvent.location,
        maxAttendees: parseInt(newEvent.maxAttendees) || 0,
        attendees: [],
        createdBy: 'Current User',
      },
      ...events,
    ]);
    setNewEvent({ name: '', description: '', date: '', location: '', maxAttendees: '' });
    setShowCreateForm(false);
  };

  const handleRSVP = (eventId) => {
    setEvents(events.map(event =>
      event.eventId === eventId
        ? {
            ...event,
            attendees: event.attendees.includes('Current User')
              ? event.attendees.filter(a => a !== 'Current User')
              : [...event.attendees, 'Current User']
          }
        : event
    ));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.eventId !== eventId));
  };

  const isAttending = (event) => event.attendees.includes('Current User');

  return (
    <View style={{ padding: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Events</Text>
        <TouchableOpacity 
          onPress={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#0284c7', borderRadius: 6, padding: 8 }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {showCreateForm ? 'Cancel' : 'Create Event'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Create Event Form */}
      {showCreateForm && (
        <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 6, marginBottom: 12, elevation: 1 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Create New Event</Text>
          <TextInput
            value={newEvent.name}
            onChangeText={text => setNewEvent({ ...newEvent, name: text })}
            placeholder="Event Name"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newEvent.description}
            onChangeText={text => setNewEvent({ ...newEvent, description: text })}
            placeholder="Description"
            multiline
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newEvent.date}
            onChangeText={text => setNewEvent({ ...newEvent, date: text })}
            placeholder="Date (e.g., Dec 25, 2024)"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newEvent.location}
            onChangeText={text => setNewEvent({ ...newEvent, location: text })}
            placeholder="Location"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TextInput
            value={newEvent.maxAttendees}
            onChangeText={text => setNewEvent({ ...newEvent, maxAttendees: text })}
            placeholder="Max Attendees (optional)"
            keyboardType="numeric"
            style={{ backgroundColor: '#f3f4f6', borderRadius: 6, padding: 8, marginBottom: 8 }}
          />
          <TouchableOpacity onPress={handleCreateEvent} style={{ backgroundColor: '#059669', borderRadius: 6, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Create Event</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Events List */}
      <FlatList
        data={events}
        keyExtractor={item => item.eventId.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12, padding: 12, backgroundColor: '#fff', borderRadius: 6, elevation: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>{item.name}</Text>
            <Text style={{ color: '#666', marginBottom: 4 }}>{item.description}</Text>
            <Text style={{ color: '#666', marginBottom: 4 }}>📅 {item.date}</Text>
            <Text style={{ color: '#666', marginBottom: 4 }}>📍 {item.location}</Text>
            <Text style={{ color: '#666', marginBottom: 8 }}>
              👥 {item.attendees.length} attending{item.maxAttendees ? ` / ${item.maxAttendees}` : ''}
            </Text>
            
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <TouchableOpacity 
                onPress={() => handleRSVP(item.eventId)}
                style={{ 
                  backgroundColor: isAttending(item) ? '#dc2626' : '#059669', 
                  borderRadius: 6, 
                  padding: 8, 
                  marginRight: 8 
                }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                  {isAttending(item) ? 'Cancel RSVP' : 'RSVP'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => handleDeleteEvent(item.eventId)}
                style={{ backgroundColor: '#dc2626', borderRadius: 6, padding: 8 }}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
            </View>

            {/* Attendees List */}
            {item.attendees.length > 0 && (
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Attendees:</Text>
                {item.attendees.map((attendee, index) => (
                  <Text key={index} style={{ marginLeft: 8, color: '#555' }}>• {attendee}</Text>
                ))}
              </View>
            )}
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888' }}>No events yet.</Text>}
      />
    </View>
  );
} 