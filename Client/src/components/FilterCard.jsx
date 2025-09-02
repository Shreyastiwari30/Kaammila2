import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Category",
    array: [
      "Delivery & Pickup",
      "House Cleaning",
      "Repairs & Maintenance",
      "Tutor",
      "Cab",
      "Event Help",
    ],
  },
  {
    filterType: "Location",
    array: ["Indore", "Bhopal", "Ujjain", "Dewas", "Pune", "Remote"],
  },
  {
    filterType: "Budget",
    array: ["₹0 - ₹500", "₹500 - ₹2000", "₹2000 - ₹5000", "₹5000+"],
  },
  {
    filterType: "Duration",
    array: ["Less than 1 hour", "1-4 hours", "Same day", "Multi-day task"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div
      className="w-full p-5 rounded-2xl shadow-2xl
    bg-gradient-to-br from-indigo-900/95 to-purple-800/95
    backdrop-blur-md border border-fuchsia-400/30
    hover:shadow-3xl hover:shadow-fuchsia-500/40
    transition-all duration-500 ease-in-out "
    >
      <h1 className="font-bold text-xl text-white mb-3">Filter Jobs</h1>
      <hr className="border-white/20 mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">
            <h2 className="font-semibold text-lg text-purple-200 mb-2">
              {data.filterType}
            </h2>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div
                  key={idx}
                 className="flex items-center space-x-2 my-1"
                >
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="border-purple-400 text-purple-400 checked:bg-purple-500 checked:border-purple-500"
                  />
                  <Label htmlFor={itemId} className="text-white/90">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
