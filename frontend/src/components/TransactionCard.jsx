import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function TransactionCard({ transaction, handleDelete }) {
  const { id, type, description, date, amount } = transaction;

  return (
    <Card key={id} className={`mb-2 ${type === "income" ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50"} p-4`}>
      <CardContent>
        <p className="font-semibold">{description} - {date} - <span className="font-bold">${amount}</span> ({type})</p>
        <Button onClick={() => handleDelete(id)} className="bg-red-500 text-white">Delete</Button>
      </CardContent>
    </Card>
  );
}
