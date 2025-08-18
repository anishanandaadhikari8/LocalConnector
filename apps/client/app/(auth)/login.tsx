import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import MockApi from '../../src/api/ApiAdapter';
import { useAuthStore } from '../../src/store/auth';
import { useCircleStore } from '../../src/store/circle';
import { AppUser, Membership, UserRole, Circle } from '../../src/api/types';

const api = new MockApi();

export default function LoginScreen() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [selectedCircleId, setSelectedCircleId] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const { login } = useAuthStore();
  const { setCircle } = useCircleStore();

  useEffect(() => {
    (async () => {
      setCircles(await api.getCircles());
      setUsers(await api.listUsers());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedCircleId) {
        // MockApi doesn't filter by circle for users; we derive by memberships
        const all = await api.listMembers(selectedCircleId);
        setMemberships(all);
      } else {
        setMemberships([]);
        setSelectedUserId('');
      }
    })();
  }, [selectedCircleId]);

  const devUsersForCircle = useMemo(() => {
    if (!selectedCircleId) return [];
    return memberships
      .map((m) => {
        const u = users.find((x) => x.id === m.user_id);
        if (!u) return null;
        return {
          id: u.id,
          name: u.display_name,
          email: u.email,
          role: m.role as UserRole,
        };
      })
      .filter(Boolean) as Array<{id:string;name:string;email:string;role:UserRole}>;
  }, [memberships, users, selectedCircleId]);

  const handleLogin = async () => {
    if (!selectedCircleId || !selectedUserId) return;
    const circle = circles.find((c) => c.id === selectedCircleId)!;
    const dev = devUsersForCircle.find((d) => d.id === selectedUserId)!;
    try {
      const { token, user } = await api.loginDev(dev.email, dev.role, circle.id);
      // set auth + circle
      login({ token, user, circle, role: dev.role });
      const features = await api.getCircleFeatures(circle.id);
      setCircle(circle, features);
      // route by role
      if (dev.role === 'ADMIN' || dev.role === 'SECURITY' || dev.role === 'MAINTENANCE') {
        router.replace('/(admin)/dashboard');
      } else {
        router.replace('/(resident)/home');
      }
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Neighbor Connect</Text>
        <Text style={styles.subtitle}>Development Login</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Community</Text>
          {circles.map((circle) => (
            <TouchableOpacity
              key={circle.id}
              style={[
                styles.option,
                selectedCircleId === circle.id && styles.selectedOption
              ]}
              onPress={() => setSelectedCircleId(circle.id)}
            >
              <Text style={styles.optionText}>{circle.name}</Text>
              <Text style={styles.optionSubtext}>{circle.type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select User</Text>
          {devUsersForCircle.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={[
                styles.option,
                selectedUserId === user.id && styles.selectedOption
              ]}
              onPress={() => setSelectedUserId(user.id)}
            >
              <Text style={styles.optionText}>{user.name}</Text>
              <Text style={styles.optionSubtext}>{user.role} • {user.email}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            (!selectedCircleId || !selectedUserId) && styles.loginButtonDisabled
          ]}
          onPress={handleLogin}
          disabled={!selectedCircleId || !selectedUserId}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'var(--color-background-primary)',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: 'var(--color-text-primary)',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'var(--color-text-secondary)',
    textAlign: 'center',
    marginBottom: 48,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'var(--color-text-primary)',
    marginBottom: 16,
  },
  option: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'var(--color-border-primary)',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: 'var(--color-background-primary)',
  },
  selectedOption: {
    borderColor: 'var(--color-primary-500)',
    backgroundColor: 'var(--color-primary-50)',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'var(--color-text-primary)',
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 14,
    color: 'var(--color-text-secondary)',
  },
  loginButton: {
    backgroundColor: 'var(--color-primary-500)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonDisabled: {
    backgroundColor: 'var(--color-text-tertiary)',
  },
  loginButtonText: {
    color: 'var(--color-text-inverse)',
    fontSize: 18,
    fontWeight: '600',
  },
});
