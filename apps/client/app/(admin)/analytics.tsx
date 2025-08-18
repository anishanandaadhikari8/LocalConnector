import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MockApi from '../../src/api/ApiAdapter';
import { theme } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/auth';
import ChartBlock from '../../src/components/ChartBlock';

const api = new MockApi();

export default function AnalyticsScreen() {
  const { circle } = useAuthStore();
  const [kpis, setKpis] = useState<{label:string; value:string}[]>([]);
  const [forecast, setForecast] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!circle) return;
      setLoading(true);
      try {
        const vals = await api.getKpis(circle.id);
        setKpis(vals);
        setForecast(await api.getForecast(circle.id));
        setAnomalies(await api.getAnomalies(circle.id));
      } finally { setLoading(false); }
    })();
  }, [circle?.id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Analytics</Text>
        {loading ? <Text>Loading…</Text> : null}
        <View style={styles.grid}>
          {kpis.map((k, idx) => (
            <View key={idx} style={styles.tile}>
              <Text style={styles.val}>{k.value}</Text>
              <Text style={styles.lbl}>{k.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.h2}>Forecast (next slots)</Text>
          {forecast.length > 0 ? <ChartBlock data={forecast} /> : null}
          {forecast.length === 0 ? (
            <Text style={styles.empty}>No forecast data</Text>
          ) : (
            forecast.slice(0, 12).map((f, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.cell}>{f.hour}</Text>
                <Text style={styles.cell}>Demand: {f.demand_pred}</Text>
                {f.slot_reco ? <Text style={[styles.badge, styles.badgeReco]}>Slot {f.slot_reco}m</Text> : null}
                {f.is_surge ? <Text style={[styles.badge, styles.badgeWarn]}>Surge</Text> : null}
              </View>
            ))
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.h2}>Anomalies</Text>
          {anomalies.length === 0 ? (
            <Text style={styles.empty}>No open anomalies</Text>
          ) : (
            anomalies.map((a) => (
              <View key={a.id} style={styles.row}>
                <Text style={[styles.badge, styles.badgeWarn]}>{a.status}</Text>
                <Text style={[styles.cell, {flex:2}]}>{a.metric} ({a.window}) — z={a.z}</Text>
                <TouchableOpacity style={styles.btnSm} onPress={async()=>{ await api.acknowledgeAnomaly(a.id); }}>
                  <Text style={styles.btnSmTxt}>Ack</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnSm, styles.btnOutline]} onPress={async()=>{ await api.applyPolicy({ id:a.id, policy:'SLOT_60_6TO9_7D' }); }}>
                  <Text style={[styles.btnSmTxt, styles.btnOutlineTxt]}>Apply Policy</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  h2:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any, marginBottom:8 },
  grid:{ flexDirection:'row', flexWrap:'wrap', gap:12 },
  tile:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any, minWidth:'46%', flex:1 },
  val:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  lbl:{ fontSize:12, color: theme.colors.ink700 as any },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  empty:{ color: theme.colors.ink700 as any },
  row:{ flexDirection:'row', alignItems:'center', gap:8, paddingVertical:8, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  cell:{ color: theme.colors.ink900 as any },
  badge:{ color:'#fff', paddingHorizontal:8, paddingVertical:2, borderRadius:8, overflow:'hidden', fontSize:10, fontWeight:'700' },
  badgeWarn:{ backgroundColor: theme.colors.warningBg as any },
  badgeReco:{ backgroundColor: theme.colors.primary700 as any },
  btnSm:{ backgroundColor: theme.colors.primary700 as any, paddingHorizontal:8, paddingVertical:6, borderRadius:8 },
  btnSmTxt:{ color:'#fff', fontWeight:'800' },
  btnOutline:{ backgroundColor: theme.colors.surface0 as any, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  btnOutlineTxt:{ color: theme.colors.ink900 as any },
});
