import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, List, FAB } from 'react-native-paper';
import { circlesApi } from '../lib/api';

export default function CirclesHomeScreen({ navigation }: any) {
  const [circles, setCircles] = useState<any[]>([]);
  useEffect(() => { circlesApi.mine().then(setCircles); }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header><Appbar.Content title="My Circles" /></Appbar.Header>
      <FlatList
        data={circles}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.type}
            onPress={() => navigation.navigate('CircleAdmin', { circle: item })}
          />
        )}
      />
      <FAB style={{ position:'absolute', right:16, bottom:16 }} icon="plus" onPress={() => navigation.navigate('CircleCreateWizard')} />
    </View>
  );
}