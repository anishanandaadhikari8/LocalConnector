import React, { useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { animations } from '../theme/theme';

const AnimatedButton = ({
  children,
  onPress,
  style,
  contentStyle,
  labelStyle,
  disabled = false,
  mode = 'contained',
  icon,
  animationScale = animations.scale.press,
  ...props
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: animationScale,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: animations.opacity.active,
        duration: animations.timing.quick,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: animations.timing.quick,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    opacity: disabled ? animations.opacity.disabled : opacityAnim,
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Button
        mode={mode}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        contentStyle={contentStyle}
        labelStyle={labelStyle}
        icon={icon}
        {...props}
      >
        {children}
      </Button>
    </Animated.View>
  );
};

export default AnimatedButton; 