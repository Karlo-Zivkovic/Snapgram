import { SignUpProps } from "../features/authentication/queryHooks/useSignUp";
import { supabase } from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function singUp({ name, userName, email, password }: SignUpProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        userName,
        imageUrl: "",
        bio: "",
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }

  if (data!.user) {
    await uploadUserToDB({ user: data.user });
    return data;
  } else {
    throw new Error("User data is null");
  }
}
export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function uploadUserToDB({ user }: { user: any }) {
  const sendingObj = {
    name: user.user_metadata.name,
    userName: user.user_metadata.userName,
    email: user.email,
    accountId: user.id,
  };

  const { error } = await supabase.from("users").insert(sendingObj).select();
  if (error) {
    throw new Error(error.message);
  }
}
