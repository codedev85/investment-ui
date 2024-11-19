import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  totalDeposit: number;
  totalWithdrawal: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ totalDeposit, totalWithdrawal }) => {
  const data = {
    labels: ['Deposit', 'Withdrawal'],
    datasets: [
      {
        data: [totalDeposit, totalWithdrawal],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#4D98D4', '#FF8B91'],
      },
    ],
  };

  return (
    <div>
      <h2>Deposit vs Withdrawal</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChart;
