import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Checkbox, Chip } from 'react-native-paper';
import { circlesApi } from '../lib/api';

export default function CircleCreateWizard({ navigation }: any) {
  const [name, setName] = useState('');
  const [type, setType] = useState('APARTMENT');
  const [radius, setRadius] = useState('2');
  const [features, setFeatures] = useState<string[]>(['TASKBOARD','ANALYTICS']);
  const toggle = (f:string) => setFeatures((arr)=> arr.includes(f) ? arr.filter(x=>x!==f) : [...arr, f]);

  const create = async () => {
    const circle = await circlesApi.create({ name, type, radius: Number(radius), features });
    navigation.replace('CircleAdmin', { circle });
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header><Appbar.Content title="Create Circle" /></Appbar.Header>
      <ScrollView style={{ padding:16 }}>
        <TextInput label="Name" value={name} onChangeText={setName} style={{ marginBottom:12 }} />
        <TextInput label="Type" value={type} onChangeText={setType} style={{ marginBottom:12 }} />
        <TextInput label="Radius (mi)" value={radius} onChangeText={setRadius} keyboardType="numeric" style={{ marginBottom:12 }} />
        <View style={{ flexDirection:'row', flexWrap:'wrap', gap:8 }}>
          {['RESERVATIONS','INCIDENTS','EVENTS','POLLS','DIRECTORY','GUEST_PASSES','TASKBOARD','CHAT','ANALYTICS','ORDERS','PROMOTIONS'].map(f => (
            <Chip key={f} selected={features.includes(f)} onPress={() => toggle(f)} style={{ margin:4 }}>{f}</Chip>
          ))}
        </View>
        <Button mode="contained" onPress={create} style={{ marginTop:24 }}>Create</Button>
      </ScrollView>
    </View>
  );
}