import React from 'react';
import { Platform, View, Text } from 'react-native';

type Point = { hour: string; demand_pred: number };

export default function ChartBlock({ data }:{ data: Point[] }) {
  if (Platform.OS !== 'web') {
    return (
      <View style={{ padding: 12 }}>
        <Text>Forecast (sample):</Text>
        {data.slice(0, 6).map((d, i) => (
          <Text key={i}>{d.hour}: {d.demand_pred}</Text>
        ))}
      </View>
    );
  }

  // Web: use Recharts
  const { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } = require('recharts');
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" hide={true} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="demand_pred" stroke="var(--primary-700)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


