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
  // Calculate max y-axis value
  const maxDatasetValue = Math.max(
    ...datasets.flatMap((dataset) => dataset.data)
  );
  const max = Math.ceil((maxDatasetValue + 2 * stepSize) / stepSize) * stepSize;

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
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: false,
        grid: {
          display: false,
        },
        barPercentage: 0.1,
        categoryPercentage: 0.2,
      },
      y: {
        beginAtZero: false,
        max,
        ticks: {
          stepSize,
          callback: (value) => `₹${value}`,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
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
