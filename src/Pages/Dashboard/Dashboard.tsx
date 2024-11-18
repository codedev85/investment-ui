import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import apiClient from '../../apiClient';

// Define the Investment type
interface Investment {
  id: number;
  name: string;
  description: string;
  min_investment_amount: number;
  max_investment_amount: number;
  duration_in_months: number;
  return_rate: number;
}

export default function Dashboard() {

  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
  
    (async () => {
      try {
        const response = await apiClient.get('/investment-plans');
        const content = response.data;
        setInvestments(content); 
      } catch (error: any) {

        throw new Error(error);

      }
    
    })();
  }, []); 

  return (
    <div>
      <div className="container">
        <div className="table_container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Min(Amount)</th>
                <th>Max(Amount)</th>
                <th>Duration (Months)</th>
                <th>Rate (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr key={investment.id}> 
                  <td>{index + 1}</td>
                  <td>{investment.name}</td>
                  <td>{investment.description}</td>
                  <td>{investment.min_investment_amount}</td>
                  <td>{investment.max_investment_amount}</td>
                  <td>{investment.duration_in_months}</td>
                  <td>{investment.return_rate}</td>
                  <td>
                    <Link to={`/investment/${investment.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
