import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Banglore", "Mumbai", "Bhopal", "Indore"]
  },
  {
    filterType: "Industry",
    array: ["Designing", "Development", "Sales", "HR"]
  },
  {
    filterType: "Salary",
    array: ["0-40K", "42k-1lakh", "1lakh-5lakh"]
  }
]

const FilterCard = () => {
  return (
    <div className="w-56 p-4 rounded-xl shadow-md bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 text-gray-100">
      <h1 className="text-lg font-bold text-blue-400">Filter Jobs</h1>
      <hr className="my-3 border-gray-700" />

      {filterData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold text-md text-gray-200 mb-2">{data.filterType}</h2>
          <RadioGroup>
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 my-1 hover:text-blue-300 transition">
                <RadioGroupItem value={item} id={`${data.filterType}-${item}`} />
                <Label htmlFor={`${data.filterType}-${item}`} className="cursor-pointer">
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  )
}

export default FilterCard
