import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { motion } from "framer-motion";

function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black-100 text-white flex flex-col items-center font-primary bg-gradient-to-tr from-primary/30 from-0% via-black-100 via-50% to-primary/30 to-100%">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-40 md:py-64 max-w-7xl mx-auto flex flex-col justify-center items-center gap-2.5 px-5"
        >
          <h1 className="text-6xl font-secondary relative text-center">
            Your external hard drive for thoughts.
          </h1>

          <p className="max-w-lg text-center text-md">
            Organize your thoughts, fuel your creativity, and achieve your
            goals. Start building your knowledge base today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group mt-5 text-sm font-medium"
          >
            <Link
              to={"/signup"}
              className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md flex gap-1 transition-all duration-200"
            >
              <p>Sign Up</p>
            </Link>
          </motion.button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="my-20 max-w-7xl mx-auto flex flex-col w-full justify-between items-center gap-1 px-5 relative"
        >
          <h1 className="text-md md:text-xl font-semibold text-center">
            Simple, intuitive, and powerful.
          </h1>
          <p className="text-center text-sm md:text-base">
            Capture your thoughts instantly, access them anytime.
          </p>
          <div className="absolute top-10 w-full h-full bg-white/20 blur-2xl"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="z-10 w-full bg-gray-500 rounded-xl border-4 border-primary my-5"
          >
            <img src="/demo.png" alt="main_page_demo" className="z-10 rounded-lg" />
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="my-10 max-w-7xl mx-auto flex w-full justify-center md:justify-between items-center gap-1 px-5"
        >
          <div className="flex flex-col justify-center items-start text-md md:text-xl font-semibold max-w-md text-left">
            <p className="">It's not about remembering everything.</p>
            <p className=" text-gray-200">
              It's about having a reliable place to find everything.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group mt-5 text-sm font-medium"
            >
              <Link
                to={"/signup"}
                className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md flex gap-1 transition-all duration-200"
              >
                <p>Sign Up</p>
              </Link>
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 h-2/3 bg-gray-500 hidden md:block"
          >
            <img src="/share_demo.png" alt="sharing_screen_demo" />
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
