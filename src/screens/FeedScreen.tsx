import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { FeedStackParamList } from '../types/navigation';
import { AppDispatch, RootState } from '../store/store';
import { setError, setLoading, setPosts, setRefreshing, toggleLike } from '../store/postsSlice';
import { getPosts } from '../services/api';
import { useTheme } from '../hooks/useTheme';
import PostCard from '../components/PostCard';

type Props = NativeStackScreenProps<FeedStackParamList, 'FeedHome'>;

const FeedScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { colors } = useTheme();
    const { posts, loading, refreshing, error } = useSelector((state: RootState) => state.posts);

    const loadPosts = useCallback(async (refresh = false) => {
        try {
            dispatch(refresh ? setRefreshing(true) : setLoading(true));
            dispatch(setError(null));
            const data = await getPosts();
            dispatch(setPosts(data));
        } catch {
            dispatch(setError('Unable to load posts.'));
        } finally {
            dispatch(refresh ? setRefreshing(false) : setLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: colors.secondaryText, marginTop: 10 }}>
                    Loading posts...
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Community</Text>

            {error && (
                <Text style={[styles.error, { color: colors.danger }]}>
                    {error}
                </Text>
            )}

            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => loadPosts(true)}
                        colors={[colors.primary]}
                    />
                }
                contentContainerStyle={posts.length === 0 ? styles.emptyContainer : undefined}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={{ fontSize: 45 }}>📭</Text>
                        <Text style={[styles.emptyTitle, { color: colors.text }]}>
                            No posts
                        </Text>
                        <Text style={{ color: colors.secondaryText }}>
                            Pull down to refresh.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <PostCard
                        post={item}
                        onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
                        onLike={() => dispatch(toggleLike(item.id))}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 30, fontWeight: '800', marginBottom: 15 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    error: { textAlign: 'center', marginBottom: 10 },
    emptyContainer: { flexGrow: 1, justifyContent: 'center' },
    empty: { alignItems: 'center' },
    emptyTitle: { fontSize: 20, fontWeight: '700', marginTop: 10, marginBottom: 5 }
});

export default FeedScreen;