import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Tab from "../components/Tab";
import { getMyBlogs, getPublicBlogs } from "../api/blogs/blogs.api";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { setBlogs, setPublicBlogs, setLoading } = useAuth();

  const fetch = () => {
    getPublicBlogs(setPublicBlogs, setLoading);
    getMyBlogs(setBlogs, setLoading);
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div className="min-h-screen relative w-full font-serif">
        <Link
          to="/create"
          className="fixed size-14 text-amber-400 cursor-pointer flex items-center justify-center border rounded-full border-amber-400 bg-amber-50/50 transition-colors hover:bg-amber-50 bottom-10 right-10"
        >
          <Plus />
        </Link>
        <Navbar />
        <Hero />
        <Tab fetch={fetch} />
      </div>
    </>
  );
};

export default Home;
