import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, Switch, Divider, Button } from 'react-native-paper';
import { circlesApi } from '../lib/api';

export default function CircleAdminScreen({ route }: any) {
  const { circle } = route.params;
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => { circlesApi.get(circle.id).then((res)=> setFeatures(res.features || [])); }, [circle.id]);

  const toggle = async (fk:string, enabled:boolean) => {
    const updated = await circlesApi.setFeature(circle.id, fk, enabled);
    setFeatures(prev => {
      const exists = prev.find((f:any)=>f.featureKey===fk);
      if (exists) return prev.map((f:any)=> f.featureKey===fk ? updated : f);
      return [...prev, updated];
    });
  };

  const isEnabled = (fk:string) => features.some((f:any)=> f.featureKey===fk && f.enabled);

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