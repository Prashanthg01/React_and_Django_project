import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const ChartTwo = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/data/')
      .then((res) => {
        const data = res.data;
        generateSplineChart(data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const generateSplineChart = (data) => {
    const sectors = data.map((item) => item.sector);
    const intensities = data.map((item) => item.intensity);

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 700 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(sectors)
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(intensities)])
      .range([height, 0]);

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', 'steelblue')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.sector))
      .attr('y', (d) => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.intensity));
  };

  return (
    <div>
      <h1>Intensity based on sector</h1>
      <hr />
      <div ref={chartRef}></div>
    </div>
  );
};

export default ChartTwo;
