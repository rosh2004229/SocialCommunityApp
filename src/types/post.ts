export interface Comment {
    id: string;
    userName: string;
    text: string;
    createdAt: string;
}

export interface Post {
    id: string;
    userName: string;
    avatar: string;
    text: string;
    image: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
}

export interface PostsState {
    posts: Post[];
    loading: boolean;
    refreshing: boolean;
    error: string | null;
}