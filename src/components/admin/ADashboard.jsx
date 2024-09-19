import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import CountUp from 'react-countup';

const Dashboard = () => {
  const [chartDataDeficiency, setChartDataDeficiency] = useState({});
  const [chartDataGender, setChartDataGender] = useState({});
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalBoys, setTotalBoys] = useState(0);
  const [totalGirls, setTotalGirls] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8888/child/all')
      .then(response => {
        const children = response.data;

        const total = children.length;
        const withDeficiency = children.filter(child => child.deficiency !== "none").length;
        const withoutDeficiency = total - withDeficiency;

        const boys = children.filter(child => child.gender === "Male").length;
        const girls = children.filter(child => child.gender === "Female").length;

        setTotalChildren(total);
        setTotalBoys(boys);
        setTotalGirls(girls);

        setChartDataDeficiency({
          labels: ['With Deficiency', 'Without Deficiency'],
          values: [withDeficiency, withoutDeficiency],
        });

        setChartDataGender({
          labels: ['Boys', 'Girls'],
          values: [boys, girls],
        });
      })
      .catch(error => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 space-y-8 ml-64">

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl ml-8">
        {/* Total Students Card */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg flex flex-col items-center text-white">
          <h2 role="ts" className="text-xl font-semibold mb-2">Total Students</h2>
          <p className="text-5xl font-bold">
            <CountUp end={totalChildren} duration={2} />
          </p>
        </div>

        {/* Boys Card */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg flex flex-col items-center text-white">
          <h2 className="text-xl font-semibold mb-2">Boys</h2>
          <p className="text-5xl font-bold">
            <CountUp end={totalBoys} duration={2} />
          </p>
        </div>

        {/* Girls Card */}
        <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-6 rounded-lg shadow-lg flex flex-col items-center text-white">
          <h2 className="text-xl font-semibold mb-2">Girls</h2>
          <p className="text-5xl font-bold">
            <CountUp end={totalGirls} duration={2} />
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl">
        {/* Deficiency Status Chart */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-28">Deficiency Status</h2>
          {chartDataDeficiency.labels ? (
            <Plot
              data={[{
                type: 'pie',
                labels: chartDataDeficiency.labels,
                values: chartDataDeficiency.values,
                hole: 0.4,
                marker: { colors: ['#FF6384', '#36A2EB'] },
                animation: {
                  duration: 1000,
                  easing: 'ease-in-out'
                }
              }]}
              layout={{
                height: 400,
                width: 400,
                margin: { t: 40, b: 0, l: 0, r: 0 },
                paper_bgcolor: 'white',
                plot_bgcolor: 'white',
                font: {
                  family: 'Arial, sans-serif',
                  size: 16,
                  color: '#333'
                },
                legend: {
                  orientation: 'h',
                  x: 0.5,
                  xanchor: 'center'
                }
              }}
            />
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>

        {/* Gender Distribution Chart */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 ml-24">Gender Distribution</h2>
          {chartDataGender.labels ? (
            <Plot
              data={[{
                type: 'pie',
                labels: chartDataGender.labels,
                values: chartDataGender.values,
                hole: 0.4,
                marker: { colors: ['#F79400', '#177CBE'] },
                animation: {
                  duration: 1000,
                  easing: 'ease-in-out'
                }
              }]}
              layout={{
                height: 400,
                width: 400,
                margin: { t: 40, b: 0, l: 0, r: 0 },
                paper_bgcolor: 'white',
                plot_bgcolor: 'white',
                font: {
                  family: 'Arial, sans-serif',
                  size: 16,
                  color: '#333'
                },
                legend: {
                  orientation: 'h',
                  x: 0.5,
                  xanchor: 'center'
                }
              }}
            />
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
