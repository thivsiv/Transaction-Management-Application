import TransactionCard from "./TransactionCard";

export default function TransactionList({ filteredTransactions, handleDelete }) {
  return (
    <div>
        <h3 className="text-2xl">Transactions</h3>
      
      {filteredTransactions.length > 0 ? (
        filteredTransactions.map((transaction) => (
            
          <TransactionCard key={transaction.id} transaction={transaction} handleDelete={handleDelete} />
        ))
      ) : (
        <p className="text-center text-rose-500">No transactions found.</p>
      )}
    </div>
  );
}
