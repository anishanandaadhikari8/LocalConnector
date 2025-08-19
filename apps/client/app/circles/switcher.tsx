import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../src/api';
import { useAuthStore } from '../../src/store/auth';
import { useCircleStore } from '../../src/store/circle';
import { theme } from '../../src/theme/theme';
import { router } from 'expo-router';


export default function CircleSwitcherScreen() {
  const { user, login } = useAuthStore();
  const { setCircle } = useCircleStore();
  const [circles, setCircles] = useState<any[]>([]);

  useEffect(() => { (async () => setCircles(await api.getCircles()))(); }, []);

  const choose = async (c: any) => {
    const features = await api.getCircleFeatures(c.id);
    if (!user) { router.replace('/(auth)/login'); return; }
    login({ token: 't', user, circle: c, role: (useAuthStore.getState().role || 'RESIDENT') as any });
    setCircle(c, features);
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:12}}>
        <Text style={styles.h1}>Switch Circle</Text>
        {circles.map(c => (
          <TouchableOpacity key={c.id} style={styles.card} onPress={() => choose(c)}>
            <Text style={styles.name}>{c.name}</Text>
            <Text style={styles.type}>{c.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  name:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  type:{ fontSize:12, color: theme.colors.ink700 as any },
});
