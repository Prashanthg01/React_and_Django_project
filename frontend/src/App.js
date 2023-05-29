import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Chart_one from './statistics/chart_one';
import Chart_three from './statistics/chart_three';
import ChartTwo from './statistics/charttwo';
import ChartFour from './statistics/chart_four';

function App() {
  // const [details, setDetails] = useState([]);

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/')
  //     .then(res => {
  //       const data = res.data;
  //       setDetails(data);
  //     })
  //     .catch(err => {
  //       console.error('Error fetching data:', err);
  //     });
  // }, []);

  return (
    <div>
      {/* <header>Data generated from Django</header>
      <hr></hr>
      {details.map((output, id) => (
        <div key={id}>
          <div>
            <h2>{output.employee}</h2>
            <h3>{output.department}</h3>
          </div>
        </div>
      ))} */}
      <Chart_three />
      {/* <Chart_one /> */}
      <ChartTwo />
      <ChartFour/>
    </div>
  );
}

export default App;
