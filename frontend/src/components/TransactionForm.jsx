import React from "react";
import { Button } from "./ui/button";

export default function TransactionForm({ form, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-md space-y-3">
      <div className="flex gap-2">
        <select name="type" value={form.type} onChange={handleChange} className="border p-2 flex-1 rounded-md shadow">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input type="date" name="date" value={form.date} onChange={handleChange} required className="border p-2 flex-1 rounded-md shadow"/>
      </div>
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="border p-2 w-full rounded-md shadow"/>
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required className="border p-2 w-full rounded-md shadow"/>
      <Button type="submit" className="w-full">Add Transaction</Button>
    </form>
  );
}
