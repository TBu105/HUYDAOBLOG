import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import CreatePostRichText from "./pages/CreatePostRichText";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import PostDetail from "./pages/PostDetail";
import NotFound from "./pages/NotFoundPage";

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen font-mono">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/create" element={<CreatePost />} /> */}
          <Route path="/create" element={<CreatePostRichText />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/edit" element={<EditPost />} />
          <Route path="/delete/:id" element={<DeletePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
