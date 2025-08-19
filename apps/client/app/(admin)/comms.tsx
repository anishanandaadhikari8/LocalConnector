import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import api from '../../src/api';
import { theme } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/auth';


export default function CommsScreen() {
  const { circle } = useAuthStore();
  const [ann, setAnn] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [evtTitle, setEvtTitle] = useState('');
  const [evtStart, setEvtStart] = useState('');
  const [evtEnd, setEvtEnd] = useState('');
  const [pollQ, setPollQ] = useState('');
  const [pollOpts, setPollOpts] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!circle) return;
      setLoading(true);
      try {
        const a = await api.listAnnouncements(circle.id);
        const e = await api.listEvents(circle.id);
        setAnn(a); setEvents(e);
      } finally { setLoading(false); }
    })();
  }, [circle?.id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Comms</Text>
        {loading ? <Text>Loading…</Text> : null}
        {circle ? (
          <View style={styles.card}>
            <Text style={styles.h2}>Create Announcement</Text>
            <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
            <TextInput placeholder="Body" value={body} onChangeText={setBody} style={[styles.input,{minHeight:80}]} multiline />
            <TouchableOpacity style={styles.btn} onPress={async()=>{ if(!title.trim()) return; await api.createAnnouncement(circle.id, title, body); setTitle(''); setBody(''); setAnn(await api.listAnnouncements(circle.id)); }}>
              <Text style={styles.btnTxt}>Post</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.card}>
          <Text style={styles.h2}>Announcements</Text>
          {ann.length === 0 ? <Text style={styles.empty}>None</Text> : ann.map(a => (
            <View key={a.id} style={styles.row}><Text style={styles.title}>{a.title}</Text><Text style={styles.meta}>{new Date(a.created_at).toLocaleString()}</Text></View>
          ))}
        </View>
        <View style={styles.card}>
          <Text style={styles.h2}>Events</Text>
          {circle ? (
            <View style={{gap:8, marginBottom:12}}>
              <TextInput placeholder="Title" value={evtTitle} onChangeText={setEvtTitle} style={styles.input} />
              <TextInput placeholder="Start ISO" value={evtStart} onChangeText={setEvtStart} style={styles.input} />
              <TextInput placeholder="End ISO" value={evtEnd} onChangeText={setEvtEnd} style={styles.input} />
              <TouchableOpacity style={styles.btn} onPress={async()=>{ if(!evtTitle.trim()||!evtStart||!evtEnd) return; await api.createEvent(circle.id, evtTitle, evtStart, evtEnd); setEvtTitle(''); setEvtStart(''); setEvtEnd(''); setEvents(await api.listEvents(circle.id)); }}>
                <Text style={styles.btnTxt}>Create Event</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          {events.length === 0 ? <Text style={styles.empty}>None</Text> : events.map(e => (
            <View key={e.id} style={styles.row}><Text style={styles.title}>{e.title}</Text><Text style={styles.meta}>{new Date(e.start_at).toLocaleString()}</Text></View>
          ))}
        </View>
        {circle ? (
          <View style={styles.card}>
            <Text style={styles.h2}>Create Poll</Text>
            <TextInput placeholder="Question" value={pollQ} onChangeText={setPollQ} style={styles.input} />
            <TextInput placeholder="Options (comma separated)" value={pollOpts} onChangeText={setPollOpts} style={styles.input} />
            <TouchableOpacity style={styles.btn} onPress={async()=>{ if(!pollQ.trim()||!pollOpts.trim()) return; await api.createPoll(circle.id, pollQ, pollOpts.split(',').map(s=>s.trim()).filter(Boolean)); setPollQ(''); setPollOpts(''); }}>
              <Text style={styles.btnTxt}>Create Poll</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  h2:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any, marginBottom:8 },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  empty:{ color: theme.colors.ink700 as any },
  row:{ paddingVertical:12, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  title:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  meta:{ fontSize:12, color: theme.colors.ink700 as any },
  input:{ backgroundColor: theme.colors.surface0 as any, borderRadius:12, borderWidth:1, borderColor: theme.colors.borderSubtle as any, padding:12 },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:10, paddingHorizontal:12, borderRadius:10, alignItems:'center', marginTop:8 },
  btnTxt:{ color:'#fff', fontWeight:'800' },
});
