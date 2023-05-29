import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as crossfilter from 'crossfilter';
import * as dc from 'dc';
import * as d3 from 'd3';

const Chart_three = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/data/')
      .then((res) => {
        const data = res.data;
        createCrossfilter(data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const createCrossfilter = (data) => {
    const ndx = crossfilter(data);
    const dimension = ndx.dimension((d) => d.sector);
    const group = dimension.group();

    const colors = d3.scaleOrdinal()
      .domain(dimension.group().all().map((d) => d.key))
      .range(['#FF0000', '#00FF00', '#0000FF', '#000', '#215d0e', '#c52b2b', '#2b62c5', '#c52ba7', '#d6d436']); // Define your desired colors here

    const chart = dc.barChart(chartRef.current);

    chart
      .width(800)
      .height(300)
      .margins({ top: 10, right: 50, bottom: 30, left: 50 })
      .dimension(dimension)
      .group(group)
      .x(d3.scaleBand())
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .colorAccessor((d) => d.key)
      .colors(colors)
      .renderLabel(true) 
      .render();
    dc.renderAll();
  };

  return (
    <div>
      <header>Data generated from Django</header>
      <hr />
      <div ref={chartRef}></div>
    </div>
  );
};

export default Chart_three;
