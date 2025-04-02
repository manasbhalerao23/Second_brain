import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { CircleX } from "lucide-react";

interface AuthFormProps {
  endpoint: string;
}

type FormData = {
  username: string;
  password: string;
};

function AuthForm({ endpoint }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/${endpoint}`,
        { username: data.username, password: data.password },
        { withCredentials: true }
      );
      localStorage.setItem("isblogin", "true");
      navigate("/brain");
    } catch (e) {
      if (e instanceof AxiosError) {
        setError("root.serverError", { message: e.response?.data.error });
      } else {
        setError("root.serverError", { message: "Something went wrong." });
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center px-6 py-4 text-sm w-full md:max-w-md text-center bg-black-50 shadow-lg rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-semibold mb-4">
        {endpoint === "signup" ? "Create an Account" : "Sign In"}
      </h2>
      
      <div className="w-full">
        <input
          type="text"
          id="username"
          className="w-full py-2 px-4 border border-gray-300 rounded-md bg-black-50 focus:ring-2 focus:ring-primary focus:outline-none mb-3"
          placeholder="Username"
          {...register("username", { required: "Username is required." })}
        />
        {errors.username && (
          <p className="text-red-500 text-left flex items-center gap-1 mb-3">
            <CircleX size={14} className="mt-0.5" />
            <span>{errors.username.message}</span>
          </p>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          id="password"
          className="w-full py-2 px-4 border border-gray-300 rounded-md bg-black-50 focus:ring-2 focus:ring-primary focus:outline-none mb-3"
          placeholder="Password"
          {...register("password", { required: "Password is required." })}
        />
        {errors.password && (
          <p className="text-red-500 text-left flex items-center gap-1 mb-3">
            <CircleX size={14} className="mt-0.5" />
            <span>{errors.password.message}</span>
          </p>
        )}
      </div>

      {errors.root?.serverError && (
        <p className="text-red-500 text-left flex items-center gap-1 mb-3">
          <CircleX size={14} className="mt-0.5" />
          <span>{errors.root.serverError.message}</span>
        </p>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 font-medium rounded-md bg-primary text-white transition-all duration-300 hover:bg-opacity-80 mb-3"
      >
        {endpoint === "signup" ? "Create Account" : "Log In"}
      </button>

      {endpoint === "signin" ? (
        <p className="text-gray-600 text-sm">
          Don't have an account?
          <Link to="/signup" className="text-primary font-medium hover:underline ml-1">
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-gray-600 text-sm">
          Already have an account?
          <Link to="/signin" className="text-primary font-medium hover:underline ml-1">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
