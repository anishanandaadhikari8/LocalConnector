import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Providers } from './src/providers/Providers';

export default function App() {
  return (
    <Providers>
      <AppNavigator />
    </Providers>
  );
} 