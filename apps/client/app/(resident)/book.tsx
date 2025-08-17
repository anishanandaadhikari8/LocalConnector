import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { format, parseISO, addDays } from 'date-fns';

// Mock data - in real app this would come from API
const mockAmenities = [
  {
    id: 'amenity_oakwood_gym',
    name: 'Fitness Center',
    kind: 'GENERAL',
    capacity: 15,
    slot_mins: 60,
    requires_approval: false,
    hours: '6:00 AM - 10:00 PM',
  },
  {
    id: 'amenity_oakwood_pool',
    name: 'Swimming Pool',
    kind: 'GENERAL',
    capacity: 25,
    slot_mins: 90,
    requires_approval: false,
    hours: '7:00 AM - 9:00 PM',
  },
  {
    id: 'amenity_oakwood_community_room',
    name: 'Community Room',
    kind: 'GENERAL',
    capacity: 50,
    slot_mins: 120,
    requires_approval: true,
    hours: '9:00 AM - 10:00 PM',
  },
];

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];

export default function BookAmenityScreen() {
  const [selectedAmenity, setSelectedAmenity] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedEndTime, setSelectedEndTime] = useState<string>('');
  const [purpose, setPurpose] = useState('');

  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  const getEndTimeSlots = (startTime: string) => {
    if (!selectedAmenity) return [];
    
    const startIndex = timeSlots.indexOf(startTime);
    if (startIndex === -1) return [];
    
    const slotDuration = selectedAmenity.slot_mins / 30; // Convert to 30-min intervals
    const endIndex = Math.min(startIndex + slotDuration, timeSlots.length);
    
    return timeSlots.slice(startIndex + 1, endIndex + 1);
  };

  const handleSubmit = () => {
    if (!selectedAmenity || !selectedStartTime || !selectedEndTime) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // In real app, this would call the API
    Alert.alert(
      'Booking Submitted',
      `Your booking request for ${selectedAmenity.name} has been submitted successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setSelectedAmenity(null);
            setSelectedDate(new Date());
            setSelectedStartTime('');
            setSelectedEndTime('');
            setPurpose('');
          },
        },
      ]
    );
  };

  const isDateSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  };

  const isTimeSelected = (time: string) => {
    return time === selectedStartTime || time === selectedEndTime;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Book Amenity</Text>
          <Text style={styles.subtitle}>Select an amenity and time slot</Text>
        </View>

        {/* Step 1: Select Amenity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Choose Amenity</Text>
          <View style={styles.amenitiesContainer}>
            {mockAmenities.map((amenity) => (
              <TouchableOpacity
                key={amenity.id}
                style={[
                  styles.amenityCard,
                  selectedAmenity?.id === amenity.id && styles.amenityCardSelected
                ]}
                onPress={() => setSelectedAmenity(amenity)}
              >
                <View style={styles.amenityHeader}>
                  <Text style={styles.amenityName}>{amenity.name}</Text>
                  <View style={styles.amenityBadge}>
                    <Text style={styles.amenityBadgeText}>{amenity.kind}</Text>
                  </View>
                </View>
                <View style={styles.amenityDetails}>
                  <Text style={styles.amenityDetail}>Capacity: {amenity.capacity} people</Text>
                  <Text style={styles.amenityDetail}>Duration: {amenity.slot_mins} minutes</Text>
                  <Text style={styles.amenityDetail}>Hours: {amenity.hours}</Text>
                  {amenity.requires_approval && (
                    <Text style={styles.approvalRequired}>Approval required</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Step 2: Select Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Choose Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesContainer}>
            {getAvailableDates().map((date) => (
              <TouchableOpacity
                key={date.toISOString()}
                style={[
                  styles.dateCard,
                  isDateSelected(date) && styles.dateCardSelected
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[
                  styles.dateDay,
                  isDateSelected(date) && styles.dateDaySelected
                ]}>
                  {format(date, 'EEE')}
                </Text>
                <Text style={[
                  styles.dateNumber,
                  isDateSelected(date) && styles.dateNumberSelected
                ]}>
                  {format(date, 'd')}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Step 3: Select Time */}
        {selectedAmenity && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Choose Time</Text>
            <View style={styles.timeContainer}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeColumnTitle}>Start Time</Text>
                <ScrollView style={styles.timeSlotsContainer}>
                  {timeSlots.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        selectedStartTime === time && styles.timeSlotSelected
                      ]}
                      onPress={() => {
                        setSelectedStartTime(time);
                        setSelectedEndTime(''); // Reset end time when start changes
                      }}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedStartTime === time && styles.timeSlotTextSelected
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.timeColumn}>
                <Text style={styles.timeColumnTitle}>End Time</Text>
                <ScrollView style={styles.timeSlotsContainer}>
                  {getEndTimeSlots(selectedStartTime).map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        selectedEndTime === time && styles.timeSlotSelected
                      ]}
                      onPress={() => setSelectedEndTime(time)}
                    >
                      <Text style={[
                        styles.timeSlotText,
                        selectedEndTime === time && styles.timeSlotTextSelected
                      ]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        )}

        {/* Step 4: Purpose */}
        {selectedAmenity && selectedStartTime && selectedEndTime && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. Purpose (Optional)</Text>
            <TextInput
              style={styles.purposeInput}
              placeholder="What will you be using this for?"
              value={purpose}
              onChangeText={setPurpose}
              multiline
              numberOfLines={3}
            />
          </View>
        )}

        {/* Submit Button */}
        {selectedAmenity && selectedStartTime && selectedEndTime && (
          <View style={styles.submitSection}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Booking Request</Text>
            </TouchableOpacity>
            
            {/* Booking Summary */}
            <View style={styles.bookingSummary}>
              <Text style={styles.summaryTitle}>Booking Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Amenity:</Text>
                <Text style={styles.summaryValue}>{selectedAmenity.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date:</Text>
                <Text style={styles.summaryValue}>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Time:</Text>
                <Text style={styles.summaryValue}>{selectedStartTime} - {selectedEndTime}</Text>
              </View>
              {purpose && (
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Purpose:</Text>
                  <Text style={styles.summaryValue}>{purpose}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111318',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111318',
    marginBottom: 16,
  },
  amenitiesContainer: {
    gap: 16,
  },
  amenityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  amenityCardSelected: {
    borderColor: '#6C8CFF',
    borderWidth: 2,
    backgroundColor: '#F0F4FF',
  },
  amenityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amenityName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111318',
  },
  amenityBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  amenityBadgeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  amenityDetails: {
    gap: 4,
  },
  amenityDetail: {
    fontSize: 14,
    color: '#6B7280',
  },
  approvalRequired: {
    fontSize: 14,
    color: '#FFC857',
    fontWeight: '600',
    marginTop: 4,
  },
  datesContainer: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  dateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateCardSelected: {
    backgroundColor: '#6C8CFF',
  },
  dateDay: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateDaySelected: {
    color: '#FFFFFF',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111318',
  },
  dateNumberSelected: {
    color: '#FFFFFF',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  timeColumn: {
    flex: 1,
  },
  timeColumnTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111318',
    marginBottom: 12,
    textAlign: 'center',
  },
  timeSlotsContainer: {
    maxHeight: 200,
  },
  timeSlot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeSlotSelected: {
    backgroundColor: '#6C8CFF',
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
  },
  timeSlotTextSelected: {
    color: '#FFFFFF',
  },
  purposeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111318',
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  submitSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  submitButton: {
    backgroundColor: '#6C8CFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#6C8CFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  bookingSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111318',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    flex: 1,
  },
  summaryValue: {
    fontSize: 14,
    color: '#111318',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
});
