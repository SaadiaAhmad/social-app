export interface Post {
    id: string;
    title: string;
    content: string;
    imagePath?: string;
}

export interface PostData {
    posts: Post[],
    postCount: number
}