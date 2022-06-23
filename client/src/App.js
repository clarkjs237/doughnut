import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import styled from 'styled-components';

// // Trying visx
// import { Pie } from '@visx/shape';
// import { Group } from '@visx/group';
// import { Text } from '@visx/text';

// const coins = [
//   {symbol: "ADA", amount: 200, color: "#0033ad", usd: 1.48},
//   {symbol: "SOL", amount: 5, color: "#00ffbd", usd: 37.6},
//   {symbol: "BTC", amount: 0.005, color: "#F7931A", usd: 37474}
// ]

import PieChart from './Graphs/PieChart.js';

const LogoImage = styled.img`
  max-height: 2rem;
  max-width: 2rem;
  min-height: 2rem;
  min-width: 2rem;
`;


function App() {

  const [assets, setAssets] = useState([])

  async function getAssets() {
    const data = await fetch('/assets').then((val) => val.json());
    return data;
  }


  useEffect(() => {
    getAssets()
    .then((data) => setAssets(data))
    .catch((err) => console.log(err))
  }, []);


  return (
    <div>
      <Heading>Rendezvous</Heading>
      {assets.length > 0 && (
        <div>
          <PieChart assets={assets}/>
          <Accordion defaultIndex={[0]} allowMultiple>
            {/* This is what I want to map over for the accordian items */}
            {assets.map((asset, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left' display="flex">
                      <LogoImage src={asset.logo} alt="" />
                      <p>{asset.name} Current Price: ${asset.currPrice} Amount Owned: {asset.amount} Total Value: ${Math.round((asset.currPrice * asset.amount) * 100) / 100}</p>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {asset.notes}
                  </AccordionPanel>
                </h2>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );

}

export default App;
