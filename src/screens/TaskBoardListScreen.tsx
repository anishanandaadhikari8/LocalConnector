import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, List, Button, Banner } from 'react-native-paper';
import { taskboardApi } from '../lib/api';

export default function TaskBoardListScreen({ route, navigation }: any) {
  const { circle } = route.params;
  const [posts, setPosts] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => { taskboardApi.listPosts(circle.id).then(setPosts); }, [circle.id]);

  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="Task Board" /></Appbar.Header>
      <Banner visible={visible} actions={[{ label:'Got it', onPress: ()=> setVisible(false)}]}>
        Demo only. No in-app payments; community responsibility; follow safety tips.
      </Banner>
      <FlatList data={posts} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <List.Item title={`${item.type} • ${item.title}`} description={item.body} onPress={()=> navigation.navigate('TaskPostDetail', { post: item, circle })} />
      )} />
      <Button mode="contained" onPress={()=> navigation.navigate('TaskPostComposer', { circle })} style={{ margin:16 }}>New Post</Button>
    </View>
  );
}