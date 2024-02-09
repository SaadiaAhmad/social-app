export interface Post {
    id: string;
    title: string;
    content: string;
    imagePath?: string;
    owner: string;
}

export interface PostData {
    posts: Post[],
    postCount: number
}