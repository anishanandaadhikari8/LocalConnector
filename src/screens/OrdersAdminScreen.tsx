import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, List, Button } from 'react-native-paper';
import { ordersApi } from '../lib/api';

export default function OrdersAdminScreen({ route }: any) {
  const { circle } = route.params;
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { /* placeholder: require a backend list endpoint */ }, []);
  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="Orders Board" /></Appbar.Header>
      <FlatList data={orders} keyExtractor={(i)=>String(i.id)} renderItem={({item})=>(
        <List.Item title={`Order #${item.id} • ${item.status}`} right={()=>(
          <>
            <Button onPress={async ()=> setOrders(o=>o)}>CONFIRM</Button>
            <Button onPress={async ()=> setOrders(o=>o)}>READY</Button>
            <Button onPress={async ()=> setOrders(o=>o)}>DELIVERED</Button>
          </>
        )} />
      )} />
    </View>
  );
}