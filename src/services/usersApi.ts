import { supabase } from "./supabase";

export async function getAllUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return users;
}

export async function getAllFollowers() {
  const { data: followers, error } = await supabase
    .from("followers")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return followers;
}

export async function toggleFollowUser(
  follower_id: string,
  followed_id: string
) {
  const existingFollows = await checkFollowsExistance(follower_id, followed_id);

  if (existingFollows && existingFollows.length > 0) {
    await supabase
      .from("followers")
      .delete()
      .eq("follower_id", follower_id)
      .eq("followed_id", followed_id);
  } else {
    await supabase.from("followers").insert([{ follower_id, followed_id }]);
  }
}
export async function checkFollowsExistance(
  follower_id: string,
  followed_id: string
) {
  const { data: existingLikes, error } = await supabase
    .from("followers")
    .select("*")
    .eq("follower_id", follower_id)
    .eq("followed_id", followed_id);

  if (error) {
    throw new Error(error.message);
  }

  return existingLikes;
}
