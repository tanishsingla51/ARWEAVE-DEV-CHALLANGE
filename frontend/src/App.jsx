import { Routes, Route, BrowserRouter } from "react-router-dom";

import Signin from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import UpdateUser from "./pages/UpdateUser";
import CreatePost from "./pages/CreatePost";
import AllUserDetails from "./pages/AllUserDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/users" element={<AllUserDetails />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/update" element={<UpdateUser />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
