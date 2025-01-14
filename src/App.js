import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import SignUp from "./pages/auth/SignUp";
import PrivateRoute from "./routes/privateRoute";
import Dashboard from "./pages/auth/Dashborad";
import Users from "./pages/auth/Users";
import Surveys from "./pages/auth/Surveys";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AccountSettings from "./pages/auth/AccountSettings";
import ChangePassword from "./pages/auth/ChangePassword";
import Questions from "./pages/auth/Questions";
import AddQuestions from "./pages/auth/AddQuestions";
import EditQuestions from "./pages/auth/EditQuestions";
import DisplayRecords from "./pages/auth/DisplayRecords";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        < Dashboard/>
      </PrivateRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <PrivateRoute>
        < Users/>
      </PrivateRoute>
    ),
  },
  {
    path: "/surveys",
    element: (
      <PrivateRoute>
        < Surveys/>
      </PrivateRoute>
    ),
  },
  {
    path: "/accountSettings",
    element: (
      <PrivateRoute>
        < AccountSettings/>
      </PrivateRoute>
    ),
  },
  {
    path: "/changePassword",
    element: (
      <PrivateRoute>
        < ChangePassword/>
      </PrivateRoute>
    ),
  },
  {
    path: "/questions",
    element: (
      <PrivateRoute>
        < Questions/>
      </PrivateRoute>
    ),
  },
  {
    path: "/addQuestions",
    element: (
      <PrivateRoute>
        < AddQuestions/>
      </PrivateRoute>
    ),
  },
  {
    path: "/editQuestions",
    element: (
      <PrivateRoute>
        < EditQuestions/>
      </PrivateRoute>
    ),
  },
  {
    path: "/displayRecords",
    element: (
      <PrivateRoute>
        < DisplayRecords/>
      </PrivateRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
