import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { clearSession, getAvatar, saveAvatar, saveSession } from '../services/storage';
import { logout, updateUser } from '../store/authSlice';
import { AppDispatch, RootState } from '../store/store';
import AppButton from '../components/AppButton';

const ProfileScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { theme, colors, toggleTheme } = useTheme();
    const user = useSelector((state: RootState) => state.auth.user);
    const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);

    useEffect(() => {
        getAvatar().then(uri => {
            if (uri) setAvatar(uri);
        });
    }, []);

    const updateAvatar = async (uri: string) => {
        setAvatar(uri);
        await saveAvatar(uri);

        if (user) {
            const updated = { ...user, avatar: uri };
            await saveSession(updated);
            dispatch(updateUser(updated));
        }
    };

    const selectImage = () => {
        Alert.alert('Profile Picture', 'Choose an option', [
            {
                text: 'Camera',
                onPress: async () => {
                    const result = await launchCamera({ mediaType: 'photo', cameraType: 'front' });
                    const uri = result.assets?.[0]?.uri;
                    if (uri) await updateAvatar(uri);
                }
            },
            {
                text: 'Gallery',
                onPress: async () => {
                    const result = await launchImageLibrary({ mediaType: 'photo' });
                    const uri = result.assets?.[0]?.uri;
                    if (uri) await updateAvatar(uri);
                }
            },
            { text: 'Cancel', style: 'cancel' }
        ]);
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    dispatch(logout());
                    try {
                        await clearSession();
                    } catch (error) {
                        console.log('Logout storage error:', error);
                    }
                }
            }
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

            <TouchableOpacity onPress={selectImage} style={styles.avatarContainer}>
                {avatar ?
                    <Image source={{ uri: avatar }} style={styles.avatar} /> :
                    <View style={[styles.placeholder, { backgroundColor: colors.primary }]}>
                        <Text style={styles.placeholderText}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </Text>
                    </View>
                }
                <Text style={[styles.change, { color: colors.primary }]}>Change Photo</Text>
            </TouchableOpacity>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
                <Text style={[styles.info, { color: colors.secondaryText }]}>
                    Phone: {user?.phone}
                </Text>
                <Text style={[styles.info, { color: colors.secondaryText }]}>
                    Email: {user?.email}
                </Text>
            </View>

            <View style={[styles.themeRow, { backgroundColor: colors.card }]}>
                <Text style={[styles.themeText, { color: colors.text }]}>Dark Mode</Text>
                <Switch
                    value={theme === 'dark'}
                    onValueChange={toggleTheme}
                    trackColor={{ true: colors.primary }}
                />
            </View>

            <AppButton title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 30, fontWeight: '800', marginBottom: 25 },
    avatarContainer: { alignItems: 'center', marginBottom: 25 },
    avatar: { width: 110, height: 110, borderRadius: 55 },
    placeholder: { width: 110, height: 110, borderRadius: 55, justifyContent: 'center', alignItems: 'center' },
    placeholderText: { fontSize: 45, color: '#fff', fontWeight: '800' },
    change: { fontSize: 14, fontWeight: '700', marginTop: 10 },
    card: { borderWidth: 1, borderRadius: 15, padding: 18, marginBottom: 15 },
    name: { fontSize: 22, fontWeight: '800', marginBottom: 10 },
    info: { fontSize: 15, marginTop: 5 },
    themeRow: { height: 60, borderRadius: 12, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15 },
    themeText: { fontSize: 16, fontWeight: '600' }
});

export default ProfileScreen;