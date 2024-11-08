import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyPNLChart = ({ labels, datasets, stepSize = 200000 }) => {
  const maxValue = Math.max(...datasets.flatMap((dataset) => dataset.data));
  const max = Math.ceil(maxValue / stepSize) * stepSize;

  const data = {
    labels: labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: (context) => {
        const { chart } = context;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;

        const gradient = ctx.createLinearGradient(
          0,
          chartArea.bottom,
          0,
          chartArea.top
        );
        gradient.addColorStop(0, dataset.gradientStart || "#4caf50");
        gradient.addColorStop(1, dataset.gradientEnd || "#81c784");
        return gradient;
      },
      borderRadius: 5,
    })),
  };

  const options = {
    plugins: {
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: false,
        grid: {
          display: false,
        },
        barPercentage: 0.5, // Adjust as needed (e.g., try 0.5 or 0.3)
        categoryPercentage: 0.5, // Adjust to control spacing between bars

        // Optionally, set `barThickness` to enforce a fixed width for bars
        barThickness: 10, // Set a fixed width (e.g., 10, 15, or 20)
      },
      y: {
        beginAtZero: false,
        max,
        stepSize,
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="monthly-chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyPNLChart;
