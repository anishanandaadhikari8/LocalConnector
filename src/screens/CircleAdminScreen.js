import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, Switch, Divider, Button } from 'react-native-paper';
import { circlesApi } from '../lib/api';

export default function CircleAdminScreen({ route }) {
  const { circle } = route.params;
  const [features, setFeatures] = useState([]);

  useEffect(() => { circlesApi.get(circle.id).then((res)=> setFeatures(res.features || [])).catch(()=>setFeatures([])); }, [circle.id]);

  const toggle = async (fk, enabled) => {
    const updated = await circlesApi.setFeature(circle.id, fk, enabled);
    setFeatures(prev => {
      const exists = prev.find((f)=>f.featureKey===fk);
      if (exists) return prev.map((f)=> f.featureKey===fk ? updated : f);
      return [...prev, updated];
    });
  };

  const isEnabled = (fk) => features.some((f)=> f.featureKey===fk && f.enabled);

  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title={circle.name} /></Appbar.Header>
      <ScrollView>
        <List.Subheader>Features</List.Subheader>
        {['TASKBOARD','ORDERS','PROMOTIONS','ANALYTICS'].map((fk)=> (
          <List.Item key={fk} title={fk} right={()=>(<Switch value={isEnabled(fk)} onValueChange={(v)=>toggle(fk,v)} />)} />
        ))}
        <Divider />
        <List.Subheader>Members</List.Subheader>
        <Button onPress={()=> circlesApi.addMember(circle.id, { userId:'alice', role:'RESIDENT', verified:true })}>Add Alice</Button>
      </ScrollView>
    </View>
  );
}