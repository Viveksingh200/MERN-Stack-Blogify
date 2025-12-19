import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../api/users/apiUser.js";
import { useAuth } from "../context/AuthContext.jsx";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid Email")
    .required("This is a required field."),

  password: yup
    .string()
    .min(6, "Password must be 6 characters long")
    .required(),
});

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {setUser, setUserToken, navigate} = useAuth();

  const handleLogin = async (data) => {
    await loginUser(data, reset, setUser, setUserToken, navigate);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-sky-50/30">
      <div className="shadow w-1/3 rounded-md bg-white p-6">
        <h1 className="text-3xl text-center font-semibold text-indigo-500">
          Login Form
        </h1>

        <form onSubmit={handleSubmit(handleLogin)} className="mt-8 space-y-6">
          <div className="flex w-full gap-2 flex-col">
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              {...register("email")}
              className="outline-0 focus:border-indigo-400 transition-colors border-2 border-gray-300 p-2 rounded-md"
            />
            {errors && (
              <span className="text-sm text-red-600">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="flex w-full gap-2 flex-col">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              {...register("password")}
              className="outline-0 focus:border-indigo-400 transition-colors border-2 border-gray-300 p-2 rounded-md"
            />
            {errors && (
              <span className="text-sm text-red-600">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full mx-auto flex items-center justify-center bg-indigo-600 text-white p-2 cursor-pointer rounded-md"
          >
            Login
          </button>
          <p className="flex justify-center gap-2 items-center text-indigo-500">
            Don&apos;t have an account ?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;