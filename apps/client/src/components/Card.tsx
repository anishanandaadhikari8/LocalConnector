// Card.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface CardProps {
	children: React.ReactNode;
	style?: any;
}

export default function Card({ children, style }: CardProps) {
	return (
		<View style={[styles.card, style]}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: theme.colors.surface[0],
		borderRadius: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: theme.colors.border.subtle,
	},
});
