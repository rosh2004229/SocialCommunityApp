import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { AuthStackParamList } from '../types/navigation';
import { AppDispatch } from '../store/store';
import { login } from '../store/authSlice';
import { saveSession } from '../services/storage';
import { isValidPhone } from '../utils/validation';
import { useTheme } from '../hooks/useTheme';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { colors } = useTheme();
    const [phone, setPhone] = useState('');

    const handleLogin = async () => {
        if (!isValidPhone(phone)) {
            Alert.alert('Invalid Number', 'Enter exactly 10 digits.');
            return;
        }

        const user = {
            id: Date.now().toString(),
            name: 'Social User',
            phone,
            email: `${phone}@example.com`,
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
                <Text style={[styles.logo, { color: colors.primary }]}>SocialApp</Text>
                <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
                <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                    Login to continue
                </Text>

                <AppInput
                    label="Phone Number"
                    placeholder="Enter 10 digit phone number"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={setPhone}
                />

                <AppButton title="Login" onPress={handleLogin} />

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={[styles.signup, { color: colors.primary }]}>
                        Don't have an account? Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    container: { flex: 1, justifyContent: 'center', padding: 25 },
    logo: { fontSize: 32, fontWeight: '900', textAlign: 'center', marginBottom: 35 },
    title: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
    subtitle: { fontSize: 15, textAlign: 'center', marginTop: 6, marginBottom: 30 },
    signup: { textAlign: 'center', marginTop: 18, fontWeight: '600' }
});

export default LoginScreen;