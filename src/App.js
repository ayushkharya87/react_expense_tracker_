import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [budget, setBudget] = useState(0);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
    if (expenseName && expenseAmount) {
      const newExpense = {
        id: new Date().getTime(),
        name: expenseName,
        amount: parseInt(expenseAmount),
      };
      setExpenses([...expenses, newExpense]);
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const editExpense = (id, newAmount) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, amount: newAmount } : expense
    );
    setExpenses(updatedExpenses);
  };

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = budget - totalExpenses;

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <label>
        Set Budget:
        <input type="number" value={budget} onChange={e => setBudget(parseInt(e.target.value))} />
      </label>
      <br />
      <label>
        Expense Name:
        <input type="text" value={expenseName} onChange={e => setExpenseName(e.target.value)} />
      </label>
      <label>
        Expense Amount:
        <input type="number" value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} />
      </label>
      <button onClick={addExpense}>Add Expense</button>

      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.name}: ₹{expense.amount}{' '}
            <button onClick={() => editExpense(expense.id, prompt('Enter new amount:'))}>Edit</button>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Summary</h2>
      <p>Total Expenses: ₹{totalExpenses}</p>
      <p>Remaining Budget: ₹{remainingBudget}</p>
    </div>
  );

};

export default App;
