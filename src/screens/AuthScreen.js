import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button, Card, Divider, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../providers/AuthProvider';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const theme = useTheme();
  const { signIn, signUp, authError, clearError } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp) {
      if (!name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    clearError();

    try {
      let result;
      if (isSignUp) {
        result = await signUp(name.trim(), email.trim(), password);
      } else {
        result = await signIn(email.trim(), password);
      }

      if (!result.success) {
        Alert.alert('Authentication Error', result.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    clearError();

    try {
      const result = await signIn('john.doe@email.com', 'password');
      if (!result.success) {
        Alert.alert('Demo Login Error', result.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setErrors({});
    clearError();
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons 
            name="home-group" 
            size={60} 
            color={theme.colors.primary} 
          />
          <Text style={[styles.appName, { color: theme.colors.onBackground }]}>
            NeighborConnect
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Text>
        </View>

        <Card style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content style={styles.formContent}>
            {isSignUp && (
              <View>
                <TextInput
                  label="Full Name"
                  value={name}
                  onChangeText={setName}
                  mode="outlined"
                  style={styles.input}
                  left={<TextInput.Icon icon="account" />}
                  error={!!errors.name}
                />
                <HelperText type="error" visible={!!errors.name}>
                  {errors.name}
                </HelperText>
              </View>
            )}

            <View>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
                error={!!errors.email}
              />
              <HelperText type="error" visible={!!errors.email}>
                {errors.email}
              </HelperText>
            </View>

            <View>
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                error={!!errors.password}
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>
            </View>

            {isSignUp && (
              <View>
                <TextInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  mode="outlined"
                  secureTextEntry
                  style={styles.input}
                  left={<TextInput.Icon icon="lock-check" />}
                  error={!!errors.confirmPassword}
                />
                <HelperText type="error" visible={!!errors.confirmPassword}>
                  {errors.confirmPassword}
                </HelperText>
              </View>
            )}

            <Button
              mode="contained"
              onPress={handleAuth}
              style={styles.authButton}
              contentStyle={styles.authButtonContent}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            {!isSignUp && (
              <>
                <Button
                  mode="outlined"
                  onPress={handleDemoLogin}
                  style={styles.demoButton}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Try Demo Account
                </Button>

                <Button
                  mode="text"
                  onPress={() => Alert.alert('Coming Soon', 'Password reset functionality will be available soon!')}
                  style={styles.forgotButton}
                >
                  Forgot Password?
                </Button>
              </>
            )}

            <Divider style={styles.divider} />

            <Button
              mode="outlined"
              onPress={() => Alert.alert('Coming Soon', 'Google authentication will be available soon!')}
              style={styles.socialButton}
              icon="google"
            >
              Continue with Google
            </Button>

            <Button
              mode="outlined"
              onPress={() => Alert.alert('Coming Soon', 'Apple authentication will be available soon!')}
              style={styles.socialButton}
              icon="apple"
            >
              Continue with Apple
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <Button
            mode="text"
            onPress={toggleMode}
            style={styles.toggleButton}
            disabled={isSubmitting}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  formCard: {
    marginBottom: 20,
    elevation: 4,
  },
  formContent: {
    paddingVertical: 20,
  },
  input: {
    marginBottom: 8,
  },
  authButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  authButtonContent: {
    paddingVertical: 8,
  },
  demoButton: {
    marginBottom: 16,
  },
  forgotButton: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 20,
  },
  socialButton: {
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    marginBottom: 8,
  },
  toggleButton: {
    marginTop: 4,
  },
});

export default AuthScreen; 