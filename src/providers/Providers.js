import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { lightTheme } from '../theme/theme';
import { AuthProvider } from './AuthProvider';
import { DataProvider } from './DataProvider';

export const Providers = ({ children }) => {
  return (
    <PaperProvider theme={lightTheme}>
      <SafeAreaProvider>
        <AuthProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}; 