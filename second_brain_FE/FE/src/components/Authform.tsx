import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { CircleX } from "lucide-react";

interface Authformprops {
    endpoint: string;
}

type Formdata = {
    username: string;
    password: string;
};

function Authform ({endpoint} : Authformprops){
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors}
    } = useForm<Formdata> ();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Formdata> = async (data) => {
        try{
            await axios.post(
                `${BACKEND_URL}/api/v1/${endpoint}`,
                {
                    username: data.username,
                    password: data.password
                },
                {
                    withCredentials: true
                }
            );
            localStorage.setItem("isblogin", "true");
            navigate('/brain');
        }
        catch(e) {
            if (e instanceof AxiosError) {
                setError("root.serverError", { message: e.response?.data.error });
              } else {
                setError("root.serverError", { message: "Something went wrong." });
              }
        }
    };


return(
    <form
      className="flex flex-col px-5 text-sm w-full md:max-w-sm text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        id="username"
        className="py-2 px-4 outline-1 outline-white/20 rounded-md bg-gray-300 mb-2"
        placeholder="Username"
        {...register("username", {
          required: "Username is required.",
        //   minLength: {
        //     value: 3,
        //     message: "Username should not be shorter than 3 character.",
        //   },
        //   maxLength: {
        //     value: 10,
        //     message: "Username should not be longer than 10 character.",
        //   },
        })}
      />
      {errors.username && (
        <p className="text-primary text-left flex justify-start items-start gap-1 mb-5">
          <CircleX size={14} className="mt-1" />
          <span>{errors.username.message}</span>
        </p>
      )}

      <input
        type="text"
        id="password"
        className="py-2 px-4 outline-1 outline-white/20 rounded-md bg-gray-300 mb-2"
        placeholder="Password"
        {...register("password", {
          required: "Password is required.",
        //   minLength: {
        //     value: 8,
        //     message: "Password should not be shorter than 8 character.",
        //   },
        //   maxLength: {
        //     value: 20,
        //     message: "Password should not be longer than 20 character.",
        //   }
        })}
      />

      {errors.password && (
        <p className="text-black-50 text-primary text-left flex justify-start items-start gap-1 mb-5">
          <CircleX size={14} className="mt-1" />
          <span>{errors.password.message}</span>
        </p>
      )}

      {errors.root?.serverError && (
        <p className=" text-black-50 text-primary text-left flex justify-start items-start gap-1 mb-5">
          <CircleX size={14} className="mt-1" />
          <span>{errors.root?.serverError.message}</span>
        </p>
      )}

      <button
        type="submit"
        className="px-4 py-2 font-medium rounded-md bg-black-100 text-white my-2 cursor-pointer shadow-[0_0px_30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-primary"
      >
        {endpoint === "signup" ? "Create account" : "Log In"}
      </button>

      {endpoint === "signin" ? (
        <Link
          to={"/signup"}
          className="text-black-50 px-4 py-2 outline-1 outline-gray/20 font-medium rounded-md cursor-pointer"
        >
          Don't have an account? Sign up
        </Link>
      ) : (
        <Link
          to={"/signin"}
          className="text-black-50 px-8 py-2 cursor-pointer outline-1 outline-gray/20 font-medium rounded-md"
        >
          I already have an account
        </Link>
      )}
    </form>
)
}

export default Authform;