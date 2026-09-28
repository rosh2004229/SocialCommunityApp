import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props {
    title: string;
    onPress: () => void;
}

const AppButton = ({ title, onPress }: Props) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: { height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginVertical: 6 },
    text: { color: '#fff', fontSize: 16, fontWeight: '700' }
});

export default AppButton;