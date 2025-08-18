import React from 'react';
import { View, Text } from 'react-native';

export default function Health() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', padding:24 }}>
      <Text style={{ fontSize:20, fontWeight:'800' }}>Neighbor Connect — Health OK</Text>
      <Text>UI shell rendered successfully.</Text>
    </View>
  );
}
