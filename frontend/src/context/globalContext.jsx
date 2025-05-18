import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { INCOME_API, EXPENSE_API } from '../api/apiEndpoints';

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // Fetch incomes
    const getIncomes = async () => {
        try {
            const res = await axios.get(INCOME_API.GET);
            setIncomes(res.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching incomes');
        }
    };

    // Fetch expenses
    const getExpenses = async () => {
        try {
            const res = await axios.get(EXPENSE_API.GET);
            setExpenses(res.data || []);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching expenses');
        }
    };

    // Add income
    const addIncome = async (income) => {
        try {
            await axios.post(INCOME_API.ADD, income);
            await getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding income');
        }
    };

    // Delete income
    const deleteIncome = async (id) => {
        try {
            await axios.delete(INCOME_API.DELETE(id));
            await getIncomes();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting income');
        }
    };

    // Add expense
    const addExpense = async (expense) => {
        try {
            await axios.post(EXPENSE_API.ADD, expense);
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding expense');
        }
    };

    // Delete expense
    const deleteExpense = async (id) => {
        try {
            await axios.delete(EXPENSE_API.DELETE(id));
            await getExpenses();
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting expense');
        }
    };

    // Calculate totals
    const totalIncome = () => Array.isArray(incomes)
        ? incomes.reduce((total, income) => total + income.amount, 0) : 0;

    const totalExpenses = () => Array.isArray(expenses)
        ? expenses.reduce((total, exp) => total + exp.amount, 0) : 0;

    const totalBalance = () => totalIncome() - totalExpenses();

    const transactionHistory = () => {
        const all = [...incomes, ...expenses];
        all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return all.slice(0, 4);
    };

    // Fetch data on mount
    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                addIncome,
                deleteIncome,
                getIncomes,
                incomes,
                addExpense,
                deleteExpense,
                getExpenses,
                expenses,
                totalIncome,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
