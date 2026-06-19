import { useState } from 'react'

const formatNaira = (amount) =>
  `₦${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function App() {
  const [expenses, setExpenses] = useState([])
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    const parsed = parseFloat(amount)
    if (!trimmed || isNaN(parsed) || parsed <= 0) return
    setExpenses([...expenses, { id: crypto.randomUUID(), name: trimmed, amount: parsed }])
    setName('')
    setAmount('')
  }

  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="app-title">💰 Expense Tracker</h1>
          <p className="app-subtitle">Track your Naira spending</p>
        </header>

        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              className="input"
              type="text"
              placeholder="Expense Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              type="number"
              placeholder="Amount (₦)"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn btn-add" type="submit">
              + Add Expense
            </button>
          </div>
        </form>

        <div className="total-bar">
          <span className="total-label">Total Expenses</span>
          <span className="total-value">{formatNaira(total)}</span>
        </div>

        {expenses.length > 0 && (
          <div className="insights-card">
            <div className="insights-header">
              <span className="insights-icon">💡</span>
              <span className="insights-heading">Smart Insights</span>
            </div>
            <ul className="insights-list">
              {total < 5000 && (
                <li className="insight-item">
                  Great discipline! Consider saving ₦500 today.
                </li>
              )}
              {total >= 5000 && total <= 20000 && (
                <li className="insight-item">
                  Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.
                </li>
              )}
              {total > 20000 && (
                <li className="insight-item">
                  Your expenses are rising. Review your top expense category.
                </li>
              )}
              {expenses.some((e) =>
                /\bTransport(ation)?\b/i.test(e.name.trim())
              ) && (
                <li className="insight-item">
                  You're spending on transport. Could you carpool or use BRT to
                  save?
                </li>
              )}
              {expenses.some((e) => e.amount > 10000) && (
                <li className="insight-item">
                  That's a significant expense. Ask yourself: Is this a need or
                  a want?
                </li>
              )}
            </ul>
          </div>
        )}

        {expenses.length === 0 ? (
          <p className="empty-msg">No expenses yet. Add one above.</p>
        ) : (
          <ul className="expense-list">
            {expenses.map((expense) => (
              <li className="expense-item" key={expense.id}>
                <span className="expense-name">{expense.name}</span>
                <span className="expense-amount">{formatNaira(expense.amount)}</span>
                <button className="btn btn-delete" onClick={() => handleDelete(expense.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        .container {
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
        }

        .app-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .app-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .app-subtitle {
          font-size: 1.1rem;
          color: #94a3b8;
        }

        .expense-form {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .input {
          flex: 1 1 160px;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border: 1px solid #334155;
          background: #1e293b;
          color: #f1f5f9;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
          min-width: 0;
        }

        .input:focus {
          border-color: #6366f1;
        }

        .input::placeholder {
          color: #64748b;
        }

        .btn {
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
        }

        .btn:active {
          transform: scale(0.97);
        }

        .btn-add {
          background: #6366f1;
          color: #fff;
          flex: 0 0 auto;
        }

        .btn-add:hover {
          opacity: 0.9;
        }

        .btn-delete {
          background: transparent;
          color: #f87171;
          padding: 0.35rem 0.75rem;
          font-size: 0.85rem;
          flex-shrink: 0;
        }

        .btn-delete:hover {
          background: rgba(248, 113, 113, 0.1);
        }

        .total-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #1e293b, #334155);
          border: 1px solid #475569;
          margin-bottom: 1.25rem;
        }

        .total-label {
          font-size: 1rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .total-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #a5b4fc;
        }

        .empty-msg {
          text-align: center;
          color: #64748b;
          padding: 2rem 0;
          font-size: 0.95rem;
        }

        .expense-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .expense-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.25rem;
          border-radius: 10px;
          background: #1e293b;
          border: 1px solid #334155;
          transition: border-color 0.2s;
        }

        .expense-item:hover {
          border-color: #475569;
        }

        .expense-name {
          flex: 1 1 0;
          color: #e2e8f0;
          font-weight: 500;
          word-break: break-word;
        }

        .expense-amount {
          font-size: 1.05rem;
          font-weight: 600;
          color: #a5b4fc;
          white-space: nowrap;
        }

        .insights-card {
          margin-bottom: 1.25rem;
          padding: 1.25rem;
          border-radius: 10px;
          background: linear-gradient(135deg, #1a1f2e, #232b3f);
          border: 1px solid #3b3f5c;
        }

        .insights-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .insights-icon {
          font-size: 1.3rem;
        }

        .insights-heading {
          font-size: 1rem;
          font-weight: 600;
          color: #c7d2fe;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .insights-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .insight-item {
          position: relative;
          padding-left: 1.25rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: #cbd5e1;
        }

        .insight-item::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #818cf8;
        }

        @media (max-width: 500px) {
          .app-title {
            font-size: 1.8rem;
          }

          .form-row {
            flex-direction: column;
          }

          .input {
            flex: 1 1 auto;
            width: 100%;
          }

          .btn-add {
            width: 100%;
          }

          .expense-item {
            flex-wrap: wrap;
          }

          .expense-name {
            flex: 1 1 100%;
          }

          .total-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  )
}

export default App
