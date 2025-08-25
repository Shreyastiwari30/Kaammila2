import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const Applicants = () => {
  
  const applicants = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      skills: ["Delivery", "Time Management"],
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      skills: ["Tutoring", "English"],
      status: "Shortlisted",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@example.com",
      skills: ["Laptop Repair", "Electronics"],
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(to_left,#1f2937,#1d4ed8,#111827)] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Applicants</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {applicants.map((applicant) => (
          <Card
            key={applicant.id}
            className="bg-white/10 border border-white/20 rounded-2xl shadow-md hover:scale-[1.01] transition"
          >
            <CardContent className="flex items-center justify-between p-6">
              
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${applicant.id}`} />
                  <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{applicant.name}</h2>
                  <p className="text-sm text-gray-300">{applicant.email}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-blue-600 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

         
              <div className="flex flex-col gap-2">
                <Button
                  className="bg-green-600 hover:bg-green-700 rounded-lg text-white"
                >
                  Shortlist
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-lg"
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Applicants;
