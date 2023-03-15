import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.js"
import HomeLayout from "./components/HomeLayout/HomeLayout.js";
import Home from "./components/pages/Home.js";
import LoginLayout from "./components/LoginLayout/LoginLayout.js";
import Register from "./components/pages/Register.js";
import PostList from "./components/pages/PostList.js";
import AddPost from "./components/pages/AddPost.js";
import UpdatePost from "./components/pages/UpdatePost.js";




function App() {
  return (
    <div className="App">

      <Router>
        <Routes>

        <Route element={<HomeLayout />} >
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<LoginLayout />} path="/">
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/posts" element={<PostList />} />
        <Route path="/add" element={<AddPost />} />
        <Route path="/posts/update/:id" element={<UpdatePost />} />

        </Routes>
      </Router> 



    </div>
  );
}

export default App;
