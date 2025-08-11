import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { taskboardApi } from '../lib/api';

export default function TaskPostComposer({ route, navigation }: any) {
  const { circle } = route.params;
  const [type, setType] = useState('BABYSIT');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const submit = async () => {
    const post = await taskboardApi.createPost({ circleId: circle.id, type, title, body });
    navigation.replace('TaskPostDetail', { post, circle });
  };

  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="New Task" /></Appbar.Header>
      <ScrollView style={{ padding:16 }}>
        <SegmentedButtons value={type} onValueChange={setType} buttons={[
          { value:'BABYSIT', label: 'Babysit' },
          { value:'CARPOOL', label: 'Carpool' },
          { value:'ERRAND', label: 'Errand' },
          { value:'SHARE', label: 'Share' },
        ]} />
        <TextInput label="Title" value={title} onChangeText={setTitle} style={{ marginTop:12 }} />
        <TextInput label="Details" value={body} onChangeText={setBody} multiline numberOfLines={4} style={{ marginTop:12 }} />
        <Button mode="contained" onPress={submit} style={{ marginTop:24 }}>Post</Button>
      </ScrollView>
    </View>
  );
}