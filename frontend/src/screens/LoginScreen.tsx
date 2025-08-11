import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Button, Input, Text } from '../ui/components';
import { useToast } from '../ui/components/Toast';
import { useAuth } from '../lib/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { signInDev } = useAuth();
  const { show } = useToast();
  const [name, setName] = useState('Anish');
  const [unit, setUnit] = useState('12B');
  const [role, setRole] = useState<'RESIDENT' | 'ADMIN' | 'SECURITY'>('ADMIN');
  const [userId, setUserId] = useState(101);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await signInDev({ userId, name, role, unit });
      navigation.replace('Home');
    } catch (err) {
      const anyErr = err as any;
      const message = anyErr?.data?.message || anyErr?.message || 'Sign-in failed. Please try again.';
      show(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="h1">LocalConnector</Text>
      <View style={{ height: spacing.lg }} />
      <Input placeholder="Name" value={name} onChangeText={setName} />
      <View style={{ height: spacing.sm }} />
      <Input placeholder="Unit" value={unit} onChangeText={setUnit} />
      <View style={{ height: spacing.sm }} />
      <Input placeholder="User ID" value={String(userId)} onChangeText={(t) => setUserId(Number(t || 0))} keyboardType="numeric" />
      <View style={{ height: spacing.sm }} />
      <Input
        placeholder="Role (RESIDENT/ADMIN/SECURITY)"
        value={role}
        onChangeText={(t) => {
          const upper = (t || '').toUpperCase();
          if (upper === 'RESIDENT' || upper === 'ADMIN' || upper === 'SECURITY') setRole(upper);
        }}
      />
      <View style={{ height: spacing.lg }} />
      <Button title="Sign In (Dev)" onPress={onSubmit} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
    justifyContent: 'center',
  },
});

export default LoginScreen;


