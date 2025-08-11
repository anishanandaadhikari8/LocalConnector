import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, List, Button } from 'react-native-paper';
import { promosApi } from '../lib/api';

export default function PromotionsScreen({ route }: any) {
  const { circle } = route.params;
  const [promos, setPromos] = useState<any[]>([]);
  useEffect(() => { promosApi.list(circle.id).then(setPromos); }, [circle.id]);
  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="Promotions" /></Appbar.Header>
      <FlatList data={promos} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <List.Item title={item.title} description={`${item.body} • Claimed ${item.claimCount||0}`} right={()=>(<Button onPress={async ()=>{ await promosApi.claim(item.id); promosApi.list(circle.id).then(setPromos); }}>Claim</Button>)} />
      )} />
    </View>
  );
}