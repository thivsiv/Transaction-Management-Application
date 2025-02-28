// components/TransactionChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  // Calculate income and expense per month
  const monthlyData = transactions.reduce((acc, { type, amount, date }) => {
    const month = date.slice(0, 7); // Extract YYYY-MM
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (type === "income") acc[month].income += parseFloat(amount);
    else acc[month].expense += parseFloat(amount);
    return acc;
  }, {});

  const labels = Object.keys(monthlyData);
  const incomeData = labels.map(month => monthlyData[month].income);
  const expenseData = labels.map(month => monthlyData[month].expense);

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        backgroundColor: "#32de84",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      },
      {
        label: "Expense",
        data: expenseData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Income vs Expense Per Month"
      },
      legend: {
        position: "top"
      }
    }
  };

  return (
    <div className="mb-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionChart;
