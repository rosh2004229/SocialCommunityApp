import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AuthStackParamList } from '../types/navigation';
import { AppDispatch } from '../store/store';
import { login } from '../store/authSlice';
import { saveSession } from '../services/storage';
import { isValidEmail, isValidPhone } from '../utils/validation';
import { useTheme } from '../hooks/useTheme';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUpScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = async () => {
        if (!name.trim() || !isValidPhone(phone) || !isValidEmail(email)) {
            Alert.alert('Invalid Details', 'Enter name, valid 6-digit number and email.');
            return;
        }

        const user = {
            id: Date.now().toString(),
            name: name.trim(),
            phone,
            email,
            avatar: null
        };

        await saveSession(user);
        dispatch(login(user));
    };

    return (
        <KeyboardAvoidingView
            style={[styles.screen, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
                <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                    Join the community
                </Text>

                <AppInput
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                <AppInput
                    label="6 Digit Number"
                    placeholder="Enter 10 digits"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={setPhone}
                />

                <AppInput
                    label="Email"
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <AppButton title="Create Account" onPress={handleSignUp} />

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.login, { color: colors.primary }]}>
                        Already have an account? Login
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    container: { flex: 1, justifyContent: 'center', padding: 25 },
    title: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
    subtitle: { textAlign: 'center', marginTop: 6, marginBottom: 30 },
    login: { textAlign: 'center', marginTop: 18, fontWeight: '600' }
});

export default SignUpScreen;