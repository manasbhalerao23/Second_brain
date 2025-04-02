import Authform from "./Authform";
import Navbar from "./NavBar";

function Signup() {
  return (
    <main>
      <Navbar />
      <div className="bg-black-100 text-white h-screen py-32 flex flex-col md:flex-row justify-center items-center font-primary">
        {/* Left Side - Text */}
        <div className="flex flex-col justify-center items-center gap-5 w-full md:w-1/3">
          <p className="text-md md:text-xl font-semibold max-w-xs text-center text-gray-300">
            What if you could remember
            <span className="text-primary font-bold"> everything </span>
            important?
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-40 bg-white/10 mx-10"></div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold my-5 text-center">
            Create your account
          </h1>
          <Authform endpoint="signup" />
        </div>
      </div>
    </main>
  );
}

export default Signup;
