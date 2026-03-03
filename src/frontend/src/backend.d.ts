import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: bigint;
    tags: Array<string>;
    author: string;
    imageUrl: string;
    excerpt: string;
    category: string;
}
export interface backendInterface {
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getBlogPostById(id: bigint): Promise<BlogPost>;
    getBlogPostsByCategory(category: string): Promise<Array<BlogPost>>;
    submitContact(name: string, email: string, subject: string, message: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    subscribeNewsletter(email: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
