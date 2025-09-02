import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    const trimmedQuery = query.trim();
    dispatch(setSearchedQuery(trimmedQuery));
    navigate("/browse");
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="text-center">
        <div className="flex flex-col gap-6 md:gap-10">
          <span className="glow-effect2 mx-auto inline-flex items-center px-6 sm:px-10 md:px-16 lg:px-20 py-1.5 rounded-full text-xs sm:text-sm backdrop-blur text-violet-200 ring-1 ring-violet-300 bg-violet-600/20 transition-colors duration-300">
            No.1 Job Hunt Website
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight transition-colors duration-300 hover:text-fuchsia-300">
            Search, Apply & <br className="hidden sm:block" />
            Get Your{" "}
            <span className="gradient-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Dream Job
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-100 font-semibold transition-colors duration-300 hover:text-slate-100">
            10000+ micro-jobs across Indore and India
          </p>
        </div>

        <div className="rounded-full flex items-center justify-center mx-auto my-6  w-full sm:w-[80%] md:w-[60%] lg:w-[40%] max-w-2xl">
          <input
            type="text"
            placeholder="Find your Dream Job"
            className="border border-purple-400 p-2 sm:p-3 rounded-l-full outline-none w-full text-sm sm:text-base glow-effect2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
          />
          <Button
            onClick={searchJobHandler}
            className="glow-effect2 rounded-r-full bg-[#6A38C2] h-10 sm:h-12 px-4 sm:px-6"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
