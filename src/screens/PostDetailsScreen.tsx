import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { FeedStackParamList } from '../types/navigation';
import { AppDispatch, RootState } from '../store/store';
import { addComment } from '../store/postsSlice';
import { getComments, saveComments } from '../services/storage';
import { Comment } from '../types/post';
import { useTheme } from '../hooks/useTheme';
import PostCard from '../components/PostCard';
import CommentItem from '../components/CommentItem';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';

type Props = NativeStackScreenProps<FeedStackParamList, 'PostDetails'>;

const PostDetailsScreen = ({ route, navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { colors } = useTheme();
    const post = useSelector((state: RootState) => state.posts.posts.find(item => item.id === route.params.postId));
    const [userComment, setUserComment] = useState('');

    useEffect(() => {
        if (!post) return;

        getComments(post.id).then(localComments => {
            localComments.forEach(comment => {
                if (!post.comments.some(item => item.id === comment.id)) {
                    dispatch(addComment({ postId: post.id, comment }));
                }
            });
        });
    }, [post?.id, dispatch]);

    if (!post) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text }}>Post not found</Text>
            </View>
        );
    }

    const handleComment = async () => {
        if (!userComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            userName: 'You',
            text: userComment.trim(),
            createdAt: new Date().toISOString()
        };

        const updatedComments = [...post.comments, comment];

        dispatch(addComment({ postId: post.id, comment }));
        await saveComments(post.id, updatedComments);
        setUserComment('');
    };

    return (
        <KeyboardAvoidingView
            style={[styles.screen, { backgroundColor: colors.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <PostCard
                    post={post}
                    onPress={() => { }}
                    onLike={() => { }}
                />

                <Text style={[styles.heading, { color: colors.text }]}>
                    Comments ({post.comments.length})
                </Text>

                {post.comments.length === 0 && (
                    <Text style={{ color: colors.secondaryText }}>
                        No comments yet.
                    </Text>
                )}

                {post.comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}

                <AppInput
                    label="Add Comment"
                    placeholder="Write a comment..."
                    value={userComment}
                    onChangeText={setUserComment}
                    multiline
                    textAlignVertical="top"
                    style={styles.commentInput}
                />

                <AppButton title="Post Comment" onPress={handleComment} />

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={[styles.back, { color: colors.primary }]}>
                        Back to Feed
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    container: { padding: 16, paddingBottom: 40 },
    heading: { fontSize: 22, fontWeight: '800', marginVertical: 15 },
    commentInput: { minHeight: 100, paddingTop: 14 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    back: { textAlign: 'center', fontWeight: '700', marginTop: 10 }
});

export default PostDetailsScreen;