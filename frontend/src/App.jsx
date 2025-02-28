import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import TransactionChart from "./components/TransactionChart";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-xl text-red-500">Something went wrong!</h1>;
    }
    return this.props.children;
  }
}

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: "income", description: "", date: "", amount: "" });
  const [filterType, setFilterType] = useState("all");
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      setTransactions(response.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/add", form);
    fetchTransactions();
    setForm({ type: "income", description: "", date: "", amount: "" });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchTransactions();
  };

  const calculateSummary = () => {
    if (!transactions || transactions.length === 0) {
      return { totalIncome: 0, totalExpense: 0, netProfit: 0 };
    }

    let totalIncome = 0, totalExpense = 0;
    transactions.forEach(({ type, amount }) => {
      if (type === "income") totalIncome += parseFloat(amount);
      else totalExpense += parseFloat(amount);
    });
    return { totalIncome, totalExpense, netProfit: totalIncome - totalExpense };
  };

  const filteredTransactions = transactions.filter(({ type, date }) => {
    const transactionMonth = date.slice(0, 7);
    return (filterType === "all" || type === filterType) && (filterMonth === "" || transactionMonth === filterMonth);
  });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-r from-rose-300 to-rose-100 text-pink space-y-6 p-6">

        {/* Heading with Sticker Animation */}
        <h1 className="text-4xl font-bold text-white text-center mb-6 animate__animated animate__bounceIn">
          Expense Tracker
          <span className="ml-3 inline-block animate__animated animate__bounce animate__infinite text-2xl text-yellow-400">💸</span>
        </h1>

        {/* Add Transaction Form with animation */}
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md space-y-4 transform transition-all hover:scale-105">
          <div className="flex gap-3">
            <select name="type" value={form.type} onChange={handleChange} className="border p-3 flex-1 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input type="date" name="date" value={form.date} onChange={handleChange} required className="border p-3 flex-1 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border p-3 w-full rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required className="border p-3 w-full rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <Button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-md transform transition-all hover:scale-105 hover:bg-blue-600">Add Transaction</Button>
        </form>

        {/* Summary with Animated Cards */}
        <Card className="mb-6 animate__animated animate__fadeIn">
          <CardContent>
            <h2 className="text-xl font-bold">Summary</h2>
            <p className="text-green-600 font-semibold">Total Income: ${calculateSummary().totalIncome}</p>
            <p className="text-red-600 font-semibold">Total Expense: ${calculateSummary().totalExpense}</p>
            <p className="text-gray-800 font-semibold">Net Profit: ${calculateSummary().netProfit}</p>
          </CardContent>
        </Card>

        {/* Transaction Chart with Animation */}
        <TransactionChart transactions={transactions}  />

        {/* Filters Section with Sticker Animation */}
        <div className="mb-4 flex flex-wrap gap-3 justify-center mt-6">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className="border p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        {/* Transactions List with Animated Cards */}
        <h2 className="text-2xl text-center text-white  font-bold mb-4">Transactions</h2>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(({ id, type, description, date, amount }) => (
            <Card key={id} className={`mb-4 ${type === "income" ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"} p-4 rounded-md transform transition-all hover:scale-105 animate__animated animate__fadeIn`}>
              <CardContent>
              <p className=" text-gray-800 font-semibold">
                <span className="block text-2xl">{description}</span>
                <span className="block">{date}</span>
                <span className="block font-bold">${amount}</span>
                <span className="block">({type})</span>
              </p>

                <Button onClick={() => handleDelete(id)} className="bg-red-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-red-600 transition-all">Delete</Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </ErrorBoundary>
  );
}
