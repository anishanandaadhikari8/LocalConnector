import React, { PropsWithChildren } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';

export const Sheet: React.FC<PropsWithChildren<{ visible: boolean; onRequestClose: () => void }>> = ({
  visible,
  onRequestClose,
  children,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
});


