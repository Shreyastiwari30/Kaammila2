import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Delivery",
  "Tutor",
  "Electrician",
  "Painter",
  "Transport",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/3 lg:basis-1/3 flex items-center justify-center">
                <Button className="px-5 py-2 rounded-xl bg-white/10 text-slate-100 ring-1 ring-white/15 hover:bg-white/15 hover:ring-violet-400/40 transition" variant="outline">{cat}</Button>
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
