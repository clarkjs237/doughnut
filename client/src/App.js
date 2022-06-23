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
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
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
import EditForm from './EditForm/EditForm.js';
import AddAssetModal from './Modal/AddAssetModal.js';

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

  function changer(index, e) {
    // index is the index of the asset we are changing
    let assets_copy = [...assets];
    assets_copy[index].amount = e.target.value;
    setAssets(assets_copy);
    // This works! I think I would rather have a submit button bc that way it won't update unless I want it to

  }

  function handleSubmit(index, e) {
    console.log('hello')
    // I want to submit this to the db as an updated value for this assets name
    // I think I only need the asset name, amount, ticker, class
    const updatedAsset = {
      name: assets[index].name,
      ticker: assets[index].ticker,
      amount: assets[index].amount,
      class: assets[index].class
    }
    fetch('/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedAsset)
    })
  }

  async function refreshSubmit() {
    // this is where I will make a request to get all the assets and reset state
    const data = await fetch('/assets/refresh').then((val) => val.json());
    // update the assets
    setAssets(data)
  }

  async function addAsset(asset) {
    // This should trigger refreshSubmit above after it is done posting
    asset.amount = parseFloat(asset.amount)
    console.log(asset)
    // I need to change the asset.amount to be a number, so parse float
  }

  return (
    <div>
      <Heading>Rendezvous</Heading>
      {assets.length > 0 && (
        <div>
          <PieChart assets={assets}/>
          <Button size='lg' colorScheme='blue' onClick={refreshSubmit}>Refresh</Button>
          <AddAssetModal addAsset={addAsset} />
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
                    <p>Amount Owned</p>

                    <Editable defaultValue={asset.amount} onSubmit={(e) => handleSubmit(index, e)}>
                      <EditablePreview />
                      <EditableInput onChange={(e) => changer(index, e)}/>
                      <Button>Update Amount</Button>
                    </Editable>

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
