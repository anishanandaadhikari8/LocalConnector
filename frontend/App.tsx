import React from 'react';
import { View } from 'react-native';
import RootNav from './src/navigation';
import { AuthProvider } from './src/lib/auth';
import { ToastProvider } from './src/ui/components/Toast';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RootNav />
      </ToastProvider>
    </AuthProvider>
  );
}
