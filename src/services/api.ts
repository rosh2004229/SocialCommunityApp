import { Post } from '../types/post';

const posts: Post[] = [
    {
        id: '1',
        userName: 'Rahul Sharma',
        avatar: 'https://i.pravatar.cc/150?img=12',
        text: 'Beautiful day to learn something new! 🚀',
        image: 'https://picsum.photos/id/1015/800/500',
        likes: 24,
        liked: false,
        comments: [
            { id: '1', userName: 'Priya', text: 'Great post!', 'createdAt': new Date().toISOString() },
            { id: '2', userName: 'Amit', text: 'Keep learning!', 'createdAt': new Date().toISOString() }
        ]
    },
    {
        id: '2',
        userName: 'Priya Patel',
        avatar: 'https://i.pravatar.cc/150?img=32',
        text: 'Working on my new React Native project today. 💻',
        image: 'https://picsum.photos/id/1/800/500',
        likes: 18,
        liked: false,
        comments: [
            { id: '3', userName: 'Rahul', text: 'All the best!', 'createdAt': new Date().toISOString() }
        ]
    },
    {
        id: '3',
        userName: 'Amit Kumar',
        avatar: 'https://i.pravatar.cc/150?img=52',
        text: 'Never stop learning and improving yourself. ❤️',
        image: 'https://picsum.photos/id/10/800/500',
        likes: 35,
        liked: false,
        comments: []
    },
    {
        id: '4',
        userName: 'Neha Singh',
        avatar: 'https://i.pravatar.cc/150?img=45',
        text: 'Enjoying the weekend with friends! 🌄',
        image: 'https://picsum.photos/id/29/800/500',
        likes: 42,
        liked: false,
        comments: []
    }
];

export const getPosts = async (): Promise<Post[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return posts.map(post => ({ ...post, comments: [...post.comments] }));
};