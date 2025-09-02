import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Delivery",
  "Tutor",
  "Electrician",
  "Painter",
  "Transport",
];

const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const searchJobHandler = (query) => {
          dispatch(setSearchedQuery(query));
          navigate("/browse");
      }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/3 lg:basis-1/3 flex items-center justify-center">
                <Button onClick={()=>searchJobHandler(cat)} className="px-5 py-2 rounded-xl bg-gray-800/60 text-slate-100 ring-1 ring-white/15 hover:bg-white/15 hover:ring-violet-400/40 transition" variant="outline">{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
