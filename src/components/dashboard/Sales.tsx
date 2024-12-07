import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Search } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Amount ($)',
      data: [],
      borderColor: 'rgb(59, 130, 246)',
      tension: 0.4,
      fill: false,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchSalesData();
    fetchEvents();
  }, [timeRange]);

const fetchSalesData = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/bookings/sales?range=${timeRange}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setSalesData(data.sales || []);
    
    setChartData({
      labels: data.labels || [],
      datasets: [{
        label: 'Amount ($)',
        data: data.values || [],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    });
  } catch (error) {
    console.error('Error fetching sales data:', error);
  }
};

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events/seller', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const filteredSales = salesData.filter(sale => 
    sale.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sales Overview</h1>
      
      <div className="flex gap-4 mb-6">
        {[
          { label: 'Today', value: '24h' },
          { label: '7 Days', value: '7d' },
          { label: '30 Days', value: '30d' },
          { label: '12 Months', value: '12m' }
        ].map((range) => (
          <button
            key={range.value}
            onClick={() => setTimeRange(range.value)}
            className={`px-4 py-2 rounded ${
              timeRange === range.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6 mb-6">
        <div className="flex-[0.8] bg-white p-6 rounded-lg shadow" style={{ height: '400px' }}>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Sales Over Time'
                }
              }
            }}
          />
        </div>

        <div className="flex-[0.2] space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Tickets Sold</h3>
            <p className="text-3xl font-bold text-blue-600">
              {salesData.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Available Tickets</h3>
            <p className="text-3xl font-bold text-green-600">
              {events.reduce((total, event) => {
                const totalCapacity = event.seatSections.reduce((sum, section) => sum + section.capacity, 0);
                const soldTickets = event.ticketsSold || 0;
                return total + (totalCapacity - soldTickets);
              }, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by event or customer..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{sale.eventTitle}</td>
                  <td className="px-6 py-4">{sale.customerName}</td>
                  <td className="px-6 py-4">${sale.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales; 