import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { animations } from '../theme/theme';

const SuccessAnimation = ({
  visible = false,
  message = 'Success!',
  duration = 2000,
  onComplete,
  size = 60,
  style,
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Start animation sequence
      Animated.sequence([
        // Scale in the container
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
        ]),
        // Delay before showing checkmark
        Animated.delay(100),
        // Animate checkmark
        Animated.spring(checkmarkScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 200,
          friction: 10,
        }),
        // Hold the animation
        Animated.delay(duration - 500),
        // Fade out
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Reset animations
        scaleAnim.setValue(0);
        opacityAnim.setValue(0);
        checkmarkScale.setValue(0);
        onComplete && onComplete();
      });
    }
  }, [visible, duration, onComplete]);

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.overlay, style]}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.primaryContainer,
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
            width: size + 40,
            height: size + 40,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.checkmarkContainer,
            {
              transform: [{ scale: checkmarkScale }],
            },
          ]}
        >
          <MaterialCommunityIcons
            name="check"
            size={size * 0.6}
            color={theme.colors.onPrimaryContainer}
          />
        </Animated.View>
      </Animated.View>
      
      <Animated.View
        style={[
          styles.messageContainer,
          {
            opacity: opacityAnim,
            transform: [{ translateY: scaleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })}],
          },
        ]}
      >
        <Text
          style={[
            styles.message,
            theme.typography.titleMedium,
            { color: theme.colors.onSurface },
          ]}
        >
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

const SuccessToast = ({
  visible = false,
  message = 'Success!',
  duration = 3000,
  onComplete,
  position = 'top', // 'top' or 'bottom'
}) => {
  const theme = useTheme();
  const translateAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const slideIn = position === 'top' ? 0 : 0;
      const slideOut = position === 'top' ? -100 : 100;

      Animated.sequence([
        // Slide in
        Animated.parallel([
          Animated.spring(translateAnim, {
            toValue: slideIn,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
        ]),
        // Hold
        Animated.delay(duration - 600),
        // Slide out
        Animated.parallel([
          Animated.timing(translateAnim, {
            toValue: slideOut,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: animations.timing.normal,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        translateAnim.setValue(position === 'top' ? -100 : 100);
        opacityAnim.setValue(0);
        onComplete && onComplete();
      });
    }
  }, [visible, duration, position, onComplete]);

  if (!visible) {
    return null;
  }

  const positionStyle = position === 'top' 
    ? { top: 60 } 
    : { bottom: 60 };

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        positionStyle,
        {
          backgroundColor: theme.colors.inverseSurface,
          transform: [{ translateY: translateAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="check-circle"
        size={20}
        color={theme.colors.inverseOnSurface}
        style={styles.toastIcon}
      />
      <Text
        style={[
          styles.toastMessage,
          theme.typography.bodyMedium,
          { color: theme.colors.inverseOnSurface },
        ]}
      >
        {message}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  container: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  },
  checkmarkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  message: {
    textAlign: 'center',
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 6,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)',
    zIndex: 1000,
  },
  toastIcon: {
    marginRight: 8,
  },
  toastMessage: {
    flex: 1,
    fontWeight: '500',
  },
});

export default SuccessAnimation;
export { SuccessToast }; 