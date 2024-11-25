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

function CurrentYearCard({ dataset = [0, 0] }) {
  const isZero = dataset.every((value) => value === 0);
  const [income, expense] = dataset;
  const profit = income - expense; // Calculate profit dynamically

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Current Year PNL",
        data: isZero ? [1] : dataset,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          if (isZero) {
            const grayGradient = createGradient(ctx, "#B0B0B0", "#D3D3D3");
            return [grayGradient, grayGradient];
          }
          const incomeGradient = createGradient(ctx, "#2EB629", "#38D72C");
          const expenseGradient = createGradient(ctx, "#145DA0", "#0C2D48");
          return [incomeGradient, expenseGradient];
        },
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          // Customize the tooltip
          label: (tooltipItem) => {
            const value = dataset[tooltipItem.dataIndex] || 0;
            const label = tooltipItem.label;
            return `${label}: ${value.toFixed(2)}`;
          },
          afterBody: () => {
            // Show profit once after the tooltip body
            return isZero ? null : `Profit: ${profit.toFixed(2)}`;
          },
        },
        bodyFont: {
          size: 14, // Adjust tooltip font size
        },
      },
      legend: {
        display: false, // Disable legend for simplicity
      },
    },
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
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
    <div className="yearly-card">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default CurrentYearCard;
