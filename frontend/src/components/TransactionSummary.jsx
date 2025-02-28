import React from "react";
import { Card, CardContent } from "./ui/card";

export default function TransactionSummary({ calculateSummary }) {
  const { totalIncome, totalExpense, netProfit } = calculateSummary();
  
  return (
    <Card className="mb-6">
      <CardContent>
        <h2 className="text-xl font-bold">Summary</h2>
        <p className="text-green-600 font-semibold">Total Income: ${totalIncome}</p>
        <p className="text-red-600 font-semibold">Total Expense: ${totalExpense}</p>
        <p className="text-gray-800 font-semibold">Net Profit: ${netProfit}</p>
      </CardContent>
    </Card>
  );
}
