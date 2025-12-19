import toast from "react-hot-toast";
import { axiosInstance } from "../axios";

export const getPublicBlogs = async (setPublicBlogs, setLoading) => {
  try {
    const res = await axiosInstance.get("/blogs/public", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setPublicBlogs(res.data?.data);
  } catch (error) {
    toast.error("Error Fetching Public Blogs");
  } finally {
    setLoading(false);
  }
};

export const getMyBlogs = async (setBlogs, setLoading) => {
  try {
    const res = await axiosInstance.get("/blogs", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setBlogs(res.data?.data);
  } catch (error) {
    toast.error("Error Fetching Blogs");
  } finally {
    setLoading(false);
  }
};

export const createBlogs = async (data, navigate) => {
  try {
    const res = await axiosInstance.post("/blogs/create", data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    toast.success(res?.data?.message);
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Error creating blogs.");
  }
};

export const updateBlogs = async (data, id, navigate) =>{
  try {
    const res = await axiosInstance.put(`/blogs/update/${id}`,data, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    toast.success(res?.data?.message);
    navigate('/')
  } catch (error) {
     console.log(error);
    toast.error("Error update blogs.");
  }
}

export const deleteBlogs = async (id, fetch) =>{
  try {
    const res = await axiosInstance.delete(`/blogs/delete/${id}`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    toast.success(res?.data?.message);
    fetch();
  } catch (error) {
     console.error(error);
     toast.error("Error Delete blogs")
    
  }
}
