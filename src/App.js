import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import Form from "./components/Form";
import List from "./components/List";

const ALL_EXPENSES = localStorage.getItem('expenses')
  ? JSON.parse(localStorage.getItem('expenses'))
  : []


function App() {
  const [expenses, setExpenses] = useState(ALL_EXPENSES)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  
  const handleName = event => {
    console.log('Name ', event.target.value)
    setName(event.target.value)
  }

  const handleAmount = event => {
    console.log('Amount ', event.target.value)
    setAmount(event.target.value)
  }

  const handleSubmitForm = event => {
    event.preventDefault()

    if (name !== '' && amount > 0) {
    const expense = { name, amount }
    setExpenses([...expenses, expense])
    
    setName('')
    setAmount('')
  } else {
    console.log('Invalid expense name or the amount')
  }
  }

  const handleClearExpenses = () => {
    setExpenses([])
  }

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])
  

  return (
    <Container style={{ marginTop: 20}}>
      <div className="container-fluid bg-light text-dark p-5">
        <div className="container bg-light p-5">
          <h3 className="display-6">
            Expenses Tracker React App
            <img src={logo} style={{ width: 50, height: 50 }} alt="react-logo" />
          </h3>
          <div>
          Total Expenses: {' '}
          <span className="text-success">
            ${' '}
            {expenses.reduce((accumulator, currentValue) => {
              return (accumulator += parseInt(currentValue.amount))
            }, 0)}
          </span>
          </div>
          <Form
            name={name}
            amount={amount}
            handleName={handleName}
            handleAmount={handleAmount}
            handleSubmitForm={handleSubmitForm}
            handleClearExpenses={handleClearExpenses}          
          />
          <List expenses={expenses} />
        </div>
      </div>
    </Container>    
  );
}

export default App;
