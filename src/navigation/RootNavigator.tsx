import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../types/navigation';
import { AppDispatch, RootState } from '../store/store';
import { login, setLoading } from '../store/authSlice';
import { getSession } from '../services/storage';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const restore = async () => {
            try {
                const session = await getSession();
                if (session) dispatch(login(session));
                else dispatch(setLoading(false));
            } catch {
                dispatch(setLoading(false));
            }
        };
        restore();
    }, [dispatch]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ?
                <Stack.Screen
                    name="Main"
                    component={MainNavigator}
                    navigationKey="user"
                /> :
                <Stack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    navigationKey="guest"
                />
            }
        </Stack.Navigator>
    );
};

export default RootNavigator;