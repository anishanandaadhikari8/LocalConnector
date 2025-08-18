import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MockApi from '../../src/api/ApiAdapter';
import { theme } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/auth';

const api = new MockApi();

export default function PollsScreen() {
  const { circle, user } = useAuthStore();
  const [polls, setPolls] = useState<any[]>([]);
  const [votesByPoll, setVotesByPoll] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!circle) return;
    setLoading(true);
    try { setPolls(await api.listPolls(circle.id)); }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, [circle?.id]);

  const votedOptionId = (pollId: string) => {
    const votes = votesByPoll[pollId] || [];
    const v = user ? votes.find((x:any)=>x.user_id===user.id) : undefined;
    return v?.option_id as string | undefined;
  };
  const vote = async (pollId: string, optionId: string) => {
    if (!user) return;
    await api.votePoll(pollId, optionId, user.id);
    const vs = await api.getPollVotes(pollId);
    setVotesByPoll(prev => ({ ...prev, [pollId]: vs }));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Polls</Text>
        {loading ? <Text>Loading…</Text> : null}
        {polls.map(p => (
          <View key={p.id} style={styles.card}>
            <Text style={styles.title}>{p.question}</Text>
            <View style={{gap:8, marginTop:8}}>
              {p.options.map((o:any) => {
                const selected = votedOptionId(p.id) === o.id;
                return (
                  <TouchableOpacity key={o.id} style={[styles.btn, selected && styles.btnSel]} onPress={()=>vote(p.id, o.id)}>
                    <Text style={[styles.btnTxt, selected && styles.btnSelTxt]}>{o.text}{selected ? '  ✓' : ''}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  title:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
  btnTxt:{ color:'#fff', fontWeight:'800' },
  btnSel:{ backgroundColor: theme.colors.successFg as any },
  btnSelTxt:{ color:'#fff' },
});
