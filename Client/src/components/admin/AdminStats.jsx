import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { Card, CardContent } from '../ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/stats`, { withCredentials: true });
        if (res.data.success) setStats(res.data.stats);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!stats) return <div className="text-white text-center mt-20">No data found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-gray-900 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-10">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-tr from-blue-800 to-blue-600 shadow-lg transform hover:scale-105 transition duration-300">
            <CardContent className="text-center">
              <h2 className="text-sm text-gray-300 uppercase tracking-wide">Total Jobs</h2>
              <p className="text-3xl font-extrabold mt-2">{stats.totalJobs}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-tr from-purple-800 to-purple-600 shadow-lg transform hover:scale-105 transition duration-300">
            <CardContent className="text-center">
              <h2 className="text-sm text-gray-300 uppercase tracking-wide">Total Applicants</h2>
              <p className="text-3xl font-extrabold mt-2">{stats.totalApplicants}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-tr from-green-800 to-green-600 shadow-lg transform hover:scale-105 transition duration-300">
            <CardContent className="text-center">
              <h2 className="text-sm text-gray-300 uppercase tracking-wide">Accepted Applicants</h2>
              <p className="text-3xl font-extrabold mt-2">{stats.acceptedApplicants}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-tr from-red-800 to-red-600 shadow-lg transform hover:scale-105 transition duration-300">
            <CardContent className="text-center">
              <h2 className="text-sm text-gray-300 uppercase tracking-wide">Rejected Applicants</h2>
              <p className="text-3xl font-extrabold mt-2">{stats.rejectedApplicants}</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Jobs Chart */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-5 text-center">Top Jobs by Applications</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={stats.topJobs} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
              <XAxis dataKey="title" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  color: '#fff',
                  padding: '10px',
                }}
              />
              <Bar dataKey="applicants" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminStats;
