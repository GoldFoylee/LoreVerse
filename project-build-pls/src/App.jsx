import { Routes, Route } from "react-router-dom";
import Chatbot from './components/chatbot';
import Signup from './components/signup';
import Login from './components/login'; 
import Post from './components/posts';
import Feed from "./components/feed";
import PostDetail from './components/postdetail';
import Header from "./components/header";
import MyProfile from "./components/profile";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5EEDD] text-[#06202B]">
      <Header />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/post" element={<Post />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
