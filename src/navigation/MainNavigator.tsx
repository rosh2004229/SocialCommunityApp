import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@react-native-vector-icons/ionicons';
import { FeedStackParamList, MainTabParamList } from '../types/navigation';
import FeedScreen from '../screens/FeedScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useTheme } from '../hooks/useTheme';

const FeedStack = createNativeStackNavigator<FeedStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const FeedNavigator = () => {
    return (
        <FeedStack.Navigator>
            <FeedStack.Screen
                name="FeedHome"
                component={FeedScreen}
                options={{ headerShown: false }}
            />
            <FeedStack.Screen
                name="PostDetails"
                component={PostDetailsScreen}
                options={{ title: 'Post Details' }}
            />
        </FeedStack.Navigator>
    );
};

const MainNavigator = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondaryText,
                tabBarStyle: { height: 65, paddingBottom: 8 },
                tabBarIcon: ({ color, size }) => {
                    const name = route.name === 'Feed' ? 'home-outline' : 'person-outline';
                    return <Ionicons name={name} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen name="Feed" component={FeedNavigator} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;