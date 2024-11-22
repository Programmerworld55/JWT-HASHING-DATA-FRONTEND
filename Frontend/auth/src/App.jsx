import { Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/signup";
import Login from "./components/Auth/Login";
import Form from "./components/Auth/form/Form";
import PrivateRoute from "./components/Auth/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/form"
          element={<PrivateRoute element={Form} />}
        />
      </Routes>
    </>
  );
}

export default App;
