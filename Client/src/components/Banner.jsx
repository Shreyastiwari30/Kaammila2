import React from "react";
import Bg from "../assets/Bg.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <>
      <div
        className="glow-effect bg-cover bg-center w-11/12 sm:w-3/4 md:w-[55%] mx-auto mt-12 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-lg hover:scale-105 duration-700"
        style={{ backgroundImage: `url(${Bg})` }}
      >
        <h1 className="text-base sm:text-lg md:text-2xl font-bold text-start">
          Need help to get started?
        </h1>
        <p className="text-xs sm:text-sm md:text-base mt-2 text-start">
          Get AI assistance to build your resume from scratch
        </p>
        <Link to="/gpt">
          <button className="bg-white text-blue-700 font-semibold rounded-full w-fit px-4 py-2 mt-4 hover:bg-blue-50 transition text-sm sm:text-base">
            Get Started
          </button>
        </Link>
      </div>

    
      <section className="mt-12 relative py-12 bg-transparent text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
            
            <div className="flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
                5000+
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base md:text-lg">Job Seekers</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 to-pink-300 bg-clip-text text-transparent">
                1200+
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base md:text-lg">Active Jobs</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-lime-300 bg-clip-text text-transparent">
                105+
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base md:text-lg">Cities</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                3+
              </h2>
              <p className="mt-2 text-slate-300 text-sm sm:text-base md:text-lg">Years</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
