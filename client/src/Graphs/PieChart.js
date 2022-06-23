// I want to build the component for pie chart using visx here
import React, { useEffect, useState } from 'react';

import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';

export default function PieChart({ assets }) {
  const[active, setActive] = useState(null);
  const width = 250;
  const half = width / 2;


  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={assets}
            pieValue={data => data.amount*data.currPrice}
            outerRadius={half}
            innerRadius={({data}) => {
              const size = active && active.ticker === data.ticker ? 30 : 20;
              return half - size;
            }}
            padAngle={0.01}
          >
            {pie => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.ticker}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>)
              })
            }}
          </Pie>

          {active ? (
            <>
              <Text textAnchor="middle" fontSize={40} dy={-5}>
                {`$${(Math.floor(active.amount * active.currPrice)).toLocaleString("en-US")}`}
              </Text>

              <Text textAnchor="middle" fill={active.color} fontSize={20} dy={35}>
                {`${(active.amount).toLocaleString("en-US")} ${active.ticker}`}
              </Text>
            </>
          ) : (
            <>
              <Text textAnchor="middle" fontSize={40} dy={-5}>
                {`$${(Math.floor(assets.reduce((acc, asset) => acc + asset.amount*asset.currPrice ,0))).toLocaleString("en-US")}`}
              </Text>

              <Text textAnchor="middle" fontSize={20} dy={35}>
                {`${assets.length} Assets`}
              </Text>
            </>
          )}
        </Group>
      </svg>
    </main>


  )
}