import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { getElevationStyle, animations } from '../theme/theme';

const AnimatedCard = ({
  children,
  onPress,
  style,
  elevation = 'sm',
  animationScale = animations.scale.press,
  enableHover = true,
  disabled = false,
  activeOpacity = 0.9,
  ...props
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const elevationAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: animationScale,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(elevationAnim, {
        toValue: 1,
        duration: animations.timing.quick,
        useNativeDriver: false,
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
      Animated.timing(elevationAnim, {
        toValue: 0,
        duration: animations.timing.quick,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
    opacity: disabled ? animations.opacity.disabled : 1,
  };

  const elevationStyle = getElevationStyle(elevation, theme);
  
  // Interpolate elevation for hover effect
  const animatedElevation = elevationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [elevationStyle.elevation || 2, (elevationStyle.elevation || 2) + 4],
  });

  const animatedElevationStyle = {
    ...elevationStyle,
    elevation: animatedElevation,
    // Use boxShadow for web compatibility
    boxShadow: elevationAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        elevationStyle.boxShadow || '0 3px 6px rgba(0,0,0,0.08)',
        '0 6px 12px rgba(0,0,0,0.12)'
      ],
    }),
  };

  if (onPress && !disabled) {
    return (
      <Animated.View style={[animatedStyle]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={activeOpacity}
          disabled={disabled}
          {...props}
        >
          <Animated.View style={[animatedElevationStyle]}>
            <Surface style={[style]} {...props}>
              {children}
            </Surface>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Surface style={[elevationStyle, style]} {...props}>
      {children}
    </Surface>
  );
};

export default AnimatedCard; 