import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface Props extends TextInputProps {
    label?: string;
}

const AppInput = ({ label, ...props }: Props) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
            <TextInput
                {...props}
                placeholderTextColor={colors.secondaryText}
                style={[
                    styles.input,
                    {
                        color: colors.text,
                        backgroundColor: colors.input,
                        borderColor: colors.border
                    },
                    props.style
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: 12 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
    input: { height: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, fontSize: 16 }
});

export default AppInput;