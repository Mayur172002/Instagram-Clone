import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.css';
import Home from "./page/home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Profile from "./page/Profile";
import Addpost from "./page/Addpost";



function App() {
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addpost" element={<Addpost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
