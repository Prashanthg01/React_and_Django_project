import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Chart_one = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/data/')
      .then((res) => {
        const data = res.data;
        createChart(data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const createChart = (data) => {
    const width = 400;
    const height = 300;

    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const partition = d3.partition().size([2 * Math.PI, radius]);

    const arc = d3
      .arc()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius((d) => d.y0)
      .outerRadius((d) => d.y1 - 1);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const root = d3.hierarchy({ children: data }).sum((d) => d.intensity);

    partition(root);

    svg
      .selectAll('path')
      .data(root.descendants())
      .enter()
      .append('path')
      .attr('d', arc)
      .style('fill', (d) => color((d.children ? d : d.parent).data.title))
      .on('click', clicked)
      .append('title')
      .text((d) => `${d.data.title}\nIntensity: ${d.data.intensity}`);

    function clicked(event, p) {
      const x = d3.interpolate(d3.scaleLinear().domain([p.x0, p.x1]), [0, 2 * Math.PI]);
      const y = d3.interpolate(d3.scaleLinear().domain([p.y0, 1]), [0, radius]);

      svg
        .transition()
        .duration(750)
        .tween('scale', () => {
          return (t) => {
            arc.startAngle((d) => x(t)(d.x0));
            arc.endAngle((d) => x(t)(d.x1));
            arc.innerRadius((d) => y(t)(d.y0));
            arc.outerRadius((d) => y(t)(d.y1) - 1);
          };
        })
        .selectAll('path')
        .attr('d', arc);
    }
  };

  return (
    <div>
      <header>Data generated from Django</header>
      <hr />
      <div ref={chartRef}></div>
    </div>
  );
};

export default Chart_one;
