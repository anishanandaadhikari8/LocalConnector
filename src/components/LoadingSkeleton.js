import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { animations } from '../theme/theme';

const LoadingSkeleton = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
  animationDuration = animations.timing.extraSlow,
}) => {
  const theme = useTheme();
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: animationDuration,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startShimmer();
  }, [shimmerAnim, animationDuration]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius,
            opacity,
          },
        ]}
      />
    </View>
  );
};

const LoadingSkeletonGroup = ({ children, loading = true }) => {
  if (!loading) {
    return children;
  }

  return (
    <View>
      {React.Children.map(children, (child, index) => (
        <LoadingSkeleton key={index} {...child.props} />
      ))}
    </View>
  );
};

const PostSkeleton = () => {
  const theme = useTheme();
  
  return (
    <View style={[styles.postSkeleton, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.postHeader}>
        <LoadingSkeleton width={40} height={40} borderRadius={20} />
        <View style={styles.postHeaderContent}>
          <LoadingSkeleton width="60%" height={16} />
          <LoadingSkeleton width="40%" height={12} style={{ marginTop: 4 }} />
        </View>
      </View>
      <LoadingSkeleton width="90%" height={14} style={{ marginTop: 12 }} />
      <LoadingSkeleton width="75%" height={14} style={{ marginTop: 4 }} />
      <LoadingSkeleton width="100%" height={200} style={{ marginTop: 12 }} />
      <View style={styles.postActions}>
        <LoadingSkeleton width={60} height={32} borderRadius={16} />
        <LoadingSkeleton width={80} height={32} borderRadius={16} />
        <LoadingSkeleton width={70} height={32} borderRadius={16} />
      </View>
    </View>
  );
};

const ConnectorSkeleton = () => {
  const theme = useTheme();
  
  return (
    <View style={[styles.connectorSkeleton, { backgroundColor: theme.colors.surface }]}>
      <LoadingSkeleton width="100%" height={120} borderRadius={12} />
      <View style={styles.connectorContent}>
        <LoadingSkeleton width="80%" height={18} />
        <LoadingSkeleton width="60%" height={14} style={{ marginTop: 8 }} />
        <View style={styles.connectorMeta}>
          <LoadingSkeleton width={50} height={12} />
          <LoadingSkeleton width={70} height={12} />
        </View>
        <LoadingSkeleton width="100%" height={36} borderRadius={18} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
  },
  postSkeleton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  connectorSkeleton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  connectorContent: {
    padding: 12,
  },
  connectorMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

export default LoadingSkeleton;
export { LoadingSkeletonGroup, PostSkeleton, ConnectorSkeleton }; 