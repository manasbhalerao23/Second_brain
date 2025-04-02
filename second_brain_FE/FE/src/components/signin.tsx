import Authform from "./Authform";

function Signin () {
    return(
        <main>
        {/* <Navbar /> */}
        <div className="bg-black-100 text-white h-screen py-32 flex flex-col justify-center items-center font-primary">
          <h1 className="text-2xl font-bold my-5 text-center">
            Login to Brainly
          </h1>
          <Authform endpoint="signin" />
        </div>
      </main>
    )
}

export default Signin;