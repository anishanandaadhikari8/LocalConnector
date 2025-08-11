import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, List, Button } from 'react-native-paper';
import { ordersApi } from '../lib/api';

export default function OrdersMenuScreen({ route, navigation }) {
  const { circle } = route.params;
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => { ordersApi.listMenu(circle.id).then(setMenu).catch(()=>setMenu([])); }, [circle.id]);

  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="Menu" /></Appbar.Header>
      <FlatList data={menu} keyExtractor={i=>String(i.id)} renderItem={({item})=>(
        <List.Item title={`${item.title} • $${(item.priceCents/100).toFixed(2)}`} right={()=>(<Button onPress={()=> setCart([...cart, { menuItemId: item.id, qty:1, priceCents:item.priceCents }])}>Add</Button>)} />
      )} />
      <Button mode="contained" onPress={()=> navigation.navigate('OrderCart', { circle, cart })} style={{ margin:16 }}>View Cart ({cart.length})</Button>
    </View>
  );
}