import { Blog } from "../models/blogSchema.js";

//Get All blog
export const getPublicBlogs = async(req, res) => {
    try {
         const allBlog = await Blog.find({visibility: "public"}).populate("author", "name email");
        if(!allBlog){
        return res.status(404).json({message: "No blogs found"})
    }

    return res.status(200).json({message: "Blogs fetched successfully", data: allBlog})
    } catch (error) {
        res.status(500).json({message: "error", error})
    }
}

//Create blog
export const createBlog = async(req, res) => {
    try {
        const {title, body, visibility} = req.body;

        if(!title || !body || !visibility) {
            return res.status(400).json({message: "All fields are required"});
        }

        const blog = await Blog.create({
            title,
            body,
            visibility,
            author: req.user.id
        });

        return res.status(201).json({message : "blog created successfully", data: blog});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

//Get my blogs
export const getMyBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find({author: req.user.id});
        if(!blogs){
            return res.status(404).json({message: "Blogs not found"})
        }

        return res.status(200).json({message: "User's blog fetched", data: blogs})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error", error});
    }
}

//Edit blog
export const updateBlog = async (req, res)=>{
  try {
    const {blogId} = req.params;
    const {title, body, visibility} = req.body;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({message: "Blog not found"});
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({message: "Unauthorized accsess"});
    }

    blog.title = title|| blog.title;
    blog.body = body || blog.body;
    blog.visibility = visibility || blog.visibility;

    await blog.save();

    return res.status(200).json({message: "Blog Updated succesfully", data: blog});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal server error"});
  
  }
}

//Delete blog
export const deleteBlog = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "Blog not found"});
        }

        if(blog.author.toString() !== req.user.id){
            return res.status(401).json({message: "Unauthorized access"});
        }

        await Blog.findByIdAndDelete(blogId);
        
        return res.status(200).json({message: "Blog deleted successfully"});
    } catch (error) {
     console.log(error);
     return res.status(500).json({message: "Internal server error"});   
    }
    
}
