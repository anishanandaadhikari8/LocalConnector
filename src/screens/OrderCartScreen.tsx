import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, List, Button, Text } from 'react-native-paper';
import { ordersApi } from '../lib/api';

export default function OrderCartScreen({ route, navigation }: any) {
  const { circle, cart } = route.params;
  const total = cart.reduce((s:any,i:any)=> s + i.priceCents * i.qty, 0);
  const [order, setOrder] = useState<any>(null);

  const place = async () => {
    const o = await ordersApi.placeOrder({ circleId: circle.id, items: cart });
    setOrder(o);
  };

  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="Your Order" /></Appbar.Header>
      <List.Section>
        {cart.map((i:any,idx:number)=> (<List.Item key={idx} title={`Item ${i.menuItemId}`} description={`$${(i.priceCents/100).toFixed(2)} x ${i.qty}`} />))}
      </List.Section>
      <Text style={{ padding:16 }}>Total: ${(total/100).toFixed(2)}</Text>
      {!order ? (
        <Button mode="contained" onPress={place} style={{ margin:16 }}>Place Order</Button>
      ) : (
        <View style={{ padding:16 }}>
          <Text>Status: {order.status}</Text>
          <Button onPress={async ()=> { const u = await ordersApi.updateOrder(order.id, { status:'READY' }); setOrder(u); }}>Mark READY</Button>
          <Button onPress={async ()=> { const u = await ordersApi.updateOrder(order.id, { status:'DELIVERED' }); setOrder(u); }}>Mark DELIVERED</Button>
        </View>
      )}
    </View>
  );
}