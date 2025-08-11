import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, List, Button, Banner } from 'react-native-paper';
import { taskboardApi } from '../lib/api';

export default function TaskPostDetailScreen({ route }: any) {
  const { post: initialPost } = route.params;
  const [post, setPost] = useState<any>(initialPost);
  const [offers, setOffers] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => { taskboardApi.listPosts(post.circleId).then(()=>{}); }, [post.id]);
  useEffect(() => { taskboardApi.createOffer; taskboardApi.updateOffer; taskboardApi.completePost; }, []);
  useEffect(() => { fetchOffers(); }, [post.id]);

  const fetchOffers = async () => {
    const list = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8082/api/v1'}/task-posts/${post.id}/offers`, { headers: { 'X-User-Id':'alice','X-User-Role':'RESIDENT'}}).then(r=>r.json());
    setOffers(list);
  };

  const makeOffer = async () => {
    await taskboardApi.createOffer(post.id, { message: 'I can help!' });
    fetchOffers();
  };

  const acceptFirst = async () => {
    if (offers[0]) { await taskboardApi.updateOffer(offers[0].id, { status: 'ACCEPTED' }); fetchOffers(); }
  };

  const complete = async () => {
    const updated = await taskboardApi.completePost(post.id);
    setPost(updated);
  };

  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title={post.title} /></Appbar.Header>
      <Banner visible={visible} actions={[{ label:'OK', onPress: ()=> setVisible(false)}]}>
        Safety notes: verify identities, meet in public spaces. No payments in-app.
      </Banner>
      <List.Item title={`Type: ${post.type}`} description={post.body} />
      <FlatList data={offers} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <List.Item title={`${item.userId}`} description={item.message} right={()=>(<List.Icon icon={item.status==='ACCEPTED'?'check':'clock'} />)} />
      )} />
      <View style={{ flexDirection:'row', justifyContent:'space-around', padding:12 }}>
        <Button onPress={makeOffer}>Offer</Button>
        <Button onPress={acceptFirst}>Accept First</Button>
        <Button mode="contained" onPress={complete}>Mark Completed</Button>
      </View>
    </View>
  );
}