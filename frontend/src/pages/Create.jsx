import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBlogs } from "../api/blogs/blogs.api";

const schema = yup.object({
  title: yup
    .string()
    .max(20, "Title must be 20 characters only")
    .required("This is a required field."),

  body: yup
    .string()
    .max(400, "Body must be 400 characters only")
    .required("This is a required field"),

  visibility: yup.string().required("This is a required field"),
});

const Create = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await createBlogs(data, navigate);
    reset();
  };

  return (
    <div className="w-full relative min-h-screen flex bg-gray-50 font-serif items-center justify-center">
      <Link
        to="/"
        className="absolute top-5 left-5 text-gray-600 cursor-pointer"
      >
        <MoveLeft />
      </Link>
      <div className="w-10/12 md:w-2/3 lg:w-1/3 mx-auto bg-white shadow-md rounded-xl">
        <h2 className="text-center text-3xl font-semibold tracking-wide pt-4">
          Create Blog
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex flex-col items-center justify-start p-4"
        >
          {/* Title  */}
          <div className="flex flex-col gap-2 w-full p-4">
            <label
              htmlFor="title"
              className="text-lg text-gray-600 font-medium"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              {...register("title")}
              placeholder="Enter Title"
              className="w-full p-3 pl-4 outline-0 border-2 border-gray-300 rounded-lg focus:border-amber-200 transition-all duration-500"
            />
            {errors && (
              <span className="text-red-500 text-sm">
                {errors?.title?.message}
              </span>
            )}
          </div>
          {/* Description  */}
          <div className="flex flex-col gap-2 w-full p-4">
            <label htmlFor="body" className="text-lg text-gray-600 font-medium">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              className="w-full p-3 pl-4 outline-0 border-2 border-gray-300 rounded-lg focus:border-amber-200 transition-all duration-500"
              name="body"
              {...register("body")}
              id=""
            ></textarea>
            {errors && (
              <span className="text-red-500 text-sm">
                {errors?.body?.message}
              </span>
            )}
          </div>
          {/* Visibility  */}
          <div className="flex flex-col gap-2 w-full p-4">
            <label htmlFor="" className="text-lg text-gray-600 font-medium">
              Visibility
            </label>
            <select
              name="visibility"
              id=""
              defaultValue="public"
              {...register("visibility")}
              className="w-full p-3 pl-4 outline-0 border-2 border-gray-300 rounded-lg focus:border-amber-200 transition-all duration-500 cursor-pointer"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {errors && (
              <span className="text-red-500 text-sm">
                {errors?.visibility?.message}
              </span>
            )}
          </div>
          {/* Button  */}

          <button
            type="submit"
            className="p-2 mt-6 px-8 cursor-pointer hover:bg-amber-50/50 border border-amber-300 transition-all text-amber-500 rounded-lg"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
