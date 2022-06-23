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
          <Accordion defaultIndex={[0]} allowMultiple>
            {/* This is what I want to map over for the accordian items */}
            {assets.map((asset, index) => (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {/* <img src={asset.logo} alt="" /> */}
                      <LogoImage src={asset.logo} alt="" />
                      <p>{asset.name} {asset.currPrice} {asset.ticker} {asset.amount} Total Amount Owned: ${Math.round((asset.currPrice * asset.amount) * 100) / 100}</p>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {asset.notes}
                  </AccordionPanel>
                </h2>
              </AccordionItem>
            ))}
            {/* <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign='left'>
                    <img src={assets[0].logo} alt="" />
                    <p>{assets[0].name}</p>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </AccordionPanel>
              </h2>
            </AccordionItem> */}
          </Accordion>
        </div>
      )}
    </div>

  );


}

export default App;
