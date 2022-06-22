import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'

import { useEffect, useState } from 'react';


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
    </div>
  );
  // return (
  //   <ChakraProvider>
  //     <div>
  //       Hello
  //     </div>
  //   </ChakraProvider>
  // )
}

export default App;
