// calc.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
// server.js
const express = require('express');
const cors = require('cors');
const calc = require('./calc');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;
  try {
    let result;
    switch (operation) {
      case 'add':
        result = calc.add(a, b);
        break;
      case 'subtract':
        result = calc.subtract(a, b);
        break;
      case 'multiply':
        result = calc.multiply(a, b);
        break;
      case 'divide':
        result = calc.divide(a, b);
        break;
      default:
        throw new Error('Invalid operation');
    }
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);

  const calculate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/calculate', {
        a: parseFloat(a),
        b: parseFloat(b),
        operation,
      });
      setResult(res.data.result);
    } catch (err) {
      setResult(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Basic Calculator</h2>
      <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="Enter A" />
      <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="Enter B" />
      <select value={operation} onChange={e => setOperation(e.target.value)}>
        <option value="add">Add</option>
        <option value="subtract">Subtract</option>
        <option value="multiply">Multiply</option>
        <option value="divide">Divide</option>
      </select>
      <button onClick={calculate}>Calculate</button>
      {result !== null && <h3>Result: {result}</h3>}
    </div>
  );
}

export default App;