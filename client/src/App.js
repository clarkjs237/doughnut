import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
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
  Center,
  Container,
  Flex,
  Spacer
} from '@chakra-ui/react';
import styled from 'styled-components';

import PieChart from './Graphs/PieChart.js';
import AssetValue from './Graphs/AssetValue.js';
import AddAssetModal from './Modal/AddAssetModal.js';

const LogoImage = styled.img`
  max-height: 2rem;
  max-width: 2rem;
  min-height: 2rem;
  min-width: 2rem;
`;

const DoughnutImage = styled.img`
  max-height: 6rem;
  min-height: 6rem;
  max-width: 6rem;
  min-width: 6rem;
`;

const AssetItems = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: horizontal;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

const MidSectionDiv = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const NameTotalValue = styled.div`
  display: flex;
  justify-content: space-between;
  width: 34rem;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextH3 = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

const AmountOwnedWrapper = styled.div`
  display: flex;
`;

const TopWrapper = styled.div`
  display: flex;
  margin-top: 2.5rem;
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
    .then(() => refreshSubmit())
  }

  async function refreshSubmit() {
    // this is where I will make a request to get all the assets and reset state
    const data = await fetch('/assets/refresh').then((val) => val.json());
    // update the assets
    setAssets(data)
  }

  // This is for the modal. I want to take this newly created asset and post it to the db
  async function addAsset(asset) {
    // This should trigger refreshSubmit above after it is done posting
    // I need to change the asset.amount to be a number, so parse float
    asset.amount = parseFloat(asset.amount)
    console.log(asset)
    fetch('/assets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(asset)
    })
    .then(() => refreshSubmit())

  }

  return (
    <Center>
      {assets.length > 0 && (
        <div>

          <TopWrapper>
            <PieChart assets={assets}/>
            <Flex flexDirection='column'>
              <Flex>
                <TextH3 style={{"fontSize": "4rem", "marginRight": "0.5rem"}}>Doughnut</TextH3>
                <DoughnutImage src='https://cdn2.iconfinder.com/data/icons/cute-valentine-s-hand-drawn/512/template_line_set-32-512.png'/>
              </Flex>
            {/* This is where the graph will go */}
              <AssetValue assets={assets}/>
            </Flex>
          </TopWrapper>


          <MidSectionDiv>
            <Flex>
              <Box>
                <Heading size='lg'>Assets</Heading>
              </Box>
              <Spacer />
              <ButtonGroup gap='2'>
                <Button size='md' colorScheme='teal' onClick={refreshSubmit}>Refresh</Button>
                <AddAssetModal addAsset={addAsset} />
              </ButtonGroup>
            </Flex>
          </MidSectionDiv>
          <Accordion defaultIndex={[0]} allowMultiple>
            <Container>
              {assets.map((asset, index) => (
                <AccordionItem key={index} minWidth={600} maxWidth={600}>
                  <h2>
                    <AssetItems>
                      <AccordionButton>
                        <Box flex='1' textAlign='left' display="flex">

                          <NameTotalValue>
                            <LogoImage src={asset.logo} alt="" />
                            <TextH3 style={{"fontSize": "19px", "fontWeight": "550"}}>{asset.display_name}</TextH3>
                            <TextH3 style={{"fontSize": "20px", "fontWeight":"500"}}>
                              ${(Math.round((asset.currPrice * asset.amount) * 100) / 100).toLocaleString("en-US")}
                            </TextH3>
                          </NameTotalValue>

                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </AssetItems>
                    <AccordionPanel pb={4} mg={0.25}>

                      <ModalWrapper>
                        <TextH3 style={{"fontWeight": "bold"}}>Current Price: <br/>${(asset.currPrice).toLocaleString("en-US")}</TextH3>
                        <TextH3>Notes: <br/>{asset.notes}</TextH3>

                        <AmountOwnedWrapper>
                          <Editable defaultValue={asset.amount} onSubmit={(e) => handleSubmit(index, e)} >
                            <EditablePreview />
                            <EditableInput onChange={(e) => changer(index, e)} />
                            <TextH3 style={{"paddingRight": "1rem"}}> {asset.ticker}</TextH3>
                            <Button colorScheme='teal' size='xs'>Update Amount</Button>
                          </Editable>
                        </AmountOwnedWrapper>

                      </ModalWrapper>


                    </AccordionPanel>
                  </h2>
                </AccordionItem>
              ))}
            </Container>
          </Accordion>
        </div>
      )}
    </Center>
  );

}

export default App;
