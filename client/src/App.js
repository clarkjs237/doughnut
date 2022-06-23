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


function App() {

  const [assets, setAssets] = useState(null)

  async function getAssets() {
    const data = await fetch('/assets').then((val) => val.json());
    console.log(data);
    console.log(data[0].logo)
  }


  useEffect(() => {
    const data = getAssets();
    setAssets(data);
  }, []);

  // if (assets !== null) {
  //   console.log('im not null')
  //   return (
  //     <div>
  //       <Heading>Rendezvous</Heading>
  //       { assets !== null &&
  //       <div>
  //         <Accordion defaultIndex={[0]} allowMultiple>
  //           <AccordionItem>
  //             <h2>
  //               <AccordionButton>
  //                 <Box flex='1' textAlign='left'>
  //                   Section 1 title
  //                   {/* <img src={assets[0].logo} alt="" /> */}
  //                 </Box>
  //                 <AccordionIcon />
  //               </AccordionButton>
  //               <AccordionPanel pb={4}>
  //                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  //                 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
  //                 veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
  //                 commodo consequat.
  //               </AccordionPanel>
  //             </h2>
  //           </AccordionItem>
  //         </Accordion>
  //       </div>}
  //     </div>

  //   );
  // }

  return <div>Loading</div>

}

export default App;
