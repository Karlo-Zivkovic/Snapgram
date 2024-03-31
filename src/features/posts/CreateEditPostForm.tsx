import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, SubmitHandler } from "react-hook-form";
import Loader from "../../ui/Loader";
import { useCreatePost } from "./queryHooks/useCreatePost";
import { useGetUser } from "../authentication/queryHooks/useGetUser";
import { useUploadPostPicture } from "./queryHooks/useUploadPostPicture";
import { useDeleteImage } from "./queryHooks/useDeleteImage";
import { useNavigate } from "react-router-dom";
import { useEditPost } from "./queryHooks/useEditPost";

type FormValues = {
  caption: string;
  image: string;
  location: string;
  tags: string;
};
interface CreateEditPostFormProps {
  post: {
    id: number;
    caption: string;
    location: string;
    imageUrl: string;
    tags: string;
  };
}
const CreateEditPostForm: FC<CreateEditPostFormProps> = ({ post }) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { creatingPost, isCreatingPost } = useCreatePost();
  const { editingPost, isEditingPost } = useEditPost();
  const { user } = useGetUser();
  const { updatingPostPicture, isUpdatingPostPicture } = useUploadPostPicture();
  const { deletingImage } = useDeleteImage();
  const navigate = useNavigate();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const image = acceptedFiles[0];
      if (file) {
        deletingImage(file); // Function to delete the old image
      }
      // Upload the new image
      updatingPostPicture(image);

      setFile(image);
    },
    [deletingImage, updatingPostPicture, file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      caption: post?.caption,
      location: post?.location,
      tags: post?.tags,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ caption, location, tags }) => {
    if (post) {
      editingPost({
        caption,
        location,
        tags,
        id: post.id,
        imageUrl: file === undefined ? post.imageUrl : file,
      });
    } else {
      creatingPost({ caption, file, location, tags, user_id: user!.id });
    }
  };

  function handleCancelClick() {
    if (post) {
      navigate(-1);
    }
    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex flex-col gap-10 pb-32 md:pb-0 lg:pb-12"
    >
      <div className="flex flex-col gap-2 text-slate-50">
        <label className="text-sm font-semibold" htmlFor="caption">
          Caption
        </label>
        <textarea
          {...register("caption", {
            required: "This field is required",
            maxLength: {
              value: 2200,
              message: "Maximum 2,200 caracters",
            },
            minLength: {
              value: 5,
              message: "Minimum 5 characters.",
            },
          })}
          id="caption"
          className="px-2 py-1 bg-stone-900 outline-none ring-1 focus:ring-violet-300 rounded-md w-full"
          rows={4}
        />
        <p className="text-red-500">{errors.caption?.message}</p>
      </div>
      <div className="flex flex-col gap-2 text-slate-50">
        <label className=" text-sm font-semibold" htmlFor="image">
          Add Photos
        </label>
        <div
          {...getRootProps({
            className: `h-[45vh] lg:h-[55vh] md:h-[30vh] bg-stone-900 flex flex-col gap-2 text-slate-50 ${
              file && "border"
            } outline-none ring-1 focus:ring-violet-300 rounded-md w-full cursor-pointer flex justify-center items-center overflow-hidden`,
          })}
        >
          {isUpdatingPostPicture ? (
            <Loader size="medium" />
          ) : file || post ? (
            <div className="flex flex-col justify-center items-center">
              <img
                src={
                  file
                    ? `https://dfluxqymxlkbchyzzhge.supabase.co/storage/v1/object/public/app-images/${file?.name}`
                    : post
                      ? post.imageUrl
                      : undefined
                }
                alt="input file img"
                className="object-cover rounded-xl w-full h-full"
              />
              <p className="text-violet-400 text-center absolute opacity-50  mt-3  pt-2  w-full  bottom-7">
                Click or drag photo to replace &uarr;
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img src="file-upload.svg" className="h-24 w-24" alt="" />
              <p className="text-base font-medium">Drag photo here</p>
              <p className="text-base text-violet-500 opacity-60">
                SVG, PNG, JPG
              </p>
              <p className="text-sm font-semibold w-[10rem] text-center py-2.5 rounded-md bg-stone-600 mt-4">
                Select from computer
              </p>
            </div>
          )}
          <input {...getInputProps()} id="image" type="file" className=" " />
        </div>
        {file ? null : (
          <p className="text-violet-400 opacity-60 text-xs font-semibold">
            Picture is required
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2 text-slate-50">
        <label className="text-sm font-semibold" htmlFor="location">
          Add Location
        </label>
        <input
          {...register("location", {
            required: "This field is required",
            maxLength: {
              value: 1000,
              message: "Maximum 1000 characters",
            },
          })}
          id="location"
          className="px-2 py-1 bg-stone-900 outline-none ring-1 focus:ring-violet-300 h-11 rounded-md w-full"
        />
        <p className="text-red-500">{errors.location?.message}</p>
      </div>
      <div className="flex flex-col gap-2 text-slate-50">
        <label className="text-sm font-semibold" htmlFor="tags">
          Add Tags{" "}
          <span className="text-gray-500 text-xs font-basic">
            (separated by comma " , ")
          </span>
        </label>
        <input
          {...register("tags", {
            required: "Put at least 1 tag",
          })}
          placeholder="Art, Expression, Learn"
          id="tags"
          className="px-2 py-1 bg-stone-900 placeholder:opacity-50 outline-none ring-1 focus:ring-violet-300 h-11 rounded-md w-full"
        />
        <p className="text-red-500">{errors.tags?.message}</p>
      </div>
      <div className="flex text-slate-50 justify-end gap-4 text-sm">
        <button
          onClick={handleCancelClick}
          className="px-6 rounded-md bg-stone-800 hover:bg-stone-700"
        >
          Cancel
        </button>
        <button
          disabled={file === undefined && !post?.imageUrl}
          className="py-3 px-6 bg-violet-500 rounded-md hover:bg-violet-600 font-semibold disabled:cursor-not-allowed"
          type="submit"
        >
          {isCreatingPost || isEditingPost ? (
            <Loader size="small" />
          ) : post ? (
            "Edit Post"
          ) : (
            "Create Post"
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateEditPostForm;
