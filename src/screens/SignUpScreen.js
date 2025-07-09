import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { 
  Text, 
  TextInput, 
  Button, 
  useTheme,
  HelperText,
  Checkbox
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUpScreen = ({ navigation }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    neighborhood: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Neighborhood is required';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Mock registration
      console.log('Signing up with:', formData);
      
      // Navigate to main app
      navigation.replace('MainTabs');
    }
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backButton, { color: theme.colors.primary }]}>
              ← Back to Sign In
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.onSurface }]}>
            Create Account
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.onSurfaceVariant }]}>
            Join your neighborhood community
          </Text>
        </View>

        {/* Sign Up Form */}
        <View style={styles.form}>
          {/* Name Fields */}
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <TextInput
                label="First Name"
                value={formData.firstName}
                onChangeText={(value) => updateFormData('firstName', value)}
                style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
                textColor={theme.colors.onSurface}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                error={!!errors.firstName}
              />
              <HelperText type="error" visible={!!errors.firstName}>
                {errors.firstName}
              </HelperText>
            </View>
            <View style={styles.nameField}>
              <TextInput
                label="Last Name"
                value={formData.lastName}
                onChangeText={(value) => updateFormData('lastName', value)}
                style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
                textColor={theme.colors.onSurface}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                error={!!errors.lastName}
              />
              <HelperText type="error" visible={!!errors.lastName}>
                {errors.lastName}
              </HelperText>
            </View>
          </View>

          {/* Email */}
          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
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

          {/* Password */}
          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
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

          {/* Confirm Password */}
          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => updateFormData('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                iconColor={theme.colors.onSurfaceVariant}
              />
            }
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            error={!!errors.confirmPassword}
          />
          <HelperText type="error" visible={!!errors.confirmPassword}>
            {errors.confirmPassword}
          </HelperText>

          {/* Neighborhood */}
          <TextInput
            label="Neighborhood"
            value={formData.neighborhood}
            onChangeText={(value) => updateFormData('neighborhood', value)}
            placeholder="e.g., Downtown, Oak Street"
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
            error={!!errors.neighborhood}
          />
          <HelperText type="error" visible={!!errors.neighborhood}>
            {errors.neighborhood}
          </HelperText>

          {/* Phone (Optional) */}
          <TextInput
            label="Phone Number (Optional)"
            value={formData.phone}
            onChangeText={(value) => updateFormData('phone', value)}
            keyboardType="phone-pad"
            style={[styles.input, { backgroundColor: theme.colors.surfaceVariant }]}
            textColor={theme.colors.onSurface}
            placeholderTextColor={theme.colors.onSurfaceVariant}
          />

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Checkbox
              status={agreeToTerms ? 'checked' : 'unchecked'}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              color={theme.colors.primary}
            />
            <View style={styles.termsText}>
              <Text style={[styles.termsText, { color: theme.colors.onSurfaceVariant }]}>
                I agree to the{' '}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.termsLink, { color: theme.colors.primary }]}>
                  Terms of Service
                </Text>
              </TouchableOpacity>
              <Text style={[styles.termsText, { color: theme.colors.onSurfaceVariant }]}>
                {' '}and{' '}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.termsLink, { color: theme.colors.primary }]}>
                  Privacy Policy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <HelperText type="error" visible={!!errors.terms}>
            {errors.terms}
          </HelperText>

          <Button
            mode="contained"
            onPress={handleSignUp}
            style={[styles.signUpButton, { backgroundColor: theme.colors.primary }]}
            textColor={theme.colors.onPrimary}
            contentStyle={styles.buttonContent}
          >
            Create Account
          </Button>
        </View>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={[styles.signInLink, { color: theme.colors.primary }]}>
              Sign In
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  input: {
    marginBottom: 8,
    borderRadius: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  termsText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  signUpButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  signInLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen; 