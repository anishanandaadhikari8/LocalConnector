import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { router } from 'expo-router';
import Logo from '../../src/components/Logo';
import { theme } from '../../src/theme/theme';
import api from '../../src/api';
import { useAuthStore } from '../../src/store/auth';
import { useCircleStore } from '../../src/store/circle';

type UserRole = 'RESIDENT'|'ADMIN'|'SECURITY'|'MAINTENANCE'|'STAFF';
type AppUser = { id:string; email:string; display_name:string; avatar_url?:string };
type Membership = { id:string; circle_id:string; user_id:string; role:UserRole };
type Circle = { id:string; name:string; type:'APARTMENT'|'HOTEL'|'OFFICE' };


export default function LoginScreen() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [circleId, setCircleId] = useState('');
  const [userId, setUserId] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [registering, setRegistering] = useState(false);
  const { login } = useAuthStore(); const { setCircle } = useCircleStore();

  useEffect(()=>{ (async()=>{ setCircles(await api.getCircles()); setUsers(await api.listUsers()); })(); },[]);
  useEffect(()=>{ (async()=>{ if(!circleId){ setMemberships([]); setUserId(''); return; } setMemberships(await api.listMembers(circleId)); })(); },[circleId]);

  const devUsers = useMemo(()=> memberships.map(m=>{
    const u = users.find(x=>x.id===m.user_id); if(!u) return null;
    return { id:u.id, name:u.display_name, email:u.email, role:m.role as UserRole, avatar:u.avatar_url };
  }).filter(Boolean) as {id:string;name:string;email:string;role:UserRole;avatar?:string}[], [memberships, users]);

  const handleLogin = async () => {
    if (!circleId || !userId) return;
    const circle = circles.find(c=>c.id===circleId)!;
    const dev = devUsers.find(d=>d.id===userId)!;
    const { token, user } = await api.loginDev(dev.email, dev.role, circle.id);
    const features = await api.getCircleFeatures(circle.id);
    login({ token, user, circle, role: dev.role }); setCircle(circle, features);
    if (['ADMIN','SECURITY','MAINTENANCE'].includes(dev.role)) router.replace('/(admin)/dashboard');
    else router.replace('/(resident)/home');
  };

  const handleRegister = async () => {
    if (!newUserEmail.trim() || !newUserName.trim() || !circleId) return;
    setRegistering(true);
    try {
      // Create new user
      const newUser = await api.createUser(newUserEmail.trim(), newUserName.trim());
      // Join the selected circle
      await api.joinCircle(circleId, 'RESIDENT');
      // Refresh users and memberships
      setUsers(await api.listUsers());
      setMemberships(await api.listMembers(circleId));
      setShowRegister(false);
      setNewUserEmail('');
      setNewUserName('');
      // Auto-select the new user
      setUserId(newUser.id);
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <View style={{flexDirection:'row', alignItems:'center', gap:12, marginBottom:8}}>
          <Logo size={56} />
          <Text style={styles.brand}>Circles</Text>
        </View>
        <Text style={styles.title}>Welcome to Neighbor Connect</Text>
        <Text style={styles.subtitle}>Verified local communities. Apartments first — fast bookings, safer spaces.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.step}>1. Select your Circle</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:12, paddingVertical:8}}>
          {circles.map(c=>(
            <TouchableOpacity key={c.id} onPress={()=>setCircleId(c.id)}
              style={[styles.circleCard, circleId===c.id && styles.circleCardSel]}>
              <Text style={styles.circleName}>{c.name}</Text>
              <Text style={styles.circleType}>{c.type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {circleId ? (
          <>
            <Text style={[styles.step, {marginTop:16}]}>2. Choose a user or register new</Text>
            
            {/* Register new user */}
            <View style={styles.registerSection}>
              <TouchableOpacity 
                onPress={() => setShowRegister(!showRegister)}
                style={styles.registerToggle}
              >
                <Text style={styles.registerToggleText}>
                  {showRegister ? 'Cancel' : '+ Register New User'}
                </Text>
              </TouchableOpacity>
              
              {showRegister && (
                <View style={styles.registerForm}>
                  <TextInput
                    style={styles.input}
                    placeholder="Your name"
                    value={newUserName}
                    onChangeText={setNewUserName}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Your email"
                    value={newUserEmail}
                    onChangeText={setNewUserEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity 
                    disabled={registering || !newUserEmail.trim() || !newUserName.trim()}
                    onPress={handleRegister}
                    style={[styles.registerButton, (!newUserEmail.trim() || !newUserName.trim()) && styles.registerButtonDisabled]}
                  >
                    <Text style={styles.registerButtonText}>
                      {registering ? 'Creating...' : 'Create User'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Existing users */}
            <View style={{gap:8, marginTop: 16}}>
              {devUsers.map(u=>(
                <TouchableOpacity key={u.id} onPress={()=>setUserId(u.id)}
                  style={[styles.userRow, userId===u.id && styles.userRowSel]}>
                  <View style={styles.avatar}/>
                  <View style={{flex:1}}>
                    <Text style={styles.userName}>{u.name}</Text>
                    <Text style={styles.userRole}>{u.role}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity disabled={!userId} onPress={handleLogin}
              style={[styles.cta, !userId && {opacity:0.5}]}>
              <Text style={styles.ctaText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.disclaimer}>
              {devUsers.length === 0 ? 'No users in this circle yet. Register a new user to get started!' : 'Select an existing user or register a new one.'}
            </Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		padding: 24,
		backgroundColor: theme.colors.surface[50],
	},
	header: {
		marginBottom: 32,
	},
	brand: {
		fontSize: 28,
		fontWeight: '900',
		color: theme.colors.ink[900],
		letterSpacing: 0.2,
	},
	title: {
		fontSize: 28,
		fontWeight: '800',
		color: theme.colors.ink[900],
	},
	subtitle: {
		fontSize: 16,
		color: theme.colors.ink[700],
		marginTop: 4,
		maxWidth: 680,
	},
	card: {
		backgroundColor: theme.colors.surface[0],
		borderRadius: 16,
		padding: 16,
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowRadius: 16,
		marginBottom: 16,
	},
	step: {
		fontSize: 14,
		fontWeight: '700',
		color: theme.colors.primary[700],
	},
	circleCard: {
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: theme.colors.border.subtle,
		backgroundColor: theme.colors.surface[0],
		minWidth: 200,
	},
	circleCardSel: {
		borderColor: theme.colors.primary[700],
		backgroundColor: theme.colors.surface[100],
	},
	circleName: {
		fontSize: 16,
		fontWeight: '700',
		color: theme.colors.ink[900],
	},
	circleType: {
		fontSize: 12,
		color: theme.colors.ink[700],
	},
	userRow: {
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: theme.colors.border.subtle,
		backgroundColor: theme.colors.surface[0],
	},
	userRowSel: {
		borderColor: theme.colors.primary[700],
		backgroundColor: theme.colors.surface[100],
	},
	userName: {
		fontSize: 16,
		fontWeight: '700',
		color: theme.colors.ink[900],
	},
	userRole: {
		fontSize: 12,
		color: theme.colors.ink[700],
	},
	cta: {
		marginTop: 16,
		alignItems: 'center',
		backgroundColor: theme.colors.primary[700],
		paddingVertical: 14,
		borderRadius: 12,
	},
	ctaText: {
		color: '#fff',
		fontWeight: '800',
	},
	disclaimer: {
		fontSize: 12,
		color: theme.colors.ink[700],
		marginTop: 8,
	},
	logo: {
		alignItems: 'center',
		marginBottom: 24,
	},
	logoContainer: {
		backgroundColor: theme.colors.surface[100],
		padding: 16,
		borderRadius: 16,
		marginBottom: 16,
	},
	logoText: {
		color: theme.colors.primary[600],
		fontSize: 18,
		fontWeight: '700',
		marginTop: 8,
	},
	content: {
		flex: 1,
	},
	section: {
		backgroundColor: theme.colors.surface[50],
		padding: 16,
		borderRadius: 12,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '700',
		color: theme.colors.ink[900],
		marginBottom: 8,
	},
	sectionText: {
		fontSize: 14,
		color: theme.colors.ink[700],
		lineHeight: 20,
	},
	badge: {
		backgroundColor: theme.colors.accent[500],
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		alignSelf: 'flex-start',
		marginTop: 8,
	},
	badgeText: {
		color: '#fff',
		fontSize: 12,
		fontWeight: '600',
	},
		registerSection: { marginTop: 8 },
	hero: { alignItems: 'flex-start', marginBottom: 16 },
	avatar: { 
		width: 36, 
		height: 36, 
		borderRadius: 18, 
		backgroundColor: theme.colors.border.subtle, 
		marginRight: 10 
	},
	registerToggle: { 
		paddingVertical: 8, 
		paddingHorizontal: 12, 
		borderRadius: 8,
		backgroundColor: theme.colors.surface[100],
		alignItems: 'center'
	},
  registerToggleText: { 
    color: theme.colors.primary[600], 
    fontWeight: '600',
    fontSize: 14
  },
  registerForm: { 
    marginTop: 12, 
    gap: 12,
    padding: 12,
    backgroundColor: theme.colors.surface[50],
    borderRadius: 8
  },
  input: { 
    borderWidth: 1, 
    borderColor: theme.colors.border.strong, 
    borderRadius: 8, 
    padding: 12,
    color: theme.colors.ink[900],
    backgroundColor: theme.colors.surface[0]
  },
  registerButton: { 
    backgroundColor: theme.colors.accent[500], 
    paddingVertical: 12, 
    borderRadius: 8,
    alignItems: 'center'
  },
  registerButtonDisabled: { opacity: 0.5 },
  registerButtonText: { color: 'white', fontWeight: '600' }
});