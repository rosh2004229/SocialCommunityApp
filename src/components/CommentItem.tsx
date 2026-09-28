import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Comment } from '../types/post';
import { useTheme } from '../hooks/useTheme';

const CommentItem = ({ comment }: { comment: Comment }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.name, { color: colors.text }]}>{comment.userName}</Text>
            <Text style={[styles.text, { color: colors.secondaryText }]}>{comment.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { borderWidth: 1, borderRadius: 10, padding: 12, marginBottom: 8 },
    name: { fontWeight: '700', marginBottom: 4 },
    text: { fontSize: 14 }
});

export default CommentItem;