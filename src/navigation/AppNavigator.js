import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CommunitiesScreen from '../screens/CommunitiesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CommunityDetailsScreen from '../screens/CommunityDetailsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import CreateCommunityScreen from '../screens/CreateCommunityScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AuthScreen from '../screens/AuthScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import DirectMessagesScreen from '../screens/DirectMessagesScreen';
import ConnectorRequestsScreen from '../screens/ConnectorRequestsScreen';
import MembersListScreen from '../screens/MembersListScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HelpFAQScreen from '../screens/HelpFAQScreen';
import OnboardingTutorialScreen from '../screens/OnboardingTutorialScreen';
import AdminModerationScreen from '../screens/AdminModerationScreen';
import CirclesHomeScreen from '../screens/CirclesHomeScreen';
import CircleCreateWizard from '../screens/CircleCreateWizard';
import CircleAdminScreen from '../screens/CircleAdminScreen';
import TaskBoardListScreen from '../screens/TaskBoardListScreen';
import TaskPostComposer from '../screens/TaskPostComposer';
import TaskPostDetailScreen from '../screens/TaskPostDetailScreen';
import OrdersMenuScreen from '../screens/OrdersMenuScreen';
import OrderCartScreen from '../screens/OrderCartScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import AnalyticsDashboardScreen from '../screens/AnalyticsDashboardScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Professional tab configuration
const TabNavigator = () => {
  const theme = useTheme();

  const getTabBarIcon = (route, focused, color, size) => {
    let iconName;

    switch (route.name) {
      case 'Home':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'Connectors':
        iconName = focused ? 'account-group' : 'account-group-outline';
        break;
      case 'Notifications':
        iconName = focused ? 'bell' : 'bell-outline';
        break;
      case 'Messages':
        iconName = focused ? 'message' : 'message-outline';
        break;
      case 'Profile':
        iconName = focused ? 'account-circle' : 'account-circle-outline';
        break;
      default:
        iconName = 'circle';
    }

    return (
      <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
        <MaterialCommunityIcons 
          name={iconName} 
          size={theme.components?.navigation?.iconSize || 24} 
          color={color} 
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => 
          getTabBarIcon(route, focused, color, size),
        
        // Professional styling
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        
        // Clean tab bar styling
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: theme.colors.outline,
          height: theme.components?.navigation?.height || 56,
          paddingBottom: 6,
          paddingTop: 6,
          elevation: 8,
          boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
        },
        
        // Professional label styling
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          letterSpacing: 0.1,
          marginTop: 2,
        },
        
        // Remove default padding
        tabBarItemStyle: {
          paddingTop: 4,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Connectors" 
        component={CommunitiesScreen}
        options={{
          tabBarLabel: 'Connectors',
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarBadge: 3, // Example notification count
          tabBarBadgeStyle: {
            backgroundColor: theme.colors.error,
            color: theme.colors.onError,
            fontSize: 10,
            fontWeight: '600',
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            marginLeft: -4,
            marginTop: 2,
          },
        }}
      />
      <Tab.Screen 
        name="Messages" 
        component={DirectMessagesScreen}
        options={{
          tabBarLabel: 'Messages',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator with professional headers
const AppNavigator = () => {
  const theme = useTheme();

  const defaultHeaderOptions = {
    headerStyle: {
      backgroundColor: theme.colors.surface,
      elevation: 2,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.onSurface,
    },
    headerTintColor: theme.colors.onSurface,
    headerBackTitleVisible: false,
    headerLeftContainerStyle: {
      paddingLeft: 8,
    },
    headerRightContainerStyle: {
      paddingRight: 16,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={defaultHeaderOptions}
        initialRouteName="Main"
      >
        {/* Auth Screens */}
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="SignIn" 
          component={SignInScreen}
          options={{ 
            title: 'Sign In',
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
          options={{ 
            title: 'Create Account',
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingTutorialScreen}
          options={{ headerShown: false }}
        />

        {/* Main Tab Navigator */}
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />

        {/* Modal Screens */}
        <Stack.Screen 
          name="PostDetails" 
          component={PostDetailsScreen}
          options={{ 
            title: 'Post',
            presentation: 'card'
          }}
        />
        <Stack.Screen 
          name="CommunityDetails" 
          component={CommunityDetailsScreen}
          options={{ 
            title: 'Connector Details',
            presentation: 'card'
          }}
        />
        <Stack.Screen 
          name="CreatePost" 
          component={CreatePostScreen}
          options={{ 
            title: 'Create Post',
            presentation: 'modal',
            headerLeft: null,
          }}
        />
        <Stack.Screen 
          name="CreateCommunity" 
          component={CreateCommunityScreen}
          options={{ 
            title: 'Create Connector',
            presentation: 'modal',
            headerLeft: null,
          }}
        />
        <Stack.Screen name="CirclesHome" component={CirclesHomeScreen} options={{ title: 'Circles' }} />
        <Stack.Screen name="CircleCreateWizard" component={CircleCreateWizard} options={{ title: 'Create Circle' }} />
        <Stack.Screen name="CircleAdmin" component={CircleAdminScreen} options={{ title: 'Circle Admin' }} />
        <Stack.Screen name="TaskBoardList" component={TaskBoardListScreen} options={{ title: 'Task Board' }} />
        <Stack.Screen name="TaskPostComposer" component={TaskPostComposer} options={{ title: 'New Task' }} />
        <Stack.Screen name="TaskPostDetail" component={TaskPostDetailScreen} options={{ title: 'Task' }} />
        <Stack.Screen name="OrdersMenu" component={OrdersMenuScreen} options={{ title: 'Menu' }} />
        <Stack.Screen name="OrderCart" component={OrderCartScreen} options={{ title: 'Your Order' }} />
        <Stack.Screen name="Promotions" component={PromotionsScreen} options={{ title: 'Promotions' }} />
        <Stack.Screen name="AnalyticsDashboard" component={AnalyticsDashboardScreen} options={{ title: 'Analytics' }} />

        {/* Utility Screens */}
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{ 
            title: 'Search',
            presentation: 'card'
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ 
            title: 'Settings'
          }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{ 
            title: 'Edit Profile'
          }}
        />
        <Stack.Screen 
          name="ConnectorRequests" 
          component={ConnectorRequestsScreen}
          options={{ 
            title: 'Connector Requests'
          }}
        />
        <Stack.Screen 
          name="MembersList" 
          component={MembersListScreen}
          options={{ 
            title: 'Members'
          }}
        />
        <Stack.Screen 
          name="Explore" 
          component={ExploreScreen}
          options={{ 
            title: 'Explore'
          }}
        />
        <Stack.Screen 
          name="Help" 
          component={HelpFAQScreen}
          options={{ 
            title: 'Help & FAQ'
          }}
        />
        <Stack.Screen 
          name="AdminModeration" 
          component={AdminModerationScreen}
          options={{ 
            title: 'Moderation'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  tabIconActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
});

export default AppNavigator; 