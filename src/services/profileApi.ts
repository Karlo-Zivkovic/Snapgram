import { supabase } from "./supabase";

export async function updateProfile({
  name,
  bio,
  accountId,
}: {
  name: string;
  bio: string;
  accountId: string;
}) {
  const { error: updateUserError } = await supabase
    .from("users")
    .update({ bio, name })
    .eq("accountId", accountId)
    .select();

  if (updateUserError) {
    throw new Error(updateUserError.message);
  }

  const { data, error } = await supabase.auth.updateUser({
    data: {
      name,
      bio,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updatePicture(file: File) {
  await uploadPictureToDB(file);

  const imageUrl = `https://dfluxqymxlkbchyzzhge.supabase.co/storage/v1/object/public/app-images/${file.name}?t=2023-11-04T16%3A21%3A37.127Z`;
  const { data, error } = await supabase.auth.updateUser({
    data: {
      imageUrl,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function uploadPictureToDB(file: File) {
  const images = await getPicturesStorage();
  let alreadyExists = false;

  for (let i = 0; i < images.length; i++) {
    if (images[i].name === file.name) alreadyExists = true;
  }

  if (!alreadyExists) {
    const { error } = await supabase.storage
      .from("app-images")
      .upload(file.name, file);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    return null;
  }
}

export async function getPicturesStorage() {
  const { data, error } = await supabase.storage.from("app-images").list();
  if (error) {
    throw new Error("Could not fetch storage pictures");
  }
  return data;
}

export async function updateUsersPicture(file: File, id: string) {
  const imageUrl = `https://dfluxqymxlkbchyzzhge.supabase.co/storage/v1/object/public/app-images/${file.name}`;

  const { error } = await supabase
    .from("users")
    .update({ imageUrl })
    .eq("accountId", id)
    .select();
  if (error) {
    throw new Error(error.message);
  }
}

export async function getParamUser(user_id: string) {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("accountId", user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return users;
}
