import logo from './logo.svg';
import './App.css';
import { Button } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react';


function App() {

  const [assets, setAssets] = useState({})

  async function getAssets() {
    const data = await fetch('/assets').then((val) => val.json());
    console.log(data);
  }


  useEffect(() => {
    const data = getAssets();
    setAssets(data);
  }, []);

  return (
    <div className="App">
      hello
      <Button colorScheme='blue' size='lg'>Button</Button>
    </div>
  );
}

export default App;
