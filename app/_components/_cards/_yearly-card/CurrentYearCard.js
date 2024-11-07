import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const createGradient = (ctx, colorStart, colorEnd) => {
  const gradient = ctx.createRadialGradient(150, 150, 0, 150, 150, 200);
  gradient.addColorStop(0, colorStart); // Start color
  gradient.addColorStop(1, colorEnd); // End color
  return gradient;
};

function CurrentYearCard({ dataset = [80, 25] }) {
  // Dummy data for the chart
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Current Year PNL",
        data: dataset, // Income first to render it last (on top)
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const incomeGradient = createGradient(ctx, "#2EB629", "#38D72C");
          const expenseGradient = createGradient(ctx, "#145DA0", "#0C2D48");
          return [incomeGradient, expenseGradient];
        },
        borderWidth: 0,
        // spacing: -7,
        hoverOffset: 8,
        // borderRadius: [10, 0],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10, // Adjust as needed
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  return (
    <div className="yearly-card">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CurrentYearCard;
