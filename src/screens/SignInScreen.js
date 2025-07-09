import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  useTheme,
  HelperText
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = ({ navigation }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      // Mock authentication - any email/password works
      console.log('Signing in with:', email, password);
      
      // Navigate to main app
      navigation.replace('MainTabs');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* Logo and Header */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.logoText, { color: theme.colors.onPrimary }]}>
              NC
            </Text>
          </View>
          <Text style={[styles.appName, { color: theme.colors.onSurface }]}>
            NeighborConnect
          </Text>
          <Text style={[styles.tagline, { color: theme.colors.onSurfaceVariant }]}>
            Connect with your neighborhood
          </Text>
        </View>

        {/* Sign In Form */}
        <View style={styles.form}>
          <Text style={[styles.formTitle, { color: theme.colors.onSurface }]}>
            Welcome Back
          </Text>
          <Text style={[styles.formSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Sign in to your account
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
                iconColor={theme.colors.onSurfaceVariant}
              />
            }
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            error={!!errors.password}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>

          <Button
            mode="contained"
            onPress={handleSignIn}
            style={[styles.signInButton, { backgroundColor: theme.colors.primary }]}
            textColor={theme.colors.onPrimary}
            contentStyle={styles.buttonContent}
          >
            Sign In
          </Button>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: theme.colors.primary }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[styles.signUpLink, { color: theme.colors.primary }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Demo Credentials */}
        <View style={[styles.demoSection, { backgroundColor: theme.colors.surfaceVariant }]}>
          <Text style={[styles.demoTitle, { color: theme.colors.onSurface }]}>
            Demo Credentials
          </Text>
          <Text style={[styles.demoText, { color: theme.colors.onSurfaceVariant }]}>
            Email: demo@example.com{'\n'}
            Password: password123
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
    borderRadius: 8,
  },
  signInButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  footerText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  demoSection: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SignInScreen; 