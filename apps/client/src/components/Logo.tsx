import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, G, Circle } from 'react-native-svg';

type Props = {
  size?: number;
  strokeWidth?: number;
  accent?: string;
  from?: string;
  to?: string;
  title?: string;
};

export default function Logo({
  size = 40,
  strokeWidth = 28,
  accent = '#0EA5E9',
  from = '#2563EB',
  to = '#1E40AF',
  title = 'Circles — Neighbor Connector',
}: Props) {
  // Prefer CSS variables on web if available, else use provided defaults
  const { gradFrom, gradTo, accentFill } = useMemo(() => {
    let f = from, t = to, a = accent;
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      try {
        const cs = getComputedStyle(document.documentElement);
        f = cs.getPropertyValue('--primary-600').trim() || f;
        t = cs.getPropertyValue('--primary-800').trim() || t;
        a = cs.getPropertyValue('--accent-500').trim() || a;
      } catch {}
    }
    return { gradFrom: f, gradTo: t, accentFill: a };
  }, [from, to, accent]);

  const gradId = useMemo(() => 'brandStroke-' + Math.random().toString(36).slice(2, 8), []);

  return (
    <View accessibilityLabel={title}>
      <Svg width={size} height={size} viewBox="0 0 512 512">
        <Defs>
          <LinearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={gradFrom} />
            <Stop offset="100%" stopColor={gradTo} />
          </LinearGradient>
        </Defs>
        <G fill="none" stroke={`url(#${gradId})`} strokeWidth={strokeWidth} strokeLinecap="round">
          <Circle cx="256" cy="170" r="95" />
          <Circle cx="176" cy="305" r="95" />
          <Circle cx="336" cy="305" r="95" />
        </G>
        <G>
          <Circle cx="256" cy="72" r="14" fill={accentFill} />
          <Circle cx="110" cy="330" r="12" fill={accentFill} />
          <Circle cx="402" cy="330" r="12" fill={accentFill} />
        </G>
      </Svg>
    </View>
  );
}


