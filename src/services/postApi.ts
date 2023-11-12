import { CreatePostProps } from "../features/posts/queryHooks/useCreatePost";
import { EditPostProps } from "../features/posts/queryHooks/useEditPost";
import { supabase } from "./supabase";

export async function getAllPosts() {
  const { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return posts;
}

export async function getPost(postId: string) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*, users(*)")
    .eq("id", postId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return post;
}

export async function getCurUserPosts(
  user_id: string | undefined,
  pageParam: number,
  fetchLikedPosts: boolean = false
) {
  if (fetchLikedPosts) {
    const { data: likedPosts, error } = await supabase
      .from("likes")
      .select("post_id")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error.message);
    }

    const likedPostIds = likedPosts.map((like) => like.post_id);

    const { data: posts, error: postsError } = await supabase
      .from("posts")
      .select("*")
      .in("id", likedPostIds)
      .range(pageParam * 4, pageParam * 4 + 4)
      .order("created_at", { ascending: false });

    if (postsError) {
      throw new Error(postsError.message);
    }

    return posts;
  } else {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user_id)
      .range(pageParam * 6, pageParam * 6 + 5)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return posts;
  }
}

export async function getCurUserSavedPosts(user_id: string) {
  const { data: posts, error } = await supabase
    .from("bookmarks")
    .select("*, posts(*, users(imageUrl, name))")
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return posts;
}

export async function createPost({
  caption,
  file,
  location,
  tags,
  user_id,
}: CreatePostProps) {
  const imageUrl = `https://dfluxqymxlkbchyzzhge.supabase.co/storage/v1/object/public/app-images/${file?.name}`;

  const createPostObj = {
    caption,
    imageUrl,
    location,
    tags,
    user_id,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert(createPostObj)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function editPost({
  caption,
  location,
  tags,
  id,
  imageUrl,
}: EditPostProps) {
  let url;

  if (imageUrl instanceof File) {
    url = `https://dfluxqymxlkbchyzzhge.supabase.co/storage/v1/object/public/app-images/${imageUrl?.name}`;
  } else {
    url = imageUrl;
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ caption, location, tags, imageUrl: url })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getPosts({
  pageParam,
  searchTerm,
}: {
  pageParam: number;
  searchTerm?: string;
}) {
  if (searchTerm?.length) {
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(*)")
      .ilike("caption", `%${searchTerm}%`)
      .range(pageParam * 6, pageParam * 6 + 5);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } else {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*, users(*)")
      .range(pageParam * 6, pageParam * 6 + 5)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return posts;
  }
}

export async function deleteImage(file: File) {
  const { error } = await supabase.storage
    .from("app-images")
    .remove([file.name]);
  if (error) {
    throw new Error(error.message);
  }
}

export async function toggleLike(post_id: string, user_id: string) {
  const existingLikes = await checkLikeExistance(post_id, user_id);

  if (existingLikes && existingLikes.length > 0) {
    await supabase
      .from("likes")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user_id);
  } else {
    await supabase.from("likes").insert([{ post_id, user_id }]);
  }
}

export async function checkLikeExistance(post_id: string, user_id: string) {
  const { data: existingLikes, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", post_id)
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return existingLikes;
}

export async function getLikes() {
  const { data: likes, error } = await supabase.from("likes").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return likes;
}

export async function toggleBookmark(post_id: string, user_id: string) {
  const existingBookmarks = await checkBookmarkExistance(post_id, user_id);

  if (existingBookmarks && existingBookmarks.length > 0) {
    await supabase
      .from("bookmarks")
      .delete()
      .eq("post_id", post_id)
      .eq("user_id", user_id);
  } else {
    await supabase.from("bookmarks").insert([{ post_id, user_id }]);
  }
}

export async function checkBookmarkExistance(post_id: string, user_id: string) {
  const { data: existingBookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("post_id", post_id)
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }
  return existingBookmarks;
}

export async function getBookmarks() {
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*");
  if (error) {
    throw new Error(error.message);
  }
  return bookmarks;
}

export async function deletePost(post_id: string) {
  await deleteAssociatedLikes(post_id);
  await deleteAssociatedBookmarks(post_id);
  const { error } = await supabase.from("posts").delete().eq("id", post_id);
  if (error) {
    throw new Error(error.message);
  }
}

async function deleteAssociatedLikes(post_id: string) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", post_id);

  if (error) {
    throw new Error(error.message);
  }
}

async function deleteAssociatedBookmarks(post_id: string) {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("post_id", post_id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getRelatedPosts(postId: number, tags: string) {
  const tagList = tags.split(/[ ,]+/);

  let relatedPosts: {
    id: number;
    imageUrl: string;
    users: { imageUrl: string; name: string };
  }[] = [];

  for (const tag of tagList) {
    const { data, error } = await supabase
      .from("posts")
      .select("*,users(*)")
      .ilike("tags", `%${tag}%`)
      .neq("id", postId);

    if (error) {
      throw new Error(error.message);
    }

    relatedPosts = [...relatedPosts, ...(data || [])];
  }

  // Remove duplicates
  relatedPosts = relatedPosts.filter(
    (post, index, self) => index === self.findIndex((p) => p.id === post.id)
  );

  // Limit to 10 related posts
  relatedPosts = relatedPosts.slice(0, 10);

  return relatedPosts;
}
