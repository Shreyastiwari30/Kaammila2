import React from "react";
import { useNavigate, Link } from "react-router-dom";

const About = () => {
  const Navigate = useNavigate();

  function registernow() {
    Navigate("/register");
  }

  return (
    <div className="mt-[-50px]">
      <div className="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="30%" stop-color="#3f215b" />
              <stop offset="100%" stop-color="#6d28d9" />
            </linearGradient>
          </defs>
          <path
            fill="url(#myGradient)"
            d="M0,224L48,224C96,224,192,224,288,208C384,192,480,160,576,176C672,192,768,256,864,261.3C960,267,1056,213,1152,186.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <section className="bg-gradient-to-br from-purple-950 to-violet-800 py-16 text-center px-6">
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-orange-400">KaamMila.com</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Empowering every individual to find work fast — from microtasks to
            skilled services across Indore and India.
          </p>
        </section>

        <section className="py-16 px-6 md:px-20 text-center bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">
            Who We Are
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-5xl mx-auto">
            KaamMila.com is a hyperlocal micro-job platform built for the next
            billion. Our mission is to reduce unemployment by enabling quick,
            trusted, and fair work opportunities in your neighborhood. Whether
            you're a student, freelancer, daily wage earner, or skilled worker,
            our platform helps you find work instantly.
          </p>
        </section>

        <section className="bg-gradient-to-br from-purple-950 to-violet-700 py-16 px-6 md:px-20">
          <h2 className="text-2xl font-bold mb-10 text-center text-orange-400">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-800 shadow-xl rounded-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">
                📍 Local Gigs
              </h3>
              <p className="text-sm text-gray-400">
                Get tasks near you – delivery, repair, tutoring, and more.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-xl rounded-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">
                ⚡ Quick Hiring
              </h3>
              <p className="text-sm text-gray-400">
                Start working within minutes of getting selected.
              </p>
            </div>
            <div className="p-6 bg-gray-800 shadow-xl rounded-lg hover:scale-105 transition">
              <h3 className="text-lg font-semibold mb-2 text-indigo-300">
                🤖 Smart Matching
              </h3>
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
            Join thousands who are already earning on KaamMila.com
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
