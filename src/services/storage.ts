import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';
import { Comment } from '../types/post';

const SESSION_KEY = 'SOCIAL_SESSION';
const USER_KEY = 'SOCIAL_USER';
const COMMENTS_KEY = 'SOCIAL_COMMENTS';
const THEME_KEY = 'SOCIAL_THEME';

export const saveSession = async (user: User) => {
    await AsyncStorage.setItem(SESSION_KEY, 'true');
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getSession = async (): Promise<User | null> => {
    const session = await AsyncStorage.getItem(SESSION_KEY);
    const user = await AsyncStorage.getItem(USER_KEY);
    if (session !== 'true' || !user) return null;
    return JSON.parse(user);
};

export const clearSession = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    await AsyncStorage.removeItem(USER_KEY);
};
export const saveComments = async (postId: string, comments: Comment[]) => {
    const data = await AsyncStorage.getItem(COMMENTS_KEY);
    const all = data ? JSON.parse(data) : {};
    all[postId] = comments;
    await AsyncStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
};

export const getComments = async (postId: string): Promise<Comment[]> => {
    const data = await AsyncStorage.getItem(COMMENTS_KEY);
    if (!data) return [];
    const all = JSON.parse(data);
    return all[postId] || [];
};

export const saveAvatar = async (uri: string) => {
    await AsyncStorage.setItem('SOCIAL_AVATAR', uri);
};

export const getAvatar = async () => {
    return AsyncStorage.getItem('SOCIAL_AVATAR');
};

export const saveTheme = async (theme: 'light' | 'dark') => {
    await AsyncStorage.setItem(THEME_KEY, theme);
};

export const getTheme = async (): Promise<'light' | 'dark' | null> => {
    const theme = await AsyncStorage.getItem(THEME_KEY);
    return theme === 'light' || theme === 'dark' ? theme : null;
};