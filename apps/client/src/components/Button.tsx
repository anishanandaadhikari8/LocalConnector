// Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface ButtonProps {
	onPress: () => void;
	title: string;
	variant?: 'primary' | 'ghost';
	disabled?: boolean;
	style?: any;
}

export default function Button({ onPress, title, variant = 'primary', disabled = false, style }: ButtonProps) {
	return (
		<TouchableOpacity 
			style={[
				styles[variant], 
				disabled && styles.disabled,
				style
			]} 
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={[styles.text, variant === 'ghost' && styles.ghostTxt]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	primary: {
		backgroundColor: theme.colors.primary[700],
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: 'center',
	},
	ghost: {
		backgroundColor: theme.colors.surface[0],
		borderWidth: 1,
		borderColor: theme.colors.border.subtle,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: 'center',
	},
	disabled: {
		opacity: 0.5,
	},
	text: {
		color: theme.colors.surface[0],
		fontSize: 16,
		fontWeight: '600',
	},
	ghostTxt: {
		color: theme.colors.ink[900],
	},
});
