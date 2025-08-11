import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AmenitiesScreen from '../screens/AmenitiesScreen';
import IncidentsScreen from '../screens/IncidentsScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import BookingsScreen from '../screens/BookingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Amenities: undefined;
  Incidents: undefined;
  Announcements: undefined;
  Directory: undefined;
  Bookings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNav: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Amenities" component={AmenitiesScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="Incidents" component={IncidentsScreen} />
        <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
        <Stack.Screen name="Directory" component={DirectoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;


