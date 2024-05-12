import App from "./src/App";
import Home from "./src/components/Home";
import Logout from "./src/components/Logout";
import Signup from "./src/components/Signup";
import Login from "./src/components/Login";
import Landing from "./src/components/Landing";
import UserProfile from "./src/components/UserProfile";
import ChangePassword from "./src/components/ChangePassword";
import AdminDashboard from "./src/components/AdminDashboard";
import Messages from "./src/components/Messages";

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/fanclubs/:id/',
        element: <Landing />
      },
      {
        path: '/user/:id',
        element: <UserProfile />
      },
      {
        path: '/user/:id/messages',
        element: <Messages />
      },
      {
        path: '/admin/notifications',
        element: <AdminDashboard />
      },
      {
        path: '/user/:id/changepassword',
        element: <ChangePassword />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  
];

export default routes;