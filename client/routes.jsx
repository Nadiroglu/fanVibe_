import App from "./src/App";
import Home from "./src/components/Home";
import Logout from "./src/components/Logout";
import Signup from "./src/components/Signup";
import Login from "./src/components/Login";

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
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
];

export default routes;
