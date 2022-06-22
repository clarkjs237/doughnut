import logo from './logo.svg';
import './App.css';
import { Button } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react';


function App() {

  // async function tester() {
  //   let data = await fetch('/test').then((data) => data.json());
  //   console.log(data);
  // }


  // useEffect(() => {
  //   // tester()
  // }, []);

  return (
    <div className="App">
      hello
      <Button colorScheme='blue'>Button</Button>
    </div>
  );
}

export default App;
