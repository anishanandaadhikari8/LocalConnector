import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Logo from '../../src/components/Logo';
import { theme } from '../../src/theme/theme';
import MockApi from '../../src/api/ApiAdapter';
import { useAuthStore } from '../../src/store/auth';
import { useCircleStore } from '../../src/store/circle';

type UserRole = 'RESIDENT'|'ADMIN'|'SECURITY'|'MAINTENANCE'|'STAFF';
type AppUser = { id:string; email:string; display_name:string; avatar_url?:string };
type Membership = { id:string; circle_id:string; user_id:string; role:UserRole };
type Circle = { id:string; name:string; type:'APARTMENT'|'HOTEL'|'OFFICE' };

const api = new MockApi();

export default function LoginScreen() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [circleId, setCircleId] = useState('');
  const [userId, setUserId] = useState('');
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
            <Text style={[styles.step, {marginTop:16}]}>2. Choose a user</Text>
            <View style={{gap:8}}>
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
            <Text style={styles.disclaimer}>Dev login only — selects a seeded user for fast demos.</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page:{ flex:1, padding:24, backgroundColor: theme.colors.surface50 as any },
  hero:{ alignItems:'flex-start', marginBottom:16 },
  brand:{ fontSize:28, fontWeight:'900', color: theme.colors.ink900 as any, letterSpacing:0.2 },
  title:{ fontSize:28, fontWeight:'800', color: theme.colors.ink900 as any },
  subtitle:{ fontSize:16, color: theme.colors.ink700 as any, marginTop:4, maxWidth:680 },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, shadowColor:'#000', shadowOpacity:0.06, shadowRadius:16,
         borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  step:{ fontSize:14, fontWeight:'700', color: theme.colors.primary700 as any },
  circleCard:{ padding:12, borderRadius:12, borderWidth:1, borderColor: theme.colors.borderSubtle as any, backgroundColor: theme.colors.surface0 as any, minWidth:200 },
  circleCardSel:{ borderColor: theme.colors.primary700 as any, backgroundColor: theme.colors.surface100 as any },
  circleName:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  circleType:{ fontSize:12, color: theme.colors.ink700 as any, marginTop:2 },
  userRow:{ flexDirection:'row', alignItems:'center', padding:10, borderRadius:12, borderWidth:1, borderColor: theme.colors.borderSubtle as any, backgroundColor: theme.colors.surface0 as any },
  userRowSel:{ borderColor: theme.colors.primary700 as any, backgroundColor: theme.colors.surface100 as any },
  avatar:{ width:36, height:36, borderRadius:18, backgroundColor: theme.colors.borderSubtle as any, marginRight:10 },
  userName:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  userRole:{ fontSize:12, color: theme.colors.ink700 as any },
  cta:{ marginTop:16, alignItems:'center', backgroundColor: theme.colors.primary700 as any, paddingVertical:14, borderRadius:12 },
  ctaText:{ color:'#fff', fontWeight:'800', fontSize:16 },
  disclaimer:{ fontSize:12, color: theme.colors.ink700 as any, marginTop:8 }
});