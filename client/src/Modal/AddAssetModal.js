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
  const [state, setState] = useState({
    name: "",
    ticker: "",
    amount: 0,
    notes: ""
  })


  function tickerFinder(name) {
    if (nameAndTicker[name]) {
      setState({
        ...state,
        ticker: nameAndTicker[name]
      })
    } else {
      setState({
        ...state,
        ticker: ""
      })
    }
  }

  function handleChange(e) {
    let asset = e.target.value.toLowerCase();
    setState({
      ...state,
      [e.target.name]: e.target.value
    })

    tickerFinder(e.target.value)

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
            <Input placeholder='Asset Name, ex: Bitcoin, Apple'mb={4} name='name' onChange={handleChange}/>
            <InputGroup>
            <Input placeholder='Amount Owned, ex: 0.75' mb={4} name='amount'/>
            <InputRightAddon  children={state.ticker} />
            </InputGroup>
            <Input placeholder='Amount Owned, ex: 0.75' mb={4} />
            <Input placeholder='Notes, ex: "Stored on Coinbase"' mb={4} />
          </ModalBody>
          <ModalFooter>
            <Button
              size='md'
              colorScheme='blue'
              onClick={() => {
                addAsset()
                onClose()
              }}>Add Asset</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}