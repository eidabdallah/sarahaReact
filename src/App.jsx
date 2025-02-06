import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePageWebSite from "./Pages/HomePageWebSite/HomePageWebSite.jsx";
import NotFound from "./Pages/Shared/NotFound.jsx";
import Login from "./Pages/Auth/Login/Login.jsx";
import AuthLayout from "./Layout/AuthLayout.jsx";
import AuthProtectedRoutes from "./Components/Shared/AuthProtectedRoutes.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./Components/Shared/ProtectedRoutes.jsx";
import Home from "./Pages/Shared/Home/Home.jsx";
import AdminLayout from "./Layout/AdminLayout.jsx";
import UserLayout from "./Layout/UserLayout.jsx";
import Register from "./Pages/Auth/Register/Register.jsx";
import SendCode from "./Pages/Auth/SendCode/SendCode.jsx";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword.jsx";
import { UserContextProvider } from "./Context/UserContext.jsx";
import SendMessage from "../src/Pages/Shared/SendMessage/SendMessage.jsx";
import MyMessages from "../src/Pages/Shared/MyMessages/MyMessages.jsx";
import Profile from "./Pages/Shared/Profile/Profile.jsx";
import ChangePassword from "./Pages/Auth/ChangePassword/ChangePassword.jsx";
import DisplayUser from "./Pages/Admin/DisplayUser/DisplayUser.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePageWebSite />,
    },
    {
      path: "/auth",
      element: (
        <AuthProtectedRoutes>
          <AuthLayout />
        </AuthProtectedRoutes>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgotPassword", element: <ForgotPassword /> },
        { path: "sendCode", element: <SendCode /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <UserContextProvider>
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        </UserContextProvider>
      ),
      children: [
        { path: "", element: <Home /> },
        { path: "allUser", element: <DisplayUser /> },
        { path: "profile", element: <Profile /> },
        { path: "sendMessage", element: <SendMessage /> },
        { path: "messages", element: <MyMessages /> },
        { path: "changePassword", element: <ChangePassword /> },
      ],
    },
    {
      path: "/user",
      element: (
        <UserContextProvider>
          <ProtectedRoutes>
            <UserLayout />
          </ProtectedRoutes>
        </UserContextProvider>
      ),
      children: [
        { path: "", element: <Home /> },
        { path: "sendMessage", element: <SendMessage /> },
        { path: "messages", element: <MyMessages /> },
        { path: "profile", element: <Profile /> },
        { path: "changePassword", element: <ChangePassword /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
