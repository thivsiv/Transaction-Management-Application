import React from "react";

export default function Filters({ filterType, setFilterType, filterMonth, setFilterMonth }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2 justify-center bg-rose-300">
      <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border p-2 rounded-md shadow">
        <option value="all">All Transactions</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className="border p-2 rounded-md shadow" />
    </div>
  );
}
