// This will be the graph for asset value
import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "First dataset",
//       data: [33, 53, 85, 41, 44, 65],
//       fill: true,
//       backgroundColor: "rgba(75,192,192,0.2)",
//       borderColor: "rgba(75,192,192,1)"
//     },
//     {
//       label: "Second dataset",
//       data: [33, 25, 35, 51, 54, 76],
//       fill: false,
//       borderColor: "#742774"
//     }
//   ]
// };



export default function AssetValue({ assets }) {

  // I want to loop through the assets. lets just go to 100
  // multiply the amount by the price that day, save that value in an array

  const [values, setValues] = useState({});
  const [summedArr, setSummedArr] = useState([]);
  const [dates, setDates] = useState([]);

  async function valueGraph() {
    assets.forEach((asset) => {
      let output = [];
      if (asset.class === 'crypto') {
        // process this the crypto way
        // go from old to new
        for (let i = 266; i < asset.historical.length; i++) {
          const price = asset.historical[i][1];
          const value = price * asset.amount;
          output.push(value)
        }
      } else {
        // process this is stock way
        // need to iterate in reverse to get old to new
        console.log(asset.name)
        let datesArr = [];
        for (let i = 99; i >= 0; i--) {
          const price = asset.historical[i].close;
          const value = price * asset.amount;
          output.push(value)

          datesArr.push(asset.historical[i].date);
        }
        setDates(datesArr);
      }

      // Now set this value inside the object
      setValues(prev => ({
        ...prev,
        [asset.name]: output
      }));
    })
  }

  async function valuesToOne() {
    // I want to loop over all of these inputs and make a single array out of it

    async function intersection (obj) {
      let first_arr;
      if (Object.keys(obj).length > 0) {
          first_arr = [...Object.values(obj)[0]];

          const new_arr = first_arr.map((e, index) => {
              let total = 0;
              for (var i = 1; i < Object.values(obj).length; i++) {
                  total += Object.values(obj)[i][index];
              }
              return e + total;
          })

          return new_arr;
      }
    };

   const output = await intersection(values);
   setSummedArr(output);
  }


  async function grouper() {
    await valueGraph();
    await valuesToOne();
  }

  useEffect(() => {
    // valueGraph();
    // valuesToOne();
    grouper();
  },[assets])

  return (
    <div className="App">
      <Line data={{
        labels: dates,
        datasets: [
          {
            label: 'Total Value',
            data: summedArr,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          }
        ]
      }} />
    </div>
  );
};
