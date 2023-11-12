import { ClipLoader } from "react-spinners";

const sizes = {
  small: 25,
  medium: 35,
  big: 50,
};

type Size = keyof typeof sizes;

function Loader({ size }: { size: Size }) {
  return (
    <div className="flex justify-center items-center overflow-hidden">
      <ClipLoader color="#f8fafc" size={sizes[size]} />
    </div>
  );
}

export default Loader;
