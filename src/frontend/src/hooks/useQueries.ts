import { useMutation, useQuery } from "@tanstack/react-query";
import type { BlogPost } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPostById(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getBlogPostById(id);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching && id > 0n,
  });
}

export function useGetBlogPostsByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllBlogPosts();
      return actor.getBlogPostsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.subscribeNewsletter(email);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.submitContact(
        data.name,
        data.email,
        data.subject,
        data.message,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
  });
}
