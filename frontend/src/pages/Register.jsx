import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { registerUser } from "../api/users/apiUser.js";
import { useAuth } from "../context/AuthContext.jsx";

const schema = yup.object({
  name: yup
    .string()
    .max(20, "Maximum characters exceed")
    .required("This is a required field"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("This is a required field."),

  password: yup
    .string()
    .min(6, "Password must be 6 characters long")
    .required(),
});

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {setUserToken, setUser, navigate} = useAuth();

  const handleRegister = async (data) => {
    await registerUser(data, reset, setUser, setUserToken, navigate);
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-sky-50/30">
      <div className="shadow w-1/3 rounded-md bg-white p-6">
        <h1 className="text-3xl text-center font-semibold text-indigo-500">
          Register Form
        </h1>
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-8 space-y-6"
        >
          <div className="flex w-full gap-2 flex-col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              {...register("name")}
              className="outline-0 focus:border-indigo-400 transition-colors border-2 border-gray-300 p-2 rounded-md"
            />
            {errors && (
              <span className="text-sm text-red-600">
                {errors?.name?.message}
              </span>
            )}
          </div>
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
            Register
          </button>
          <p className="flex justify-center gap-2 items-center text-indigo-500">
            Already have an account ?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;