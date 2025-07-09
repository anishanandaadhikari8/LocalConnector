import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Divider, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const faqs = [
  { q: 'How do I join a connector?', a: 'Go to the Connectors tab, select a connector, and tap Join.' },
  { q: 'How do I create a post?', a: 'Tap the + button on the Home screen or in a connector to create a post.' },
  { q: 'How do I edit my profile?', a: 'Go to your Profile and tap Edit Profile.' },
  { q: 'How do I report inappropriate content?', a: 'Tap the three dots on a post and select Report.' },
  { q: 'How do I contact support?', a: 'Use the Contact Support option in Settings or Help.' },
];

const HelpFAQScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Help & FAQ</Text>
        <Divider style={styles.divider} />
        <List.Section>
          {faqs.map((faq, idx) => (
            <View key={idx}>
              <List.Accordion
                title={faq.q}
                titleStyle={{ color: theme.colors.onSurface }}
                style={styles.accordion}
              >
                <Text style={[styles.answer, { color: theme.colors.onSurfaceVariant }]}>{faq.a}</Text>
              </List.Accordion>
              <Divider style={styles.divider} />
            </View>
          ))}
        </List.Section>
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
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 8,
  },
  accordion: {
    backgroundColor: 'transparent',
  },
  answer: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default HelpFAQScreen; 