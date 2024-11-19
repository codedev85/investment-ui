import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import apiClient from '../../apiClient';
import LineChart from '../../components/shared/LineChart';
import DonutChart from '../../components/shared/DonutChart';

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

interface SubscriptionPlanChartResponse {
  status: string;
  message: string;
  months: string[];
  investment_counts: number[];
}


export default function Dashboard() {

  const [investments, setInvestments] = useState<Investment[]>([]);
  
  const [investmentDataMonths, setInvestmentDataMonths] = useState<string[]>([]);
  const [investmentData, setInvestmentData] = useState<number[]>([]);


  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState<number>(0);

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

  useEffect(() => {
  
    (async () => {
      try {
        const response = await apiClient.get<SubscriptionPlanChartResponse>('/get/subscription/chart');
      
        const content = response.data;

        if(content.status){

            const { months, investment_counts } = response.data;
       
          setInvestmentDataMonths(months);
          setInvestmentData(investment_counts);

        }
        // setInvestments(content); 
      } catch (error: any) {

        throw new Error(error);

      }
    
    })();
  }, []); 


  useEffect(() => {
  
    (async () => {
      try {
        const response = await apiClient.get('/transaction/summary');
      console.log(response)
        const content = response.data;

        if(content.status){

          const { total_deposit, total_withdrawal } = response.data;
          setTotalDeposit(total_deposit);
          setTotalWithdrawal(total_withdrawal);

        }
        // setInvestments(content); 
      } catch (error: any) {

        throw new Error(error);

      }
    
    })();
  }, []); 



  

  return (
    <div>
      <div className="container">
        <div className="chart_box">
        <div>
            <LineChart 
              months={investmentDataMonths} 
              investmentCounts={investmentData} 
            />
        </div>

        <div >

          <h1>Transaction Summary</h1>
          {totalDeposit && totalWithdrawal ? (
            <DonutChart totalDeposit={totalDeposit} totalWithdrawal={totalWithdrawal} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
        </div>
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
