import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment, Post, PostsState } from '../types/post';

const initialState: PostsState = {
    posts: [],
    loading: false,
    refreshing: false,
    error: null
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setRefreshing: (state, action: PayloadAction<boolean>) => {
            state.refreshing = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const post = state.posts.find(item => item.id === action.payload);
            if (post) {
                post.liked = !post.liked;
                post.likes += post.liked ? 1 : -1;
            }
        },
        addComment: (state, action: PayloadAction<{ postId: string; comment: Comment }>) => {
            const post = state.posts.find(item => item.id === action.payload.postId);
            if (post) post.comments.push(action.payload.comment);
        }
    }
});

export const {
    setPosts,
    setLoading,
    setRefreshing,
    setError,
    toggleLike,
    addComment
} = postsSlice.actions;

export default postsSlice.reducer;