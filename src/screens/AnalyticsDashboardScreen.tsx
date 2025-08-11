import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { analyticsApi } from '../lib/api';

export default function AnalyticsDashboardScreen() {
  const [data, setData] = useState<any>(null);
  useEffect(() => { analyticsApi.summary().then(setData); }, []);
  return (
    <View style={{ flex:1 }}>
      <Appbar.Header><Appbar.Content title="Analytics" /></Appbar.Header>
      {data && (
        <View style={{ padding:16 }}>
          <Card style={{ marginBottom:12 }}><Card.Title title="Bookings / Week" right={()=>(<Text style={{ marginRight:16 }}>{data.bookingsPerWeek}</Text>)} /></Card>
          <Card style={{ marginBottom:12 }}><Card.Title title="Approval SLA (h)" right={()=>(<Text style={{ marginRight:16 }}>{data.approvalSlaHours}</Text>)} /></Card>
          <Card style={{ marginBottom:12 }}><Card.Title title="Incident SLA (h)" right={()=>(<Text style={{ marginRight:16 }}>{data.incidentSlaHours}</Text>)} /></Card>
          <Card><Card.Title title="Open Alerts" right={()=>(<Text style={{ marginRight:16 }}>{data.openAlerts}</Text>)} /></Card>
        </View>
      )}
    </View>
  );
}