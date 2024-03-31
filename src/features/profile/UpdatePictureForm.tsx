import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUpdatePicture } from "./queryHooks/useUpdatePicture";
import Loader from "../../ui/Loader";
import { useGetUser } from "../authentication/queryHooks/useGetUser";
import { updateUsersPicture } from "../../services/profileApi";

const UpdatePictureForm: FC = () => {
  const { user } = useGetUser();
  const { updatingPicture, isUpdatingPicture } = useUpdatePicture();
  const userId = user?.id || "";

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      updatingPicture(acceptedFiles[0]);
      updateUsersPicture(acceptedFiles[0], userId);
    },
    [updatingPicture, userId],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex gap-4 items-center mt-14">
      <img
        className="h-28 w-28 rounded-full"
        src={user?.user_metadata.imageUrl || "profile-placeholder.svg"}
        alt="profile picture"
      />{" "}
      <div
        {...getRootProps()}
        className="text-violet-500 text-sm cursor-pointer hover:text-violet-600"
      >
        <input {...getInputProps()} type="file" />
        {isUpdatingPicture ? (
          <div className="ml-10">
            <Loader size="medium" />
          </div>
        ) : isDragActive ? (
          <div>
            Change profile photo
            <p>Drop the files here ...</p>
          </div>
        ) : (
          <div>
            Change profile photo
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePictureForm;
