import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const onboardingSteps = [
  {
    id: 1,
    title: 'Welcome to NeighborConnect',
    subtitle: 'Connect with your neighborhood',
    description: 'Join connectors to meet people with similar interests, share experiences, and build a stronger community.',
    icon: '🏠',
  },
  {
    id: 2,
    title: 'Discover Connectors',
    subtitle: 'Find your perfect match',
    description: 'Browse different types of connectors - from roommates to fitness buddies, dating to business networking.',
    icon: '🔍',
  },
  {
    id: 3,
    title: 'Share & Connect',
    subtitle: 'Engage with your community',
    description: 'Create posts, join discussions, and stay updated with what\'s happening in your neighborhood.',
    icon: '💬',
  },
  {
    id: 4,
    title: 'Stay Safe & Verified',
    subtitle: 'Your privacy matters',
    description: 'All connectors are moderated, and verified users get special badges. Your safety is our priority.',
    icon: '🛡️',
  },
];

const OnboardingTutorialScreen = ({ navigation }) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const handleSkip = () => {
    navigation.replace('MainTabs');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={[styles.icon, { color: theme.colors.primary }]}>{currentStepData.icon}</Text>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>{currentStepData.title}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>{currentStepData.subtitle}</Text>
          <Text style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>{currentStepData.description}</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.indicators}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentStep ? theme.colors.primary : theme.colors.surfaceVariant,
                  },
                ]}
              />
            ))}
          </View>
          
          <View style={styles.buttons}>
            <Button
              mode="text"
              onPress={handleSkip}
              textColor={theme.colors.onSurfaceVariant}
              style={styles.skipButton}
            >
              Skip
            </Button>
            <Button
              mode="contained"
              onPress={handleNext}
              style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
              textColor={theme.colors.onPrimary}
            >
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
    marginLeft: 16,
  },
});

export default OnboardingTutorialScreen; 