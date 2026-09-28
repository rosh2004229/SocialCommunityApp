export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    SignUp: undefined;
};

export type MainTabParamList = {
    Feed: undefined;
    Profile: undefined;
};

export type FeedStackParamList = {
    FeedHome: undefined;
    PostDetails: { postId: string };
};