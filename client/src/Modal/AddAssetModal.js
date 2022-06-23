// This will be for the add asset mmodal
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  InputRightAddon,
  InputGroup
} from '@chakra-ui/react'

const nameAndTicker = {
  apple: "AAPL",
  microsoft: "MSFT",
  bitcoin: "BTC",
  ethereum: "ETH",
  netflix: "NFLX",
  gamestop: "GME",
  tesla: "TSLA",
  solana: "SOL",
  vechain: "VET",
  amazon: "AMZN"
}


export default function AddAssetModal({ addAsset }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [asset, setAsset] = useState({
    name: "",
    ticker: "",
    amount: 0,
    notes: ""
  })

  function handleChange(e) {
    if (e.target.name === 'name') {
      let ticker = "";
      if (nameAndTicker[e.target.value.toLowerCase()]) {
        ticker = nameAndTicker[e.target.value.toLowerCase()];
        setAsset({...asset, [e.target.name]: e.target.value, ticker: ticker})
      } else {
        setAsset({...asset, [e.target.name]: e.target.value, ticker: ticker})
      }
    } else {
      setAsset({...asset, [e.target.name]: e.target.value })
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Asset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Fill out the provided fields
            <Input placeholder='Asset Name, ex: Bitcoin, Apple'mb={4} name='name' onChange={handleChange} type='text' />
            <InputGroup>
              <Input placeholder='Amount Owned, ex: 0.75' mb={4} name='amount' onChange={handleChange} type='number'/>
              <InputRightAddon  children={asset.ticker} />
            </InputGroup>
            <Input placeholder='Notes, ex: "Stored on Coinbase"' mb={4} name='notes' onChange={handleChange}/>
          </ModalBody>
          <ModalFooter>
            <Button
              size='md'
              colorScheme='blue'
              onClick={() => {
                addAsset(asset)
                onClose()
              }}>Add Asset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}