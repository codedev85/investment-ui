import React from 'react';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface LineChartProps {
  months: string[];
  investmentCounts: number[];
}

const LineChart: React.FC<LineChartProps> = ({ months, investmentCounts }) => {
  // Prepare the data for the chart
  const data = {
    labels: months, // Months array passed as prop
    datasets: [
      {
        label: 'Investments per Month',
        data: investmentCounts,
        fill: false,
        borderColor: 'rgb(75, 192, 192)', 
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Investments per Month',
      },
    },
  };

  return (
    <div>
      <h2>Investments Per Month</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
