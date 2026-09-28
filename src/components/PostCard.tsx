import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Post } from '../types/post';
import { useTheme } from '../hooks/useTheme';

interface Props {
    post: Post;
    onPress: () => void;
    onLike: () => void;
}

const PostCard = ({ post, onPress, onLike }: Props) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.header}>
                <Image source={{ uri: post.avatar }} style={styles.avatar} />
                <Text style={[styles.name, { color: colors.text }]}>{post.userName}</Text>
            </View>

            <Text style={[styles.text, { color: colors.text }]}>{post.text}</Text>

            <Image source={{ uri: post.image }} style={styles.image} />

            <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={onLike}>
                    <Ionicons
                        name={post.liked ? 'heart' : 'heart-outline'}
                        size={24}
                        color={post.liked ? '#FF3B30' : colors.text}
                    />
                    <Text style={{ color: colors.text }}>{post.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={onPress}>
                    <Ionicons name="chatbubble-outline" size={22} color={colors.text} />
                    <Text style={{ color: colors.text }}>{post.comments.length}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { borderWidth: 1, borderRadius: 15, padding: 14, marginBottom: 15 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 10 },
    name: { fontSize: 16, fontWeight: '700' },
    text: { fontSize: 15, lineHeight: 22, marginBottom: 12 },
    image: { width: '100%', height: 220, borderRadius: 12 },
    actions: { flexDirection: 'row', gap: 22, marginTop: 12 },
    action: { flexDirection: 'row', alignItems: 'center', gap: 6 }
});

export default PostCard;