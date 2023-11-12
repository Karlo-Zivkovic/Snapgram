import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./features/authentication/AuthLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AllUsers from "./pages/AllUsers";
import Saved from "./pages/Saved";
import CreatePost from "./pages/CreatePost";
import UpdateProfile from "./pages/UpdateProfile";
import PostDetails from "./features/posts/PostDetails";
import Profile from "./pages/Profile";
import ErrorFallback from "./ui/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import EditPost from "./pages/EditPost";
import RouteError from "./ui/RouteError";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.replace("/")}
        >
          <AppLayout />
        </ErrorBoundary>
      </ProtectedRoute>
    ),
    errorElement: <RouteError />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:user_id",
        element: <Profile />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/all-users",
        element: <AllUsers />,
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/update-profile/:id",
        element: <UpdateProfile />,
      },
      {
        path: "/post/:postId",
        element: <PostDetails />,
      },
      {
        path: "/edit-post/:postId",
        element: <EditPost />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "log-in",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Signup />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
