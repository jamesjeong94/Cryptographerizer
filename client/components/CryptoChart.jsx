import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import $ from "jquery";
import { useSelector } from "react-redux";

const CryptoChart = (props) => {
  Chart.plugins.register({
    afterDatasetsDraw: function (chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        var activePoint = chart.tooltip._active[0],
          ctx = chart.ctx,
          y_axis = chart.scales["y-axis-0"],
          x = activePoint.tooltipPosition().x,
          topY = y_axis.top,
          bottomY = y_axis.bottom;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#07C";
        ctx.stroke();
        ctx.restore();
      }
    },
  });

  let labels = [];
  let data = [];
  for (let i = 0; i < props.data.length; i += 1) {
    const pointData = Object.values(props.data[i])[0];
    if (pointData.hasOwnProperty("time")) {
      labels.push(new Date(pointData.time * 1000).toLocaleDateString());
      data.push(pointData.close);
    }
  }

  if (data.length > 0) {
    let chart = document.getElementById("myChart");
    if (chart) {
      $("#myChart").remove();
      $("#chart-container").append(`<canvas id="myChart"></canvas>`);
    }
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: props.currency,
            data: data,
          },
        ],
      },
      options: {
        tooltips: {
          intersect: false,
          mode: "index",
          axis: "x",
        },
        maintainAspectRatio: true,
        aspectRatio: 2,
        responsive: true,
        showLines: true,
        hover: {},
        elements: {
          point: { radius: 0 },
        },
        title: {
          display: true,
          text: `${props.currency} VALUE HISTORY :)`,
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "DOLLAR VALUE (USD)",
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 30,
              },
              scaleLabel: {
                display: true,
                labelString: "DATE",
              },
            },
          ],
        },
      },
    });
  }
  return (
    <div id="chart-container">
      <canvas id="myChart">press a button</canvas>
    </div>
  );
};

export default CryptoChart;
