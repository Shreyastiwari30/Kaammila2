import React from "react";
import { useNavigate, Link } from "react-router-dom";

const About = () => {
  const Navigate = useNavigate();

  function registernow() {
    Navigate("/register");
  }

  return (
    <div className="">
      <div className="text-white">
        
        <section className="bg-[linear-gradient(to_left,#1f2937,#1d4ed8,#111827)] py-16 text-center px-6">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-orange-400">KaamMila</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Empowering every individual to find work fast — from microtasks to
            skilled services across Indore and India.
          </p>
        </section>

        
        <section className="py-16 px-6 md:px-20 text-center bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed max-w-5xl mx-auto">
            KaamMila is a hyperlocal micro-job platform built for the next
            billion. Our mission is to reduce unemployment by enabling quick,
            trusted, and fair work opportunities in your neighborhood. Whether
            you're a student, freelancer, daily wage earner, or skilled worker,
            our platform helps you find work instantly.
          </p>
        </section>

      
        <section className="bg-[linear-gradient(to_left,#1f2937,#1d4ed8,#111827)] py-16 px-6 md:px-20">
          <h2 className="text-2xl font-bold mb-10 text-center text-orange-400">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-800 shadow-xl rounded-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">📍 Local Gigs</h3>
              <p className="text-sm text-gray-400">
                Get tasks near you – delivery, repair, tutoring, and more.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-xl rounded-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">⚡ Quick Hiring</h3>
              <p className="text-sm text-gray-400">
                Start working within minutes of getting selected.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-xl rounded-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">🤖 Smart Matching</h3>
              <p className="text-sm text-gray-400">
                We use AI to match your skills to the best-fit jobs.
              </p>
            </div>
          </div>
        </section>

        
        <section className="py-16 text-center bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">
            Ready to get started?
          </h2>
          <p className="text-gray-300 mb-6">
            Join thousands who are already earning on KaamMila
          </p>
          <Link
            to="/signup"
            className="bg-orange-500 hover:bg-orange-600 p-3 px-6 rounded-xl text-white font-semibold transition"
          >
            Register Now
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
