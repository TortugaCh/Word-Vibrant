import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

export default function SplineChart({ labels, data, label }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Destroy previous chart instance
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line", // Change to 'area' for an area chart
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: data, // Sample data, replace with actual data
              backgroundColor: "rgb(137, 190, 197, 0.2)", // Area fill color with opacity
              borderColor: "rgb(137, 190, 197, 1)", // Line color
              borderWidth: 2,
              fill: true, // Fill area under the line
              tension: 0.4, // Control the curve of the line
            },
          ],
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: false, // Allow smaller chart size
          scales: {
            x: {
              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              grid: {
                display: true, // Hide y-axis grid lines
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Cleanup on component unmount
      }
    };
  }, [labels, data]);

  return (
    <canvas ref={chartRef} className="h-80"></canvas> // Adjust canvas size as needed
  );
}
