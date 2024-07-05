import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const LiveChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = data.map(d => d.price);
      chartRef.current.update();
    }
  }, [data]);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
    },
  };

  const chartData = {
    labels: data.map((d) => new Date(d.time)),
    datasets: [
      {
        label: 'Price',
        data: data.map((d) => d.price),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return <Line ref={chartRef} data={chartData} options={options} />;
};

export default LiveChart;
