import React, { useEffect, useState } from 'react';
import { getAllTransactions } from '../../utilitys/transaction';
import { formatAmount } from '../../utilitys/formatAmount';
import { formatDateTime } from '../../utilitys/formatDate';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchTransactions() {
      try {
        setLoading(true);
        const response = await getAllTransactions();
        const data = response?.data || [];
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  const getStatusBadge = (status) => {
    const baseStyle = "px-3 py-1 rounded-full text-white text-sm font-";
    switch (status) {
      case 'successful':
        return <span className={`${baseStyle} bg-green-500`}>Successful</span>;
      case 'failed':
        return <span className={`${baseStyle} bg-red-500`}>Failed</span>;
      case 'pending':
        return <span className={`${baseStyle} bg-yellow-500`}>Pending</span>;
      default:
        return <span className={`${baseStyle} bg-gray-500`}>{status}</span>;
    }
  };

  const filteredTransactions = transactions.filter(
    t =>
      t.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.flw_ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center py-10 text-gray-500">Loading transactions...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!transactions.length) return <p className="text-center py-10 text-gray-500">No transactions found.</p>;

  return (
    <div className='py-8'>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order Number or FLW Ref"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-72 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 border border-gray-200">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-2 border-b text-left">S/N</th>
              <th className="px-4 py-2 border-b text-left">Order Number</th>
              <th className="px-4 py-2 border-b text-left">Flw Ref</th>
              <th className="px-4 py-2 border-b text-left">Amount</th>
              <th className="px-4 py-2 border-b text-left">Charged Amount</th>
              <th className="px-4 py-2 border-b text-left">Payment Type</th>
              <th className="px-4 py-2 border-b text-left">Status</th>
              <th className="px-4 py-2 border-b text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, index) => (
              <tr key={t.id} className="hover:bg-gray-50 bg-white">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{t.order_number}</td>
                <td className="px-4 py-2 border-b">{t.flw_ref}</td>
                <td className="px-4 py-2 border-b">{formatAmount(t.amount)}</td>
                <td className="px-4 py-2 border-b">{formatAmount(t.charged_amount)}</td>
                <td className="px-4 py-2 border-b">{t.payment_type}</td>
                <td className="px-4 py-2 border-b">{getStatusBadge(t.status)}</td>
                <td className="px-4 py-2 border-b">{formatDateTime(t.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!filteredTransactions.length && (
        <p className="text-center py-4 text-gray-500">No transactions match your search.</p>
      )}
    </div>
  );
}

export default Transaction;
