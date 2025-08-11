import React, { createContext, useCallback, useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from './Text';

type ToastCtx = { show: (message: string) => void };
const Ctx = createContext<ToastCtx>({ show: () => {} });

export const useToast = () => useContext(Ctx);

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const show = useCallback((m: string) => {
    setMessage(m);
    setTimeout(() => setMessage(null), 2500);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {message ? (
        <View style={[styles.toast, { pointerEvents: 'none' as const }]}>
          <Text>{message}</Text>
        </View>
      ) : null}
    </Ctx.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: spacing.xl,
    alignSelf: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
});


