import React from 'react';
import { Routes, Route , BrowserRouter as Router} from "react-router-dom";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Layout from './components/shared/Layout';
import './App.css';
import Transaction from './Pages/Transaction/Transaction';
import { MessageProvider } from './components/shared/MessageContext';
import MessageHandler from './components/shared/MessageHandler';
import { AuthProvider } from './components/shared/AuthContext';
import PrivateRoute from './components/shared/PrivateRoute';
import PublicRoute from './components/shared/PublicRoute';
import InvestmentPlan from './Pages/InvestmentPlan/InvestmentPlan';
import Activation from './Pages/Activation/Activation';

function App() {
  return (
    <div className="App">
       <AuthProvider>
      <MessageProvider>
        <Router>
        <MessageHandler /> 
          <Routes>
            <Route path="/" element={<Layout/>} >
               <Route path="/"  element={<PublicRoute />}>
                  <Route index  element={<Login/>} />
               </Route>
               <Route path="/register" element={<PublicRoute />}>
                  <Route path='/register'  element={<Register/>} />
               </Route>
               <Route path="/dashboard" element={<PrivateRoute />} >
                  <Route path='/dashboard'  element={<Dashboard/>} />
               </Route>
               <Route path="/transaction" element={<PrivateRoute />}>
                  <Route path='/transaction'  element={<Transaction/>} />
               </Route>
               <Route path="/investment/:id" element={<PrivateRoute />}>
                  <Route path=""  element={<InvestmentPlan/>} />
               </Route>
               <Route path="/activate/account" element={<PublicRoute />}>
                  <Route path=""  element={<Activation/>} />
               </Route>
            </Route>
          </Routes>
        </Router>
      </MessageProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
